const multer=require("multer")

const ImageStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/MultiMediaFiles")
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Number(Date.now())
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const upload=multer({storage:ImageStorage})
const uploadImg=upload.single("image")
module.exports=uploadImg