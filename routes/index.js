const express = require('express');
const router = express.Router();

console.log("Router loaded !");
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');
router.get('/', homeController.hpage);

router.get('/test', homeController.home);

router.use('/users', require('./users'));

router.use('/posts', require('./posts'));



module.exports = router;