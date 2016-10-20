exports.render = function (req, res) {
    // check if Admin is logged in and grant access    
    res.render('admin', {
        title: 'Admin',
        layout: 'layout'
    })
};

exports.validate = function (req, res) {
    if (req.body.password === "qwer") {
        res.cookie('admin', 'true', {
            maxAge: 900000,
            httpOnly: true
        });
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false,
            err: "Invalid Password"
        });
    }
};