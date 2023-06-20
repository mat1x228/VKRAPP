import * as d3 from 'd3';

export const drawChart = (container) => {
  //for test
  const data = [
    { label: "Threats found", value: 60 },
    { label: "Other messages", value: 40 },
  ];

  d3.select(container).selectAll("*").remove();

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  const radius = Math.min(200, 200) / 2;

  const g = svg.append("g").attr("transform", "translate(" + 200 + "," + 200 + ")");

  const color = d3.scaleOrdinal().range(["aqua", "turquoise"]);

  const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

  const pie = d3.pie().sort(null).value((d) => d.value);

  const arcs = g
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data.label))
    .transition()
    .duration(750)
    .attrTween("d", function (d) {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t) {
        return arc(interpolate(t));
      };
    });

  arcs
    .append("text")
    .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
    .attr("dy", "0.35em")
    .text((d) => d3.format(".0%")(d.value / 100))
    .attr("opacity", 0)
    .transition()
    .delay(500)
    .duration(500)
    .attr("opacity", 1);

  const infoGroup = svg.append("g").attr("transform", "translate(" + 400 + "," + 200 + ")");

  infoGroup
    .append("text")
    .attr("class", "info-text")
    .attr("x", -80)
    .attr("y", -20)
    .text("Threats found: " + data[0].value + "\nOther messages: " + data[1].value)
    .style("font-size", "14px")
    .style("fill", "#666666");

  infoGroup
    .append("text")
    .attr("class", "info-text")
    .attr("x", 10)
    .attr("y", 0)
    .text("Rating: 0.05")
    .style("font-size", "14px")
    .style("fill", "#666666");
};
export default  drawChart;