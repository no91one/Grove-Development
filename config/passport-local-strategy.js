const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        // find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = function (req, res, next) {//if the user is signed-in , then pass the request to next function
    if (req.isAuthenticated()) {
        return next();
    }
    //if the the user is not signed-in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {// sending current signed in information from session to the locals for views
        res.locals.user = req.user;
    }
    next();
}

passport.isSignedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
       return res.redirect('/users/profile');
    }
    next();
}

module.exports = passport;