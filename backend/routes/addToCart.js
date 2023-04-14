const Router = require('express');
const productSchema = require('../schema/productSchema');
const usermodel = require('../schema/userSchema');
const express = require('express');

const routes = new Router();

// fetch the details of all the orders of user
routes.get('/cart/products', async (req, res) => {
    try {
        console.log(req.userEmail);
        const data = await usermodel.findOne({ email: req.userEmail });
        console.log(data.orderList);
        res.status(200).json(data.orderList);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'No Products Found' });
    }
});

// remove all the selected items from the card of the user
routes.post('/cart/remove', async (req, res) => {
    try {
        const { orders } = req.body;

        console.log(orders);

        const user = await usermodel.findOne({ email: req.userEmail });
        if (!user) return res.status(200).json({ message: "Unable to remove the product" });

        // now I have found the user
        const newOrder = user.orderList.filter((order) => {
            // now find each product whether it is present or not
            return !orders.includes(order.productId.toString());
        });

        const result = await usermodel.updateOne( { email: req.userEmail}, {
            $set:{
                orderList : newOrder
            }
        });

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(200).json({ message: 'Failed during updating the cart'});
    }
})

// here I will add items in cart of the user
routes.post('/cart/add', async (req, res) => {
    try {
        // first find out the user id 
        const user = await usermodel.findOne({ email: req.userEmail });
        if (!user)
            return res.status(404).json({ message: "Unable to add the product" });

        // now I have found the user who have logged in
        // now find the cart of the user
        const newOrder = {
            productId: req.body.productId,
            qty: req.body.qty,
            price: req.body.price,
            image: req.body.image,
            productName: req.body.productName
        };

        const Order = [...user.orderList, newOrder];

        // now insert into the user 

        const details = await usermodel.updateOne({ _id: user._id },
            {
                $set: {
                    orderList: Order
                }
            }
        )
        res.status(200).json(details);
        // now we have created a neworder 
        // now append it in the userorder list
    } catch (error) {
        res.status(404).json({ message: 'Error occured while saving in cart' })
    }
})

module.exports = routes;
