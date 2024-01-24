const mongoose=require("mongoose")
const {Schema,model}=mongoose

const blogSchema=new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    counselorId:{type:Schema.Types.ObjectId,ref:"Counselor"}
})

const Blog=model("Blog",blogSchema)
module.exports=Blog