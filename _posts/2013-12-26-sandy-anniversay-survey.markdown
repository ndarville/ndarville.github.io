---
layout: post
title:  "One Year After Sandy, a Survey"
date:   2013-12-26 16:00:00
id:     3
categories: blog
excerpt: "An attempt to summarize as accessibly as possible Monmouth University Polling Institute's report: Displaced New Jerseyans Negative on Sandy Recovery Efforts—Many still need help making ends meet."
---
<style>
    h4 { border: none; }

    #displacement-col { background-color: #F5FAFA; }
    #income-col { background-color: beige; }
    tr td:first-child { text-align: left; }
</style>

<div id="toc" markdown="1">
1. [Introduction](#intro)
2. [Recovery](#recovery)
    * [Current Recovery](#current-recovery)
    * [Future Recovery](#future-recovery)
3. [Satisfaction](#satisfaction)
4. [The Helped and The Forgotten](#helped-forgotten)
</div>

<h3 id="intro">Introduction</h3>

<div class="box info">
    This blog post is an attempt to summarize as accessibly as possible Monmouth University Polling Institute's poll report, <i><a href="http://www.monmouth.edu/assets/0/32212254770/32212254991/32212254992/32212254994/32212254995/30064771087/e3a9c1b9-dd05-430b-adab-5dfd4b7afede.pdf">Displaced New Jerseyans Negative on Sandy Recovery Efforts&mdash;Many still need help making ends meet</a></i> (.pdf).

    <p><mark>Highlights</mark> and annotations<sup>ABC</sup> have been added by me. The annotations makes it easier to match the percentages with their corresponding data cells.</p>
</div>

<div class="box quote">
    "The Monmouth University Polling Institute released the first wave of results from a tracking panel of New Jersey residents who were displaced by Superstorm Sandy for at least one month. Few of these families feel like they are close to full recovery and most feel that the state's rebuilding efforts have overlooked them."
</div>

The sample size was `683` displaced "New Jersey residents who were displaced by Superstorm Sandy for at least one month"; 90% of respondents' counties were Monmouth (51%) and Ocean (39%). More information on methodology and panel demographics is available in the [original report][report].

If you want to calculate the confidence interval for the percentages, you can do so [here][calculate].

<h3 id="recovery">Recovery</h3>

<table>
    <caption>
        (Table 3.) How long do you think it will take your family to recover from the storm?
    </caption>

    <colgroup>
        <col id="status-col" span="1" />
        <col span="1" />
        <col id="displacement-col" span="2" />
        <col id="income-col" span="5" />
    </colgroup>

    <tr>
        <th>Guesstimate</th>
        <th>Total</th>
        <th>Still displaced</th>
        <th>Back in home</th>
        <th>&lt;$50k</th>
        <th>$50&ndash;74k</th>
        <th>$75&ndash;99k</th>
        <th>$100&ndash;149k</th>
        <th>&gt;$150k</th>
    </tr>
    <tr>
        <td>Already fully recovered</td>
        <td class="data-recovered"><sup>A</sup>10%</td>
        <td class="data-recover-before-anniversary"><sup>C</sup>3%</td>
        <td class="data-fully-recovered"><sup>B</sup>18%</td>
        <td>3%</td>
        <td>10%</td>
        <td>9%</td>
        <td>16%</td>
        <td>16%</td>
    </tr>
    <tr>
        <td>Next few months</td>
        <td>15%</td>
        <td class="data-recover-before-anniversary"><sup>C</sup>11%</td>
        <td>21%</td>
        <td>17%</td>
        <td>16%</td>
        <td>14%</td>
        <td>20%</td>
        <td>16%</td>
    </tr>
    <tr>
        <td>One year</td>
        <td>28%</td>
        <td class="data-recover-before-anniversary"><sup>C</sup>29%</td>
        <td>26%</td>
        <td>32%</td>
        <td>28%</td>
        <td>24%</td>
        <td>25%</td>
        <td>25%</td>
    </tr>
    <tr>
        <td>2&mdash;3 years</td>
        <td class="data-recover-after-anniversary"><sup>D</sup>18%</td>
        <td>22%</td>
        <td>13%</td>
        <td>14%</td>
        <td>24%</td>
        <td>20%</td>
        <td>15%</td>
        <td>19%</td>
    </tr>
    <tr>
        <td>Over 3 years</td>
        <td class="data-recover-after-anniversary"><sup>D</sup>13%</td>
        <td>14%</td>
        <td>11%</td>
        <td>11%</td>
        <td>8%</td>
        <td>15%</td>
        <td>14%</td>
        <td>11%</td>
    </tr>
    <tr>
        <td>Never</td>
        <td class="data-never-recover"><sup>E</sup>16%</td>
        <td>22%</td>
        <td>10%</td>
        <td>23%</td>
        <td>13%</td>
        <td>19%</td>
        <td>11%</td>
        <td>14%</td>
    </tr>
</table>

<h4 id="current-recovery">Current Recovery</h4>
<div class="box quote">
    &ldquo;Few of those who were hit hardest by Sandy feel they have returned to their pre-storm living conditions; Only <mark class="data-recovered">10%</mark><sup>A</sup> of those surveyed say they have fully recovered---including just <mark class="data-fully-recovered">18%</mark><sup>B</sup> who are back in their homes and 3% who remain displaced from their pre-Sandy home. [Note: some of those who are still "displaced" have decided to permanently relocate.]

    <p>By contrast, a statewide poll conducted by Monmouth University in September found that the vast majority of all New Jersey residents, <mark>76%</mark>, said their families have fully recovered from the storm.&rdquo;</p>
</div>

<h4 id="future-recovery">Future Recovery</h4>
<div class="box quote">
    "Among those who participated in the panel survey of the most-impacted residents, <mark class="data-recover-before-anniversary">43%</mark><sup>C</sup> hope to be recovered before Sandy's second anniversay next year, <mark class="data-recover-after-anniversary">31%</mark><sup>D</sup> say it will take longer than that, and <mark class="never-recover">16%</mark><sup>E</sup> say they will never fully recover."
</div>

<h3 id="satisfaction">Satisfaction</h3>

<table>
    <caption>
        (Table 4.) Are you satisfied or dissatisfied with the New Jersey's [sic] Sandy recovery effort so far?
    </caption>

    <colgroup>
        <col id="status-col" span="1" />
        <col span="1" />
        <col id="displacement-col" span="2" />
        <col id="income-col" span="5" />
    </colgroup>

    <tr>
        <th>Satisfaction</th>
        <th>Total</th>
        <th>Still displaced</th>
        <th>Back in home</th>
        <th>&lt;$50k</th>
        <th>$50&ndash;74k</th>
        <th>$75&ndash;99k</th>
        <th>$100&ndash;149k</th>
        <th>&gt;$150k</th>
    </tr>
    <tr>
        <td>Very sat.</td>
        <td class="data-satisfied"><sup>B</sup>7%</td>
        <td>3%</td>
        <td>12%</td>
        <td>4%</td>
        <td>7%</td>
        <td>9%</td>
        <td>10%</td>
        <td>10%</td>
    </tr>
    <tr>
        <td>Somewhat sat.</td>
        <td class="data-satisfied"><sup>B</sup>31%</td>
        <td>22%</td>
        <td>41%</td>
        <td>34%</td>
        <td>31%</td>
        <td>27%</td>
        <td>34%</td>
        <td>33%</td>
    </tr>
    <tr>
        <td>Somewhat dissat.</td>
        <td class="data-dissatisfied"><sup>A</sup>30%</td>
        <td class="data-displaced"><sup>C</sup>35%</td>
        <td class="data-back-home"><sup>D</sup>25%</td>
        <td>33%</td>
        <td>25%</td>
        <td>32%</td>
        <td>28%</td>
        <td>28%</td>
    </tr>
    <tr>
        <td>Very dissat.</td>
        <td class="data-dissatisfied"><sup>A</sup>31%</td>
        <td class="data-displaced"><sup>C</sup>41%</td>
        <td class="data-back-home"><sup>D</sup>22%</td>
        <td>29%</td>
        <td>38%</td>
        <td>33%</td>
        <td>28%</td>
        <td>28%</td>
    </tr>
</table>

<div class="box quote">
    &ldquo;On the whole, current and former displaced residents surveyed by Monmouth University tend to be more dissatisfied <mark class="data-satisfied">(61%)</mark><sup>A</sup> than satisfied <mark class="data-dissatisfied">(38%)</mark><sup>B</sup> with New Jersey's recovery efforts so far.

    <p>Residents who continue to be displaced <mark class="data-displaced">(76%)</mark><sup>C</sup> are much more negative about these efforts than those who are now back in their homes <mark class="data-back-home">(47%)</mark><sup>D</sup>.</p>

    <p>By contrast, fully <mark>76%</mark> of all New Jerseyans said they were satisfied with the state's recovery efforts according to a September Monmouth University Poll [sic].&rdquo;</p>
</div>

<h3 id="helped-forgotten">The Helped and The Forgotten</h3>

<table>
    <caption>
        (Table 5.) Which of the following best describes your feelings about New Jersey's recovery effort? "The recovery effort is focused on helping people like me" OR "people like me have largely been forgotten in the recovery effort"?
    </caption>

    <colgroup>
        <col id="status-col" span="1" />
        <col span="1" />
        <col id="displacement-col" span="2" />
        <col id="income-col" span="5" />
    </colgroup>

    <tr>
        <th>Feeling</th>
        <th>Total</th>
        <th>Still displaced</th>
        <th>Back in home</th>
        <th>&lt;$50k</th>
        <th>$50&ndash;74k</th>
        <th>$75&ndash;99k</th>
        <th>$100&ndash;149k</th>
        <th>&gt;$150k</th>
    </tr>
    <tr>
        <td>Helped</td>
        <td class="data-helped"><sup>D</sup>25%</td>
        <td>15%</td>
        <td>36%</td>
        <td>26%</td>
        <td>24%</td>
        <td>24%</td>
        <td>29%</td>
        <td>21%</td>
    </tr>
    <tr>
        <td>Forgotten</td>
        <td class="data-forgotten"><sup>A</sup>75%</td>
        <td class="data-forgotten-displaced"><sup>B</sup>85%</td>
        <td class="data-forgotten-back-home"><sup>C</sup>64%</td>
        <td>74%</td>
        <td>76%</td>
        <td>76%</td>
        <td>71%</td>
        <td>79%</td>
    </tr>
</table>

<div class="box quote">
    &ldquo;Among impacted residents in the panel survey, the vast majority <mark class="data-forgotten">(75%)</mark><sup>A</sup> say that people like them have largely been forgotten in the recovery effort---including <mark class="data-forgotten-displaced">(85%)</mark><sup>B</sup> of those still displaced and <mark class="data-forgotten-back-home">(64%)</mark><sup>C</sup> of those who have returned to their homes. Only <mark class="data-helped">(25%)</mark><sup>D</sup> of those surveyed feel that the state's recovery effort has focused on helping them.

    <p>&lsquo;The Sandy recovery effort is certainly a tale of two states. New Jerseyans who were displaced by the storm, even if they are now back in their homes, are significantly more negative than other Garden State residents about the pace and focus of recovery,&rsquo; said Patrick Murray, director for the Monmouth University Polling Institute, which is conducting the ongoing study under a grant from the New Jersey Recovery Fund.&rdquo;</p>
</div>

Read [the full report][report], which contains even more information and findings.

I have made more readabale---but more important *exportable*---version of some of the tables in the survey are available [here][docs]. I haven't double-checked the values, so make sure to do so before using the tables yourself. You are free to use my redesign of the spreadsheets from Google Docs as you see fit; you'll have to ask the Monmouth University Polling Institute about what you can do with their data, though.


[report]: http://www.monmouth.edu/assets/0/32212254770/32212254991/32212254992/32212254994/32212254995/30064771087/e3a9c1b9-dd05-430b-adab-5dfd4b7afede.pdf
[calculate]: http://www.surveysystem.com/sscalc.htm
[docs]: https://docs.google.com/spreadsheet/pub?key=0AvkGuyQUGsRHdF9zaXlIYXlfSzhjeXdSZTFnd2JRR1E&output=html
