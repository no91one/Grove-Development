const User = require('../models/user');


module.exports.profile = function (req, res) {
    return res.render('user_profile', {

    })
}

module.exports.tUsers = function (req, res) {
    User.find({}, (err, users) => {
        if (err) {
            console.log("Error in fetching user_list !", err);
            return;
        }

        return res.render('flock_users', {
            title: "Flock Users",
            user_list: users
        });

    })
}
// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Flock | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Flock | Sign In"
    })
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up ', err); return }

                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

module.exports.removeSession = (req, res) => {
    req.logout();
    return res.redirect('/');
}