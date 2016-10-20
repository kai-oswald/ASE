var Link = require('mongoose').model('Link');
var url = require('url');
var Linkstats = require('mongoose').model('LinkStatistic');
var statistic = require('../../app/controllers/statistic.server.controller');

exports.create = function(req, res, next) {
    var link = new Link(req.body);
    var LinkSuccess = {
        shortLink: String,
        shortURL: String,
        shortQR: String,
        longLink: String,
        longURL: String
    };
    console.log(link);

    LinkSuccess.shortLink = '/' + link.shortlink;
    LinkSuccess.shortURL = GLOBAL_SERVER + '/' + link.shortlink;
    LinkSuccess.shortQR = GLOBAL_SERVER + '/qr/' + link.shortlink;
    LinkSuccess.longLink = url.parse(link.longlink).hostname;
    LinkSuccess.longURL = link.longlink;
    //Check if cookie is set
    //Check if url is valide url

    link.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(LinkSuccess);
            res.end();
            //init statistic
            statistic.initStatistics(link.shortlink);
            statistic.initQRStatistics(link.shortlink);

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
    if(req.link != null) {
        statistic.updateStatistic(req.link.shortlink, false);
        res.redirect(req.link.longlink);
    }
};

exports.redirectQR = function(req, res) {
    //Longlink has to save in standardformat to make this redirect correct
    if(req.link != null){
        statistic.updateStatistic(req.link.shortlink, true);
        res.redirect(req.link.longlink);
    }
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

exports.validateURL = function(req, res, next) {
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
            LinkError.error = 'URL malformatted';

            res.json(LinkError);
            res.end();
        }
    }
};

function randomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function validateUrl(value) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}

function findLongLink(link) {
    //Check if longlink (e.g. google.de) already exists in Database
    //When found, the shortlink of the database gets returned, otherwise the shortlink stays the same
    Link.find({
            "longlink": link.longlink
        },
        function(err, docs) {
            if (err) {
                return next(err);
            } else {
                if (docs.length != 0) {
                    link.shortlink = GLOBAL_SERVER + "/" + docs[0].shortlink;
                } else {
                    link.shortlink = GLOBAL_SERVER + "/" + link.shortlink;
                }
            }
        }
    );
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

exports.checkShortLink = function(req, res, next) {
    //Check if shortlink (e.g. ErzTS) already exists in Database
    //When found, the shortlink of the database gets returned, otherwise the shortlink stays the same
    var link = new Link(req.body);
    var LinkError = {
        shortlink: String,
        longlink: String,
        error: String
    };
    var found;

    if (GLOBAL_PREMIUM == false || link.shortlink == '') {
        link.shortlink = randomText();
    }

    Link.find({
            "shortlink": link.shortlink
        },
        function(err, docs) {
            if (docs.length != 0) {
                //ShortLink does exist, search new one or throw error
                found = true;
                if (GLOBAL_PREMIUM == true) {
                    LinkError.shortlink = link.shortlink;
                    LinkError.longlink = link.longlink;
                    LinkError.error = "Shortlink " + link.shortlink + " is already taken";

                    res.json(LinkError);
                    res.end();
                } else {
                    console.log("Before while");
                    while (found == true) {
                        Link.find({
                                "shortlink": link.shortlink
                            },
                            function(err, docs) {
                                if (docs.length != 0) {
                                    link.shortlink = randomText();
                                    found = true;
                                } else {
                                    found = false;
                                }

                            });
                    }

                    req.body = link;
                    next();
                }

            } else {

                req.body = link;
                next();
            }
        }
    );
}
