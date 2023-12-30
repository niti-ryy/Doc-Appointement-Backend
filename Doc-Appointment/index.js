const express=require("express")
const path=require("path")
require("dotenv").config()
const cors=require("cors")
const configDb = require("./configDb/configDb")
const uploadImg = require("./middlewears/uploadImg")
const profileCltr = require("./controllers/profileCltr")
const {checkSchema, validationResult}=require("express-validator")
const {userRegistrationValidation,loginValidation} = require("./helpers/profile-validation")
const profileController = require("./controllers/profileCltr")

const app=express()
app.use(express.static('public')); // 'public' is the directory where your images are stored.
app.use(express.json())
app.use(cors())

const Port=process.env.PORT || 3090
configDb()

app.post("/api/v1/profile",checkSchema(userRegistrationValidation),profileCltr.create)
app.post("/api/v1/login",checkSchema(loginValidation),profileController.login)

app.get("/api/v1/:role",profileController.getUserAndCounselors)


app.listen(Port,()=>{
    console.log("server connected on port",Port)
})