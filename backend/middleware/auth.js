const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Blacklist = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }
        // Check if token is blacklisted
        const isBlacklisted = await Blacklist.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid'
            });
        }
        
        // Verify token with proper error handling
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        const user = await User.findById(decoded.id);
        console.log('Found user:', user);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({
            success: false, 
            message: 'Please authenticate'
        });
    }
};
