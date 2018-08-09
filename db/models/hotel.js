const mongoose = require('mongoose');

const { Schema } = mongoose;

const hotel = new Schema({
	name: {
		type: String,
	},
	city: {
		type: String,
		default: null,
	},
	numberOfRooms: {
		type: Number,
		default: 0,
	}
}, { collection: 'hotel' });

module.exports.schema = hotel;
