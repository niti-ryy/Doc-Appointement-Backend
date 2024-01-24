const express=require("express")
const counselorRouter=express.Router()
const counselorCltr=require("../controllers/counselorCltr")
const {checkSchema}=require("express-validator")
const counselorDetailsValidationSchema = require("../helpers/counselor-validation")
const uploadImg = require("../middlewears/uploadImg")
const uploadVideo = require("../middlewears/uploadvideo")

counselorRouter.route("/counselorDetails")
        .post(checkSchema(counselorDetailsValidationSchema),uploadImg,counselorCltr.create)
counselorRouter.route("/counselorDetails/:counselorId/:type") //here the type refers to update profile or video 
        .put(uploadVideo,counselorCltr.createVideo)
module.exports=counselorRouter
