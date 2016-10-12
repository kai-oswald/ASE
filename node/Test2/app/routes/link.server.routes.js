var links = require('../../app/controllers/link.server.controller');

module.exports = function(app) {
    app.route('/link').post(links.create).get(links.render);
    
    //redirect
    app.route('/l/:slink').get(links.redirect);
    
    app.route('/all').get(links.list);
    
    app.param('slink', links.linkByShort);

};