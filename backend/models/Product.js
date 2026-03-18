const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['food', 'beauty', 'spices', 'grains', 'oils', 'beverages', 'snacks']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/300x200?text=Organic+Product'
    },
    unit: {
        type: String,
        required: true,
        enum: ['kg', 'g', 'lb', 'piece', 'bottle', 'jar', 'pack']
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isOrganic: {
        type: Boolean,
        default: true
    },
    origin: {
        type: String,
        default: 'Local farm'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);