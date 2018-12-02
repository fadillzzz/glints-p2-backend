const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

class AuthService {
    /**
     * Create an authentication token for the given user
     *
     * @param {Object} user
     * @return {Promise<String>}
     */
    async createToken(user) {
        return await jwt.sign({id: user.id, email: user.email}, config.secret, {expiresIn: '1 days'});
    }

    /**
     * Checks whether the given password matches the hash
     *
     * @param {String} password
     * @param {String} hash
     * @return {Promise<Boolean>}
     */
    async isPasswordValid(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    /**
     * Generates a hash for the given password
     *
     * @param {String} password
     * @return {Promise<String>}
     */
    async generateHash(password) {
        return await bcrypt.hash(password, 10);
    }

    /**
     * Derive the user ID from the given auth token
     *
     * @param {String} token
     * @return {Promise<String>}
     */
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
