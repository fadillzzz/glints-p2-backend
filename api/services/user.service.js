const bcrypt = require('bcrypt');
const User = require('../models/user.model');

class UserService {
    constructor(authService) {
        this.authService = authService;
    }

    async find(email) {
        const user = await User.findOne({email});

        return user;
    }

    async exists(id) {
        return await User.countDocuments({_id: id}) > 0;
    }

    async create(email, password) {
        const hashedPassword = await this.authService.generateHash(password);
        const user = await User.create({email, password: hashedPassword});

        return user;
    }
}

module.exports = UserService;
