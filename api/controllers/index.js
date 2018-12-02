const {AuthService, UserService, RestaurantService, CollectionService, SocketService} = require('../services');
const AuthController = require('./auth.controller');
const RestaurantsController = require('./restaurants.controller');
const CollectionsController = require('./collections.controller');
const CollectionsRestaurantsController = require('./coll.restaurants.controller');
const CollectionsUsersController = require('./coll.users.controller');

module.exports = {
    AuthController: new AuthController(AuthService, UserService),
    RestaurantsController: new RestaurantsController(RestaurantService),
    CollectionsController: new CollectionsController(CollectionService, UserService),
    CollectionsRestaurantsController: new CollectionsRestaurantsController(
        CollectionService, RestaurantService, SocketService
    ),
    CollectionsUsersController: new CollectionsUsersController(CollectionService, UserService)
};
