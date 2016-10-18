exports.render = function (req, res) {
    if (!GLOBAL_PREMIUM) {
        res.render('index', {
            title: 'url shortener'
        })
    } else {
        res.render('premium', {
            title: 'url shortener'
        })
    }
};
