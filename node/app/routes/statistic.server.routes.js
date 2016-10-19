var statistic = require('../../app/controllers/statistic.server.controller');
var bodyParser = require('body-parser');

module.exports = function(app) {    
    app.route('/stat').get(statistic.list);

    app.route('/detail/:slink').get(statistic.returnStats);//.post(statistic.returnStats);
    
    app.param('slink', statistic.getStatsByShort);
    
    //app.param('/returnstats').post(statistic.returnStats);
    
    app.route('/stats/withqr/:slink1').get(statistic.returnWithQR);
    
    app.param('slink1', statistic.getWithQRStatsByShort);
    
    app.route('/stats/noqr/:slink2').get(statistic.returnWithNoQR);

    app.param('slink2', statistic.getNoQRStatsByShort);
};