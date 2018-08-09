class ErrorHandler {
	/**
	 * 404 handler
	 *
	 * @param {Object} ctx request
	 * @param {Object} next continue execution
	 * @memberof ErrorHandler
	 */

	async handle404(ctx, next) {
		try {
			await next();
			if (ctx.status === 404) {
				ctx.throw(404);
			}
		} catch (err) {
			ctx.status = err.statusCode || err.status || 500;
			ctx.body = {
				message: err.message,
			};
			ctx.app.emit('error', err, ctx);
		}
	}
}

module.exports = ErrorHandler;
