const _ = require('lodash');
const CustomError = require('../libs/customError');
const statusCodes = require('../libs/statusCodes');

class CustomUtils {
	/**
	 * Get new hotel params
	 *
	 * @param {Object} params hotel params
	 * @param {String} params.name hotel name
	 * @param {String} params.city hotel's city
	 * @param {number} params.numberOfRooms number of rooms in a hotel
	 * @returns {Object} user params object to store in db
   * @memberof CustomUtils
	 */

	getNewHotelParams(params) {
		return {
			name: params.name,
			city: params.city,
			numberOfRooms: params.numberOfRooms || null,
		};
	}

	getNewUserParams(params) {
		return {
			name: params.name,
			city: params.city
		};
	}

	/**
   * Validate input params
   *
   * @param {Object} requiredParams required params
   * @param {Object} params actual params sent from frontend
   * @returns {Boolean} true if params are valid
   * @memberof CustomUtils
   */

	validateParams(requiredParams, params) {
		const errObj = statusCodes.VALIDATION_FAILURE;
		let requiredType;

		for (const key in requiredParams) {
			if (!params[key]) {
				errObj.message = `Required param ${key} not found`;
				throw new CustomError(errObj);
			}

			requiredType = requiredParams[key].type;
			if (requiredType !== typeof params[key]) {
				errObj.message = `Param ${key} type mismatch. Required type: ${requiredType}`;
				throw new CustomError(errObj);
			}

			if (!_.isEmpty(requiredParams[key].values)) {
				const { values } = requiredParams[key];
				console.log('required values => ', values, params[key], _.find(values, params[key]));
				if (_.indexOf(values, params[key]) === -1) {
					errObj.message = `Param ${key} value ${params[key]} is invalid. Required value can be: ${values.join()}`;
					throw new CustomError(errObj);
				}
			}
		}

		return true;
	}
}

module.exports = CustomUtils;
