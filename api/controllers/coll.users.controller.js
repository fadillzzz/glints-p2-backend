class CollectionsUsersController {
    constructor(collectionService, userService, socketService) {
        this.collectionService = collectionService;
        this.userService = userService;
        this.socketService = socketService;
        this.addUser = this.addUser.bind(this);
    }

    async addUser(req, res) {
        if (await this.collectionService.belongsTo(req.params.id, req.user.id)) {
            const {email} = req.body;
            if (await this.userService.existsByEmail(email)) {
                const user = await this.userService.find(email);
                const collection = await this.collectionService.addUser(req.params.id, user.id);

                this.socketService.broadcastToRooms(collection.users, 'add-user', user);
                this.socketService.broadcastToRooms([user.id], 'add-collection', collection);

                return res.send({user});
            }

            return res.send({error: 'User not found'});
        }

        return res.send({error: 'Collection not found'});
    }
}

module.exports = CollectionsUsersController;
