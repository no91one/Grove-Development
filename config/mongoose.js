const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://no91one:groveatlas@cluster0.ycb5f.mongodb.net/flock_development?retryWrites=true&w=majority"', { useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex:true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;