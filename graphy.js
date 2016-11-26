var graphy = function(dom, data) {
    // CONSTANT variable
    var CANVAS_DEFAULTWIDTH = 500;
    var CANVAS_DEFAULT_HEIGHT = 500;

    // Process input data
    var id = data && data.id ? data.id : 'graphy.js_' + Date.now();
    var height = data && data.height ? data.height : CANVAS_DEFAULT_HEIGHT;
    var width = data && data.width ? data.width : CANVAS_DEFAULTWIDTH;
    var canvas = setCanvas(id, height, width);

    /**
     * Set canvas
     */
    function setCanvas() {
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