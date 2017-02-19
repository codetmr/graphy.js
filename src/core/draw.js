/**
 * Plot Point on canvas
 * @param  {[type]} x        [description]
 * @param  {[type]} y        [description]
 * @param  {[type]} selected [description]
 * @return {[type]}          [description]
 */
function graphyPlotPoint(context, x, y, shape, meta) {
    if (shape == null || shape == 'cross') {
        graphyDrawSolidLine(context, x - 5, y - 5, x + 5, y + 5);
        graphyDrawSolidLine(context, x - 5, y + 5, x + 5, y - 5);
    } else if (shape == 'circle' || shape == 'point') {
        context.strokeStyle = meta.MAIN_COLOR;
        context.fillStyle = meta.MAIN_COLOR;
        context.beginPath();
        context.arc(x, y, meta.POINT_RAD_PX, 0, 2*Math.PI);
        context.fill();
        context.stroke();
    }
}

/**
 * Draw lines on canvas with 2 end points
 * @param  {[type]} context [description]
 * @param  {[type]} start   [description]
 * @param  {[type]} end     [description]
 * @param  {[type]} meta    [description]
 * @return {[type]}         [description]
 */
function graphyDrawLine(context, start, end, meta) {
    var startX = start[0];
    var endX = end[0];
    var startY = start[1];
    var endY = end[1];

    var _x1 = graphyUnitToPixel(startX, 'x', meta);
    var _x2 = graphyUnitToPixel(endX, 'x', meta);
    var _y1 = graphyUnitToPixel(startY, 'y', meta);
    var _y2 = graphyUnitToPixel(endY, 'y', meta);
    graphyDrawSolidLine(context, _x1, _y1, _x2, _y2, meta.MAIN_COLOR);
}

/**
 * Function to draw polynomials
 * @param  {[type]} startX [description]
 * @param  {[type]} endX   [description]
 * @param  {[type]} para   [description]
 * @return {[type]}        [description]
 */
function graphyDrawPoly(context, startX, endX, para, meta) {
    if (meta.POLY_SEGMENT <= 0) {
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
        nextX = prevX + meta.POLY_SEGMENT;
        var nextY = 0;
        for (var i = 0; i < para.length; i++) {
            var power = para.length - i - 1;
            nextY += para[i] * Math.pow(nextX, power);
        }

        var _x1 = graphyUnitToPixel(prevX, 'x', meta);
        var _x2 = graphyUnitToPixel(nextX, 'x', meta);
        var _y1 = graphyUnitToPixel(prevY, 'y', meta);
        var _y2 = graphyUnitToPixel(nextY, 'y', meta);
        graphyDrawSolidLine(context, _x1, _y1, _x2, _y2, meta.MAIN_COLOR);

        prevX = nextX;
        prevY = nextY;
    }
}

/**
 * Function to draw solid lines
 * @param  {[type]} fromX [description]
 * @param  {[type]} fromY [description]
 * @param  {[type]} toX   [description]
 * @param  {[type]} toY   [description]
 * @return {[type]}       [description]
 */
function graphyDrawSolidLine(context, fromX, fromY, toX, toY, color) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.closePath();                
    context.stroke();
}

/**
 * Function to draw circles
 * @param  {[type]} context [description]
 * @param  {[type]} centerX [description]
 * @param  {[type]} centerY [description]
 * @param  {[type]} radius  [description]
 * @param  {[type]} meta    [description]
 * @return {[type]}         [description]
 */
function graphyDrawCircle(context, centerX, centerY, radius, meta) {
    context.fillStyle = meta.MAIN_COLOR;
    context.strokeStyle = meta.MAIN_COLOR;context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2*Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(centerX, centerY, meta.POINT_RAD_PX, 0, 2*Math.PI);
    context.fill();
    context.stroke();
}

/**
 * Function to draw sine functions
 * @param  {[type]} context [description]
 * @param  {[type]} startX  [description]
 * @param  {[type]} endX    [description]
 * @param  {[type]} mag     [description]
 * @param  {[type]} meta    [description]
 * @return {[type]}         [description]
 */
function graphyDrawSine(context, startX, endX, mag, meta) {
    if (meta.POLY_SEGMENT <= 0) {
        console.log('Segment is not positive');
        return;
    }

    var prevX = startX;
    var prevY = null;
    var nextX = null;
    var nextY = null;

    while (prevX <= endX) {
        prevY = mag * Math.sin(prevX);
        nextX = prevX + meta.POLY_SEGMENT;
        nextY = mag * Math.sin(nextX);

        var _x1 = graphyUnitToPixel(prevX, 'x', meta);
        var _x2 = graphyUnitToPixel(nextX, 'x', meta);
        var _y1 = graphyUnitToPixel(prevY, 'y', meta);
        var _y2 = graphyUnitToPixel(nextY, 'y', meta);
        graphyDrawSolidLine(context, _x1, _y1, _x2, _y2, meta.MAIN_COLOR);

        prevX = nextX;
        prevY = nextY;
    }
}

