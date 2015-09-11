function $(selector) {
  var itemType = typeof selector;

  if (itemType == "function") {
    window.onload = selector;
  } else if (itemType == "string") {

    switch (itemType.charAt(0)) {
      case ".":
      return document.getElementsByClassName(itemType.substring(1));
      break;
      case "#":
      return document.getElementById(itemType.substring(1));
      break;
      default:
      return document.getElementsByTagName(item.substring(1));
      break;
    }
  }
}
