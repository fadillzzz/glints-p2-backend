const moment = require('moment');
const Restaurant = require('../models/restaurant.model');

class RestaurantService {
    /**
     * Returns all restaurants that satisfy the dateTime constraint
     *
     * @param {String|null} dateTime Should be in the form of "Day H:mm AM/PM"
     * @return {Promise<mongoose.Model[]>}
     */
    async findAll(dateTime = null) {
        const constraint = {};

        if (dateTime) {
            dateTime = moment(dateTime, 'ddd H:mm A');
            const minuteOfDay = dateTime.diff(dateTime.clone().startOf('day'), 'minutes');

            constraint['availability.day'] = dateTime.day();
            constraint['availability.open'] = {$gte: minuteOfDay};
            constraint['availability.close'] = {$lt: minuteOfDay + 30}; // We're working with 30 minute intervals
        }

        return await Restaurant.find(constraint);
    }

    /**
     * Find a restaurant by its ID
     *
     * @param {String} id
     * @return {Promise<mongoose.Model>}
     */
    async find(id) {
        return await Restaurant.findById(id);
    }
}

module.exports = RestaurantService;
