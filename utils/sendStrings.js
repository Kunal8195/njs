'use strict'
/* 3rd Party */
const async = require('async');

/* external dependency */
const NJS = require('../NJS');

const sendPing = function(callback){
    
    // variable which will be carrying the final result
	let dataToPing = null;

	// varialble which will be used in between the different asynchronous calls
	let dataToForward = null;

	let max = 499;
	let min = 49;

	// generating random number b/w 49-499
	let randomNumber = Math.floor(Math.random()*(max-min+1)+min);

    /*
       this while loop will run this random number times
       and concatinate these number of strings separated by '|'
    */
	while(randomNumber--){

		async.series([

			/*
			  constructing the initial object
			*/
			function(cb){
				NJS.njs_emitter.constructObject(function(err, result){
					if(!err){
						dataToForward = result;
						cb();
					} else {
						throw err;
					}
				})
			},
			/*
			   hasing the object
			*/
			function(cb){
				NJS.njs_emitter.hashObject(dataToForward, function(err, result){
					if(!err){
						dataToForward = result;
						cb();
					} else {
						throw err;
					}
				})
			},
			/*
			   generating the final string
			*/
			function(cb){
				NJS.njs_emitter.finalString(dataToForward, function(err, result){
					if(!err){
						dataToForward = result;
						cb();
					} else {
						throw err;
					}
				})
			}
			],
			function(err, result){
				if(!err){

					//contatinating strings with '|'
					dataToPing+= '|' + dataToForward;
				} else {
					throw err;
				}
			}
			)

	}
	callback(null, dataToPing)
}

module.exports = {
	sendPing
}