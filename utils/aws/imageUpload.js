const {S3Client} = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const ErrorHandler = require("./ErrorHandler")
const s3Config = new  S3Client({
    credentials:{
        accessKeyId:"AKIA2KRBSVLU4SPCOPMQ",
        secretAccessKey:"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"
    },
    region:"ap-south-1"
});

const s3Storage = multerS3({
    s3:s3Config,
    bucket:"fhl-pos",
    acl:"private",
    metadata:(req,file,cb)=>{
        console.log("click img 22");
        console.log("file",file);
        cb(null,{fieldname:file.fieldname});
    },
    key:(req,file,cb)=>{
        const uniqueSuffix = Date.now() +"-" + Math.round(Math.random() *10000);
        cb(null,"soumipictures/ecom" +file.fieldname+"_"+ uniqueSuffix)
    },
});

const sanitizeFilter = (file,callback)=>{
    const fileExnt = [".pdf",".png", ".jpg", ".jpeg", ".gif", ".webp"];

    //console.log("Path",path);
    const isAllowedExtenstion = fileExnt.includes(
        path.extname(file.originalname.toLowerCase())
    );
    const isAllowedMimeType = file.mimetype.startWith("images/");

    if(isAllowedExtenstion && isAllowedMimeType){
        return callback(null,true);
    }else{

        callback(
            null,
            new ErrorHandler(`File type ${path.extname(
                file.originalname.toLowerCase()
            )}not allowed!`,400)
        )
    }
};

exports.uploadParentCategoryImage = multer({
    storage:s3Storage,
    fileFilter: (req,file,cb)=>{
        console.log("click image");
        sanitizeFilter(file,cb)
    },
    limits:{
        filesize:1024*1024*2
    }
})