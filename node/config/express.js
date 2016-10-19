var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

module.exports = function () {
    var app = express();

    app.use(cookieParser());

    app.use(function (req,res,next) {
        // res.cookie('premium', 'false')
        GLOBAL_PREMIUM = req.cookies.premium;
        console.log('express' +GLOBAL_PREMIUM);
        next();
    });

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/link.server.routes.js')(app);

    app.use(express.static('./public'));
    app.use(express.static('./bower_components'));

    return app;
};
