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
    lastName: String,
    total_expenditure: Number,
    total_income: Number,
    total_profit: Number,
    total_loss: Number,
    farmName: { type: String },
    phoneNumber: { type: Number },
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
    Blog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    Product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FarmerOrder'
    }],
});

const FarmerOrderSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
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
    }
});

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: true 
    },
    Likes: Number,
    Dislikes: Number,
});

// Product Schema
const ProductSchema = new mongoose.Schema({
    title: String,
    Rate: String,
    description: String,
    Farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true,
    },
    imageURL: String  //store image URL
});

// User Schema
const UserSchema = new mongoose.Schema({
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
    lastName: String,
    phoneNumber: { type: Number },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserOrder',
    }],
});

// UserOrder Schema
const UserOrderSchema = new mongoose.Schema({
    User_id: {
        type: String
    },
    products: [{
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
        }
    }]
});

// Model Definitions
const Farmer = mongoose.model('Farmer', Farmers);
const Blog = mongoose.model('Blog', blogSchema);
const Product = mongoose.model('Product', ProductSchema);
const UserOrder = mongoose.model('FarmerOrder', UserOrderSchema);
const FarmerOrder = mongoose.model('FarmerOrder', FarmerOrderSchema);

module.exports = {
    Farmer,
    Blog,
    Product,
    UserOrder,
    FarmerOrder,
};
