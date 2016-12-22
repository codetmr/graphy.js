# Graphy.js

### Introduction

Graphy.js is a web & mobile friendly Javascript library to draw 2D graph on browsers. The main drawing technology is based on HTML5 canvas. Developed by 
Graphy.js main visions:

  - Setup & display 2D graph functions nicely with APIs
  - User interactions with graph, i.e drawing, sketching via onscreen tools
  - Marking features for user input graph functions

### Installation

Graphy.js requires javascript source file graphy.js. Check out or download source code from this project.

  - HTML
```html
<head>
    <script src='graphy.js'></script>
</head>
```

  - Javascript
```js
var div = document.getElementById('graph');
var graph = graphy(div);
```

### APIs



### Roadmap

##### End of 2016:
APIs for basic 2D graph functions. This includes APIs for:
 - Setting up & displaying points, lines, polynomials, circles, trigonometric functions & transcendental functions.
 - Importing and Exporting data for the graph, in JSON, for storing & restoring.

##### March of 2017:
On screen tools for drawings. This includes tools for:
 - Setting points, sketching lines, free hand drawing
 - Input Text Enabled. Apply Mathquill for nice math rendering
 - State saving, undo & redo snapshots.

##### June of 2017:
Marking tool for drawings. Marking abilities:
 - Feedback of correctness of the drawing.
 - Pointing out the location of mistakes.
 - Giving hints for self accomplishment.
 
### License
MIT

   [git-repo-url]: <https://github.com/quangphuc789/graphy.js>
