var loginservice = require("../../app/services/login.server.service");

exports.validate = function(req, res, next) {
    loginservice.validate(req, res, next);
};

exports.create = function(req, res, next) {
    // TODO: check if code already exists
    loginservice.save(req, res, next);
   
};
