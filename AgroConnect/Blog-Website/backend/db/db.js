const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://irshadhussain7881:h%40sh@cluster017.pih9e1e.mongodb.net/AgriConnect');

// Farmer Schema
const Farmers = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: String,
    total_expenditure: Number,
    total_income: Number,
    total_profit: Number,
    total_loss: Number,
    farmName: { type: String },
    Blog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }],
    farmLocation: [{
        pincode: {
            type: Number,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    }],
    productSell: [{
        title: String,
        description: String,
        Rate: String,
        imageURL: String,  //store image URL
        quantity: {
            type: Number
        },
        buyRequests: [{
            type: String
        }]
    }],
    order: [{
            title: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            orderDate: {
                type: Date,
                default: Date.now,
            },
            status: {
                type: String,
                enum: ['Pending', 'Accepted', 'Rejected'],
                default: 'Pending',
            },
            buyRequests: [{
                type: String
            }]
    }],
});


// Blog Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            comment: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});


// User Schema
const user = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    firstName: String,
    lastName: String,
    address: [{
        pincode: {
            type: Number,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    }],
    order: [{
            title: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            orderDate: {
                type: Date,
                default: Date.now,
            },
            status: {
                type: String,
                enum: ['Pending', 'Accepted', 'Rejected'],
                default: 'Pending',
            },
            requestSends: [{
                type: String
            }],
    }],
})
// Admin Schema---
const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
});
// Model Definitions
const Farmer = mongoose.model('Farmer', Farmers);
const User = mongoose.model('User',user)
const Admin = mongoose.model('Admin', AdminSchema);
const Blog = mongoose.model('Blog', blogSchema);

module.exports = {
    Farmer,
    User,
    Admin,
    Blog
};