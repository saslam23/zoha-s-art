const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51HtQ39EHq6DErrpIoi1NzjGvEBYULxnYTcK57x5GzYV5DyV4Isa6a783PirqjhSR52DceuBVPAnTMODy97necHwT00TZg7XBZg');
const { v4: uuidv4 } = require('uuid');

router.post('/checkout', async (req, res) =>{

try {
    const {items, token, totalAmount} = req.body


    const customer = await 
    stripe.customers.create({
        email: token.email,
        source: token.id
    });

    console.log(customer.id);

    const idempotencyKey = uuidv4();
    
    const charge = await stripe.charges.create({
        amount: totalAmount * 100,
        customer:customer.id,
        currency: 'usd',
        receipt_email: token.email,
        description: `products purchase: ${items}`,
        quantity: token.quantity,
        shipping:{
            name: token.card.name,
            address:{
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
            }
        }
    },
    {
        idempotencyKey
    }
    );
    if(charge){
       return res.status(200).json({status:'success'})
    }
  
} catch (error) {
    console.log('error', error);
    res.status(500).json({staatus:'failure'})
}

})



module.exports = router;