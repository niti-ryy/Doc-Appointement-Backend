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
const BlogsRoute=require("./routes/BlogsRoutes")
const categoryRoutes = require("./routes/CategoryRoutes")
const counselorRoutes = require("./routes/CounselorRoutes")
const authenticate = require("./middlewears/authenticate")
const checkRole = require("./middlewears/checkRole")
const counselorCltr=require("./controllers/counselorCltr")
const feedBackRoutes = require("./routes/feedbackRoutes")
const feedbackCltr = require("./controllers/feedbackCltr")
const appointmentRoutes = require("./routes/AppointmentRoutes")
const appointmentCltr = require("./controllers/appointmentCltr")


const app=express()
app.use(express.static('public')); // 'public' is the directory where your images are stored.
app.use(express.json())
app.use(cors())

const Port=process.env.PRODUCTION_PORT || process.env.DEVELOPMENT_PORT || 3090
configDb()

//tested and working
// for user registration
app.post("/api/v1/profile", checkSchema(userRegistrationValidation), profileCltr.create)

// for user login
app.post("/api/v1/login", checkSchema(loginValidation), profileController.login)

// to get users or counselors based on their roles
app.get("/api/v1/:role",profileController.getUserAndCounselors)

// to get a single user or counselor by their ID
app.get("/api/v1/singleUserorCounsleor/:id", profileCltr.getSingleUserAndCounselor)


//Blog Routes
app.use("/api/v1",BlogsRoute)
//Category Routes
app.use("/api/v1",categoryRoutes)
//Counselor Routes
app.use("/api/v1",counselorRoutes)
//FeedBack Routes
app.use("/api/v1",feedBackRoutes)
//Appointment Routes
app.use("/api/v1",appointmentRoutes)



//gets all the poupulated counselors
app.get("/api/getPopulatecCounselors",counselorCltr.getPopulated) 
//gets all the feedbacks realted to a counsleor
app.get("/api/v1/getFeedBacks/:counselorId",feedbackCltr.get)
//gets all the appoinment related to a counselor
app.get("/api/v1/getAppointments/:counselorId",appointmentCltr.getAppointments)
// gets all aggregated counselor
app.get("/api/v1/get_aggregated/:counselorId",appointmentCltr.aggregateAppointments)

app.listen(Port,()=>{
    console.log("server connected on port",Port)
})