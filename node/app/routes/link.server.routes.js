var links = require('../../app/controllers/link.server.controller');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json()); // to support JSON-encoded bodies

    app.route('/link').post(links.validateURL, links.findLongLink, links.checkShortLink, links.checkLongLink, links.create);

    app.route('/qr/:slink').get(links.redirectQR);

    app.route('/all').get(links.list);

    //redirect
    app.route('/:slink').get(links.redirect);

    //redirect
    app.route('/:slink').get(links.redirect);

    app.param('slink', links.linkByShort);
};
