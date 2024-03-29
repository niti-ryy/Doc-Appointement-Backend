const express=require("express")
const counselorRouter=express.Router()
const counselorCltr=require("../controllers/counselorCltr")
const {checkSchema}=require("express-validator")
const counselorDetailsValidationSchema = require("../helpers/counselor-validation")
const uploadImg = require("../middlewears/uploadImg")
const uploadVideo = require("../middlewears/uploadvideo")
const authenticate = require("../middlewears/authenticate")

counselorRouter.route("/counselorDetails")
        .post(authenticate, checkSchema(counselorDetailsValidationSchema),uploadImg,counselorCltr.create)
counselorRouter.route("/counselorDetails/:counselorId/:type") //here the type params refers to update "profile" or "video" 
        .put(uploadVideo,counselorCltr.createVideo)
counselorRouter.route("/:counselorId")
      .delete(counselorCltr.delete)

    
module.exports=counselorRouter
