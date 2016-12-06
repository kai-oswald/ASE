exports.render = function (req, res) {
    if (GLOBAL_PREMIUM == 'true') {
        res.render("index_premium", {
            layout: "layout",
            title: "Home"
        });
    } else {
        res.render("index", {
            layout: "layout",
            title: "Home"
        });
    }
};
