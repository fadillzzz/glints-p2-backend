const AuthController = require('./auth.controller');
const {AuthService, UserService} = require('../services');

module.exports = {
    AuthController: new AuthController(AuthService, UserService)
};
