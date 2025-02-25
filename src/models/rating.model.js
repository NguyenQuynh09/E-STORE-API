const mongoose = require("mongoose");
const { schema } = mongoose;

const ratingSchema = new SChema({
    user: {
        type: mongoose.SChema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    product: {
        type: mongoose.SChema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Rating = mongoose.model('ratings', ratingSchema);

module.exports = Rating;