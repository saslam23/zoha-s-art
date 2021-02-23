const express = require('express');
const User = require('../models/userModel');
const router = express.Router()
const { getToken } = require('../util');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

router.post('/createadmin', async (req,res) =>{
    
    const adminPass = process.env.ADMIN_PASSWORD;

   const encryptedPass = bcrypt.hashSync(adminPass, salt);

    const user = await new User({
        name: 'Zoha',
        email:'1@2.com',
        password: encryptedPass,
        isAdmin: true
    });
    const newUser = user.save();
    if(newUser){
     res.status(201).json({message: 'User successfully created!'})
    } else{
        res.status(500).json({message:'User not created...'})
    }
     
})

router.post('/signin', async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const signedinUser = await User.findOne({email}, function(err, user){
        if(err) return res.status(500).json({message: 'server error'});
        if(!user) return res.status(404).json({message:'user not fount'});
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) res.status(401).json({message: 'invalid username or password'});
    })

    const token = getToken(signedinUser);
    if(signedinUser){
        res.status(200).json({
            name: signedinUser.name,
            token,
            isAdmin: signedinUser.isAdmin
        })
    }

   
})

module.exports = router;