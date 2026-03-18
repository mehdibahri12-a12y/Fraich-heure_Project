const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const auth = require('../middleware/Auth');

// @route   POST api/auth/register
// @desc    Register user
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Login user
router.post('/login', login);

// @route   GET api/auth/me
// @desc    Get current user
router.get('/me', auth, getCurrentUser);

module.exports = router;