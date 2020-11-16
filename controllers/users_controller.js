const Users = require('../models/user');
module.exports.users = function (req, res) {
     return res.render('users',
          {
               title: "Users",
               users_list: Users
          });
}
const User = require("../models/user");
module.exports.signup = (req, res) => {
     // console.log(req.cookies);
     // res.cookie('something', "newValue");
     return res.render('signup',
          {
               title: "Sign Up"
          });

}
module.exports.signin = (req, res) => {
     return res.render('signin',
          {
               title: "Sign in"
          })
}

module.exports.create = (req, res) => {
     if (req.body.password != req.body.confirm_password) {
          return res.redirect('back');
     }
     User.findOne({ email: req.body.email }, function (err, user) {
          if (err) {
               console.log("Error finding user ", err);
               return;
          }
          if (!user) {
               User.create(req.body, function (err, user) {
                    if (err) {
                         console.log("Error in creating user", err);
                         return;
                    }
                    return res.redirect('/users/signin');
               })
          }
          else
               return res.redirect('back');
     })

}