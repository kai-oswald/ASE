exports.render = function (req, res) {
    res.render('about', {
        title: 'About',
        layout: 'layout'
    })
};
