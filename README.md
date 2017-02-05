### Introduction

Graphy.js is a Javascript library to draw 2D graph on browsers. The main drawing technology is based on HTML5 canvas.

Graphy.js main features (updated):

  - Setup & display 2D graph functions with APIs
  - User interactions with graph, i.e drawing, sketching via onscreen tools

### Installation

Graphy.js requires javascript source file build/graphy.min.js. Check out or download source code from this project.

  - HTML
```html
<head>
    <script src='graphy.min.js'></script>
</head>
```

  - Javascript
```js
var div = document.getElementById('graph');
var graph = graphy(div);
```

### APIs



### Roadmap

APIs for basic 2D graph functions. This includes APIs for:
 - Setting up & displaying points, lines, polynomials, circles, trigonometric functions & transcendental functions.
 - Importing and Exporting data for the graph, in JSON, for storing & restoring.

On screen tools for drawings. This includes tools for:
 - Setting points, sketching lines, free hand drawing
 - Input Text Enabled. Apply Mathquill for nice math rendering
 - State saving, undo & redo snapshots.
 
### License
MIT

   [git-repo-url]: <https://github.com/quangphuc789/graphy.js>
