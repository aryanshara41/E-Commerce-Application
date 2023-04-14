const { Router } = require('express');
const usermodel = require('../schema/userSchema');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routes = new Router();
// register
routes.post('/register', async (req, res) => {
    try {

        const user = await usermodel.findOne({ email: req.body.email });

        if (user) {
            console.log(user);
            return res.status(200).json({ message: "The email already exists" });
        }

        console.log("The email exits");

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = usermodel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            orderList: []
        }); // create new user

        const data = await newUser.save();
        // console.log(req.body.password + ' ' + hashedPassword);

        const token = jwt.sign({ email: data.email, id: data._id }, 'Shubham');

        res.status(200).json({ user: data, token: token });
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: 'Please try again' });
    }
})


// login
routes.post('/login', async (req, res) => {
    try {
        // res.status(200).json(req.body);
        const user = await usermodel.findOne({ email: `${req.body.email}` });

        if (!user)
            return res.status(200).json({ message: 'Email or Password is wrong' });

        // console.log(user);

        // console.log( req.body.password + ' ' + user.password );
        const password = await bcrypt.compare(req.body.password, user.password);

        if (!password)
            return res.status(200).json({ message: 'Email or Password is wrong' });

        const token = jwt.sign({ email: user.email, id: user._id }, 'Shubham');

        // console.log(token);
        res.status(200).json({ user: user, token: token });
    } catch (error) {
        res.status(200).json({ message: 'Some error occured' });
    }
})
module.exports = routes;
