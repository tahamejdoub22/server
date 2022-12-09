const Materiel = require('../models/MaterielModel');
const ImageToBase64 = require('image-to-base64');
const typeModel = require('../models/typeModel');



// @desc -> Add materiel
const addmateriel = async (req, res, next) => {
    try {
        const { materielName, matrielImage,type} = req.body;

        const materiel = await Materiel.findOne({ materielName: materielName });

        if (materiel) {
            return res.status(401).json({
                success: false,
                msg: ' materiel already exists'
            });
        }

        const new_materiel = await Materiel.create({ materielName,matrielImage,type });

        res.status(201).json({
            success: true,
            msg: 'Type created',
            data: new_materiel
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
};





// @desc -> Fetch All materiel
const getAllmateriel = async (req, res, next) => {
    try {


        

        const materielCount = await Materiel.find({});

        const materiel = await Materiel.find({})
         .populate({ path: 'type', select: ['_id','type_name'],model:typeModel} )
        


        res.json({
            success: true,
            count: materielCount.length,
            data: materiel
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
}


// @desc Get materiel By Id
const getMaterielById = async (req, res, next) => {
    try {

        const materiel = await Materiel.findById(req.params.materielId)
            .populate({ path: 'type', select: ['_id', 'type_name'] });

        res.json({
            success: true,
            data: materiel
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
};



// @desc Get Slider materiel
const getSlidermateriel = async (req, res, next) => {
    try {

        const materiel = await Materiel.find({ addToSlider: true })
            .populate({ path: 'type', select: ['_id', 'type_name'] });

        res.json({
            success: true,
            count: materiel.length,
            data: materiel
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
};



// @desc Get materiel By Type
const getMaterielByType= async (req, res, next) => {
    try {

        const materiel = await Materiel.find({ type: req.params.catId })
            .populate({ path: 'type', select: ['_id', 'type_name'] });

        res.json({
            success: true,
            count: materiel.length,
            data: materiel
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
};



// @desc Delete materiel
const deleteMaterielById = async (req, res, next) => {
        try {

            const materiel = await Materiel.findByIdAndDelete(req.params.materielId);
    
            res.status(201).json({
                success: true,
                msg: 'Successfully Deleted',
                data: materiel
            });
    
            if (!materiel) {
                return res.status(401).json({
                    success: false,
                    msg: 'materiel not found'
                });
            }
            
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Internal error occured.'
            });
        }
};



// @desc Update materiel
const editmateriel = async (req, res, next) => {
    try {
       
        const materiel = await Materiel.findByIdAndUpdate(req.params.materielId, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            success: true,
            msg: 'Successfully Updated',
            data: materiel
        });

        if (!materiel) {
            return res.status(401).json({
                success: false,
                msg: 'materiel not found'
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
    addmateriel,
    getAllmateriel,
    getMaterielById,
    getSlidermateriel,
    getMaterielByType,
    deleteMaterielById,
    editmateriel
}