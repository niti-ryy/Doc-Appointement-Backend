const express=require("express")
const blogsCltr = require("../controllers/blogsCltr")
const uploadImg = require("../middlewears/uploadImg")
const blogRouter=express.Router()
const {checkSchema}=require("express-validator")
const blogValidationSchema = require("../helpers/blog-validation")

blogRouter.route("/createBlog")
    .post(checkSchema(blogValidationSchema),uploadImg,blogsCltr.create);

blogRouter.route("/deleteBlog/:id")
    .delete(blogsCltr.delete);

blogRouter.route("/getBlogs/:id")
    .get(blogsCltr.getBlogs);

module.exports=blogRouter   