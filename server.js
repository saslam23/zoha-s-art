require('dotenv').config({path: '.env'});
const express = require('express');
const cors = require('cors');


const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;


mongoose.connect('mongodb://localhost:27017/zohasartDB', {useNewUrlParser:true, useUnifiedTopology: true});

/*app.post('/', (req, res) =>{
    const product = new Product ({
        name: req.body.name,
        image: req.body.image,
        size: req.body.size,
        price: req.body.price
    })
    const newProduct = product.save();

    if(newProduct){
        res.sendStatus(200).send({message: 'product successfully saved!', data: newProduct});
    } else{
        res.status(500).json({message: 'something went wrong'});
    }
    
})*/

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);



app.listen(PORT, () =>{
console.log(`Successfully running server on port ${PORT}`)
})