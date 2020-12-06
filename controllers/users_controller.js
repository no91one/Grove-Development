const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {
    let user = await User.findById(req.params.id);
    return res.render('user_profile', {
        title: "User's Profile",
        profile_user: user
    });
}

module.exports.editProfile = async function (req, res) {
    if (req.user.id == req.params.id) {
        let user = await User.findById(req.params.id);
        return res.render('edit_profile', {
            title: "Edit Profile",
            profile_user: user
        });
    }
    else {
        req.flash('error', "Unauthorized !");
        return res.status(401).send("Unauthorized !");
    }
}

module.exports.update =async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log("***Multer Error***", err); }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    console.log(req.file);
                    if (user.avatar)
                    {
                        if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        } 
                        }
                    //saving the path of uploaded file in avatar feild in user model
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', "Updated successfully !");
                return res.redirect('back');
            });
            
        }catch (err) {
            req.flash('error',"Error signing up !");
            return res.redirect('back');
        }
    }
    else {
        req.flash('error', "Unauthorized !");
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
    if (req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render('user_sign_up', {
        title: "Flock | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render('user_sign_in', {
        title: "Flock | Sign In"
    })
}

// get the sign up data
module.exports.create = async function (req, res) {
    if (req.file) {
       const Avatar = User.avatarPath + '/' + req.file.filename;
    }
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                avatar:Avatar
            });
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