require('../models/link.server.model');
require('../models/statistics.server.model');
var mongoose = require('mongoose');
var Link = mongoose.model("Link");
var statistic = require('../../app/controllers/statistic.server.controller');

exports.save = function(req, res, next, link, LinkSuccess){
    link.save(function (err) {
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
}

exports.list = function(req, res, next){
  Link.find({}, function (err, links) {
      if (err) {
          return next(err);
      } else {
          res.json(links);
      }
  });
}

exports.linkByShort= function(req, res, next, slink){
  Link.findOne({
          'shortlink': slink
      },
      function (err, link) {
          if (err) {
              console.log(err)  ;
              return next(err);
          } else {
              if (link == null) {
                  res.status(404).render('404', {
                      title: "Sorry, page not found"
                  });
                  res.end();
              } else {
                  req.body = link;
                  next();
              }
          }
      }
  );
}

exports.update = function(req, res, next){
  Link.findByIdAndUpdate(req.link.id, req.body, function (err, link) {
      if (err) {
          return next(err);
      } else {
          res.json(link);
      }
  });
}

exports.findLongLink = function(req, res, next, link, LinkSuccess){
  Link.find({
          "longlink": link.longlink
      },
      function (err, docs) {
          if (docs.length != 0) {
              link.shortlink = docs[0].shortlink;

              LinkSuccess.shortLink = '/' + link.shortlink;
              LinkSuccess.shortURL = GLOBAL_SERVER + '/' + link.shortlink;
              LinkSuccess.shortQR = GLOBAL_SERVER + '/qr/' + link.shortlink;
              LinkSuccess.longLink = url.parse(link.longlink).hostname;
              LinkSuccess.longURL = link.longlink;

              res.json(LinkSuccess);
              res.end();
          } else {
              next();
          }
      }
  );
}

exports.checkShortLink = function(req, res, next, link, LinkError){
  Link.find({
          "shortlink": link.shortlink
      },
      function (err, docs) {
          if (docs.length != 0) {
              //ShortLink does exist, search new one or throw error
              found = true;
              if (GLOBAL_PREMIUM == 'true') {
                  LinkError.shortlink = link.shortlink;
                  LinkError.longlink = link.longlink;
                  LinkError.error = "Shortlink " + link.shortlink + " is already taken";

                  res.json(LinkError);
                  res.end();
              } else {
                  while (found == true) {
                      Link.find({
                              "shortlink": link.shortlink
                          },
                          function (err, docs) {
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
