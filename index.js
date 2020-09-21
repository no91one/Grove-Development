const express = require('express');
const app = express();
const port = 8100;

app.use('/', require('./routes'));
app.listen(port, (err) =>
{
    if (err)
    {
        console.log(`Error in runnig server : ${err}`);
        return;
    }
    console.log(`Server is running at port : ${port}`);
})