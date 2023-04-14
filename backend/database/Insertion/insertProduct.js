const products = require("../../data/products");
const productModel = require("../../schema/productSchema");
const startDb = require('../startdb');
startDb(); // start the database and insert into the database

const insertDb = async () => {
    try {
        const response = await productModel.insertMany(products);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

insertDb();