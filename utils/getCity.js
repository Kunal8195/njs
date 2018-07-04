'use strict'

/** External Dependency **/
const fs = require('fs');
const async = require('async');

// variable data has to be send with the random name or city 
let dataToSend = {};


const getRandomLine = function(filename, callback){

	// variable for implementing recursive while loop
	let cycle = 1;

	/*
	   executing asynchronous operation synchronously
	*/
	async.series([
	function(cb){

		// Reading file using fs
		fs.readFile(filename, function(err, data){
		   
		   data+='';
		   if(err) throw err;

		    // split on the basis of new lines 
		    let lines = data.split('\n');

		    // storing random value from lines array  in dataToSend
		    while(cycle){

		    	dataToSend.origin = lines[Math.floor(Math.random()*lines.length)];
		    	dataToSend.destination = lines[Math.floor(Math.random()*lines.length)];

		    	/*
		    	   checking if origin and destination are not same
		    	   if same continue while loop
		    	   otherwise break out of while loop
		    	*/
		    	if(dataToSend.origin == dataToSend.destination){
		    		cycle = 1;
		    	}
		    	else{
		    		cycle = 0;
		    	    cb();
		    	}		    		
		    }
		 })		

	}
	],function(err, result){
		if(!err){
			callback(null, dataToSend);
		}
	}
	)
  
}

module.exports = {
	getRandomLine
};