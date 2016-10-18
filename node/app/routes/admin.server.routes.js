module.exports = function(app) {
    var admin = require('../controllers/admin.server.controller');
    app.get('/admin', admin.render);    
};