const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const cors = require("cors");
const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://admin:NitishVerma@cluster0.a4iqsms.mongodb.net/Node-API?retryWrites=true&w=majority';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable CORS for a specific origin (e.g., http://example.com)
app.use(cors({ origin: "*"}));

app.get('/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/products', async (req, res) => {
    try {
        const products = await Product.create(req.body);
        console.log('product created succesfully');
        res.status(200).json(products);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({
            message: error.message
        });
    }
});

app.get('/products/:id', async (req, res) => { 

    const { id } = req.params;

    try {
        const products = await Product.findById(id);
        console.log('product found');
        res.status(200).json(products);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({
            message: error.message
        });
    }

});

app.put('/products/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const products = await Product.findByIdAndUpdate(id, req.body);
        console.log('product updated succesfully');
        res.status(200).json(products);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({
            message: error.message
        });
    }

});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const products = await Product.findByIdAndDelete(id);
        console.log('product deleted succesfully');
        res.status(200).json(products);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({
            message: error.message
        });
    }

});


async function connectDB() {
    try {
        
        await mongoose.connect(MONGO_URI);

        console.log("wow!! db is connected!");

        app.listen(PORT, () => {
            console.log(`server is listening on port ${PORT}`);
        });

    } catch (e) {
        console.log("Issue with db connection", e.message);
    }
}

connectDB();