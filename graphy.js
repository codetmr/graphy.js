var graphy = function(dom, data) {
    // CONSTANT variable
    var CVS_WIDTH = 500;
    var CVS_HEIGHT = 500;
    var VERTICAL_NAME = 'y';
    var HORIZONTAL_NAME = 'x';
    var MAX_X_UNIT = 5;
    var MIN_X_UNIT = -5;
    var MAX_Y_UNIT = 5;
    var MIN_Y_UNIT = -5;
    var INTERVAL_UNIT = 1;
    var MARGIN_PX = 10;
    var PADDING_PX = 15;
    var ARROW_SZ_PX = 5;
    var POINT_RAD_PX = 2;
    var MAIN_COLOR = "#000";
    var POLY_SEGMENT = 0.1;
    var ID = 'graphy.js_' + Date.now();

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
    var divisionX = (CVS_WIDTH - 2 * MARGIN_PX - 2 * PADDING_PX) / (MAX_X_UNIT - MIN_X_UNIT);
    var divisionY = (CVS_HEIGHT - 2 * MARGIN_PX - 2 * PADDING_PX) / (MAX_Y_UNIT - MIN_Y_UNIT);
    var originY = null;
    if (MAX_Y_UNIT > 0 && MIN_Y_UNIT < 0) {
        originY = MARGIN_PX + PADDING_PX + divisionY * MAX_Y_UNIT;
    }
    var originX = null;
    if (MAX_X_UNIT > 0 && MIN_X_UNIT < 0) {
        originX = MARGIN_PX + PADDING_PX + divisionX * Math.abs(MIN_X_UNIT);
    }

    // Canvas Setup
    var canvas = setEmptyCanvas();
    var context = canvas.getContext("2d");

    initializeAxes();
    drawGraph();

    /**
     * Draw Graph according to the input from user
     * @return {[type]} [description]
     */
    function drawGraph() {
        if (data) {
            if (data.points) {
                for (var i = 0; i < data.points.length; i++) {
                    if (data.points[i].x &&  data.points[i].y) {
                        var _x = unitToPixel(data.points[i].x, 'x');
                        var _y = unitToPixel(data.points[i].y, 'y');
                        plotPointCircle(_x, _y);
                    }
                }
            }

            if (data.polynomials) {
                for (var i = 0; i < data.polynomials.length; i++) {
                    if (data.polynomials[i].para) {
                        var para = data.polynomials[i].para;
                        var rangeX = data.polynomials[i].rangeX;
                        var rangeY = data.polynomials[i].rangeY;
                        var startX = MIN_X_UNIT;
                        var endX = MAX_X_UNIT;
                        if (rangeX) {
                            if (rangeX[0] && startX < rangeX[0]) {
                                startX = rangeX[0];
                            }
                            if (rangeX[1] && endX > rangeX[1]) {
                                endX = rangeX[1];
                            }
                        }

                        // Linear polynomials
                        if (para.length === 2) {
                            var startY = para[0] * startX + para[1];
                            var endY = para[0] * endX + para[1];

                            var _x1 = unitToPixel(startX, 'x');
                            var _x2 = unitToPixel(endX, 'x');
                            var _y1 = unitToPixel(startY, 'y');
                            var _y2 = unitToPixel(endY, 'y');
                            drawSolidLine(_x1, _y1, _x2, _y2);
                        } else if (para.length > 2) {
                            var segment = data.polynomials[i].segment ?
                                parseFloat(data.polynomials[i]) : POLY_SEGMENT;
                            drawPoly(startX, endX, para, segment);
                        }
                    }
                }
            }
        }
    }

    /**
     * Function to draw polynomials
     * @param  {[type]} startX [description]
     * @param  {[type]} endX   [description]
     * @param  {[type]} para   [description]
     * @return {[type]}        [description]
     */
    function drawPoly(startX, endX, para, segment) {
        if (segment <= 0) {
            console.log('Segment is not positive');
            return;
        }

        var prevX = startX;
        var prevY = 0;
        for (var i = 0; i < para.length; i++) {
            var power = para.length - i - 1;
            prevY += para[i] * Math.pow(prevX, power);
        }

        while (prevX < endX) {
            nextX = prevX + segment;
            var nextY = 0;
            for (var i = 0; i < para.length; i++) {
                var power = para.length - i - 1;
                nextY += para[i] * Math.pow(nextX, power);
            }

            var _x1 = unitToPixel(prevX, 'x');
            var _x2 = unitToPixel(nextX, 'x');
            var _y1 = unitToPixel(prevY, 'y');
            var _y2 = unitToPixel(nextY, 'y');
            drawSolidLine(_x1, _y1, _x2, _y2);

            prevX = nextX;
            prevY = nextY;
        }
    }

    /**
     * Initialize Axes
     * @return {[type]} [description]
     */
    function initializeAxes() {
        // Draw Axes if necessary
        if (originY) {
            drawSolidLine(MARGIN_PX, originY, CVS_WIDTH - MARGIN_PX, originY);

            // Draw the arrow head
            drawSolidLine(CVS_WIDTH - MARGIN_PX, originY, CVS_WIDTH - MARGIN_PX - ARROW_SZ_PX, originY - ARROW_SZ_PX);
            drawSolidLine(CVS_WIDTH - MARGIN_PX, originY, CVS_WIDTH - MARGIN_PX - ARROW_SZ_PX, originY + ARROW_SZ_PX);
            context.fillText(
                HORIZONTAL_NAME, CVS_WIDTH - MARGIN_PX, originY - MARGIN_PX
                );
        }
        if (originX) {
            drawSolidLine(originX, MARGIN_PX, originX, CVS_HEIGHT - MARGIN_PX);

            // Draw the arrow head
            drawSolidLine(originX, MARGIN_PX, originX - ARROW_SZ_PX, MARGIN_PX + ARROW_SZ_PX);
            drawSolidLine(originX, MARGIN_PX, originX + ARROW_SZ_PX, MARGIN_PX + ARROW_SZ_PX);
            context.fillText(
                VERTICAL_NAME, originX + MARGIN_PX, MARGIN_PX
                );
        }
        context.fillText(0, originX + 5, originY + 15);

        // Draw the intervals
        for (var i = MIN_X_UNIT; i <= MAX_X_UNIT; i += INTERVAL_UNIT) {
            if (i != 0) {
                var _x = MARGIN_PX + PADDING_PX + (i - MIN_X_UNIT) * divisionX;
                drawSolidLine(_x, originY + 5, _x, originY - 5);
                context.fillText(i, _x, originY + 15);
            }
        }
        for (var i = MAX_Y_UNIT; i >= MIN_Y_UNIT; i -= INTERVAL_UNIT) {
            if (i != 0) {
                var _y = MARGIN_PX + PADDING_PX + (MAX_Y_UNIT - i) * divisionY;
                drawSolidLine(originX - 5, _y, originX + 5, _y);
                context.fillText(i, originX + 5, _y + 5);
            }
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
     * Plot Circle Point on canvas
     * @param  {[type]} x        [description]
     * @param  {[type]} y        [description]
     * @param  {[type]} selected [description]
     * @return {[type]}          [description]
     */
    function plotPointCross(x, y) {
        drawSolidLine(x - 5, y - 5, x + 5, y + 5);
        drawSolidLine(x - 5, y + 5, x + 5, y - 5);
    }

    /**
     * Plot Cross Point on canvas
     * @param  {[type]} x        [description]
     * @param  {[type]} y        [description]
     * @param  {[type]} selected [description]
     * @return {[type]}          [description]
     */
    function plotPointCircle(x, y) {
        context.beginPath();
        context.arc(x, y, POINT_RAD_PX, 0, 2*Math.PI);
        context.fill();
        context.stroke();
        context.fillStyle = MAIN_COLOR;
        context.strokeStyle = MAIN_COLOR;
    }

    function unitToPixel(unit, direction) {
        unit = parseFloat(unit);
        if (direction === 'x') {
            return MARGIN_PX + PADDING_PX + (unit - MIN_X_UNIT) * divisionX;
        } else if (direction === 'y') {
            return MARGIN_PX + PADDING_PX + (MAX_Y_UNIT - unit) * divisionY;
        } else {
            console.log('Direction is not defined');
        }
    }

    /**
     * Set empty canvas
     */
    function setEmptyCanvas() {
        var _canvas = document.getElementById(id);
        if (_canvas == null) {
            _canvas = graphyCreateElement('canvas', id, null, '', dom);
        }

        _canvas.width = CVS_WIDTH;
        _canvas.height = CVS_HEIGHT;
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

    // Public Object APIs
    return {
        setup: function(data) {
            if (data != null) {
                
            }
        },
        plotPoint: function(x, y, shape) {
            if (x == null || y == null) {
                var _x = unitToPixel(x, 'x');
                var _y = unitToPixel(y, 'y');

                if (shape === 'cross') {
                    plotPointCircle(_x, _y);
                } else {
                    plotPointCross(_x, _y);
                }
            }
        },
        drawPoly: function(para, rangeX) {
            if (para != null) {
                var startX = MIN_X_UNIT;
                var endX = MAX_X_UNIT;
                if (rangeX) {
                    if (rangeX[0] && startX < rangeX[0]) {
                        startX = rangeX[0];
                    }
                    if (rangeX[1] && endX > rangeX[1]) {
                        endX = rangeX[1];
                    }
                }

                // Linear polynomials
                if (para.length === 2) {
                    var startY = para[0] * startX + para[1];
                    var endY = para[0] * endX + para[1];

                    var _x1 = unitToPixel(startX, 'x');
                    var _x2 = unitToPixel(endX, 'x');
                    var _y1 = unitToPixel(startY, 'y');
                    var _y2 = unitToPixel(endY, 'y');
                    drawSolidLine(_x1, _y1, _x2, _y2);
                } else if (para.length > 2) {
                    var segment = data.polynomials[i].segment ?
                        parseFloat(data.polynomials[i]) : POLY_SEGMENT;
                    drawPoly(startX, endX, para, segment);
                }
            }
        }
    }
}