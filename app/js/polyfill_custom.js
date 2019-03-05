// Element.prototype.matches
   Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {
    
    var element = this;
    var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
    var index = 0;

    while (elements[index] && elements[index] !== element) {
        ++index;
    }

    return !!elements[index];
};

// Element.prototype.closest
Element.prototype.closest = function closest(selector) {
    var node = this;

    while (node) {
        if (node.matches(selector)) return node;
        else node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement;
    }

    return null;
};