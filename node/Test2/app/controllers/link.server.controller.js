var Link = require('mongoose').model('Link');

exports.render = function(req, res) {
    res.render('main', {
        title: 'Willkommen'
    })
};

exports.create = function(req, res, next) {
    //TODO: Formatlong link into right format! Access about req.body.longlink...
    var link = new Link(req.body);
    link.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(link);
        }
    });
};

exports.list = function(req, res, next) {
    Link.find({}, function(err, links) {
        if (err) {
            return next(err);
        }
        else {
            res.json(links);
        }
    });
};


exports.redirect = function(req, res) {
    //Longlink has to save in standardformat to make this redirect correct
    res.redirect("http://"+req.link.longlink);
    //console.log("test");
};

exports.linkByShort = function(req, res, next, slink) {
    Link.findOne({
            shortlink: slink
        },
        function(err, link) {
            if (err) {
                return next(err);
            }
            else {
                req.link = link;
                next();
            }
        }
    );
};

exports.update = function(req, res, next) {
    Link.findByIdAndUpdate(req.link.id, req.body, function(err, link) {
        if (err) {
            return next(err);
        }
        else {
            res.json(link);
        }
    });
};