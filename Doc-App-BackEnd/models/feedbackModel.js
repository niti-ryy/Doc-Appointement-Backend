const mongoose=require("mongoose")
const {Schema,model}=require("mongoose")

const feedBackSchema=new Schema({
    counselorId:{type:Schema.Types.ObjectId,ref:"Counselor",required:true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment",required:true},
    reviewText:{type:String, required:true},
    rating:{type:Number,required:true,min:0,max:10,default:0},
},{timestamps:true})



const FeedBack=model("FeedBack",feedBackSchema)

module.exports=FeedBack