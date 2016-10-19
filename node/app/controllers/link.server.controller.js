var Link = require('mongoose').model('Link');
var Linkstats = require('mongoose').model('LinkStatistic');
var statistic = require('../../app/controllers/statistic.server.controller');

exports.render = function(req, res) {
    res.render('main', {
        title: 'Willkommen'
    })
};

exports.create = function(req, res, next) {
    //TODO: Formatlong link into right format! Access about req.body.longlink...
    var link = new Link(req.body);
    console.log(link.shortlink);    
    if (link.shortlink == "") {
        link.shortlink = randomText();
    }
    Link.find({
        "longlink": link.longlink
    }, function(err, docs) {
        if (err) {
            return next(err);
        } else {
            console.log(docs);
            if (docs.length != 0) {
                link.shortlink = "/l/" + docs[0].shortlink;
                res.json(link);
            } else 
            {
                link.save(function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        //init statistic
                        statistic.initStatistics(link.shortlink);
                        statistic.initQRStatistics(link.shortlink);
                        // TODO: temp fix
                        link.shortlink = "/l/" + link.shortlink;
                        res.json(link);

                }});
            }
        }
    });
};

exports.list = function(req, res, next) {
    Link.find({}, function(err, links) {
        if (err) {
            return next(err);
        } else {
            res.json(links);
        }
    });
};

exports.text = function(req, res) {
    console.log(req.body);
}

exports.redirect = function(req, res) {
    //Longlink has to save in standardformat to make this redirect correct
    statistic.updateStatistic(req.link.shortlink,false);
    res.redirect("http://" + req.link.longlink);

    //console.log("test");
};

exports.redirectQR = function(req, res) {
    //Longlink has to save in standardformat to make this redirect correct
    statistic.updateStatistic(req.link.shortlink,true);
    res.redirect("http://" + req.link.longlink);
    //console.log("test");
};

exports.linkByShort = function(req, res, next, slink) {
    Link.findOne({
            shortlink: slink
        },
        function(err, link) {
            if (err) {
                return next(err);
            } else {
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
        } else {
            res.json(link);
        }
    });
};

function randomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
