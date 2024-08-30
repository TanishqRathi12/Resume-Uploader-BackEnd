const Auth = require('../Model/auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        console.log(req.body);
        if(!name || !email || !password){
            return res.status(400).json({msg:'Please enter all fields'});
        }
        const userExist = await Auth.findOne({email});
        if(userExist){
            return res.status(400).json({msg:'User already exists'});
        }
        const salt = 10;
        const hashPassword = await bcrypt.hash(password,salt);
        const user = new Auth({
            name,
            email,
            password:hashPassword
        });
        const savedUser = await user.save();
        const token = jwt.sign({id:savedUser},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.json({message:'User saved successfully',data:savedUser,token});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({msg:'Please enter all fields'});
        }
        const user = await Auth.findOne({email});
        if(!user){
        return res.status(400).json({msg:'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid credentials'});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.json({message:'User logged in successfully',data:user,token});
        console.log("User logged in successfully",user._id,token);
        }
    catch(err){
        res.status(500).json({error:err.message});
    }
}


module.exports ={
    signup,
    login
}