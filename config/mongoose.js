const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/flock_db', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error occured !"));

db.once('open', () => {
    console.log("Connected to Database Succesfully !");
})