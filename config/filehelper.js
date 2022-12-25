'use strict';
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const storage=multer.diskStorage({
 destination:(req,file,cb)=>{
    cb(null,'uploads')
 },
 filename:(req,file,cb)=>{
    cb(null,new Date().toISOString().replace(/:/g,'-')+'-'+file.originalname)
 }   
})
const filefilter=(req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
const upload=multer({storage:storage,fileFilter:filefilter})
const filePath = path.join("/uploads");
fs.writeFileSync(filePath, JSON.stringify(upload));
module.exports={upload}
