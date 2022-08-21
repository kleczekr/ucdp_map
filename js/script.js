// initialize a map in the 'map' div, set the view to a given place and zoom
const map = L.map("map").setView([0, 0], 2);

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
d3.csv("data/ucdp.csv", (data) => {
  // use the map.latLngToLayerPoint function to get the coordinates for the points
  // const coords = map.latLngToLayerPoint([+data.latitude, +data.longitude]);
  const marker = L.circle([+data.latitude, +data.longitude], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 5,
  }).addTo(map);
  // console.log(coords);
  // let Circles = svg
  //   .selectAll("circle")
  //   .data(data)
  //   .enter()
  //   .append("circle")
  //   .attr("cx", coords.x)
  //   .attr("cy", coords.y)
  //   .attr("r", 5)
  //   .style("stroke", "black")
  //   .style("opacity", 0.6)
  //   .style("fill", "yellow");
});
