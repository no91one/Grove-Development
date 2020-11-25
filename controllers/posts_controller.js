const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
      // comment: req.comment._id
    });
    req.flash('success', "Post Published !");
    return res.redirect('back');
  } catch (error) {
    req.flash('error', error);
    return;
  }

}
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      req.flash('success', "Post and associated comments are deleted !");
      return res.redirect('back');
    }
    else {
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', err);
    return;
  }

}