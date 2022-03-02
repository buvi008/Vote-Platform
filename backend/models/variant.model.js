const mongoose = require('mongoose');

const variantSchema = mongoose.Schema({
    nameVariant: String,
    images: Array,
    infoText: String,
    likes: Array,
    count: Number
}, {timestamps: {}})

module.exports = mongoose.model('Variant', variantSchema);
