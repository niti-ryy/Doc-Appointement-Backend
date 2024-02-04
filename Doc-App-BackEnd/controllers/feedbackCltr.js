const FeedBack=require("../models/feedbackModel")
const Counselor=require("../models/counselorModel")

const feedbackCltr={}

feedbackCltr.create=async(req,res)=>{
     
    try{
        const checkSubmissions=await FeedBack.findById(req.body.appointmentId,{isFeedBackGiven:true})
        if(checkSubmissions.isFeedBackGiven){
            res.status(400).json({message:"Feedback is already given for this session."})
        }
        const feedback=new FeedBack(req.body)
        await feedback.save()
        console.log(feedback)
        await updateCounselorAverageRating(feedback.counselorId)
        res.status(201).json({message:"Feedback Created Successfully"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

//function for creating avg rating
async function updateCounselorAverageRating(counselorId) {
    try {
        const feedbacks = await FeedBack.find({ counselorId: counselorId })

        if (feedbacks.length > 0) {
            const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.counselorRatings, 0);
            const avgRating = Math.round(totalRating / feedbacks.length)

            // Directly update the counselor's avgRating using findOneAndUpdate
            await Counselor.findOneAndUpdate(
                { _id: counselorId },
                { $set: { avgRating: avgRating } },
                { new: true }
            )
        }
        console.log("avg rating  created")
    } catch (err) {
        console.error('Error updating counselor average rating:', err.message)
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