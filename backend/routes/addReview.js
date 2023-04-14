const { Router } = require('express');
const mongoose = require('mongoose');
const express = require('express');
const productModel = require('../schema/productSchema');
const reviewModel = require('../schema/reviewSchema');

const routes = new Router();

//insert the review
routes.post('/productReview', async (req, res) => {
    try {
        //creat a new review
        const review = new reviewModel({
            author: `${req.body.author}`,
            rating: `${req.body.rating}`,
            comment: `${req.body.comment}`
        });

        const response = await review.save();

        const _id = `${req.body.productId}`;

        const product = await productModel.findById(_id);

        const Review = [...product.reviews, { id: `${response._id}` }];

        const result = await productModel.updateOne({ _id: `${req.body.productId}` }, {
            $set: {
                reviews: Review
            }
        })

        res.status(200).json(result);

    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = routes;


