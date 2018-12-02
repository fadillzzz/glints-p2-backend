const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

class AuthService {
    async createToken(user) {
        return await jwt.sign({id: user.id, email: user.email}, config.secret, {expiresIn: '1 days'});
    }

    async isPasswordValid(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    async generateHash(password) {
        return await bcrypt.hash(password, 10);
    }

    async getUserIdFromToken(token) {
        try {
            const decoded = await jwt.verify(token, config.secret);
            return decoded.id;
        } catch (e) {
            return '';
        }
    }
}

module.exports = AuthService;
