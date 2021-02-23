require('dotenv').config({path: '.env'});
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');


const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());

const PORT = process.env.PORT || 8000;
const uri = process.env.DATABASE_URL;


mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true});

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const stripeRouter = require('./routes/stripeCheckout');
const photoRouter = require('./routes/photoRoutes');
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/photos', photoRouter);

/*Serves the build folder that we had created */
if (process.env.NODE_ENV === "production") {
    app.use(express.static("minimal-frontend/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "minimal-frontend", "build", "index.html"))
    })
  }
  

app.listen(PORT, () =>{
console.log(`Successfully running server on port ${PORT}`)
})