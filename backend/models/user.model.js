const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot exceed 30 characters'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9_-]+$/.test(v);
            },
            message: 'Username can only contain letters, numbers, underscores and hyphens'
        }
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [50, 'First name cannot exceed 50 characters'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z\s-]+$/.test(v);
            },
            message: 'First name can only contain letters, spaces and hyphens'
        }
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z\s-]+$/.test(v);
            },
            message: 'Last name can only contain letters, spaces and hyphens'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        validate: {
            validator: function(v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(v);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    lastLogin: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profileComplete: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`.trim();
});

// Add hashPassword function
userSchema.methods.hashPassword = async function(password) {
    try {
        const SALT_ROUNDS = 12;
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Password hashing failed: ' + error.message);
    }
};


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { 
            id: this._id,  // Make sure this matches what you're looking for in decoded.id
            email: this.email 
        }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};


// Password hashing middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await this.hashPassword(this.password);
        next();
    } catch (error) {
        next(error);
    }
});


// Methods for password comparison and reset
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
};

module.exports = mongoose.model('User', userSchema);