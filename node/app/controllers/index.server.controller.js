exports.render = function (req, res) {  
    res.render("index", {
        layout: "layout",
        title: "Home",
    })  
};