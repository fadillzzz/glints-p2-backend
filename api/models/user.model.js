const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, index: true},
    password: {type: String, required: true}
});

userSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
