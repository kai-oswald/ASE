exports.render = function(req, res) {
    // check if Admin is logged in and grant access
    var grantAccess = false;



    res.render('admin', {
        title: 'Admin',
        layout: 'layout',
        isAdmin: grantAccess
    })
};
