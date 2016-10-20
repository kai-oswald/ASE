process.env.NODE_ENV = process.env.NODE_ENV || 'development';
GLOBAL_SERVER = 'http://localhost:8001';
GLOBAL_PREMIUM = 'false';
var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express');

var db = mongoose(),
    app = express();

app.listen(config.port);

module.exports = app;
