const AuthService = require('./auth.service');
const UserService = require('./user.service');
const RestaurantService = require('./restaurant.service');

module.exports = {
    AuthService: new AuthService(),
    UserService: new UserService(new AuthService()),
    RestaurantService: new RestaurantService(),
}
