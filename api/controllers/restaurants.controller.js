class RestaurantsController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
        this.search = this.search.bind(this);
    }

    async search(req, res) {
        const restaurants = await this.restaurantService.findAll(req.query.dateTime);

        res.send({restaurants});
    }
}

module.exports = RestaurantsController;
