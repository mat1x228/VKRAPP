import * as d3 from 'd3';

export const drawMessageClassesChart = (container) => {
  //tests
  const data = [
    { label: "Thr.", value: 20 },
    { label: "Ins.", value: 30 },
    { label: "Obs.", value: 10 },
    { label: "Neut.", value: 40 },
  ];
  const svg = d3.select(container).append("svg");

  const height = 250;
  const width = container.clientWidth;

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, chartWidth])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([chartHeight, 0]);

  const color = d3.scaleOrdinal().range(["aqua", "aqua", "aqua", "aqua"]);

  const svgChart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  svgChart
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.label))
    .attr("y", (d) => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => chartHeight - yScale(d.value))
    .attr("fill", (d, i) => color(i));

  svgChart
    .selectAll("text.value")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "value")
    .attr("x", (d) => xScale(d.label) + xScale.bandwidth() / 2)
    .attr("y", (d) => yScale(d.value) - 5)
    .text((d) => d.value)
    .style("fill", "#ffffff")
    .style("text-anchor", "middle")
    .transition()
    .duration(1000)
    .tween("text", function (d) {
      var i = d3.interpolate(0, d.value);
      return function (t) {
        d3.select(this).text(Math.round(i(t)));
      };
    });

  svgChart
    .selectAll("text.className")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "className")
    .attr("x", (d) => xScale(d.label) + xScale.bandwidth() / 2)
    .attr("y", chartHeight + 40)
    .text((d) => d.label)
    .style("fill", "#ffffff")
    .style("text-anchor", "middle");

  svg.attr("width", width).attr("height", height);
};

export default drawMessageClassesChart;