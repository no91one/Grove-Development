const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/',passport.checkAuthentication, usersController.tUsers);

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up',passport.isSignedIn, usersController.signUp);
router.get('/sign-in',passport.isSignedIn, usersController.signIn);


router.post('/create', usersController.create);

router.get('/sign-out', usersController.removeSession);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

module.exports = router;