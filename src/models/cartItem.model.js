const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
})


const CartItem = mongoose.model('CartItem',cartItemSchema);

module.exports = CartItem;