const Materiel = require('../models/MaterielModel');
const ImageToBase64 = require('image-to-base64');
const typeModel = require('../models/typeModel');
const UserModel = require('../models/UserModel');
const eventModel = require('../models/eventModel');
// @desc -> Add event
const addevent = async (req, res, next) => {
    try {
        const { title, eventImage,description,snippet,lag,lat,user} = req.body;

        const event = await eventModel.findOne({ title: title });

        if (event) {
            return res.status(401).json({
                success: false,
                msg: ' event already exists'
            });
        }

        const new_event = await eventModel.create({ title,eventImage,description,snippet,lag,lat,user });

        res.status(200).json({
            new_event
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
};
// @desc -> Fetch All materiel
const getAllevent = async (req, res, next) => {
    try {


        


        const event = await eventModel.find({ 

        }).populate({ path: 'user', select: ['name'],model:UserModel} )

        res.json({
            event    })

//materielitem:get_random(materiel)

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal error occured.'
        });
    }
}
module.exports = {
    addevent,
    getAllevent
}
