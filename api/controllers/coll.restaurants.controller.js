class CollectionsRestaurantsController {
    constructor(collectionService, restaurantService, socketService) {
        this.collectionService = collectionService;
        this.restaurantService = restaurantService;
        this.socketService = socketService;
        this.addRestaurant = this.addRestaurant.bind(this);
        this.removeRestaurant = this.removeRestaurant.bind(this);
    }

    async addRestaurant(req, res) {
        if (await this.collectionService.belongsTo(req.params.id, req.user.id)) {
            const restaurant = await this.restaurantService.find(req.params.restaurant);
            if (restaurant) {
                await this.collectionService.addRestaurant(req.params.id, restaurant.id);
                const collection = await this.collectionService.find(req.params.id);
                this.socketService.broadcastToRooms(
                    collection.users, 'restaurant-added', restaurant
                );

                return res.send({success: true});
            }
        }

        return res.send({error: 'Collection not found'});
    }

    async removeRestaurant(req, res) {
        if (await this.collectionService.belongsTo(req.params.id, req.user.id)) {
            await this.collectionService.removeRestaurant(req.params.id, req.params.restaurant);
            const collection = await this.collectionService.find(req.params.id);
            this.socketService.broadcastToRooms(
                collection.users, 'restaurant-removed', req.params.restaurant
            );

            return res.send({success: true});
        }

        return res.send({error: 'Collection not found'});
    }
}

module.exports = CollectionsRestaurantsController;
