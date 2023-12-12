//Javascript helper function to generate final score scale + marker
document.addEventListener('DOMContentLoaded', () => {
    var dataRange = [0, 50]; //fixed score
    var urlParameter = new URLSearchParams(window.location.search) //get final score from URL storage
    var finalScore = parseFloat(urlParameter.get('finalScore')) || 0;
    var colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateSpectral)  //define colors
      .domain(dataRange); 

    // create SVG
    var svg = d3.select("#scale");

    // define gradient
    var defs = svg.append("defs");
    var linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");

    // add gradient stops for colors
    linearGradient.selectAll("stop")
      .data(colorScale.range())
      .enter().append("stop")
      .attr("offset", function (d, i) {
        return i / (colorScale.range().length - 1);
      })
      .attr("stop-color", function (d) {
        return d;
      });

    // rectangular legend
    svg.append("rect")
      .attr("width", 198)
      .attr("height", 20)
      .attr('stroke', 'black')
      .style("fill", "url(#linear-gradient)")
      .attr("class", "scale-rect");

    // scale and axis, tixs defined
    var x = d3.scaleLinear()
      .domain(dataRange)
      .range([0, 190]);

    var axis = d3.axisBottom(x);
    axis.ticks(5);

    // render axis
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(3,20)")
      .call(axis);

  svg.append("line")
      .attr("x1", x(finalScore) + 3.5)
      .attr("y1", 0)
      .attr("x2", x(finalScore) + 3.5)
      .attr("y2", 20)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5"); // add dash indicator for user input
  });
