
const user = require('./user');
const account = require('./account');
const useType = require('./useType');

module.exports = app => {
	app.use('/api/user', user);
	app.use('/api/account', account);
	app.use('/api/useType', useType);
}

















