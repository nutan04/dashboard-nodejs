const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    purchase_price: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },

});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
