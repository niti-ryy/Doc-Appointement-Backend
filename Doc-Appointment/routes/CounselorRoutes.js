const express=require("express")
const counselorRouter=express.Router()
const counselorCltr=require("../controllers/counselorCltr")
const {checkSchema}=require("express-validator")
const counselorDetailsValidationSchema = require("../helpers/counselor-validation")
const uploadImg = require("../middlewears/uploadImg")

counselorRouter.route("/counselorDetails",)
        .post(checkSchema(counselorDetailsValidationSchema),uploadImg,counselorCltr.create)


module.exports=counselorRouter
