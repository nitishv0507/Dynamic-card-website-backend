const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    "name": {
        "type": String,
        required: [true, "Please enter a valid name"]
    },
    "quantity": {
        type: Number,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "image": String
}, { timestamps: true}); 

const Product = mongoose.model('Product', productSchema); 

module.exports = Product;
