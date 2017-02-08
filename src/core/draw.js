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

/**
 * Function to draw polynomials
 * @param  {[type]} startX [description]
 * @param  {[type]} endX   [description]
 * @param  {[type]} para   [description]
 * @return {[type]}        [description]
 */
function graphyDrawPoly(context, startX, endX, para, segment) {
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