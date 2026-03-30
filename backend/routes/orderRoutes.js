const express = require('express');
const router = express.Router();
const {
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus,
    getAllOrders
} = require('../controllers/orderController.js');
const auth = require('../middleware/auth.js');

// User routes
router.post('/', auth, createOrder);
router.get('/my-orders', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/cancel', auth, cancelOrder);

// Admin routes (we'll add admin middleware later)
router.get('/', auth, getAllOrders);
router.put('/:id/status', auth, updateOrderStatus);

module.exports = router;