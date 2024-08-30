const dotenv = require('dotenv');

dotenv.config();
const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const authHeader =req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({msg:'Access denied'});
    }
    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({msg:'Access denied'});
    }

    jwt.verifyToken(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({msg:'Token is not valid'});
        }
        req.user = user;
        next();
    }
)};

module.exports = verifyToken;