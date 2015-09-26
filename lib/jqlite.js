function $(selector) {
  var itemType = typeof selector;

  if (itemType == "function") {
    window.onload = selector;
  } else {
    function JQLite(elem, length) {
      this.element = elem;
      this.length = length || elem.length;
    }
    JQLite.prototype.html = function(newHTML) {
      if (newHTML === undefined) {
        return this.element[0].innerHTML;
      } else {
        return this.each(function() {
          this.innerHTML = newHTML;
        });
      }
    }
    JQLite.prototype.click = function(fn) {
      return this.each(function() {
        this.onclick = fn;
      });
    }
    JQLite.prototype.blur = function(fn) {
      return this.each(function() {
        this.onblur = fn;
      });
    }
    JQLite.prototype.focus = function(fn) {
      return this.each(function() {
        this.onfocus = fn;
      });
    }
    JQLite.prototype.append = function(newElem) {
      if (typeof newElem == "string") {
        newElem = document.createElement(newElem);
      }
      this.element.appendChild(newElem);
      return new JQLite(newElem);
    }
    JQLite.prototype.each = function(fn) {
      for (var x of Array.from(this.element)) {
        fn.call(x, x);
      }
      return this;
    }

    JQLite.prototype.parent = function() {
      return new JQLite([this.element[0].parent]);
    }
    JQLite.prototype.first = function() {
      var elem = this;
      if (this.length) {
        elem = new JQLite([this.element[0]]);
      }
      return elem;
    }
    JQLite.prototype.last = function() {
      var elem = this;
      if (this.length) {
        elem = new JQLite([this.element[this.length - 1]]);
      }
      return elem;
    }
    JQLite.prototype.get = function(num) {
      if (Math.abs(num) > this.length) {
        throw "bad error";
      }
      if (num < 0) {
        return new JQLite([this.element[this.length + num]]);
      } else {
        return new JQLite([this.element[num]]);
      }
    }

    JQLite.prototype.addClass = function(classname) {
      return this.each(function() {
        if (!this.className.match(classname)) {
          this.className += " " + classname;
        }
      });
    }
    JQLite.prototype.removeClass = function(classname) {
      return this.each(function() {
        this.className = this.className.replace(classname, "");
      });
    }
    JQLite.prototype.toggleClass = function(classname) {
      return this.each(function() {
        if (!this.className.match(classname)) {
          this.className += " " + classname;
        } else {
          this.className = this.className.replace(classname, "");
        }
      });
    }

    /*
    addAttr
    removeAttr
    value
    */

    /*
    change
    dlbclick
    hover
    submit
    */

    /*
    children
    toArray
    get(+-num)
    slice
    wrap
    unwrap
    appendTo
    prepend
    before
    after
    text

    replaceWith
    replaceAll
    data
    filter
    not
    hide
    */

    /*
    now()
    trim()
    isArray
    isFunction
    isNumeric
    each(object, fn)

    parseHTML
    stringify

    table
    */
    if (itemType == "string") {
      var selections = document.querySelectorAll(selector);
      return new JQLite(selections);
    } else if (itemType == "object") {
      return new JQLite([selector]);
    }
  }
}
