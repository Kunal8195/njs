/** 3rd Party **/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
	
    name: {type: String, trim: true, required: true},
    email: {type: String, trim: true, unique: true, index: true},
    password: {type: String, min:8}
});

module.exports = mongoose.model('user', user);
