// const express=require("express")
// const blogsCltr = require("../controllers/blogsCltr")
// const uploadImg = require("../middlewears/uploadImg")
// const blogRouter=express.Router()
// const {checkSchema}=require("express-validator")
// const blogValidationSchema = require("../helpers/blog-validation")

// blogRouter.route("/createBlog")
//     .post(checkSchema(blogValidationSchema),uploadImg,blogsCltr.create);
// blogRouter.route("/deleteBlog/:id")
//     .delete(blogsCltr.delete);
// blogRouter.route("/getBlogs/:id")
//     .get(blogsCltr.getBlogs);
// // blogRouter.route("/getBlogs/:counsleorId")
// //     .get()
// module.exports=blogRouter   
const express=require("express")
const blogsCltr = require("../controllers/blogsCltr")
const uploadImg = require("../middlewears/uploadImg")
const blogRouter=express.Router()
const {checkSchema}=require("express-validator")
const blogValidationSchema = require("../helpers/blog-validation")
const authenticate = require("../middlewears/authenticate")
const checkRole = require("../middlewears/checkRole")

blogRouter.route("/createBlog")
    .post(authenticate,checkRole(["Counselor","Admin"]),checkSchema(blogValidationSchema),uploadImg,blogsCltr.create);
blogRouter.route("/deleteBlog/:id")
    .delete(authenticate,checkRole(["Counselor","Admin"]),blogsCltr.delete);
blogRouter.route("/getBlogs/:id")
    .get(authenticate,checkRole(["Counselor","User"]),blogsCltr.getBlogs);
// blogRouter.route("/getBlogs/:counsleorId")
//     .get()
module.exports=blogRouter   