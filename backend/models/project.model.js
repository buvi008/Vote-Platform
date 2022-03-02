const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = mongoose.Schema({
    id: String,
    name: String,
    variantId: [{type: Schema.Types.ObjectId, ref: "Variant"}],
    adrProject: String,
    infoText: String,
    city: String,
    openProject: Boolean,
}, {timestamps: {}})

module.exports = mongoose.model('Project', projectSchema);

