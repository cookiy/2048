(function() {
    if (typeof window.Element === "undefined" || "classList" in document.documentElement) {
        return;
    };

    var prototype = Array.prototype,
        push = prototype.push,
        splice = prototype.splice,
        join = prototype.join;

    function DOMTokenList(el) {
        this.el = el;
        var classes = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
            push.call(this, classes[i]);
        }
    };
    // 
    DOMTokenList.prototype = {
        add: function(token) {
            if (this.contains(token)) {
                return;
            };
            push.call(this, token);
            this.el.className = this.toString();
        },
        contains: function(token) {
            return this.el.className.indexOf(token) != -1;
        },
        item: function(index) {
            return this[index] || null;
        },
        remove: function(token) {
            // body...
        },
        toString: function() {
            // body...
        },
        toggle: function(token) {
            // body...
        }
    }
})();