'use strict'
/* 3rd Party */
const hash = require('node-object-hash');
const crypto = require('crypto');

/* External dependency */
const hasher = hash().hash;


const finalString = function(string){
	return new Promise((resolve, reject) => {
	let algorithm = 'aes-256-ctr';
    let passkey = process.env.PASSKEY || 'd6F3Efeq';


    let decipher = crypto.createDecipher(algorithm,passkey)
    let dec = decipher.update(string,'hex','utf8')
    dec += decipher.final('utf8');

    dec = JSON.parse(dec)
    resolve(dec)
	})

}

const hashObject = function(hashedObject, callback){
	/*
	    hashedObject = {
	   	   name:'',
	   	   origin:'',
	   	   destination:'',
	   	   secret_key:''
	    }
	*/

	return new Promise((resolve, reject) => {

	// object for storing the field value
	let dataToCheck = {};

	// storing the fields
	dataToCheck.name = hashedObject.name;
	dataToCheck.origin = hashedObject.origin;
	dataToCheck.destination = hashedObject.destination;

	dataToCheck.secret_key = hasher(dataToCheck, {
		alg:'sha256'
	})

	/*
	   checking the integrity of data
	   by comparing secret key
	*/
	if(dataToCheck.secret_key == hashedObject.secret_key){

		//delete the secret_ket field
		delete dataToCheck.secret_key;
		resolve(dataToCheck);
		//callback(null, dataToCheck);
	} else {
		resolve(false);
		callback(null, false)
	}

	})
	
}

module.exports = {
	hashObject,
	finalString
}