const debug = require('debug');
const packageJson = require('./package.json');

(function setEnvironmentVariables() {
	process.env.NODE_ENV = process.env.NODE_ENV || 'production';
	process.env.VERSION = packageJson.version || 'undefined';
	if (process.env.NODE_ENV === 'development') {
		process.env.DEBUG = process.env.DEBUG || 'app,koa:router,koa:application,debug,te:*';
	}
	debug(`environment: ${process.env.NODE_ENV}`);
	debug(`version: ${process.env.VERSION}`);
}());
