const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();
const {isAuth, isAdmin} = require('../util');

router.get('/', async (req, res) =>{
        const products = await Product.find({})
       if(products){
           res.json(products)
       } else {
        res.status(404).json({ message: "No products found" })
    }

    })


router.get('/:id', async (req,res) =>{
    const product = await Product.findOne({_id: req.params.id})

    if(product){
        res.json(product)
    } else {
        res.status(500).json({message: "Specified product not found"})
    }
})


router.post('/create',(req,res) =>{

        const product = new Product({
            name: req.body.name,
            size: req.body.size,
            price: req.body.price,
            image:req.body.image,
            description: req.body.description,
            countInStock: req.body.countInStock
        })
    
        const newProduct = product.save();
        if(newProduct) {
            return res.status(201).json({message: 'Product has been created successfully!'})
        }
        return res.status(500).json({message: 'Something went wrong. The product was not created'})
        

})

router.put('/:id', async (req,res) =>{
    const productId = req.params.id;
    const product = await Product.findById(productId)
    if(product){
        product.name = req.body.name;
        product.size = req.body.size;
        product.price = req.body.price;
        product.image = req.body.image;
        product.description = req.body.description;
        product.countInStock = req.body.countInStock;
    }

    const editedProduct= product.save();
    if(editedProduct) {
        return res.status(201).json({message: 'Product has been edited successfully!'})
    }
    return res.status(500).json({message: 'Something went wrong. The product was not created'})
    

})


router.delete('/:id', async (req, res) =>{
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if(product){
        await product.remove();
       return res.status(200).json({data: product, message:'product successfully deleted'})
    }
    return res.status(404).json({message: 'Could not delete producta'})
})
module.exports = router;