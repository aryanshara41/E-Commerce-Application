const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    orderList: [
        {
            _id: false,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: 'products'
            },
            qty: {
                type: Number,
                require: true
            },
            price: {
                type: Number,
                require: true
            },
            image: {
                type: String,
                require: true
            },
            productName: {
                type: String,
                require: true
            }
        }
    ]
})

const usermodel = new mongoose.model('users', userSchema);

module.exports = usermodel;