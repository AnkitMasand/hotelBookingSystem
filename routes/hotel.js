const HotelController = require('../controllers/hotel');


class Hotel {
	constructor() {
		this.hotelController = new HotelController();
	}

	attachRoutes(router) {
		return router
			.post('/hotel', this.hotelController.createHotel)
			.post('/hotel/:_id', this.hotelController.addRooms)
			.get('/hotels',  this.hotelController.showAllHotels)
			// .get('/hotel/:id',  this.hotelController.showProfile)
			// .get('/hotel/children/:id',  this.hotelController.showChildren)
			// .put('/hotel/referral',  this.hotelController.addReferral)
			.put('/hotel',  this.hotelController.updateInfo);
	}
}

module.exports = Hotel;
