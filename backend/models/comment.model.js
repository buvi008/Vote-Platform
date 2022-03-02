const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
  to: {type: mongoose.Schema.Types.ObjectId, ref: 'Variant', require: true},
  message: String,
}, {timestamps: {}})

module.exports = mongoose.model('Comment', userSchema);
