const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const PHOTO_PATH = path.join('/uploads/posts/photos');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    photo: {
      type:String  
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', PHOTO_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
})

postSchema.statics.uploadedPhoto = multer(
    {
        fileFilter: function (req, file, cb) {
            var filetypes = /jpeg|jpg|png/;
            var mimetype = filetypes.test(file.mimetype);
            var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

            if (mimetype && extname) {
                return cb(null, true);
            }
            cb("File upload only supports the following filetypes - " + filetypes);
            req.flash('error', "supports png and jpg formats only !");
        },
        storage: storage
    }).single('photo');

postSchema.statics.photoPath = PHOTO_PATH;
const Post = mongoose.model('Post', postSchema);
module.exports = Post;