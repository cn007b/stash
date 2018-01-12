Chrome
-

## [chrome-devtools](https://developers.google.com/web/tools/chrome-devtools)

````
// write in js this - and it'll be your break point
debugger;

$(selector)
$$(selector) // for collections
$x(xpath)
$0, $1 - $5 // history of inspections

// inspect in inspector tab
inspect(selector)

// log all events into console tab
monitorEvents($('h1'), 'mouse')
// mouse
// key
// touch
// control (resize, scroll, etc)
````

Sources tab -> XHR breakpoints = breakpoint for AJAX.