---
layout: post
title:  "A Bar Chart"
date:   2013-11-10 17:00:00
id:     1
categories: blog
tags:   tutorials
excerpt: "An attempt to re-write Mike Bostock's own bar-chart tutorial, serving as an introduction to his charting framework D3."
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
                <li><a href="#functions-data-join">Return of the Functions, and a New Data Join</a></li>
                <li><a href="#scaling">Scaling to Fit</a></li>
            </ul>
        </li>
        <li><a href="#further-reading">Further Reading</a></li>
    </ol>
</div>

<h3 id="intro">Introduction</h3>

<div class="box info">
    This blog post is an attempt to re-write Mike Bostock&rsquo;s own <a href="http://bost.ocks.org/mike/bar/">bar-chart tutorial</a>.

    <p>I myself <a href="http://bl.ocks.org/ndarville/5560275">struggled a lot</a> with learning D3 and creating a chart based on the original tutorial (recently re-written by Bostock himself). I imagine others will, too, so this is my attempt at writing the tutorial I would have wanted over half a year ago.</p>

    <p>The best distillation of my problem with the tutorial is that it feels more more akin to reverse engineering D3 than teaching it.</p>

    <p>The creation of D3 was driven by a set of motivations, and this tutorial aspires to make the reader see the challenges in making a chart, thereby giving the reader an idea of not just <strong>how</strong> D3 works, but also <strong>why</strong> it was made to work that way, and what motivated its creation in the first place.</p>
</div>

Say you have some data you want to make into a bar chart with D3. We represent the data as an array, in JavaScript:

```js
var data = [4, 8, 15, 16, 23, 42];
```

The goal is to turn it into this:

<div class="chart chart-aperitif"></div>
<style>
    .chart div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<script>
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

<div class="info box">
    <em>All</em> charts in this tutorial are rendered code. This tutorial contains <em>no</em> images.
</div>

This tutorial assumes a basic understanding of web development, which includes

1. Editing a web page (HTML/CSS).
2. Viewing the page in your web browser.
3. Including `d3.js` on your web page and writing passable JavaScript.

By the end of this tutorial, you will also be familiar with the concepts of

1. Selections
2. Chaining
3. Data joins
4. Magic numbers

and the `d3` methods

* `append()`
* `select()`
* `selectAll()`
* `data()`
* `enter()`
* `scale.linear()`
* `max()`

Setting up D3 on your computer can be done by following [the official installation guide][installation]. To make things easier, [here][template] is a naked template file you can start out with. Right-click the link to save it, or copy from here:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <style>
            .chart div {
                font: 10px sans-serif;
                background-color: steelblue;
                text-align: right;
                padding: 3px;
                margin: 1px;
                color: white;
            }
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

A much *easier* solution I recommend for neophytes is working from [this][fiddle] fiddle, as you follow the guide. The code in the fiddle is for the first D3 example. Remember to press the **Run** button, when you are ready to render your code.

<h3 id="container">A Container for Our Chart</h3>

You'll want to get your hands dirty at this point. It's a good idea to create a **container** for your chart HTML. We'll use a `<div>` element that lives inside `<body>` for this.

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

This touches on the concept of **selections**. Remember how you use *selectors* in CSS to apply stylesheet rules?

```css
body {
    background-color: white;
}
```

This is what [the official language][selectors] on selectors says:

<div class="quote box">
    "Selectors, which are widely used in CSS, are patterns that match against elements in a tree structure. The Selectors API specification defines methods for retrieving <code>Element</code> nodes from the DOM by matching against a group of selectors. It is often desirable to perform DOM operations on a specific set of elements in a document. These methods simplify the process of acquiring specific elements, especially compared with the more verbose techniques defined and used in the past."
</div>

With this in mind, look at how we perform the same task as above with **D3**:

```js
var body = d3.select("body");
var div = body.append("div");
div.html("Hello World");
```

Creating a selection couldn't be easier than `d3.select("body")`. Compare that with the abstruse JavaScript example, and you'll begin to see the advantage of D3.

<div class="quote box">
    <strong>Mike Bostock</strong>: "A selection can be created in myriad ways. Most often you create one by querying a <em><a href="http://www.w3.org/TR/selectors-api/">selector</a></em>, which is a special string that identifies desired elements by property, say by name or class (<code>"div"</code> or <code>".foo"</code>, respectively)."
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

The simplest way would be to just create one `<div>` container and nest a `<div>` block inside for each bar in the chart:

```html
<style>
    .chart div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
<div class="chart chart-stupid">
    <div style="width: 40px;">4</div>
    <div style="width: 80px;">8</div>
    <div style="width: 150px;">15</div>
    <div style="width: 160px;">16</div>
    <div style="width: 230px;">23</div>
    <div style="width: 420px;">42</div>
</div>
```

Which gives us this:

<div class="chart chart-stupid">
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

The CSS will be the same for all the following examples, so just use the same for those, if you are coding this, as you read along.

In defining our widths, we multiplied the values with `10`, as we ought to have a bar chart bigger than `42` pixels.

Evidently, this approach *sucks*.

