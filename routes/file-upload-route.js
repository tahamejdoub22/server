'use strict'
const express=require('express')
const {upload}=require('../config/filehelper')
const {singleFileUpload, getallSingleFiles}=require('../controllers/fileuploaderController')
const router=express.Router()
router.post('/singleFile',upload.single('file'),singleFileUpload)
router.get('/getSingleFiles',getallSingleFiles)
module.exports={
    routes:router
}