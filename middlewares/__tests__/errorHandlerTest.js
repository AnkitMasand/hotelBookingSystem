const request = require('supertest');
const server = require('../../index');

afterEach(() => {
	server.close();
});

describe('Testing all error handler middlewares', () => {
	it('unreachable route should return 404 status code and relevant message', async () => {
		const result = await request(server).get('/someWrongRoute');
		expect(result.body).toEqual({ message: 'Not Found' });
	});
});
