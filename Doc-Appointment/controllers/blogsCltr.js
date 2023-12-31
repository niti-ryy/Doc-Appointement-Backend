const blogsCltr={}
const Blog=require("../models/blogsModel")
const pick=require("lodash/pick")

blogsCltr.create = async (req, res) => {
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
    try{

    }catch(e){
        
    }
}

module.exports=blogsCltr

