module.exports = function (app) {
    require('../app/routes/about.server.routes.js')(app);
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/admin.server.routes.js')(app);
    require('../app/routes/login.server.routes.js')(app);
    require('../app/routes/statistic.server.routes.js')(app);
    require('../app/routes/link.server.routes.js')(app);
};
