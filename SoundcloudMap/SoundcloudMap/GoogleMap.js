var MAPS_API_KEY = "AIzaSyDYLEutIswPcfl42HL4rCy2dK0mkCgJTY0";

var map;
var geocoder = "http://api.geonames.org/cities?";
var geocoderSuffix = "&lang=en&username=skyjamin&style=full";
var radius = 1;
var zoom = 18;

var currentLocation;

function initialization()
{
    //Check that browser supports geolocation
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(createMap, geolocationError);
    }
    else
    {
        geolocationError();
    }
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function geocodeByRadius(latLng, radius)
{
    var south = latLng.lat() - radius;
    var north = latLng.lat() + radius;
    var west = latLng.lng() - radius;
    var east = latLng.lng() + radius;

    httpGetAsync(geocoder + "north=" + north + "&south=" + south + "&east=" + east + "&west=" + west + geocoderSuffix, processGeocode);
}

function processGeocode(results)
{
    var parser = new DOMParser();
    var xml = parser.parseFromString(results, "text/xml");
    var count = xml.childNodes[0].childElementCount;
    var cities = [];

    for (i = 0; i < count; i++)
    {
        cities.push(xml.getElementsByTagName('name')[i].innerHTML + " " + xml.getElementsByTagName('adminCode1')[i].innerHTML);
    }
    
    cityData(cities);
}

function createMap(position) {
    var currentPosLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //geocodeByRadius(currentPosLatLng, radius);

    map = new google.maps.Map(document.getElementById('google-map'),
    {
        center: currentPosLatLng,
        zoom: zoom,
        disableDefaultUI: true
    });


}

function geolocationError()
{
    //TODO: Implement
    alert("Could not determine location. Please enter a location below.");
}
