// Creating map
let myMap = L.map("map", {
    center: [32.779, -96.808],
    zoom: 10
});

// Add tile layer to the map 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get GeoJSON data
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Get our GeoJSON data
d3.json(link).then(function(data){
    // function to style
        function style(feature) {
            return {
                opacity: .5,
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpcaity: .5, 
                radius: radius(feature.properties.mag),
                weight: 1
            };
        }
    // function to get radius from magnitude
        function radius(mag)
     
})