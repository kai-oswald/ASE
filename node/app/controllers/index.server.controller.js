exports.render = function (req, res) {
    console.log('global: ' + GLOBAL_PREMIUM);
    if (GLOBAL_PREMIUM == undefined || GLOBAL_PREMIUM == 'false') {
        console.log('index');
        res.render('index', {
            title: 'url shortener'
        })
    } else {
        console.log('premium');
        res.render('premium', {
            title: 'url shortener'
        })
    }
};
