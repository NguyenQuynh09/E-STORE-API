    const mongoose = require('mongoose');
    const Category = require('./category.model');

    const productSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discountedPrice: {
            type: Number,
        },
        discountPersent: {
            type: Number,
        },
        quantity: {
            type: Number,
            required: true,
        },
        brand: {
            type: String,
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reviews',
        }],
        numRatings: {
            type: Number,
            default: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

    const Product = mongoose.model('Product', productSchema);

    module.exports = Product;