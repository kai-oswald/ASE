var login = require('../../app/controllers/login.server.controller');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());       // to support JSON-encoded bodies

    app.route('/login').post(login.validate);
    app.route('/code').post(login.create);
};
