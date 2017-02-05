var graphyConst = function() {
    // Constant variables
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

    return {
        getWidth: function() {
            return CVS_WIDTH;
        },
        getHeight: function() {
            return CVS_HEIGHT;
        },
        getVerticalName: function() {
            return VERTICAL_NAME;
        },
        getHorizontalName: function() {
            return HORIZONTAL_NAME;
        },
        getMaxXUnit: function() {
            return MAX_X_UNIT;
        },
        getMinXUnit: function() {
            return MIN_X_UNIT;
        },
        getMaxYUnit: function() {
            return MAX_Y_UNIT;
        },
        getMinYUnit: function() {
            return MIN_Y_UNIT;
        },
        getIntervalUnit: function() {
            return INTERVAL_UNIT;
        },
        getMarginPixel: function() {
            return MARGIN_PX;
        },
        getPaddingPixel: function() {
            return PADDING_PX;
        },
        getArrowSizePixel: function() {
            return ARROW_SZ_PX;
        },
        getPointRadiusPixel: function() {
            return POINT_RAD_PX;
        },
        getMainColor: function() {
            return MAIN_COLOR;
        },
        getPolynomialSegment: function() {
            return POLY_SEGMENT;
        },
        getID: function() {
            return ID;
        }
    }
}