var Login = require('mongoose').model('Login');

exports.save = function (req, res, next) {
    var login = new Login(req.body);
    var result;
    var promise = login.save(function (err) {
        if (err) {
            console.log(err);
            result = {
                "err": "An unknown error occured",
                "code": login.code
            };
        } else {
            result = {
                "code": login.code
            };
        }
        res.json(result);
    });
};

exports.validate = function (req, res, next) {
    var login = new Login(req.body);
    var result;
    Login.find({
        "code": login.code
    }, function (err, docs) {
        if (err) {
            return next(err);
        } else {
            if (docs.length != 0) {
                // handle success
                result = {
                    "status": "success"
                };
                res.cookie('premium', 'true', {
                    maxAge: 900000,
                    httpOnly: false
                });
            } else {
                result = {
                    "status": "error",
                    "err": "Invalid VIP Code"
                };
            }
        }
        res.json(result);
    });
};