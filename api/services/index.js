const AuthService = require('./auth.service');
const UserService = require('./user.service');
const RestaurantService = require('./restaurant.service');
const CollectionService = require('./collection.service');
const SocketService = require('./socket.service');

module.exports = {
    AuthService: new AuthService(),
    UserService: new UserService(new AuthService()),
    RestaurantService: new RestaurantService(),
    CollectionService: new CollectionService(),
    SocketService: new SocketService(new AuthService())
}
