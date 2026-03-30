const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://mern-final-project-mpnd738dv-mehdibahri12-a12ys-projects.vercel.app/'],
  credentials: true
}));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // ADD THIS
const weeklyProductRoutes = require('./routes/weeklyProductRoutes');
const orderRoutes = require('./routes/orderRoutes');




// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // ADD THIS
app.use('/api/weekly', weeklyProductRoutes); // ADD THIS
app.use('/api/orders', orderRoutes);




// Basic route (keep this at the end)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Organic Store API' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});