const dotenv = require('dotenv')
dotenv.config({path: '.env'});
const jwt = require('jsonwebtoken');


const secret = process.env.TOKEN_SECRET;

const getToken = (user) =>{
return jwt.sign({user}, secret, {expiresIn: '3600s'});
}

const isAuth =(req, res, next)=>{
const authHeader = req.headers['authorization'];
if(authHeader){
    const token = authHeader.split(" ")[1]
    jwt.verify(token, secret, (err, user) =>{
        if(err){
           return res.status(403).json({message: 'not verified'})
        }
        req.user = user
        next();
        return;
    });

}
}

const isAdmin = () =>{
    if(req.user && req.user.isAdmin){
       return next();
    }
    return res.status(403).json({message:"Not authoorized as administrator"})
}

module.exports = {getToken, isAuth, isAdmin};


