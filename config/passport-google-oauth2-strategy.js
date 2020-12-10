const passport = require('passport');
const googleStartegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
//tell passport to use new strategy for google login
passport.use(new googleStartegy({
    clientID: "700015262672-1s33ic3b99nm0u8v3lnqbpmt972pc5o7.apps.googleusercontent.com",
    clientSecret: "LNLDIKaM07igo0Z3IZps_W-_",
    callbackURL: "http://https://grove-development.herokuapp.com//users/auth/google/callback"
},
    //callback function
    function (accessToken, refreshToken, profile, done) {
        //find user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log("Error in google-strategy", err); return; }
            console.log(accessToken, refreshToken);
            console.log(profile);
            if (user) {
                //if user found set it as req.user
                return done(null, user);
            }
            else {
                //if user not found create user and  set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) { console.log("Error in creating google-strategy-passport", err); return; }
                    return done(null, user);
                });
            }
        });
    }
)
);

module.exports = passport;