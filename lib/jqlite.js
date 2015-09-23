function $(selector) {
  var itemType = typeof selector;

  if (itemType == "function") {
    window.onload = selector;
  } else if (itemType == "string") {

    function JQLite(elem, length) {
      this.element = elem;
      this.length = length || 0;
    }
    JQLite.prototype.html = function(newHTML) {
      if (!this.length) {
        if (newHTML === undefined) {
          return this.element.innerHTML;
        }
        this.element.innerHTML = newHTML;
        return this;
      }
    }
    JQLite.prototype.click = function(fn) {
      this.element.onclick = fn;
      return this;
    }
    JQLite.prototype.blur = function(fn) {
      this.element.onblur = fn;
      return this;
    }
    JQLite.prototype.focus = function(fn) {
      this.element.onfocus = fn;
      return this;
    }
    JQLite.prototype.append = function(newElem) {
      if (typeof newElem == "string") {
        newElem = document.createElement(newElem);
      }
      this.element.appendChild(newElem);
      return new JQLite(newElem);
    }
    JQLite.prototype.each = function(fn) {
      if (this.length) {
        this.element.forEach(fn);
      } else {
        fn(this.element);
      }
    }
    JQLite.prototype.parent = function() {
      return new JQLite(this.element.parent);
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
    /*
    addAttr
    removeAttr
    addClass
    removeClass

    toggleClass
    value

    */

    /*
    change
    dlbclick
    hover
    submit
    */

    /*
    first
    last
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
    switch (selector.charAt(0)) {
      case "#":
      return new JQLite(document.getElementById(selector.substring(1)));
      break;
      case ".":
      var items = document.getElementsByClassName(selector.substring(1));
      return new JQLite(items, items.length);
      break;
      default:
      var items = document.getElementsByTagName(selector);
      return new JQLite(items, items.length);
      break;
    }
  }
}
