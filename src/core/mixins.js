function graphyUnitToPixel(unit, direction, meta) {
    unit = parseFloat(unit);
    if (direction === 'x') {
        return meta.MARGIN_PX + meta.PADDING_PX + (unit - meta.MIN_X_UNIT) * meta.DIVISION_X;
    } else if (direction === 'y') {
        return meta.MARGIN_PX + meta.PADDING_PX + (meta.MAX_Y_UNIT - unit) * meta.DIVISION_Y;
    } else {
        console.log('Direction is not defined');
    }
}

/**
 * Set empty canvas
 */
function graphySetEmptyCanvas(meta, dom) {
    var _canvas = document.getElementById(meta.ID);
    if (_canvas == null) {
        _canvas = graphyCreateElement('canvas', meta.ID, null, '', dom);
    }

    _canvas.width = meta.CVS_WIDTH;
    _canvas.height = meta.CVS_HEIGHT;
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
function graphyCreateElement(dom, id, classname, html, parent) {
    var _dom = document.createElement(dom);
    if (id != null) {
        _dom.id = id;
    }
    if (classname != null) {
        _dom.className = classname;
    }
    if (html != null) {
        _dom.innerHTML = html;
    }
    if (parent != null) {
        parent.appendChild(_dom);
    }
    return _dom;
}