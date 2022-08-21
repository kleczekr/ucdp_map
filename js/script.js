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

// tooltip for the circles
const tooltip = d3.select("#map-tooltip");

// a function to add hover listener with a tooltip over circles
const addHoverListener = (circle, tooltip) => {
  circle
    .on("mouseover", function (d) {
      console.log(d);
      console.log(d.target.options.title);
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip
        .html(d.target.options.title)
        .style("left", d.originalEvent.pageX + "px")
        .style("top", d.originalEvent.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      tooltip.transition().duration(500).style("opacity", 0);
    })
    .on("mousemove", function (d) {
      tooltip
        .style("left", d.originalEvent.pageX + "px")
        .style("top", d.originalEvent.pageY - 28 + "px");
    })
    .on("click", function (d) {
      console.log(d.target.options.title);
    })
    .on("dblclick", function (d) {
      console.log(d.target.options.title);
    });
};

// read the CSV for the data and add the points to the map
d3.csv("data/sl.csv", (data) => {
  // use the map.latLngToLayerPoint function to get the coordinates for the points
  // const coords = map.latLngToLayerPoint([+data.latitude, +data.longitude]);
  console.log(data);
  const marker = L.circle([+data.latitude, +data.longitude], {
    color: "#C54B6C",
    fillColor: "#C54B6C",
    opacity: 0.6,
    fillOpacity: 0.3,
    radius: 15,
    title: `Title: ${data.conflict_name}<br>Date: ${new Date(
      data.date_start
    ).toLocaleDateString("af-ZA")}`,
  }).addTo(map);

  addHoverListener(marker, tooltip);
});
