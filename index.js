const app = require('./app');

const config = require(`./config/${process.env.NODE_ENV}.json`);

const PORT = config.port;
const server = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

module.exports = server;
