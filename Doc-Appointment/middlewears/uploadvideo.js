// const multer = require('multer');

// const ImageStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/MultiMediaFiles");
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Number(Date.now());
//         cb(null, `${uniqueSuffix}-${file.originalname}`);
//     }
// });

// const videoStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/MultiMediaFiles");
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Number(Date.now());
//         cb(null, `${uniqueSuffix}-${file.originalname}`);
//     }
// });

// const uploadVideo = multer({
//     storage: videoStorage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith("video/")) {
//             cb(null, true);
//         } else {
//             cb(new Error("Invalid file format"));
//         }
//     }
// });

// const uploadImage = multer({
//     storage: ImageStorage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith("image/")) {
//             cb(null, true);
//         } else {
//             cb(new Error("Invalid file format"));
//         }
//     }
// });

// const uploadVideoFiles = uploadVideo.array("video", 3);
// const uploadImageFiles = uploadImage.single("image");

const multer=require("multer");
const videoStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/MultimediaFiles")
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Number(Date.now())
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const uploadVideos = multer({
    storage: videoStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("video/")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file format"));
        }
    }
}) 
const uploadVideo=multer({storage:videoStorage}).array("video",3)

module.exports=uploadVideo


