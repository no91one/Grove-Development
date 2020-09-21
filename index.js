const express = require('express');
const app = express();
const port = 8100;

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, (err) =>
{
    if (err)
    {
        console.log(`Error in runnig server : ${err}`);
        return;
    }
    console.log(`Server is running at port : ${port}`);
})