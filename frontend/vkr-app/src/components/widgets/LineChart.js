import * as d3 from 'd3';

export const drawConflictDynamics = (data, containerRef) => {
  const width = 600;
  const height = 400;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  d3.select(containerRef.current).select("svg").remove();

  const svg = d3
    .select(containerRef.current)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const timeScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => new Date(d.date)))
    .range([0, innerWidth]);

  const countScale = d3
    .scaleLinear()
    .domain([d3.max(data, (d) => d.count), 0])
    .range([0, innerHeight]);

  const xAxis = d3.axisBottom(timeScale);
  const yAxis = d3
    .axisLeft(countScale)
    .tickValues([countScale.domain()[0], countScale.domain()[1]])
    .tickFormat((d) => (d === countScale.domain()[0] ? 'Negative' : 'Positive'));

  svg
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis);

  svg.append("g").call(yAxis);

  const line = d3
    .line()
    .x((d) => timeScale(new Date(d.date)))
    .y((d) => countScale(d.count));

  const area = d3
    .area()
    .x((d) => timeScale(new Date(d.date)))
    .y0(innerHeight)
    .y1((d) => countScale(d.count));

  svg
    .selectAll(".time-interval")
    .data(data.filter((d) => d.interval))
    .enter()
    .append("rect")
    .attr("class", "time-interval")
    .attr("x", (d) => timeScale(new Date(d.date)))
    .attr("y", 0)
    .attr("width", (d) => timeScale(new Date(d.interval)) - timeScale(new Date(d.date)))
    .attr("height", innerHeight)
    .attr("fill", "lightgray")
    .attr("opacity", 0.5);

  const path = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "aqua")
    .attr("stroke-width", 2)
    .attr("d", line);

  const areaPath = svg
    .append("path")
    .datum(data)
    .attr("fill", "turquoise")
    .attr("opacity", 0.2)
    .attr("d", area);

  const pathLength = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", `${ pathLength} ${pathLength}`)
    .attr("stroke-dashoffset", pathLength)
    .transition()
    .duration(2000)
    .attr("stroke-dashoffset", 0);

  areaPath
    .attr("stroke-dasharray", `${pathLength} ${pathLength}`)
    .attr("stroke-dashoffset", pathLength)
    .transition()
    .duration(2000)
    .attr("stroke-dashoffset", 0);
};

export default drawConflictDynamics;