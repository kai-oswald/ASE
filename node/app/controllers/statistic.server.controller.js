var linkstats = require('mongoose').model('LinkStatistic');
var Linkmodell = require('mongoose').model('Link');
var links = require('../../app/controllers/link.server.controller');


exports.render = function(req, res) {
    res.render('main', {
        title: 'Willkommen'
    })
};

exports.initStatistics = function(shortlink){
    console.log("test");
    initStatistic(shortlink,false);
}

exports.initQRStatistics = function(req,res,shortlink){
    initStatistic(shortlink,true);   
}

exports.updateStatistic = function(shortlink) {
    linkstats.findOne({
            shortlink: shortlink
        },
        function(err, stats) {
            if (err) {
                return next(err);
            } else {
                if(stats==null){
                    initStatistic(shortlink,false);
                }else{
                    var tmpcount = stats.count + 1;
                    linkstats.findByIdAndUpdate(stats.id,{$set: {count:tmpcount}}, function (err, stats) {
                        if (err){ 
                            console.log("error while updating");
                        }else{
                        }
                    });
                }
            }});     
        };

exports.list = function(req, res, next) {
    linkstats.find({}, function(err, stats) {
        if (err) {
            return next(err);
        } else {//
            res.json(stats);
        }
    });
};

exports.showDetail= function(req, res){
    console.log(req.stats.count);
    //get Longlink...
    console.log(req.stats.id);
    Linkmodell.findOne({shortlink : req.stats.shortlink},function(err, dbstats) {
            if (err) {
                return next(err);
            } else { 
               res.render('stats', {
                count: req.stats.count,
                shortlink: req.stats.shortlink,
                longlink: dbstats.longlink
                });
            }
        });
    
    
}

exports.getStatsByShort = function(req, res, next, slink) {
    linkstats.findOne({
            shortlink: slink
        },
        function(err, stats) {
            if (err) {
                return next(err);
            } else {
                console.log("sucess"+stats);
                req.stats = stats;
                next();
            }
        }
    );
};


function initStatistic(shortlink, qr){
    var linkstat = new linkstats();
    console.log("test"+shortlink);
    linkstat.shortlink=shortlink;
    linkstat.count=0;
    linkstat.qrcode=qr;
    linkstat.save(function(err) {
    if (err) {
        return next(err);
            } else { 
                console.log("sucess");
                            }
    });    
}

