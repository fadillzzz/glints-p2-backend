const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

class AuthService {
    createToken(user) {
        return jwt.sign({id: user.id, email: user.email}, config.secret);
    }

    async isPasswordValid(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    async generateHash(password) {
        return await bcrypt.hash(password, 10);
    }
}

module.exports = AuthService;
