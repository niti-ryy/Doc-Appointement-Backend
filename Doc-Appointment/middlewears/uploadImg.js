const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"/uploads/images")
    },
    filename:(req,res,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,file.fieldname+"-"+uniqueSuffix)
    }
})

const upload=multer({storage:storage})
const uploadImg=upload.single("image")

module.exports=uploadImg