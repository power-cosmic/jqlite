function $(selector) {
  var itemType = typeof selector;

  if (itemType == "function") {
    window.onload = selector;
  } else if (itemType == "string") {
    function JQLite(elem) {
      this.element = elem;
    }
    JQLite.prototype.html = function(newHTML) {
      if (newHTML !== null) {
        this.element.innerHTML = newHTML;
        return this;
      } else {
        return this.element.innerHTML;
      }
    }
    switch (selector.charAt(0)) {
      case ".":
      return document.getElementsByClassName(selector.substring(1));
      break;
      case "#":
      return new JQLite(document.getElementById(selector.substring(1)));
      break;
      default:return document.getElementsByTagName(selector.substring(1));
      break;
    }
  }
}
