const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_URL_COLLECTION;

const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log("The database has been connected");
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;

