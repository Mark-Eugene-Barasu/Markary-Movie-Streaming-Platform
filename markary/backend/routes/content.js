const express     = require('express');
const router      = express.Router();
const contentCtrl = require('../controllers/contentController');
const protect     = require('../middleware/auth');

router.get('/featured',  protect, contentCtrl.getFeatured);
router.get('/trending',  protect, contentCtrl.getTrending);
router.get('/search',    protect, contentCtrl.search);
router.get('/all',       protect, contentCtrl.getAll);
router.get('/:id',       protect, contentCtrl.getOne);

module.exports = router;
