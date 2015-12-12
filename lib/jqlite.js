(function(root, factory) {
  if (typeof define === 'function') {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.jqlite = root.$ = factory();
  }
}(this, function() {

  var readyCalls = [];
  window.onload = function(x) {
    readyCalls.forEach(function(call) {
      call(x);
    });
  };

  function $(selector) {
    var itemType = typeof selector;

    if (itemType == "function") {
      readyCalls.push(selector);
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
      };
      JQLite.prototype.text = function(newText) {
        if (newText === undefined) {
          return String(this.element[0].innerHTML);
        } else {
          newHTML = String(newText);
          return this.each(function() {
            this.innerHTML = newText;
          });
        }
      };

      JQLite.prototype.click = function(fn) {
        return this.each(function() {
          this.onclick = fn;
        });
      };
      JQLite.prototype.blur = function(fn) {
        return this.each(function() {
          this.onblur = fn;
        });
      };
      JQLite.prototype.focus = function(fn) {
        if (fn) {
          this.each(function() {
            this.onfocus = fn;
          });
        } else {
          this.element[0].focus();
        }
        return this;
      };

      JQLite.prototype.append = function(newElem) {
        if (typeof newElem == "string") {
          newElem = document.createElement(newElem);
        }
        this.element[0].appendChild(newElem);
        return new JQLite([newElem]);
      };

      JQLite.prototype.remove = function() {
        return this.each(function(element) {
          element.parentElement.removeChild(element);
        });
      };

      JQLite.prototype.each = function(fn) {
        for (var x of Array.from(this.element)) {
          fn.call(x, x);
        }
        return this;
      };

      JQLite.prototype.children = function() {
        return new JQLite(this.element[0].children);
      };
      JQLite.prototype.parent = function() {
        return new JQLite([this.element[0].parentElement]);
      };
      JQLite.prototype.first = function() {
        return this.get(0);
      };
      JQLite.prototype.last = function() {
        return this.get(-1);
      };
      JQLite.prototype.get = function(num) {
        if (Math.abs(num) > this.length) {
          throw "bad error";
        }
        if (num < 0) {
          return this.element[this.length + num];
        } else {
          return this.element[num];
        }
      };
      JQLite.prototype.slice = function(start, end) {
        return new JQLite(this.toArray()
          .slice(start, end));
      };

      JQLite.prototype.toArray = function() {
        if (Array.isArray(this.element)) {
          return this.element;
        } else {
          return Array.prototype.slice.call(this.element);
        }
      };

      JQLite.prototype.addClass = function(classname) {
        return this.each(function() {
          if (!this.className.match(classname)) {
            this.className += " " + classname;
          }
        });
      };
      JQLite.prototype.removeClass = function(classname) {
        return this.each(function() {
          this.className = this.className.replace(classname, "");
        });
      };

      JQLite.prototype.toggleClass = function(classname) {
        return this.each(function() {
          if (!this.className.match(classname)) {
            this.className += " " + classname;
          } else {
            this.className = this.className.replace(classname, "");
          }
        });
      };
      JQLite.prototype.css = function(style, rule) {
        if (rule === undefined) {
          var cssProp = window.getComputedStyle(this.element[0], null);
          return cssProp.getPropertyValue(style);
        }

        return this.each(function() {
          if (typeof style == 'string') {
            this.style[style] = rule;
          } else {
            for (var styleKey in style) {
              if (style.hasOwnProperty(styleKey)) {
                this.style[style[styleKey]] = style[styleKey];
              }
            }
          }
        });
      }
      JQLite.prototype.attr = function(attribute, newValue) {
        return this.each(function() {
          if (typeof attribute == 'string') {
            this[attribute] = newValue;
          }
        });
      }

      JQLite.prototype.wrap = function(wrappingElem) {
        return this.each(function() {
          var wrapper = document.createElement(wrappingElem),
            parent = this.parentElement;
          parent.replaceChild(wrapper, this);
          wrapper.appendChild(this);
        });
      };
      JQLite.prototype.wrapAll = function(wrappingElem) {
        var wrapper = document.createElement(wrappingElem);
        this.each(function() {
          this.parentElement.removeChild(this);
          wrapper.appendChild(this);
        });
        return new JQLite([wrapper]);
      };

      JQLite.prototype.load = function(urlToLoad, ajaxer) {
        var that = this;
        ajaxer.get(urlToLoad, function(responseText) {
          that.html(responseText);
        });
      };

      JQLite.prototype.val = function() {
        return this.element[0].value;
      };
      JQLite.prototype.value = function() {
        return this.val();
      };

      JQLite.prototype.slide = function(destination, duration) {
        this.toggleClass(":animating");
        var left = this.css('left');
        var start = left === "auto" ? 0 : parseInt(left.slice(0, left.length-2));
        this._startTime = new Date().getTime();
        this._doSlide(start, destination, duration);
      };

      JQLite.prototype._doSlide = function(start, destination, duration) {
        var curTime = new Date().getTime();
        var delta = curTime - this._startTime;
        var progress = delta/duration;

        var difference = start - destination;
        progress = progress > 1.0 ? 1.0 : progress;
        var currentPos = destination + (difference - progress*difference);

        this.css("left", "" + currentPos + "px");
        if (progress === 1.0) {
          this.toggleClass(":animating");
          return;
        }
        var that = this;
        window.requestAnimationFrame( function() {
          that._doSlide(start, destination, duration);
        });
      };

      JQLite.prototype.hasClass = function(className) {
        if (this.element[0].className.indexOf(className) >= 0) {
          return true;
        }
        return false;
      };

      /*
      addAttr
      removeAttr
      */

      /*
      change
      dlbclick
      hover
      submit
      */

      /*
      unwrap
      appendTo
      prepend
      before
      after
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
  return $;
}));
