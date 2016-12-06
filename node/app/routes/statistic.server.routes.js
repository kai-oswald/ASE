var statistic = require('../../app/controllers/statistic.server.controller');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.route('/stat').get(statistic.list);

    app.route('/details').get(statistic.allStatistic);

    app.route('/detail').get(statistic.renderallstatistic);

    app.route('/detail/:slink4').get(statistic.returnStats);//.post(statistic.returnStats);

    app.param('slink4', statistic.getStatsByShort);

    //app.param('/returnstats').post(statistic.returnStats);

    app.route('/stats/withqr/:slink1').get(statistic.returnWithQR);

    app.param('slink1', statistic.getWithQRStatsByShort);

    app.route('/stats/noqr/:slink2').get(statistic.returnWithNoQR);

    app.param('slink2', statistic.getNoQRStatsByShort);
};