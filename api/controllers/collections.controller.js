class CollectionsController {
    constructor(collectionService, restaurantService, userService) {
        this.collectionService = collectionService;
        this.restaurantService = restaurantService;
        this.userService = userService;
        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
        this.show = this.show.bind(this);
        this.edit = this.edit.bind(this);
        this.addRestaurant = this.addRestaurant.bind(this);
        this.removeRestaurant = this.removeRestaurant.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    async create(req, res) {
        let collection = await this.collectionService.create(req.body.name);
        await this.collectionService.addUser(collection.id, req.user.id);

        res.send({collection});
    }

    async get(req, res) {
        const collections = await this.collectionService.findAll(req.user.id);
        return res.send({collections});
    }

    async show(req, res) {
        if (await this.collectionService.belongsTo(req.params.id, req.user.id)) {
            const collection = await this.collectionService.find(req.params.id, ['restaurants', 'users']);
            return res.send(collection);
        }

        return res.send({error: 'Collection not found'});
    }

    async edit(req, res) {
        if (await this.collectionService.belongsTo(req.params.id, req.user.id)) {
            const collection = await this.collectionService.update(req.params.id, {name: req.body.name});

            return res.send({success: true});
        }

        return res.send({error: 'Collection not found'});
    }

    async addRestaurant(req, res) {
        if (await this.collectionService.belongsTo(req.params.id, req.user.id)) {
            const restaurant = await this.restaurantService.find(req.params.restaurant);
            if (restaurant) {
                await this.collectionService.addRestaurant(req.params.id, restaurant.id);

                return res.send({success: true});
            }
        }

        return res.send({error: 'Collection not found'});
    }

    async removeRestaurant(req, res) {
        if (await this.collectionService.belongsTo(req.params.id, req.user.id)) {
            await this.collectionService.removeRestaurant(req.params.id, req.params.restaurant);
            return res.send({success: true});
        }

        return res.send({error: 'Collection not found'});
    }

    async addUser(req, res) {
        if (await this.collectionService.belongsTo(req.params.id, req.user.id)) {
            const {email} = req.body;
            if (await this.userService.existsByEmail(email)) {
                const user = await this.userService.find(email);
                await this.collectionService.addUser(req.params.id, user.id);

                return res.send({user});
            }

            return res.send({error: 'User not found'});
        }

        return res.send({error: 'Collection not found'});
    }
}

module.exports = CollectionsController;
