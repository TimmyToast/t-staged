var gmarkers = []
var map = null
var markerclusterer = null
var image = '//s3.eu-west-2.amazonaws.com/toast-stores-files/images/JL_Pin_Basic.png'
var markers = [
  ['<b>Cardiff</b><br>The Hayes, Cardiff, CF10 1EG', 51.477831, -3.174090], 
  ['<b>Cribbs Causeway</b><br>The Mall at Cribbs Causeway, Bristol, BS34 5QU', 51.525289, -2.595477], 
  ['<b>Oxford Street</b><br>300 Oxford Street, London, W1A 1EX', 51.515216, -0.145123],
  ['<b>Peter Jones</b><br>Sloane Square, London, SW1W 8EL', 51.492270, -0.158959],
  ['<b>Kingston</b><br>Wood Street, Kingston upon Thames, Surrey, KT1 1TE', 51.411378, -0.306223],
  ['<b>Victoria Centre</b><br>Victoria Centre - Nottingham, NG1 3QA', 52.955954, -1.147591],
  ['<b>Glasgow</b><br>Buchanan Galleries, Buchanan St, Glasgow G1 2GF', 55.862977, -4.252460],
  ['<b>High Wycombe</b><br>Cressex Centre, High Wycombe, HP12 4NW', 51.610873, -0.782570],
  ['<b>Milton Keynes</b><br>the centre:mk, Milton Keynes, MK9 3EP', 52.044848, -0.752437],
  ['<b>Cambridge</b><br>Grand Arcade, Cambridge, CB2 3DS', 52.203785, 0.122585],
  ['<b>Exeter</b><br>1 Sidwell Street, Exeter, EX4 6NN', 50.725939, -3.526827],
]

function showAllStores(){
  myLatlng = {lat: 52.440734, lng: -1.845703};
  map.setCenter(myLatlng)
  map.setZoom(7)
  $(".resetZoomButton").fadeOut()
}

function createMarker(latlng, name, html) {
  var contentString = html;
  var marker = new google.maps.Marker({
    position: latlng,
    icon:  image,
    zIndex: Math.round(latlng.lat()*-100000)<<5
  })

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString)
    infowindow.open(map,marker)
        //window.location.href = "/shops/"+contentString.toLowerCase()+".htm"
      })

  map.addListener('zoom_changed', function() {
    $(".resetZoomButton").fadeIn()
  })

  marker.addListener('mouseover', function() {
    infowindow.setContent(contentString)
    infowindow.open(map,marker)
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

function initialize() {

  if (window.innerWidth < 769) { 
    zoomLevel = 7
    minZoomLevel = 7
  } else {
    zoomLevel = 7
    minZoomLevel =  7
  }

  $(window).resize(function(){
    if(window.innerWidth < 769){
      zoomLevel = 7
    }
  });

  var myOptions = {
    zoom: zoomLevel,
    minZoom: minZoomLevel, 
    maxZoom: 16, 
    center: new google.maps.LatLng(52.440734,-1.845703),
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"color": "#444444"}]},{"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]},{"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "poi.government", "elementType": "all", "stylers": [{"visibility": "off"},{"color": "#ff0000"}]},{"featureType": "poi.park", "elementType": "all", "stylers": [{"visibility": "on"},{"color": "#ececec"}]},{"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100},{"lightness": 45},{"visibility": "on"},{"color": "#dddddd"}]},{"featureType": "road", "elementType": "geometry", "stylers": [{"visibility": "off"}]},{"featureType": "road", "elementType": "geometry.stroke", "stylers": [{"weight": "0.38"}]},{"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "off"}]},{"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "off"},{"color": "#e4e4e4"}]},{"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"weight": "0.27"},{"visibility": "on"},{"color": "#e5e5e5"}]},{"featureType": "road.highway", "elementType": "labels", "stylers": [{"visibility": "off"}]},{"featureType": "road.highway.controlled_access", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "road.highway.controlled_access", "elementType": "labels", "stylers": [{"visibility": "off"},{"color": "#ffffff"}]},{"featureType": "road.arterial", "elementType": "all", "stylers": [{"visibility": "on"}]},{"featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{"visibility": "off"}]},{"featureType": "road.arterial", "elementType": "labels.text", "stylers": [{"visibility": "off"}]},{"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"},{"color": "#ffffff"}]},{"featureType": "road.local", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "road.local", "elementType": "labels", "stylers": [{"visibility": "off"},{"color": "#ff0000"}]},{"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "transit", "elementType": "labels", "stylers": [{"visibility": "off"}]},{"featureType": "transit.line", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "transit.station", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "water", "elementType": "all", "stylers": [{"color": "#ffffff"},{"visibility": "on"}]}]
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions)

  google.maps.event.addListener(map, 'click', function() {
    infowindow.close()
  })

  for (var i = 0; i < markers.length; i++) {
    var sites = markers[i]
    var lat = sites[1]
    var lng = sites[2]
    var point = new google.maps.LatLng(lat,lng)
    var id = sites[0]
    //var country = "Some stuff"
    var html= id
    var marker = createMarker(point,id,html)
  }


  var mcOptions = {
    gridSize:20,
    averageCenter: true,
    styles:[{
      url: "https://s3.eu-west-2.amazonaws.com/toast-stores-files/images/JL_PinCluster.png",
      width: 53,
      height: 53,
      fontFamily:"arial",
      textSize:15,
      textColor:"black"
      //color: #00FF00,
    }]
  }

  markerCluster = new MarkerClusterer(map, gmarkers, mcOptions)  

}

var infowindow = new google.maps.InfoWindow(
{ 
  size: new google.maps.Size(150,50)
})

$( document ).ready(function() {
  $(".resetZoomButton").hide()
  if (window.innerWidth > 767) {
    initialize()
    $(".storesIntro").show()
    $(".mobileIntro").hide()
  } else{
    $('#map_canvas').css('height','0px');
    $.each(markers, function(index, value){
     $('.helpContentArea').css('margin-top','20px');
     $('.helpContentArea').append('<p>' + value[0] + '</p>');
   });

  };
});
