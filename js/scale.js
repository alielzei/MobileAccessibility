document.addEventListener('DOMContentLoaded', () => {
    // Mock data
    var dataRange = [0, 50];
    var userValue = 30;  // Replace this with the user's value
    // Create a color scale
    var colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateSpectral)  // Use a blue color scale for this example
      .domain(dataRange);

    // Create SVG container
    var svg = d3.select("#scale");

    // Define gradient
    var defs = svg.append("defs");
    var linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");

    // Add gradient stops
    linearGradient.selectAll("stop")
      .data(colorScale.range())
      .enter().append("stop")
      .attr("offset", function (d, i) {
        return i / (colorScale.range().length - 1);
      })
      .attr("stop-color", function (d) {
        return d;
      });

    // Create rectangular legend with gradient fill
    svg.append("rect")
      .attr("width", 198)
      .attr("height", 20)
      .attr('stroke', 'black')
      .style("fill", "url(#linear-gradient)");

    // Set up scale and axis
    var x = d3.scaleLinear()
      .domain(dataRange)
      .range([0, 190]);

    var axis = d3.axisBottom(x);
    axis.ticks(5);

    // Render axis
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(3,20)")
      .call(axis);

  svg.append("line")
      .attr("x1", x(userValue) + 3.5)
      .attr("y1", 0)
      .attr("x2", x(userValue) + 3.5)
      .attr("y2", 20)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5"); // Optional: add a dash array for styling
  });
