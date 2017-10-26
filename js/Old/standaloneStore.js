image = '//s3.eu-west-2.amazonaws.com/toast-stores-files/images/TOAST_Pin_Basic_2.png'

$('.showMap').click(function(e){
    e.preventDefault;
    $('.mapHolder').html("")
    $('.mapHolder').html('<div id="map_canvas"></div>')
    initialize();
  $('.closeMap').removeClass('hiddenBtn')
  $(this).addClass('hiddenBtn')
})

$('.closeMap').click(function(){
  $('.mapHolder').html("")
  $('.showMap').removeClass('hiddenBtn')
  $(this).addClass('hiddenBtn')
});
      var mobileNavCtrl = function(){
    $('.shopMenuOpener').parent().removeClass('parent');
    $('.shopMenuOpener+ul').hide();
    $('.shopMenuOpener ul li').each(function(){
    $(this).removeClass('sansMedium').addClass('textBook');
    })}
function initialize() {

  gmarkers = []
  map = null
  markerclusterer = null

  if (window.innerWidth < 769) {
    zoomLevel = 18
    minZoomLevel = 3
  } else {
    zoomLevel = 18
    minZoomLevel =  3
  }

  var myOptions = {
    zoom: zoomLevel,
    minZoom: minZoomLevel, 
    maxZoom: 18, 
    center: new google.maps.LatLng(markers[1], markers[2]),
    mapTypeControl: false,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }]  }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions)

    var storeLatLng = {lat: markers[1], lng: markers[2]};
    var marker = new google.maps.Marker({
      position: storeLatLng,
      icon:  image,
      map: map,
      title: markers[0]
    });
  }



  $( document ).ready(function() {
    $(".resetZoomButton").hide()
    if (window.innerWidth > 767) {
      $(".storesIntro").show()
      $(".mobileIntro").hide()
    } else{
      $(".mobileIntro").html("<div class='col-md-12'>"+$(".storesIntro").html()+"<p>Please select a store below:</p></div>")
    }
      $('.shopMenuOpener').click(function(){
  $('.shopSection .shopMenuOpener').toggleClass('activated');
$('.shopSection .subnav').toggle();
});
  
if(window.innerWidth < 768){
    mobileNavCtrl()
}else if(window.innerWidth >= 768){
        $('.shopMenuOpener+ul').show();
    }
     $(window).resize(function(){
         if(window.innerWidth < 768){
       mobileNavCtrl()
    }else if(window.innerWidth >= 768){
        $('.shopMenuOpener+ul').show();
    }});
  })

