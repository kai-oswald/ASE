var about = require('../controllers/about.server.controller');

module.exports = function (app) {
    app.get('/about', about.render);
};
