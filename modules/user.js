const _ = require('lodash');
const Promise = require('bluebird');

const DatabaseFactory = require('../db/databaseFactory');
const statusCodes = require('../libs/statusCodes');
const CustomError = require('../libs/customError');
const CustomUtils = require('../libs/customUtils');

const customUtils = new CustomUtils();

const db = new DatabaseFactory().connectMongo();


const UserSchema = require('../db/models/user').schema;

const config = require(`../config/${process.env.NODE_ENV}.json`);

class User {
    async createUser(params) {
        try {

            const userData = customUtils.getNewUserParams(params);
            let result = await db.insert(UserSchema, userData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async showAllUsers(params) {
        try {
            const projections = {  __v: 0 };
            const profiles = await db.findAll(UserSchema,params, projections);

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
			await db.update(UserSchema, query, update);

			return {
				meta: statusCodes.API_SUCCESS,
			};
		} catch (err) {
			throw err;
		}
	}
}


module.exports = User;