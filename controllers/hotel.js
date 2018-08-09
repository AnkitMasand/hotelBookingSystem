const Raven = require('raven');

const Hotel = require('../modules/hotel');
const rules = require('../rules/hotelRules');
const logsConfig = require('../config/logs.json');
const CustomUtils = require('../libs/customUtils');


const hotel = new Hotel();
const customUtils = new CustomUtils();

Raven.config(logsConfig.sentry.cdn).install();

class HotelController {

    async createHotel(ctx) {
        try {
            customUtils.validateParams(rules.createHotel, ctx.request.body);
            const result = await hotel.createHotel(ctx.request.body);
            ctx.body = result;
            return;
        } catch (err) {
            Raven.captureException(err);


            ctx.body = err;
        }
    }

    async showAllHotels(ctx) {
        try {
        	let params = ctx.query;
            const { meta, result } = await hotel.showAllHotels(params);
            ctx.status = meta.code;
            ctx.body = { meta, result };
            return;
        } catch (err) {
            Raven.captureException(err);

            const { status, message } = err;
            ctx.status = status;
            ctx.body = { message };
        }
    }

    async updateInfo(ctx) {
        try {
        	let params = ctx.request.body;
            const { meta, result } = await hotel.updateInfo(params);
            ctx.status = meta.code;
            ctx.body = { meta, result };
            return;
        } catch (err) {
            Raven.captureException(err);

            const { status, message } = err;
            ctx.status = status;
            ctx.body = { message };
        }
    }
    async addRooms (ctx) {
        try {
            let params = ctx.params;
            let data = ctx.request.body;
            params.addRooms = data.addRooms;
            const { meta, result } = await hotel.addRooms(params);
            ctx.body = { meta, result };
            return;
        } catch (err) {
            Raven.captureException(err);

            const { status, message } = err;
            ctx.status = status;
            ctx.body = { message };
        }
    }
}

module.exports = HotelController;