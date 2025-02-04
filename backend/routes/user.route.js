const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
    login, 
    register, 
    logout, 
    getProfile, 
    updateProfile 
} = require('../controllers/userController');

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', auth.authUser, logout);

// Profile routes
router.get('/profile', auth.authUser, getProfile);
router.put('/profile', auth.authUser, updateProfile);

module.exports = router;