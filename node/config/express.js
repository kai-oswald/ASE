var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser');
    partials = require('express-partials');

module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(partials());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/link.server.routes.js')(app);
    require('../app/routes/admin.server.routes.js')(app);
    require('../app/routes/login.server.routes.js')(app);

    app.use(express.static('./public'));
    app.use(express.static('./bower_components'));

    return app;
};
