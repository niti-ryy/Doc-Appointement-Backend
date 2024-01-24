const FeedBack=require("../models/feedbackModel")

const feedbackCltr={}

feedbackCltr.create=async(req,res)=>{
    try{
        const feedback=new FeedBack(req.body)
        await feedback.save()
        res.status(201).json({message:"Feedback Created Successfully"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

feedbackCltr.get=async(req,res)=>{
    const {counselorId}=req.params
    try{
       const feedbacks=await FeedBack.find({counselorId:counselorId}).populate({
        path:"userId",
        model:"Profile",
        select: "firstName lastName"
       })
       res.status(200).json({
        success: true,
        message: "feedback fetched successfully",
        data:feedbacks
       })
    }catch(e){
        res.status(404).json({
            success:false,
            message:"failed to fetch feedback",
            errorMessage:e.message
        })
    }
}


module.exports =feedbackCltr