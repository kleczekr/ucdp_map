const gainOrLossChart = new dc.PieChart("#gain-loss-chart");

const map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

const svg = d3.select(map.getPanes().overlayPane).append("svg");
const g = svg.append("g").attr("class", "leaflet-zoom-hide");

// const get_coords = (d) => {map.latLngToLayerPoint([+data.latitude, +data.longitude]);}

d3.csv("data/ucdp.csv", (data) => {
  const coords = map.latLngToLayerPoint([+data.latitude, +data.longitude]);
  // console.log(coords);
  let Circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", coords.x)
    .attr("cy", coords.y)
    .attr("r", 5)
    .style("stroke", "black")
    .style("opacity", 0.6)
    .style("fill", "yellow");
});
