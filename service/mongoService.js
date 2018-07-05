'use strict'

const Models = require('../models');

const save = function(dataToSave, callback){
	new Models.person(dataToSave).save(callback)
}