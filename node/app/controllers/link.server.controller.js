var mongoose = require('mongoose');
require('../models/link.server.model');
require('../models/statistics.server.model');
var Link = mongoose.model("Link");
var url = require('url');
var statistic = require('../../app/controllers/statistic.server.controller');
var linkservice = require('../services/link.server.service');

var createLinkModel = function (link) {
    var LinkSuccess = {
        shortLink: String,
        shortURL: String,
        shortQR: String,
        longLink: String,
        longURL: String
    };
    LinkSuccess.shortLink = '/' + link.shortlink;
    LinkSuccess.shortURL = GLOBAL_SERVER + '/' + link.shortlink;
    LinkSuccess.shortQR = GLOBAL_SERVER + '/qr/' + link.shortlink;
    LinkSuccess.longLink = url.parse(link.longlink).hostname;
    LinkSuccess.longURL = link.longlink;
    return LinkSuccess;
};

// fixes "createLinkModel is not defined" error
exports.createLinkModel = createLinkModel;

exports.create = function (req, res, next) {
    var link = new Link(req.body);
    var LinkSuccess = createLinkModel(link);
    linkservice.save(req, res, next, link, LinkSuccess);
};

exports.list = function (req, res, next) {
    linkservice.list(req, res, next);
};


exports.redirect = function (req, res) {
    //Longlink has to save in standardformat to make this redirect correct
    var link = new Link(req.body);
    if (link != undefined) {
        statistic.updateStatistic(link.shortlink, false);
        res.redirect(link.longlink);
    }

};

exports.redirectQR = function (req, res) {
    //Longlink has to save in standardformat to make this redirect correct
    var link = new Link(req.body);

    statistic.updateStatistic(link.shortlink, true);
    res.redirect(link.longlink);
};

exports.linkByShort = function (req, res, next, slink) {
    linkservice.linkByShort(req, res, next, slink);
};

exports.update = function (req, res, next) {
      linkservice.update(req, res, next);
};

exports.validateURL = function (req, res, next) {
    var link = new Link(req.body);
    var LinkError = {
        shortlink: String,
        longlink: String,
        error: String
    };

    if (validateUrl(link.longlink) == false) {
        if (validateUrl("http://" + link.longlink) == true) {
            link.longlink = "http://" + link.longlink;
            req.body.longlink = link.longlink;

            next();
        } else {
            //Throw Error
            LinkError.shortlink = link.shortlink;
            LinkError.longlink = link.longlink;
            LinkError.error = 'Unable to shorten that link. It is not a valid url.';

            res.json(LinkError);
            res.end();
        }
    } else {
        next();
    }
};

exports.findLongLink = function (req, res, next) {
    //Check if longlink (e.g. google.de) already exists in Database
    //When found, the shortlink of the database gets returned, otherwise the shortlink stays the same
    var link = new Link(req.body);
    var LinkSuccess = {
        shortLink: String,
        shortURL: String,
        shortQR: String,
        longLink: String,
        longURL: String
    };
    if (GLOBAL_PREMIUM == false || link.shortlink == '') {
        linkservice.findLongLink(req, res, next, link, LinkSuccess);
    } else {
        next();
    }
};

exports.checkLongLink = function (req, res, next) {
    //Check if longlink (e.g. google.de) already exists in Database
    //When found, the shortlink of the database gets returned, otherwise the shortlink stays the same
    var routes = ['link', 'admin', 'stats', 'all', 'qr', 'linktext', 'login', 'code', 'stat', 'detail'];
    var link = new Link(req.body);
    var LinkError = {
        shortlink: String,
        longlink: String,
        error: String
    };
    var found = 'false';

    if (routes.indexOf(link.shortlink) > -1) {
        found = 'true';
    }

    if (GLOBAL_PREMIUM == 'true') {
        if (found == 'true') {
            LinkError.shortlink = link.shortlink;
            LinkError.longlink = link.longlink;
            LinkError.error = "Shortlink " + link.shortlink + " is an application url";

            res.json(LinkError);
            res.end();
        } else {
            req.body = link;
            next();
        }
    } else {
        req.body = link;
        next();
    }
};

exports.checkShortLink = function (req, res, next) {
    //Check if shortlink (e.g. ErzTS) already exists in Database
    //When found, the shortlink of the database gets returned, otherwise the shortlink stays the same
    var link = new Link(req.body);
    var LinkError = {
        shortlink: String,
        longlink: String,
        error: String
    };
    var found;

    if (GLOBAL_PREMIUM == 'false' || link.shortlink == '') {
        link.shortlink = randomText();
    }

   linkservice.checkShortLink(req, res, next, link, LinkError);
};

var randomText = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

var validateUrl = function(value) {
    var regex = new RegExp("^(http[s]?:\\/\\/){1}(www\\.)?([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    return regex.test(value);
}
exports.randomText = randomText;
exports.validateUrl = validateUrl;
