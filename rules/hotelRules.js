// Validation rules for hotel controls

const HotelRules = {

	showProfile: {
		id: { type: 'string' },
	},
	createHotel: {
		name: { type: 'string' },
		city: { type: 'string' },
		numberOfRooms: { type: 'number' },
	},
	showChildren: {
		id: { type: 'string' },
	},
	updateInfo: {
		id: { type: 'string' },
	},
	addReferral: {
		id: { type: 'number' },
		referralId: { type: 'number' },
	},

};

module.exports = HotelRules;
