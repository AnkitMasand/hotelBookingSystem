const UserController = require('../controllers/user');


class User {
	constructor() {
		this.userController = new UserController();
	}

	attachRoutes(router) {
		return router
			.post('/user', this.userController.createUser)
			.get('/users',  this.userController.showAllUsers)
			// .get('/user/:id',  this.userController.showProfile)
			// .get('/user/children/:id',  this.userController.showChildren)
			// .put('/user/referral',  this.userController.addReferral)
			.put('/user',  this.userController.updateInfo);
	}
}

module.exports = User;
