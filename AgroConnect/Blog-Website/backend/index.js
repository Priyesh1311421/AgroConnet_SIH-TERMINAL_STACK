const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes'); // Adjust the path as necessary
const cors = require('cors');


 
const app = express();
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Use the blog routes
app.use('/blogs', blogRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://irshadhussain7881:h%40sh@cluster017.pih9e1e.mongodb.net/AgriConnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((error) => {
    console.error('Connection error', error);
});