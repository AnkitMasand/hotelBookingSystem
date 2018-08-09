const _ = require('lodash');
const moment = require('moment');

const DatabaseFactory = require('../db/databaseFactory');
const statusCodes = require('../libs/statusCodes');
const CustomError = require('../libs/customError');
const CustomUtils = require('../libs/customUtils');

const customUtils = new CustomUtils();

const db = new DatabaseFactory().connectMongo();


const HotelSchema = require('../db/models/hotel').schema;

const config = require(`../config/${process.env.NODE_ENV}.json`);

class Hotel {
    async createHotel(params) {
        try {
            let dataaa = moment().format('MMMM Do YYYY, h:mm a');
            let newDate = dataaa.split(',')
            console.log("Current Time: ", newDate[1]);

            const hotelData = customUtils.getNewHotelParams(params);
            let result = await db.insert(HotelSchema, hotelData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async showAllHotels(params) {
        try {
            const projections = {  __v: 0 };
            const profiles = await db.findAll(HotelSchema,params, projections);

            if (!profiles || !profiles.length) {
                throw new CustomError(statusCodes.DATA_NOT_FOUND);
            }

            return {
                meta: statusCodes.API_SUCCESS,
                result: profiles,
            };
        } catch (err) {
            throw err;
        }
    }

    async updateInfo(params) {
		try {
			const query = { _id: params._id };
			delete params._id;
			const update = { $set:  params };
			await db.update(HotelSchema, query, update);

			return {
				meta: statusCodes.API_SUCCESS,
			};
		} catch (err) {
			throw err;
		}
	}

    async addRooms(params) {
        try {

            const query = { _id: params._id };
            const update = { $inc:  {numberOfRooms: params.addRooms} };
            console.log("_____",query, update)
            await db.update(HotelSchema, query, update);

            return {
                meta: statusCodes.API_SUCCESS,
            };
        } catch (err) {
            throw err;
        }
    }
}


module.exports = Hotel;