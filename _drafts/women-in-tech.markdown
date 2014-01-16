---
layout: post
title:  "Women in Software Engineering by the Numbers"
categories: blog
description: "A visualization of the representation of women in software-engineering companies."
---
A lot of effort is put into documenting life for women in the tech industry. **Tracy Chou** is leading a [project][project] that gathers data on the number---and ratio---of female software engineers working at tech companies.

<div class="box quote" markdown="1">
**Chou:** "For the purposes of this project, I am counting 'female engineers' as women who are writing or architecting software, and are in full-time roles. This generally does not include people just writing HTML/CSS (depending on the level of sophistication of the CSS being written), designers, PMs, sysadmins, etc. although the line can be blurry for people who are in mixed roles, like engineering managers who were formerly ICs and still contribute code---use your judgment. Only full-timers please; no interns or contractors."
</div>

This is a visualization of the data.

## Majorities of Men and Women in Software Engineering ##
Just in case the chart needs explaining, each bar displays how the men outnumber the women---and vice versa. If a group of software engineers at a company is **90%** male, the bars will display the differential of **40%** from an even **50%**.

We leave it as an excercise to the reader to figure out whom each side and colour represent.

<div id="chart"></div>

<script src="/js/d3.min.js?v=3.2.8"></script>
<script src="/js/d3.tip.min.js"></script>
<link rel="stylesheet" href="/assets/women-in-tech/style.css">
<!-- <script src="/assets/women-in-tech/d3+d3-tip+script.js"></script> -->
<script src="/assets/women-in-tech/script.min.js"></script>

* Gridlines

Thanks
------
* [Mike Bostock][bostock], for D3, and [this][inspiration].
* [Justin Palmer][palmer], for d3-tip.
* [Tracy Chou][chou] and everyone who contributed to her project.


[project]: https://github.com/triketora/women-in-software-eng
[bostock]: https://github.com/mbostock/
[inspiration]: http://bl.ocks.org/mbostock/2368837
[palmer]: https://github.com/Caged/
[chou]: https://github.com/triketora/
