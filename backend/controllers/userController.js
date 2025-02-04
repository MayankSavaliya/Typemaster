const User = require('../models/user.model');
const { validationResult } = require('express-validator');

// Register controller
exports.register = async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 
        const { username, firstName, lastName, email, password } = req.body;
        if (!username || !firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message:"Please enter all fields"
            });
        }
        // Check if user exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }]  
        });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create user
        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password
        });

        // Generate token using model method
        const token = user.generateAuthToken();

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                fullName: user.fullName,
                email: user.email
            }
        });
};

// Login controller
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    // console.log(email);
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    // Update last login
    // user.lastLogin = Date.now();
    // await user.save();

    // Generate token using model method
    const token = user.generateAuthToken();

    res.json({
        success: true,
        token,
        user: {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email
        }
    });
};

// Logout controller
exports.logout = async (req, res) => {
    const token = req.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    const decoded = jwt.decode(token);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    // Add token to blacklist
    await Blacklist.create({
        token,
        userId: req.user._id,
        expiresAt: new Date(decoded.exp * 1000)
    });

    res.clearCookie('token');
    
    res.json({
        success: true,
        message: 'Successfully logged out'
    });
};

// Updated Get user profile controller
exports.getProfile = async (req, res) => {
    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }
        // Use proper ID reference (either req.user._id or req.user.id)
        const userId = req.user._id || req.user.id;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found'
            });
        }

        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: user.firstName + ' ' + user.lastName,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile'
        });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        console.log("HI");
        const { firstName, lastName, username } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (username && username !== user.username) {
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken'
                });
            }
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;

        await user.save();

        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};