const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')


const { UserAuth } = require('./middleWare/UserAuth')
const { Farmer, Product } = require('./connect/SchemaDb')

const app = express()
app.use(express.json())
app.use(body_parser.json())
app.use(cors())


app.post('/sign',async(req,resp,next)=>{
    try{
        // const createPayload = req.body
        const data = new Farmer(req.body)
        // await Farmer.create({
        //     email: createPayload.email,
        //     password: createPayload.password,
        //     firstName: createPayload.firstName,
        //     lastName: createPayload.lastName,
        //     orderHistory: [],
        //     expenditure: 0,
        //     income: 0,
        //     profit: 0,
        //     loss: 0,

        // })
        await data.save()
        console.log(data)
        resp.send({
            msg: "User created"
        })
    }catch(e){
        console.log(e)
        resp.send({
            e
        })
    }

})
app.post('/login', async(req,resp)=>{
    try{
        const log_data = req.body
        if (!log_data.email || !log_data.password) {
            return resp.status(400).json({ msg: "Email and password are required" });
        }
        Farmer.findOne({
            email: log_data.email,
            password: log_data.password
        })
        .then(function(check){
            if(check){
                console.log("Login Successfully!")
                
                resp.send({
                    msg: "Logged"
                })
            }else{
                resp.status(403).json({
                    msg: "Error"
                })
            }
        })
    }catch(err){
        console.log("Error during Login", err)
        resp.status(500).json({
            msg: "Error Occurred",
            error: err.message
        })
    }
})
app.get('/market_product', async(req,resp)=>{
    try{
        const detail = await Product.find()
        resp.json(detail)
    }catch(err){
        console.log("Error")
        resp.status(500).json({
            msg: err.message
        })
    }
})


// PRODUCT-ADD & SEE MY PREVIOUS PRODUCT POSTS---
// PRODUCT-ADD & SEE MY PREVIOUS PRODUCT POSTS---
app.post('/addProduct', async(req,resp)=>{
    try{
        const newProduct = new Product(req.body)
        await newProduct.save()
        resp.status(201).json(newProduct)
    }catch(err){
        resp.status(400).json({
            msg: "Error Message",
            error: err.message
        })
    }
})
app.get('/addProduct',async(req,resp)=>{
    try{
        const products = await Product.find();
        resp.json(products)
    }catch(err){
        resp.status(500).json({
            msg: "Error in fetching product data",
            error: err.message
        })
    }
})
app.listen(5000, ()=>{
    console.log("server is running on port 5000")
})