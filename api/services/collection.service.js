const Collection = require('../models/collection.model');

class CollectionService {
    async create(name) {
        return await Collection.create({name});
    }

    async addUser(collectionId, userId) {
        return await Collection.findOneAndUpdate({_id: collectionId}, {$addToSet: {users: userId}});
    }

    async find(collectionId, extra = []) {
        const query = Collection.findById(collectionId);

        if (extra.length) {
            extra.forEach(field => {
                query.populate(field);
            });
        }

        return await query;
    }

    async exists(collectionId) {
        return await Collection.countDocuments({_id: collectionId}) > 0;
    }

    async findAll(userId) {
        return await Collection.find({users: userId});
    }

    async belongsTo(collectionId, userId) {
        return await Collection.countDocuments({_id: collectionId, users: userId}) > 0;
    }

    async addRestaurant(collectionId, restaurantId) {
        return await Collection.findOneAndUpdate({_id: collectionId}, {
            $addToSet: {restaurants: restaurantId}
        });
    }

    async update(collectionId, data) {
        return await Collection.findOneAndUpdate({_id: collectionId}, data);
    }

    async removeRestaurant(collectionId, restaurantId) {
        return await Collection.findOneAndUpdate({_id: collectionId}, {
            $pull: {restaurants: restaurantId}
        });
    }
}

module.exports = CollectionService;
