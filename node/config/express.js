var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    partials = require('express-partials');

module.exports = function() {
    var app = express();

    app.use(cookieParser());

    app.use(function(req, res, next) {
        GLOBAL_PREMIUM = req.cookies.premium;
        GLOBAL_ADMIN = req.cookies.admin;
        if (GLOBAL_ADMIN == undefined) {
            GLOBAL_ADMIN = false;
        }
        if (GLOBAL_PREMIUM == undefined) {
            GLOBAL_PREMIUM = false;
        }
        next();
    });

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(partials());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../config/routes')(app);

    app.use(express.static('./public'));
    app.use(express.static('./bower_components'));

    return app;
};
//just a comment to have some changes
