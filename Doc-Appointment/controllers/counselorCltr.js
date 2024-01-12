const Counselor=require("../models/counselorModel")
const {validationResult} = require("express-validator")

const counselorCltr={}

counselorCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {profile,specialization,availability,experiences,consulationFees,bio,languages,achievements}=req.body
    const newCounselor=new Counselor({
        profile,
        specialization,
        availability,
        experiences,
        consulationFees,
        bio,
        languages,
        achievements
    })
    try{
        const savedCounselor=await newCounselor.save()
        res.status(201).json({
            message:"counselor created successfully",
            counselor:savedCounselor
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports=counselorCltr