const mongoose = require('mongoose');
const { string } = require('zod');

mongoose.connect('mongodb+srv://irshadhussain7881:h%40sh@cluster017.pih9e1e.mongodb.net/AgriConnect');

// Farmer Schema
// USER-USER----
// USER-USER----
// USER-USER----
// USER-USER----
// USER-USER----
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
    order_history_id: [{
        type:String
    }],
    post_id: [{
        type:String
    }],
    product_id: [{
        type:String
    }],
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
});
// // Broker Schema
// const BrokerSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     firstName: String,
//     lastName: String,
//     orderHistory: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'BrokerOrder'
//     }],
//     companyName: { type: String },
//     companyLocation: { type: String },
//     phoneNumber: Number,
// });
// // ADMIN--ADMIN--
// // ADMIN--ADMIN--
// // ADMIN--ADMIN--
// // ADMIN--ADMIN--
// // ADMIN--ADMIN--
// Admin Schema
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
// // POST-POST-----
// // POST-POST-----
// // POST-POST-----
// // POST-POST-----
// // POST-POST-----
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
// // PRODUCT-PRODUCT
// // PRODUCT-PRODUCT
// // PRODUCT-PRODUCT
// // PRODUCT-PRODUCT
// // PRODUCT-PRODUCT
// Product Schema
const ProductSchema = new mongoose.Schema({
    title: String,
    Rate: String,
    description: String,
    Broker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Broker'
    },
    imageURL: String  //store image URL
});
// // ORDER--ORDER--
// // ORDER--ORDER--
// // ORDER--ORDER--
// // ORDER--ORDER--
// // ORDER--ORDER--
// FarmerOrder Schema
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

// // BrokerOrder Schema
// const BrokerOrderSchema = new mongoose.Schema({
//     broker: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Broker',
//         required: true,
//     },
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true,
//     },
//     quantity: {
//         type: Number,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     orderDate: {
//         type: Date,
//         default: Date.now,
//     },
//     status: {
//         type: String,
//         enum: ['Pending', 'Accepted', 'Rejected'],
//         default: 'Pending',
//     }
// });

// Model Definitions
const Farmer = mongoose.model('Farmer', Farmers);
// const Broker = mongoose.model('Broker', BrokerSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Product = mongoose.model('Product', ProductSchema);
const UserOrder = mongoose.model('FarmerOrder', UserOrderSchema);
// const BrokerOrder = mongoose.model('BrokerOrder', BrokerOrderSchema);

module.exports = {
    Farmer,
    // Broker,
    Blog,
    Product,
    Admin,
    UserOrder,
    // BrokerOrder
};
