/** 3rd Party **/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const person = new Schema({
	
    name: {type: String, trim: true},
    time: {type: String},
    streams: {type: Array, "default": []}

});

module.exports = mongoose.model('person', person);
