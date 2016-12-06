var linkstats = require('mongoose').model('LinkStatistic');
var Linkmodell = require('mongoose').model('Link');
var linkservice = require('../../app/services/statistic.server.service');

exports.renderallstatistic = function(req, res) {
    res.render('allstatistic', {
        layout: "layout",
        title: "Statistiküberblick"
    });
};

exports.allStatistic = function(req, res, next) {
    linkservice.allStatistic(req, res, next);
};

exports.initStatistics = function(shortlink) {
    initStatistic(shortlink, false);
};

exports.initQRStatistics = function(shortlink) {
    initStatistic(shortlink, true);
};

exports.updateStatistic = function(shortlink, qr) {
    linkservice.updateStatistic(shortlink, qr);
};

exports.list = function(req, res, next) {
    linkservice.list(req, res, next);
};

exports.showDetail = function(req, res) {
    linkservice.showDetail(req, res);
};

exports.getLongLink = function(req, res, slink) {
    return res.json(req.stats);
};

exports.getLongLinkP = function(req, res, next, slink) {
    linkservice.getLongLinkP(req, res, next, slink);
}

exports.returnWithQR = function(req, res, slink) {
    return res.json(req.stats);
};

exports.returnWithNoQR = function(req, res, slink) {
    return res.json(req.stats);
};

exports.getWithQRStatsByShort = function(req, res, next, slink) {
    linkservice.getWithQRStatsByShort(req, res, next, slink);
};

exports.getNoQRStatsByShort = function(req, res, next, slink) {
  linkservice.getNoQRStatsByShort(req, res, next, slink);
};


exports.returnStats = function(req, res, slink) {
    if (req.stats != null) {
      linkservice.returnStats(req, res, slink);
    } else {
        //error
        res.render('errorshorturl', {
            title: 'Fehler!',
            layout: 'layout'
        });
    }

};

exports.getStatsByShort = function(req, res, next, slink) {
    linkservice.getStatsByShort(req, res, next, slink);
};

function initStatistic(shortlink, qr) {
    var linkstat = new linkstats();
    linkstat.shortlink = shortlink;
    linkstat.count = 0;
    linkstat.qrcode = qr;
    linkstat.save(function(err) {
        if (err) {
            return next(err);
        }
    });
}
