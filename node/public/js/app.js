$(document).ready(function () {
    new Clipboard('.btn');
    $(".btn-login").click(function () {
        var $btn = $(this);
        var $form = $(".login-form");
        $btn.html('<i class="fa fa-refresh fa-spin"></i>');
        // send login information to server and validate

        // simulate login with a delay of 1sec
        $btn.delay(1000).queue(function (n) {
            var code = $form.val();
            $.ajax({
                url: "/login",
                data: code,
                success: function () {
                    // success: log user in, disable VIP Code input
                    $form.prop("disabled", true);
                    $btn.html('<i class="fa fa-sign-out" aria-hidden="true"></i>');
                },
                error: function () {
                    // failure: show error message, reset inputs
                    $form.prop("disabled", false);
                    $btn.html('<i class="fa fa-sign-in" aria-hidden="true"></i>');
                }
            });
            n();
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
        console.log(url);
        var json = {
                "shortlink": "",
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
                    if (res !== null) {
                        $(".input-url").val(res.shortlink);
                        $(".input-url").select();

                        // create well for first shortened link
                        if(!$(".result").hasClass("well")) {
                            $(".result").addClass("well");
                        }
                        displayShortenedLink(res.longlink, res.shortlink);
                        
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
    var count = 36187;
    setInterval(function () {
        var rnd = Math.floor(Math.random() * 100);
        count += rnd;
        $(".count").html(count);
    }, 1000);
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

function displayShortenedLink(long, short) {
    $(".result").append("<div class='row'>");
                        $(".result").append(long + ": " + "<a href='" + short + "'>" + short + "</a>");
                        $(".result").append(' <div type="button" class="btn btn-default pull-right" data-clipboard-target=".input-url">Copy</div>');
                        $(".result").append("</div>");
}