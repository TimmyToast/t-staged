$(document).ready(function(){

  function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}
//var menu = '<style>body {margin-top:20px;}</style><div style="text-align:center; border-bottom: 1px solid black; position:fixed; top:0; left:0; width:100%; background:white; z-index:1000;">TEST MENU - REMOVE BEFORE FLIGHT - <a href="?day=1">Day 1</a> | <a href="?day=2">Day 2</a> | <a href="?day=3">Day 3</a> | <a href="?day=4">Day 4</a> | <a href="?day=5">Day 5</a> | <a href="?day=6">Day 6</a> | <a href="?day=7">Day 7</a> | <a href="?day=8">Day 8</a> | <a href="?day=9">Day 9</a> | <a href="?day=10">Day 10</a> | <a href="?day=11">Day 11</a> | <a href="?day=12">Day 12</a> | <a href="?day=13">Day 13</a></div>';
//$('body').prepend(menu);

$(".adventBoxplaceholder").on('click', function() {
  $('html, body').animate({
      scrollTop: ($('#adventProduct').offset().top)
  },500);
});



// Find the current day, open all previous doors and hilight today's
  $.getJSON("https://travels.toa.st/siteForms/adventcomp/day/", function(data){
    var theDay = data['day'];
    var theMonth = data['month'];
    var theDay2 = findGetParameter('day');
    if(theDay2 > 0) {theMonth = 12;}
    if(theDay2) {theDay = theDay2;}
    if(theDay < 1 || theDay > 12 || theMonth != 12) {
      $('#adventFormFrame').remove();
      if(theMonth == 11){
    //  var notReady = '<div class="col-xs-12 adventNotready"><span class="textBook">Launching on 1st December 2018</span></div>';
      $('.adventMainbody').html('Advent begins on December 1st...<br /><br /><br />');
      } else {
      //var notReady = '<div class="col-xs-12 adventFinished"><span class="textBook">This Competition has ended.</span></div>';
      $('.adventMainbody').html('As the twelve days of Christmas have passed,<br />the competition has closed.<br /><br /><br />');
      //$('.adventboxplaceholder').append(notReady);
      $('.adventDoor').css({'background-color':'black','opacity':'0.6'});
      $('.adventDoor span').css('color', 'black');
      }
      } else {
    $.getJSON("/js/json/advent17/day" + theDay + ".js?a=" + Math.floor((Math.random() * 1000) + 1), function(data){
      var link1 = '';
      var link2 = '';
      var currentUrl = window.location.href;
      var thePrice = '<br /><br /><span class="textBold">£' + data['pricegbp'] + '</span>';
      var theTitle = data['title'];
      var theDescription = data['description'];
      var theUrl = data['url'];
      var linkIn = '<a href="' + data['url'] + '" target="_blank">';
      var linkOut = '</a>';
    if(currentUrl.indexOf("/us/") > 0) {
      if(data['priceusd']) {thePrice = '<br /><br />$' + data['priceusd'];}
      if(data['titleus']) {theTitle = data['titleus'];}
      if(data['descriptionus']) {theDescription = data['descriptionus'];}
      if(data['urlus']) {linkIn = ''; linkOut = '';}
    }
    if(currentUrl.indexOf("/eu/") > 0) {
      if(data['priceeur']) {thePrice = '<br /><br />€' + data['priceeur'];}
      if(data['titleeu']) {theTitle = data['titleeu'];}
      if(data['descriptioneu']) {theDescription = data['descriptioneu'];}
      if(data['urleu']) {linkIn = ''; linkOut = '';}
    }
      $("#adventAdventbigimage").append(linkIn + '<img src="' + data['image2'] + '?e=' + Math.floor((Math.random() * 1000) + 1) + '" alt="'+ theTitle  +'" width="100%" />' + linkOut);
      $("#adventAdventbigtext").append('<h1 class="textSemiBold advent22">Day ' + theDay + ' - <br/>' + linkIn + theTitle + linkOut + '</h1><p class="textBook advent15">'
      + theDescription + thePrice + link1 + link2 + '</p>');
    });
  }
    $('.adventDoor').closest('div').filter(function () {
      var thisDay = +$(this).find('span').text();
      if(thisDay == theDay) {
        $(this).css('background-image','url("//media.toa.st/content-images/aw17-advent/1500/TOAST_AdventCompetition_'+ thisDay +'.jpg?1")');
        if(thisDay == 10 || thisDay == 2 || thisDay == 8) {$(this).find('span').css("color","black");}
      } else if (thisDay < theDay && theDay < 13) {
        $(this).css({'background':'url("//media.toa.st/content-images/aw17-advent/1500/TOAST_AdventCompetition_'+ thisDay +'.jpg?1")', 'background-size': 'cover', 'position' : 'relative'});
    $(this).append('<div class="adventDimmer"></div>');
  }
      return thisDay <= theDay;
    }).addClass("adventOpendoor");
    $('.adventDoor').filter(function () {
      var thisDay = +$(this).text();
      return thisDay == theDay;
    }).addClass("adventTodaysdoor");

    // Watch event on iframe to confirm submission
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent,function(e) {
      $("iframe").after('<p id="adventAdventconfirmation" class="textBook advent15"><br /><br />You\'ve just entered the TOAST Advent prize draw.<br />Share with your friends and family on Facebook,<br />Pinterest or Twitter<br/><br/><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A//toa.st/advent/"><img src="//media.toa.st/content-images/aw17-advent/65/social-fb.jpg" /></a><a target="_blank"  href="https://pinterest.com/pin/create/button/?url=https%3A//toa.st/advent&media=https%3A//media.toa.st/content-images/aw17-advent/1500/TOAST_AdventCompetition_' + theDay + 'b.jpg&description="><img src="//media.toa.st/content-images/aw17-advent/65/social-pin.jpg" /></a><a target="_blank" href="https://twitter.com/home?status=TOAST%20Christmas%20Advent%20Giveaway%3A%20https%3A//toa.st/advent"><img src="//media.toa.st/content-images/aw17-advent/65/social-tw.jpg" /></a><br /><br /><a class="adventUnderline" href="/christmas">SHOP CHRISTMAS GIFTS</a></p>');
      $('iframe').remove();
        $('html, body').animate({
            scrollTop: ($('#adventAdventconfirmation').offset().top)
        },500);
    },false);
    });
});