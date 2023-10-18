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
        function styles(feature) {
            return {
                opacity: .5,
                fillColor: getColor(feature.geometry.coordinates[2]),
                fillOpcaity: .5, 
                radius: radius(feature.properties.mag),
                weight: 1,
                stroke: true
            };
        }

    // function to get radius from magnitude
        function radius(magnitude) {
            if (magnitude === 0) {
                return 1;
            }
            return (magnitude) * 4;
        }

    // function to get color from depth
        function getColor(depth) {
            if (depth < 10) return "#99d600";
            else if (depth < 25) return "#d6af00";
            else if (depth < 50) return "#d66f00";
            else if (depth < 75) return "#d64400";
            else if (depth < 100) return "#d63200";
            else return "#d60000";
        }

    // geoJSON layer

    L.geoJson(data, {
        // circle Marker
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng),

        // Popup for each layer
        function onEachFeature(feature, layer){
            layer.bindPopup(`<h1>Location is ${feature.properties.place}</h1> <h2>Magnitude is ${feature.properties.mag} <br> Depth is ${feature.geometry.coordinates[2]} </h2>`)
        }},

    // style for circleMarkers
        style: styles

    }).addTo(myMap);
     
});