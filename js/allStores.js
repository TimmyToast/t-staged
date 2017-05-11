
var image = '//s3.eu-west-2.amazonaws.com/toast-stores-files/images/TOAST_Pin_Basic_2.png'


function showAllStores(){
  myLatlng = {lat: 52.627853, lng: -1.845703};
  map.setCenter(myLatlng)
  map.setZoom(7)
    $(".resetZoomButton").hide()
}


function createMarker(latlng, name, html, URL) {
    var contentString = html;
    var marker = new google.maps.Marker({
        position: latlng,
        icon:  image,
        zIndex: Math.round(latlng.lat()*-100000)<<5
    })

    google.maps.event.addListener(marker, 'click', function() {
        //infowindow.setContent(contentString)
        //infowindow.open(map,marker)
        window.location.href = "/shops/"+URL.toLowerCase()+".htm"
    })

    map.addListener('zoom_changed', function() {
      $(".resetZoomButton").fadeIn()
    })

     marker.addListener('mouseover', function() {
      infowindow.setContent("<strong>"+contentString + "</strong><br>Click for more information")
      infowindow.open(map, this)
    })

    marker.addListener('mouseout', function() {
      infowindow.close()
    })

    gmarkers.push(marker)
}

function myclick(i) {
  google.maps.event.trigger(gmarkers[i], "click")
}


$('.showMap').click(function(){
    $('.mapHolder').html("")
    $('.mapHolder').html('<div id="map_canvas"></div>');
    initialize();
  $('.closeMap').removeClass('hiddenBtn');
  $(this).addClass('hiddenBtn');
});

$('.closeMap').click(function(){
    $('.mapHolder').html("")
      $('.showMap').removeClass('hiddenBtn');
  $(this).addClass('hiddenBtn');
});

function initialize() {

  gmarkers = []
  map = null
  markerclusterer = null

  if (window.innerWidth < 769) {
    zoomLevel = 6
    minZoomLevel = 6
  } else {
    zoomLevel = 7
    minZoomLevel =  7
  }


  var myOptions = {
    zoom: zoomLevel,
    minZoom: minZoomLevel, 
    maxZoom: 16, 
    center: new google.maps.LatLng(52.373713, -1.917114),
    mapTypeControl: false,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"color": "#444444"}]},{"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]},{"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "poi.government", "elementType": "all", "stylers": [{"visibility": "off"},{"color": "#ff0000"}]},{"featureType": "poi.park", "elementType": "all", "stylers": [{"visibility": "on"},{"color": "#ececec"}]},{"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100},{"lightness": 45},{"visibility": "on"},{"color": "#dddddd"}]},{"featureType": "road", "elementType": "geometry", "stylers": [{"visibility": "off"}]},{"featureType": "road", "elementType": "geometry.stroke", "stylers": [{"weight": "0.38"}]},{"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "off"}]},{"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "off"},{"color": "#e4e4e4"}]},{"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"weight": "0.27"},{"visibility": "on"},{"color": "#e5e5e5"}]},{"featureType": "road.highway", "elementType": "labels", "stylers": [{"visibility": "off"}]},{"featureType": "road.highway.controlled_access", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "road.highway.controlled_access", "elementType": "labels", "stylers": [{"visibility": "off"},{"color": "#ffffff"}]},{"featureType": "road.arterial", "elementType": "all", "stylers": [{"visibility": "on"}]},{"featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{"visibility": "off"}]},{"featureType": "road.arterial", "elementType": "labels.text", "stylers": [{"visibility": "off"}]},{"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"},{"color": "#ffffff"}]},{"featureType": "road.local", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "road.local", "elementType": "labels", "stylers": [{"visibility": "off"},{"color": "#ff0000"}]},{"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "transit", "elementType": "labels", "stylers": [{"visibility": "off"}]},{"featureType": "transit.line", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "transit.station", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "water", "elementType": "all", "stylers": [{"color": "#ffffff"},{"visibility": "on"}]}]
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions)

  google.maps.event.addListener(map, 'click', function() {
    infowindow.close()
  })

  var markers = [
    ['Bath', 51.385655, -2.361707, 'bath'], //Bath
    ['Brighton', 50.822316, -0.142128, 'brighton'], //Brighton
    ["London, Chelsea", 51.487054, -0.169798, 'chelsea'], //Chelsea
    ["Harrogate", 53.992978, -1.544687, 'harrogate'], //Harrogate
    ["Cambridge", 52.206934, 0.117964, 'cambridge'],
    ["Cheltenham", 51.898939, -2.077045, 'cheltenham'], //Cheltenham
    ["London, Islington", 51.539154, -0.102360, 'islington'], //Islington
    ["Shepton Mallet, Kilver Court", 51.190792, -2.536376, 'kilver'], //Kilver
    ["Llandeilo", 51.882577, -3.994105, 'llandeilo'], //Llandeilo
    ["London, Marylebone", 51.521358, -0.151707, 'Marylebone'], //Marylebone
    ["London, Notting Hill", 51.514515, -0.198427, 'nottinghill'], //Westbourne Grove
    ["Oxford", 51.752331, -1.254184, 'oxford'] //Oxford
  ]



  for (var i = 0; i < markers.length; i++) {
    var sites = markers[i]
    var lat = sites[1]
    var lng = sites[2]
    var URL = sites[3]
    var point = new google.maps.LatLng(lat,lng)
    var id = sites[0]
    //var country = "Some stuff"
    var html= id
    var marker = createMarker(point,id,html,URL)
  }


  var mcOptions = {
          gridSize:20,
          averageCenter: true,
          styles:[{
          
          url: "//s3.eu-west-2.amazonaws.com/toast-stores-files/images/TOAST_PinCluster-T-2.png",
                width: 53,
                height: 53,
                fontFamily:"arial",
                textSize:15,
                textColor:"black"
                //color: #00FF00,
          }]
    
        };


  markerCluster = new MarkerClusterer(map, gmarkers, mcOptions)  
}
 
var infowindow = new google.maps.InfoWindow(
  { 
    size: new google.maps.Size(150,50)
})

$( document ).ready(function() {
    $(".resetZoomButton").hide()
    if (window.innerWidth > 767) {
        $(".storesIntro").show()
        $(".mobileIntro").hide()
    } else{
        $(".mobileIntro").html("<div class='col-md-12'>"+$(".storesIntro").html()+"<p>Please select a store below:</p></div>")
    }
})