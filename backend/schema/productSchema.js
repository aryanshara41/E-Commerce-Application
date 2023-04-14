const mongoose = require('mongoose');

// create a schema for product 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    reviews: [
        {
            _id : false,
            id: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: 'reviews'
            }
        }
    ],
    count: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

const productModel = new mongoose.model('products', productSchema);
module.exports = productModel;
