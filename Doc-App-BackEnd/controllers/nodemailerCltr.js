const sendEmail = require("../utils/nodemailer")

const nodemailerCltr={}


nodemailerCltr.sendmail=async(req,res)=>{
    const {to,subject,text}=req.body
    try{
        mailStatus=sendEmail(to,subject,text)
        if(!mailStatus){
            res.send("error occured sending emaIL")
        }
        res.send("email sent successfully")
    }catch(e){
        res.send("error",e)
    }
}

module.exports=nodemailerCltr