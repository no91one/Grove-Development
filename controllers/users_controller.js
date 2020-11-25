const User = require('../models/user');


module.exports.profile = async function (req, res) {
    let user = await User.findById(req.params.id);
    return res.render('user_profile', {
        title: "User's Profile",
        profile_user: user
    });
}

module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('back');
        });
    }
    else {
        return res.status(401).send("Unauthorized !");
    }
}

module.exports.tUsers = async function (req, res) {
    try {
        let users = await User.find({});
        return res.render('flock_users', {
            title: "Flock Users",
            user_list: users
        });
    } catch (err) {
        console.log("error fetching users !", err);
        return;
    }

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
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            req.flash('success', "Signed Up successfully !");
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',"Error signing up !");
        return;
    }

}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Succesfully');
    return res.redirect('/');
}

module.exports.removeSession = (req, res) => {
    req.logout();

    req.flash('success', "You've Logged out Succesfully");

    return res.redirect('/');
}