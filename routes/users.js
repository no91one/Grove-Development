const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
router.get('/', usersController.users);
router.get('/signup', usersController.signup);

router.get('/signin', usersController.signin);

router.post('/create', usersController.create);
//router.get('/posts',)

module.exports = router;