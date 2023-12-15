const express=require("express")
const path=require("path")
require("dotenv").config()
const cors=require("cors")
const configDb = require("./configDb/configDb")
const app=express()
app.use(express.static('public')); // 'public' is the directory where your images are stored.
app.use(express.json())
app.use(cors())



const Port=process.env.PORT || 3090


configDb()

app.listen(Port,()=>{
    console.log("server connected on port",Port)
})