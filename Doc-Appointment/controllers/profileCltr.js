const profileController = {};
const Profile = require("../models/profileModel");
const _=require("lodash");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt=require("jsonwebtoken")
require('dotenv').config()

profileController.create = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const userData = _.pick(req.body, ["firstName", "lastName", "email", "phone", "password", "role"]);
    const newUser = new Profile(userData);
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        
        const savedUser = await newUser.save();

        res.status(201).json({
            message: "Registration Successful",
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in registration",
            error: error.message
        });
    }
};

profileController.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({
            message:"Error in  Login",
            errors:errors.array()
        })
    }
    console.log(req.body)
    const {email,password}=req.body
    try{
        const user=await Profile.findOne({email:email})
        if(!user){
            return res.status(401).json({
                message:"invalid email or password"
            })
        }
        const verifyPasswod=await bcrypt.compare(password,user.password)
        if(!verifyPasswod){
            return res.status(401).json({
                message:"invalid email or password"
            })
        }
        const tokenData={
            id:user._id,
            role:user.role,
            email:user.email
        }
        const token=jwt.sign(tokenData,"SECRETKEY",{expiresIn:"1d"})
        res.status(201).json({
          message:`Bearer ${token}`
        })
    }catch(e){
        res.status(401).json({
            message:e.message
        })
    }
}


profileController.update=async(req,res)=>{
    const {id}=req.params
    try{

    }catch(e){

    }
}

profileController.getUserAndCounselors=async(req,res)=>{
    const { role } = req.params;
  try {
    if (role === 'Counselor') {
      const counselors = await Profile.find({ role:role});
      if (!counselors || counselors.length === 0) {
        return res.status(404).json({
          message: 'No Counselors Found',
        });
      }
      return res.status(200).json({
        message: counselors,
      });
    } else if (role === 'User') {
      const users = await Profile.find({ role:role });
      if (!users || users.length === 0) {
        return res.status(404).json({
          message: 'No Users Found',
        });
      }
      return res.status(200).json({
        message: users,
      });
    } else {
      return res.status(400).json({
        message: 'Invalid role specified',
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}
        




module.exports = profileController;
