// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         const fileExt = file.originalname.split('.').pop(); // Get the file extension
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, `${file.originalname}-${uniqueSuffix}.${fileExt}`);
//     }
// });

// const upload = multer({ storage: storage });
// const uploadImg = upload.single("image");

// module.exports = uploadImg;

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