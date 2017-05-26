function triggerEmailPopup() {
    thisHref = window.location.href;
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);

    showQualifyer = thisHref.indexOf("Master+Group") == -1 && thisHref.indexOf("utm_medium=paidsocial") != -1 && !$.cookie("emailClickUserSummer") // ??????

    if (showQualifyer) {
      document.cookie = "emailClickUserSummer=true; expires=" + now.toUTCString() + "; path=/";
      openSignupField()
    }
}

function openSignupField() {
    var scrollPos = $(window).scrollTop() + 120
    $('.elb_Lightbox').height($(document).height())
    $('.elb_Lightbox').html('<div class="elb_passwordBox" style="margin-top:' + scrollPos + 'px">' + $(".emailBox").html() + '</div>')
    $('.elb_Lightbox').fadeIn()

    $('.elb_Lightbox').on('click', function(e) {
      if (e.target == this) {
        closeemailBox()
      }
    })
}

function closeemailBox() {
    $('.elb_Lightbox').fadeOut()
    $('.elb_Lightbox').html('')
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function sendGAevent(){
 _gaq.push(["_trackEvent","Sale email submit","Click","Sale email submit"])
}

function submitEmail() {
    submitedEmailAddress = $("#signupEmail").val()
    if (isEmail(submitedEmailAddress)) {
        $.ajax({
            type: "GET",
            url: "https://post.toast.co.uk/automated/action.jsp?action=updateRecipientNoMsg&errorPage=/automated/action.jsp&gid=750148124&uemail=apitoast@api.com&psw=Api321$123&pemail=" + submitedEmailAddress + "&self=true&namedattr_NewsletterOptin=TRUE&namedattr_SignupSource=Sale_Overlay",
            dataType: "jsonp",
            error: function(xhr, ajaxOptions, thrownError) {
                $(".emailSender").html("<p>Thanks, we have received your email address.</p>")
                closeemailBox()
                sendGAevent()
            }
        })
    } else {    
   }
}

$(document).ready(function() {
    $('body').prepend('<div class="elb_Lightbox"></div>')
    setTimeout(triggerEmailPopup, 15000);
});
  
var _gaq = _gaq || [];
var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
_gaq.push(['_require', 'inpage_linkid', pluginUrl]);
_gaq.push(['_setAccount', 'UA-1341106-1']);
_gaq.push(['_setDomainName', 'toa.st']);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

  
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '195982334167063');
fbq('track', 'PageView');
                                                         
var _prum = [['id', '58a5aa15f4bab53b1f7b23c6'],
             ['mark', 'firstbyte', (new Date()).getTime()]];
(function() {
    var s = document.getElementsByTagName('script')[0]
      , p = document.createElement('script');
    p.async = 'async';
    p.src = '//rum-static.pingdom.net/prum.min.js';
    s.parentNode.insertBefore(p, s);
})()
        

if (window.location.href.indexOf("shops/bath.htm") > -1) {
    $('.shopAddress').prepend('<p style="font-weight:600">Our Bath shop will be closing at 5pm on Thursday 25th May 2017 for training, we will be reopening on Friday 26th May at 11.30am. We apologise for any inconvenience this may cause.</p>')
}      

if (window.location.href.indexOf("shops/llandeilo.htm") > -1){
  $('.shopAddress').prepend('<p style="font-weight: 600">Our Llandeilo shop will be open 11am - 4pm  on Bank Holiday Sunday and Bank Holiday Monday 11am - 4pm. We apologise for any inconvenience this may cause.</p>')
}

$('.menu__title').on('click', function () {
  var dropDown = $(this).parents('.menu--dropdown');
  dropDown.toggleClass('active', !dropDown.hasClass('active'));
});                                                     


  