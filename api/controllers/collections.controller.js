class CollectionsController {
    constructor(collectionService, userService) {
        this.collectionService = collectionService;
        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
        this.show = this.show.bind(this);
        this.edit = this.edit.bind(this);
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
}

module.exports = CollectionsController;
