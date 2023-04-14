const { Router } = require('express');
const productSchema = require('../schema/productSchema');
const reviewModel = require('../schema/reviewSchema');
const userModel = require('../schema/userSchema');
const jwt = require('jsonwebtoken');

const routes = new Router();

routes.get('/products', async (req, res) => {
    try {
        const data = await productSchema.find({});
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'No Products Found' });
    }
});

routes.get('/products/:id', async (req, res) => {
    try {
        const data = await productSchema.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: 'Product Not Found' })
    }
});

routes.post( '/product/review', async (req,res)=>{
    try {
        const match = jwt.verify(req.headers.authtoken, 'Shubham' );
        console.log(match);
        // res.status(200).json(match);
        if( match ){
            // console.log(match);
            const user = await userModel.findOne( { email : `${match.email}`});
            if( !user )
                return res.status(200).json( { message: 'User not found while review in database'});

            // console.log(user);

            const newReview = reviewModel( {
                author : `${user.name}`,
                rating : `${req.body.rating}`,
                comment : `${req.body.comment}`
            });

            const reviewsdata = await newReview.save(); // now save this review

            const product = await productSchema.findById(req.body.productId);

            // now access the orders
            const newreviews = [ ...product.reviews, { id : reviewsdata._id} ];

            const result = await productSchema.updateOne( { _id : product._id}, {
                $set:{
                    reviews : newreviews
                }
            });

            console.log(result);

            res.status(200).json(result);
        }
        else res.status(200).json( { message: 'User not found while review'})
        
        
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: 'Invalid comment'});
    }
});

module.exports = routes;
