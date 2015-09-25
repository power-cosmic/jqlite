function $(selector) {
  var itemType = typeof selector;

  if (itemType == "function") {
    window.onload = selector;
  } else if (itemType == "string") {
    var selections = document.querySelectorAll(selector);

    function JQLite(elem, length) {
      this.element = elem;
      this.length = length || elem.length;
    }
    JQLite.prototype.html = function(newHTML) {
      if (newHTML === undefined) {
        return this.element[0].innerHTML;
      } else {
        return this.each(function(elem) {
          elem.innerHTML = newHTML;
        });
      }
    }
    JQLite.prototype.click = function(fn) {
      return this.each(function(elem) {
        elem.onclick = fn;
      });
    }
    JQLite.prototype.blur = function(fn) {
      return this.each(function(elem) {
        elem.onblur = fn;
      });
    }
    JQLite.prototype.focus = function(fn) {
      return this.each(function(elem) {
        elem.onfocus = fn;
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
      return new JQLite(this.element[0].parent);
    }
    JQLite.prototype.first = function() {
      var elem = this;
      if (this.length) {
        elem = new JQLite(this.element[0]);
      }
      return elem;
    }
    JQLite.prototype.last = function() {
      var elem = this;
      if (this.length) {
        elem = new JQLite(this.element[this.length - 1]);
      }
      return elem;
    }

    JQLite.prototype.addClass = function(classname) {
      if (this.element.className.search(classname)) {
        this.element.className += " " + classname;
      }
      return this;
    }
    JQLite.prototype.removeClass = function(classname) {
      this.element.className = this.element.className.replace(classname, "");

      return this;
    }
    JQLite.prototype.toggleClass = function(classname) {
      var daIndex = this.element.className.indexOf(classname),
          daLength = classname.length,
          elem;

      if (daIndex < 0) {
        elem = this.addClass(classname);
      } else {
        elem = this.removeClass(classname);
      }
      return elem;
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

    return new JQLite(selections);
  }
}
