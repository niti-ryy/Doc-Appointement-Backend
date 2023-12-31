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
app.get("/api/v1/:role", profileController.getUserAndCounselors)

// to get a single user or counselor by their ID
app.get("/api/v1/singleUserorCounsleor/:id", profileCltr.getSingleUserAndCounselor)


app.post("/upload",uploadImg,(req,res)=>{
    res.send("upled")
})

//Blog Routes
app.use("/api/v1",BlogsRoute)
//Category Routes
app.use("/api/v1",categoryRoutes)

app.listen(Port,()=>{
    console.log("server connected on port",Port)
})