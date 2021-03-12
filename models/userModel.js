const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    addr: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    pass: { type: String },
    notifications: { type: Array },
});

module.exports = mongoose.model('user', UserSchema, 'user');