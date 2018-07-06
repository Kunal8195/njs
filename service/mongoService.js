'use strict'

const Models = require('../models');

const save = function(dataToSave, callback){
	new Models.person(dataToSave).save(callback)
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
	save,
	find,
	saveUser
}