const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function (req, res) {
    if (req.isAuthenticated()) {
        try {
            let posts = await Post.find({})
                .sort('-createdAt')
                .populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user'
                    }
                });
            let users = await User.find({});
            return res.render('home', {
                title: "Home",
                posts: posts,
                all_users: users
            });
        
        } catch (err) {
            console.log("Error !", err);
            return;
        }
    }
    else {
        return res.render('user_sign_in', {
            title: "Sign-In",
        });
    }
    
}

// module.exports.actionName = function(req, res){}