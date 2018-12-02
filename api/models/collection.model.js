const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    name: {type: String, required: true},
    restaurants: [{type: Schema.Types.ObjectId, ref: 'Restaurant'}],
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
