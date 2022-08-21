// initialize a map in the 'map' div, set the view to a given place and zoom
const map = L.map("map").setView([7.87, 80.77], 7);

// initialize the title layer and settings for the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// create a SVG layer for the map
const svg = d3.select(map.getPanes().overlayPane).append("svg");
const g = svg.append("g").attr("class", "leaflet-zoom-hide");

// const get_coords = (d) => {map.latLngToLayerPoint([+data.latitude, +data.longitude]);}

// read the CSV for the data and add the points to the map
d3.csv("data/sl.csv", (data) => {
  // use the map.latLngToLayerPoint function to get the coordinates for the points
  // const coords = map.latLngToLayerPoint([+data.latitude, +data.longitude]);
  const marker = L.circle([+data.latitude, +data.longitude], {
    color: "#C54B6C",
    fillColor: "#C54B6C",
    opacity: 0.3,
    fillOpacity: 0.3,
    radius: 15,
  }).addTo(map);
});
