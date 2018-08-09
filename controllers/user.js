const Raven = require('raven');

const User = require('../modules/user');
const rules = require('../rules/userRules');
const logsConfig = require('../config/logs.json');
const CustomUtils = require('../libs/customUtils');


const user = new User();
const customUtils = new CustomUtils();

Raven.config(logsConfig.sentry.cdn).install();

class UserController {

    async createUser(ctx) {
        try {
            customUtils.validateParams(rules.createUser, ctx.request.body);

            const result = await user.createUser(ctx.request.body);
            ctx.body = result;
            return;
        } catch (err) {
            Raven.captureException(err);


            ctx.body = err;
        }
    }

    async showAllUsers(ctx) {
        try {
        	let params = ctx.query;
            const { meta, result } = await user.showAllUsers(params);
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
            const { meta, result } = await user.updateInfo(params);
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
}

module.exports = UserController;