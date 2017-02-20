### Introduction

Graphy.js is a Javascript library to display 2D graph functions on browsers. The main drawing technology is based on HTML5 canvas.

### Installation

Graphy.js requires javascript source file build/graphy.min.js. Git checkout or download source code from this project. Alternatively, you can include the file directly from my build repo.

  - HTML
```html
<head>
    <script src='http://www.quangphuc789.com/graphy.js/build/graphy.min.js'></script>
</head>
```

  - Javascript
```js
var div = document.getElementById('graph');
var graph = graphy(div);
```

Note that, initialising graphy takes 2 parameters, the second is optional:
  - Javascript
```js
var div = document.getElementById('graph');
var data = {
    id: '',             // Id of the graph object. Optional.
    verticalName: '',   // default 'y'
    horizontalName: '', // default 'x'
    height: '',         // of canvas, in pixels, default 500px
    width: '',          // of canvas, in pixels, default 500px
    xMax: '',           // of graph, in units, default +5
    xMin: '',           // of graph, in units, default -5
    yMax: '',           // of graph, in units, default +5
    yMin: '',           // of graph, in units, default -5
    interval: '',       // of graph, in units, default 1
}
var graph = graphy(div, data);
```

### APIs

```
point: function(x, y, shape)
    x: horizontal unit position.
    y: vertical unit position.
    shape: 'cross' or 'circle'. Optional. Default 'cross'.

    e.g: graph.point(1,2)

```
```

line: function(start, end)
    start: [x, y]. Units of start point.
    end: [x, y]. Units of end point.

    e.g: graph.line([-4, -3], [3, 3])

```
```

poly: function(para, rangeX)
    para: [a1, a2, ...]. List of all factors, from highest order to 0. Requires all orders.
    rangeX: [x1, x2]. Start and end horizontal position, in units. Optional.

    e.g: graph.poly([1, 0, 0], [-2, 2]). This is for y = x^2

```
```

circle: function(center, radius)
    center: [x, y]. Position of the center in units.
    radius: radius of the circle in units.

    e.g: graph.circle([3, -2], 2)

```
```

sin: function(mag, rangeX)
    mag: magnitude of the sine function, in units.
    rangeX: [x1, x2]. Start and end horizontal position, in units. Optional.

    e.g: graph.sin(2)

```
```

cos: function(mag, rangeX)
    mag: magnitude of the cosine function, in units.
    rangeX: [x1, x2]. Start and end horizontal position, in units. Optional.

    e.g: graph.cos(2)

```
```

tan: function(mag, rangeX)
    mag: magnitude of the tangent function, in units.
    rangeX: [x1, x2]. Start and end horizontal position, in units. Optional.

    e.g: graph.tan(1)

```
```

cot: function(mag, rangeX)
    mag: magnitude of the cotangent function, in units.
    rangeX: [x1, x2]. Start and end horizontal position, in units. Optional.

    e.g: graph.cot(1)

```
```
log: function(base, max)
    mag: base of the logarithm function, in units. Optional. Default 'e'.
    max: x. Max horizontal position, in units. Optional.

    e.g: graph.log()

```

### Roadmap

APIs for basic 2D graph functions. This includes APIs for setting up & displaying:
 - Points
 - Lines
 - Polynomials
 - Circles
 - Trigonometric functions
 - Transcendental functions.
 - Input Text Enabled. Apply Mathquill for nice math rendering
 
### License
MIT

   [git-repo-url]: <https://github.com/quangphuc789/graphy.js>
