const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
router.get('/', usersController.users);
//router.get('/posts',)

module.exports = router;