/**
 * Function to draw cosine functions
 * @param  {[type]} context [description]
 * @param  {[type]} startX  [description]
 * @param  {[type]} endX    [description]
 * @param  {[type]} mag     [description]
 * @param  {[type]} meta    [description]
 * @return {[type]}         [description]
 */
function graphyDrawCosine(context, startX, endX, mag, meta) {
    if (meta.POLY_SEGMENT <= 0) {
        console.log('Segment is not positive');
        return;
    }

    var prevX = startX;
    var prevY = null;
    var nextX = null;
    var nextY = null;

    while (prevX <= endX) {
        prevY = mag * Math.cos(prevX);
        nextX = prevX + meta.POLY_SEGMENT;
        nextY = mag * Math.cos(nextX);

        var _x1 = graphyUnitToPixel(prevX, 'x', meta);
        var _x2 = graphyUnitToPixel(nextX, 'x', meta);
        var _y1 = graphyUnitToPixel(prevY, 'y', meta);
        var _y2 = graphyUnitToPixel(nextY, 'y', meta);
        graphyDrawSolidLine(context, _x1, _y1, _x2, _y2, meta.MAIN_COLOR);

        prevX = nextX;
        prevY = nextY;
    }
}

/**
 * Function to draw tangent functions
 * @param  {[type]} context [description]
 * @param  {[type]} startX  [description]
 * @param  {[type]} endX    [description]
 * @param  {[type]} mag     [description]
 * @param  {[type]} meta    [description]
 * @return {[type]}         [description]
 */
function graphyDrawTangent(context, startX, endX, mag, meta) {
    if (meta.POLY_SEGMENT <= 0) {
        console.log('Segment is not positive');
        return;
    }

    var prevX = startX;
    var prevY = null;
    var nextX = null;
    var nextY = null;

    while (prevX <= endX) {
        prevY = mag * Math.tan(prevX);
        nextX = prevX + meta.POLY_SEGMENT;
        nextY = mag * Math.tan(nextX);

        var _x1 = graphyUnitToPixel(prevX, 'x', meta);
        var _x2 = graphyUnitToPixel(nextX, 'x', meta);
        var _y1 = graphyUnitToPixel(prevY, 'y', meta);
        var _y2 = graphyUnitToPixel(nextY, 'y', meta);
        graphyDrawSolidLine(context, _x1, _y1, _x2, _y2, meta.MAIN_COLOR);

        prevX = nextX;
        prevY = nextY;
    }
}

/**
 * Function to draw cotangent functions
 * @param  {[type]} context [description]
 * @param  {[type]} startX  [description]
 * @param  {[type]} endX    [description]
 * @param  {[type]} mag     [description]
 * @param  {[type]} meta    [description]
 * @return {[type]}         [description]
 */
function graphyDrawCotantgent(context, startX, endX, mag, meta) {
    if (meta.POLY_SEGMENT <= 0) {
        console.log('Segment is not positive');
        return;
    }

    var prevX = startX;
    var prevY = null;
    var nextX = null;
    var nextY = null;

    while (prevX <= endX) {
        prevY = mag * Math.cot(prevX);
        nextX = prevX + meta.POLY_SEGMENT;
        nextY = mag * Math.cot(nextX);

        var _x1 = graphyUnitToPixel(prevX, 'x', meta);
        var _x2 = graphyUnitToPixel(nextX, 'x', meta);
        var _y1 = graphyUnitToPixel(prevY, 'y', meta);
        var _y2 = graphyUnitToPixel(nextY, 'y', meta);
        graphyDrawSolidLine(context, _x1, _y1, _x2, _y2, meta.MAIN_COLOR);

        prevX = nextX;
        prevY = nextY;
    }
}

/**
 * Function to draw cosine functions
 * @param  {[type]} context [description]
 * @param  {[type]} base    [description]
 * @param  {[type]} max     [description]
 * @param  {[type]} meta    [description]
 * @return {[type]}         [description]
 */
function graphyDrawLog(context, base, max, meta) {
    if (meta.POLY_SEGMENT <= 0) {
        console.log('Segment is not positive');
        return;
    }

    var prevX = meta.POLY_SEGMENT;
    var prevY = null;
    var nextX = null;
    var nextY = null;

    var denominator = 1;
    if (base != null && base != 'e') {
        denominator = Math.abs(base);
    }

    while (prevX <= max) {
        prevY = Math.log(prevX) / denominator;
        nextX = prevX + meta.POLY_SEGMENT;
        nextY = Math.log(nextX) / denominator;

        var _x1 = graphyUnitToPixel(prevX, 'x', meta);
        var _x2 = graphyUnitToPixel(nextX, 'x', meta);
        var _y1 = graphyUnitToPixel(prevY, 'y', meta);
        var _y2 = graphyUnitToPixel(nextY, 'y', meta);
        graphyDrawSolidLine(context, _x1, _y1, _x2, _y2, meta.MAIN_COLOR);

        prevX = nextX;
        prevY = nextY;
    }
}