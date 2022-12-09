const express = require('express');
const {  addType,
    getAllTypes,
    deleteType,
    editType } = require('../controllers/TypeController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');


router.route('/addType').post(protect, addType);
router.route('/deleteType/:catId').delete(protect, deleteType);
router.route('/getAllty').get(getAllTypes);
router.route('/editType/:catId').put(protect, editType);


module.exports = router;