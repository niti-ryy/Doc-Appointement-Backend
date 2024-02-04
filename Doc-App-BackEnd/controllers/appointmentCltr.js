const Appointment=require("../models/appointmentModel")
const appointmentCltr={}
const _=require("lodash")

appointmentCltr.create=async(req,res)=>{
    const body=_.pick(req.body,["userId","counselorId","date","time","status","ticketPrice"])
    
    try{
        const savedAppointment=await new Appointment(body).save()
        
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


module.exports=appointmentCltr