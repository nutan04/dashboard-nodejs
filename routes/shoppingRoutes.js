const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shoppingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/addcart/:id', authMiddleware, shoppingController.addcart);
router.get('/cart', authMiddleware, shoppingController.cart);
router.post('/checkout', authMiddleware, shoppingController.checkout);





module.exports = router;