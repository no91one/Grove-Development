const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();

const port = 8100;

const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

app.set('layout extractStyles', true);

app.set('layout extractScripts', true);

app.use('/', require('./routes'));

app.set('view engine', 'ejs');

app.set('views', './views');

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in runnig server : ${err}`);
        return;
    }
    console.log(`Server is running at port : ${port}`);
})