import express from 'express';
const router=express.Router();
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Middleware from '../middleware/middleware.js';

//register
router.post('/register',async(req,res)=>{
try{
 const {name,email,password}=req.body;
 const user=await User.findOne({email});
 if(user){
    return res.status(400).json({success:false,message:"User already exists"})
 }
 const hashPassword=await bcrypt.hash(password,10);
 // 10 is salt that makes password more secure it corrected to password
 const newUser=new User({name,email,password:hashPassword});
 await newUser.save();
 return res.status(200).json({success:true,message:"Accounted created successfully"})
}
catch(error){
    return res.status(500).json({success:false,message:"Something went wrong,Error in adding user"})
}
});


//login
router.post('/login',async(req,res)=>{
    try{
     const {email,password}=req.body;
     const user=await User.findOne({email});
     if(!user){
        return res.status(401).json({success:false,message:"User not exist"})
     }
     const checkPassword=await bcrypt.compare(password,user.password);
     if(!checkPassword){
         return res.status(401).json({success:false,message:"Password is incorrect"})
     }
     const token=jwt.sign({id:user._id},"secretkeyofnoteapp123@",{expiresIn:"5d"});
   
     return res.status(200)
     .json({success:true,user:{name:user.name},token,message:"User logged successfully"})
    }
    catch(error){
        return res.status(500).json({success:false,message:"Something went wrong,Error in login server"})
    }
    });


    router.get('/verify',Middleware,async(req,res)=>{
            return res.status(200).json({success:true,user:req.user,message:"User logged successfully"})
    })
export default router;