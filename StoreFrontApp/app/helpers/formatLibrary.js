'use strict';

/*
    formatMoney
    ===================================================
    Helper function to format a number as money.

    @param places: decimal places to round to
    @param (optional, default = '.') dot: the character to use for the decimal
    "dot"
    @param: (optional, default = ',') comma: the character to use for the
    thousands separator

    Usage: (1.245).formatMoney(2);

    @return float (formatted as currency)
*/
Number.prototype.formatMoney = function(places, dot, comma) {
    var n = this,
        places = isNaN(places = Math.abs(places)) ? 2 : places,
        dot = dot === undefined ? "." : dot,
        comma = comma === undefined ? "," : comma,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(places))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + comma : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + comma) + (places ? dot + Math.abs(n - i).toFixed(places).slice(2) : "");
 };
