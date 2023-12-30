const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/images")
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,file.orignalname+"-"+uniqueSuffix)
    }
})

const upload=multer({storage:storage})
const uploadImg=upload.single("image")

module.exports=uploadImg