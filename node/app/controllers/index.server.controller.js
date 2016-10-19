exports.render = function(req, res) {
    res.render('index', {
        title: 'Home',
        layout: 'layout'
    })
};
