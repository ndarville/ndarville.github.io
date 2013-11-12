---
layout: post
title:  "A Bar Chart"
date:   2013-11-10 17:00:00
categories: blog
---
<div id="toc">
    <ol>
        <li><a href="#intro">Intro</a></li>
        <li><a href="#container">A Container for Our Chart</a>
            <ul>
                <li><a href="#selections">Selections</a></li>
            </ul>
        </li>
        <li><a href="#manually">Coding a Chart Manually, the Stupid Way</a></li>
        <li><a href="#programmatically">Coding a Chart Programmatically, the Clever Way</a>
            <ul>
                <li><a href="#chaining">Chaining</a></li>
                <li><a href="#functions">Return of the Functions</a></li>
                <li><a href="#scaling">Scaling to Fit</a></li>
            </ul>
        </li>
        <li><a href="#further-reading">Further Reading</a></li>
    </ol>
</div>

<h3 id="intro">Introduction</h3>

<i>(This blog post is an attempt to re-write Mike Bostock's own [bar-chart tutorial][original].)</i>

Say you have some data you want to make into a bar chart with D3. We represent the data as an array, in JavaScript:

```js
var data = [4, 8, 15, 16, 23, 42];
```

The goal is to turn it into something like this:

<div class="chart-aperitif"></div>
<style>
    .chart-aperitif div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<script async>
    var data = [4, 8, 15, 16, 23, 42];

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

    d3.select(".chart-aperitif")
        .selectAll("div")
            .data(data).enter()
        .append("div")
            .style("width", function(d) { return x(d) + "px"; })
            .text(function(d) { return d; });
</script>

This tutorial spans over three parts that entail creating

1. A bare-bones version in **HTML**.
2. Then a more complete chart in **SVG**.
3. And lastly, animated **transitions** between views.

This tutorial assumes a basic understanding of web development, which includes

1. Editing a web page (HTML/CSS).
2. Viewing the page in your web browser.
3. Including `d3.js` on your web page and writing passable JavaScript.

By the end of this tutorial, you will also be familiar with the important concepts of

1. Selections
2. Chaining
3. Data joins

and the D3 methods

* `append()`
* `select()`
* `selectAll()`
* `.data()`
* `.enter()`

By the end of this tutorial, the finished chart should look like [this][example]. This example code should also help you get over the major humps in wrapping your head around how this works.

To make things even easier, [here][template] is a naked template file you can start out with. You can right-click to save it or copy it from here:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <style>
            /** Custom CSS goes here */
        </style>
    </head>
    <body>
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script type="text/javascript"charset="utf-8">
            // D3 code goes here
        </script>
    </body>
</html>
```

<h3 id="container">A Container for Our Chart</h3>

You'll want to get your hands dirty at this point and create something. It's a good idea to create a **container** for your chart HTML. We'll use a `<div>` element that lives inside `<body>` for this.

In **HTML**, we construct the `<div>` container like so:

```html
<div>Hello, world!</div>
```

In **JavaScript**:

```js
var div = document.createElement("div");
div.innerHTML = "Hello, world!";
document.body.appendChild(div);
```

Translated:

1. Create the `<div>` HTML element as the variable `div`
2. Insert the text "Hello world!" inside it
3. Place `div` into the `<body>` of your HTML

<h4 id="selections">Selections</h4>

The main difference between the two examples is that you have to write *where* your `<div>` goes in JavaScript (inside `<body>`). As you aren't putting your HTML directly where you want it to be with JavaScript, you have to spell it out explicitly. You have to *select* the `<body>` element yourself.

In JavaScript terminology, we call this concept **selection**.

<div class="info box">
    The concept of selections is <em>very</em> important for you to understand---and yes, it can be a little tricky to wrap your head around the first few times.

    <p>Keep reading along, though; you can always go back to brush up.</p>
</div>

With this in mind, look at how we perform the same task as above with **D3**:

```js
var body = d3.select("body");
var div = body.append("div");
div.html("Hello World");
```

Creating a selection couldn't be easier than `d3.select("body")`. Compare that with the abstruse JavaScript example, and you'll begin to see the advantage of D3.

<div class="quote box">
    "A selection can be created in myriad ways. Most often you create one by querying a <em><a href="http://www.w3.org/TR/selectors-api/">selectors</a></em>, which is a special string that identifies desired elements by property, say by name or class (<code>"div"</code> or <code>".foo"</code>, respectively)."
</div>

The method name `append()` might confuse you at first, but remember that we are operating on a *tree-like structure* of HTML, which is the DOM. If you recall, the corresponding method in JavaScript was named `appendChild()`.

This makes a lot of sense given how we would visualize this relation:

```
body
    \
    div
```

`<div>` is a child of `<body>`, which in HTML means the element is nested inside its parent:

```html
<body>
    <div>Hello, world!</div>
</body>
<!-- Or -->
<body><div>Hello, world!</div></body>
```

While you chew on this, let's proceed to make a chart---*the stupid way*.

<h3 id="manually">Coding a Chart Manually, the Stupid Way</h3>

If you had to rely solely on HTML and CSS, and you didn't have *too* many numbers in your dataset, you could write the code by hand, tedious as it would be.

The simplest way would be to just create one `<div>` container and nest a `<div>` block inside for each horizontal bar in the chart. So let's do it:

```html
<style>
    .chart-stupid div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<div class="chart-stupid">
    <div style="width: 40px;">4</div>
    <div style="width: 80px;">8</div>
    <div style="width: 150px;">15</div>
    <div style="width: 160px;">16</div>
    <div style="width: 230px;">23</div>
    <div style="width: 420px;">42</div>
</div>
```

Which gives us this:

<style>
    .chart-stupid div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<div class="chart-stupid">
    <div style="width: 40px;">4</div>
    <div style="width: 80px;">8</div>
    <div style="width: 150px;">15</div>
    <div style="width: 160px;">16</div>
    <div style="width: 230px;">23</div>
    <div style="width: 420px;">42</div>
</div>

This isn't a screenshot, but actual HTML; check it out.

If you wonder where we got the values from, we got them from our `data`:

```js
var data = [4, 8, 15, 16, 23, 42];
```

Evidently, this approach *sucks*.

<div class="info box">
    The tedium of doing the chart by hand teaches us a valuable lesson in programming: <strong>Don't Repeat Yourself</strong> (DRY).
</div>

<h3 id="programmatically">Coding a Chart Programmatically, the Clever Way</h3>

Remember how you learnt to make a container with HTML, JavaScript, and D3, and touched on the concept of selections?

This was how we created one `<div>` inside a `<body>` with D3:

```js
var body = d3.select("body");
var div = body.append("div");
div.html("Hello World");
```

... which was the same as doing this in HTML:

```html
<div>Hello, world!</div>
```

Great approaches both, both the HTML approach revealed its weakness, when we had to create several `<div>` bars for our chart:

```html
<div class="chart-stupid">
    <div style="width: 40px;">4</div>
    <div style="width: 80px;">8</div>
    <div style="width: 150px;">15</div>
    <div style="width: 160px;">16</div>
    <div style="width: 230px;">23</div>
    <div style="width: 420px;">42</div>
</div>
```

As a Dane writing in English, let me assure you that you can speak stupid in any language; this is what a similar piecemeal approach looks like with D3:

```js
var div = d3.select(".chart-stupid-d3");
    var div1 = div.append("div");
        div1.style("width", "40px");
        div1.text(4);
    var div2 = div.append("div");
        div2.style("width", "80px");
        div2.text(8);
    var div3 = div.append("div");
        div3.style("width", "150px");
        div3.text(15);
    var div4 = div.append("div");
        div4.style("width", "160px");
        div4.text(16);
    var div5 = div.append("div");
        div5.style("width", "230px");
        div5.text(23);
    var div6 = div.append("div");
        div6.style("width", "420px");
        div6.text(42);
```

<div class="chart-stupid-d3"></div>
<style type="text/css">
    .chart-stupid-d3 div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<script async>
    var div = d3.select(".chart-stupid-d3");
        var div1 = div.append("div");
            div1.style("width", "40px");
            div1.text(4);
        var div2 = div.append("div");
            div2.style("width", "80px");
            div2.text(8);
        var div3 = div.append("div");
            div3.style("width", "150px");
            div3.text(15);
        var div4 = div.append("div");
            div4.style("width", "160px");
            div4.text(16);
        var div5 = div.append("div");
            div5.style("width", "230px");
            div5.text(23);
        var div6 = div.append("div");
            div6.style("width", "420px");
            div6.text(42);
</script>

(I snuck in a `.style()` method you haven't seen in your introduction to D3.)

"Select chart container; append child bar to it; rinse and repeat."

Evidently, there is a perfectly stupid way to create your bar chart piecemeal with D3.

Fortunately, this is not how D3 is supposed to be used.

<h4 id="chaining">Chaining</h4>

Chaining is the first line of attack against stupid code that allows us to give the above code example a fantastic make-over:

```js
var div = d3.select(".chart-stupid-d3");
    div.append("div")
        .style("width", "40px")
        .text(4);
    div.append("div")
        .style("width", "80px")
        .text(8);
    div.append("div")
        .style("width", "150px")
        .text(15);
    div.append("div")
        .style("width", "160px")
        .text(16);
    div.append("div")
        .style("width", "230px")
        .text(23);
    div.append("div")
        .style("width", "420px")
        .text(42);
```

<div class="chart-stupid-chained"></div>
<style type="text/css">
    .chart-stupid-chained div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<script async>
    var div = d3.select(".chart-stupid-chained");
        div.append("div")
            .style("width", "40px")
            .text(4);
        div.append("div")
            .style("width", "80px")
            .text(8);
        div.append("div")
            .style("width", "150px")
            .text(15);
        div.append("div")
            .style("width", "160px")
            .text(16);
        div.append("div")
            .style("width", "230px")
            .text(23);
        div.append("div")
            .style("width", "420px")
            .text(42);
</script>

<div class="quote box">
    There is a gotcha with method chaining, however: while most operations return the same selection, some methods return a new one! For example, <a href="https://github.com/mbostock/d3/wiki/Selections#wiki-append">selection.append</a> returns a new selection containing the new elements. This conveniently allows you to chain operations into the new elements.
</div>

--->

<h4 id="functions">Return of the Functions</h4>

--->

```html
<div class="chart-programmatic"></div>
<style type="text/css">
    .chart-programmatic div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<script async>
    var data = [4, 8, 15, 16, 23, 42];

    d3.select(".chart-programmatic")
        .selectAll("div")
            .data(data).enter()
        .append("div")
            .style("width", function(d) { return d*10 + "px"; })
            .text(function(d) { return d; });
</script>
```

<div class="chart-programmatic"></div>
<style type="text/css">
    .chart-programmatic div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<script async>
    var data = [4, 8, 15, 16, 23, 42];

    d3.select(".chart-programmatic")
        .selectAll("div")
            .data(data).enter()
        .append("div")
            .style("width", function(d) { return d*10 + "px"; })
            .text(function(d) { return d; });
</script>

<h4 id="scaling">Scaling to Fit</h4>

--->

```html
<div class="chart-scaled"></div>
<style type="text/css">
    .chart-scaled div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<script async>
    var data = [4, 8, 15, 16, 23, 42];

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

    d3.select(".chart-scaled")
        .selectAll("div")
            .data(data).enter()
        .append("div")
            .style("width", function(d) { return x(d) + "px"; })
            .text(function(d) { return d; });
</script>
```

<div class="chart-scaled"></div>
<style type="text/css">
    .chart-scaled div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<script async>
    var data = [4, 8, 15, 16, 23, 42];

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

    d3.select(".chart-scaled")
        .selectAll("div")
            .data(data).enter()
        .append("div")
            .style("width", function(d) { return x(d) + "px"; })
            .text(function(d) { return d; });
</script>

--->

<h3 id="further-reading">Further Reading</h3>

* <i>[Let’s Make a Bar Chart][original] by Mike Bostock
* <i>[How Selections Work][selections-howto]</i> by Mike Bostock
* [API Reference for D3 Selections][selections-api]
* <http://knowledgestockpile.blogspot.dk/2012/01/understanding-selectall-data-enter.html>
* <http://bost.ocks.org/mike/nest/>


[original]: http://bost.ocks.org/mike/bar/
[example]: http://codepen.io/mbostock/pen/Jaemg
[template]: /assets/bar-chart/template.html
[selectors]: http://www.w3.org/TR/selectors-api/
[selections-howto]: https://github.com/mbostock/d3/wiki/Selections
[selections-api]: https://github.com/mbostock/d3/wiki/Selections
