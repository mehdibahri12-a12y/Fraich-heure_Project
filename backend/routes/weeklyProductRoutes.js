const express = require('express');
const router = express.Router();
const {
    getCurrentWeeklyProducts,
    getWeeklyProductsByCategory,
    getWeeklyProductsByDate,
    createWeeklyProduct,
    startNewWeek,
    updateWeeklyProduct,
    deleteWeeklyProduct
} = require('../controllers/weeklyProductController.js');
const auth = require('../middleware/auth.js');

// Public routes (but protected by auth - customers need to be logged in)
router.get('/', auth, getCurrentWeeklyProducts);
router.get('/category/:category', auth, getWeeklyProductsByCategory);
router.get('/week/:year/:week', auth, getWeeklyProductsByDate);

// Admin routes (we'll add admin middleware later)
router.post('/', auth, createWeeklyProduct);
router.post('/start-new-week', auth, startNewWeek);
router.put('/:id', auth, updateWeeklyProduct);
router.delete('/:id', auth, deleteWeeklyProduct);

module.exports = router;