---
layout: post
title:  "The Nationalities Aboard Malaysian Flight MH370"
categories: blog
description: "A chart of nationalities of the passengers on MH370."
date:   2014-03-23 17:00:00
id:     5
image:  true
slug:   mh370-nationalities
redirect_from: /mh370-nationalities
---
<div id="chart" class="map"></div>

<script src="/js/d3.min.js?v=3.2.8"></script>
<script src="/js/maps/d3.geo.projection.v0.min.js" charset="utf-8"></script>
<script src="/js/maps/topojson.v1.min.js" type="text/javascript" charset="utf-8"></script>

<script type="text/javascript" charset="utf-8">
// Height/width
// Scale
// Projection transform
// Path translate
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
        width = 600 - margin.left - margin.right,
        height = 375 - margin.top - margin.bottom;

    var mapValue = "total",
        countryName = "country";

	var color = "#2B83BA";

	var projection = d3.geo.kavrayskiy7()
	    // via https://github.com/d3/d3-geo-projection/
	    .translate([265, 185])
	    .scale(125); // Revise so it isn't a magic number

	var path = d3.geo.path()
	    .projection(projection);

    var svg = d3.select("#chart").append("svg")
	    .append("svg")
	    .attr({
	        "width": width,
	        "height": height
	    });

	// Local helper functions
	// to be moved to chart.js
	var cleanPrefix = function(string) {
	    // Remove any "<", ">" or "~" prefixed to a number value
	    // e.g. d3Helpers.cleanPrefixes(data[i][mapValue]);
	    prefix = string.substring(0, 1);

	    if (prefix === "<" || prefix === ">" || prefix === "~") {
	        return string.substring(1);
	    } else {
	        return string;
	    }
	};

	// Load the data values
	d3.csv("/assets/mh370-nationalities/data.csv", function(data) {

	    // Geodata loaded into the csv scope
	    d3.json("/js/maps/ne_110m_admin_0_countries_lakes.geojson", function(json) {
	        var dataLength = data.length,
	            jsonLength = json.features.length;

	        // data (values) forloop
	        for (var i = 0; i < dataLength; i++) {
	            var dataCountry = data[i][countryName],
	                dataValue = cleanPrefix(data[i][mapValue]);

	            // json (geodata) forloop
	            for (var j = 0; j < jsonLength; j++) {
	                var jsonCountry = json.features[j].properties.name_long;
	                if (dataCountry == jsonCountry) {
	                    json.features[j].properties.value = dataValue;
	                    break;
	                }
	            }
	        }

	        svg.selectAll("path")
	            .data(json.features)
	            .enter()
	            .append("path")
	            .attr({
	                "d": path,
                 // "class": "country foo",
	                "class": function(d) { return d.properties.value ? "country filled" : "country unfilled"; },
	                "transform": "translate(" + 0 + "," + 0 + ")"
	            })
	            .style("fill", function(d) {
	                var value = d.properties.value;
	                return value ? color : "#000";
	            });
	    });
	});
</script>

<style>
    line,
    rect {
        shape-rendering: crispEdges;
    }

    path.country {
        stroke: #FFF;
        stroke-width: .5px;
    }

/** path.country.unfilled:hover, */
    path.country.filled:hover {
        fill: #fdae61 !important;
    }

    noscript img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<noscript>
    <img src="image.png" alt="Chart for nationalities of the passengers on MH370" />
</noscript>
