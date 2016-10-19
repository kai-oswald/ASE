var grantAccess = false;

exports.render = function (req, res) {
    // check if Admin is logged in and grant access
    res.render('admin', {
        title: 'Admin',
        layout: 'layout',
        isAdmin: grantAccess
    })
};

exports.validate = function (req, res) {
    if (req.body.password === "qwer") {
        grantAccess = true;
        res.json({ success: true });
    } else {
        res.json({ success: false, err: "Invalid Password"});
    }
};