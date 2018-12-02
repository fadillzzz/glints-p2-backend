const {AuthService, UserService, RestaurantService, CollectionService} = require('../services');
const AuthController = require('./auth.controller');
const RestaurantsController = require('./restaurants.controller');
const CollectionsController = require('./collections.controller');

module.exports = {
    AuthController: new AuthController(AuthService, UserService),
    RestaurantsController: new RestaurantsController(RestaurantService),
    CollectionsController: new CollectionsController(CollectionService, RestaurantService, UserService)
};
