var linkstats = require('mongoose').model('LinkStatistic');
var Linkmodell = require('mongoose').model('Link');
var links = require('../../app/controllers/link.server.controller');


exports.render = function(req, res) {
    res.render('main', {
        title: 'Willkommen'
    })
};

exports.initStatistics = function(shortlink){
    console.log("initnormal");
    initStatistic(shortlink,false);
}

exports.initQRStatistics = function(shortlink){
    console.log("initqr");
    initStatistic(shortlink,true);   
}

exports.updateStatistic = function(shortlink, qr) {
    linkstats.findOne({
            shortlink: shortlink,
            qrcode: qr
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
    //get Longlink...
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

exports.returnWithQR = function(req, res, slink) {
    return res.json(req.stats);
}

exports.returnWithNoQR = function(req, res, slink) {
    return res.json(req.stats);
}

exports.getWithQRStatsByShort = function(req, res, next, slink) {
    linkstats.findOne({
            shortlink: slink,
            qrcode: true
        },
        function(err, stats) {
            if (err) {
                return next(err);
            } else {
                req.stats = stats;
                next();

            }
        }
    );
    
    
};

exports.getNoQRStatsByShort = function(req, res, next, slink) {
    linkstats.findOne({
            shortlink: slink,
            qrcode: false
        },
        function(err, stats) {
            if (err) {
                return next(err);
            } else {
                req.stats = stats;
                next();

            }
        }
    );
    
    
};


exports.returnStats = function(req, res, slink) {
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
   /* res.render('stats', {
                count: req.stats.count,
                shortlink: req.stats.shortlink
                });*/
}

exports.getStatsByShort = function(req, res, next, slink) {
    linkstats.findOne({
            shortlink: slink,
            qrcode: false
        },
        function(err, stats) {
            if (err) {
                return next(err);
            } else {
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

