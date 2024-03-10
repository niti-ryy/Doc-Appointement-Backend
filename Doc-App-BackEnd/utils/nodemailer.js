// const nodemailer=require("nodemailer")
// require("dotenv").config()

// const sendEmail=async(to,subject,text,options)=>{
//     try{ 
//        const transporter=nodemailer.createTransport({
//             service:"gmail",
//             auth:{
//                 user:process.env.NODEMAILER_EMAIL,
//                 pass:process.env.NODEMAILER_PASS,
//             }
//        })
//        const mailOptions={
//         from:process.env.NODEMAILER_EMAIL,
//         to:to,
//         subject:subject,
//         text:text,
//         html:`<p>this is a test nodemialer</p> ${to} <b>sent using nodemailer</b>`
//        }
//        const info=await transporter.sendMail(mailOptions)
//        console.log(info)
//     }catch(e){
//         console.error("error occured",e)
//     }
// }


// module.exports=sendEmail

const nodemailer=require("nodemailer")
require("dotenv").config()

const sendEmail=async(to,subject,text,html)=>{
    try{ 
       const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.NODEMAILER_EMAIL,
                pass:process.env.NODEMAILER_PASS,
            }
       })
       const mailOptions={
        from:process.env.NODEMAILER_EMAIL,
        to:to,
        subject:subject,
        text:text,
        html:html,
       }
       const info=await transporter.sendMail(mailOptions)
       console.log(info)
    }catch(e){
        console.error("error occured",e)
    }
}


module.exports=sendEmail

