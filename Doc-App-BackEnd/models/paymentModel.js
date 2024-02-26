const mongoose=require("mongoose")
const  {Schema,model}=mongoose

const payementSchema=new Schema({
    appointmentId:{type:mongoose.Schema.Types.ObjectId,ref:"appointment"},
    
})