var links = require('../../app/controllers/link.server.controller');
var bodyParser = require('body-parser')

module.exports = function(app) {
    app.use( bodyParser.json() );       // to support JSON-encoded bodies

    app.route('/link').post(links.create).get(links.render);
    
    //redirect
    app.route('/l/:slink').get(links.redirect);
    
    app.route('/all').get(links.list);
    
    app.param('slink', links.linkByShort);
    
    app.route('/linktext').get(links.text).post(links.text);

};