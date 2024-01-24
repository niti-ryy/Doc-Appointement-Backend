const express=require("express")
const counselorRouter=express.Router()
const counselorCltr=require("../controllers/counselorCltr")
const {checkSchema}=require("express-validator")
const counselorDetailsValidationSchema = require("../helpers/counselor-validation")
const uploadImg = require("../middlewears/uploadImg")
const uploadVideo = require("../middlewears/uploadvideo")

counselorRouter.route("/counselorDetails")
        .post(checkSchema(counselorDetailsValidationSchema),uploadImg,counselorCltr.create)
counselorRouter.route("/counselorDetails/:counselorId/:type") //here the type params refers to update "profile" or "video" 
        .put(uploadVideo,counselorCltr.createVideo)
counselorRouter.route("/:counselorId")
      .delete(counselorCltr.delete)
//this is new otute
module.exports=counselorRouter
