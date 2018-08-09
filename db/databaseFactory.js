const _ = require('lodash');
const CustomError = require('../libs/customError');
const statusCodes = require('../libs/statusCodes');
const MongoDB = require('./wrappers/mongoDb');

let mongoInstance = null;

class DatabaseFactory {
    connectMongo() {
        if (!mongoInstance) {
            mongoInstance = new MongoDB();
        }
        return mongoInstance;
    }
    // connectRedis() {
    // 	try {
    // 		if (!redisInstance) {
    // 			redisInstance = new Redis();
    // 		}

    // 		return redisInstance;
    // 	} catch (err) {
    // 		console.error(`Redis connection error: ${err}`);
    // 		process.exit(-1); // eslint-disable-line no-magic-numbers
    // 		throw new CustomError(status.INTERNAL_FAILURE);
    // 	}
    // }
}

module.exports = DatabaseFactory;