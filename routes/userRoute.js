const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
    updatepoint
} = require('../controllers/userController');

router.route('/').post(registerUser);
router.route('/login').post(authUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/points').put(protect, updatepoint);

module.exports = router;