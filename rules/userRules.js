// Validation rules for hotel controls

const UserRules = {

	createUser: {
		name: { type: 'string' },
		city: { type: 'string' },
	},
	updateInfo: {
		id: { type: 'string' },
	}

};

module.exports = UserRules;
