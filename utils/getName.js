'use strict'

/** External Dependency **/
const fs = require('fs');
const async = require('async');

// variable data has to be send with the random name or city 
let dataToSend;


const getRandomLine = function(filename, callback){

	/*
	   executing asynchronous operation synchronously
	*/
	async.series([
	function(cb){

		// Reading file using fs
		fs.readFile(filename, function(err, data){
		   console.log('data', data);
		   data+='';
		   if(err) throw err;

		    // split on the basis of new lines 
		    let lines = data.split('\n');

		    // storing random value from lines array  in dataToSend
		    dataToSend = lines[Math.floor(Math.random()*lines.length)];
		    cb();
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