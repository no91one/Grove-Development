const nodeMailer = require('../config/nodemailer');

//naive way
// let newComment = function ()
// {

// }

// module.exports=newComment

//short-hand way for creating and exporting methods
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: "itsyourgrove@gmail.com",
        to: comment.user.email,
        subject: "New comment Published",
        html:htmlString
    }, (err, info) => {
            if (err) { console.log("Error in sending mail", err); return; }
            console.log("Message Sent !", info);
            return;
    });
}