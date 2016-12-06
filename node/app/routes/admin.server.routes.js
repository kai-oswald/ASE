var admin = require('../controllers/admin.server.controller');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.get('/admin', admin.render);

    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.post('/admin', admin.validate);
};
