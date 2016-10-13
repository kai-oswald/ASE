$(document).ready(function() {
    $(".btn-login").click(function() {
        $(this).html('<i class="fa fa-refresh fa-spin"></i>');
        // send login information to server and validate
        // success: log user in, disable VIP Code input
        // failure: show error message, reset inputs
        $(this).delay(1000).queue(function(n) {
            var code = $(".login-form").val();
            if (code !== "test") {
                $(".login-form").prop("disabled", false);
                $(this).html('<i class="fa fa-sign-in" aria-hidden="true"></i>');
            } else {
                $(".login-form").prop("disabled", true);
                $(this).html('<i class="fa fa-sign-out" aria-hidden="true"></i>');
            }
            n();
        })
    });

    // VIP CODE: listen for enter key press
    $(".login-form").keypress(function(e) {
      if (e.keyCode == 13)
          $('.btn-login').click();
    });

    // make request to shorten link on button click
    $(".btn-shorten").click(function() {
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
                success: function(res, status) {
                    if (res !== null) {
                        $(".result").html("Your shortened link: " + "<a href='" + res.shortlink + "'>" + res.shortlink + "</a>");
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

    // listen for enter keypress
    $('.input-url').keypress(function(e) {
        if (e.keyCode == 13)
            $('.btn-shorten').click();
    });
    var count = 36187;
    setInterval(function() {
      var rnd = Math.floor(Math.random() * 100);
      count+=rnd;
        $(".count").html(count);
    }, 1000);
});


// validates a URL
function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}
