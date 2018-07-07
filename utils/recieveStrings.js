'use strict'
/* 3rd Party */
const async = require('async');
const forEach = require('async-foreach').forEach;

/* external dependency */
const NJS = require('../NJS');
const Service = require('../service');
require('../db');
let currentTime = new Date();

let dataToSave = {
	name:'kunal pal',
	time: currentTime,
	streams:[]
};

const recievePing = async (string, callback) => {
	let currentMinute = new Date().toLocaleTimeString().slice(0,5);
	let array;
	let arrayToSend = [];

	string = string.toString();
	array = string.split('|');
	let length = array.length;
	console.log(length);

    forEach(array, async function(element, index){
	let dataToSend;

	await NJS.njs_listener.finalString(element).then((result) => {
		dataToSend = result;
	})

	await NJS.njs_listener.hashObject(dataToSend).then((result) => {
		dataToSend = result;
	})

	if(dataToSend){
					//console.log('in here');
					dataToSend.timestamp = new Date();

					if(dataToSend.timestamp.toLocaleString().slice(0,-3) ==  currentTime.toLocaleString().slice(0,-3)){
						dataToSave.streams.push(dataToSend)
						console.log('1----');						
					    //console.log('now u here', dataToSave);
					} else {
						await Service.mongoService.savePerson(dataToSave).then((result) => {
							dataToSend = result;
						})

						console.log('2----');
						currentTime = new Date();
						//currentMinute = new Date().toLocaleTimeString().slice(0,5);
						
						//cb();
						dataToSave = {
							name:'king pal',
							time:currentTime,
							streams:[]
						}
						dataToSave.streams.push(dataToSend);
						
					}
					
				}

	

	if(dataToSend){
					    arrayToSend[index] = dataToSend;
					    if(index == length-1){	
					    console.log(arrayToSend);
						    callback(null, arrayToSend);
					    }
					} else {
						arrayToSend[index] = null;
	}

})

}








/*const recievePing = async function(string, callback){
	let currentTime = new Date().toString();
	let currentMinute = new Date().toLocaleTimeString().slice(0,5);
	let array;
	let arrayToSend = [];
	let dataToSave;

	string = string.toString();
	array = string.split('|');
	let length = array.length;
	console.log(length);
	

	await forEach(array, function(element, index){

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
						//console.log(dataToSend);
						cb();
					} else {
						throw err;
					}
				})
			},
			function(cb){
				if(dataToSend){
					//console.log('in here');
					dataToSend.timestamp = new Date();

					if(currentMinute == new Date().toLocaleTimeString().slice(0, 5)){
						console.log('1----');
						dataToSave = {
						    name: dataToSend.name,
						    time: currentTime,
						    //streams:[]
					    };
					    cb();
					    //dataToSave.streams.push(dataToSend);
					    //console.log('now u here', dataToSave);
					} else {
						console.log('2----');
						currentTime = new Date().toString();
						currentMinute = new Date().toLocaleTimeString().slice(0,5);
						dataToSave = {
							name: dataToSend.name,
						    time: currentTime,
						    //streams:[]
						}
						cb();
						//dataToSave.streams.push(dataToSend);
						
					}
					
				}
			},
			function(cb){
				console.log('3-----')
				//cb();
				await Service.mongoService.savePerson(dataToSave).then((result) => {
					dataToSend = result;
				}).catch((err) => {
					throw err;
				})
			
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
		console.log('in for loop')
	})
}*/

module.exports = {
	recievePing
}