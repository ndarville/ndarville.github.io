---
layout: post
title:  "A Bar Chart"
date:   2013-11-10 17:00:00
categories: blog
---
Say you have some data you want to make into a bar chart with D3. We'll represent the data as an array:

```js
var data = [4, 8, 15, 16, 23, 42];
```

The tutorial spans over three parts that entail creating

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

### Creating a Container for Our Chart

You'll want to get your hands dirty at this point and create something. It's a good idea to create a **container** for your chart HTML. We'll use a `<div>` element for this.

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

#### Selections

The main difference between the two examples is that you have to write *where* your `<div>` goes in JavaScript (inside `<body>`). As you aren't putting your HTML directly where you want it to be with JavaScript, you have to spell it out explicitly. You have to *select* the `<body>` element yourself.

In JavaScript terminology, we call this concept **selection**.

<div class="info box">
    The concept of selections *very* important for you to understand, so make sure you do. You can keep reading along, though, since you can always go back to brush up.
</div>

<div class="quote box">
    A selection can be created in myriad ways. Most often you create one by querying a *[selector][selectors]*, which is a special string that identifies desired elements by property, say by name or class (`"div"` or `".foo"`, respectively).
</div>

With this in mind, look at how we perform the same task as above with **D3**:

```js
var body = d3.select("body");
var div = body.append("div");
div.html("Hello World");
```

Creating a selection couldn't be easier than `d3.select("body")`. Compare that with the abstruse JavaScript example, and you'll begin to see the advantage of D3.

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

### Coding a Chart Manually, the Stupid Way

If you had to rely solely on HTML and CSS, and you didn't have *too* many numbers in your dataset, you could write the code by hand, tedious as it would be.

The simplest way would be to just create one `<div>` container and nest a <div> block inside for each horizontal bar in the chart. So let's do it:

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
<div class="chart">
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
    .chart div {
      font: 10px sans-serif;
      background-color: steelblue;
      text-align: right;
      padding: 3px;
      margin: 1px;
      color: white;
    }
</style>
<div class="chart">
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


[example]: http://codepen.io/mbostock/pen/Jaemg
[template]: /assets/bar-chart/template.html
[selectors]: http://www.w3.org/TR/selectors-api/
