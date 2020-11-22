const express = require('express');
const User = require('../models/userModel');
const router = express.Router()
const { getToken } = require('../util');

router.post('/createadmin', async (req,res) =>{

    const user = await new User({
        name: 'Zoha',
        email:'1@2.com',
        password: 'hello123',
        isAdmin: false
    });
    const newUser = user.save();
    if(newUser){
     res.status(201).json({message: 'User successfully created!'})
    } else{
        res.status(500).json({message:'User not created....wah wah wah...'})
    }
     
})

router.post('/signin', async(req, res)=>{
    const signedinUser = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });

    const token = getToken(signedinUser);
    if(signedinUser){
        res.status(200).json({
            name: signedinUser.name,
            token,
            isAdmin: signedinUser.isAdmin
        })
    } else{
        res.status(401).json({message:'invalid email or password'})
    }
})

module.exports = router;