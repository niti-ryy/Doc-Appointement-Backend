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
const blogsCltr = require("./controllers/blogsCltr")
const BlogsRoute=require("./routes/BlogsRoutes")
const categoryRoutes = require("./routes/CategoryRoutes")
const counselorRoutes = require("./routes/CounselorRoutes")
const authenticate = require("./middlewears/authenticate")
const checkRole = require("./middlewears/checkRole")
const {uploadImageFiles,uploadVideoFiles}=require("./middlewears/uploadvideo")
const uploadVideo = require("./middlewears/uploadvideo")
const counselorCltr=require("./controllers/counselorCltr")


const app=express()
app.use(express.static('public')); // 'public' is the directory where your images are stored.
app.use(express.json())
app.use(cors())

const Port=process.env.PORT || 3090
configDb()

//tested and working
// for user registration
app.post("/api/v1/profile", checkSchema(userRegistrationValidation), profileCltr.create)

// for user login
app.post("/api/v1/login", checkSchema(loginValidation), profileController.login)

// to get users or counselors based on their roles
app.get("/api/v1/:role",authenticate,checkRole(["User"]),profileController.getUserAndCounselors)

// to get a single user or counselor by their ID
app.get("/api/v1/singleUserorCounsleor/:id", profileCltr.getSingleUserAndCounselor)


//Blog Routes
app.use("/api/v1",BlogsRoute)
//Category Routes
app.use("/api/v1",categoryRoutes)
//Counselor Routes
app.use("/api/v1",counselorRoutes)


app.post("/api/v1/video",uploadVideo,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"video uploaded successfully",
        data:req.files
    })
})   

app.post("/api/v1/img",uploadImg,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"video uploaded successfully",
        data:req.files
    })
}) 

//gets all the poupulated counselors
app.get("/api/getPopulatecCounselors",counselorCltr.getPopulated)   

app.listen(Port,()=>{
    console.log("server connected on port",Port)
})