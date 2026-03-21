const WeeklyProduct = require('../models/WeeklyProduct');

// Get all active weekly products (current week)
exports.getCurrentWeeklyProducts = async (req, res) => {
    try {
        const products = await WeeklyProduct.find({
            isActive: true,
            availableQuantity: { $gt: 0 }
        }).sort({ category: 1, name: 1 });

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get weekly products by category
exports.getWeeklyProductsByCategory = async (req, res) => {
    try {
        const products = await WeeklyProduct.find({
            category: req.params.category,
            isActive: true,
            availableQuantity: { $gt: 0 }
        }).sort({ name: 1 });

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get weekly products for a specific week
exports.getWeeklyProductsByDate = async (req, res) => {
    try {
        const { year, week } = req.params;
        // Calculate start date of that week
        const startDate = new Date(year, 0, 1 + (week - 1) * 7);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);

        const products = await WeeklyProduct.find({
            weekOf: { $gte: startDate, $lt: endDate }
        }).sort({ category: 1, name: 1 });

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// ADMIN ONLY: Create weekly product
exports.createWeeklyProduct = async (req, res) => {
    try {
        const newProduct = new WeeklyProduct(req.body);
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// ADMIN ONLY: Deactivate old weekly products (start new week)
exports.startNewWeek = async (req, res) => {
    try {
        // Deactivate all current weekly products
        await WeeklyProduct.updateMany(
            { isActive: true },
            { isActive: false }
        );

        res.json({ message: 'New week started. All products deactivated. Add new weekly products.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// ADMIN ONLY: Update weekly product
exports.updateWeeklyProduct = async (req, res) => {
    try {
        const product = await WeeklyProduct.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// ADMIN ONLY: Delete weekly product
exports.deleteWeeklyProduct = async (req, res) => {
    try {
        const product = await WeeklyProduct.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Weekly product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};