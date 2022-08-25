// yearly bubble chart, we'll use a default chart for DC
const yearlyBubbleChart = new dc.BubbleChart("#yearly-bubble-chart");

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




const dataset = d3.csv('/data/sl.csv').then(data => {
  
  // read the CSV for the data and add the points to the map
  data.forEach(item => {
    item.best = +item.best;
    item.deaths_a = +item.deaths_a;
    item.deaths_b = +item.deaths_b;
    item.deaths_civilians = +item.deaths_civilians;
    item.deaths_unknown = +item.deaths_unknown;
    item.latitude = +item.latitude;
    item.longitude = +item.longitude;
    item.year = +item.year;
    item.date_start = new Date(item.date_start);
    item.date_end = new Date(item.date_end);
    item.duration = item.date_end - item.date_start;

    // use the map.latLngToLayerPoint function to get the coordinates for the points
    // const coords = map.latLngToLayerPoint([+data.latitude, +data.longitude]);
    // console.log(data);
    const marker = L.circle([+item.latitude, +item.longitude], {
      color: "#C54B6C",
      fillColor: "#C54B6C",
      opacity: 0.6,
      fillOpacity: 0.3,
      radius: item.best * 3,
      title: `Title: ${item.conflict_name}<br>Date: ${
        item.date_start.toLocaleDateString("af-ZA")}`,
    }).addTo(map);
  
    marker.bindTooltip(
      `Title: ${item.conflict_name}<br>
      Sides: ${item.dyad_name}<br>
      Date: ${new Date(item.date_start).toLocaleDateString("af-ZA")}`
    );
  })
  console.log(data)

  const yearly = d3.rollup(data, v => d3.sum(v, d => d.best), d => d.year);
  console.log(yearly);
  const yearlyFlat = d3.flatRollup(
    data,
    x => ({
      best: d3.sum(x, d => d.best),
      deaths_a: d3.sum(x, d => d.deaths_a),
      deaths_b: d3.sum(x, d => d.deaths_b),
      deaths_civilians: d3.sum(x, d => d.deaths_civilians),
      deaths_unknown: d3.sum(x, d => d.deaths_unknown),
    }),
    d => d.year
  )
  console.log(yearlyFlat);
});
  // const yearly = d3.rollup(data, v => d3.sum(v, d => d.best), d => d.year)

  // console.log(yearly);

  // addHoverListener(marker, tooltip);
// })