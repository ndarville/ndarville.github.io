var margin = {top: 30, right: 15, bottom: 10, left: 125};
    width = 600 - margin.left - margin.right,
    height = 2000 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([-50, 50])
    .range([0, width])

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .2);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickValues([-50,-40,-30,-20,-10,0,10,20,30,40,50])
    .tickFormat(function(d) {
        if (d === 0) { return "Even"; }
        else { return d<0 ? "+" + -1*d+"%" : "+" + d+"%"; }
    })
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    var majority = d.women>=50 ? "women" : "men";
    var share = d.women>=50 ? d.women : d.men;
    return "<strong>" + d.company + ":</strong> <span style='color:red'>" + share + "%" + "</span> " + majority + " out of " + d.num_eng;
})

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("/assets/women-in-tech/data.csv", type, function(error, data) {
    y.domain(data.map(function(d) { return d.company; }));

    svg.selectAll(".bar")
        .data(data)
    .enter().append("rect")
        .attr("class", function(d) { return d.women > 50 ? "bar negative" : "bar positive"; })
        .attr("x", function(d) { return d.women > 50 ? x(-d.women+50) : x(0); })
        .attr("y", function(d) { return y(d.company); })
        .attr("width", function(d) { return x(Math.max(d.women-50, d.men-50)) - x(0); })
        .attr("height", y.rangeBand())
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
    .append("line")
        .attr("x1", x(0))
        .attr("x2", x(0))
        .attr("y2", height);

    svg.append("g")
        .attr({
            "class": "grid",
            "transform": "translate(0," + height + ")"
        })
        .call(xAxis
            .tickSize(height, 0, 0)
            .tickFormat("")
    );

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
            .attr({
                "transform": "rotate(-90)",
                "y": 6,
                "dy": ".71em"
            })
            .style("text-anchor", "end")
            .text("");
});

function type(d) {
    d.women = Math.round(parseFloat(d.percent_female_eng));
    d.men = 100-d.women;
    return d;
}
