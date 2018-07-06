'use strict'
/* 3rd Party */
const async = require('async');
const forEach = require('async-foreach').forEach;

/* external dependency */
const NJS = require('../NJS');
const Service = require('../service');


const recievePing = function(string, callback){
	let currentTime = new Date();
	let currentMinute = new Date().toLocaleTimeString().slice(0,5);
	let array;
	let arrayToSend = [];

	string = string.toString();
	console.log(string);
	array = string.split('|');
	let length = array.length;
	console.log(length);
	

	array.forEach(function(element, index){

		let dataToSend;
		async.series([
			function(cb){
				//console.log('element', element);
				NJS.njs_listener.finalString(element, function(err, result){
					if(!err){
						dataToSend = result;
						cb();
					} else {
						throw err;
					}
				})

			},
			function(cb){
				NJS.njs_listener.hashObject(dataToSend, function(err, result){
					if(!err){
						dataToSend = result;
						cb();
					} else {
						throw err;
					}
				})
			},
			function(cb){
				if(dataToSend){
					dataToSend.timestamp = new Date();

					if(currentMinute == new Date().toLocaleTimeString().slice(0, 5)){
						let dataToSave = {
						    name: dataToSend.name,
						    time: currentTime,
						    streams:[]
					    };
					    dataToSave.streams.push(dataToSend);
					}

					

					Service.mongoService.save(dataToSave, function(err, result){

				    })
				}
			}
			],
			function(err, result){
				if(!err){
					if(dataToSend){
					    arrayToSend[index] = dataToSend;
					    if(index == length-1){	
					    console.log(arrayToSend);
						    callback(null, arrayToSend);
					    }
					} else {
						arrayToSend[index] = null;
					}
				} else {
					throw err;
				}
			}
			)
	})
}

module.exports = {
	recievePing
}