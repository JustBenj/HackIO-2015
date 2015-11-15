var MAPS_API_KEY = "AIzaSyDYLEutIswPcfl42HL4rCy2dK0mkCgJTY0";

var map;
var browserSupportGeolocation = new Boolean(false);
var currentLocation;

function initialization()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition()
    }


        map = new google.maps.Map(document.getElementById('google-map'),
      {
          center: { lat: 0, lng: 0 },
          zoom: 8,
          disableDefaultUI: true
      });

}

function geolocationError()
{

}
