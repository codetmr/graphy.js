/**
 * Plot Point on canvas
 * @param  {[type]} x        [description]
 * @param  {[type]} y        [description]
 * @param  {[type]} selected [description]
 * @return {[type]}          [description]
 */
function graphyPlotPoint(context, x, y, color, shape) {
    if (shape == null || shape == 'cross') {
        graphyDrawSolidLine(context, x - 5, y - 5, x + 5, y + 5);
        graphyDrawSolidLine(context, x - 5, y + 5, x + 5, y - 5);
    } else if (shape == 'circle' || shape == 'point') {
        context.beginPath();
        context.arc(x, y, POINT_RAD_PX, 0, 2*Math.PI);
        context.fill();
        context.stroke();
        context.fillStyle = color;
        context.strokeStyle = color;
    }
}

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
        graphyDrawSolidLine(context, _x1, _y1, _x2, _y2);

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
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.closePath();                
    context.stroke();
    context.strokeStyle = color;
}