<div class="info box">
    The tedium of doing the chart by hand teaches us a valuable lesson in programming: <strong>Don't Repeat Yourself</strong> (DRY).
</div>

<div class="box info">
    To avoid repeating yourself, <strong>generalize</strong> and <strong>automate</strong> your code.
</div>

<h3 id="programmatically">Coding a Chart Programmatically, the Clever Way</h3>

By now, you've learnt to make a container with HTML, JavaScript, and D3, and touched on the concept of selections in order to create the chart bars inside said container.

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

Great approaches both, but the HTML approach revealed its weakness, when we had to create several `<div>` bars for our chart:

```html
<div class="chart chart-stupid">
    <div style="width: 40px;">4</div>
    <div style="width: 80px;">8</div>
    <div style="width: 150px;">15</div>
    <div style="width: 160px;">16</div>
    <div style="width: 230px;">23</div>
    <div style="width: 420px;">42</div>
</div>
```

As a Dane writing in English, let me assure you that it's possible to speak stupid in any language; a stupid piecemeal approach with D3 similar to the prior examples would look like *this*:

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

<div class="chart chart-stupid-d3"></div>
<script>
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

Evidently, there is a perfectly stupid way to create your bar chart piecemeal with D3 as well.

Fortunately, this is not how D3 is supposed to be used. So let's get to it.

<h4 id="chaining">Chaining</h4>

**Chaining** is the first line of attack against stupid code, allowing us to treat the above code example to an extreme make-over:

```js
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
```

<div class="chart chart-stupid-chained"></div>
<script>
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

If we had only *one* bar, we could chain our methods with no `div` variable like so:

```js
d3.select(".chart-one-bar")
    .append("div")
        .style("width", "40px")
        .text(4);
```

<div class="chart chart-one-bar"></div>
<script>
    d3.select(".chart-one-bar")
        .append("div")
            .style("width", "40px")
            .text(4);
</script>

Sifu Bostock explains:

<div class="quote box">
    <strong>Mike Bostock:</strong> "There is a gotcha with method chaining, however: while most operations return the same selection, some methods return a new one! For example, <a href="https://github.com/mbostock/d3/wiki/Selections#wiki-append">selection.append</a> returns a new selection containing the new elements. This conveniently allows you to chain operations into the new elements."
</div>

This is why we need our `div` variable, when we append several bars; omitting it would nest our bars *inside each other* instead of *inside our chart container*.

You could say we take a step *back* up our HTML or DOM tree to work inside the `<div>` container insteader of inside our `<div>` bar.

I know it can be a little confusing, when both our chart container and bars are `<div>` elements, so let me try to represent what it is we want to achieve, and what we want to avoid here:

```html
<!-- Right -->
    <div class="chart">
        <div>
        </div>
        <!-- Future div bar -->
    </div>

<!-- Wrong -->
    <div class="chart">
        <div>
            <!-- Future div bar -->
        </div>
    </div>
```

<h4 id="functions-data-join">Return of the Functions, and a New Data Join</h4>

When we defined the width of our bars, in both HTML and D3, we took our values, multiplied them by ten, and passed them as our width value. Here is a reminder:

```js
// The value is 4
div.append("div")
    .style("width", "40px")
    .text(4);
```

We did all this by hand, but why do this calculation piecemeal, when there is a smarter way to go about it:

```js
var val = 4;
div.append("div")
    .style("width", val*10 + "px")
    .text(val);
```

This approach means we don't have to pass and calculate our values anymore; we only have to define them. In other words, we are repeating ourselves less by **generalizing** the code.

When we apply this approach to our entire bar chart, we get this:

```js
var val = 0;
var div = d3.select(".chart-times-ten");
    val = 4;
    div.append("div")
        .style("width", val*10 + "px")
        .text(val);
    val = 8;
    div.append("div")
        .style("width", val*10 + "px")
        .text(val);
    val = 15;
    div.append("div")
        .style("width", val*10 + "px")
        .text(val);
    val = 16;
    div.append("div")
        .style("width", val*10 + "px")
        .text(val);
    val = 23;
    div.append("div")
        .style("width", val*10 + "px")
        .text(val);
    val = 42;
    div.append("div")
        .style("width", val*10 + "px")
        .text(val);
```

<div class="chart chart-times-ten"></div>
<script>
    var val = 0;
    var div = d3.select(".chart-times-ten");
        val = 4;
        div.append("div")
            .style("width", val*10 + "px")
            .text(val);
        val = 8;
        div.append("div")
            .style("width", val*10 + "px")
            .text(val);
        val = 15;
        div.append("div")
            .style("width", val*10 + "px")
            .text(val);
        val = 16;
        div.append("div")
            .style("width", val*10 + "px")
            .text(val);
        val = 23;
        div.append("div")
            .style("width", val*10 + "px")
            .text(val);
        val = 42;
        div.append("div")
            .style("width", val*10 + "px")
            .text(val);
</script>

This is *still* repetitive; ideally, we want something like this:

```js
var data = [4, 8, 15, 16, 23, 42];
var div = d3.select(".chart");
    // for d in data
    div.append("div")
        .style("width", d*10 + "px")
        .text(d);
```

