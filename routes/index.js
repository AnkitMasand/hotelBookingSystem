const Router = require('koa-router');

const Hotel = require('./user');
const User = require('./hotel');

class IndexRouter extends Router {
	constructor() {
		super();
		this.user = new User();
		this.hotel = new Hotel();
	}

	attachRoutes() {
		this.user.attachRoutes(this);
		this.hotel.attachRoutes(this);
	}
}

module.exports = IndexRouter;
