'use strict'

const Models = require('../models');

const savePerson = function(dataToSave){
	return new Promise((resolve, reject) => {
		dataToSave.name = dataToSave.name.slice(0,-1)
	//dataToSave = JSON.parse(dataToSave);
	console.log('in service', dataToSave)

	new Models.person(dataToSave).save(function(err, result){
		resolve(result);
	})

    })
	

	//new Models.person(dataToSave).save(callback);
	//callback(null, 'calling it back');
}

const find = function(criteria,  projection, callback){
	let options = {
		lean: true
	}
	Models.user.find(criteria, projection, options, callback)
};


const saveUser = function(dataToSave, callback){
	new Models.user(dataToSave).save(callback)
}


module.exports = {
	savePerson,
	find,
	saveUser
}