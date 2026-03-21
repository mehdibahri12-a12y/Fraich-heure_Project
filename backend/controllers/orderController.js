const Order = require('../models/Order');

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const {
            items,
            totalAmount,
            deliveryAddress,
            phone,
            specialInstructions,
            paymentMethod,
            orderType
        } = req.body;

        const newOrder = new Order({
            user: req.user,
            items,
            totalAmount,
            deliveryAddress,
            phone,
            specialInstructions,
            paymentMethod,
            orderType
        });

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user })
            .sort({ orderDate: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single order
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if order belongs to user
        if (order.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if order belongs to user
        if (order.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Only allow cancellation if order is pending or confirmed
        if (order.status !== 'pending' && order.status !== 'confirmed') {
            return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
        }

        order.status = 'cancelled';
        await order.save();

        res.json({ message: 'Order cancelled successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// ADMIN ONLY: Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// ADMIN ONLY: Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email phone')
            .sort({ orderDate: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};