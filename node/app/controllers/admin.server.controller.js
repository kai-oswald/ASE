exports.render = function(req, res) {
    res.render('admin', {
        title: 'Admin',
        layout: 'layout'
    })
};
