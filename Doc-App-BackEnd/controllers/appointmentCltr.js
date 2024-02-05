const Appointment=require("../models/appointmentModel")
const Counselor=require("../models/counselorModel")
const appointmentCltr={}
const _=require("lodash")
const mongoose=require("mongoose")
const Profile = require("../models/profileModel")

appointmentCltr.create=async(req,res)=>{
    const body=_.pick(req.body,["userId","counselorId","date","time","status","ticketPrice"])
    
    try{
        const savedAppointment=await new Appointment(body).save()
        const {counselorId}=savedAppointment
        const pushedAppointment=await Counselor.findByIdAndUpdate(counselorId,{$push:{appointments:savedAppointment._id}},{new:true})
        console.log(pushedAppointment)
        res.status(200).json({
            message:true,
            data:savedAppointment
        })
    }catch(e){
        res.status(401).json({
            message:false,
            error:e.message
        })
    }
}

appointmentCltr.update = async (req, res) => {
    const body = req.body;
    const {id} = req.params

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, body, { new: true });

        res.status(200).json({
            message: true,
            data: updatedAppointment
        });
    } catch (e) {
        res.status(500).json({
            message: false,
            error: e.message
        });
    }
};

appointmentCltr.getAppointments=async(req,res)=>{
    const {counselorId}=req.params
    try{
        const fetchedAppointments=await Appointment.find({counselorId:counselorId}).populate("userId",{firstName:1,lastName:1})
       if(!fetchedAppointments || fetchedAppointments.length==0){
        return res.status(404).json({
            success:false,
            message:"Appointments not found for this counselor"
        })
    }
        res.status(200).json({
            success:true,
            data:fetchedAppointments
        })
    }catch(e){
        res.status(401).json({
            message:false,
            error:e.message
        })
    }
}

// const AggregateAppointments=async(req,res)=>{
//     const {counselorId}=req.params
//     try{
//         const fetchedAppointments=await Appointment.aggregate([
//             {
//                 $match:{counselorId:counselorId}
//             },
//             {
//                 $lookup:{
//                     from:"users",
//                     localField:"userId",
//                     foreignField:"_id",
//                     as:"user"
//                 }
//             }
//         ])
//        if(!fetchedAppointments || fetchedAppointments.length==0){
//         return res.status(404).json({
//             success:false,
//             message:"Appointments not found for this counselor"
//         })
//     }
//         res.status(200).json({
//             success:true,
//             data:fetchedAppointments
//         })
//     }catch(e){
//         res.status(401).json({
//             message:false,
//             error:e.message
//         })
//     }
// }

appointmentCltr.aggregateAppointments = async (req, res) => {
    const { counselorId } = req.params;
    try {
        const fetchedAppointments = await Profile.aggregate([
            {
                $match: { role: "Counselor" }
            },
            {
                $lookup: {
                    from: "profile",
                    localField: "userId",
                    foreignField: "_id",
                    as: "UserData"
                }
            }
            // Add more $lookup stages if needed
        ]);

        if (!fetchedAppointments || fetchedAppointments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointments not found for this counselor"
            });
        }

        res.status(200).json({
            success: true,
            data: fetchedAppointments
        });
    } catch (e) {
        res.status(401).json({
            message: false,
            error: e.message
        });
    }
};


module.exports=appointmentCltr