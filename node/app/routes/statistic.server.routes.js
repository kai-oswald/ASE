var statistic = require('../../app/controllers/statistic.server.controller');
var bodyParser = require('body-parser');

module.exports = function(app) {    
    app.route('/stat').get(statistic.list);

    app.route('/detail/:slink').get(statistic.showDetail).post(statistic.returnStats);;
    
    app.param('slink', statistic.getStatsByShort);
    
    //app.param('/returnstats').post(statistic.returnStats);

};