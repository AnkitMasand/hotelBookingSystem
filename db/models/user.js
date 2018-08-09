const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = new Schema({
	name: {
		type: String,
	},
	city: {
		type: String,
		default: null,
	}
}, { collection: 'user' });

module.exports.schema = user;
