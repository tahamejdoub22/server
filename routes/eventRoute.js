const express = require('express');
const {  addevent,
    getAllevent} = require('../controllers/eventController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
router.route('/addevent').post(protect, addevent);
router.route('/getAllevent').get(getAllevent);
module.exports = router;