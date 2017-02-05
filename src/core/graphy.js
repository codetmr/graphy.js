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

    // Canvas Setup
    var canvas = setEmptyCanvas(ID, dom, CVS_WIDTH, CVS_HEIGHT);
    var context = canvas.getContext("2d");
    var divisionX = null;
    var divisionY = null;
    var originY = null;
    var originX = null;

    init();

    /**
     * Initialize Axes
     * @return {[type]} [description]
     */
    function init() {
        // Process graph position data
        divisionX = (CVS_WIDTH - 2 * MARGIN_PX - 2 * PADDING_PX) / (MAX_X_UNIT - MIN_X_UNIT);
        divisionY = (CVS_HEIGHT - 2 * MARGIN_PX - 2 * PADDING_PX) / (MAX_Y_UNIT - MIN_Y_UNIT);
        originY = null;
        if (MAX_Y_UNIT > 0 && MIN_Y_UNIT < 0) {
            originY = MARGIN_PX + PADDING_PX + divisionY * MAX_Y_UNIT;
        }
        originX = null;
        if (MAX_X_UNIT > 0 && MIN_X_UNIT < 0) {
            originX = MARGIN_PX + PADDING_PX + divisionX * Math.abs(MIN_X_UNIT);
        }

        // Draw Axes if necessary
        if (originY) {
            drawSolidLine(context, MARGIN_PX, originY, CVS_WIDTH - MARGIN_PX, originY, MAIN_COLOR);

            // Draw the arrow head
            drawSolidLine(context, 
                CVS_WIDTH - MARGIN_PX, originY, CVS_WIDTH - MARGIN_PX - ARROW_SZ_PX, originY - ARROW_SZ_PX);
            drawSolidLine(context, 
                CVS_WIDTH - MARGIN_PX, originY, CVS_WIDTH - MARGIN_PX - ARROW_SZ_PX, originY + ARROW_SZ_PX);
            context.fillText(
                HORIZONTAL_NAME, CVS_WIDTH - MARGIN_PX, originY - MARGIN_PX
                );
        }
        if (originX) {
            drawSolidLine(context, originX, MARGIN_PX, originX, CVS_HEIGHT - MARGIN_PX, MAIN_COLOR);

            // Draw the arrow head
            drawSolidLine(context, originX, MARGIN_PX, originX - ARROW_SZ_PX, MARGIN_PX + ARROW_SZ_PX, MAIN_COLOR);
            drawSolidLine(context, originX, MARGIN_PX, originX + ARROW_SZ_PX, MARGIN_PX + ARROW_SZ_PX, MAIN_COLOR);
            context.fillText(
                VERTICAL_NAME, originX + MARGIN_PX, MARGIN_PX
                );
        }
        context.fillText(0, originX + 5, originY + 15);

        // Draw the intervals
        for (var i = MIN_X_UNIT; i <= MAX_X_UNIT; i += INTERVAL_UNIT) {
            if (i != 0) {
                var _x = MARGIN_PX + PADDING_PX + (i - MIN_X_UNIT) * divisionX;
                drawSolidLine(context, _x, originY + 5, _x, originY - 5, MAIN_COLOR);
                context.fillText(i, _x, originY + 15);
            }
        }
        for (var i = MAX_Y_UNIT; i >= MIN_Y_UNIT; i -= INTERVAL_UNIT) {
            if (i != 0) {
                var _y = MARGIN_PX + PADDING_PX + (MAX_Y_UNIT - i) * divisionY;
                drawSolidLine(context, originX - 5, _y, originX + 5, _y, MAIN_COLOR);
                context.fillText(i, originX + 5, _y + 5);
            }
        }
    }

    // Public Object APIs
    return {
        setup: function(data) {
            if (data != null) {
                if (data.id) ID = data.id;
                if (data.verticalName) VERTICAL_NAME = data.verticalName;
                if (data.horizontalName) HORIZONTAL_NAME = data.horizontalName;
                if (data.height) CVS_HEIGHT = data.height;
                if (data.width) CVS_WIDTH = data.width;
                if (data.xMax) MAX_X_UNIT = parseInt(data.xMax);
                if (data.xMin) MIN_X_UNIT = parseInt(data.xMin);
                if (data.yMax) MAX_Y_UNIT = parseInt(data.yMax);
                if (data.yMin) MIN_Y_UNIT = parseInt(data.yMin);
                if (data.interval) INTERVAL_UNIT = data.interval;

                // Primary check for data
                if (MAX_X_UNIT < MIN_X_UNIT) {
                    console.log("Error: Wrong input for x boundaries");
                    return;
                }

                if (MAX_Y_UNIT < MIN_Y_UNIT) {
                    console.log("Error: Wrong input for y boundaries");
                    return;
                }

                init();
            }
        },
        plotPoint: function(x, y, shape) {
            if (x != null && y != null) {
                var _x = unitToPixel(x, 'x', MARGIN_PX, PADDING_PX, MIN_X_UNIT, MAX_Y_UNIT, divisionX, divisionY);
                var _y = unitToPixel(y, 'y', MARGIN_PX, PADDING_PX, MIN_X_UNIT, MAX_Y_UNIT, divisionX, divisionY);
                if (shape === 'cross') {
                    plotPointCircle(context, _x, _y, MAIN_COLOR);
                } else {
                    plotPointCross(context, _x, _y);
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

                    var _x1 = unitToPixel(
                        startX, 'x', MARGIN_PX, PADDING_PX, MIN_X_UNIT, MAX_Y_UNIT, divisionX, divisionY);
                    var _x2 = unitToPixel(
                        endX, 'x', MARGIN_PX, PADDING_PX, MIN_X_UNIT, MAX_Y_UNIT, divisionX, divisionY);
                    var _y1 = unitToPixel(
                        startY, 'y', MARGIN_PX, PADDING_PX, MIN_X_UNIT, MAX_Y_UNIT, divisionX, divisionY);
                    var _y2 = unitToPixel(
                        endY, 'y', MARGIN_PX, PADDING_PX, MIN_X_UNIT, MAX_Y_UNIT, divisionX, divisionY);
                    drawSolidLine(context, _x1, _y1, _x2, _y2, MAIN_COLOR);
                } else if (para.length > 2) {
                    var segment = data.polynomials[i].segment ?
                        parseFloat(data.polynomials[i]) : POLY_SEGMENT;
                    drawPoly(context, startX, endX, para, segment);
                }
            }
        }
    }
}