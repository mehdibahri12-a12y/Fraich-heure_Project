const mongoose = require('mongoose');

const weeklyProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['vegetable', 'fruit', 'dairy', 'eggs', 'chicken', 'cheese']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        required: true,
        enum: ['kg', 'piece', 'bunch', 'dozen', 'liter', 'pack']
    },
    availableQuantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    farmer: {
        type: String,
        required: true,
        trim: true
    },
    farmerLocation: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/300x200?text=Weekly+Product'
    },
    weekOf: {
        type: Date,
        required: true,
        default: function () {
            // Set to Monday of current week
            const today = new Date();
            const day = today.getDay();
            const diff = today.getDate() - day + (day === 0 ? -6 : 1);
            return new Date(today.setDate(diff));
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for efficient queries
weeklyProductSchema.index({ weekOf: -1, category: 1 });

module.exports = mongoose.model('WeeklyProduct', weeklyProductSchema);