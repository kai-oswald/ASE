var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    //Solved warning with next line  -> Also error that some parts of DB are missing
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.db);
    require('../app/models/link.server.model');
    require('../app/models/login.server.model');
    return db;
};