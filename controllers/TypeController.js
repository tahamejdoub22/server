const Type = require('../models/typeModel');
const UserModel = require('../models/UserModel');
const User =require('../models/UserModel')







const addPoints=async(req,res,next)=>{
    try{






    }catch (error) {

        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
}
// @desc Add Catgory
const addType = async (req, res, next) => {
    try {
        const { type_name } = req.body;

        const type = await Type.findOne({ type_name: type_name });

        if (type) {
            return res.status(401).json({
                success: false,
                msg: 'type materiel already exists'
            });
        }

        const new_type = await Type.create({ type_name });

        res.status(201).json({
         
             new_type
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
};



// @desc Get All Categories
const getAllTypes = async (req, res, next) => {
    try {
        const Types = await Type.find({});
        res.json({
            success: true,
            data: Types
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
};


// @desc Delete a Category
const deleteType = async (req, res, next) => {
    try {

        const type = await Type.findByIdAndDelete(req.params.catId);

        res.status(201).json({
             type
        });

        if (!type) {
            return res.status(401).json({
                success: false,
                msg: 'type not found'
            });
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
}


// @desc Update Category
const editType = async (req, res, next) => {
    try {
       
        const type = await Type.findByIdAndUpdate(req.params.catId, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
           
             type
        });

        if (!type) {
            return res.status(401).json({
                success: false,
                msg: 'Type not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
};


module.exports = {
    addType,
    getAllTypes,
    deleteType,
    editType
};