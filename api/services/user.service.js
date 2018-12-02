const bcrypt = require('bcrypt');
const User = require('../models/user.model');

class UserService {
    /**
     * @param {AuthService} authService
     */
    constructor(authService) {
        this.authService = authService;
    }

    /**
     * Finds a user by their email address
     *
     * @param {String} email
     * @return {Promise<mongoose.Model>}
     */
    async find(email) {
        const user = await User.findOne({email});

        return user;
    }

    /**
     * Checks whether or not a user exists
     *
     * @param {String} email
     * @return {Promise<Boolean>}
     */
    async existsByEmail(email) {
        return await User.countDocuments({email}) > 0;
    }

    /**
     * Creates a new user
     *
     * @param {String} email
     * @param {String} password
     * @return {Promise<mongoose.Model>}
     */
    async create(email, password) {
        const hashedPassword = await this.authService.generateHash(password);
        const user = await User.create({email, password: hashedPassword});

        return user;
    }
}

module.exports = UserService;
