const express = require('express');
const {  addmateriel,
    getAllmateriel,
    getMaterielById,
    getSlidermateriel,
    getMaterielByType,
    deleteMaterielById,
    getRandommateriel,
    editmateriel } = require('../controllers/MaterielController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');


router.route('/addMateriel').post(protect, addmateriel);
router.route('/getAllMateriel').get(getAllmateriel);
router.route('/getRandomMateriel').get(getRandommateriel);

router.route('/getById/:materielId').get(getMaterielById);
router.route('/getAllMateriel/slider').get(protect,getSlidermateriel);
router.route('/getByType/:catId').get(getMaterielByType);

router.route('/deleteMateriel/:materielId').delete(protect, deleteMaterielById);
router.route('/editMateriel/:materielId').put(protect, editmateriel);


module.exports = router;