var statistic = require('../../app/controllers/statistic.server.controller');
var bodyParser = require('body-parser');

module.exports = function(app) {    
    app.route('/stat').get(statistic.list);

    app.route('/detail/:slink').get(statistic.showDetail);
    
    app.param('slink', statistic.getStatsByShort);

};