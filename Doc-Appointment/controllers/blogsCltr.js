const blogsCltr={}
const Blog=require("../models/blogsModel")
const pick=require("lodash/pick")
const {validationResult}=require("express-validator")

blogsCltr.create = async (req, res) => {   //validations are to be added
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No file uploaded or invalid file" })
        }
        const imagepath = req.file.path
        const { body } = req;
        body.image = imagepath;
        const blog = new Blog(body)
         const savedBlog = await blog.save()
        if (!savedBlog) {
            return res.status(401).json({ message: "Failed to save Blog" });
        }
        return res.status(200).json({
            message: "Blog Saved Successfully",
            Blog: savedBlog
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message
        })
    }
}

blogsCltr.delete=async(req,res)=>{
    const {id}=req.params
    try{
        const deletedRecord=await Blog.findByIdAndDelete(id)
        if(!deletedRecord){
            res.status(400).json({
                message:"Failed to deletd Blog",                
            })
        }
        res.status(200).json({
            message:"Blog Deleted Successfully",
            deletedBlog:deletedRecord
        })

    }catch(e){
        return res.status(500).json({
            message: "Server Error",
            error: e.message
        })
    }
}

blogsCltr.getBlogs = async (req, res) => {
    const { id } = req.params
    try {
        let blogs
        if (id === '0') {
            blogs = await Blog.find({})
        } else {
            blogs = await Blog.find({ counselorId: id })
        }
        const message = id === '0' ? 'All Blogs retrieved successfully' : 'Blogs by specific Counselor retrieved successfully'

        return res.status(200).json({
            message,
            Blogs: blogs
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Server Error',
            error: e.message
        })
    }
}




module.exports=blogsCltr

