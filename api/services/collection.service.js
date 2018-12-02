const Collection = require('../models/collection.model');

class CollectionService {
    /**
     * Create a new collection with the given name
     *
     * @param {String} name
     * @return {Promise<mongoose.Model>}
     */
    async create(name) {
        return await Collection.create({name});
    }

    /**
     * Adds a user to a collection
     *
     * @param {String} collectionId
     * @param {String} userId
     * @return {Promise<mongoose.Model>}
     */
    async addUser(collectionId, userId) {
        return await Collection.findOneAndUpdate({_id: collectionId}, {$addToSet: {users: userId}});
    }

    /**
     * Find a collection by its ID and optionally load the sub documents
     *
     * @param {String} collectionId
     * @param {String[]} extra The extra attributes that we want to populate
     * @return {Promise<mongoose.Model>}
     */
    async find(collectionId, extra = []) {
        const query = Collection.findById(collectionId);

        if (extra.length) {
            extra.forEach(field => {
                query.populate(field);
            });
        }

        return await query;
    }

    /**
     * Checks whether or not a collection exists
     *
     * @param {String} collectionId
     * @return {Promise<Boolean>}
     */
    async exists(collectionId) {
        return await Collection.countDocuments({_id: collectionId}) > 0;
    }

    /**
     * Returns all collections that belong to a user
     *
     * @param {String} userId
     * @return {Promise<mongoose.Model[]>}
     */
    async findAll(userId) {
        return await Collection.find({users: userId});
    }

    /**
     * Checks whether the given user has access to the given collection
     *
     * @param {String} collectionId
     * @param {String} userId
     * @return {Promise<Boolean>}
     */
    async belongsTo(collectionId, userId) {
        return await Collection.countDocuments({_id: collectionId, users: userId}) > 0;
    }

    /**
     * Adds a restaurant to a collection
     *
     * @param {String} collectionId
     * @param {String} restaurantId
     */
    async addRestaurant(collectionId, restaurantId) {
        return await Collection.findOneAndUpdate({_id: collectionId}, {
            $addToSet: {restaurants: restaurantId}
        });
    }

    /**
     * Updates a collection
     *
     * @param {String} collectionId
     * @param {Object} data
     * @return {Promise<mongoose.Model>}
     */
    async update(collectionId, data) {
        return await Collection.findOneAndUpdate({_id: collectionId}, data);
    }

    /**
     * Removes a restaurant from a collection
     *
     * @param {String} collectionId
     * @param {String} restaurantId
     */
    async removeRestaurant(collectionId, restaurantId) {
        return await Collection.findOneAndUpdate({_id: collectionId}, {
            $pull: {restaurants: restaurantId}
        });
    }
}

module.exports = CollectionService;
