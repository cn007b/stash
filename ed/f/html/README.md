HTML (HyperText Markup Language)
-
<br>5

````html
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<meta name="robots" content="noindex">

# refresh doc every 30 seconds
<meta http-equiv="refresh" content="30">
````

````html
rel="preload" - resources which you want to start loading early in the page lifecycle.
<link rel="preload" href="style.css" as="style">

link rel="preconnect" - hint to browsers that
the user is likely to need resources from the target resource's origin.
<link rel="preconnect" href="https://example.com">
````

````html
HTML5:
<address>  - contact information
<article>  - article
<aside>    - side block
<caption>  - table caption
<cite>     - title of a work
<details>  - additional details
<footer>   - footer
<header>   - header
<ins>      - inserted text
<main>     - main content
<nav>      - navigation
<section>  - section
<template> - holds its content hidden from the client
<time>     - time block
````

#### Special Characters

````html
&nbsp;       # space
&#34; &quot; # double quotes
&#38; &amp;  # &
&#60; &lt;   # <
&#62; &gt;   # >

# trik:
<table dir="ltr" border="1" cellspacing="0" cellpadding="0"><colgroup><col width="76"/><col width="90"/></colgroup><tbody><tr><td data-sheets-value="{&#34;1&#34;:2,&#34;2&#34;:&#34;Active&#34;}">Active</td><td data-sheets-value="{&#34;1&#34;:2,&#34;2&#34;:&#34;Betsy&#34;}">Betsyx</td></tr></tbody></table></textarea>

# 1 more trik:
<p>
<span data-sheets-value="{&#34;1&#34;:2,&#34;2&#34;:&#34;I would describe my style as a mix of classic elements with current items on trend. I let what i&#39;m reading at the moment influence how I see the world and that is often perceived through my style of the moment. &#34;}" 
data-sheets-userformat="{&#34;2&#34;:513,&#34;3&#34;:{&#34;1&#34;:0},&#34;12&#34;:0}">
<strong><span data-sheets-value="{&#34;1&#34;:2,&#34;2&#34;:&#34;Colorful, sporty and feminine always with a bit of vintage&#34;}" 
data-sheets-userformat="{&#34;2&#34;:513,&#34;3&#34;:{&#34;1&#34;:0},&#34;12&#34;:0}">The one trend she&#39;s keen on: </span></strong>
<span data-sheets-value="{&#34;1&#34;:2,&#34;2&#34;:&#34;Colorful, sporty and feminine always with a bit of vintage&#34;}" 
data-sheets-userformat="{&#34;2&#34;:513,&#34;3&#34;:{&#34;1&#34;:0},&#34;12&#34;:0}">
<span data-sheets-value="{&#34;1&#34;:2,&#34;2&#34;:&#34;Leather capris are on my radar &#34;}" 
data-sheets-userformat="{&#34;2&#34;:513,&#34;3&#34;:{&#34;1&#34;:0},&#34;12&#34;:0}">Leather capris are on my radar.</span></span></span>
</p>
````

#### Script

````html
<script src="demo_async.js" async defer></script>
````

`async` - script will be executed asynchronously
as soon as it is available (only for external scripts).

`defer` - script won't run until page loaded.

If neither `async` or `defer` is present - script is fetched and executed immediately,
before the browser continues parsing the page.

#### Microdata

````html
<span itemprop="name">Elizabeth</span>
````

#### Form

"multipart/form-data"

````html
<form action="file" method="post" enctype="multipart/form-data">
  <input type="text" id="msg" name="msg">
  <input type="file" id="file" name="file">
  <input type="submit" name="submit" value="Upload">
</form>
````
