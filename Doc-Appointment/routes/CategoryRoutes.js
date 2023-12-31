const express=require("express")
const categoryRoutes=express.Router()
const uploadImg=require("../middlewears/uploadImg")
const categoryCltr = require("../controllers/categoryCltr")

categoryRoutes.route("/createCategory")
    .post(uploadImg,categoryCltr.create)
categoryRoutes.route("/getCategories")
    .get(categoryCltr.getCategories)
categoryRoutes.route("/deleteCategory/:categoryId")
    .delete(categoryCltr.deleteCategory)

module.exports=categoryRoutes