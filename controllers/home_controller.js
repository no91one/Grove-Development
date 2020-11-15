module.exports.home = (req, res) => {
    return res.end('<h1>Express is running for Flock !');
}
module.exports.hpage = (req, res) =>
{
    return res.render('home',
        {
        title:'Home'
    });
}