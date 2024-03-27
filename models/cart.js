const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    }

});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
