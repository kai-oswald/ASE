var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    partials = require('express-partials');

module.exports = function () {
    var app = express();

    app.use(cookieParser());

    app.use(function (req,res,next) {
        GLOBAL_PREMIUM = req.cookies.premium;
        next();
    });

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(partials());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/about.server.routes.js')(app);
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/statistic.server.routes.js')(app);
    require('../app/routes/admin.server.routes.js')(app);
    require('../app/routes/login.server.routes.js')(app);
    require('../app/routes/link.server.routes.js')(app);

    app.use(express.static('./public'));
    app.use(express.static('./bower_components'));

    return app;
};
