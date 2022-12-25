const User = require('../models/UserModel');
var mailer = require('../utils/Mailer');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');

const registerUser = async (req, res, next) => {
    try {
        const { FirstName,LastName, email, password,address,Phone,codePostal,city,country } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                msg: 'Entered email id is already registered with us. Login to continue'
            })
        }


        const user = new User({
            FirstName,LastName, email, password,address,Phone,city,codePostal,country
        });


        // Save user object
        user.save(function (err, user) {
            if (err) return next(err);
            res.status(201).json({
                success: true,
                msg: 'Account Created Sucessfully. Please log in.'
            })
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Server having some issues'
        })
    }
}


const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.email,
            avatar: user.avatar,
            codePostal:user.codePostal,
            city:user.city,
            country:user.country,
            address:user.address,
            phone:user.Phone,
            points:user.points,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({
            success: false,
            msg: 'Unauthorized user'
        })
    }
};


const getUserProfile = async (req, res) => {
    const user = await User.findById(req.header._id);

    if (user) {
        res.json({
            _id: user.id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.email,
            avatar: user.avatar,
            codePostal:user.codePostal,
            city:user.city,
            country:user.country,
            address:user.address,
            phone:user.Phone,
            points:user.points,
        })
    } else {
        res.status(404).json({
            success: false,
            msg: 'User not found'
        })
    }
}


const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.header._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.avatar = req.body.avatar || user.avatar;


        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404).json({
            sucess: false,
            msg: 'User not found'
        });
    }



}
const updatepoint = async (req, res) => {
    const user = await User.findById(req.header._id);

    if (user) {
        user.points = req.body.points || user.points;



        const updatedUser = await user.save();

        res.json({
            points: updatedUser.points,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404).json({
            sucess: false,
            msg: 'User not found'
        });
    }



}

module.exports = {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
    updatepoint
}