const Product = require("../models/product")

const getAllProducts = async(req, res) => {
    const { company, name, featured } = req.query;
    const queryObject = {};

    if (company) {  
        queryObject.company = company;  
    }

    if(name){
        queryObject.name = { $regex: name, $options: 'i' };
    }

    if(featured){
        queryObject.featured = featured;
    }

    console.log(queryObject);

    const myData = await Product.find(queryObject);
    res.status(200).json({ myData });
}

const getAllProductsTesting = async(req, res) => {
   // res.status(200).json({ msg : "I am getAllProductsTesting" });
    const myData = await Product.find(req.query).sort("name");
    res.status(200).json({ myData });
}

const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllProducts, getAllProductsTesting, addProduct };