const mongoose = require('mongoose');
const { string } = require('zod');

mongoose.connect('mongodb+srv://irshadhussain7881:h%40sh@cluster017.pih9e1e.mongodb.net/AgriConnect');

// // Farmer Schema
const Farmers = new mongoose.Schema({
    youAre: {
        type: String,
        required: true
    },
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
        
        farmerId: String,
        title: String,
        description: String,
        rate: String,
        imageURL: String,  //store image URL
        quantity: {
            type: Number
        },
        buyRequests: [{
            type: String
        }],
        // rating: String
    }],
    post: [{
        title: { 
            type: String, 
            required: true 
        },
        content: {
            type: String, 
            required: true 
        },
        Likes: Number,
        Dislikes: Number,

    }],
    order: [{
            farmerId: {
                type: String,
                required: true
            },
            buyerId: {
                type: String,
                required: true
            },
            title: {
                type: String,
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
                default: 'Pending',
            },
            buyRequests: [{
                type: String
            }]
    }],
});
const user = new mongoose.Schema({
    youAre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    phoneNumber: {
        type: String,
        required: true
    },
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
    myOrder: [{
            farmerId: {
                type: String,
                required: true
            },
            title: {
                type: String,
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
const User = mongoose.model('UserS',user)
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = {
    Farmer,
    User,
    Admin
};
