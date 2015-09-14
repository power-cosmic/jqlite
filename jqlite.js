function $(selector) {
  var itemType = typeof selector;

  if (itemType == "function") {
    window.onload = selector;
  } else if (itemType == "string") {
    function JQLite(elem, next) {
      this.element = elem;
      this.next = next;
    }
    JQLite.prototype.html = function(newHTML) {
      if (newHTML === undefined) {
        return this.element.innerHTML;
      }
      this.element.innerHTML = newHTML;
      return this;
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
    JQLite.prototype.add = function(newElem) {
      if (typeof newElem == "string") {
        newElem = document.createElement(newElem);
      }
      this.element.appendChild(newElem);
      return new JQLite(newElem);
    }
    switch (selector.charAt(0)) {
      case ".":
      var items = document.getElementsByClassName(selector.substring(1));
      break;
      case "#":
      return new JQLite(document.getElementById(selector.substring(1)));
      break;
      default:
      return document.getElementsByTagName(selector.substring(1));
      break;
    }
  }
}
