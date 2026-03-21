const mongoose = require('mongoose');
const dotenv = require('dotenv');
const WeeklyProduct = require('./models/WeeklyProduct');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected for weekly seeding'))
    .catch(err => console.error('Connection error:', err));

const weeklyProducts = [
    {
        name: 'Organic Heirloom Tomatoes',
        category: 'vegetable',
        price: 5.99,
        unit: 'kg',
        availableQuantity: 25,
        farmer: 'Green Valley Farm',
        farmerLocation: 'Sonoma County, CA',
        description: 'Sweet, juicy heirloom tomatoes picked at peak ripeness',
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300'
    },
    {
        name: 'Fresh Organic Strawberries',
        category: 'fruit',
        price: 6.99,
        unit: 'kg',
        availableQuantity: 30,
        farmer: 'Berry Bliss Farm',
        farmerLocation: 'Watsonville, CA',
        description: 'Sweet and fragrant strawberries, perfect for snacking',
        imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300'
    },
    {
        name: 'Farm Fresh Eggs',
        category: 'eggs',
        price: 8.99,
        unit: 'dozen',
        availableQuantity: 20,
        farmer: 'Happy Hens Farm',
        farmerLocation: 'Petaluma, CA',
        description: 'Pasture-raised, organic eggs with deep orange yolks',
        imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300'
    },
    {
        name: 'Raw Organic Milk',
        category: 'dairy',
        price: 7.99,
        unit: 'liter',
        availableQuantity: 15,
        farmer: 'Daisy Meadow Farm',
        farmerLocation: 'Marin County, CA',
        description: 'Fresh raw milk from grass-fed cows',
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300'
    },
    {
        name: 'Organic Free-Range Chicken',
        category: 'chicken',
        price: 14.99,
        unit: 'kg',
        availableQuantity: 10,
        farmer: 'Pasture Poultry Farm',
        farmerLocation: 'Chico, CA',
        description: 'Whole free-range chicken, pasture-raised',
        imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300'
    },
    {
        name: 'Artisan Goat Cheese',
        category: 'cheese',
        price: 9.99,
        unit: 'pack',
        availableQuantity: 12,
        farmer: 'Caprine Delights',
        farmerLocation: 'Napa, CA',
        description: 'Creamy aged goat cheese, made from organic milk',
        imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=300'
    }
];

const seedWeeklyProducts = async () => {
    try {
        // Clear existing weekly products
        await WeeklyProduct.deleteMany({});
        console.log('Cleared existing weekly products');

        // Insert new weekly products
        await WeeklyProduct.insertMany(weeklyProducts);
        console.log(`Added ${weeklyProducts.length} weekly products`);

        mongoose.disconnect();
        console.log('Weekly seeding complete');
    } catch (error) {
        console.error('Error seeding weekly products:', error);
        mongoose.disconnect();
    }
};

seedWeeklyProducts();