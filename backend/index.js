const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const addToCart = require('./routes/addToCart');
const userRoutes = require('./routes/userRoutes');
const addReview = require('./routes/addReview');
const Review = require('./routes/review');
const jwt = require('jsonwebtoken');
const startDb = require('./database/startdb');
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());
app.use('/api/cart', (req, res, next) => {
    const user = jwt.verify(req.headers.authtoken, process.env.KEY);
    if (user) {
        req.userEmail = user.email;
        // req.body.email = user;
    }
    else res.status(404).json({ message: 'No such user found' });
    next();
})
app.use('/api', productRoutes);
app.use('/api', addToCart);
app.use('/api', userRoutes);
app.use('/api', addReview);
app.use('/api', Review);
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));


startDb();

const PORT = process.env.PORT;

app.listen(PORT || 4000, () => {
    console.log("The server is running");
})