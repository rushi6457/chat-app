const asyncHandler = require('express-async-handler')
const generateToken = require('../config/token');
const UserModel = require('../models/userModel');
const argon = require('argon2');


const register = asyncHandler(async(req,res) =>{
    const {name,email,password,pic} = req.body;
     const hash = await argon.hash(password);
    if(!name || !email  || !password){
        res.status(400)
        throw new Error("Please fill all details")
    }
    
    const existingUser = await UserModel.findOne({email})
    if(existingUser){
        res.status(400)
        throw new Error("User already exists")
    }
    const newuser = await UserModel.create({
        name,
        email,
        password:hash,
        pic
    })
    if(newuser){
        res.status(200).json({
            _id:newuser._id,
            name:newuser.name,
            email:newuser.email,
            pic:newuser.pic,
            token:generateToken(newuser._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Something went wrong")
    }
})

const authUser = asyncHandler(async(req,res) =>{
    const {email,password} =req.body;
    const user = await UserModel.findOne({email})
    if(user && await argon.verify(user.password,password)){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
      else{
        res.status(400)
        throw new Error("Something went wrong")
    }
})

const allUsers = asyncHandler(async(req,res) =>{
    const keyword = req.query.search
    ? {
        $or:[
            {name:{$regex:req.query.search, $options:"i"}},
            {email:{$regex:req.query.search, $options:"i"}},
        ]
    }:{};

    const users = await UserModel.find(keyword).find({_id:{$ne:req.user._id}})
    res.send(users)
})

module.exports = {
    register,
    authUser,
    allUsers
}