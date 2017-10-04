function triggerEmailPopup() {
    thisHref = window.location.href;
    var e = new Date,
        t = e.getTime();
    t += 36e5, e.setTime(t), showQualifyer = -1 == thisHref.indexOf("Master+Group") && -1 != thisHref.indexOf("utm_medium=paidsocial") && !$.cookie("emailClickUserSummer"), showQualifyer && (document.cookie = "emailClickUserSummer=true; expires=" + e.toUTCString() + "; path=/", openSignupField())
}

function openSignupField() {
    var e = $(window).scrollTop() + 120;
    $(".elb_Lightbox").height($(document).height()), $(".elb_Lightbox").html('<div class="elb_passwordBox" style="margin-top:' + e + 'px">' + $(".emailBox").html() + "</div>"), $(".elb_Lightbox").fadeIn(), $(".elb_Lightbox").on("click", function(e) {
        e.target == this && closeemailBox()
    })
}

function closeemailBox() {
    $(".elb_Lightbox").fadeOut(), $(".elb_Lightbox").html("")
}

function isEmail(e) {
    var t = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return t.test(e)
}

function sendGAevent() {
    _gaq.push(["_trackEvent", "Sale email submit", "Click", "Sale email submit"])
}

function submitEmail() {
    submitedEmailAddress = $("#signupEmail").val(), isEmail(submitedEmailAddress) && $.ajax({
        type: "GET",
        url: "https://post.toast.co.uk/automated/action.jsp?action=updateRecipientNoMsg&errorPage=/automated/action.jsp&gid=750148124&uemail=apitoast@api.com&psw=Api321$123&pemail=" + submitedEmailAddress + "&self=true&namedattr_NewsletterOptin=TRUE&namedattr_SignupSource=Sale_Overlay",
        dataType: "jsonp",
        error: function() {
            $(".emailSender").html("<p>Thanks, we have received your email address.</p>"), closeemailBox(), sendGAevent()
        }
    })
}


$('.product-sizes li').each(function() {
if ($(this).attr('style')){
    if($(this).attr('style').indexOf('min-width') > -1) {
       $(this).css("min-width","95px")
    }
}
})

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1341106-1']);
_gaq.push(["_setDomainName", "toa.st"]);
_gaq.push(["_setAllowLinker", !0]);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src=('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

$(document).ready(function() {
    $("body").prepend('<div class="elb_Lightbox"></div>'), setTimeout(triggerEmailPopup, 15e3)
});


// Doubeclick

 (function() {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = ("https:" == document.location.protocol ? "https://" : "http://") + "stats.g.doubleclick.net/dc.js";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    }());

//Facebook

    ! function(e, t, a, i, n, o, s) {
        e.fbq || (n = e.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }, e._fbq || (e._fbq = n), n.push = n, n.loaded = !0, n.version = "2.0", n.queue = [], o = t.createElement(a), o.async = !0, o.src = i, s = t.getElementsByTagName(a)[0], s.parentNode.insertBefore(o, s))
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js"), fbq("init", "195982334167063"), fbq("track", "PageView");


// Pingdom

var _prum = [['id', '58a5aa15f4bab53b1f7b23c6'],
             ['mark', 'firstbyte', (new Date()).getTime()]];
(function() {
    var s = document.getElementsByTagName('script')[0]
      , p = document.createElement('script');
    p.async = 'async';
    p.src = '//rum-static.pingdom.net/prum.min.js';
    s.parentNode.insertBefore(p, s);
})();


// interaction binding

 $("#country-selector").click(function() { 
       $("#country-selector .menu--dropdown").toggleClass("active") 
    })
 $("#footer-country-select").click(function() { 
       $("#footer-country-select .menu--dropdown").toggleClass("active") 
    })


$('#ctl00_ctl01_txtSearch').bind('blur', function(){ $("#ctl00_ctl01_btnSearch").css("font-weight", "normal") })
$('#ctl00_ctl01_txtSearch').bind('focus', function(){ $("#ctl00_ctl01_btnSearch").css("font-weight", "bold") })

if ($(".basket-items .qty").html()) {
   $(".basket-items").addClass("sansBold")
   $(".basketBtn").addClass("sansBold")
} else {
    $(".basketBtn").addClass("sansMedium")
}

$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload() 
    }
});
