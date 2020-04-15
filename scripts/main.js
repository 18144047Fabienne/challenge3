// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFiaWVubmUxODE0NDA0NyIsImEiOiJjazhrNHpodWwwMjFkM2duNTJkNjd4OHV2In0.aQ93jmoLWUrV8aBM0q4cew';


// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.3555598, 52.0066719],
  zoom: 13
});


// Voeg de planner toe
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),
  'top-right'
);

//tutorial
// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

//select elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// app data
const weather = {};

weather.temperature = {
  unit : "celsius"
}

//app const and vars
const KELVIN = 273;
//api key
const key = "bcaece761acb5e0ecb28d3bd56f66b30";

//check if browser supports geolocation
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser support Geolocation niet</p>";
}

//set users position
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// show error when there is an issue with geolocation service
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message} </p>`;
}
// get weather from api provider
function getWeather(latitude, longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  //console.log(api);
  fetch(api)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function(){
      displayWeather();
    });
}

//display weather to interface
function displayWeather(){
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}&compfn;<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
//aantal kilometer
 
var distanceContainer = document.getElementById('distance');
 
// GeoJSON object to hold our measurement features
var geojson = {
'type': 'FeatureCollection',
'features': []
};
 
// Used to draw a line between points
var linestring = {
'type': 'Feature',
'geometry': {
'type': 'LineString',
'coordinates': []
}
};
 
map.on('load', function() {
map.addSource('geojson', {
'type': 'geojson',
'data': geojson
});
 
// Add styles to the map
map.addLayer({
id: 'measure-points',
type: 'circle',
source: 'geojson',
paint: {
'circle-radius': 5,
'circle-color': '#000'
},
filter: ['in', '$type', 'Point']
});
map.addLayer({
id: 'measure-lines',
type: 'line',
source: 'geojson',
layout: {
'line-cap': 'round',
'line-join': 'round'
},
paint: {
'line-color': '#000',
'line-width': 2.5
},
filter: ['in', '$type', 'LineString']
});
 
map.on('click', function(e) {
var features = map.queryRenderedFeatures(e.point, {
layers: ['measure-points']
});
 
// Remove the linestring from the group
// So we can redraw it based on the points collection
if (geojson.features.length > 1) geojson.features.pop();
 
// Clear the Distance container to populate it with a new value
distanceContainer.innerHTML = '';
 
// If a feature was clicked, remove it from the map
if (features.length) {
var id = features[0].properties.id;
geojson.features = geojson.features.filter(function(point) {
return point.properties.id !== id;
});
} else {
var point = {
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [e.lngLat.lng, e.lngLat.lat]
},
'properties': {
'id': String(new Date().getTime())
}
};
 
geojson.features.push(point);
}
 
if (geojson.features.length > 1) {
linestring.geometry.coordinates = geojson.features.map(function(
point
) {
return point.geometry.coordinates;
});
 
geojson.features.push(linestring);
 
// Populate the distanceContainer with total distance
var value = document.createElement('pre');
value.textContent =
'Afstand van A naar B: ' +
turf.length(linestring).toLocaleString() +
'km';
distanceContainer.appendChild(value);
}
 
map.getSource('geojson').setData(geojson);
});
});
 
map.on('mousemove', function(e) {
var features = map.queryRenderedFeatures(e.point, {
layers: ['measure-points']
});
// UI indicator for clicking/hovering a point on the map
map.getCanvas().style.cursor = features.length
? 'pointer'
: 'crosshair';
});
