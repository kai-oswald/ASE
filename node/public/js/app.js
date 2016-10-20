$(document).ready(function () {
    new Clipboard('.btn');
    $(".btn-login").click(function () {
        var $btn = $(this);
        var $form = $(".login-form");
        $btn.html('<i class="fa fa-refresh fa-spin"></i>');

        // send login information to server and validate
        var code = {
            "code": $form.val()
        };
        $.ajax({
            url: "/login",
            method: "POST",
            data: code,
            success: function (res) {
                // success: log user in, disable VIP Code input
                if (res.err) {
                    notie.alert("error", res.err, 2);
                    $btn.html('<i class="fa fa-sign-in" aria-hidden="true"></i>');
                } else {
                    notie.alert("success", "You can now use Premium features", 2);
                    // refresh page
                    setTimeout(location.reload.bind(location), 1000);
                }
            },
            error: function (req, status, err) {
                // unknown error: show error message, reset inputs
                notie.alert("error", req.responseText, 2);
                $btn.html('<i class="fa fa-sign-in" aria-hidden="true"></i>');
            }
        });

    });

    // VIP CODE: listen for enter key press
    $(".login-form").keypress(function (e) {
        if (e.keyCode == 13)
            $('.btn-login').click();
    });

    // make request to shorten link on button click
    $(".btn-shorten").click(function () {
        var url = $(".input-url").val();
        var customLink = $(".input-custom-link").val();
        if(customLink == undefined)
            customLink = "";
        console.log(url);
        console.log(customLink);
        var json = {
                "shortlink": customLink,
                "longlink": url
            }
            // validate url
        if (isURL(url)) {
            $.ajax({
                url: "/link",
                method: "POST",
                data: json,
                dataType: "json",
                success: function (res, status) {
                    console.log(res);
                    if (!res.error) {
                        $(".input-url").val(res.shortLink);
                        $(".input-url").select();

                        // create well for first shortened link
                        if (!$(".result").hasClass("well")) {
                            $(".result").addClass("well");
                        }
                        displayShortenedLink(res.longLink, res.shortLink, res.shortURL);
                    } else {
                        notie.alert("error", res.error, 2);
                    }
                },
                error: function (obj, status, err) {
                    if (err === "") {
                        err = "An error occured while processing your request.";
                    }
                    notie.alert('error', err, 2);
                }
            });
        } else {
            notie.alert('error', 'Unable to shorten that link. It is not a valid url.', 2);
        }

    });

    // listen for enter keypress
    $('.input-url').keypress(function (e) {
        if (e.keyCode == 13)
            $('.btn-shorten').click();
    });

    $('.input-custom-link').keypress(function (e) {
        if (e.keyCode == 13)
            $('.btn-shorten').click();
    });
    var count = 36187;
    setInterval(function () {
        var rnd = Math.floor(Math.random() * 100);
        count += rnd;
        $(".count").html(count);
    }, 1000);

    // Admin functionality
    $(".btn-generate").click(function () {
        // TODO: generate random Premium Code
        $(".input-code").val(token());
    });

    $('#input-password').keypress(function (e) {
        if (e.keyCode == 13)
            $('.btn-signin').click();
    });

    $('.input-code').keypress(function (e) {
        if (e.keyCode == 13)
            $('.btn-code').click();
    });    

    // Admin Page SignIn
    $(".btn-signin").click(function () {
        var passwd = {
            password: $("#input-password").val()
        };
        $.ajax({
            url: "/admin",
            data: passwd,
            method: "POST",
            success: function (data) {
                if (!data.err) {
                    location.reload();
                } else {
                    notie.alert("error", data.err, 2)
                }
            }
        });
    });

    // Submit new Premium Code
    $(".btn-code").click(function () {
        var code = {
            "code": $(".input-code").val()
        };
        $.ajax({
            url: "/code",
            data: code,
            method: "POST",
            success: function (data) {
                if (!data.err) {
                    notie.alert("success", "Succesfully created Premium Code '" + data.code + "'", 2);
                } else {
                    notie.alert("error", data.err, 2)
                }
            }
        });
    });
});


// validates a URL
function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

function displayShortenedLink(long, short, shortUrl) {   
    $(".result").append("<div class='row'>");
        $(".result").append("<div>" + long + ": " + "<a href='" + short + "'>" + short + "</a></div>");
        $(".result").append('<div> QR Code: <img src=' +
            '"https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=f5f5f5&data=' + short +'"></div>');
        $(".result").append(' <div type="button" class="btn btn-default pull-right" data-clipboard-text="' + shortUrl + '">Copy</div>');
        $(".result").append('<a class="btn btn-default" href="/detail'+short+'" role="button">Statistiken zum Link</a>');
    $(".result").append("</div>");
}

var rand = function() {
    return Math.random().toString(36).substr(20); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};
