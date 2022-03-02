const mongoose = require('mongoose');

const configSchema = mongoose.Schema({
    setup: Number,
    warn: Number,
    more: Number,
})

module.exports = mongoose.model('Config', configSchema);
