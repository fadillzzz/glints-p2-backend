const bcrypt = require('bcrypt');

class AuthService {
    createToken() {
        return 'token';
    }

    async isPasswordValid(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    async generateHash(password) {
        return await bcrypt.hash(password, 10);
    }
}

module.exports = AuthService;
