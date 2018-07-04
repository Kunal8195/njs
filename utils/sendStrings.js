'use strict'
/* 3rd Party */
const async = require('async');
const forEach = require('async-foreach').forEach;

/* external dependency */
const NJS = require('../NJS');

const sendPing = function(callback){
    
    // variable which will be carrying the final result
	let dataToPing = '';

	// varialble which will be used in between the different asynchronous calls
	let dataToForward = null;

	let max = 499;
	let min = 49;

	// generating random number b/w 49-499
	let randomNumber = Math.floor(Math.random()*(max-min+1)+min);

	// arr for iterating random number of times
	let arr = [];

	// just a index variable
	let i = 0;

	/*
	   this loop will create the array for the
	   iteration of forEach loop
	*/
	while(randomNumber--){
		arr[i] = randomNumber;
		i++;
	}

    /*
       this for loop will run this random number times
       and concatinate these number of strings separated by '|'
    */
	arr.forEach(function(element, index){

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
			   hashing the object
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
					
					// checking the terminating condition for the loop
					if(index == i-1){

						/*
						   if it is a last string then
						   don't add pipe '|'
						*/
						dataToPing += dataToForward;
						callback(dataToPing);						
					} else {

						//contatinating strings with '|'
						dataToPing += dataToForward + '|';
					}
				} else {
					throw err;
				}
			}
			)
	})
	
}

module.exports = {
	sendPing
}