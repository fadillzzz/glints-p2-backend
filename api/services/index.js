const AuthService = require('./auth.service');
const UserService = require('./user.service');

module.exports = {
    AuthService: new AuthService(),
    UserService: new UserService(new AuthService())
}