To achieve this we need to familiarize ourselves with **data joins**.

For now, I'll defer to Mike Bostock's excellent <i>[Thinking with Joins][joins]</i> to explain data joins and the `selectAll()`, `data()`, and `enter()` methods.

(I'll write the part of this tutorial myself later, but this placeholder is better than a useless `TODO: explain data joins` text mid-article.)

Using what the article teaches, we end up with this:

```js
var data = [4, 8, 15, 16, 23, 42];
d3.select(".chart-programmatic")
    .selectAll("div")
        .data(data).enter()
    .append("div")
        .style("width", function(d) { return d*10 + "px"; })
        .text(function(d) { return d; });
```

<div class="chart chart-programmatic"></div>
<script>
    var data = [4, 8, 15, 16, 23, 42];

    d3.select(".chart-programmatic")
        .selectAll("div")
            .data(data).enter()
        .append("div")
            .style("width", function(d) { return d*10 + "px"; })
            .text(function(d) { return d; });
</script>

One thing that guide doesn't tell you is the difference between these two pieces of code:

```js
// (...)
.style("width", d*10 + "px")
.text(d);
```

```js
// (...)
.style("width", function(d) { return d*10 + "px"; })
.text(function(d) { return d; });
```

The difference shows that in order to access the `d` datum from our data, we now have to retrieve it from a function.

We are almost done generalizing and automating our code to fit our intent, but we before we can call it a day, we need to do address *one* more thing.

<h4 id="scaling">Scaling to Fit</h4>

At this point, only one thing stands out in our code and calls for a fix. Can you spot it?

```js
.style("width", function(d) { return d*10 + "px"; })
```

Don't see it? ENHANCE:

```js
return d*10 + "px";
```

It's the **magic number** `10`. We used it, because we wanted our bars to be a little longer for aesthetic reasons, but we chose the number `10` quite arbitrarily.

<div class="box info">
    <strong>Magic numbers</strong> are hand-picked values bound to only work for some use cases.

    <p>It is rarely preferable to go with a magic number over a generalized solution that works across different situations.</p>
</div>

If you still don't see a problem with our magic number, imagine adding the value `1,000` to our dataset. It would *completely* break our chart with a new bar 10,000 pixels wide. Choosing a new magic number would still be an imperfect and short-sighted solution.

<div class="box info">
    Magic numbers aren't defined variables with intelligible names, which is why it was probably hard for you to remember what the hell that number did in our code!

    <p>If you do use a magic number, save it as a variable with a name explaining its purpose.</p>

    <p>When we talk about "magic" in other areas of programming, it is not meant as a compliment, but a comment on the difficulty of understanding what actually is happening before us.</p>
</div>

Be particularly careful with using magic numbers with D3, because you'll soon have a cornucopia of them in your code, before you know it.

Instead of scaling our bar widths with `d*10`, we'll use D3's method `scale.linear()`. It takes the domain of our input (`data`) and the range of our output (width). Put together, we get this:

```js
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);
```

To find the highest value in our dataset, we use the method `d3.max()`. In our case, the maximum value is `42`.

The maximum width a bar in our chart should have is the width our web page---so the bar doesn't extend beyond what people can see. We decide the longest bar in our chart should be `420` pixels.

This being a bar chart, it's probably better we define the minimum for our input and domain to be `0` to avoid cutting off our bars and misrepresent the values behind them.

<div class="box quote">
    <strong>Mike Bostock:</strong> "Although <code>x</code> here looks like an object, it is also a function that returns the scaled display value in the range for a given data value in the domain. For example, an input value of <code>4</code> returns <code>40</code>, and an input value of <code>16</code> returns <code>160</code>."
</div>

In our code, we can now replace our magic-number `10` with our scale function `x`:

```js
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
```

<div class="chart chart-scaled"></div>
<script>
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

And *that* concludes this tutorial. Check out the list of further reading below for more.

<h3 id="further-reading">Further Reading</h3>

You can read the next chapters of Mike Bostock's bar-chart tutorials starting from [here][bar-tut-2].

* <i>[How Selections Work][selections-howto]</i> by Mike Bostock
* [API Reference for D3 Selections][selections-api]
* [Official Docs for Selectors][selectors]
* <i>[Understanding selectAll, data, enter, append sequence in D3.js][understanding]</i>
* <i>[Nested Selections][nested]</i> by Mike Bostock


[original]: http://bost.ocks.org/mike/bar/
[template]: /assets/bar-chart/template.html
[installation]: https://github.com/mbostock/d3/wiki#installing
[fiddle]: http://jsfiddle.net/pessimism/xge5p/
[selectors]: http://www.w3.org/TR/selectors-api/
[bar-tut-2]: http://bost.ocks.org/mike/bar/2/
[joins]: http://bost.ocks.org/mike/join/
[selections-howto]: http://bost.ocks.org/mike/selection/
[selections-api]: https://github.com/mbostock/d3/wiki/Selections
[understanding]: http://knowledgestockpile.blogspot.com/2012/01/understanding-selectall-data-enter.html
[nested]: http://bost.ocks.org/mike/nest/
