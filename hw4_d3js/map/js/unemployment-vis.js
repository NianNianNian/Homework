var width = 960,
    height = 500,
    centered;

var color_domain = [4, 5, 6, 7, 8]
var ext_color_domain = [0, 4, 5, 6, 7, 8]
var legend_labels = ["< 4%", ">= 4%", ">= 5%", ">= 6%", ">= 7%", "> 8%"]
var colors = {};
var colorSelected, color;

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

var projection = d3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

var g = svg.append("g");

function init(){

colorSelected = getChosenColors();

if (colorSelected == "GrYlRd")
{
    colors = ["#adfcad", "#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"];
  }
else if (colorSelected == "YlGn")
{
    colors = colorbrewer.YlGn[6];
  }
else if(colorSelected == "Oranges")
{
    colors = colorbrewer.Oranges[6];
}
else if(colorSelected == "YlGnBu")
{
    colors = colorbrewer.YlGnBu[6];
  }
else if(colorSelected == "Purples")
{
    colors = colorbrewer.Purples[6];
}
else if(colorSelected == "Reds")
{
    colors = colorbrewer.Reds[6];
}

color = d3.scale.threshold()
      .domain(color_domain)
      .range(colors);

queue()
      .defer(d3.json, "data/us-named.json")
      .defer(d3.tsv, "data/unemployment.tsv")
      .await(ready);
  //Create Legend
var legend = svg.selectAll("g.legend")
    .data(ext_color_domain)
    .enter().append("g")
    .attr("class", "legend");

  var ls_w = 20, ls_h = 20;

legend.append("rect")
    .attr("x", 20)
    .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
    .attr("width", ls_w)
    .attr("height", ls_h)
    .style("fill", function(d, i) { return color(d); })
    .style("opacity", 0.8);

  legend.append("text")
    .attr("x", 50)
    .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
    .text(function(d, i){ return legend_labels[i]; });
}

function ready(error, us, unemployment) {

  var rateByState = {};


  unemployment.forEach(function(d) { rateByState[d.state] = +d.rate; });

  g.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { 
          return color(rateByState[d.properties.name]); })
      .style("opacity", 0.8)
      //Adding mouseevents
    .on("mouseover", function(d) {
      d3.select(this).transition().duration(300).style("opacity", 1);
      div.transition().duration(300)
        .style("opacity", 1);
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition().duration(300)
        .style("opacity", 0.8);
      div.transition().duration(300)
        .style("opacity", 0);
    })
    .on("click", clicked);

    //tipsy tooltip 
  $('path').tipsy({
    gravity: 'sw',
    html: true,
    title: function() {
    var d = this.__data__, sN = d.properties.name, uR = rateByState[d.properties.name];
    return '<b>' + sN + '</b><br> <span class="rating">' + uR + '%</span><br>Unemployment Rate ';
    }
  });

//state labels
/*
  svg.selectAll(".state-label")
    .data(topojson.feature(us, us.objects.states).features)
  .enter().append("text")
    .attr("class", "state-label")
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.properties.abbrv; }); */

  g.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("id", "mesh")
      .attr("d", path)
;



} //end of ready function

//Let's start things off!
init();



//Click-to-zoom function
function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

function getChosenColors() {
  var select = document.getElementById("colorScheme");
  return select.options[select.selectedIndex].value;
}

function update() {
  svg.selectAll("g.legend")
    .remove();
  svg.selectAll("path")
  .transition()
          .duration(500)
          .ease("linear")
    .remove();
  init();
}


document.getElementById("colorScheme").addEventListener ("change", update, false);