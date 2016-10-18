var Login = require('mongoose').model('Login');

exports.validate = function (req, res, next) {
    var login = new Login(req.body);
    var result;
    if (login.code === "val1d") {        
        result = {
            "status": "success"
        }
    res.cookie('premium', 'true', { maxAge: 900000, httpOnly: true });              
    } else {
        // errorhandling
        result = {
            "status": "error",
            "err": "Invalid VIP Code"
        }
    }
    res.json(result);   
    
    

    // Link.find({
    //     "longlink": link.longlink
    // }, function (err, docs) {
    //     if (err) {
    //         return next(err);
    //     } else {
    //         console.log(docs);
    //         if (docs.length != 0) {
    //             link.shortlink = "/l/" + docs[0].shortlink;
    //             res.json(link);
    //         } else {
    //             link.save(function (err) {
    //                 if (err) {
    //                     return next(err);
    //                 } else {
    //                     res.json(link);
    //                 }
    //             });
    //         }
    //     }
    // });
}