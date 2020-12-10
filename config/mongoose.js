const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/flock_development', { useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex:true });
mongoose.connect('mongodb+srv://no91one:9ZUNfx8xokh0Ij0p@cluster0.ycb5f.mongodb.net/grove-development?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex:true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;