const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
// router.post('/', bookController.createBook);
// router.get('/:id', bookController.getBook);
// router.patch('/:id', bookController.updateBook);
// router.delete('/:id', bookController.deleteBook);


module.exports = router;
