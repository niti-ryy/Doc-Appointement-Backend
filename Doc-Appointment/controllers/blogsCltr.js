const blogsCltr={}
const Blog=require("../models/blogsModel")
const pick=require("lodash/pick")

blogCltr.create=async(req,res)=>{
    const imagepath=req.file.path
    const {body}=req
    body.image=imagepath
    const blog=new Blog(body)
    try{
      const savedBlog=await Blog.save()
      if(!savedBlog){
        res.status(401).json({
            message:"Failed to saved Blog"
        })
        res.status(200).json({
            message:"Blog Saved Successfully",
            Blog:savedBlog
        })
      }  
    }catch(e){
        res.status.json({
            message:"Server Error",
            error:e.message
        })
    }
}

module.exports=blogCltr