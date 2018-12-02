class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.create = this.create.bind(this);
    }

    async create(req, res) {
        const {email, password} = req.body;
        let user = await this.userService.find(email);

        if (! user) {
            user = await this.userService.create(email, password);
        }

        if (await this.authService.isPasswordValid(password, user.password)) {
            const token = await this.authService.createToken(user);
            res.send({token});
        } else {
            res.send({error: 'Incorrect password'});
        }
    }
}

module.exports = AuthController;
