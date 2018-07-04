'use strict'
/* 3rd party */
const async = require('async');
const hash = require('node-object-hash');
const crypto = require('crypto');
const path = require('path');

/* External Dependency */
const utils = require('../utils');
const hasher = hash().hash;

const constructObject = function(callback){

	// variable that will be carrying the data to be ping
	let dataToSend = {};

	/*
	   Synchronous execution of some asynchronous operations
	*/
	async.series([
		function(cb){

			/*
			   getting a name of a Person
			*/
			utils.getName.getRandomLine(path.join(__dirname,'../data/name.csv'), function(err, result){
				if(!err){
					dataToSend.name = result;
					
					cb();
				} else {
					throw err;
				}
				
			})
		},
		function(cb){
			/*
			   getting the names of a city
			*/
			utils.getCity.getRandomLine(path.join(__dirname,'../data/city.csv'), function(err, result){
				if(!err){
					dataToSend.origin = result.origin;
					dataToSend.destination = result.destination;
					cb();
				} else {
					throw err;
				}
			})

		}
		],
		function(err, result){
			if(!err){
				callback(null, dataToSend);
			} else {
				throw err;
			}
		}
		)
}

const hashObject = function(originalObject, callback){
	/*
	   originalObject = {
	   	  name:'Kunal Pal',
	   	  origin:'Kanpur',
	   	  destination:'Banglore'	
	   }
	*/
	let dataToSend = originalObject;

	dataToSend.secret_key = hasher(originalObject, {
		alg:'sha256'
	})
	callback(null, dataToSend);
}

const finalString = function(hashedObject, callback){
	let algorithm = 'aes-256-ctr';
    let passkey = process.env.PASSKEY || 'd6F3Efeq';

    /*
        hashedObject = {
	       name:'',
	       origin:'',
	       destination:'',
	       secret_key:''
        }
    */

    // making object a string before encryption
    let text = JSON.stringify(hashedObject);

    let cipher = crypto.createCipher(algorithm,passkey)
    let crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    callback(null, crypted);
}


module.exports = {
	constructObject,
	hashObject,
	finalString
}