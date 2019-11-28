const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    id: Number,
    name: String
});

module.exports = mongoose.model('Product', ProductSchema);