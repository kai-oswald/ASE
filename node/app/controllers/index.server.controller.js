exports.render = function (req, res) {
    if (GLOBAL_PREMIUM == undefined || GLOBAL_PREMIUM == 'false') {
        res.render('index', {
            title: 'url shortener',
            layout: 'layout'
        })
    } else {
        res.render('premium', {
            title: 'url shortener',
            layout: false
        })
    }
};
