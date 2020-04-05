// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFiaWVubmUxODE0NDA0NyIsImEiOiJjazhrNHpodWwwMjFkM2duNTJkNjd4OHV2In0.aQ93jmoLWUrV8aBM0q4cew';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.322840, 52.067101],
  zoom: 11.15
});

// Voeg de zoekbalk toe
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

