const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    id: String,
    name: String,
    position: Number,
})

module.exports = mongoose.model('Category', categorySchema);
