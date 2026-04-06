const express    = require('express');
const router     = express.Router();
const userCtrl   = require('../controllers/userController');
const protect    = require('../middleware/auth');

router.get('/mylist',                     protect, userCtrl.getMyList);
router.post('/mylist/:contentId',         protect, userCtrl.addToMyList);
router.delete('/mylist/:contentId',       protect, userCtrl.removeFromMyList);
router.get('/history',                    protect, userCtrl.getHistory);
router.patch('/history/:contentId',       protect, userCtrl.updateProgress);

module.exports = router;
