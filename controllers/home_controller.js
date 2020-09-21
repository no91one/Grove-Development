module.exports.home = (req, res) => {
    return res.end('<h1>Express is running for iCon !');
}
module.exports.hpage = (req, res) =>
{
    return res.render('home',
        {
        title:'Home'
    });
}