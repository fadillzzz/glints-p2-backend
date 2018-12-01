const {AuthService, UserService} = require('../services');
const AuthController = require('./auth.controller');
const RestaurantsController = require('./restaurants.controller');

module.exports = {
    AuthController: new AuthController(AuthService, UserService),
    RestaurantsController: new RestaurantsController()
};
