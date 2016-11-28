var graphy = function(dom, data) {
    // CONSTANT variable
    var CANVAS_DEFAULT_WIDTH = 500;
    var CANVAS_DEFAULT_HEIGHT = 500;
    var DEFAULT_VERTICAL_NAME = 'y';
    var DEFAULT_HORIZONTAL_NAME = 'x';
    var DEFAULT_MAX_X = 5;
    var DEFAULT_MIN_X = -5;
    var DEFAULT_MAX_Y = 5;
    var DEFAULT_MIN_Y = -5;
    var DEFAULT_INTERVAL = 1;
    var MARGIN = 10;
    var PADDING = 10;
    var ARROW_SIZE = 5;
    var POINT_CIRCLE_RADIUS = 2;
    var MAIN_COLOR = "#000";

    // Process input data
    var id = data && data.id ? data.id : 'graphy.js_' + Date.now();
    var verticalName = data && data.verticalName ? data.verticalName : DEFAULT_VERTICAL_NAME;
    var horizontalName = data && data.horizontalName ? data.horizontalName : DEFAULT_HORIZONTAL_NAME;
    var height = data && data.height ? data.height : CANVAS_DEFAULT_HEIGHT;
    var width = data && data.width ? data.width : CANVAS_DEFAULT_WIDTH;
    var xMax = data && data.xMax ? parseInt(data.xMax) : DEFAULT_MAX_X;
    var xMin = data && data.xMin ? parseInt(data.xMin) : DEFAULT_MIN_X;
    var yMax = data && data.yMax ? parseInt(data.yMax) : DEFAULT_MAX_Y;
    var yMin = data && data.yMin ? parseInt(data.yMin) : DEFAULT_MIN_Y;
    var interval = data && data.interval ? data.interval : DEFAULT_INTERVAL;

    // Primary check for data
    if (xMax < xMin) {
        console.log("Error: Wrong input for x boundaries");
        return;
    }

    if (yMax < yMin) {
        console.log("Error: Wrong input for y boundaries");
        return;
    }

    // Process graph position data
    var divisionX = (width - 2 * MARGIN - 2 * PADDING) / (xMax - xMin);
    var divisionY = (height - 2 * MARGIN - 2 * PADDING) / (yMax - yMin);
    var originY = null;
    if (yMax > 0 && yMin < 0) {
        originY = MARGIN + PADDING + divisionY * yMax;
    }
    var originX = null;
    if (xMax > 0 && xMin < 0) {
        originX = MARGIN + PADDING + divisionX * Math.abs(xMin);
    }

    // Canvas Setup
    var canvas = setEmptyCanvas();
    var context = canvas.getContext("2d");

    initializeAxes();

    function initializeAxes() {
        // Draw Axes if necessary
        if (originY) {
            drawSolidLine(MARGIN, originY, width - MARGIN, originY);

            // Draw the arrow head
            drawSolidLine(width - MARGIN, originY, width - MARGIN - ARROW_SIZE, originY - ARROW_SIZE);
            drawSolidLine(width - MARGIN, originY, width - MARGIN - ARROW_SIZE, originY + ARROW_SIZE);
            context.fillText(
                horizontalName, width - MARGIN, originY - MARGIN
                );
        }
        if (originX) {
            drawSolidLine(originX, MARGIN, originX, height - MARGIN);

            // Draw the arrow head
            drawSolidLine(originX, MARGIN, originX - ARROW_SIZE, MARGIN + ARROW_SIZE);
            drawSolidLine(originX, MARGIN, originX + ARROW_SIZE, MARGIN + ARROW_SIZE);
            context.fillText(
                verticalName, originX + MARGIN, MARGIN
                );
        }

        // Draw the intervals
        for (var i = xMin; i <= xMax; i += interval) {
            plotPointCircle(MARGIN + PADDING + (i - xMin) * divisionX, originY);
        }
        for (var i = yMin; i <= yMax; i += interval) {
            plotPointCircle(originX, MARGIN + PADDING + (i - yMin) * divisionY);
        }
    }

    // Draw the solid lines.
    function drawSolidLine(fromX, fromY, toX, toY) {
        context.beginPath();
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.closePath();                
        context.stroke();
        context.strokeStyle = MAIN_COLOR;
    }

    /**
     * Plot Circle on canvas
     * @param  {[type]} x        [description]
     * @param  {[type]} y        [description]
     * @param  {[type]} selected [description]
     * @return {[type]}          [description]
     */
    function plotPointCircle(x, y) {
        context.beginPath();
        context.arc(x, y, POINT_CIRCLE_RADIUS, 0, 2*Math.PI);
        context.fill();
        context.stroke();
        context.fillStyle = MAIN_COLOR;
        context.strokeStyle = MAIN_COLOR;
    }

    /**
     * Set empty canvas
     */
    function setEmptyCanvas() {
        var _canvas = document.getElementById(id);
        if (_canvas == null) {
            _canvas = graphyCreateElement('canvas', id, null, '', dom);
        }

        _canvas.width = width;
        _canvas.height = height;
        _canvas.style.border = '1px solid lightgray';
        _canvas.getContext("2d").font = "12px verdana";
        return _canvas;
    }

    /**
     * Create new element, with info, and append to parent.
     * @param  {String} _dom       Dom element tag name
     * @param  {String} _id        ID field
     * @param  {String} _classname Class field
     * @param  {String} _html      Inner HTML field
     * @param  {DOM}    _parent    Parent DOM
     * @return {DOM}               Newly created DOM
     */
    function graphyCreateElement(_dom, _id, _classname, _html, _parent) {
        var _dom = document.createElement(_dom);
        if (_id != null) {
            _dom.id = _id;
        }
        if (_classname != null) {
            _dom.className = _classname;
        }
        if (_html != null) {
            _dom.innerHTML = _html;
        }
        if (_parent != null) {
            _parent.appendChild(_dom);
        }
        return _dom;
    }
}