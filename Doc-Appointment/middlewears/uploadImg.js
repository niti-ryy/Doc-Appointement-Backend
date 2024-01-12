

const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/images")
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Number(Date.now())
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const upload=multer({storage:storage})
const uploadImg=upload.single("image")
module.exports=uploadImg