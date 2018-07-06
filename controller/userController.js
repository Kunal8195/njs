'use strict'

/* 3rd Party */
const async = require('async');
const MD5 = require('md5');

/* External Dependency */
const Service = require('service');


const signUp = function(payload, callback){

	let dataToSave = payload;
	if(dataToSave.password)

		// encrypting the password
		dataToSave.password = CryptData(dataToSave.password)

	/*
	  executing asynchronous functions synchronously
	*/
	async.series([
		function(cb){

			// set the criteria for the query in mongo
			let criteria = {				
				email: payload.email
			};
			let projection = {};

			/*
			  if any matching record is found correspond to that email
			  then it means a user is already registered
			*/
			Service.mongoService.find(criteria, projection, function(err, result){
				if(result.length){
					let dataToSend = {
						message:'Email already registered'
					};
					callback(dataToSend);
				} else {
					cb();
				}
			})
		},
		function(cb){

			// save the new user record in mongo
			Service.mongoService.saveUser(dataToSave, function(err, result){
				if(err){
					callback(err)
				} else {
					dataToSave = result;
					cb();
				}
			})
		}
	],
	function(err, result){
		if(err){
			callback(err)
		} else {
			/*let dataToSend = {
				message: 'You have successfully registered'
			};*/
			callback(null, dataToSave);
		}
	}
	)
}


const logIn = function(payload, callback){

	let dataToForward;
	let dataToSend;

	async.series([
		function(cb){
			let criteria = {
				email: payload.email
			};
			let projection = {};

			// checking if that email exists or not
			// if exists then fetching out that record
			Service.mongoService.find(criteria, projection, function(err, result){
				if(result.length){
					dataToForward = result[0];
					cb();
				} else {
					dataToSend = {
						message:'You are not registered'
					}
					callback(dataToSend);
				}
			})
		},
		function(cb){

			// comparing passwords
			if(dataToForward.password == CryptData(payload.password)){				
				dataToSend = dataToForward;
				cb();
			}
			else{
				dataToSend = {
					message:'Incorrect Password';
				}
				callback(dataToSend);
			}
		}
		],
		function(err, result){
			if(!err){
				callback(null, dataToSend);
			} else {
				callback(err);
			}
		}
		)
}


const CryptData = function (stringToCrypt) {
    return MD5(stringToCrypt);
};


module.exports = {
	signUp,
	logIn
}