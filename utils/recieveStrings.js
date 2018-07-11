'use strict'
/* 3rd Party */
const async = require('async');
const forEach = require('async-foreach').forEach;

/* external dependency */
const NJS = require('../NJS');
const Service = require('../service');

// Setup DB connection
require('../db');

// Current time
let currentTime = new Date();

// data object which will be saved in MongoDB
let dataToSave = {
	name:'kunal pal',
	time: currentTime,
	streams:[]
};

const recievePing = async (string, callback) => {
	
	let array;
	let arrayToSend = [];

	string = string.toString();
	array = string.split('|');
	let length = array.length;

	// iterating for each element of array(encrypted string)
    forEach(array, async function(element, index){

	let dataToSend;

	// decrypting the aes-256 encrypted string
	await NJS.njs_listener.finalString(element).then((result) => {
		dataToSend = result;
	})

	// checking the integrity of data
	// and returning the original object
	await NJS.njs_listener.hashObject(dataToSend).then((result) => {
		dataToSend = result;
	})

	// cheking if data is valid
	if(dataToSend){
					
					// storing timestamp in object
					dataToSend.timestamp = new Date();

					// checking if object belongs to current minute series
					// will get store to different series
					// if minute changes
					if(dataToSend.timestamp.toLocaleString().slice(0,-3) ==  currentTime.toLocaleString().slice(0,-3)){

						// pushing the object in streams array
						dataToSave.streams.push(dataToSend)
												
					} else {

						// saving the doc in DB
						// if minute changed
						await Service.mongoService.savePerson(dataToSave).then((result) => {
							dataToSend = result;
						})

						// giving current time new latest time
						currentTime = new Date();
						
						// initializing new object to save in DB
						dataToSave = {
							name: dataToSend.name,
							time:currentTime,
							streams:[]
						}

						// pushing the current object in doc
						dataToSave.streams.push(dataToSend);
						
					}
					
				}

	/*
	   here we wll pass each object to the frontend client
	*/

	if(dataToSend){
					    arrayToSend[index] = dataToSend;
					    if(index == length-1){	
					    //console.log(arrayToSend);
						    callback(null, arrayToSend);
					    }
					} else {
						arrayToSend[index] = null;
	}

})

}


module.exports = {
	recievePing
}