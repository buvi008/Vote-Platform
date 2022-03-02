const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {type: Number, unique: true, require: true},
    name: String,
    password: {type: String, require: true},
    phone: {type: String, unique: true, require: true},
    city: {type: String, require: true},
    age: Number,
    verificationTel: Boolean,
    employment: String,
    accessToken: String,
    refreshToken: String,
}, {timestamps: {}})

module.exports = mongoose.model('User', userSchema);
