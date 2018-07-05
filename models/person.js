/** 3rd Party **/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const person = new Schema({
	
    name: {type: String, trim: true, required: true},
    time: {type: Date},
    stream: {type: Array}

});

module.exports = mongoose.model('person', person);
