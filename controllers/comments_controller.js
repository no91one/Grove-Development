const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create(
                {
                    content: req.body.content,
                    user: req.user._id,
                    post: req.body.post
                }, function (err, comment) {
                    if (err) {
                        console.log("Error while posting your comment !", err);
                    }
                    post.comments.push(comment);
                    post.save();

                    return res.redirect('/');
                }
            );
        }
    });

}