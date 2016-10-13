$(document).ready(function() {
    $(".btn-login").click(function() {
        $(this).html('<i class="fa fa-refresh fa-spin"></i>');
        // send login information to server and validate
        // success: log user in, disable VIP Code input
        // failure: show error message, reset inputs

        // simulate login with 50% success-rate and delay of 1 sec
        $(this).delay(1000).queue(function(n) {
            var rnd = Math.random();
            if (rnd > 0.5) {
                $(".login-form").prop("disabled", false);
                $(this).html('<i class="fa fa-sign-in" aria-hidden="true"></i>');
            } else {
                $(".login-form").prop("disabled", true);
                $(this).html('<i class="fa fa-sign-out" aria-hidden="true"></i>');
            }
            n();
        })
    });

    $(".btn-shorten").click(function() {
        var url = $(".input-url").val();
        console.log(url);
        // validate url
        if (isURL(url)) {
            $.ajax({
                url: "/link",
                method: "POST",
                data: url,
                success: function(res, status) {
                    if (res !== null) {
                        $(".result").html("Your shortened link: " + "<a href='" + res + "'>" + res + "</a>");
                    }
                },
                error: function(obj, status, err) {
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

    $('.input-url').keypress(function(e) {
        if (e.keyCode == 13)
            $('.btn-shorten').click();
    });
    var count = 0;
    setInterval(function() {
        $(".count").html(count++);
    }, 1000);
});

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}
