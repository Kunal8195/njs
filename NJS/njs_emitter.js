'use strict'
/* 3rd party */
const async = require('async');
const hash = require('node-object-hash');
const crypto = require('crypto');

/* External Dependency */
const utils = require('../utils');
const hasher = hash().hash;

const constructObject = function(callback){

	// variable that will be carrying the data to be ping
	let dataToSend;

	/*
	   Synchronous execution of some asynchronous operations
	*/
	async.series([
		function(cb){

			/*
			   getting a name of a Person
			*/
			utils.getName.getRandomLine('./data/name.csv', function(err, result){
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
			utils.getCity.getRandomLine('./data/city.csv', function(err, result){
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

	// returning Promise
	hasher(originalObject, {
		alg:'sha256'
	})
	.then(data => {

		/*
		   storing hashed string as a secret_ket in object which is to be send
		*/
		dataToSend.secret_key = data;
		callback(null, dataToSend);
	})
	.catch(err => {
		throw err;
	})
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