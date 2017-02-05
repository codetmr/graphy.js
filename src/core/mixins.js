function unitToPixel(unit, direction, marginPx, paddingPx, min_x_unit, max_y_unit, divisionX, divisionY) {
    unit = parseFloat(unit);
    if (direction === 'x') {
        return marginPx + paddingPx + (unit - min_x_unit) * divisionX;
    } else if (direction === 'y') {
        return marginPx + paddingPx + (max_y_unit - unit) * divisionY;
    } else {
        console.log('Direction is not defined');
    }
}

/**
 * Set empty canvas
 */
function setEmptyCanvas(_id, _dom, _witdh, _height) {
    var _canvas = document.getElementById(_id);
    if (_canvas == null) {
        _canvas = graphyCreateElement('canvas', _id, null, '', _dom);
    }

    _canvas.width = _witdh;
    _canvas.height = _height;
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