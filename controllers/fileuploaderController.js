
'use strict'
const SingleFile=require('../models/singlefile');
const singleFileUpload=async(req,res,next)=>{
    try{
const file = new SingleFile ({
    fileName:req.file.originalname,
    filePath:req.file.path,
    fileType:req.file.mimetype,
    fileSize:req.file.size
});
await file.save();
res.status(201).send('File Uploaded Successfully')
    }catch(error){
        res.status(400).send(error.message)
    }
}
const fileSizeFormatter=(bytes,decimal)=>{
    if(bytes === 0){
        return '0 Bytes';
    }
 const dm=decimal || 2;
 const sizes =['Bytes','KB','MB','GB','TB','PB','EB','YB','ZB']
    const index=Math.floor((bytes/Math.pow(1000,index)).toFixed(dm)) + '-' + sizes[index]
}

const getallSingleFiles = async(req,res,next) =>{
    try{
        
const files= await SingleFile.find();
    res.status(200).send(files);

}
catch(error){res.status(400).send(error.message)}}
module.exports={
    singleFileUpload,
    getallSingleFiles
}