var Link = require('mongoose').model('Link');
var LinkError = {
    shortlink: String,
    longlink: String,
    error: String
};

exports.create = function(req, res, next) {
    //TODO: Formatlong link into right format! Access about req.body.longlink...
    var link = new Link(req.body);
    console.log(link.shortlink);
    //Check if cookie is set
    //Check if url is valide url
    if (validateUrl(link.longlink) == false) {
        if (validateUrl("http://" + link.longlink) == true) {
            link.longlink = "http://" + link.longlink;
        } else {
            //Throw Error
            LinkError.shortlink = link.shortlink;
            LinkError.longlink = link.longlink;
            LinkError.error = 'URL malformatted';
            res.json(LinkError);
        }
    }

    if (link.shortlink == "") {
        link.shortlink = randomText();
    }

    console.log(link);
    Link.find({
        "longlink": link.longlink
    }, function(err, docs) {
        if (err) {
            return next(err);
        } else {
            console.log(docs);
            if (docs.length != 0) {
                link.shortlink = "/" +docs[0].shortlink;
                res.json(link);
            } else {
                link.save(function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        // TODO: temp fix
                        link.shortlink = "/" + link.shortlink;
                        res.json(link);
                    }
                });
            }
        }
    });
    /*delete mongoose.models.Link;
    delete mongoose.modelSchemas.Link;*/
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
    res.redirect(req.link.longlink);
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

function validateUrl(value) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}
