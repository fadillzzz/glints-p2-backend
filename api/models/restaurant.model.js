const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
    day: {type: Number, required: true},
    open: {type: Number, required: true},
    close: {type: Number, required: true}
});

availabilitySchema.index({open: 1, close: 1, day: 1});

const restaurantSchema = new Schema({
    name: {type: String, required: true},
    availability: [availabilitySchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
