exports.render = function (req, res) {
    if (GLOBAL_PREMIUM == undefined || GLOBAL_PREMIUM == 'false') {
        res.render('index', {
            title: 'url shortener'
        })
    } else {
        res.render('premium', {
            title: 'url shortener'
        })
    }
};
