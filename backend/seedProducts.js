const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.error('Connection error:', err));

const sampleProducts = [
    // Food category
    {
        name: 'Organic Quinoa',
        category: 'food',
        price: 8.99,
        description: 'Premium organic quinoa, rich in protein and fiber. Perfect for healthy meals.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'kg',
        stock: 50,
        origin: 'Peru'
    },
    {
        name: 'Organic Brown Rice',
        category: 'food',
        price: 6.99,
        description: 'Whole grain brown rice, naturally grown without pesticides.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'kg',
        stock: 100,
        origin: 'California'
    },

    // Grains category
    {
        name: 'Organic Rolled Oats',
        category: 'grains',
        price: 5.99,
        description: 'Heart-healthy organic oats, perfect for breakfast.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'kg',
        stock: 75,
        origin: 'Canada'
    },
    {
        name: 'Organic Barley',
        category: 'grains',
        price: 4.99,
        description: 'Pearl barley, great for soups and stews.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'kg',
        stock: 40,
        origin: 'Montana'
    },

    // Spices category
    {
        name: 'Organic Turmeric Powder',
        category: 'spices',
        price: 7.99,
        description: 'Pure organic turmeric, known for its anti-inflammatory properties.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'g',
        stock: 30,
        origin: 'India'
    },
    {
        name: 'Organic Cinnamon Sticks',
        category: 'spices',
        price: 6.99,
        description: 'Aromatic cinnamon sticks from organic farms.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'g',
        stock: 25,
        origin: 'Sri Lanka'
    },

    // Oils category
    {
        name: 'Extra Virgin Olive Oil',
        category: 'oils',
        price: 16.99,
        description: 'Cold-pressed extra virgin olive oil, rich in antioxidants.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'bottle',
        stock: 40,
        origin: 'Italy'
    },
    {
        name: 'Organic Coconut Oil',
        category: 'oils',
        price: 12.99,
        description: 'Virgin coconut oil, perfect for cooking and skincare.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'jar',
        stock: 35,
        origin: 'Philippines'
    },

    // Beauty category
    {
        name: 'Organic Shea Butter',
        category: 'beauty',
        price: 14.99,
        description: 'Raw unrefined shea butter for natural skin care.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'jar',
        stock: 20,
        origin: 'Ghana'
    },
    {
        name: 'Lavender Essential Oil',
        category: 'beauty',
        price: 11.99,
        description: 'Pure lavender oil for aromatherapy and relaxation.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-5f6a1a9a3d2f?w=300',
        unit: 'bottle',
        stock: 15,
        origin: 'France'
    }
];

const seedDatabase = async () => {
    try {
        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert sample products
        await Product.insertMany(sampleProducts);
        console.log('Added sample products');

        // Disconnect
        mongoose.disconnect();
        console.log('Database seeding complete');
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.disconnect();
    }
};

seedDatabase();