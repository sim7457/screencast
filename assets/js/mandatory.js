(function(global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document")
      }
      return factory(w)
    }
  } else {
    factory(global)
  }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  "use strict";
  var arr = [];
  var getProto = Object.getPrototypeOf;
  var slice = arr.slice;
  var flat = arr.flat ? function(array) {
    return arr.flat.call(array)
  } : function(array) {
    return arr.concat.apply([], array)
  };
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var support = {};
  var isFunction = function isFunction(obj) {
    return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function"
  };
  var isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window
  };
  var document = window.document;
  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  };

  function DOMEval(code, node, doc) {
    doc = doc || document;
    var i, val, script = doc.createElement("script");
    script.text = code;
    if (node) {
      for (i in preservedScriptAttributes) {
        val = node[i] || node.getAttribute && node.getAttribute(i);
        if (val) {
          script.setAttribute(i, val)
        }
      }
    }
    doc.head.appendChild(script).parentNode.removeChild(script)
  }

  function toType(obj) {
    if (obj == null) {
      return obj + ""
    }
    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj
  }
  var version = "3.6.3",
    jQuery = function(selector, context) {
      return new jQuery.fn.init(selector, context)
    };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    length: 0,
    toArray: function() {
      return slice.call(this)
    },
    get: function(num) {
      if (num == null) {
        return slice.call(this)
      }
      return num < 0 ? this[num + this.length] : this[num]
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      return ret
    },
    each: function(callback) {
      return jQuery.each(this, callback)
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem)
      }))
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    even: function() {
      return this.pushStack(jQuery.grep(this, function(_elem, i) {
        return (i + 1) % 2
      }))
    },
    odd: function() {
      return this.pushStack(jQuery.grep(this, function(_elem, i) {
        return i % 2
      }))
    },
    eq: function(i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
    },
    end: function() {
      return this.prevObject || this.constructor()
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++
    }
    if (typeof target !== "object" && !isFunction(target)) {
      target = {}
    }
    if (i === length) {
      target = this;
      i--
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          copy = options[name];
          if (name === "__proto__" || target === copy) {
            continue
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            src = target[name];
            if (copyIsArray && !Array.isArray(src)) {
              clone = []
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {}
            } else {
              clone = src
            }
            copyIsArray = false;
            target[name] = jQuery.extend(deep, clone, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg)
    },
    noop: function() {},
    isPlainObject: function(obj) {
      var proto, Ctor;
      if (!obj || toString.call(obj) !== "[object Object]") {
        return false
      }
      proto = getProto(obj);
      if (!proto) {
        return true
      }
      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false
      }
      return true
    },
    globalEval: function(code, options, doc) {
      DOMEval(code, {
        nonce: options && options.nonce
      }, doc)
    },
    each: function(obj, callback) {
      var length, i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break
          }
        }
      }
      return obj
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr)
        } else {
          push.call(ret, arr)
        }
      }
      return ret
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i)
    },
    merge: function(first, second) {
      var len = +second.length,
        j = 0,
        i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j]
      }
      first.length = i;
      return first
    },
    grep: function(elems, callback, invert) {
      var callbackInverse, matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i])
        }
      }
      return matches
    },
    map: function(elems, callback, arg) {
      var length, value, i = 0,
        ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value)
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value)
          }
        }
      }
      return flat(ret)
    },
    guid: 1,
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(_i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase()
  });

  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
      type = toType(obj);
    if (isFunction(obj) || isWindow(obj)) {
      return false
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj
  }
  var Sizzle = function(window) {
    var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date,
      preferredDoc = window.document,
      dirruns = 0,
      done = 0,
      classCache = createCache(),
      tokenCache = createCache(),
      compilerCache = createCache(),
      nonnativeSelectorCache = createCache(),
      sortOrder = function(a, b) {
        if (a === b) {
          hasDuplicate = true
        }
        return 0
      },
      hasOwn = {}.hasOwnProperty,
      arr = [],
      pop = arr.pop,
      pushNative = arr.push,
      push = arr.push,
      slice = arr.slice,
      indexOf = function(list, elem) {
        var i = 0,
          len = list.length;
        for (; i < len; i++) {
          if (list[i] === elem) {
            return i
          }
        }
        return -1
      },
      booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" + "ismap|loop|multiple|open|readonly|required|scoped",
      whitespace = "[\\x20\\t\\r\\n\\f]",
      identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
      attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
      pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
      rwhitespace = new RegExp(whitespace + "+", "g"),
      rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
      rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
      rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
      rdescend = new RegExp(whitespace + "|>"),
      rpseudo = new RegExp(pseudos),
      ridentifier = new RegExp("^" + identifier + "$"),
      matchExpr = {
        ID: new RegExp("^#(" + identifier + ")"),
        CLASS: new RegExp("^\\.(" + identifier + ")"),
        TAG: new RegExp("^(" + identifier + "|[*])"),
        ATTR: new RegExp("^" + attributes),
        PSEUDO: new RegExp("^" + pseudos),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + booleans + ")$", "i"),
        needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
      },
      rhtml = /HTML$/i,
      rinputs = /^(?:input|select|textarea|button)$/i,
      rheader = /^h\d$/i,
      rnative = /^[^{]+\{\s*\[native \w/,
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      rsibling = /[+~]/,
      runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
      funescape = function(escape, nonHex) {
        var high = "0x" + escape.slice(1) - 65536;
        return nonHex ? nonHex : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
      },
      rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
      fcssescape = function(ch, asCodePoint) {
        if (asCodePoint) {
          if (ch === "\0") {
            return "�"
          }
          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " "
        }
        return "\\" + ch
      },
      unloadHandler = function() {
        setDocument()
      },
      inDisabledFieldset = addCombinator(function(elem) {
        return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset"
      }, {
        dir: "parentNode",
        next: "legend"
      });
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType
    } catch (e) {
      push = {
        apply: arr.length ? function(target, els) {
          pushNative.apply(target, slice.call(els))
        } : function(target, els) {
          var j = target.length,
            i = 0;
          while (target[j++] = els[i++]) {}
          target.length = j - 1
        }
      }
    }

    function Sizzle(selector, context, results, seed) {
      var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument,
        nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results
      }
      if (!seed) {
        setDocument(context);
        context = context || document;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if (m = match[1]) {
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  if (elem.id === m) {
                    results.push(elem);
                    return results
                  }
                } else {
                  return results
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results
            }
          }
          if (support.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
            newSelector = selector;
            newContext = context;
            if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
              if (newContext !== context || !support.scope) {
                if (nid = context.getAttribute("id")) {
                  nid = nid.replace(rcssescape, fcssescape)
                } else {
                  context.setAttribute("id", nid = expando)
                }
              }
              groups = tokenize(selector);
              i = groups.length;
              while (i--) {
                groups[i] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i])
              }
              newSelector = groups.join(",")
            }
            try {
              if (support.cssSupportsSelector && !CSS.supports("selector(:is(" + newSelector + "))")) {
                throw new Error
              }
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true)
            } finally {
              if (nid === expando) {
                context.removeAttribute("id")
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed)
    }

    function createCache() {
      var keys = [];

      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()]
        }
        return cache[key + " "] = value
      }
      return cache
    }

    function markFunction(fn) {
      fn[expando] = true;
      return fn
    }

    function assert(fn) {
      var el = document.createElement("fieldset");
      try {
        return !!fn(el)
      } catch (e) {
        return false
      } finally {
        if (el.parentNode) {
          el.parentNode.removeChild(el)
        }
        el = null
      }
    }

    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
        i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler
      }
    }

    function siblingCheck(a, b) {
      var cur = b && a,
        diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
      if (diff) {
        return diff
      }
      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1
          }
        }
      }
      return a ? 1 : -1
    }

    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type
      }
    }

    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type
      }
    }

    function createDisabledPseudo(disabled) {
      return function(elem) {
        if ("form" in elem) {
          if (elem.parentNode && elem.disabled === false) {
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled
              } else {
                return elem.disabled === disabled
              }
            }
            return elem.isDisabled === disabled || elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled
          }
          return elem.disabled === disabled
        } else if ("label" in elem) {
          return elem.disabled === disabled
        }
        return false
      }
    }

    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument),
            i = matchIndexes.length;
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j])
            }
          }
        })
      })
    }

    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var namespace = elem && elem.namespaceURI,
        docElem = elem && (elem.ownerDocument || elem).documentElement;
      return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML")
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
        return document
      }
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      if (preferredDoc != document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        if (subWindow.addEventListener) {
          subWindow.addEventListener("unload", unloadHandler, false)
        } else if (subWindow.attachEvent) {
          subWindow.attachEvent("onunload", unloadHandler)
        }
      }
      support.scope = assert(function(el) {
        docElem.appendChild(el).appendChild(document.createElement("div"));
        return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length
      });
      support.cssSupportsSelector = assert(function() {
        return CSS.supports("selector(*)") && document.querySelectorAll(":is(:jqfake)") && !CSS.supports("selector(:is(*,:jqfake))")
      });
      support.attributes = assert(function(el) {
        el.className = "i";
        return !el.getAttribute("className")
      });
      support.getElementsByTagName = assert(function(el) {
        el.appendChild(document.createComment(""));
        return !el.getElementsByTagName("*").length
      });
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      support.getById = assert(function(el) {
        docElem.appendChild(el).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length
      });
      if (support.getById) {
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId
          }
        };
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : []
          }
        }
      } else {
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId
          }
        };
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var node, i, elems, elem = context.getElementById(id);
            if (elem) {
              node = elem.getAttributeNode("id");
              if (node && node.value === id) {
                return [elem]
              }
              elems = context.getElementsByName(id);
              i = 0;
              while (elem = elems[i++]) {
                node = elem.getAttributeNode("id");
                if (node && node.value === id) {
                  return [elem]
                }
              }
            }
            return []
          }
        }
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag)
        } else if (support.qsa) {
          return context.querySelectorAll(tag)
        }
      } : function(tag, context) {
        var elem, tmp = [],
          i = 0,
          results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem)
            }
          }
          return tmp
        }
        return results
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className)
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if (support.qsa = rnative.test(document.querySelectorAll)) {
        assert(function(el) {
          var input;
          docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
          if (el.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")")
          }
          if (!el.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")")
          }
          if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=")
          }
          input = document.createElement("input");
          input.setAttribute("name", "");
          el.appendChild(input);
          if (!el.querySelectorAll("[name='']").length) {
            rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + "*(?:''|\"\")")
          }
          if (!el.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked")
          }
          if (!el.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]")
          }
          el.querySelectorAll("\\\f");
          rbuggyQSA.push("[\\r\\n\\f]")
        });
        assert(function(el) {
          el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          el.appendChild(input).setAttribute("name", "D");
          if (el.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=")
          }
          if (el.querySelectorAll(":enabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled")
          }
          docElem.appendChild(el).disabled = true;
          if (el.querySelectorAll(":disabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled")
          }
          el.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:")
        })
      }
      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function(el) {
          support.disconnectedMatch = matches.call(el, "*");
          matches.call(el, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos)
        })
      }
      if (!support.cssSupportsSelector) {
        rbuggyQSA.push(":has")
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 && a.documentElement || a,
          bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16))
      } : function(a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true
            }
          }
        }
        return false
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare
        }
        compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          if (a == document || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
            return -1
          }
          if (b == document || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
            return 1
          }
          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0
        }
        return compare & 4 ? -1 : 1
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0
        }
        var cur, i = 0,
          aup = a.parentNode,
          bup = b.parentNode,
          ap = [a],
          bp = [b];
        if (!aup || !bup) {
          return a == document ? -1 : b == document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0
        } else if (aup === bup) {
          return siblingCheck(a, b)
        }
        cur = a;
        while (cur = cur.parentNode) {
          ap.unshift(cur)
        }
        cur = b;
        while (cur = cur.parentNode) {
          bp.unshift(cur)
        }
        while (ap[i] === bp[i]) {
          i++
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] == preferredDoc ? -1 : bp[i] == preferredDoc ? 1 : 0
      };
      return document
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements)
    };
    Sizzle.matchesSelector = function(elem, expr) {
      setDocument(elem);
      if (support.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret
          }
        } catch (e) {
          nonnativeSelectorCache(expr, true)
        }
      }
      return Sizzle(expr, document, null, [elem]).length > 0
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) != document) {
        setDocument(context)
      }
      return contains(context, elem)
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) != document) {
        setDocument(elem)
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
    };
    Sizzle.escape = function(sel) {
      return (sel + "").replace(rcssescape, fcssescape)
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg)
    };
    Sizzle.uniqueSort = function(results) {
      var elem, duplicates = [],
        j = 0,
        i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i)
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1)
        }
      }
      sortInput = null;
      return results
    };
    getText = Sizzle.getText = function(elem) {
      var node, ret = "",
        i = 0,
        nodeType = elem.nodeType;
      if (!nodeType) {
        while (node = elem[i++]) {
          ret += getText(node)
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem)
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue
      }
      return ret
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " "
          }
          return match.slice(0, 4)
        },
        CHILD: function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0])
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd")
          } else if (match[3]) {
            Sizzle.error(match[0])
          }
          return match
        },
        PSEUDO: function(match) {
          var excess, unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || ""
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess)
          }
          return match.slice(0, 3)
        }
      },
      filter: {
        TAG: function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
          }
        },
        CLASS: function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "")
          })
        },
        ATTR: function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!="
            }
            if (!operator) {
              return true
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false
          }
        },
        CHILD: function(type, what, _argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
            forward = type.slice(-4) !== "last",
            ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode
          } : function(elem, _context, xml) {
            var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
              parent = elem.parentNode,
              name = ofType && elem.nodeName.toLowerCase(),
              useCache = !xml && !ofType,
              diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling"
                }
                return true
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break
                  }
                }
              } else {
                if (useCache) {
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex
                }
                if (diff === false) {
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff]
                      }
                      if (node === elem) {
                        break
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0
            }
          }
        },
        PSEUDO: function(pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument)
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx, matched = fn(seed, argument),
                i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i])
              }
            }) : function(elem) {
              return fn(elem, 0, args)
            }
          }
          return fn
        }
      },
      pseudos: {
        not: markFunction(function(selector) {
          var input = [],
            results = [],
            matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, _context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []),
              i = seed.length;
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem)
              }
            }
          }) : function(elem, _context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop()
          }
        }),
        has: markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0
          }
        }),
        contains: markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || getText(elem)).indexOf(text) > -1
          }
        }),
        lang: markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang)
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false
          }
        }),
        target: function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id
        },
        root: function(elem) {
          return elem === docElem
        },
        focus: function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
        },
        enabled: createDisabledPseudo(false),
        disabled: createDisabledPseudo(true),
        checked: function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected
        },
        selected: function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex
          }
          return elem.selected === true
        },
        empty: function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false
            }
          }
          return true
        },
        parent: function(elem) {
          return !Expr.pseudos["empty"](elem)
        },
        header: function(elem) {
          return rheader.test(elem.nodeName)
        },
        input: function(elem) {
          return rinputs.test(elem.nodeName)
        },
        button: function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button"
        },
        text: function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text")
        },
        first: createPositionalPseudo(function() {
          return [0]
        }),
        last: createPositionalPseudo(function(_matchIndexes, length) {
          return [length - 1]
        }),
        eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument]
        }),
        even: createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i)
          }
          return matchIndexes
        }),
        odd: createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i)
          }
          return matchIndexes
        }),
        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument > length ? length : argument;
          for (; --i >= 0;) {
            matchIndexes.push(i)
          }
          return matchIndexes
        }),
        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i)
          }
          return matchIndexes
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
      }) {
      Expr.pseudos[i] = createInputPseudo(i)
    }
    for (i in {
        submit: true,
        reset: true
      }) {
      Expr.pseudos[i] = createButtonPseudo(i)
    }

    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters;
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0)
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar
          }
          groups.push(tokens = [])
        }
        matched = false;
        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length)
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length)
          }
        }
        if (!matched) {
          break
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
    };

    function toSelector(tokens) {
      var i = 0,
        len = tokens.length,
        selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value
      }
      return selector
    }

    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
        skip = combinator.next,
        key = skip || dir,
        checkNonElements = base && key === "parentNode",
        doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml)
          }
        }
        return false
      } : function(elem, context, xml) {
        var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if (skip && skip === elem.nodeName.toLowerCase()) {
                elem = elem[dir] || elem
              } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return newCache[2] = oldCache[2]
              } else {
                uniqueCache[key] = newCache;
                if (newCache[2] = matcher(elem, context, xml)) {
                  return true
                }
              }
            }
          }
        }
        return false
      }
    }

    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false
          }
        }
        return true
      } : matchers[0]
    }

    function multipleContexts(selector, contexts, results) {
      var i = 0,
        len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results)
      }
      return results
    }

    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i)
            }
          }
        }
      }
      return newUnmatched
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter)
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector)
      }
      return markFunction(function(seed, results, context, xml) {
        var temp, i, elem, preMap = [],
          postMap = [],
          preexisting = results.length,
          elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
          matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
          matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml)
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  temp.push(matcherIn[i] = elem)
                }
              }
              postFinder(null, matcherOut = [], temp, xml)
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem)
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml)
          } else {
            push.apply(results, matcherOut)
          }
        }
      })
    }

    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length,
        leadingRelative = Expr.relative[tokens[0].type],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,
        matchContext = addCombinator(function(elem) {
          return elem === checkContext
        }, implicitRelative, true),
        matchAnyContext = addCombinator(function(elem) {
          return indexOf(checkContext, elem) > -1
        }, implicitRelative, true),
        matchers = [function(elem, context, xml) {
          var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
          checkContext = null;
          return ret
        }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)]
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
              value: tokens[i - 2].type === " " ? "*" : ""
            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens))
          }
          matchers.push(matcher)
        }
      }
      return elementMatcher(matchers)
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function(seed, context, xml, results, outermost) {
          var elem, j, matcher, matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            elems = seed || byElement && Expr.find["TAG"]("*", outermost),
            dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || .1,
            len = elems.length;
          if (outermost) {
            outermostContext = context == document || context || outermost
          }
          for (; i !== len && (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              if (!context && elem.ownerDocument != document) {
                setDocument(elem);
                xml = !documentIsHTML
              }
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context || document, xml)) {
                  results.push(elem);
                  break
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique
              }
            }
            if (bySet) {
              if (elem = !matcher && elem) {
                matchedCount--
              }
              if (seed) {
                unmatched.push(elem)
              }
            }
          }
          matchedCount += i;
          if (bySet && i !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml)
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results)
                  }
                }
              }
              setMatched = condense(setMatched)
            }
            push.apply(results, setMatched);
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results)
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup
          }
          return unmatched
        };
      return bySet ? markFunction(superMatcher) : superMatcher
    }
    compile = Sizzle.compile = function(selector, match) {
      var i, setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector)
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached)
          } else {
            elementMatchers.push(cached)
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector
      }
      return cached
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i, tokens, token, type, find, compiled = typeof selector === "function" && selector,
        match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results
          } else if (compiled) {
            context = context.parentNode
          }
          selector = selector.slice(tokens.shift().value.length)
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[type = token.type]) {
            break
          }
          if (find = Expr.find[type]) {
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results
              }
              break
            }
          }
        }
      }(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(el) {
      return el.compareDocumentPosition(document.createElement("fieldset")) & 1
    });
    if (!assert(function(el) {
        el.innerHTML = "<a href='#'></a>";
        return el.firstChild.getAttribute("href") === "#"
      })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2)
        }
      })
    }
    if (!support.attributes || !assert(function(el) {
        el.innerHTML = "<input/>";
        el.firstChild.setAttribute("value", "");
        return el.firstChild.getAttribute("value") === ""
      })) {
      addHandle("value", function(elem, _name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue
        }
      })
    }
    if (!assert(function(el) {
        return el.getAttribute("disabled") == null
      })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
        }
      })
    }
    return Sizzle
  }(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  jQuery.escapeSelector = Sizzle.escape;
  var dir = function(elem, dir, until) {
    var matched = [],
      truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break
        }
        matched.push(elem)
      }
    }
    return matched
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n)
      }
    }
    return matched
  };
  var rneedsContext = jQuery.expr.match.needsContext;

  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
  }
  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

  function winnow(elements, qualifier, not) {
    if (isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not
      })
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return elem === qualifier !== not
      })
    }
    if (typeof qualifier !== "string") {
      return jQuery.grep(elements, function(elem) {
        return indexOf.call(qualifier, elem) > -1 !== not
      })
    }
    return jQuery.filter(qualifier, elements, not)
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")"
    }
    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : []
    }
    return jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1
    }))
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i, ret, len = this.length,
        self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true
            }
          }
        }))
      }
      ret = this.pushStack([]);
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret)
      }
      return len > 1 ? jQuery.uniqueSort(ret) : ret
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false))
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true))
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length
    }
  });
  var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    init = jQuery.fn.init = function(selector, context, root) {
      var match, elem;
      if (!selector) {
        return this
      }
      root = root || rootjQuery;
      if (typeof selector === "string") {
        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
          match = [null, selector, null]
        } else {
          match = rquickExpr.exec(selector)
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (isFunction(this[match])) {
                  this[match](context[match])
                } else {
                  this.attr(match, context[match])
                }
              }
            }
            return this
          } else {
            elem = document.getElementById(match[2]);
            if (elem) {
              this[0] = elem;
              this.length = 1
            }
            return this
          }
        } else if (!context || context.jquery) {
          return (context || root).find(selector)
        } else {
          return this.constructor(context).find(selector)
        }
      } else if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this
      } else if (isFunction(selector)) {
        return root.ready !== undefined ? root.ready(selector) : selector(jQuery)
      }
      return jQuery.makeArray(selector, this)
    };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
        l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true
          }
        }
      })
    },
    closest: function(selectors, context) {
      var cur, i = 0,
        l = this.length,
        matched = [],
        targets = typeof selectors !== "string" && jQuery(selectors);
      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break
            }
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched)
    },
    index: function(elem) {
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0])
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem)
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))))
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
    }
  });

  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null
    },
    parents: function(elem) {
      return dir(elem, "parentNode")
    },
    parentsUntil: function(elem, _i, until) {
      return dir(elem, "parentNode", until)
    },
    next: function(elem) {
      return sibling(elem, "nextSibling")
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling")
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling")
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling")
    },
    nextUntil: function(elem, _i, until) {
      return dir(elem, "nextSibling", until)
    },
    prevUntil: function(elem, _i, until) {
      return dir(elem, "previousSibling", until)
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem)
    },
    children: function(elem) {
      return siblings(elem.firstChild)
    },
    contents: function(elem) {
      if (elem.contentDocument != null && getProto(elem.contentDocument)) {
        return elem.contentDocument
      }
      if (nodeName(elem, "template")) {
        elem = elem.content || elem
      }
      return jQuery.merge([], elem.childNodes)
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched)
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched)
        }
        if (rparentsprev.test(name)) {
          matched.reverse()
        }
      }
      return this.pushStack(matched)
    }
  });
  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
      object[flag] = true
    });
    return object
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var firing, memory, fired, locked, list = [],
      queue = [],
      firingIndex = -1,
      fire = function() {
        locked = locked || options.once;
        fired = firing = true;
        for (; queue.length; firingIndex = -1) {
          memory = queue.shift();
          while (++firingIndex < list.length) {
            if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
              firingIndex = list.length;
              memory = false
            }
          }
        }
        if (!options.memory) {
          memory = false
        }
        firing = false;
        if (locked) {
          if (memory) {
            list = []
          } else {
            list = ""
          }
        }
      },
      self = {
        add: function() {
          if (list) {
            if (memory && !firing) {
              firingIndex = list.length - 1;
              queue.push(memory)
            }(function add(args) {
              jQuery.each(args, function(_, arg) {
                if (isFunction(arg)) {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg)
                  }
                } else if (arg && arg.length && toType(arg) !== "string") {
                  add(arg)
                }
              })
            })(arguments);
            if (memory && !firing) {
              fire()
            }
          }
          return this
        },
        remove: function() {
          jQuery.each(arguments, function(_, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);
              if (index <= firingIndex) {
                firingIndex--
              }
            }
          });
          return this
        },
        has: function(fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0
        },
        empty: function() {
          if (list) {
            list = []
          }
          return this
        },
        disable: function() {
          locked = queue = [];
          list = memory = "";
          return this
        },
        disabled: function() {
          return !list
        },
        lock: function() {
          locked = queue = [];
          if (!memory && !firing) {
            list = memory = ""
          }
          return this
        },
        locked: function() {
          return !!locked
        },
        fireWith: function(context, args) {
          if (!locked) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            queue.push(args);
            if (!firing) {
              fire()
            }
          }
          return this
        },
        fire: function() {
          self.fireWith(this, arguments);
          return this
        },
        fired: function() {
          return !!fired
        }
      };
    return self
  };

  function Identity(v) {
    return v
  }

  function Thrower(ex) {
    throw ex
  }

  function adoptValue(value, resolve, reject, noValue) {
    var method;
    try {
      if (value && isFunction(method = value.promise)) {
        method.call(value).done(resolve).fail(reject)
      } else if (value && isFunction(method = value.then)) {
        method.call(value, resolve, reject)
      } else {
        resolve.apply(undefined, [value].slice(noValue))
      }
    } catch (value) {
      reject.apply(undefined, [value])
    }
  }
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [
          ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2],
          ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"],
          ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]
        ],
        state = "pending",
        promise = {
          state: function() {
            return state
          },
          always: function() {
            deferred.done(arguments).fail(arguments);
            return this
          },
          catch: function(fn) {
            return promise.then(null, fn)
          },
          pipe: function() {
            var fns = arguments;
            return jQuery.Deferred(function(newDefer) {
              jQuery.each(tuples, function(_i, tuple) {
                var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                deferred[tuple[1]](function() {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && isFunction(returned.promise)) {
                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject)
                  } else {
                    newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments)
                  }
                })
              });
              fns = null
            }).promise()
          },
          then: function(onFulfilled, onRejected, onProgress) {
            var maxDepth = 0;

            function resolve(depth, deferred, handler, special) {
              return function() {
                var that = this,
                  args = arguments,
                  mightThrow = function() {
                    var returned, then;
                    if (depth < maxDepth) {
                      return
                    }
                    returned = handler.apply(that, args);
                    if (returned === deferred.promise()) {
                      throw new TypeError("Thenable self-resolution")
                    }
                    then = returned && (typeof returned === "object" || typeof returned === "function") && returned.then;
                    if (isFunction(then)) {
                      if (special) {
                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special))
                      } else {
                        maxDepth++;
                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith))
                      }
                    } else {
                      if (handler !== Identity) {
                        that = undefined;
                        args = [returned]
                      }(special || deferred.resolveWith)(that, args)
                    }
                  },
                  process = special ? mightThrow : function() {
                    try {
                      mightThrow()
                    } catch (e) {
                      if (jQuery.Deferred.exceptionHook) {
                        jQuery.Deferred.exceptionHook(e, process.stackTrace)
                      }
                      if (depth + 1 >= maxDepth) {
                        if (handler !== Thrower) {
                          that = undefined;
                          args = [e]
                        }
                        deferred.rejectWith(that, args)
                      }
                    }
                  };
                if (depth) {
                  process()
                } else {
                  if (jQuery.Deferred.getStackHook) {
                    process.stackTrace = jQuery.Deferred.getStackHook()
                  }
                  window.setTimeout(process)
                }
              }
            }
            return jQuery.Deferred(function(newDefer) {
              tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));
              tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity));
              tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower))
            }).promise()
          },
          promise: function(obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise
          }
        },
        deferred = {};
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
          stateString = tuple[5];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString
          }, tuples[3 - i][2].disable, tuples[3 - i][3].disable, tuples[0][2].lock, tuples[0][3].lock)
        }
        list.add(tuple[3].fire);
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
          return this
        };
        deferred[tuple[0] + "With"] = list.fireWith
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred)
      }
      return deferred
    },
    when: function(singleValue) {
      var remaining = arguments.length,
        i = remaining,
        resolveContexts = Array(i),
        resolveValues = slice.call(arguments),
        primary = jQuery.Deferred(),
        updateFunc = function(i) {
          return function(value) {
            resolveContexts[i] = this;
            resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
            if (!--remaining) {
              primary.resolveWith(resolveContexts, resolveValues)
            }
          }
        };
      if (remaining <= 1) {
        adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject, !remaining);
        if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
          return primary.then()
        }
      }
      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), primary.reject)
      }
      return primary.promise()
    }
  });
  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  jQuery.Deferred.exceptionHook = function(error, stack) {
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack)
    }
  };
  jQuery.readyException = function(error) {
    window.setTimeout(function() {
      throw error
    })
  };
  var readyList = jQuery.Deferred();
  jQuery.fn.ready = function(fn) {
    readyList.then(fn).catch(function(error) {
      jQuery.readyException(error)
    });
    return this
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return
      }
      readyList.resolveWith(document, [jQuery])
    }
  });
  jQuery.ready.then = readyList.then;

  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready()
  }
  if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
    window.setTimeout(jQuery.ready)
  } else {
    document.addEventListener("DOMContentLoaded", completed);
    window.addEventListener("load", completed)
  }
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
      len = elems.length,
      bulk = key == null;
    if (toType(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw)
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!isFunction(value)) {
        raw = true
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null
        } else {
          bulk = fn;
          fn = function(elem, _key, value) {
            return bulk.call(jQuery(elem), value)
          }
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
        }
      }
    }
    if (chainable) {
      return elems
    }
    if (bulk) {
      return fn.call(elems)
    }
    return len ? fn(elems[0], key) : emptyGet
  };
  var rmsPrefix = /^-ms-/,
    rdashAlpha = /-([a-z])/g;

  function fcamelCase(_all, letter) {
    return letter.toUpperCase()
  }

  function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
  }
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType
  };

  function Data() {
    this.expando = jQuery.expando + Data.uid++
  }
  Data.uid = 1;
  Data.prototype = {
    cache: function(owner) {
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            })
          }
        }
      }
      return value
    },
    set: function(owner, data, value) {
      var prop, cache = this.cache(owner);
      if (typeof data === "string") {
        cache[camelCase(data)] = value
      } else {
        for (prop in data) {
          cache[camelCase(prop)] = data[prop]
        }
      }
      return cache
    },
    get: function(owner, key) {
      return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][camelCase(key)]
    },
    access: function(owner, key, value) {
      if (key === undefined || key && typeof key === "string" && value === undefined) {
        return this.get(owner, key)
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key
    },
    remove: function(owner, key) {
      var i, cache = owner[this.expando];
      if (cache === undefined) {
        return
      }
      if (key !== undefined) {
        if (Array.isArray(key)) {
          key = key.map(camelCase)
        } else {
          key = camelCase(key);
          key = key in cache ? [key] : key.match(rnothtmlwhite) || []
        }
        i = key.length;
        while (i--) {
          delete cache[key[i]]
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined
        } else {
          delete owner[this.expando]
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache)
    }
  };
  var dataPriv = new Data;
  var dataUser = new Data;
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /[A-Z]/g;

  function getData(data) {
    if (data === "true") {
      return true
    }
    if (data === "false") {
      return false
    }
    if (data === "null") {
      return null
    }
    if (data === +data + "") {
      return +data
    }
    if (rbrace.test(data)) {
      return JSON.parse(data)
    }
    return data
  }

  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = getData(data)
        } catch (e) {}
        dataUser.set(elem, key, data)
      } else {
        data = undefined
      }
    }
    return data
  }
  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem)
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data)
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name)
    },
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data)
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name)
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i, name, data, elem = this[0],
        attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = camelCase(name.slice(5));
                  dataAttr(elem, name, data[name])
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true)
          }
        }
        return data
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key)
        })
      }
      return access(this, function(value) {
        var data;
        if (elem && value === undefined) {
          data = dataUser.get(elem, key);
          if (data !== undefined) {
            return data
          }
          data = dataAttr(elem, key);
          if (data !== undefined) {
            return data
          }
          return
        }
        this.each(function() {
          dataUser.set(this, key, value)
        })
      }, null, value, arguments.length > 1, null, true)
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key)
      })
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data))
          } else {
            queue.push(data)
          }
        }
        return queue || []
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
        startLength = queue.length,
        fn = queue.shift(),
        hooks = jQuery._queueHooks(elem, type),
        next = function() {
          jQuery.dequeue(elem, type)
        };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress")
        }
        delete hooks.stop;
        fn.call(elem, next, hooks)
      }
      if (!startLength && hooks) {
        hooks.empty.fire()
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key])
        })
      })
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type)
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type)
        }
      })
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type)
      })
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", [])
    },
    promise: function(type, obj) {
      var tmp, count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        i = this.length,
        resolve = function() {
          if (!--count) {
            defer.resolveWith(elements, [elements])
          }
        };
      if (typeof type !== "string") {
        obj = type;
        type = undefined
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve)
        }
      }
      resolve();
      return defer.promise(obj)
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var documentElement = document.documentElement;
  var isAttached = function(elem) {
      return jQuery.contains(elem.ownerDocument, elem)
    },
    composed = {
      composed: true
    };
  if (documentElement.getRootNode) {
    isAttached = function(elem) {
      return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument
    }
  }
  var isHiddenWithinTree = function(elem, el) {
    elem = el || elem;
    return elem.style.display === "none" || elem.style.display === "" && isAttached(elem) && jQuery.css(elem, "display") === "none"
  };

  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted, scale, maxIterations = 20,
      currentValue = tween ? function() {
        return tween.cur()
      } : function() {
        return jQuery.css(elem, prop, "")
      },
      initial = currentValue(),
      unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
      initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      initial = initial / 2;
      unit = unit || initialInUnit[3];
      initialInUnit = +initial || 1;
      while (maxIterations--) {
        jQuery.style(elem, prop, initialInUnit + unit);
        if ((1 - scale) * (1 - (scale = currentValue() / initial || .5)) <= 0) {
          maxIterations = 0
        }
        initialInUnit = initialInUnit / scale
      }
      initialInUnit = initialInUnit * 2;
      jQuery.style(elem, prop, initialInUnit + unit);
      valueParts = valueParts || []
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted
      }
    }
    return adjusted
  }
  var defaultDisplayMap = {};

  function getDefaultDisplay(elem) {
    var temp, doc = elem.ownerDocument,
      nodeName = elem.nodeName,
      display = defaultDisplayMap[nodeName];
    if (display) {
      return display
    }
    temp = doc.body.appendChild(doc.createElement(nodeName));
    display = jQuery.css(temp, "display");
    temp.parentNode.removeChild(temp);
    if (display === "none") {
      display = "block"
    }
    defaultDisplayMap[nodeName] = display;
    return display
  }

  function showHide(elements, show) {
    var display, elem, values = [],
      index = 0,
      length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue
      }
      display = elem.style.display;
      if (show) {
        if (display === "none") {
          values[index] = dataPriv.get(elem, "display") || null;
          if (!values[index]) {
            elem.style.display = ""
          }
        }
        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem)
        }
      } else {
        if (display !== "none") {
          values[index] = "none";
          dataPriv.set(elem, "display", display)
        }
      }
    }
    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index]
      }
    }
    return elements
  }
  jQuery.fn.extend({
    show: function() {
      return showHide(this, true)
    },
    hide: function() {
      return showHide(this)
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide()
      }
      return this.each(function() {
        if (isHiddenWithinTree(this)) {
          jQuery(this).show()
        } else {
          jQuery(this).hide()
        }
      })
    }
  });
  var rcheckableType = /^(?:checkbox|radio)$/i;
  var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
  var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
  (function() {
    var fragment = document.createDocumentFragment(),
      div = fragment.appendChild(document.createElement("div")),
      input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    div.innerHTML = "<option></option>";
    support.option = !!div.lastChild
  })();
  var wrapMap = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  if (!support.option) {
    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"]
  }

  function getAll(context, tag) {
    var ret;
    if (typeof context.getElementsByTagName !== "undefined") {
      ret = context.getElementsByTagName(tag || "*")
    } else if (typeof context.querySelectorAll !== "undefined") {
      ret = context.querySelectorAll(tag || "*")
    } else {
      ret = []
    }
    if (tag === undefined || tag && nodeName(context, tag)) {
      return jQuery.merge([context], ret)
    }
    return ret
  }

  function setGlobalEval(elems, refElements) {
    var i = 0,
      l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"))
    }
  }
  var rhtml = /<|&#?\w+;/;

  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(),
      nodes = [],
      i = 0,
      l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (toType(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem)
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem))
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = ""
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while (elem = nodes[i++]) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem)
        }
        continue
      }
      attached = isAttached(elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (attached) {
        setGlobalEval(tmp)
      }
      if (scripts) {
        j = 0;
        while (elem = tmp[j++]) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem)
          }
        }
      }
    }
    return fragment
  }
  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  function returnTrue() {
    return true
  }

  function returnFalse() {
    return false
  }

  function expectSync(elem, type) {
    return elem === safeActiveElement() === (type === "focus")
  }

  function safeActiveElement() {
    try {
      return document.activeElement
    } catch (err) {}
  }

  function on(elem, types, selector, data, fn, one) {
    var origFn, type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one)
      }
      return elem
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined
      } else {
        fn = data;
        data = selector;
        selector = undefined
      }
    }
    if (fn === false) {
      fn = returnFalse
    } else if (!fn) {
      return elem
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery().off(event);
        return origFn.apply(this, arguments)
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector)
    })
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
      if (!acceptData(elem)) {
        return
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector
      }
      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector)
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++
      }
      if (!(events = elemData.events)) {
        events = elemData.events = Object.create(null)
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined
        }
      }
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle)
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj)
        } else {
          handlers.push(handleObj)
        }
        jQuery.event.global[type] = true
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return
      }
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true)
          }
          continue
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--
            }
            if (special.remove) {
              special.remove.call(elem, handleObj)
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle)
          }
          delete events[type]
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events")
      }
    },
    dispatch: function(nativeEvent) {
      var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length),
        event = jQuery.event.fix(nativeEvent),
        handlers = (dataPriv.get(this, "events") || Object.create(null))[event.type] || [],
        special = jQuery.event.special[event.type] || {};
      args[0] = event;
      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i]
      }
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation()
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event)
      }
      return event.result
    },
    handlers: function(event, handlers) {
      var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target;
      if (delegateCount && cur.nodeType && !(event.type === "click" && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length
              }
              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj)
              }
            }
            if (matchedHandlers.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matchedHandlers
              })
            }
          }
        }
      }
      cur = this;
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: cur,
          handlers: handlers.slice(delegateCount)
        })
      }
      return handlerQueue
    },
    addProp: function(name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,
        get: isFunction(hook) ? function() {
          if (this.originalEvent) {
            return hook(this.originalEvent)
          }
        } : function() {
          if (this.originalEvent) {
            return this.originalEvent[name]
          }
        },
        set: function(value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          })
        }
      })
    },
    fix: function(originalEvent) {
      return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent)
    },
    special: {
      load: {
        noBubble: true
      },
      click: {
        setup: function(data) {
          var el = this || data;
          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            leverageNative(el, "click", returnTrue)
          }
          return false
        },
        trigger: function(data) {
          var el = this || data;
          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            leverageNative(el, "click")
          }
          return true
        },
        _default: function(event) {
          var target = event.target;
          return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result
          }
        }
      }
    }
  };

  function leverageNative(el, type, expectSync) {
    if (!expectSync) {
      if (dataPriv.get(el, type) === undefined) {
        jQuery.event.add(el, type, returnTrue)
      }
      return
    }
    dataPriv.set(el, type, false);
    jQuery.event.add(el, type, {
      namespace: false,
      handler: function(event) {
        var notAsync, result, saved = dataPriv.get(this, type);
        if (event.isTrigger & 1 && this[type]) {
          if (!saved.length) {
            saved = slice.call(arguments);
            dataPriv.set(this, type, saved);
            notAsync = expectSync(this, type);
            this[type]();
            result = dataPriv.get(this, type);
            if (saved !== result || notAsync) {
              dataPriv.set(this, type, false)
            } else {
              result = {}
            }
            if (saved !== result) {
              event.stopImmediatePropagation();
              event.preventDefault();
              return result && result.value
            }
          } else if ((jQuery.event.special[type] || {}).delegateType) {
            event.stopPropagation()
          }
        } else if (saved.length) {
          dataPriv.set(this, type, {
            value: jQuery.event.trigger(jQuery.extend(saved[0], jQuery.Event.prototype), saved.slice(1), this)
          });
          event.stopImmediatePropagation()
        }
      }
    })
  }
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle)
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props)
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
      this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget
    } else {
      this.type = src
    }
    if (props) {
      jQuery.extend(this, props)
    }
    this.timeStamp = src && src.timeStamp || Date.now();
    this[jQuery.expando] = true
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && !this.isSimulated) {
        e.preventDefault()
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopPropagation()
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopImmediatePropagation()
      }
      this.stopPropagation()
    }
  };
  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    char: true,
    code: true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: true
  }, jQuery.event.addProp);
  jQuery.each({
    focus: "focusin",
    blur: "focusout"
  }, function(type, delegateType) {
    jQuery.event.special[type] = {
      setup: function() {
        leverageNative(this, type, expectSync);
        return false
      },
      trigger: function() {
        leverageNative(this, type);
        return true
      },
      _default: function(event) {
        return dataPriv.get(event.target, type)
      },
      delegateType: delegateType
    }
  });
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret, target = this,
          related = event.relatedTarget,
          handleObj = event.handleObj;
        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix
        }
        return ret
      }
    }
  });
  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn)
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1)
    },
    off: function(types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type])
        }
        return this
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined
      }
      if (fn === false) {
        fn = returnFalse
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector)
      })
    }
  });
  var rnoInnerhtml = /<script|<style|<link/i,
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

  function manipulationTarget(elem, content) {
    if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
      return jQuery(elem).children("tbody")[0] || elem
    }
    return elem
  }

  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem
  }

  function restoreScript(elem) {
    if ((elem.type || "").slice(0, 5) === "true/") {
      elem.type = elem.type.slice(5)
    } else {
      elem.removeAttribute("type")
    }
    return elem
  }

  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, udataOld, udataCur, events;
    if (dest.nodeType !== 1) {
      return
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.get(src);
      events = pdataOld.events;
      if (events) {
        dataPriv.remove(dest, "handle events");
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i])
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur)
    }
  }

  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue
    }
  }

  function domManip(collection, args, callback, ignored) {
    args = flat(args);
    var fragment, first, scripts, hasScripts, node, doc, i = 0,
      l = collection.length,
      iNoClone = l - 1,
      value = args[0],
      valueIsFunction = isFunction(value);
    if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (valueIsFunction) {
          args[0] = value.call(this, index, self.html())
        }
        domManip(self, args, callback, ignored)
      })
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"))
            }
          }
          callback.call(collection[i], node, i)
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src && (node.type || "").toLowerCase() !== "module") {
                if (jQuery._evalUrl && !node.noModule) {
                  jQuery._evalUrl(node.src, {
                    nonce: node.nonce || node.getAttribute("nonce")
                  }, doc)
                }
              } else {
                DOMEval(node.textContent.replace(rcleanScript, ""), node, doc)
              }
            }
          }
        }
      }
    }
    return collection
  }

  function remove(elem, selector, keepData) {
    var node, nodes = selector ? jQuery.filter(selector, elem) : elem,
      i = 0;
    for (;
      (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node))
      }
      if (node.parentNode) {
        if (keepData && isAttached(node)) {
          setGlobalEval(getAll(node, "script"))
        }
        node.parentNode.removeChild(node)
      }
    }
    return elem
  }
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i, l, srcElements, destElements, clone = elem.cloneNode(true),
        inPage = isAttached(elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i])
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i])
          }
        } else {
          cloneCopyEvent(elem, clone)
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"))
      }
      return clone
    },
    cleanData: function(elems) {
      var data, elem, type, special = jQuery.event.special,
        i = 0;
      for (;
        (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if (data = elem[dataPriv.expando]) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type)
                } else {
                  jQuery.removeEvent(elem, type, data.handle)
                }
              }
            }
            elem[dataPriv.expando] = undefined
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    detach: function(selector) {
      return remove(this, selector, true)
    },
    remove: function(selector) {
      return remove(this, selector)
    },
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value
          }
        })
      }, null, value, arguments.length)
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem)
        }
      })
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild)
        }
      })
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this)
        }
      })
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling)
        }
      })
    },
    empty: function() {
      var elem, i = 0;
      for (;
        (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = ""
        }
      }
      return this
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
      })
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
          i = 0,
          l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value
              }
            }
            elem = 0
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value)
        }
      }, null, value, arguments.length)
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this)
          }
        }
      }, ignored)
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems, ret = [],
        insert = jQuery(selector),
        last = insert.length - 1,
        i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get())
      }
      return this.pushStack(ret)
    }
  });
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var rcustomProp = /^--/;
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window
    }
    return view.getComputedStyle(elem)
  };
  var swap = function(elem, options, callback) {
    var ret, name, old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name]
    }
    ret = callback.call(elem);
    for (name in options) {
      elem.style[name] = old[name]
    }
    return ret
  };
  var rboxStyle = new RegExp(cssExpand.join("|"), "i");
  var whitespace = "[\\x20\\t\\r\\n\\f]";
  var rtrimCSS = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");
  (function() {
    function computeStyleTests() {
      if (!div) {
        return
      }
      container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
      div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
      documentElement.appendChild(container).appendChild(div);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
      div.style.right = "60%";
      pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
      boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
      div.style.position = "absolute";
      scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
      documentElement.removeChild(container);
      div = null
    }

    function roundPixelMeasures(measure) {
      return Math.round(parseFloat(measure))
    }
    var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document.createElement("div"),
      div = document.createElement("div");
    if (!div.style) {
      return
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    jQuery.extend(support, {
      boxSizingReliable: function() {
        computeStyleTests();
        return boxSizingReliableVal
      },
      pixelBoxStyles: function() {
        computeStyleTests();
        return pixelBoxStylesVal
      },
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal
      },
      reliableMarginLeft: function() {
        computeStyleTests();
        return reliableMarginLeftVal
      },
      scrollboxSize: function() {
        computeStyleTests();
        return scrollboxSizeVal
      },
      reliableTrDimensions: function() {
        var table, tr, trChild, trStyle;
        if (reliableTrDimensionsVal == null) {
          table = document.createElement("table");
          tr = document.createElement("tr");
          trChild = document.createElement("div");
          table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
          tr.style.cssText = "border:1px solid";
          tr.style.height = "1px";
          trChild.style.height = "9px";
          trChild.style.display = "block";
          documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
          trStyle = window.getComputedStyle(tr);
          reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
          documentElement.removeChild(table)
        }
        return reliableTrDimensionsVal
      }
    })
  })();

  function curCSS(elem, name, computed) {
    var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name),
      style = elem.style;
    computed = computed || getStyles(elem);
    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];
      if (isCustomProp && ret) {
        ret = ret.replace(rtrimCSS, "$1") || undefined
      }
      if (ret === "" && !isAttached(elem)) {
        ret = jQuery.style(elem, name)
      }
      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth
      }
    }
    return ret !== undefined ? ret + "" : ret
  }

  function addGetHookIf(conditionFn, hookFn) {
    return {
      get: function() {
        if (conditionFn()) {
          delete this.get;
          return
        }
        return (this.get = hookFn).apply(this, arguments)
      }
    }
  }
  var cssPrefixes = ["Webkit", "Moz", "ms"],
    emptyStyle = document.createElement("div").style,
    vendorProps = {};

  function vendorPropName(name) {
    var capName = name[0].toUpperCase() + name.slice(1),
      i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name
      }
    }
  }

  function finalPropName(name) {
    var final = jQuery.cssProps[name] || vendorProps[name];
    if (final) {
      return final
    }
    if (name in emptyStyle) {
      return name
    }
    return vendorProps[name] = vendorPropName(name) || name
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    cssShow = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    cssNormalTransform = {
      letterSpacing: "0",
      fontWeight: "400"
    };

  function setPositiveNumber(_elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value
  }

  function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
    var i = dimension === "width" ? 1 : 0,
      extra = 0,
      delta = 0;
    if (box === (isBorderBox ? "border" : "content")) {
      return 0
    }
    for (; i < 4; i += 2) {
      if (box === "margin") {
        delta += jQuery.css(elem, box + cssExpand[i], true, styles)
      }
      if (!isBorderBox) {
        delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (box !== "padding") {
          delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
        } else {
          extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
        }
      } else {
        if (box === "content") {
          delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles)
        }
        if (box !== "margin") {
          delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
        }
      }
    }
    if (!isBorderBox && computedVal >= 0) {
      delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - .5)) || 0
    }
    return delta
  }

  function getWidthOrHeight(elem, dimension, extra) {
    var styles = getStyles(elem),
      boxSizingNeeded = !support.boxSizingReliable() || extra,
      isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
      valueIsBorderBox = isBorderBox,
      val = curCSS(elem, dimension, styles),
      offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val
      }
      val = "auto"
    }
    if ((!support.boxSizingReliable() && isBorderBox || !support.reliableTrDimensions() && nodeName(elem, "tr") || val === "auto" || !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && elem.getClientRects().length) {
      isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
      valueIsBorderBox = offsetProp in elem;
      if (valueIsBorderBox) {
        val = elem[offsetProp]
      }
    }
    val = parseFloat(val) || 0;
    return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, val) + "px"
  }
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: true,
      columnCount: true,
      fillOpacity: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      gridArea: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnStart: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowStart: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      widows: true,
      zIndex: true,
      zoom: true
    },
    cssProps: {},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return
      }
      var ret, type, hooks, origName = camelCase(name),
        isCustomProp = rcustomProp.test(name),
        style = elem.style;
      if (!isCustomProp) {
        name = finalPropName(origName)
      }
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number"
        }
        if (value == null || value !== value) {
          return
        }
        if (type === "number" && !isCustomProp) {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit"
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          if (isCustomProp) {
            style.setProperty(name, value)
          } else {
            style[name] = value
          }
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret
        }
        return style[name]
      }
    },
    css: function(elem, name, extra, styles) {
      var val, num, hooks, origName = camelCase(name),
        isCustomProp = rcustomProp.test(name);
      if (!isCustomProp) {
        name = finalPropName(origName)
      }
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra)
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles)
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name]
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val
      }
      return val
    }
  });
  jQuery.each(["height", "width"], function(_i, dimension) {
    jQuery.cssHooks[dimension] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, dimension, extra)
          }) : getWidthOrHeight(elem, dimension, extra)
        }
      },
      set: function(elem, value, extra) {
        var matches, styles = getStyles(elem),
          scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
          boxSizingNeeded = scrollboxSizeBuggy || extra,
          isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
          subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0;
        if (isBorderBox && scrollboxSizeBuggy) {
          subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - .5)
        }
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[dimension] = value;
          value = jQuery.css(elem, dimension)
        }
        return setPositiveNumber(elem, value, subtract)
      }
    }
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
        marginLeft: 0
      }, function() {
        return elem.getBoundingClientRect().left
      })) + "px"
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function(value) {
        var i = 0,
          expanded = {},
          parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
        }
        return expanded
      }
    };
    if (prefix !== "margin") {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles, len, map = {},
          i = 0;
        if (Array.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles)
          }
          return map
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
      }, name, value, arguments.length > 1)
    }
  });

  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing)
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
    },
    run: function(percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
      } else {
        this.pos = eased = percent
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this)
      }
      if (hooks && hooks.set) {
        hooks.set(this)
      } else {
        Tween.propHooks._default.set(this)
      }
      return this
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop]
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween)
        } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
        } else {
          tween.elem[tween.prop] = tween.now
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now
      }
    }
  };
  jQuery.easing = {
    linear: function(p) {
      return p
    },
    swing: function(p) {
      return .5 - Math.cos(p * Math.PI) / 2
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/,
    rrun = /queueHooks$/;

  function schedule() {
    if (inProgress) {
      if (document.hidden === false && window.requestAnimationFrame) {
        window.requestAnimationFrame(schedule)
      } else {
        window.setTimeout(schedule, jQuery.fx.interval)
      }
      jQuery.fx.tick()
    }
  }

  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined
    });
    return fxNow = Date.now()
  }

  function genFx(type, includeWidth) {
    var which, i = 0,
      attrs = {
        height: type
      };
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type
    }
    return attrs
  }

  function createTween(value, prop, animation) {
    var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
      index = 0,
      length = collection.length;
    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        return tween
      }
    }
  }

  function defaultPrefilter(elem, props, opts) {
    var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props,
      anim = this,
      orig = {},
      style = elem.style,
      hidden = elem.nodeType && isHiddenWithinTree(elem),
      dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire()
          }
        }
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire()
          }
        })
      })
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.test(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true
          } else {
            continue
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
      }
    }
    propTween = !jQuery.isEmptyObject(props);
    if (!propTween && jQuery.isEmptyObject(orig)) {
      return
    }
    if (isBox && elem.nodeType === 1) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      restoreDisplay = dataShow && dataShow.display;
      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, "display")
      }
      display = jQuery.css(elem, "display");
      if (display === "none") {
        if (restoreDisplay) {
          display = restoreDisplay
        } else {
          showHide([elem], true);
          restoreDisplay = elem.style.display || restoreDisplay;
          display = jQuery.css(elem, "display");
          showHide([elem])
        }
      }
      if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
        if (jQuery.css(elem, "float") === "none") {
          if (!propTween) {
            anim.done(function() {
              style.display = restoreDisplay
            });
            if (restoreDisplay == null) {
              display = style.display;
              restoreDisplay = display === "none" ? "" : display
            }
          }
          style.display = "inline-block"
        }
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2]
      })
    }
    propTween = false;
    for (prop in orig) {
      if (!propTween) {
        if (dataShow) {
          if ("hidden" in dataShow) {
            hidden = dataShow.hidden
          }
        } else {
          dataShow = dataPriv.access(elem, "fxshow", {
            display: restoreDisplay
          })
        }
        if (toggle) {
          dataShow.hidden = !hidden
        }
        if (hidden) {
          showHide([elem], true)
        }
        anim.done(function() {
          if (!hidden) {
            showHide([elem])
          }
          dataPriv.remove(elem, "fxshow");
          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop])
          }
        })
      }
      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start;
        if (hidden) {
          propTween.end = propTween.start;
          propTween.start = 0
        }
      }
    }
  }

  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (Array.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0]
      }
      if (index !== name) {
        props[name] = value;
        delete props[index]
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing
          }
        }
      } else {
        specialEasing[name] = easing
      }
    }
  }

  function Animation(elem, properties, options) {
    var result, stopped, index = 0,
      length = Animation.prefilters.length,
      deferred = jQuery.Deferred().always(function() {
        delete tick.elem
      }),
      tick = function() {
        if (stopped) {
          return false
        }
        var currentTime = fxNow || createFxNow(),
          remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
          temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent)
        }
        deferred.notifyWith(elem, [animation, percent, remaining]);
        if (percent < 1 && length) {
          return remaining
        }
        if (!length) {
          deferred.notifyWith(elem, [animation, 1, 0])
        }
        deferred.resolveWith(elem, [animation]);
        return false
      },
      animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, {
          specialEasing: {},
          easing: jQuery.easing._default
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function(prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween
        },
        stop: function(gotoEnd) {
          var index = 0,
            length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1)
          }
          if (gotoEnd) {
            deferred.notifyWith(elem, [animation, 1, 0]);
            deferred.resolveWith(elem, [animation, gotoEnd])
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd])
          }
          return this
        }
      }),
      props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result)
        }
        return result
      }
    }
    jQuery.map(props, createTween, animation);
    if (isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation)
    }
    animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {
      "*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween
      }]
    },
    tweener: function(props, callback) {
      if (isFunction(props)) {
        callback = props;
        props = ["*"]
      } else {
        props = props.match(rnothtmlwhite)
      }
      var prop, index = 0,
        length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback)
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback)
      } else {
        Animation.prefilters.push(callback)
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !isFunction(easing) && easing
    };
    if (jQuery.fx.off) {
      opt.duration = 0
    } else {
      if (typeof opt.duration !== "number") {
        if (opt.duration in jQuery.fx.speeds) {
          opt.duration = jQuery.fx.speeds[opt.duration]
        } else {
          opt.duration = jQuery.fx.speeds._default
        }
      }
    }
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx"
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (isFunction(opt.old)) {
        opt.old.call(this)
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue)
      }
    };
    return opt
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({
        opacity: to
      }, speed, easing, callback)
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function() {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty || dataPriv.get(this, "finish")) {
            anim.stop(true)
          }
        };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd)
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined
      }
      if (clearQueue) {
        this.queue(type || "fx", [])
      }
      return this.each(function() {
        var dequeue = true,
          index = type != null && type + "queueHooks",
          timers = jQuery.timers,
          data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index])
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index])
            }
          }
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1)
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type)
        }
      })
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx"
      }
      return this.each(function() {
        var index, data = dataPriv.get(this),
          queue = data[type + "queue"],
          hooks = data[type + "queueHooks"],
          timers = jQuery.timers,
          length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true)
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1)
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this)
          }
        }
        delete data.finish
      })
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(_i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
    }
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback)
    }
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer, i = 0,
      timers = jQuery.timers;
    fxNow = Date.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1)
      }
    }
    if (!timers.length) {
      jQuery.fx.stop()
    }
    fxNow = undefined
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    jQuery.fx.start()
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (inProgress) {
      return
    }
    inProgress = true;
    schedule()
  };
  jQuery.fx.stop = function() {
    inProgress = null
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout)
      }
    })
  };
  (function() {
    var input = document.createElement("input"),
      select = document.createElement("select"),
      opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t"
  })();
  var boolHook, attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1)
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name)
      })
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var ret, hooks, nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value)
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined)
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret
        }
        elem.setAttribute(name, value + "");
        return value
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret
    },
    attrHooks: {
      type: {
        set: function(elem, value) {
          if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val
            }
            return value
          }
        }
      }
    },
    removeAttr: function(elem, value) {
      var name, i = 0,
        attrNames = value && value.match(rnothtmlwhite);
      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          elem.removeAttribute(name)
        }
      }
    }
  });
  boolHook = {
    set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name)
      } else {
        elem.setAttribute(name, name)
      }
      return name
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret, handle, lowercaseName = name.toLowerCase();
      if (!isXML) {
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name, isXML) != null ? lowercaseName : null;
        attrHandle[lowercaseName] = handle
      }
      return ret
    }
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
    rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1)
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name]
      })
    }
  });
  jQuery.extend({
    prop: function(elem, name, value) {
      var ret, hooks, nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name]
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret
        }
        return elem[name] = value
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret
      }
      return elem[name]
    },
    propHooks: {
      tabIndex: {
        get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          if (tabindex) {
            return parseInt(tabindex, 10)
          }
          if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
            return 0
          }
          return -1
        }
      }
    },
    propFix: {
      for: "htmlFor",
      class: "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex
        }
        return null
      },
      set: function(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex
          }
        }
      }
    }
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this
  });

  function stripAndCollapse(value) {
    var tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ")
  }

  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || ""
  }

  function classesToArray(value) {
    if (Array.isArray(value)) {
      return value
    }
    if (typeof value === "string") {
      return value.match(rnothtmlwhite) || []
    }
    return []
  }
  jQuery.fn.extend({
    addClass: function(value) {
      var classNames, cur, curValue, className, i, finalValue;
      if (isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)))
        })
      }
      classNames = classesToArray(value);
      if (classNames.length) {
        return this.each(function() {
          curValue = getClass(this);
          cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
          if (cur) {
            for (i = 0; i < classNames.length; i++) {
              className = classNames[i];
              if (cur.indexOf(" " + className + " ") < 0) {
                cur += className + " "
              }
            }
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              this.setAttribute("class", finalValue)
            }
          }
        })
      }
      return this
    },
    removeClass: function(value) {
      var classNames, cur, curValue, className, i, finalValue;
      if (isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)))
        })
      }
      if (!arguments.length) {
        return this.attr("class", "")
      }
      classNames = classesToArray(value);
      if (classNames.length) {
        return this.each(function() {
          curValue = getClass(this);
          cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
          if (cur) {
            for (i = 0; i < classNames.length; i++) {
              className = classNames[i];
              while (cur.indexOf(" " + className + " ") > -1) {
                cur = cur.replace(" " + className + " ", " ")
              }
            }
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              this.setAttribute("class", finalValue)
            }
          }
        })
      }
      return this
    },
    toggleClass: function(value, stateVal) {
      var classNames, className, i, self, type = typeof value,
        isValidValue = type === "string" || Array.isArray(value);
      if (isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal)
        })
      }
      if (typeof stateVal === "boolean" && isValidValue) {
        return stateVal ? this.addClass(value) : this.removeClass(value)
      }
      classNames = classesToArray(value);
      return this.each(function() {
        if (isValidValue) {
          self = jQuery(this);
          for (i = 0; i < classNames.length; i++) {
            className = classNames[i];
            if (self.hasClass(className)) {
              self.removeClass(className)
            } else {
              self.addClass(className)
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className)
          }
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "")
          }
        }
      })
    },
    hasClass: function(selector) {
      var className, elem, i = 0;
      className = " " + selector + " ";
      while (elem = this[i++]) {
        if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
          return true
        }
      }
      return false
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({
    val: function(value) {
      var hooks, ret, valueIsFunction, elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret
          }
          ret = elem.value;
          if (typeof ret === "string") {
            return ret.replace(rreturn, "")
          }
          return ret == null ? "" : ret
        }
        return
      }
      valueIsFunction = isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return
        }
        if (valueIsFunction) {
          val = value.call(this, i, jQuery(this).val())
        } else {
          val = value
        }
        if (val == null) {
          val = ""
        } else if (typeof val === "number") {
          val += ""
        } else if (Array.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + ""
          })
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val
        }
      })
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : stripAndCollapse(jQuery.text(elem))
        }
      },
      select: {
        get: function(elem) {
          var value, option, i, options = elem.options,
            index = elem.selectedIndex,
            one = elem.type === "select-one",
            values = one ? null : [],
            max = one ? index + 1 : options.length;
          if (index < 0) {
            i = max
          } else {
            i = one ? index : 0
          }
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value
              }
              values.push(value)
            }
          }
          return values
        },
        set: function(elem, value) {
          var optionSet, option, options = elem.options,
            values = jQuery.makeArray(value),
            i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1
          }
          return values
        }
      }
    }
  });
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {
      set: function(elem, value) {
        if (Array.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1
        }
      }
    };
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value
      }
    }
  });
  support.focusin = "onfocusin" in window;
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    stopPropagationCallback = function(e) {
      e.stopPropagation()
    };
  jQuery.extend(jQuery.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document],
        type = hasOwn.call(event, "type") ? event.type : event,
        namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = lastElement = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort()
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return
      }
      if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window)
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        lastElement = cur;
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data)
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault()
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null
            }
            jQuery.event.triggered = type;
            if (event.isPropagationStopped()) {
              lastElement.addEventListener(type, stopPropagationCallback)
            }
            elem[type]();
            if (event.isPropagationStopped()) {
              lastElement.removeEventListener(type, stopPropagationCallback)
            }
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp
            }
          }
        }
      }
      return event.result
    },
    simulate: function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event, event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem)
    }
  });
  jQuery.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this)
      })
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true)
      }
    }
  });
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event))
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this.document || this,
            attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true)
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1)
        },
        teardown: function() {
          var doc = this.ownerDocument || this.document || this,
            attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix)
          } else {
            dataPriv.access(doc, fix, attaches)
          }
        }
      }
    })
  }
  var location = window.location;
  var nonce = {
    guid: Date.now()
  };
  var rquery = /\?/;
  jQuery.parseXML = function(data) {
    var xml, parserErrorElem;
    if (!data || typeof data !== "string") {
      return null
    }
    try {
      xml = (new window.DOMParser).parseFromString(data, "text/xml")
    } catch (e) {}
    parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
    if (!xml || parserErrorElem) {
      jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function(el) {
        return el.textContent
      }).join("\n") : data))
    }
    return xml
  };
  var rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;

  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (Array.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v)
        } else {
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add)
        }
      })
    } else if (!traditional && toType(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
      }
    } else {
      add(prefix, obj)
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix, s = [],
      add = function(key, valueOrFunction) {
        var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value)
      };
    if (a == null) {
      return ""
    }
    if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      jQuery.each(a, function() {
        add(this.name, this.value)
      })
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add)
      }
    }
    return s.join("&")
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
      }).map(function(_i, elem) {
        var val = jQuery(this).val();
        if (val == null) {
          return null
        }
        if (Array.isArray(val)) {
          return jQuery.map(val, function(val) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            }
          })
        }
        return {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        }
      }).get()
    }
  });
  var r20 = /%20/g,
    rhash = /#.*$/,
    rantiCache = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    prefilters = {},
    transports = {},
    allTypes = "*/".concat("*"),
    originAnchor = document.createElement("a");
  originAnchor.href = location.href;

  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*"
      }
      var dataType, i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
      if (isFunction(func)) {
        while (dataType = dataTypes[i++]) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func)
          } else {
            (structure[dataType] = structure[dataType] || []).push(func)
          }
        }
      }
    }
  }

  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
      seekingTransport = structure === transports;

    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport)
        }
      });
      return selected
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
  }

  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep)
    }
    return target
  }

  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct, type, finalDataType, firstDataType, contents = s.contents,
      dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0]
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break
        }
        if (!firstDataType) {
          firstDataType = type
        }
      }
      finalDataType = finalDataType || firstDataType
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType)
      }
      return responses[finalDataType]
    }
  }

  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2, current, conv, tmp, prev, converters = {},
      dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv]
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType)
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2]
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1])
                  }
                  break
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response)
            } else {
              try {
                response = conv(response)
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                }
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    }
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": JSON.parse,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined
      }
      options = options || {};
      var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options),
        callbackContext = s.context || s,
        globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        statusCode = s.statusCode || {},
        requestHeaders = {},
        requestHeadersNames = {},
        strAbort = "canceled",
        jqXHR = {
          readyState: 0,
          getResponseHeader: function(key) {
            var match;
            if (completed) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2])
                }
              }
              match = responseHeaders[key.toLowerCase() + " "]
            }
            return match == null ? null : match.join(", ")
          },
          getAllResponseHeaders: function() {
            return completed ? responseHeadersString : null
          },
          setRequestHeader: function(name, value) {
            if (completed == null) {
              name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
              requestHeaders[name] = value
            }
            return this
          },
          overrideMimeType: function(type) {
            if (completed == null) {
              s.mimeType = type
            }
            return this
          },
          statusCode: function(map) {
            var code;
            if (map) {
              if (completed) {
                jqXHR.always(map[jqXHR.status])
              } else {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]]
                }
              }
            }
            return this
          },
          abort: function(statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText)
            }
            done(0, finalText);
            return this
          }
        };
      deferred.promise(jqXHR);
      s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host
        } catch (e) {
          s.crossDomain = true
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional)
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (completed) {
        return jqXHR
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart")
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url.replace(rhash, "");
      if (!s.hasContent) {
        uncached = s.url.slice(cacheURL.length);
        if (s.data && (s.processData || typeof s.data === "string")) {
          cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          delete s.data
        }
        if (s.cache === false) {
          cacheURL = cacheURL.replace(rantiCache, "$1");
          uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached
        }
        s.url = cacheURL + uncached
      } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
        s.data = s.data.replace(r20, "+")
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL])
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType)
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i])
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
        return jqXHR.abort()
      }
      strAbort = "abort";
      completeDeferred.add(s.complete);
      jqXHR.done(s.success);
      jqXHR.fail(s.error);
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport")
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s])
        }
        if (completed) {
          return jqXHR
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout")
          }, s.timeout)
        }
        try {
          completed = false;
          transport.send(requestHeaders, done)
        } catch (e) {
          if (completed) {
            throw e
          }
          done(-1, e)
        }
      }

      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        if (completed) {
          return
        }
        completed = true;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer)
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses)
        }
        if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
          s.converters["text script"] = function() {}
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent"
          } else if (status === 304) {
            statusText = "notmodified"
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error])
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!--jQuery.active) {
            jQuery.event.trigger("ajaxStop")
          }
        }
      }
      return jqXHR
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json")
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script")
    }
  });
  jQuery.each(["get", "post"], function(_i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined
      }
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url))
    }
  });
  jQuery.ajaxPrefilter(function(s) {
    var i;
    for (i in s.headers) {
      if (i.toLowerCase() === "content-type") {
        s.contentType = s.headers[i] || ""
      }
    }
  });
  jQuery._evalUrl = function(url, options, doc) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,
      converters: {
        "text script": function() {}
      },
      dataFilter: function(response) {
        jQuery.globalEval(response, options, doc)
      }
    })
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0])
        }
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0])
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild
          }
          return elem
        }).append(this)
      }
      return this
    },
    wrapInner: function(html) {
      if (isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i))
        })
      }
      return this.each(function() {
        var self = jQuery(this),
          contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html)
        } else {
          self.append(html)
        }
      })
    },
    wrap: function(html) {
      var htmlIsFunction = isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html)
      })
    },
    unwrap: function(selector) {
      this.parent(selector).not("body").each(function() {
        jQuery(this).replaceWith(this.childNodes)
      });
      return this
    }
  });
  jQuery.expr.pseudos.hidden = function(elem) {
    return !jQuery.expr.pseudos.visible(elem)
  };
  jQuery.expr.pseudos.visible = function(elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
  };
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest
    } catch (e) {}
  };
  var xhrSuccessStatus = {
      0: 200,
      1223: 204
    },
    xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback, errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i, xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i]
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType)
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest"
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i])
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort()
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error")
                  } else {
                    complete(xhr.status, xhr.statusText)
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                    binary: xhr.response
                  } : {
                    text: xhr.responseText
                  }, xhr.getAllResponseHeaders())
                }
              }
            }
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback()
                  }
                })
              }
            }
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null)
          } catch (e) {
            if (callback) {
              throw e
            }
          }
        },
        abort: function() {
          if (callback) {
            callback()
          }
        }
      }
    }
  });
  jQuery.ajaxPrefilter(function(s) {
    if (s.crossDomain) {
      s.contents.script = false
    }
  });
  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function(text) {
        jQuery.globalEval(text);
        return text
      }
    }
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false
    }
    if (s.crossDomain) {
      s.type = "GET"
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain || s.scriptAttrs) {
      var script, callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type)
            }
          });
          document.head.appendChild(script[0])
        },
        abort: function() {
          if (callback) {
            callback()
          }
        }
      }
    }
  });
  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
      this[callback] = true;
      return callback
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName)
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called")
        }
        return responseContainer[0]
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments
      };
      jqXHR.always(function() {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName)
        } else {
          window[callbackName] = overwritten
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName)
        }
        if (responseContainer && isFunction(overwritten)) {
          overwritten(responseContainer[0])
        }
        responseContainer = overwritten = undefined
      });
      return "script"
    }
  });
  support.createHTMLDocument = function() {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2
  }();
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (typeof data !== "string") {
      return []
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false
    }
    var base, parsed, scripts;
    if (!context) {
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument("");
        base = context.createElement("base");
        base.href = document.location.href;
        context.head.appendChild(base)
      } else {
        context = document
      }
    }
    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])]
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove()
    }
    return jQuery.merge([], parsed.childNodes)
  };
  jQuery.fn.load = function(url, params, callback) {
    var selector, type, response, self = this,
      off = url.indexOf(" ");
    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off)
    }
    if (isFunction(params)) {
      callback = params;
      params = undefined
    } else if (params && typeof params === "object") {
      type = "POST"
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR])
        })
      })
    }
    return this
  };
  jQuery.expr.pseudos.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem
    }).length
  };
  jQuery.offset = {
    setOffset: function(elem, options, i) {
      var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
        curElem = jQuery(elem),
        props = {};
      if (position === "static") {
        elem.style.position = "relative"
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0
      }
      if (isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset))
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft
      }
      if ("using" in options) {
        options.using.call(elem, props)
      } else {
        curElem.css(props)
      }
    }
  };
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i)
        })
      }
      var rect, win, elem = this[0];
      if (!elem) {
        return
      }
      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        }
      }
      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      }
    },
    position: function() {
      if (!this[0]) {
        return
      }
      var offsetParent, offset, doc, elem = this[0],
        parentOffset = {
          top: 0,
          left: 0
        };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect()
      } else {
        offset = this.offset();
        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;
        while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.parentNode
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
          parentOffset = jQuery(offsetParent).offset();
          parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
          parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true)
        }
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent
        }
        return offsetParent || documentElement
      })
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win;
        if (isWindow(elem)) {
          win = elem
        } else if (elem.nodeType === 9) {
          win = elem.defaultView
        }
        if (val === undefined) {
          return win ? win[prop] : elem[method]
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset)
        } else {
          elem[method] = val
        }
      }, method, val, arguments.length)
    }
  });
  jQuery.each(["top", "left"], function(_i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
      }
    })
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
          extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (isWindow(elem)) {
            return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name]
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
        }, type, chainable ? margin : undefined, chainable)
      }
    })
  });
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(_i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn)
    }
  });
  jQuery.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn)
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn)
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn)
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
    },
    hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
    }
  });
  jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function(_i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
    }
  });
  var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  jQuery.proxy = function(fn, context) {
    var tmp, args, proxy;
    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp
    }
    if (!isFunction(fn)) {
      return undefined
    }
    args = slice.call(arguments, 2);
    proxy = function() {
      return fn.apply(context || this, args.concat(slice.call(arguments)))
    };
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
    return proxy
  };
  jQuery.holdReady = function(hold) {
    if (hold) {
      jQuery.readyWait++
    } else {
      jQuery.ready(true)
    }
  };
  jQuery.isArray = Array.isArray;
  jQuery.parseJSON = JSON.parse;
  jQuery.nodeName = nodeName;
  jQuery.isFunction = isFunction;
  jQuery.isWindow = isWindow;
  jQuery.camelCase = camelCase;
  jQuery.type = toType;
  jQuery.now = Date.now;
  jQuery.isNumeric = function(obj) {
    var type = jQuery.type(obj);
    return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj))
  };
  jQuery.trim = function(text) {
    return text == null ? "" : (text + "").replace(rtrim, "$1")
  };
  if (typeof define === "function" && define.amd) {
    define("jquery", [], function() {
      return jQuery
    })
  }
  var _jQuery = window.jQuery,
    _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery
    }
    return jQuery
  };
  if (typeof noGlobal === "undefined") {
    window.jQuery = window.$ = jQuery
  }
  return jQuery
});
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Popper = {}))
})(this, function(exports) {
  "use strict";

  function getWindow(node) {
    if (node == null) {
      return window
    }
    if (node.toString() !== "[object Window]") {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window
    }
    return node
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement
  }

  function isShadowRoot(node) {
    if (typeof ShadowRoot === "undefined") {
      return false
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot
  }
  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getUAString() {
    var uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands) {
      return uaData.brands.map(function(item) {
        return item.brand + "/" + item.version
      }).join(" ")
    }
    return navigator.userAgent
  }

  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString())
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false
    }
    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1
    }
    var _ref = isElement(element) ? getWindow(element) : window,
      visualViewport = _ref.visualViewport;
    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x: x,
      y: y
    }
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    }
  }

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    }
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node)
    } else {
      return getHTMLElementScroll(node)
    }
  }

  function getNodeName(element) {
    return element ? (element.nodeName || "").toLowerCase() : null
  }

  function getDocumentElement(element) {
    return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement
  }

  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft
  }

  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element)
  }

  function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1
  }

  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false
    }
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent)
      }
      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement)
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    }
  }

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width
    }
    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height
    }
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    }
  }

  function getParentNode(element) {
    if (getNodeName(element) === "html") {
      return element
    }
    return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element)
  }

  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
      return node.ownerDocument.body
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
      return node
    }
    return getScrollParent(getParentNode(node))
  }

  function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) {
      list = []
    }
    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)))
  }

  function isTableElement(element) {
    return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
      return null
    }
    return element.offsetParent
  }

  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle(element);
      if (elementCss.position === "fixed") {
        return null
      }
    }
    var currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host
    }
    while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle(currentNode);
      if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
        return currentNode
      } else {
        currentNode = currentNode.parentNode
      }
    }
    return null
  }

  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent)
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
      return window
    }
    return offsetParent || getContainingBlock(element) || window
  }
  var top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [top, bottom, right, left];
  var start = "start";
  var end = "end";
  var clippingParents = "clippingParents";
  var viewport = "viewport";
  var popper = "popper";
  var reference = "reference";
  var variationPlacements = basePlacements.reduce(function(acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end])
  }, []);
  var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end])
  }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function order(modifiers) {
    var map = new Map;
    var visited = new Set;
    var result = [];
    modifiers.forEach(function(modifier) {
      map.set(modifier.name, modifier)
    });

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function(dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) {
            sort(depModifier)
          }
        }
      });
      result.push(modifier)
    }
    modifiers.forEach(function(modifier) {
      if (!visited.has(modifier.name)) {
        sort(modifier)
      }
    });
    return result
  }

  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function(acc, phase) {
      return acc.concat(orderedModifiers.filter(function(modifier) {
        return modifier.phase === phase
      }))
    }, [])
  }

  function debounce(fn) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = undefined;
            resolve(fn())
          })
        })
      }
      return pending
    }
  }

  function format(str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key]
    }
    return [].concat(args).reduce(function(p, c) {
      return p.replace(/%s/, c)
    }, str)
  }
  var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
  var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
  var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];

  function validateModifiers(modifiers) {
    modifiers.forEach(function(modifier) {
      [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
        return self.indexOf(value) === index
      }).forEach(function(key) {
        switch (key) {
          case "name":
            if (typeof modifier.name !== "string") {
              console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'))
            }
            break;
          case "enabled":
            if (typeof modifier.enabled !== "boolean") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'))
            }
            break;
          case "phase":
            if (modifierPhases.indexOf(modifier.phase) < 0) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'))
            }
            break;
          case "fn":
            if (typeof modifier.fn !== "function") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'))
            }
            break;
          case "effect":
            if (modifier.effect != null && typeof modifier.effect !== "function") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'))
            }
            break;
          case "requires":
            if (modifier.requires != null && !Array.isArray(modifier.requires)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'))
            }
            break;
          case "requiresIfExists":
            if (!Array.isArray(modifier.requiresIfExists)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'))
            }
            break;
          case "options":
          case "data":
            break;
          default:
            console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
              return '"' + s + '"'
            }).join(", ") + '; but "' + key + '" was provided.')
        }
        modifier.requires && modifier.requires.forEach(function(requirement) {
          if (modifiers.find(function(mod) {
              return mod.name === requirement
            }) == null) {
            console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement))
          }
        })
      })
    })
  }

  function uniqueBy(arr, fn) {
    var identifiers = new Set;
    return arr.filter(function(item) {
      var identifier = fn(item);
      if (!identifiers.has(identifier)) {
        identifiers.add(identifier);
        return true
      }
    })
  }

  function getBasePlacement(placement) {
    return placement.split("-")[0]
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function(merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged
    }, {});
    return Object.keys(merged).map(function(key) {
      return merged[key]
    })
  }

  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();
      if (layoutViewport || !layoutViewport && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop
      }
    }
    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    }
  }

  function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;
    if (getComputedStyle(body || html).direction === "rtl") {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width
    }
    return {
      width: width,
      height: height,
      x: x,
      y: y
    }
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) {
      return true
    } else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;
      do {
        if (next && parent.isSameNode(next)) {
          return true
        }
        next = next.parentNode || next.host
      } while (next)
    }
    return false
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    })
  }

  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === "fixed");
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect
  }

  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)))
  }

  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement(clipperElement)) {
      return []
    }
    return clippingParents.filter(function(clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body"
    })
  }

  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function(accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect
  }

  function getVariation(placement) {
    return placement.split("-")[1]
  }

  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y"
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;
      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;
      default:
        offsets = {
          x: reference.x,
          y: reference.y
        }
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;
        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break
      }
    }
    return offsets
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject)
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function(hashMap, key) {
      hashMap[key] = value;
      return hashMap
    }, {})
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {}
    }
    var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: "absolute",
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function(key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
        overflowOffsets[key] += offset[axis] * multiply
      })
    }
    return overflowOffsets
  }
  var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
  var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    return !args.some(function(element) {
      return !(element && typeof element.getBoundingClientRect === "function")
    })
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {}
    }
    var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions
      }
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          };
          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
          state.orderedModifiers = orderedModifiers.filter(function(m) {
            return m.enabled
          }); {
            var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
              var name = _ref.name;
              return name
            });
            validateModifiers(modifiers);
            if (getBasePlacement(state.options.placement) === auto) {
              var flipModifier = state.orderedModifiers.find(function(_ref2) {
                var name = _ref2.name;
                return name === "flip"
              });
              if (!flipModifier) {
                console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "))
              }
            }
            var _getComputedStyle = getComputedStyle(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft;
            if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
                return parseFloat(margin)
              })) {
              console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "))
            }
          }
          runModifierEffects();
          return instance.update()
        },
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return
          }
          var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper;
          if (!areValidElements(reference, popper)) {
            {
              console.error(INVALID_ELEMENT_ERROR)
            }
            return
          }
          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === "fixed"),
            popper: getLayoutRect(popper)
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function(modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data)
          });
          var __debug_loops__ = 0;
          for (var index = 0; index < state.orderedModifiers.length; index++) {
            {
              __debug_loops__ += 1;
              if (__debug_loops__ > 100) {
                console.error(INFINITE_LOOP_ERROR);
                break
              }
            }
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue
            }
            var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;
            if (typeof fn === "function") {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state
            }
          }
        },
        update: debounce(function() {
          return new Promise(function(resolve) {
            instance.forceUpdate();
            resolve(state)
          })
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true
        }
      };
      if (!areValidElements(reference, popper)) {
        {
          console.error(INVALID_ELEMENT_ERROR)
        }
        return instance
      }
      instance.setOptions(options).then(function(state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state)
        }
      });

      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref3) {
          var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;
          if (typeof effect === "function") {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });
            var noopFn = function noopFn() {};
            effectCleanupFns.push(cleanupFn || noopFn)
          }
        })
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function(fn) {
          return fn()
        });
        effectCleanupFns = []
      }
      return instance
    }
  }
  var passive = {
    passive: true
  };

  function effect$2(_ref) {
    var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
    var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener("scroll", instance.update, passive)
      })
    }
    if (resize) {
      window.addEventListener("resize", instance.update, passive)
    }
    return function() {
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.removeEventListener("scroll", instance.update, passive)
        })
      }
      if (resize) {
        window.removeEventListener("resize", instance.update, passive)
      }
    }
  }
  var eventListeners = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {},
    effect: effect$2,
    data: {}
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
      name = _ref.name;
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: "absolute",
      placement: state.placement
    })
  }
  var popperOffsets$1 = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {}
  };
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };

  function roundOffsetsByDPR(_ref) {
    var x = _ref.x,
      y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    }
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);
        if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth"
        }
      }
      offsetParent = offsetParent;
      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1
      }
      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1
      }
    }
    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign))
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2))
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
      options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets; {
      var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
      if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
          return transitionProperty.indexOf(property) >= 0
        })) {
        console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "))
      }
    }
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === "fixed"
    };
    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })))
    }
    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: "absolute",
        adaptive: false,
        roundOffsets: roundOffsets
      })))
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement
    })
  }
  var computeStyles$1 = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {}
  };

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name];
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(name) {
        var value = attributes[name];
        if (value === false) {
          element.removeAttribute(name)
        } else {
          element.setAttribute(name, value === true ? "" : value)
        }
      })
    })
  }

  function effect$1(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow)
    }
    return function() {
      Object.keys(state.elements).forEach(function(name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
        var style = styleProperties.reduce(function(style, property) {
          style[property] = "";
          return style
        }, {});
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return
        }
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(attribute) {
          element.removeAttribute(attribute)
        })
      })
    }
  }
  var applyStyles$1 = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect: effect$1,
    requires: ["computeStyles"]
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset === "function" ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
      skidding = _ref[0],
      distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    }
  }

  function offset(_ref2) {
    var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
    var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function(acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc
    }, {});
    var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y
    }
    state.modifiersData[name] = data
  }
  var offset$1 = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };
  var hash$1 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };

  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
      return hash$1[matched]
    })
  }
  var hash = {
    start: "end",
    end: "start"
  };

  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
      return hash[matched]
    })
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {}
    }
    var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement) {
      return getVariation(placement) === variation
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function(placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0
    });
    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1; {
        console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "))
      }
    }
    var overflows = allowedPlacements.reduce(function(acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
      return overflows[a] - overflows[b]
    })
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return []
    }
    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)]
  }

  function flip(_ref) {
    var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
    if (state.modifiersData[name]._skip) {
      return
    }
    var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement)
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map;
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];
    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];
      var _basePlacement = getBasePlacement(placement);
      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? "width" : "height";
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide)
      }
      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];
      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0)
      }
      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0)
      }
      if (checks.every(function(check) {
          return check
        })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break
      }
      checksMap.set(placement, checks)
    }
    if (makeFallbackChecks) {
      var numberOfChecks = flipVariations ? 3 : 1;
      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function(placement) {
          var checks = checksMap.get(placement);
          if (checks) {
            return checks.slice(0, _i).every(function(check) {
              return check
            })
          }
        });
        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break"
        }
      };
      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);
        if (_ret === "break") break
      }
    }
    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true
    }
  }
  var flip$1 = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
    data: {
      _skip: false
    }
  };

  function getAltAxis(axis) {
    return axis === "x" ? "y" : "x"
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1))
  }

  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
    var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };
    if (!popperOffsets) {
      return
    }
    if (checkMainAxis) {
      var _offsetModifierState$;
      var mainSide = mainAxis === "y" ? top : left;
      var altSide = mainAxis === "y" ? bottom : right;
      var len = mainAxis === "y" ? "height" : "width";
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide];
      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset
    }
    if (checkAltAxis) {
      var _offsetModifierState$2;
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets[altAxis];
      var _len = altAxis === "y" ? "height" : "width";
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset
    }
    state.modifiersData[name] = data
  }
  var preventOverflow$1 = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"]
  };
  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements))
  };

  function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? "height" : "width";
    if (!arrowElement || !popperOffsets) {
      return
    }
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === "y" ? top : left;
    var maxProp = axis === "y" ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max);
    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$)
  }

  function effect(_ref2) {
    var state = _ref2.state,
      options = _ref2.options;
    var _options$element = options.element,
      arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
    if (arrowElement == null) {
      return
    }
    if (typeof arrowElement === "string") {
      arrowElement = state.elements.popper.querySelector(arrowElement);
      if (!arrowElement) {
        return
      }
    } {
      if (!isHTMLElement(arrowElement)) {
        console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))
      }
    }
    if (!contains(state.elements.popper, arrowElement)) {
      {
        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "))
      }
      return
    }
    state.elements.arrow = arrowElement
  }
  var arrow$1 = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: arrow,
    effect: effect,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      }
    }
    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    }
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function(side) {
      return overflow[side] >= 0
    })
  }

  function hide(_ref) {
    var state = _ref.state,
      name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: "reference"
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped
    })
  }
  var hide$1 = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide
  };
  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = popperGenerator({
    defaultModifiers: defaultModifiers$1
  });
  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = popperGenerator({
    defaultModifiers: defaultModifiers
  });
  exports.applyStyles = applyStyles$1;
  exports.arrow = arrow$1;
  exports.computeStyles = computeStyles$1;
  exports.createPopper = createPopper;
  exports.createPopperLite = createPopper$1;
  exports.defaultModifiers = defaultModifiers;
  exports.detectOverflow = detectOverflow;
  exports.eventListeners = eventListeners;
  exports.flip = flip$1;
  exports.hide = hide$1;
  exports.offset = offset$1;
  exports.popperGenerator = popperGenerator;
  exports.popperOffsets = popperOffsets$1;
  exports.preventOverflow = preventOverflow$1;
  Object.defineProperty(exports, "__esModule", {
    value: true
  })
});
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.moment = factory()
})(this, function() {
  "use strict";
  var hookCallback;

  function hooks() {
    return hookCallback.apply(null, arguments)
  }

  function setHookCallback(callback) {
    hookCallback = callback
  }

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]"
  }

  function isObject(input) {
    return input != null && Object.prototype.toString.call(input) === "[object Object]"
  }

  function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
  }

  function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0
    } else {
      var k;
      for (k in obj) {
        if (hasOwnProp(obj, k)) {
          return false
        }
      }
      return true
    }
  }

  function isUndefined(input) {
    return input === void 0
  }

  function isNumber(input) {
    return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]"
  }

  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]"
  }

  function map(arr, fn) {
    var res = [],
      i, arrLen = arr.length;
    for (i = 0; i < arrLen; ++i) {
      res.push(fn(arr[i], i))
    }
    return res
  }

  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i]
      }
    }
    if (hasOwnProp(b, "toString")) {
      a.toString = b.toString
    }
    if (hasOwnProp(b, "valueOf")) {
      a.valueOf = b.valueOf
    }
    return a
  }

  function createUTC(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc()
  }

  function defaultParsingFlags() {
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidEra: null,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false,
      parsedDateParts: [],
      era: null,
      meridiem: null,
      rfc2822: false,
      weekdayMismatch: false
    }
  }

  function getParsingFlags(m) {
    if (m._pf == null) {
      m._pf = defaultParsingFlags()
    }
    return m._pf
  }
  var some;
  if (Array.prototype.some) {
    some = Array.prototype.some
  } else {
    some = function(fun) {
      var t = Object(this),
        len = t.length >>> 0,
        i;
      for (i = 0; i < len; i++) {
        if (i in t && fun.call(this, t[i], i, t)) {
          return true
        }
      }
      return false
    }
  }

  function isValid(m) {
    if (m._isValid == null) {
      var flags = getParsingFlags(m),
        parsedParts = some.call(flags.parsedDateParts, function(i) {
          return i != null
        }),
        isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
      if (m._strict) {
        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined
      }
      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid
      } else {
        return isNowValid
      }
    }
    return m._isValid
  }

  function createInvalid(flags) {
    var m = createUTC(NaN);
    if (flags != null) {
      extend(getParsingFlags(m), flags)
    } else {
      getParsingFlags(m).userInvalidated = true
    }
    return m
  }
  var momentProperties = hooks.momentProperties = [],
    updateInProgress = false;

  function copyConfig(to, from) {
    var i, prop, val, momentPropertiesLen = momentProperties.length;
    if (!isUndefined(from._isAMomentObject)) {
      to._isAMomentObject = from._isAMomentObject
    }
    if (!isUndefined(from._i)) {
      to._i = from._i
    }
    if (!isUndefined(from._f)) {
      to._f = from._f
    }
    if (!isUndefined(from._l)) {
      to._l = from._l
    }
    if (!isUndefined(from._strict)) {
      to._strict = from._strict
    }
    if (!isUndefined(from._tzm)) {
      to._tzm = from._tzm
    }
    if (!isUndefined(from._isUTC)) {
      to._isUTC = from._isUTC
    }
    if (!isUndefined(from._offset)) {
      to._offset = from._offset
    }
    if (!isUndefined(from._pf)) {
      to._pf = getParsingFlags(from)
    }
    if (!isUndefined(from._locale)) {
      to._locale = from._locale
    }
    if (momentPropertiesLen > 0) {
      for (i = 0; i < momentPropertiesLen; i++) {
        prop = momentProperties[i];
        val = from[prop];
        if (!isUndefined(val)) {
          to[prop] = val
        }
      }
    }
    return to
  }

  function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
      this._d = new Date(NaN)
    }
    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false
    }
  }

  function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null
  }

  function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
      console.warn("Deprecation warning: " + msg)
    }
  }

  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function() {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg)
      }
      if (firstTime) {
        var args = [],
          arg, i, key, argLen = arguments.length;
        for (i = 0; i < argLen; i++) {
          arg = "";
          if (typeof arguments[i] === "object") {
            arg += "\n[" + i + "] ";
            for (key in arguments[0]) {
              if (hasOwnProp(arguments[0], key)) {
                arg += key + ": " + arguments[0][key] + ", "
              }
            }
            arg = arg.slice(0, -2)
          } else {
            arg = arguments[i]
          }
          args.push(arg)
        }
        warn(msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + (new Error).stack);
        firstTime = false
      }
      return fn.apply(this, arguments)
    }, fn)
  }
  var deprecations = {};

  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg)
    }
    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true
    }
  }
  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;

  function isFunction(input) {
    return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]"
  }

  function set(config) {
    var prop, i;
    for (i in config) {
      if (hasOwnProp(config, i)) {
        prop = config[i];
        if (isFunction(prop)) {
          this[i] = prop
        } else {
          this["_" + i] = prop
        }
      }
    }
    this._config = config;
    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
  }

  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig),
      prop;
    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop])
        } else if (childConfig[prop] != null) {
          res[prop] = childConfig[prop]
        } else {
          delete res[prop]
        }
      }
    }
    for (prop in parentConfig) {
      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
        res[prop] = extend({}, res[prop])
      }
    }
    return res
  }

  function Locale(config) {
    if (config != null) {
      this.set(config)
    }
  }
  var keys;
  if (Object.keys) {
    keys = Object.keys
  } else {
    keys = function(obj) {
      var i, res = [];
      for (i in obj) {
        if (hasOwnProp(obj, i)) {
          res.push(i)
        }
      }
      return res
    }
  }
  var defaultCalendar = {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] dddd [at] LT",
    sameElse: "L"
  };

  function calendar(key, mom, now) {
    var output = this._calendar[key] || this._calendar["sameElse"];
    return isFunction(output) ? output.call(mom, now) : output
  }

  function zeroFill(number, targetLength, forceSign) {
    var absNumber = "" + Math.abs(number),
      zerosToFill = targetLength - absNumber.length,
      sign = number >= 0;
    return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber
  }
  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    formatFunctions = {},
    formatTokenFunctions = {};

  function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === "string") {
      func = function() {
        return this[callback]()
      }
    }
    if (token) {
      formatTokenFunctions[token] = func
    }
    if (padded) {
      formatTokenFunctions[padded[0]] = function() {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2])
      }
    }
    if (ordinal) {
      formatTokenFunctions[ordinal] = function() {
        return this.localeData().ordinal(func.apply(this, arguments), token)
      }
    }
  }

  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, "")
    }
    return input.replace(/\\/g, "")
  }

  function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
      i, length;
    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]]
      } else {
        array[i] = removeFormattingTokens(array[i])
      }
    }
    return function(mom) {
      var output = "",
        i;
      for (i = 0; i < length; i++) {
        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i]
      }
      return output
    }
  }

  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate()
    }
    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m)
  }

  function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input
    }
    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
      localFormattingTokens.lastIndex = 0;
      i -= 1
    }
    return format
  }
  var defaultLongDateFormat = {
    LTS: "h:mm:ss A",
    LT: "h:mm A",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A"
  };

  function longDateFormat(key) {
    var format = this._longDateFormat[key],
      formatUpper = this._longDateFormat[key.toUpperCase()];
    if (format || !formatUpper) {
      return format
    }
    this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
      if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
        return tok.slice(1)
      }
      return tok
    }).join("");
    return this._longDateFormat[key]
  }
  var defaultInvalidDate = "Invalid date";

  function invalidDate() {
    return this._invalidDate
  }
  var defaultOrdinal = "%d",
    defaultDayOfMonthOrdinalParse = /\d{1,2}/;

  function ordinal(number) {
    return this._ordinal.replace("%d", number)
  }
  var defaultRelativeTime = {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    w: "a week",
    ww: "%d weeks",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  };

  function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number)
  }

  function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? "future" : "past"];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output)
  }
  var aliases = {};

  function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit
  }

  function normalizeUnits(units) {
    return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : undefined
  }

  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
      normalizedProp, prop;
    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);
        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop]
        }
      }
    }
    return normalizedInput
  }
  var priorities = {};

  function addUnitPriority(unit, priority) {
    priorities[unit] = priority
  }

  function getPrioritizedUnits(unitsObj) {
    var units = [],
      u;
    for (u in unitsObj) {
      if (hasOwnProp(unitsObj, u)) {
        units.push({
          unit: u,
          priority: priorities[u]
        })
      }
    }
    units.sort(function(a, b) {
      return a.priority - b.priority
    });
    return units
  }

  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
  }

  function absFloor(number) {
    if (number < 0) {
      return Math.ceil(number) || 0
    } else {
      return Math.floor(number)
    }
  }

  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
      value = 0;
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber)
    }
    return value
  }

  function makeGetSet(unit, keepTime) {
    return function(value) {
      if (value != null) {
        set$1(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this
      } else {
        return get(this, unit)
      }
    }
  }

  function get(mom, unit) {
    return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN
  }

  function set$1(mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
      if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
        value = toInt(value);
        mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value, mom.month(), daysInMonth(value, mom.month()))
      } else {
        mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value)
      }
    }
  }

  function stringGet(units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units]()
    }
    return this
  }

  function stringSet(units, value) {
    if (typeof units === "object") {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units),
        i, prioritizedLen = prioritized.length;
      for (i = 0; i < prioritizedLen; i++) {
        this[prioritized[i].unit](units[prioritized[i].unit])
      }
    } else {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
        return this[units](value)
      }
    }
    return this
  }
  var match1 = /\d/,
    match2 = /\d\d/,
    match3 = /\d{3}/,
    match4 = /\d{4}/,
    match6 = /[+-]?\d{6}/,
    match1to2 = /\d\d?/,
    match3to4 = /\d\d\d\d?/,
    match5to6 = /\d\d\d\d\d\d?/,
    match1to3 = /\d{1,3}/,
    match1to4 = /\d{1,4}/,
    match1to6 = /[+-]?\d{1,6}/,
    matchUnsigned = /\d+/,
    matchSigned = /[+-]?\d+/,
    matchOffset = /Z|[+-]\d\d:?\d\d/gi,
    matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi,
    matchTimestamp = /[+-]?\d+(\.\d{1,3})?/,
    matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
    regexes;
  regexes = {};

  function addRegexToken(token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function(isStrict, localeData) {
      return isStrict && strictRegex ? strictRegex : regex
    }
  }

  function getParseRegexForToken(token, config) {
    if (!hasOwnProp(regexes, token)) {
      return new RegExp(unescapeFormat(token))
    }
    return regexes[token](config._strict, config._locale)
  }

  function unescapeFormat(s) {
    return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4
    }))
  }

  function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  }
  var tokens = {};

  function addParseToken(token, callback) {
    var i, func = callback,
      tokenLen;
    if (typeof token === "string") {
      token = [token]
    }
    if (isNumber(callback)) {
      func = function(input, array) {
        array[callback] = toInt(input)
      }
    }
    tokenLen = token.length;
    for (i = 0; i < tokenLen; i++) {
      tokens[token[i]] = func
    }
  }

  function addWeekParseToken(token, callback) {
    addParseToken(token, function(input, array, config, token) {
      config._w = config._w || {};
      callback(input, config._w, config, token)
    })
  }

  function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
      tokens[token](input, config._a, config, token)
    }
  }
  var YEAR = 0,
    MONTH = 1,
    DATE = 2,
    HOUR = 3,
    MINUTE = 4,
    SECOND = 5,
    MILLISECOND = 6,
    WEEK = 7,
    WEEKDAY = 8;

  function mod(n, x) {
    return (n % x + x) % x
  }
  var indexOf;
  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf
  } else {
    indexOf = function(o) {
      var i;
      for (i = 0; i < this.length; ++i) {
        if (this[i] === o) {
          return i
        }
      }
      return -1
    }
  }

  function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
      return NaN
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2
  }
  addFormatToken("M", ["MM", 2], "Mo", function() {
    return this.month() + 1
  });
  addFormatToken("MMM", 0, 0, function(format) {
    return this.localeData().monthsShort(this, format)
  });
  addFormatToken("MMMM", 0, 0, function(format) {
    return this.localeData().months(this, format)
  });
  addUnitAlias("month", "M");
  addUnitPriority("month", 8);
  addRegexToken("M", match1to2);
  addRegexToken("MM", match1to2, match2);
  addRegexToken("MMM", function(isStrict, locale) {
    return locale.monthsShortRegex(isStrict)
  });
  addRegexToken("MMMM", function(isStrict, locale) {
    return locale.monthsRegex(isStrict)
  });
  addParseToken(["M", "MM"], function(input, array) {
    array[MONTH] = toInt(input) - 1
  });
  addParseToken(["MMM", "MMMM"], function(input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    if (month != null) {
      array[MONTH] = month
    } else {
      getParsingFlags(config).invalidMonth = input
    }
  });
  var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    defaultMonthsShortRegex = matchWord,
    defaultMonthsRegex = matchWord;

  function localeMonths(m, format) {
    if (!m) {
      return isArray(this._months) ? this._months : this._months["standalone"]
    }
    return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? "format" : "standalone"][m.month()]
  }

  function localeMonthsShort(m, format) {
    if (!m) {
      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"]
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"][m.month()]
  }

  function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
      for (i = 0; i < 12; ++i) {
        mom = createUTC([2e3, i]);
        this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase()
      }
    }
    if (strict) {
      if (format === "MMM") {
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null
      }
    } else {
      if (format === "MMM") {
        ii = indexOf.call(this._shortMonthsParse, llc);
        if (ii !== -1) {
          return ii
        }
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        if (ii !== -1) {
          return ii
        }
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null
      }
    }
  }

  function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;
    if (this._monthsParseExact) {
      return handleStrictParse.call(this, monthName, format, strict)
    }
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = []
    }
    for (i = 0; i < 12; i++) {
      mom = createUTC([2e3, i]);
      if (strict && !this._longMonthsParse[i]) {
        this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
        this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i")
      }
      if (!strict && !this._monthsParse[i]) {
        regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
        this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")
      }
      if (strict && format === "MMMM" && this._longMonthsParse[i].test(monthName)) {
        return i
      } else if (strict && format === "MMM" && this._shortMonthsParse[i].test(monthName)) {
        return i
      } else if (!strict && this._monthsParse[i].test(monthName)) {
        return i
      }
    }
  }

  function setMonth(mom, value) {
    var dayOfMonth;
    if (!mom.isValid()) {
      return mom
    }
    if (typeof value === "string") {
      if (/^\d+$/.test(value)) {
        value = toInt(value)
      } else {
        value = mom.localeData().monthsParse(value);
        if (!isNumber(value)) {
          return mom
        }
      }
    }
    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
    return mom
  }

  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this
    } else {
      return get(this, "Month")
    }
  }

  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month())
  }

  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        computeMonthsParse.call(this)
      }
      if (isStrict) {
        return this._monthsShortStrictRegex
      } else {
        return this._monthsShortRegex
      }
    } else {
      if (!hasOwnProp(this, "_monthsShortRegex")) {
        this._monthsShortRegex = defaultMonthsShortRegex
      }
      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex
    }
  }

  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        computeMonthsParse.call(this)
      }
      if (isStrict) {
        return this._monthsStrictRegex
      } else {
        return this._monthsRegex
      }
    } else {
      if (!hasOwnProp(this, "_monthsRegex")) {
        this._monthsRegex = defaultMonthsRegex
      }
      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex
    }
  }

  function computeMonthsParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length
    }
    var shortPieces = [],
      longPieces = [],
      mixedPieces = [],
      i, mom;
    for (i = 0; i < 12; i++) {
      mom = createUTC([2e3, i]);
      shortPieces.push(this.monthsShort(mom, ""));
      longPieces.push(this.months(mom, ""));
      mixedPieces.push(this.months(mom, ""));
      mixedPieces.push(this.monthsShort(mom, ""))
    }
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i])
    }
    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i])
    }
    this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
    this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i")
  }
  addFormatToken("Y", 0, 0, function() {
    var y = this.year();
    return y <= 9999 ? zeroFill(y, 4) : "+" + y
  });
  addFormatToken(0, ["YY", 2], 0, function() {
    return this.year() % 100
  });
  addFormatToken(0, ["YYYY", 4], 0, "year");
  addFormatToken(0, ["YYYYY", 5], 0, "year");
  addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
  addUnitAlias("year", "y");
  addUnitPriority("year", 1);
  addRegexToken("Y", matchSigned);
  addRegexToken("YY", match1to2, match2);
  addRegexToken("YYYY", match1to4, match4);
  addRegexToken("YYYYY", match1to6, match6);
  addRegexToken("YYYYYY", match1to6, match6);
  addParseToken(["YYYYY", "YYYYYY"], YEAR);
  addParseToken("YYYY", function(input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input)
  });
  addParseToken("YY", function(input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input)
  });
  addParseToken("Y", function(input, array) {
    array[YEAR] = parseInt(input, 10)
  });

  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365
  }
  hooks.parseTwoDigitYear = function(input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3)
  };
  var getSetYear = makeGetSet("FullYear", true);

  function getIsLeapYear() {
    return isLeapYear(this.year())
  }

  function createDate(y, m, d, h, M, s, ms) {
    var date;
    if (y < 100 && y >= 0) {
      date = new Date(y + 400, m, d, h, M, s, ms);
      if (isFinite(date.getFullYear())) {
        date.setFullYear(y)
      }
    } else {
      date = new Date(y, m, d, h, M, s, ms)
    }
    return date
  }

  function createUTCDate(y) {
    var date, args;
    if (y < 100 && y >= 0) {
      args = Array.prototype.slice.call(arguments);
      args[0] = y + 400;
      date = new Date(Date.UTC.apply(null, args));
      if (isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y)
      }
    } else {
      date = new Date(Date.UTC.apply(null, arguments))
    }
    return date
  }

  function firstWeekOffset(year, dow, doy) {
    var fwd = 7 + dow - doy,
      fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1
  }

  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
      weekOffset = firstWeekOffset(year, dow, doy),
      dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
      resYear, resDayOfYear;
    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear
    } else if (dayOfYear > daysInYear(year)) {
      resYear = year + 1;
      resDayOfYear = dayOfYear - daysInYear(year)
    } else {
      resYear = year;
      resDayOfYear = dayOfYear
    }
    return {
      year: resYear,
      dayOfYear: resDayOfYear
    }
  }

  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
      week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
      resWeek, resYear;
    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy)
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
      resWeek = week - weeksInYear(mom.year(), dow, doy);
      resYear = mom.year() + 1
    } else {
      resYear = mom.year();
      resWeek = week
    }
    return {
      week: resWeek,
      year: resYear
    }
  }

  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
      weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7
  }
  addFormatToken("w", ["ww", 2], "wo", "week");
  addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
  addUnitAlias("week", "w");
  addUnitAlias("isoWeek", "W");
  addUnitPriority("week", 5);
  addUnitPriority("isoWeek", 5);
  addRegexToken("w", match1to2);
  addRegexToken("ww", match1to2, match2);
  addRegexToken("W", match1to2);
  addRegexToken("WW", match1to2, match2);
  addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input)
  });

  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week
  }
  var defaultLocaleWeek = {
    dow: 0,
    doy: 6
  };

  function localeFirstDayOfWeek() {
    return this._week.dow
  }

  function localeFirstDayOfYear() {
    return this._week.doy
  }

  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, "d")
  }

  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, "d")
  }
  addFormatToken("d", 0, "do", "day");
  addFormatToken("dd", 0, 0, function(format) {
    return this.localeData().weekdaysMin(this, format)
  });
  addFormatToken("ddd", 0, 0, function(format) {
    return this.localeData().weekdaysShort(this, format)
  });
  addFormatToken("dddd", 0, 0, function(format) {
    return this.localeData().weekdays(this, format)
  });
  addFormatToken("e", 0, 0, "weekday");
  addFormatToken("E", 0, 0, "isoWeekday");
  addUnitAlias("day", "d");
  addUnitAlias("weekday", "e");
  addUnitAlias("isoWeekday", "E");
  addUnitPriority("day", 11);
  addUnitPriority("weekday", 11);
  addUnitPriority("isoWeekday", 11);
  addRegexToken("d", match1to2);
  addRegexToken("e", match1to2);
  addRegexToken("E", match1to2);
  addRegexToken("dd", function(isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict)
  });
  addRegexToken("ddd", function(isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict)
  });
  addRegexToken("dddd", function(isStrict, locale) {
    return locale.weekdaysRegex(isStrict)
  });
  addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    if (weekday != null) {
      week.d = weekday
    } else {
      getParsingFlags(config).invalidWeekday = input
    }
  });
  addWeekParseToken(["d", "e", "E"], function(input, week, config, token) {
    week[token] = toInt(input)
  });

  function parseWeekday(input, locale) {
    if (typeof input !== "string") {
      return input
    }
    if (!isNaN(input)) {
      return parseInt(input, 10)
    }
    input = locale.weekdaysParse(input);
    if (typeof input === "number") {
      return input
    }
    return null
  }

  function parseIsoWeekday(input, locale) {
    if (typeof input === "string") {
      return locale.weekdaysParse(input) % 7 || 7
    }
    return isNaN(input) ? null : input
  }

  function shiftWeekdays(ws, n) {
    return ws.slice(n, 7).concat(ws.slice(0, n))
  }
  var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    defaultWeekdaysRegex = matchWord,
    defaultWeekdaysShortRegex = matchWord,
    defaultWeekdaysMinRegex = matchWord;

  function localeWeekdays(m, format) {
    var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? "format" : "standalone"];
    return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays
  }

  function localeWeekdaysShort(m) {
    return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort
  }

  function localeWeekdaysMin(m) {
    return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin
  }

  function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];
      for (i = 0; i < 7; ++i) {
        mom = createUTC([2e3, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase()
      }
    }
    if (strict) {
      if (format === "dddd") {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null
      } else if (format === "ddd") {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null
      }
    } else {
      if (format === "dddd") {
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii
        }
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null
      } else if (format === "ddd") {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii
        }
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        if (ii !== -1) {
          return ii
        }
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii
        }
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null
      }
    }
  }

  function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;
    if (this._weekdaysParseExact) {
      return handleStrictParse$1.call(this, weekdayName, format, strict)
    }
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = []
    }
    for (i = 0; i < 7; i++) {
      mom = createUTC([2e3, 1]).day(i);
      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
        this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
        this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i")
      }
      if (!this._weekdaysParse[i]) {
        regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
        this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")
      }
      if (strict && format === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i
      } else if (strict && format === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
        return i
      } else if (strict && format === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
        return i
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i
      }
    }
  }

  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, "d")
    } else {
      return day
    }
  }

  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, "d")
  }

  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN
    }
    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7)
    } else {
      return this.day() || 7
    }
  }

  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this)
      }
      if (isStrict) {
        return this._weekdaysStrictRegex
      } else {
        return this._weekdaysRegex
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        this._weekdaysRegex = defaultWeekdaysRegex
      }
      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex
    }
  }

  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this)
      }
      if (isStrict) {
        return this._weekdaysShortStrictRegex
      } else {
        return this._weekdaysShortRegex
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysShortRegex")) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex
      }
      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex
    }
  }

  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this)
      }
      if (isStrict) {
        return this._weekdaysMinStrictRegex
      } else {
        return this._weekdaysMinRegex
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysMinRegex")) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex
      }
      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex
    }
  }

  function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length
    }
    var minPieces = [],
      shortPieces = [],
      longPieces = [],
      mixedPieces = [],
      i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
      mom = createUTC([2e3, 1]).day(i);
      minp = regexEscape(this.weekdaysMin(mom, ""));
      shortp = regexEscape(this.weekdaysShort(mom, ""));
      longp = regexEscape(this.weekdays(mom, ""));
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp)
    }
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
    this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
    this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i")
  }

  function hFormat() {
    return this.hours() % 12 || 12
  }

  function kFormat() {
    return this.hours() || 24
  }
  addFormatToken("H", ["HH", 2], 0, "hour");
  addFormatToken("h", ["hh", 2], 0, hFormat);
  addFormatToken("k", ["kk", 2], 0, kFormat);
  addFormatToken("hmm", 0, 0, function() {
    return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2)
  });
  addFormatToken("hmmss", 0, 0, function() {
    return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2)
  });
  addFormatToken("Hmm", 0, 0, function() {
    return "" + this.hours() + zeroFill(this.minutes(), 2)
  });
  addFormatToken("Hmmss", 0, 0, function() {
    return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2)
  });

  function meridiem(token, lowercase) {
    addFormatToken(token, 0, 0, function() {
      return this.localeData().meridiem(this.hours(), this.minutes(), lowercase)
    })
  }
  meridiem("a", true);
  meridiem("A", false);
  addUnitAlias("hour", "h");
  addUnitPriority("hour", 13);

  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse
  }
  addRegexToken("a", matchMeridiem);
  addRegexToken("A", matchMeridiem);
  addRegexToken("H", match1to2);
  addRegexToken("h", match1to2);
  addRegexToken("k", match1to2);
  addRegexToken("HH", match1to2, match2);
  addRegexToken("hh", match1to2, match2);
  addRegexToken("kk", match1to2, match2);
  addRegexToken("hmm", match3to4);
  addRegexToken("hmmss", match5to6);
  addRegexToken("Hmm", match3to4);
  addRegexToken("Hmmss", match5to6);
  addParseToken(["H", "HH"], HOUR);
  addParseToken(["k", "kk"], function(input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput
  });
  addParseToken(["a", "A"], function(input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input
  });
  addParseToken(["h", "hh"], function(input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true
  });
  addParseToken("hmm", function(input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true
  });
  addParseToken("hmmss", function(input, array, config) {
    var pos1 = input.length - 4,
      pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true
  });
  addParseToken("Hmm", function(input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos))
  });
  addParseToken("Hmmss", function(input, array, config) {
    var pos1 = input.length - 4,
      pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2))
  });

  function localeIsPM(input) {
    return (input + "").toLowerCase().charAt(0) === "p"
  }
  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
    getSetHour = makeGetSet("Hours", true);

  function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? "pm" : "PM"
    } else {
      return isLower ? "am" : "AM"
    }
  }
  var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse
  };
  var locales = {},
    localeFamilies = {},
    globalLocale;

  function commonPrefix(arr1, arr2) {
    var i, minl = Math.min(arr1.length, arr2.length);
    for (i = 0; i < minl; i += 1) {
      if (arr1[i] !== arr2[i]) {
        return i
      }
    }
    return minl
  }

  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace("_", "-") : key
  }

  function chooseLocale(names) {
    var i = 0,
      j, next, locale, split;
    while (i < names.length) {
      split = normalizeLocale(names[i]).split("-");
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split("-") : null;
      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join("-"));
        if (locale) {
          return locale
        }
        if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
          break
        }
        j--
      }
      i++
    }
    return globalLocale
  }

  function isLocaleNameSane(name) {
    return name.match("^[^/\\\\]*$") != null
  }

  function loadLocale(name) {
    var oldLocale = null,
      aliasedRequire;
    if (locales[name] === undefined && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
      try {
        oldLocale = globalLocale._abbr;
        aliasedRequire = require;
        aliasedRequire("./locale/" + name);
        getSetGlobalLocale(oldLocale)
      } catch (e) {
        locales[name] = null
      }
    }
    return locales[name]
  }

  function getSetGlobalLocale(key, values) {
    var data;
    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key)
      } else {
        data = defineLocale(key, values)
      }
      if (data) {
        globalLocale = data
      } else {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("Locale " + key + " not found. Did you forget to load it?")
        }
      }
    }
    return globalLocale._abbr
  }

  function defineLocale(name, config) {
    if (config !== null) {
      var locale, parentConfig = baseConfig;
      config.abbr = name;
      if (locales[name] != null) {
        deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change " + "an existing locale. moment.defineLocale(localeName, " + "config) should only be used for creating a new locale " + "See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
        parentConfig = locales[name]._config
      } else if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
          parentConfig = locales[config.parentLocale]._config
        } else {
          locale = loadLocale(config.parentLocale);
          if (locale != null) {
            parentConfig = locale._config
          } else {
            if (!localeFamilies[config.parentLocale]) {
              localeFamilies[config.parentLocale] = []
            }
            localeFamilies[config.parentLocale].push({
              name: name,
              config: config
            });
            return null
          }
        }
      }
      locales[name] = new Locale(mergeConfigs(parentConfig, config));
      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function(x) {
          defineLocale(x.name, x.config)
        })
      }
      getSetGlobalLocale(name);
      return locales[name]
    } else {
      delete locales[name];
      return null
    }
  }

  function updateLocale(name, config) {
    if (config != null) {
      var locale, tmpLocale, parentConfig = baseConfig;
      if (locales[name] != null && locales[name].parentLocale != null) {
        locales[name].set(mergeConfigs(locales[name]._config, config))
      } else {
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
          parentConfig = tmpLocale._config
        }
        config = mergeConfigs(parentConfig, config);
        if (tmpLocale == null) {
          config.abbr = name
        }
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale
      }
      getSetGlobalLocale(name)
    } else {
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;
          if (name === getSetGlobalLocale()) {
            getSetGlobalLocale(name)
          }
        } else if (locales[name] != null) {
          delete locales[name]
        }
      }
    }
    return locales[name]
  }

  function getLocale(key) {
    var locale;
    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr
    }
    if (!key) {
      return globalLocale
    }
    if (!isArray(key)) {
      locale = loadLocale(key);
      if (locale) {
        return locale
      }
      key = [key]
    }
    return chooseLocale(key)
  }

  function listLocales() {
    return keys(locales)
  }

  function checkOverflow(m) {
    var overflow, a = m._a;
    if (a && getParsingFlags(m).overflow === -2) {
      overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
      if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE
      }
      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
        overflow = WEEK
      }
      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY
      }
      getParsingFlags(m).overflow = overflow
    }
    return m
  }
  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
    isoDates = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
      ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
      ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
      ["YYYY-DDD", /\d{4}-\d{3}/],
      ["YYYY-MM", /\d{4}-\d\d/, false],
      ["YYYYYYMMDD", /[+-]\d{10}/],
      ["YYYYMMDD", /\d{8}/],
      ["GGGG[W]WWE", /\d{4}W\d{3}/],
      ["GGGG[W]WW", /\d{4}W\d{2}/, false],
      ["YYYYDDD", /\d{7}/],
      ["YYYYMM", /\d{6}/, false],
      ["YYYY", /\d{4}/, false]
    ],
    isoTimes = [
      ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
      ["HH:mm:ss", /\d\d:\d\d:\d\d/],
      ["HH:mm", /\d\d:\d\d/],
      ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
      ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
      ["HHmmss", /\d\d\d\d\d\d/],
      ["HHmm", /\d\d\d\d/],
      ["HH", /\d\d/]
    ],
    aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
    rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
    obsOffsets = {
      UT: 0,
      GMT: 0,
      EDT: -4 * 60,
      EST: -5 * 60,
      CDT: -5 * 60,
      CST: -6 * 60,
      MDT: -6 * 60,
      MST: -7 * 60,
      PDT: -7 * 60,
      PST: -8 * 60
    };

  function configFromISO(config) {
    var i, l, string = config._i,
      match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
      allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length,
      isoTimesLen = isoTimes.length;
    if (match) {
      getParsingFlags(config).iso = true;
      for (i = 0, l = isoDatesLen; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
          dateFormat = isoDates[i][0];
          allowTime = isoDates[i][2] !== false;
          break
        }
      }
      if (dateFormat == null) {
        config._isValid = false;
        return
      }
      if (match[3]) {
        for (i = 0, l = isoTimesLen; i < l; i++) {
          if (isoTimes[i][1].exec(match[3])) {
            timeFormat = (match[2] || " ") + isoTimes[i][0];
            break
          }
        }
        if (timeFormat == null) {
          config._isValid = false;
          return
        }
      }
      if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return
      }
      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = "Z"
        } else {
          config._isValid = false;
          return
        }
      }
      config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
      configFromStringAndFormat(config)
    } else {
      config._isValid = false
    }
  }

  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];
    if (secondStr) {
      result.push(parseInt(secondStr, 10))
    }
    return result
  }

  function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
      return 2e3 + year
    } else if (year <= 999) {
      return 1900 + year
    }
    return year
  }

  function preprocessRFC2822(s) {
    return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
  }

  function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
        weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
      if (weekdayProvided !== weekdayActual) {
        getParsingFlags(config).weekdayMismatch = true;
        config._isValid = false;
        return false
      }
    }
    return true
  }

  function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
      return obsOffsets[obsOffset]
    } else if (militaryOffset) {
      return 0
    } else {
      var hm = parseInt(numOffset, 10),
        m = hm % 100,
        h = (hm - m) / 100;
      return h * 60 + m
    }
  }

  function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i)),
      parsedArray;
    if (match) {
      parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
      if (!checkWeekday(match[1], parsedArray, config)) {
        return
      }
      config._a = parsedArray;
      config._tzm = calculateOffset(match[8], match[9], match[10]);
      config._d = createUTCDate.apply(null, config._a);
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      getParsingFlags(config).rfc2822 = true
    } else {
      config._isValid = false
    }
  }

  function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);
    if (matched !== null) {
      config._d = new Date(+matched[1]);
      return
    }
    configFromISO(config);
    if (config._isValid === false) {
      delete config._isValid
    } else {
      return
    }
    configFromRFC2822(config);
    if (config._isValid === false) {
      delete config._isValid
    } else {
      return
    }
    if (config._strict) {
      config._isValid = false
    } else {
      hooks.createFromInputFallback(config)
    }
  }
  hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), " + "which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are " + "discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
    config._d = new Date(config._i + (config._useUTC ? " UTC" : ""))
  });

  function defaults(a, b, c) {
    if (a != null) {
      return a
    }
    if (b != null) {
      return b
    }
    return c
  }

  function currentDateArray(config) {
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
      return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()]
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()]
  }

  function configFromArray(config) {
    var i, date, input = [],
      currentDate, expectedWeekday, yearToUse;
    if (config._d) {
      return
    }
    currentDate = currentDateArray(config);
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config)
    }
    if (config._dayOfYear != null) {
      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
      if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
        getParsingFlags(config)._overflowDayOfYear = true
      }
      date = createUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate()
    }
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i]
    }
    for (; i < 7; i++) {
      config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i]
    }
    if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
      config._nextDay = true;
      config._a[HOUR] = 0
    }
    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm)
    }
    if (config._nextDay) {
      config._a[HOUR] = 24
    }
    if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
      getParsingFlags(config).weekdayMismatch = true
    }
  }

  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4;
      weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
      week = defaults(w.W, 1);
      weekday = defaults(w.E, 1);
      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true
      }
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
      week = defaults(w.w, curWeek.week);
      if (w.d != null) {
        weekday = w.d;
        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true
        }
      } else if (w.e != null) {
        weekday = w.e + dow;
        if (w.e < 0 || w.e > 6) {
          weekdayOverflow = true
        }
      } else {
        weekday = dow
      }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config)._overflowWeeks = true
    } else if (weekdayOverflow != null) {
      getParsingFlags(config)._overflowWeekday = true
    } else {
      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
      config._a[YEAR] = temp.year;
      config._dayOfYear = temp.dayOfYear
    }
  }
  hooks.ISO_8601 = function() {};
  hooks.RFC_2822 = function() {};

  function configFromStringAndFormat(config) {
    if (config._f === hooks.ISO_8601) {
      configFromISO(config);
      return
    }
    if (config._f === hooks.RFC_2822) {
      configFromRFC2822(config);
      return
    }
    config._a = [];
    getParsingFlags(config).empty = true;
    var string = "" + config._i,
      i, parsedInput, tokens, token, skipped, stringLength = string.length,
      totalParsedInputLength = 0,
      era, tokenLen;
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
    tokenLen = tokens.length;
    for (i = 0; i < tokenLen; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));
        if (skipped.length > 0) {
          getParsingFlags(config).unusedInput.push(skipped)
        }
        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length
      }
      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          getParsingFlags(config).empty = false
        } else {
          getParsingFlags(config).unusedTokens.push(token)
        }
        addTimeToArrayFromToken(token, parsedInput, config)
      } else if (config._strict && !parsedInput) {
        getParsingFlags(config).unusedTokens.push(token)
      }
    }
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
      getParsingFlags(config).unusedInput.push(string)
    }
    if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
      getParsingFlags(config).bigHour = undefined
    }
    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
    era = getParsingFlags(config).era;
    if (era !== null) {
      config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR])
    }
    configFromArray(config);
    checkOverflow(config)
  }

  function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;
    if (meridiem == null) {
      return hour
    }
    if (locale.meridiemHour != null) {
      return locale.meridiemHour(hour, meridiem)
    } else if (locale.isPM != null) {
      isPm = locale.isPM(meridiem);
      if (isPm && hour < 12) {
        hour += 12
      }
      if (!isPm && hour === 12) {
        hour = 0
      }
      return hour
    } else {
      return hour
    }
  }

  function configFromStringAndArray(config) {
    var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false,
      configfLen = config._f.length;
    if (configfLen === 0) {
      getParsingFlags(config).invalidFormat = true;
      config._d = new Date(NaN);
      return
    }
    for (i = 0; i < configfLen; i++) {
      currentScore = 0;
      validFormatFound = false;
      tempConfig = copyConfig({}, config);
      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC
      }
      tempConfig._f = config._f[i];
      configFromStringAndFormat(tempConfig);
      if (isValid(tempConfig)) {
        validFormatFound = true
      }
      currentScore += getParsingFlags(tempConfig).charsLeftOver;
      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;
      if (!bestFormatIsValid) {
        if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;
          if (validFormatFound) {
            bestFormatIsValid = true
          }
        }
      } else {
        if (currentScore < scoreToBeat) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig
        }
      }
    }
    extend(config, bestMoment || tempConfig)
  }

  function configFromObject(config) {
    if (config._d) {
      return
    }
    var i = normalizeObjectUnits(config._i),
      dayOrDate = i.day === undefined ? i.date : i.day;
    config._a = map([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function(obj) {
      return obj && parseInt(obj, 10)
    });
    configFromArray(config)
  }

  function createFromConfig(config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
      res.add(1, "d");
      res._nextDay = undefined
    }
    return res
  }

  function prepareConfig(config) {
    var input = config._i,
      format = config._f;
    config._locale = config._locale || getLocale(config._l);
    if (input === null || format === undefined && input === "") {
      return createInvalid({
        nullInput: true
      })
    }
    if (typeof input === "string") {
      config._i = input = config._locale.preparse(input)
    }
    if (isMoment(input)) {
      return new Moment(checkOverflow(input))
    } else if (isDate(input)) {
      config._d = input
    } else if (isArray(format)) {
      configFromStringAndArray(config)
    } else if (format) {
      configFromStringAndFormat(config)
    } else {
      configFromInput(config)
    }
    if (!isValid(config)) {
      config._d = null
    }
    return config
  }

  function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
      config._d = new Date(hooks.now())
    } else if (isDate(input)) {
      config._d = new Date(input.valueOf())
    } else if (typeof input === "string") {
      configFromString(config)
    } else if (isArray(input)) {
      config._a = map(input.slice(0), function(obj) {
        return parseInt(obj, 10)
      });
      configFromArray(config)
    } else if (isObject(input)) {
      configFromObject(config)
    } else if (isNumber(input)) {
      config._d = new Date(input)
    } else {
      hooks.createFromInputFallback(config)
    }
  }

  function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};
    if (format === true || format === false) {
      strict = format;
      format = undefined
    }
    if (locale === true || locale === false) {
      strict = locale;
      locale = undefined
    }
    if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
      input = undefined
    }
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c)
  }

  function createLocal(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false)
  }
  var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other < this ? this : other
      } else {
        return createInvalid()
      }
    }),
    prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other > this ? this : other
      } else {
        return createInvalid()
      }
    });

  function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0]
    }
    if (!moments.length) {
      return createLocal()
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
      if (!moments[i].isValid() || moments[i][fn](res)) {
        res = moments[i]
      }
    }
    return res
  }

  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy("isBefore", args)
  }

  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy("isAfter", args)
  }
  var now = function() {
    return Date.now ? Date.now() : +new Date
  };
  var ordering = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

  function isDurationValid(m) {
    var key, unitHasDecimal = false,
      i, orderLen = ordering.length;
    for (key in m) {
      if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
        return false
      }
    }
    for (i = 0; i < orderLen; ++i) {
      if (m[ordering[i]]) {
        if (unitHasDecimal) {
          return false
        }
        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
          unitHasDecimal = true
        }
      }
    }
    return true
  }

  function isValid$1() {
    return this._isValid
  }

  function createInvalid$1() {
    return createDuration(NaN)
  }

  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration),
      years = normalizedInput.year || 0,
      quarters = normalizedInput.quarter || 0,
      months = normalizedInput.month || 0,
      weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
      days = normalizedInput.day || 0,
      hours = normalizedInput.hour || 0,
      minutes = normalizedInput.minute || 0,
      seconds = normalizedInput.second || 0,
      milliseconds = normalizedInput.millisecond || 0;
    this._isValid = isDurationValid(normalizedInput);
    this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 1e3 * 60 * 60;
    this._days = +days + weeks * 7;
    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = getLocale();
    this._bubble()
  }

  function isDuration(obj) {
    return obj instanceof Duration
  }

  function absRound(number) {
    if (number < 0) {
      return Math.round(-1 * number) * -1
    } else {
      return Math.round(number)
    }
  }

  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
      lengthDiff = Math.abs(array1.length - array2.length),
      diffs = 0,
      i;
    for (i = 0; i < len; i++) {
      if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
        diffs++
      }
    }
    return diffs + lengthDiff
  }

  function offset(token, separator) {
    addFormatToken(token, 0, 0, function() {
      var offset = this.utcOffset(),
        sign = "+";
      if (offset < 0) {
        offset = -offset;
        sign = "-"
      }
      return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2)
    })
  }
  offset("Z", ":");
  offset("ZZ", "");
  addRegexToken("Z", matchShortOffset);
  addRegexToken("ZZ", matchShortOffset);
  addParseToken(["Z", "ZZ"], function(input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input)
  });
  var chunkOffset = /([\+\-]|\d\d)/gi;

  function offsetFromString(matcher, string) {
    var matches = (string || "").match(matcher),
      chunk, parts, minutes;
    if (matches === null) {
      return null
    }
    chunk = matches[matches.length - 1] || [];
    parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
    minutes = +(parts[1] * 60) + toInt(parts[2]);
    return minutes === 0 ? 0 : parts[0] === "+" ? minutes : -minutes
  }

  function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
      res = model.clone();
      diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
      res._d.setTime(res._d.valueOf() + diff);
      hooks.updateOffset(res, false);
      return res
    } else {
      return createLocal(input).local()
    }
  }

  function getDateOffset(m) {
    return -Math.round(m._d.getTimezoneOffset())
  }
  hooks.updateOffset = function() {};

  function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
      localAdjust;
    if (!this.isValid()) {
      return input != null ? this : NaN
    }
    if (input != null) {
      if (typeof input === "string") {
        input = offsetFromString(matchShortOffset, input);
        if (input === null) {
          return this
        }
      } else if (Math.abs(input) < 16 && !keepMinutes) {
        input = input * 60
      }
      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this)
      }
      this._offset = input;
      this._isUTC = true;
      if (localAdjust != null) {
        this.add(localAdjust, "m")
      }
      if (offset !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract(this, createDuration(input - offset, "m"), 1, false)
        } else if (!this._changeInProgress) {
          this._changeInProgress = true;
          hooks.updateOffset(this, true);
          this._changeInProgress = null
        }
      }
      return this
    } else {
      return this._isUTC ? offset : getDateOffset(this)
    }
  }

  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== "string") {
        input = -input
      }
      this.utcOffset(input, keepLocalTime);
      return this
    } else {
      return -this.utcOffset()
    }
  }

  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime)
  }

  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;
      if (keepLocalTime) {
        this.subtract(getDateOffset(this), "m")
      }
    }
    return this
  }

  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm, false, true)
    } else if (typeof this._i === "string") {
      var tZone = offsetFromString(matchOffset, this._i);
      if (tZone != null) {
        this.utcOffset(tZone)
      } else {
        this.utcOffset(0, true)
      }
    }
    return this
  }

  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false
    }
    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0
  }

  function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
  }

  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted
    }
    var c = {},
      other;
    copyConfig(c, this);
    c = prepareConfig(c);
    if (c._a) {
      other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
      this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0
    } else {
      this._isDSTShifted = false
    }
    return this._isDSTShifted
  }

  function isLocal() {
    return this.isValid() ? !this._isUTC : false
  }

  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false
  }

  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false
  }
  var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
    isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function createDuration(input, key) {
    var duration = input,
      match = null,
      sign, ret, diffRes;
    if (isDuration(input)) {
      duration = {
        ms: input._milliseconds,
        d: input._days,
        M: input._months
      }
    } else if (isNumber(input) || !isNaN(+input)) {
      duration = {};
      if (key) {
        duration[key] = +input
      } else {
        duration.milliseconds = +input
      }
    } else if (match = aspNetRegex.exec(input)) {
      sign = match[1] === "-" ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign,
        h: toInt(match[HOUR]) * sign,
        m: toInt(match[MINUTE]) * sign,
        s: toInt(match[SECOND]) * sign,
        ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign
      }
    } else if (match = isoRegex.exec(input)) {
      sign = match[1] === "-" ? -1 : 1;
      duration = {
        y: parseIso(match[2], sign),
        M: parseIso(match[3], sign),
        w: parseIso(match[4], sign),
        d: parseIso(match[5], sign),
        h: parseIso(match[6], sign),
        m: parseIso(match[7], sign),
        s: parseIso(match[8], sign)
      }
    } else if (duration == null) {
      duration = {}
    } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
      diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months
    }
    ret = new Duration(duration);
    if (isDuration(input) && hasOwnProp(input, "_locale")) {
      ret._locale = input._locale
    }
    if (isDuration(input) && hasOwnProp(input, "_isValid")) {
      ret._isValid = input._isValid
    }
    return ret
  }
  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;

  function parseIso(inp, sign) {
    var res = inp && parseFloat(inp.replace(",", "."));
    return (isNaN(res) ? 0 : res) * sign
  }

  function positiveMomentsDifference(base, other) {
    var res = {};
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, "M").isAfter(other)) {
      --res.months
    }
    res.milliseconds = +other - +base.clone().add(res.months, "M");
    return res
  }

  function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
      return {
        milliseconds: 0,
        months: 0
      }
    }
    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other)
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months
    }
    return res
  }

  function createAdder(direction, name) {
    return function(val, period) {
      var dur, tmp;
      if (period !== null && !isNaN(+period)) {
        deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). " + "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
        tmp = val;
        val = period;
        period = tmp
      }
      dur = createDuration(val, period);
      addSubtract(this, dur, direction);
      return this
    }
  }

  function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
      days = absRound(duration._days),
      months = absRound(duration._months);
    if (!mom.isValid()) {
      return
    }
    updateOffset = updateOffset == null ? true : updateOffset;
    if (months) {
      setMonth(mom, get(mom, "Month") + months * isAdding)
    }
    if (days) {
      set$1(mom, "Date", get(mom, "Date") + days * isAdding)
    }
    if (milliseconds) {
      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding)
    }
    if (updateOffset) {
      hooks.updateOffset(mom, days || months)
    }
  }
  var add = createAdder(1, "add"),
    subtract = createAdder(-1, "subtract");

  function isString(input) {
    return typeof input === "string" || input instanceof String
  }

  function isMomentInput(input) {
    return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === undefined
  }

  function isMomentInputObject(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input),
      propertyTest = false,
      properties = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"],
      i, property, propertyLen = properties.length;
    for (i = 0; i < propertyLen; i += 1) {
      property = properties[i];
      propertyTest = propertyTest || hasOwnProp(input, property)
    }
    return objectTest && propertyTest
  }

  function isNumberOrStringArray(input) {
    var arrayTest = isArray(input),
      dataTypeTest = false;
    if (arrayTest) {
      dataTypeTest = input.filter(function(item) {
        return !isNumber(item) && isString(input)
      }).length === 0
    }
    return arrayTest && dataTypeTest
  }

  function isCalendarSpec(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input),
      propertyTest = false,
      properties = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"],
      i, property;
    for (i = 0; i < properties.length; i += 1) {
      property = properties[i];
      propertyTest = propertyTest || hasOwnProp(input, property)
    }
    return objectTest && propertyTest
  }

  function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, "days", true);
    return diff < -6 ? "sameElse" : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1 ? "sameDay" : diff < 2 ? "nextDay" : diff < 7 ? "nextWeek" : "sameElse"
  }

  function calendar$1(time, formats) {
    if (arguments.length === 1) {
      if (!arguments[0]) {
        time = undefined;
        formats = undefined
      } else if (isMomentInput(arguments[0])) {
        time = arguments[0];
        formats = undefined
      } else if (isCalendarSpec(arguments[0])) {
        formats = arguments[0];
        time = undefined
      }
    }
    var now = time || createLocal(),
      sod = cloneWithOffset(now, this).startOf("day"),
      format = hooks.calendarFormat(this, sod) || "sameElse",
      output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)))
  }

  function clone() {
    return new Moment(this)
  }

  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false
    }
    units = normalizeUnits(units) || "millisecond";
    if (units === "millisecond") {
      return this.valueOf() > localInput.valueOf()
    } else {
      return localInput.valueOf() < this.clone().startOf(units).valueOf()
    }
  }

  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false
    }
    units = normalizeUnits(units) || "millisecond";
    if (units === "millisecond") {
      return this.valueOf() < localInput.valueOf()
    } else {
      return this.clone().endOf(units).valueOf() < localInput.valueOf()
    }
  }

  function isBetween(from, to, units, inclusivity) {
    var localFrom = isMoment(from) ? from : createLocal(from),
      localTo = isMoment(to) ? to : createLocal(to);
    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
      return false
    }
    inclusivity = inclusivity || "()";
    return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units))
  }

  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
      inputMs;
    if (!(this.isValid() && localInput.isValid())) {
      return false
    }
    units = normalizeUnits(units) || "millisecond";
    if (units === "millisecond") {
      return this.valueOf() === localInput.valueOf()
    } else {
      inputMs = localInput.valueOf();
      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf()
    }
  }

  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units)
  }

  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units)
  }

  function diff(input, units, asFloat) {
    var that, zoneDelta, output;
    if (!this.isValid()) {
      return NaN
    }
    that = cloneWithOffset(input, this);
    if (!that.isValid()) {
      return NaN
    }
    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);
    switch (units) {
      case "year":
        output = monthDiff(this, that) / 12;
        break;
      case "month":
        output = monthDiff(this, that);
        break;
      case "quarter":
        output = monthDiff(this, that) / 3;
        break;
      case "second":
        output = (this - that) / 1e3;
        break;
      case "minute":
        output = (this - that) / 6e4;
        break;
      case "hour":
        output = (this - that) / 36e5;
        break;
      case "day":
        output = (this - that - zoneDelta) / 864e5;
        break;
      case "week":
        output = (this - that - zoneDelta) / 6048e5;
        break;
      default:
        output = this - that
    }
    return asFloat ? output : absFloor(output)
  }

  function monthDiff(a, b) {
    if (a.date() < b.date()) {
      return -monthDiff(b, a)
    }
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
      anchor = a.clone().add(wholeMonthDiff, "months"),
      anchor2, adjust;
    if (b - anchor < 0) {
      anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
      adjust = (b - anchor) / (anchor - anchor2)
    } else {
      anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
      adjust = (b - anchor) / (anchor2 - anchor)
    }
    return -(wholeMonthDiff + adjust) || 0
  }
  hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
  hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";

  function toString() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
  }

  function toISOString(keepOffset) {
    if (!this.isValid()) {
      return null
    }
    var utc = keepOffset !== true,
      m = utc ? this.clone().utc() : this;
    if (m.year() < 0 || m.year() > 9999) {
      return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ")
    }
    if (isFunction(Date.prototype.toISOString)) {
      if (utc) {
        return this.toDate().toISOString()
      } else {
        return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"))
      }
    }
    return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
  }

  function inspect() {
    if (!this.isValid()) {
      return "moment.invalid(/* " + this._i + " */)"
    }
    var func = "moment",
      zone = "",
      prefix, year, datetime, suffix;
    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
      zone = "Z"
    }
    prefix = "[" + func + '("]';
    year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
    datetime = "-MM-DD[T]HH:mm:ss.SSS";
    suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix)
  }

  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output)
  }

  function from(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        to: this,
        from: time
      }).locale(this.locale()).humanize(!withoutSuffix)
    } else {
      return this.localeData().invalidDate()
    }
  }

  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix)
  }

  function to(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        from: this,
        to: time
      }).locale(this.locale()).humanize(!withoutSuffix)
    } else {
      return this.localeData().invalidDate()
    }
  }

  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix)
  }

  function locale(key) {
    var newLocaleData;
    if (key === undefined) {
      return this._locale._abbr
    } else {
      newLocaleData = getLocale(key);
      if (newLocaleData != null) {
        this._locale = newLocaleData
      }
      return this
    }
  }
  var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
    if (key === undefined) {
      return this.localeData()
    } else {
      return this.locale(key)
    }
  });

  function localeData() {
    return this._locale
  }
  var MS_PER_SECOND = 1e3,
    MS_PER_MINUTE = 60 * MS_PER_SECOND,
    MS_PER_HOUR = 60 * MS_PER_MINUTE,
    MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

  function mod$1(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor
  }

  function localStartOfDate(y, m, d) {
    if (y < 100 && y >= 0) {
      return new Date(y + 400, m, d) - MS_PER_400_YEARS
    } else {
      return new Date(y, m, d).valueOf()
    }
  }

  function utcStartOfDate(y, m, d) {
    if (y < 100 && y >= 0) {
      return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS
    } else {
      return Date.UTC(y, m, d)
    }
  }

  function startOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);
    if (units === undefined || units === "millisecond" || !this.isValid()) {
      return this
    }
    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
    switch (units) {
      case "year":
        time = startOfDate(this.year(), 0, 1);
        break;
      case "quarter":
        time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
        break;
      case "month":
        time = startOfDate(this.year(), this.month(), 1);
        break;
      case "week":
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
        break;
      case "isoWeek":
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;
      case "day":
      case "date":
        time = startOfDate(this.year(), this.month(), this.date());
        break;
      case "hour":
        time = this._d.valueOf();
        time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;
      case "minute":
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_MINUTE);
        break;
      case "second":
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_SECOND);
        break
    }
    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this
  }

  function endOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);
    if (units === undefined || units === "millisecond" || !this.isValid()) {
      return this
    }
    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
    switch (units) {
      case "year":
        time = startOfDate(this.year() + 1, 0, 1) - 1;
        break;
      case "quarter":
        time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;
      case "month":
        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
        break;
      case "week":
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;
      case "isoWeek":
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;
      case "day":
      case "date":
        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
        break;
      case "hour":
        time = this._d.valueOf();
        time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;
      case "minute":
        time = this._d.valueOf();
        time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
        break;
      case "second":
        time = this._d.valueOf();
        time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
        break
    }
    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this
  }

  function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 6e4
  }

  function unix() {
    return Math.floor(this.valueOf() / 1e3)
  }

  function toDate() {
    return new Date(this.valueOf())
  }

  function toArray() {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()]
  }

  function toObject() {
    var m = this;
    return {
      years: m.year(),
      months: m.month(),
      date: m.date(),
      hours: m.hours(),
      minutes: m.minutes(),
      seconds: m.seconds(),
      milliseconds: m.milliseconds()
    }
  }

  function toJSON() {
    return this.isValid() ? this.toISOString() : null
  }

  function isValid$2() {
    return isValid(this)
  }

  function parsingFlags() {
    return extend({}, getParsingFlags(this))
  }

  function invalidAt() {
    return getParsingFlags(this).overflow
  }

  function creationData() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    }
  }
  addFormatToken("N", 0, 0, "eraAbbr");
  addFormatToken("NN", 0, 0, "eraAbbr");
  addFormatToken("NNN", 0, 0, "eraAbbr");
  addFormatToken("NNNN", 0, 0, "eraName");
  addFormatToken("NNNNN", 0, 0, "eraNarrow");
  addFormatToken("y", ["y", 1], "yo", "eraYear");
  addFormatToken("y", ["yy", 2], 0, "eraYear");
  addFormatToken("y", ["yyy", 3], 0, "eraYear");
  addFormatToken("y", ["yyyy", 4], 0, "eraYear");
  addRegexToken("N", matchEraAbbr);
  addRegexToken("NN", matchEraAbbr);
  addRegexToken("NNN", matchEraAbbr);
  addRegexToken("NNNN", matchEraName);
  addRegexToken("NNNNN", matchEraNarrow);
  addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function(input, array, config, token) {
    var era = config._locale.erasParse(input, token, config._strict);
    if (era) {
      getParsingFlags(config).era = era
    } else {
      getParsingFlags(config).invalidEra = input
    }
  });
  addRegexToken("y", matchUnsigned);
  addRegexToken("yy", matchUnsigned);
  addRegexToken("yyy", matchUnsigned);
  addRegexToken("yyyy", matchUnsigned);
  addRegexToken("yo", matchEraYearOrdinal);
  addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
  addParseToken(["yo"], function(input, array, config, token) {
    var match;
    if (config._locale._eraYearOrdinalRegex) {
      match = input.match(config._locale._eraYearOrdinalRegex)
    }
    if (config._locale.eraYearOrdinalParse) {
      array[YEAR] = config._locale.eraYearOrdinalParse(input, match)
    } else {
      array[YEAR] = parseInt(input, 10)
    }
  });

  function localeEras(m, format) {
    var i, l, date, eras = this._eras || getLocale("en")._eras;
    for (i = 0, l = eras.length; i < l; ++i) {
      switch (typeof eras[i].since) {
        case "string":
          date = hooks(eras[i].since).startOf("day");
          eras[i].since = date.valueOf();
          break
      }
      switch (typeof eras[i].until) {
        case "undefined":
          eras[i].until = +Infinity;
          break;
        case "string":
          date = hooks(eras[i].until).startOf("day").valueOf();
          eras[i].until = date.valueOf();
          break
      }
    }
    return eras
  }

  function localeErasParse(eraName, format, strict) {
    var i, l, eras = this.eras(),
      name, abbr, narrow;
    eraName = eraName.toUpperCase();
    for (i = 0, l = eras.length; i < l; ++i) {
      name = eras[i].name.toUpperCase();
      abbr = eras[i].abbr.toUpperCase();
      narrow = eras[i].narrow.toUpperCase();
      if (strict) {
        switch (format) {
          case "N":
          case "NN":
          case "NNN":
            if (abbr === eraName) {
              return eras[i]
            }
            break;
          case "NNNN":
            if (name === eraName) {
              return eras[i]
            }
            break;
          case "NNNNN":
            if (narrow === eraName) {
              return eras[i]
            }
            break
        }
      } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
        return eras[i]
      }
    }
  }

  function localeErasConvertYear(era, year) {
    var dir = era.since <= era.until ? +1 : -1;
    if (year === undefined) {
      return hooks(era.since).year()
    } else {
      return hooks(era.since).year() + (year - era.offset) * dir
    }
  }

  function getEraName() {
    var i, l, val, eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      val = this.clone().startOf("day").valueOf();
      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].name
      }
      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].name
      }
    }
    return ""
  }

  function getEraNarrow() {
    var i, l, val, eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      val = this.clone().startOf("day").valueOf();
      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].narrow
      }
      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].narrow
      }
    }
    return ""
  }

  function getEraAbbr() {
    var i, l, val, eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      val = this.clone().startOf("day").valueOf();
      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].abbr
      }
      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].abbr
      }
    }
    return ""
  }

  function getEraYear() {
    var i, l, dir, val, eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      dir = eras[i].since <= eras[i].until ? +1 : -1;
      val = this.clone().startOf("day").valueOf();
      if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
        return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset
      }
    }
    return this.year()
  }

  function erasNameRegex(isStrict) {
    if (!hasOwnProp(this, "_erasNameRegex")) {
      computeErasParse.call(this)
    }
    return isStrict ? this._erasNameRegex : this._erasRegex
  }

  function erasAbbrRegex(isStrict) {
    if (!hasOwnProp(this, "_erasAbbrRegex")) {
      computeErasParse.call(this)
    }
    return isStrict ? this._erasAbbrRegex : this._erasRegex
  }

  function erasNarrowRegex(isStrict) {
    if (!hasOwnProp(this, "_erasNarrowRegex")) {
      computeErasParse.call(this)
    }
    return isStrict ? this._erasNarrowRegex : this._erasRegex
  }

  function matchEraAbbr(isStrict, locale) {
    return locale.erasAbbrRegex(isStrict)
  }

  function matchEraName(isStrict, locale) {
    return locale.erasNameRegex(isStrict)
  }

  function matchEraNarrow(isStrict, locale) {
    return locale.erasNarrowRegex(isStrict)
  }

  function matchEraYearOrdinal(isStrict, locale) {
    return locale._eraYearOrdinalRegex || matchUnsigned
  }

  function computeErasParse() {
    var abbrPieces = [],
      namePieces = [],
      narrowPieces = [],
      mixedPieces = [],
      i, l, eras = this.eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      namePieces.push(regexEscape(eras[i].name));
      abbrPieces.push(regexEscape(eras[i].abbr));
      narrowPieces.push(regexEscape(eras[i].narrow));
      mixedPieces.push(regexEscape(eras[i].name));
      mixedPieces.push(regexEscape(eras[i].abbr));
      mixedPieces.push(regexEscape(eras[i].narrow))
    }
    this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
    this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
    this._erasNarrowRegex = new RegExp("^(" + narrowPieces.join("|") + ")", "i")
  }
  addFormatToken(0, ["gg", 2], 0, function() {
    return this.weekYear() % 100
  });
  addFormatToken(0, ["GG", 2], 0, function() {
    return this.isoWeekYear() % 100
  });

  function addWeekYearFormatToken(token, getter) {
    addFormatToken(0, [token, token.length], 0, getter)
  }
  addWeekYearFormatToken("gggg", "weekYear");
  addWeekYearFormatToken("ggggg", "weekYear");
  addWeekYearFormatToken("GGGG", "isoWeekYear");
  addWeekYearFormatToken("GGGGG", "isoWeekYear");
  addUnitAlias("weekYear", "gg");
  addUnitAlias("isoWeekYear", "GG");
  addUnitPriority("weekYear", 1);
  addUnitPriority("isoWeekYear", 1);
  addRegexToken("G", matchSigned);
  addRegexToken("g", matchSigned);
  addRegexToken("GG", match1to2, match2);
  addRegexToken("gg", match1to2, match2);
  addRegexToken("GGGG", match1to4, match4);
  addRegexToken("gggg", match1to4, match4);
  addRegexToken("GGGGG", match1to6, match6);
  addRegexToken("ggggg", match1to6, match6);
  addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input)
  });
  addWeekParseToken(["gg", "GG"], function(input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input)
  });

  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
  }

  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4)
  }

  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4)
  }

  function getISOWeeksInISOWeekYear() {
    return weeksInYear(this.isoWeekYear(), 1, 4)
  }

  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy)
  }

  function getWeeksInWeekYear() {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy)
  }

  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
      return weekOfYear(this, dow, doy).year
    } else {
      weeksTarget = weeksInYear(input, dow, doy);
      if (week > weeksTarget) {
        week = weeksTarget
      }
      return setWeekAll.call(this, input, week, weekday, dow, doy)
    }
  }

  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
      date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this
  }
  addFormatToken("Q", 0, "Qo", "quarter");
  addUnitAlias("quarter", "Q");
  addUnitPriority("quarter", 7);
  addRegexToken("Q", match1);
  addParseToken("Q", function(input, array) {
    array[MONTH] = (toInt(input) - 1) * 3
  });

  function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3)
  }
  addFormatToken("D", ["DD", 2], "Do", "date");
  addUnitAlias("date", "D");
  addUnitPriority("date", 9);
  addRegexToken("D", match1to2);
  addRegexToken("DD", match1to2, match2);
  addRegexToken("Do", function(isStrict, locale) {
    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient
  });
  addParseToken(["D", "DD"], DATE);
  addParseToken("Do", function(input, array) {
    array[DATE] = toInt(input.match(match1to2)[0])
  });
  var getSetDayOfMonth = makeGetSet("Date", true);
  addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
  addUnitAlias("dayOfYear", "DDD");
  addUnitPriority("dayOfYear", 4);
  addRegexToken("DDD", match1to3);
  addRegexToken("DDDD", match3);
  addParseToken(["DDD", "DDDD"], function(input, array, config) {
    config._dayOfYear = toInt(input)
  });

  function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, "d")
  }
  addFormatToken("m", ["mm", 2], 0, "minute");
  addUnitAlias("minute", "m");
  addUnitPriority("minute", 14);
  addRegexToken("m", match1to2);
  addRegexToken("mm", match1to2, match2);
  addParseToken(["m", "mm"], MINUTE);
  var getSetMinute = makeGetSet("Minutes", false);
  addFormatToken("s", ["ss", 2], 0, "second");
  addUnitAlias("second", "s");
  addUnitPriority("second", 15);
  addRegexToken("s", match1to2);
  addRegexToken("ss", match1to2, match2);
  addParseToken(["s", "ss"], SECOND);
  var getSetSecond = makeGetSet("Seconds", false);
  addFormatToken("S", 0, 0, function() {
    return ~~(this.millisecond() / 100)
  });
  addFormatToken(0, ["SS", 2], 0, function() {
    return ~~(this.millisecond() / 10)
  });
  addFormatToken(0, ["SSS", 3], 0, "millisecond");
  addFormatToken(0, ["SSSS", 4], 0, function() {
    return this.millisecond() * 10
  });
  addFormatToken(0, ["SSSSS", 5], 0, function() {
    return this.millisecond() * 100
  });
  addFormatToken(0, ["SSSSSS", 6], 0, function() {
    return this.millisecond() * 1e3
  });
  addFormatToken(0, ["SSSSSSS", 7], 0, function() {
    return this.millisecond() * 1e4
  });
  addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
    return this.millisecond() * 1e5
  });
  addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
    return this.millisecond() * 1e6
  });
  addUnitAlias("millisecond", "ms");
  addUnitPriority("millisecond", 16);
  addRegexToken("S", match1to3, match1);
  addRegexToken("SS", match1to3, match2);
  addRegexToken("SSS", match1to3, match3);
  var token, getSetMillisecond;
  for (token = "SSSS"; token.length <= 9; token += "S") {
    addRegexToken(token, matchUnsigned)
  }

  function parseMs(input, array) {
    array[MILLISECOND] = toInt(("0." + input) * 1e3)
  }
  for (token = "S"; token.length <= 9; token += "S") {
    addParseToken(token, parseMs)
  }
  getSetMillisecond = makeGetSet("Milliseconds", false);
  addFormatToken("z", 0, 0, "zoneAbbr");
  addFormatToken("zz", 0, 0, "zoneName");

  function getZoneAbbr() {
    return this._isUTC ? "UTC" : ""
  }

  function getZoneName() {
    return this._isUTC ? "Coordinated Universal Time" : ""
  }
  var proto = Moment.prototype;
  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$2;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;
  if (typeof Symbol !== "undefined" && Symbol.for != null) {
    proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return "Moment<" + this.format() + ">"
    }
  }
  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.eraName = getEraName;
  proto.eraNarrow = getEraNarrow;
  proto.eraAbbr = getEraAbbr;
  proto.eraYear = getEraYear;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.weeksInWeekYear = getWeeksInWeekYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
  proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
  proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
  proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
  proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);

  function createUnix(input) {
    return createLocal(input * 1e3)
  }

  function createInZone() {
    return createLocal.apply(null, arguments).parseZone()
  }

  function preParsePostFormat(string) {
    return string
  }
  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set;
  proto$1.eras = localeEras;
  proto$1.erasParse = localeErasParse;
  proto$1.erasConvertYear = localeErasConvertYear;
  proto$1.erasAbbrRegex = erasAbbrRegex;
  proto$1.erasNameRegex = erasNameRegex;
  proto$1.erasNarrowRegex = erasNarrowRegex;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;

  function get$1(format, index, field, setter) {
    var locale = getLocale(),
      utc = createUTC().set(setter, index);
    return locale[field](utc, format)
  }

  function listMonthsImpl(format, index, field) {
    if (isNumber(format)) {
      index = format;
      format = undefined
    }
    format = format || "";
    if (index != null) {
      return get$1(format, index, field, "month")
    }
    var i, out = [];
    for (i = 0; i < 12; i++) {
      out[i] = get$1(format, i, field, "month")
    }
    return out
  }

  function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === "boolean") {
      if (isNumber(format)) {
        index = format;
        format = undefined
      }
      format = format || ""
    } else {
      format = localeSorted;
      index = format;
      localeSorted = false;
      if (isNumber(format)) {
        index = format;
        format = undefined
      }
      format = format || ""
    }
    var locale = getLocale(),
      shift = localeSorted ? locale._week.dow : 0,
      i, out = [];
    if (index != null) {
      return get$1(format, (index + shift) % 7, field, "day")
    }
    for (i = 0; i < 7; i++) {
      out[i] = get$1(format, (i + shift) % 7, field, "day")
    }
    return out
  }

  function listMonths(format, index) {
    return listMonthsImpl(format, index, "months")
  }

  function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, "monthsShort")
  }

  function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, "weekdays")
  }

  function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, "weekdaysShort")
  }

  function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin")
  }
  getSetGlobalLocale("en", {
    eras: [{
      since: "0001-01-01",
      until: +Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    }, {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }],
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function(number) {
      var b = number % 10,
        output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
      return number + output
    }
  });
  hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
  hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
  var mathAbs = Math.abs;

  function abs() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this
  }

  function addSubtract$1(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble()
  }

  function add$1(input, value) {
    return addSubtract$1(this, input, value, 1)
  }

  function subtract$1(input, value) {
    return addSubtract$1(this, input, value, -1)
  }

  function absCeil(number) {
    if (number < 0) {
      return Math.floor(number)
    } else {
      return Math.ceil(number)
    }
  }

  function bubble() {
    var milliseconds = this._milliseconds,
      days = this._days,
      months = this._months,
      data = this._data,
      seconds, minutes, hours, years, monthsFromDays;
    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
      days = 0;
      months = 0
    }
    data.milliseconds = milliseconds % 1e3;
    seconds = absFloor(milliseconds / 1e3);
    data.seconds = seconds % 60;
    minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24);
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));
    years = absFloor(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this
  }

  function daysToMonths(days) {
    return days * 4800 / 146097
  }

  function monthsToDays(months) {
    return months * 146097 / 4800
  }

  function as(units) {
    if (!this.isValid()) {
      return NaN
    }
    var days, months, milliseconds = this._milliseconds;
    units = normalizeUnits(units);
    if (units === "month" || units === "quarter" || units === "year") {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);
      switch (units) {
        case "month":
          return months;
        case "quarter":
          return months / 3;
        case "year":
          return months / 12
      }
    } else {
      days = this._days + Math.round(monthsToDays(this._months));
      switch (units) {
        case "week":
          return days / 7 + milliseconds / 6048e5;
        case "day":
          return days + milliseconds / 864e5;
        case "hour":
          return days * 24 + milliseconds / 36e5;
        case "minute":
          return days * 1440 + milliseconds / 6e4;
        case "second":
          return days * 86400 + milliseconds / 1e3;
        case "millisecond":
          return Math.floor(days * 864e5) + milliseconds;
        default:
          throw new Error("Unknown unit " + units)
      }
    }
  }

  function valueOf$1() {
    if (!this.isValid()) {
      return NaN
    }
    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6
  }

  function makeAs(alias) {
    return function() {
      return this.as(alias)
    }
  }
  var asMilliseconds = makeAs("ms"),
    asSeconds = makeAs("s"),
    asMinutes = makeAs("m"),
    asHours = makeAs("h"),
    asDays = makeAs("d"),
    asWeeks = makeAs("w"),
    asMonths = makeAs("M"),
    asQuarters = makeAs("Q"),
    asYears = makeAs("y");

  function clone$1() {
    return createDuration(this)
  }

  function get$2(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + "s"]() : NaN
  }

  function makeGetter(name) {
    return function() {
      return this.isValid() ? this._data[name] : NaN
    }
  }
  var milliseconds = makeGetter("milliseconds"),
    seconds = makeGetter("seconds"),
    minutes = makeGetter("minutes"),
    hours = makeGetter("hours"),
    days = makeGetter("days"),
    months = makeGetter("months"),
    years = makeGetter("years");

  function weeks() {
    return absFloor(this.days() / 7)
  }
  var round = Math.round,
    thresholds = {
      ss: 44,
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      w: null,
      M: 11
    };

  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture)
  }

  function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
    var duration = createDuration(posNegDuration).abs(),
      seconds = round(duration.as("s")),
      minutes = round(duration.as("m")),
      hours = round(duration.as("h")),
      days = round(duration.as("d")),
      months = round(duration.as("M")),
      weeks = round(duration.as("w")),
      years = round(duration.as("y")),
      a = seconds <= thresholds.ss && ["s", seconds] || seconds < thresholds.s && ["ss", seconds] || minutes <= 1 && ["m"] || minutes < thresholds.m && ["mm", minutes] || hours <= 1 && ["h"] || hours < thresholds.h && ["hh", hours] || days <= 1 && ["d"] || days < thresholds.d && ["dd", days];
    if (thresholds.w != null) {
      a = a || weeks <= 1 && ["w"] || weeks < thresholds.w && ["ww", weeks]
    }
    a = a || months <= 1 && ["M"] || months < thresholds.M && ["MM", months] || years <= 1 && ["y"] || ["yy", years];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a)
  }

  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
      return round
    }
    if (typeof roundingFunction === "function") {
      round = roundingFunction;
      return true
    }
    return false
  }

  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
      return false
    }
    if (limit === undefined) {
      return thresholds[threshold]
    }
    thresholds[threshold] = limit;
    if (threshold === "s") {
      thresholds.ss = limit - 1
    }
    return true
  }

  function humanize(argWithSuffix, argThresholds) {
    if (!this.isValid()) {
      return this.localeData().invalidDate()
    }
    var withSuffix = false,
      th = thresholds,
      locale, output;
    if (typeof argWithSuffix === "object") {
      argThresholds = argWithSuffix;
      argWithSuffix = false
    }
    if (typeof argWithSuffix === "boolean") {
      withSuffix = argWithSuffix
    }
    if (typeof argThresholds === "object") {
      th = Object.assign({}, thresholds, argThresholds);
      if (argThresholds.s != null && argThresholds.ss == null) {
        th.ss = argThresholds.s - 1
      }
    }
    locale = this.localeData();
    output = relativeTime$1(this, !withSuffix, th, locale);
    if (withSuffix) {
      output = locale.pastFuture(+this, output)
    }
    return locale.postformat(output)
  }
  var abs$1 = Math.abs;

  function sign(x) {
    return (x > 0) - (x < 0) || +x
  }

  function toISOString$1() {
    if (!this.isValid()) {
      return this.localeData().invalidDate()
    }
    var seconds = abs$1(this._milliseconds) / 1e3,
      days = abs$1(this._days),
      months = abs$1(this._months),
      minutes, hours, years, s, total = this.asSeconds(),
      totalSign, ymSign, daysSign, hmsSign;
    if (!total) {
      return "P0D"
    }
    minutes = absFloor(seconds / 60);
    hours = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;
    years = absFloor(months / 12);
    months %= 12;
    s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, "") : "";
    totalSign = total < 0 ? "-" : "";
    ymSign = sign(this._months) !== sign(total) ? "-" : "";
    daysSign = sign(this._days) !== sign(total) ? "-" : "";
    hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
    return totalSign + "P" + (years ? ymSign + years + "Y" : "") + (months ? ymSign + months + "M" : "") + (days ? daysSign + days + "D" : "") + (hours || minutes || seconds ? "T" : "") + (hours ? hmsSign + hours + "H" : "") + (minutes ? hmsSign + minutes + "M" : "") + (seconds ? hmsSign + s + "S" : "")
  }
  var proto$2 = Duration.prototype;
  proto$2.isValid = isValid$1;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asQuarters = asQuarters;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.clone = clone$1;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
  proto$2.lang = lang;
  addFormatToken("X", 0, 0, "unix");
  addFormatToken("x", 0, 0, "valueOf");
  addRegexToken("x", matchSigned);
  addRegexToken("X", matchTimestamp);
  addParseToken("X", function(input, array, config) {
    config._d = new Date(parseFloat(input) * 1e3)
  });
  addParseToken("x", function(input, array, config) {
    config._d = new Date(toInt(input))
  });
  hooks.version = "2.29.4";
  setHookCallback(createLocal);
  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto;
  hooks.HTML5_FMT = {
    DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
    DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
    DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
    DATE: "YYYY-MM-DD",
    TIME: "HH:mm",
    TIME_SECONDS: "HH:mm:ss",
    TIME_MS: "HH:mm:ss.SSS",
    WEEK: "GGGG-[W]WW",
    MONTH: "YYYY-MM"
  };
  return hooks
});
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object") module.exports = factory();
  else if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof exports === "object") exports["Raphael"] = factory();
  else root["Raphael"] = factory()
})(window, function() {
  return function(modules) {
    var installedModules = {};

    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports
      }
      var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      module.l = true;
      return module.exports
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        })
      }
    };
    __webpack_require__.r = function(exports) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module"
        })
      }
      Object.defineProperty(exports, "__esModule", {
        value: true
      })
    };
    __webpack_require__.t = function(value, mode) {
      if (mode & 1) value = __webpack_require__(value);
      if (mode & 8) return value;
      if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
      var ns = Object.create(null);
      __webpack_require__.r(ns);
      Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value
      });
      if (mode & 2 && typeof value != "string")
        for (var key in value) __webpack_require__.d(ns, key, function(key) {
          return value[key]
        }.bind(null, key));
      return ns
    };
    __webpack_require__.n = function(module) {
      var getter = module && module.__esModule ? function getDefault() {
        return module["default"]
      } : function getModuleExports() {
        return module
      };
      __webpack_require__.d(getter, "a", getter);
      return getter
    };
    __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = "./dev/raphael.amd.js")
  }({
    "./dev/raphael.amd.js": function(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./dev/raphael.core.js"), __webpack_require__("./dev/raphael.svg.js"), __webpack_require__("./dev/raphael.vml.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function(R) {
        return R
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    },
    "./dev/raphael.core.js": function(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./node_modules/eve-raphael/eve.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function(eve) {
        function R(first) {
          if (R.is(first, "function")) {
            return loaded ? first() : eve.on("raphael.DOMload", first)
          } else if (R.is(first, array)) {
            return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first)
          } else {
            var args = Array.prototype.slice.call(arguments, 0);
            if (R.is(args[args.length - 1], "function")) {
              var f = args.pop();
              return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function() {
                f.call(R._engine.create[apply](R, args))
              })
            } else {
              return R._engine.create[apply](R, arguments)
            }
          }
        }
        R.version = "2.3.0";
        R.eve = eve;
        var loaded, separator = /[, ]+/,
          elements = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
          },
          formatrg = /\{(\d+)\}/g,
          proto = "prototype",
          has = "hasOwnProperty",
          g = {
            doc: document,
            win: window
          },
          oldRaphael = {
            was: Object.prototype[has].call(g.win, "Raphael"),
            is: g.win.Raphael
          },
          Paper = function() {
            this.ca = this.customAttributes = {}
          },
          paperproto, appendChild = "appendChild",
          apply = "apply",
          concat = "concat",
          supportsTouch = "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
          E = "",
          S = " ",
          Str = String,
          split = "split",
          events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [split](S),
          touchMap = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
          },
          lowerCase = Str.prototype.toLowerCase,
          math = Math,
          mmax = math.max,
          mmin = math.min,
          abs = math.abs,
          pow = math.pow,
          PI = math.PI,
          nu = "number",
          string = "string",
          array = "array",
          toString = "toString",
          fillString = "fill",
          objectToString = Object.prototype.toString,
          paper = {},
          push = "push",
          ISURL = R._ISURL = /^url\(['"]?(.+?)['"]?\)$/i,
          colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
          isnan = {
            NaN: 1,
            Infinity: 1,
            "-Infinity": 1
          },
          bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
          round = math.round,
          setAttribute = "setAttribute",
          toFloat = parseFloat,
          toInt = parseInt,
          upperCase = Str.prototype.toUpperCase,
          availableAttrs = R._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0,
            class: ""
          },
          availableAnimAttrs = R._availableAnimAttrs = {
            blur: nu,
            "clip-rect": "csv",
            cx: nu,
            cy: nu,
            fill: "colour",
            "fill-opacity": nu,
            "font-size": nu,
            height: nu,
            opacity: nu,
            path: "path",
            r: nu,
            rx: nu,
            ry: nu,
            stroke: "colour",
            "stroke-opacity": nu,
            "stroke-width": nu,
            transform: "transform",
            width: nu,
            x: nu,
            y: nu
          },
          whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
          commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
          hsrg = {
            hs: 1,
            rg: 1
          },
          p2s = /,?([achlmqrstvxz]),?/gi,
          pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
          tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
          pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
          radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
          eldata = {},
          sortByKey = function(a, b) {
            return a.key - b.key
          },
          sortByNumber = function(a, b) {
            return toFloat(a) - toFloat(b)
          },
          fun = function() {},
          pipe = function(x) {
            return x
          },
          rectPath = R._rectPath = function(x, y, w, h, r) {
            if (r) {
              return [
                ["M", x + r, y],
                ["l", w - r * 2, 0],
                ["a", r, r, 0, 0, 1, r, r],
                ["l", 0, h - r * 2],
                ["a", r, r, 0, 0, 1, -r, r],
                ["l", r * 2 - w, 0],
                ["a", r, r, 0, 0, 1, -r, -r],
                ["l", 0, r * 2 - h],
                ["a", r, r, 0, 0, 1, r, -r],
                ["z"]
              ]
            }
            return [
              ["M", x, y],
              ["l", w, 0],
              ["l", 0, h],
              ["l", -w, 0],
              ["z"]
            ]
          },
          ellipsePath = function(x, y, rx, ry) {
            if (ry == null) {
              ry = rx
            }
            return [
              ["M", x, y],
              ["m", 0, -ry],
              ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
              ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
              ["z"]
            ]
          },
          getPath = R._getPath = {
            path: function(el) {
              return el.attr("path")
            },
            circle: function(el) {
              var a = el.attrs;
              return ellipsePath(a.cx, a.cy, a.r)
            },
            ellipse: function(el) {
              var a = el.attrs;
              return ellipsePath(a.cx, a.cy, a.rx, a.ry)
            },
            rect: function(el) {
              var a = el.attrs;
              return rectPath(a.x, a.y, a.width, a.height, a.r)
            },
            image: function(el) {
              var a = el.attrs;
              return rectPath(a.x, a.y, a.width, a.height)
            },
            text: function(el) {
              var bbox = el._getBBox();
              return rectPath(bbox.x, bbox.y, bbox.width, bbox.height)
            },
            set: function(el) {
              var bbox = el._getBBox();
              return rectPath(bbox.x, bbox.y, bbox.width, bbox.height)
            }
          },
          mapPath = R.mapPath = function(path, matrix) {
            if (!matrix) {
              return path
            }
            var x, y, i, j, ii, jj, pathi;
            path = path2curve(path);
            for (i = 0, ii = path.length; i < ii; i++) {
              pathi = path[i];
              for (j = 1, jj = pathi.length; j < jj; j += 2) {
                x = matrix.x(pathi[j], pathi[j + 1]);
                y = matrix.y(pathi[j], pathi[j + 1]);
                pathi[j] = x;
                pathi[j + 1] = y
              }
            }
            return path
          };
        R._g = g;
        R.type = g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
        if (R.type == "VML") {
          var d = g.doc.createElement("div"),
            b;
          d.innerHTML = '<v:shape adj="1"/>';
          b = d.firstChild;
          b.style.behavior = "url(#default#VML)";
          if (!(b && typeof b.adj == "object")) {
            return R.type = E
          }
          d = null
        }
        R.svg = !(R.vml = R.type == "VML");
        R._Paper = Paper;
        R.fn = paperproto = Paper.prototype = R.prototype;
        R._id = 0;
        R.is = function(o, type) {
          type = lowerCase.call(type);
          if (type == "finite") {
            return !isnan[has](+o)
          }
          if (type == "array") {
            return o instanceof Array
          }
          return type == "null" && o === null || type == typeof o && o !== null || type == "object" && o === Object(o) || type == "array" && Array.isArray && Array.isArray(o) || objectToString.call(o).slice(8, -1).toLowerCase() == type
        };

        function clone(obj) {
          if (typeof obj == "function" || Object(obj) !== obj) {
            return obj
          }
          var res = new obj.constructor;
          for (var key in obj)
            if (obj[has](key)) {
              res[key] = clone(obj[key])
            } return res
        }
        R.angle = function(x1, y1, x2, y2, x3, y3) {
          if (x3 == null) {
            var x = x1 - x2,
              y = y1 - y2;
            if (!x && !y) {
              return 0
            }
            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360
          } else {
            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3)
          }
        };
        R.rad = function(deg) {
          return deg % 360 * PI / 180
        };
        R.deg = function(rad) {
          return Math.round(rad * 180 / PI % 360 * 1e3) / 1e3
        };
        R.snapTo = function(values, value, tolerance) {
          tolerance = R.is(tolerance, "finite") ? tolerance : 10;
          if (R.is(values, array)) {
            var i = values.length;
            while (i--)
              if (abs(values[i] - value) <= tolerance) {
                return values[i]
              }
          } else {
            values = +values;
            var rem = value % values;
            if (rem < tolerance) {
              return value - rem
            }
            if (rem > values - tolerance) {
              return value - rem + values
            }
          }
          return value
        };
        var createUUID = R.createUUID = function(uuidRegEx, uuidReplacer) {
          return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase()
          }
        }(/[xy]/g, function(c) {
          var r = math.random() * 16 | 0,
            v = c == "x" ? r : r & 3 | 8;
          return v.toString(16)
        });
        R.setWindow = function(newwin) {
          eve("raphael.setWindow", R, g.win, newwin);
          g.win = newwin;
          g.doc = g.win.document;
          if (R._engine.initWin) {
            R._engine.initWin(g.win)
          }
        };
        var toHex = function(color) {
            if (R.vml) {
              var trim = /^\s+|\s+$/g;
              var bod;
              try {
                var docum = new ActiveXObject("htmlfile");
                docum.write("<body>");
                docum.close();
                bod = docum.body
              } catch (e) {
                bod = createPopup().document.body
              }
              var range = bod.createTextRange();
              toHex = cacher(function(color) {
                try {
                  bod.style.color = Str(color).replace(trim, E);
                  var value = range.queryCommandValue("ForeColor");
                  value = (value & 255) << 16 | value & 65280 | (value & 16711680) >>> 16;
                  return "#" + ("000000" + value.toString(16)).slice(-6)
                } catch (e) {
                  return "none"
                }
              })
            } else {
              var i = g.doc.createElement("i");
              i.title = "Raphaël Colour Picker";
              i.style.display = "none";
              g.doc.body.appendChild(i);
              toHex = cacher(function(color) {
                i.style.color = color;
                return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color")
              })
            }
            return toHex(color)
          },
          hsbtoString = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")"
          },
          hsltoString = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")"
          },
          rgbtoString = function() {
            return this.hex
          },
          prepareRGB = function(r, g, b) {
            if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
              b = r.b;
              g = r.g;
              r = r.r
            }
            if (g == null && R.is(r, string)) {
              var clr = R.getRGB(r);
              r = clr.r;
              g = clr.g;
              b = clr.b
            }
            if (r > 1 || g > 1 || b > 1) {
              r /= 255;
              g /= 255;
              b /= 255
            }
            return [r, g, b]
          },
          packageRGB = function(r, g, b, o) {
            r *= 255;
            g *= 255;
            b *= 255;
            var rgb = {
              r: r,
              g: g,
              b: b,
              hex: R.rgb(r, g, b),
              toString: rgbtoString
            };
            R.is(o, "finite") && (rgb.opacity = o);
            return rgb
          };
        R.color = function(clr) {
          var rgb;
          if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
            rgb = R.hsb2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex
          } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
            rgb = R.hsl2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex
          } else {
            if (R.is(clr, "string")) {
              clr = R.getRGB(clr)
            }
            if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
              rgb = R.rgb2hsl(clr);
              clr.h = rgb.h;
              clr.s = rgb.s;
              clr.l = rgb.l;
              rgb = R.rgb2hsb(clr);
              clr.v = rgb.b
            } else {
              clr = {
                hex: "none"
              };
              clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1
            }
          }
          clr.toString = rgbtoString;
          return clr
        };
        R.hsb2rgb = function(h, s, v, o) {
          if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
            v = h.b;
            s = h.s;
            o = h.o;
            h = h.h
          }
          h *= 360;
          var R, G, B, X, C;
          h = h % 360 / 60;
          C = v * s;
          X = C * (1 - abs(h % 2 - 1));
          R = G = B = v - C;
          h = ~~h;
          R += [C, X, 0, 0, X, C][h];
          G += [X, C, C, X, 0, 0][h];
          B += [0, 0, X, C, C, X][h];
          return packageRGB(R, G, B, o)
        };
        R.hsl2rgb = function(h, s, l, o) {
          if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
            l = h.l;
            s = h.s;
            h = h.h
          }
          if (h > 1 || s > 1 || l > 1) {
            h /= 360;
            s /= 100;
            l /= 100
          }
          h *= 360;
          var R, G, B, X, C;
          h = h % 360 / 60;
          C = 2 * s * (l < .5 ? l : 1 - l);
          X = C * (1 - abs(h % 2 - 1));
          R = G = B = l - C / 2;
          h = ~~h;
          R += [C, X, 0, 0, X, C][h];
          G += [X, C, C, X, 0, 0][h];
          B += [0, 0, X, C, C, X][h];
          return packageRGB(R, G, B, o)
        };
        R.rgb2hsb = function(r, g, b) {
          b = prepareRGB(r, g, b);
          r = b[0];
          g = b[1];
          b = b[2];
          var H, S, V, C;
          V = mmax(r, g, b);
          C = V - mmin(r, g, b);
          H = C == 0 ? null : V == r ? (g - b) / C : V == g ? (b - r) / C + 2 : (r - g) / C + 4;
          H = (H + 360) % 6 * 60 / 360;
          S = C == 0 ? 0 : C / V;
          return {
            h: H,
            s: S,
            b: V,
            toString: hsbtoString
          }
        };
        R.rgb2hsl = function(r, g, b) {
          b = prepareRGB(r, g, b);
          r = b[0];
          g = b[1];
          b = b[2];
          var H, S, L, M, m, C;
          M = mmax(r, g, b);
          m = mmin(r, g, b);
          C = M - m;
          H = C == 0 ? null : M == r ? (g - b) / C : M == g ? (b - r) / C + 2 : (r - g) / C + 4;
          H = (H + 360) % 6 * 60 / 360;
          L = (M + m) / 2;
          S = C == 0 ? 0 : L < .5 ? C / (2 * L) : C / (2 - 2 * L);
          return {
            h: H,
            s: S,
            l: L,
            toString: hsltoString
          }
        };
        R._path2string = function() {
          return this.join(",").replace(p2s, "$1")
        };

        function repush(array, item) {
          for (var i = 0, ii = array.length; i < ii; i++)
            if (array[i] === item) {
              return array.push(array.splice(i, 1)[0])
            }
        }

        function cacher(f, scope, postprocessor) {
          function newf() {
            var arg = Array.prototype.slice.call(arguments, 0),
              args = arg.join("␀"),
              cache = newf.cache = newf.cache || {},
              count = newf.count = newf.count || [];
            if (cache[has](args)) {
              repush(count, args);
              return postprocessor ? postprocessor(cache[args]) : cache[args]
            }
            count.length >= 1e3 && delete cache[count.shift()];
            count.push(args);
            cache[args] = f[apply](scope, arg);
            return postprocessor ? postprocessor(cache[args]) : cache[args]
          }
          return newf
        }
        var preload = R._preload = function(src, f) {
          var img = g.doc.createElement("img");
          img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
          img.onload = function() {
            f.call(this);
            this.onload = null;
            g.doc.body.removeChild(this)
          };
          img.onerror = function() {
            g.doc.body.removeChild(this)
          };
          g.doc.body.appendChild(img);
          img.src = src
        };

        function clrToString() {
          return this.hex
        }
        R.getRGB = cacher(function(colour) {
          if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
            return {
              r: -1,
              g: -1,
              b: -1,
              hex: "none",
              error: 1,
              toString: clrToString
            }
          }
          if (colour == "none") {
            return {
              r: -1,
              g: -1,
              b: -1,
              hex: "none",
              toString: clrToString
            }
          }!(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
          var res, red, green, blue, opacity, t, values, rgb = colour.match(colourRegExp);
          if (rgb) {
            if (rgb[2]) {
              blue = toInt(rgb[2].substring(5), 16);
              green = toInt(rgb[2].substring(3, 5), 16);
              red = toInt(rgb[2].substring(1, 3), 16)
            }
            if (rgb[3]) {
              blue = toInt((t = rgb[3].charAt(3)) + t, 16);
              green = toInt((t = rgb[3].charAt(2)) + t, 16);
              red = toInt((t = rgb[3].charAt(1)) + t, 16)
            }
            if (rgb[4]) {
              values = rgb[4][split](commaSpaces);
              red = toFloat(values[0]);
              values[0].slice(-1) == "%" && (red *= 2.55);
              green = toFloat(values[1]);
              values[1].slice(-1) == "%" && (green *= 2.55);
              blue = toFloat(values[2]);
              values[2].slice(-1) == "%" && (blue *= 2.55);
              rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
              values[3] && values[3].slice(-1) == "%" && (opacity /= 100)
            }
            if (rgb[5]) {
              values = rgb[5][split](commaSpaces);
              red = toFloat(values[0]);
              values[0].slice(-1) == "%" && (red *= 2.55);
              green = toFloat(values[1]);
              values[1].slice(-1) == "%" && (green *= 2.55);
              blue = toFloat(values[2]);
              values[2].slice(-1) == "%" && (blue *= 2.55);
              (values[0].slice(-3) == "deg" || values[0].slice(-1) == "°") && (red /= 360);
              rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
              values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
              return R.hsb2rgb(red, green, blue, opacity)
            }
            if (rgb[6]) {
              values = rgb[6][split](commaSpaces);
              red = toFloat(values[0]);
              values[0].slice(-1) == "%" && (red *= 2.55);
              green = toFloat(values[1]);
              values[1].slice(-1) == "%" && (green *= 2.55);
              blue = toFloat(values[2]);
              values[2].slice(-1) == "%" && (blue *= 2.55);
              (values[0].slice(-3) == "deg" || values[0].slice(-1) == "°") && (red /= 360);
              rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
              values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
              return R.hsl2rgb(red, green, blue, opacity)
            }
            rgb = {
              r: red,
              g: green,
              b: blue,
              toString: clrToString
            };
            rgb.hex = "#" + (16777216 | blue | green << 8 | red << 16).toString(16).slice(1);
            R.is(opacity, "finite") && (rgb.opacity = opacity);
            return rgb
          }
          return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: clrToString
          }
        }, R);
        R.hsb = cacher(function(h, s, b) {
          return R.hsb2rgb(h, s, b).hex
        });
        R.hsl = cacher(function(h, s, l) {
          return R.hsl2rgb(h, s, l).hex
        });
        R.rgb = cacher(function(r, g, b) {
          function round(x) {
            return x + .5 | 0
          }
          return "#" + (16777216 | round(b) | round(g) << 8 | round(r) << 16).toString(16).slice(1)
        });
        R.getColor = function(value) {
          var start = this.getColor.start = this.getColor.start || {
              h: 0,
              s: 1,
              b: value || .75
            },
            rgb = this.hsb2rgb(start.h, start.s, start.b);
          start.h += .075;
          if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            start.s <= 0 && (this.getColor.start = {
              h: 0,
              s: 1,
              b: start.b
            })
          }
          return rgb.hex
        };
        R.getColor.reset = function() {
          delete this.start
        };

        function catmullRom2bezier(crp, z) {
          var d = [];
          for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
            var p = [{
              x: +crp[i - 2],
              y: +crp[i - 1]
            }, {
              x: +crp[i],
              y: +crp[i + 1]
            }, {
              x: +crp[i + 2],
              y: +crp[i + 3]
            }, {
              x: +crp[i + 4],
              y: +crp[i + 5]
            }];
            if (z) {
              if (!i) {
                p[0] = {
                  x: +crp[iLen - 2],
                  y: +crp[iLen - 1]
                }
              } else if (iLen - 4 == i) {
                p[3] = {
                  x: +crp[0],
                  y: +crp[1]
                }
              } else if (iLen - 2 == i) {
                p[2] = {
                  x: +crp[0],
                  y: +crp[1]
                };
                p[3] = {
                  x: +crp[2],
                  y: +crp[3]
                }
              }
            } else {
              if (iLen - 4 == i) {
                p[3] = p[2]
              } else if (!i) {
                p[0] = {
                  x: +crp[i],
                  y: +crp[i + 1]
                }
              }
            }
            d.push(["C", (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y])
          }
          return d
        }
        R.parsePathString = function(pathString) {
          if (!pathString) {
            return null
          }
          var pth = paths(pathString);
          if (pth.arr) {
            return pathClone(pth.arr)
          }
          var paramCounts = {
              a: 7,
              c: 6,
              h: 1,
              l: 2,
              m: 2,
              r: 4,
              q: 4,
              s: 4,
              t: 2,
              v: 1,
              z: 0
            },
            data = [];
          if (R.is(pathString, array) && R.is(pathString[0], array)) {
            data = pathClone(pathString)
          }
          if (!data.length) {
            Str(pathString).replace(pathCommand, function(a, b, c) {
              var params = [],
                name = b.toLowerCase();
              c.replace(pathValues, function(a, b) {
                b && params.push(+b)
              });
              if (name == "m" && params.length > 2) {
                data.push([b][concat](params.splice(0, 2)));
                name = "l";
                b = b == "m" ? "l" : "L"
              }
              if (name == "r") {
                data.push([b][concat](params))
              } else
                while (params.length >= paramCounts[name]) {
                  data.push([b][concat](params.splice(0, paramCounts[name])));
                  if (!paramCounts[name]) {
                    break
                  }
                }
            })
          }
          data.toString = R._path2string;
          pth.arr = pathClone(data);
          return data
        };
        R.parseTransformString = cacher(function(TString) {
          if (!TString) {
            return null
          }
          var paramCounts = {
              r: 3,
              s: 4,
              t: 2,
              m: 6
            },
            data = [];
          if (R.is(TString, array) && R.is(TString[0], array)) {
            data = pathClone(TString)
          }
          if (!data.length) {
            Str(TString).replace(tCommand, function(a, b, c) {
              var params = [],
                name = lowerCase.call(b);
              c.replace(pathValues, function(a, b) {
                b && params.push(+b)
              });
              data.push([b][concat](params))
            })
          }
          data.toString = R._path2string;
          return data
        }, this, function(elem) {
          if (!elem) return elem;
          var newData = [];
          for (var i = 0; i < elem.length; i++) {
            var newLevel = [];
            for (var j = 0; j < elem[i].length; j++) {
              newLevel.push(elem[i][j])
            }
            newData.push(newLevel)
          }
          return newData
        });
        var paths = function(ps) {
          var p = paths.ps = paths.ps || {};
          if (p[ps]) {
            p[ps].sleep = 100
          } else {
            p[ps] = {
              sleep: 100
            }
          }
          setTimeout(function() {
            for (var key in p)
              if (p[has](key) && key != ps) {
                p[key].sleep--;
                !p[key].sleep && delete p[key]
              }
          });
          return p[ps]
        };
        R.findDotsAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
          var t1 = 1 - t,
            t13 = pow(t1, 3),
            t12 = pow(t1, 2),
            t2 = t * t,
            t3 = t2 * t,
            x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
            y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
            mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
            my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
            nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
            ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
            ax = t1 * p1x + t * c1x,
            ay = t1 * p1y + t * c1y,
            cx = t1 * c2x + t * p2x,
            cy = t1 * c2y + t * p2y,
            alpha = 90 - math.atan2(mx - nx, my - ny) * 180 / PI;
          (mx > nx || my < ny) && (alpha += 180);
          return {
            x: x,
            y: y,
            m: {
              x: mx,
              y: my
            },
            n: {
              x: nx,
              y: ny
            },
            start: {
              x: ax,
              y: ay
            },
            end: {
              x: cx,
              y: cy
            },
            alpha: alpha
          }
        };
        R.bezierBBox = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
          if (!R.is(p1x, "array")) {
            p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y]
          }
          var bbox = curveDim.apply(null, p1x);
          return {
            x: bbox.min.x,
            y: bbox.min.y,
            x2: bbox.max.x,
            y2: bbox.max.y,
            width: bbox.max.x - bbox.min.x,
            height: bbox.max.y - bbox.min.y
          }
        };
        R.isPointInsideBBox = function(bbox, x, y) {
          return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2
        };
        R.isBBoxIntersect = function(bbox1, bbox2) {
          var i = R.isPointInsideBBox;
          return i(bbox2, bbox1.x, bbox1.y) || i(bbox2, bbox1.x2, bbox1.y) || i(bbox2, bbox1.x, bbox1.y2) || i(bbox2, bbox1.x2, bbox1.y2) || i(bbox1, bbox2.x, bbox2.y) || i(bbox1, bbox2.x2, bbox2.y) || i(bbox1, bbox2.x, bbox2.y2) || i(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y)
        };

        function base3(t, p1, p2, p3, p4) {
          var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
            t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
          return t * t2 - 3 * p1 + 3 * p2
        }

        function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
          if (z == null) {
            z = 1
          }
          z = z > 1 ? 1 : z < 0 ? 0 : z;
          var z2 = z / 2,
            n = 12,
            Tvalues = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816],
            Cvalues = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472],
            sum = 0;
          for (var i = 0; i < n; i++) {
            var ct = z2 * Tvalues[i] + z2,
              xbase = base3(ct, x1, x2, x3, x4),
              ybase = base3(ct, y1, y2, y3, y4),
              comb = xbase * xbase + ybase * ybase;
            sum += Cvalues[i] * math.sqrt(comb)
          }
          return z2 * sum
        }

        function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
          if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
            return
          }
          var t = 1,
            step = t / 2,
            t2 = t - step,
            l, e = .01;
          l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
          while (abs(l - ll) > e) {
            step /= 2;
            t2 += (l < ll ? 1 : -1) * step;
            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2)
          }
          return t2
        }

        function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
          if (mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) {
            return
          }
          var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
            ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
            denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
          if (!denominator) {
            return
          }
          var px = nx / denominator,
            py = ny / denominator,
            px2 = +px.toFixed(2),
            py2 = +py.toFixed(2);
          if (px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) {
            return
          }
          return {
            x: px,
            y: py
          }
        }

        function inter(bez1, bez2) {
          return interHelper(bez1, bez2)
        }

        function interCount(bez1, bez2) {
          return interHelper(bez1, bez2, 1)
        }

        function interHelper(bez1, bez2, justCount) {
          var bbox1 = R.bezierBBox(bez1),
            bbox2 = R.bezierBBox(bez2);
          if (!R.isBBoxIntersect(bbox1, bbox2)) {
            return justCount ? 0 : []
          }
          var l1 = bezlen.apply(0, bez1),
            l2 = bezlen.apply(0, bez2),
            n1 = mmax(~~(l1 / 5), 1),
            n2 = mmax(~~(l2 / 5), 1),
            dots1 = [],
            dots2 = [],
            xy = {},
            res = justCount ? 0 : [];
          for (var i = 0; i < n1 + 1; i++) {
            var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
            dots1.push({
              x: p.x,
              y: p.y,
              t: i / n1
            })
          }
          for (i = 0; i < n2 + 1; i++) {
            p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
            dots2.push({
              x: p.x,
              y: p.y,
              t: i / n2
            })
          }
          for (i = 0; i < n1; i++) {
            for (var j = 0; j < n2; j++) {
              var di = dots1[i],
                di1 = dots1[i + 1],
                dj = dots2[j],
                dj1 = dots2[j + 1],
                ci = abs(di1.x - di.x) < .001 ? "y" : "x",
                cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
                is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
              if (is) {
                if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                  continue
                }
                xy[is.x.toFixed(4)] = is.y.toFixed(4);
                var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                  t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                if (t1 >= 0 && t1 <= 1.001 && t2 >= 0 && t2 <= 1.001) {
                  if (justCount) {
                    res++
                  } else {
                    res.push({
                      x: is.x,
                      y: is.y,
                      t1: mmin(t1, 1),
                      t2: mmin(t2, 1)
                    })
                  }
                }
              }
            }
          }
          return res
        }
        R.pathIntersection = function(path1, path2) {
          return interPathHelper(path1, path2)
        };
        R.pathIntersectionNumber = function(path1, path2) {
          return interPathHelper(path1, path2, 1)
        };

        function interPathHelper(path1, path2, justCount) {
          path1 = R._path2curve(path1);
          path2 = R._path2curve(path2);
          var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2, res = justCount ? 0 : [];
          for (var i = 0, ii = path1.length; i < ii; i++) {
            var pi = path1[i];
            if (pi[0] == "M") {
              x1 = x1m = pi[1];
              y1 = y1m = pi[2]
            } else {
              if (pi[0] == "C") {
                bez1 = [x1, y1].concat(pi.slice(1));
                x1 = bez1[6];
                y1 = bez1[7]
              } else {
                bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                x1 = x1m;
                y1 = y1m
              }
              for (var j = 0, jj = path2.length; j < jj; j++) {
                var pj = path2[j];
                if (pj[0] == "M") {
                  x2 = x2m = pj[1];
                  y2 = y2m = pj[2]
                } else {
                  if (pj[0] == "C") {
                    bez2 = [x2, y2].concat(pj.slice(1));
                    x2 = bez2[6];
                    y2 = bez2[7]
                  } else {
                    bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                    x2 = x2m;
                    y2 = y2m
                  }
                  var intr = interHelper(bez1, bez2, justCount);
                  if (justCount) {
                    res += intr
                  } else {
                    for (var k = 0, kk = intr.length; k < kk; k++) {
                      intr[k].segment1 = i;
                      intr[k].segment2 = j;
                      intr[k].bez1 = bez1;
                      intr[k].bez2 = bez2
                    }
                    res = res.concat(intr)
                  }
                }
              }
            }
          }
          return res
        }
        R.isPointInsidePath = function(path, x, y) {
          var bbox = R.pathBBox(path);
          return R.isPointInsideBBox(bbox, x, y) && interPathHelper(path, [
            ["M", x, y],
            ["H", bbox.x2 + 10]
          ], 1) % 2 == 1
        };
        R._removedFactory = function(methodname) {
          return function() {
            eve("raphael.log", null, "Raphaël: you are calling to method “" + methodname + "” of removed object", methodname)
          }
        };
        var pathDimensions = R.pathBBox = function(path) {
            var pth = paths(path);
            if (pth.bbox) {
              return clone(pth.bbox)
            }
            if (!path) {
              return {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                x2: 0,
                y2: 0
              }
            }
            path = path2curve(path);
            var x = 0,
              y = 0,
              X = [],
              Y = [],
              p;
            for (var i = 0, ii = path.length; i < ii; i++) {
              p = path[i];
              if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y)
              } else {
                var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X[concat](dim.min.x, dim.max.x);
                Y = Y[concat](dim.min.y, dim.max.y);
                x = p[5];
                y = p[6]
              }
            }
            var xmin = mmin[apply](0, X),
              ymin = mmin[apply](0, Y),
              xmax = mmax[apply](0, X),
              ymax = mmax[apply](0, Y),
              width = xmax - xmin,
              height = ymax - ymin,
              bb = {
                x: xmin,
                y: ymin,
                x2: xmax,
                y2: ymax,
                width: width,
                height: height,
                cx: xmin + width / 2,
                cy: ymin + height / 2
              };
            pth.bbox = clone(bb);
            return bb
          },
          pathClone = function(pathArray) {
            var res = clone(pathArray);
            res.toString = R._path2string;
            return res
          },
          pathToRelative = R._pathToRelative = function(pathArray) {
            var pth = paths(pathArray);
            if (pth.rel) {
              return pathClone(pth.rel)
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
              pathArray = R.parsePathString(pathArray)
            }
            var res = [],
              x = 0,
              y = 0,
              mx = 0,
              my = 0,
              start = 0;
            if (pathArray[0][0] == "M") {
              x = pathArray[0][1];
              y = pathArray[0][2];
              mx = x;
              my = y;
              start++;
              res.push(["M", x, y])
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
              var r = res[i] = [],
                pa = pathArray[i];
              if (pa[0] != lowerCase.call(pa[0])) {
                r[0] = lowerCase.call(pa[0]);
                switch (r[0]) {
                  case "a":
                    r[1] = pa[1];
                    r[2] = pa[2];
                    r[3] = pa[3];
                    r[4] = pa[4];
                    r[5] = pa[5];
                    r[6] = +(pa[6] - x).toFixed(3);
                    r[7] = +(pa[7] - y).toFixed(3);
                    break;
                  case "v":
                    r[1] = +(pa[1] - y).toFixed(3);
                    break;
                  case "m":
                    mx = pa[1];
                    my = pa[2];
                  default:
                    for (var j = 1, jj = pa.length; j < jj; j++) {
                      r[j] = +(pa[j] - (j % 2 ? x : y)).toFixed(3)
                    }
                }
              } else {
                r = res[i] = [];
                if (pa[0] == "m") {
                  mx = pa[1] + x;
                  my = pa[2] + y
                }
                for (var k = 0, kk = pa.length; k < kk; k++) {
                  res[i][k] = pa[k]
                }
              }
              var len = res[i].length;
              switch (res[i][0]) {
                case "z":
                  x = mx;
                  y = my;
                  break;
                case "h":
                  x += +res[i][len - 1];
                  break;
                case "v":
                  y += +res[i][len - 1];
                  break;
                default:
                  x += +res[i][len - 2];
                  y += +res[i][len - 1]
              }
            }
            res.toString = R._path2string;
            pth.rel = pathClone(res);
            return res
          },
          pathToAbsolute = R._pathToAbsolute = function(pathArray) {
            var pth = paths(pathArray);
            if (pth.abs) {
              return pathClone(pth.abs)
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
              pathArray = R.parsePathString(pathArray)
            }
            if (!pathArray || !pathArray.length) {
              return [
                ["M", 0, 0]
              ]
            }
            var res = [],
              x = 0,
              y = 0,
              mx = 0,
              my = 0,
              start = 0;
            if (pathArray[0][0] == "M") {
              x = +pathArray[0][1];
              y = +pathArray[0][2];
              mx = x;
              my = y;
              start++;
              res[0] = ["M", x, y]
            }
            var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
              res.push(r = []);
              pa = pathArray[i];
              if (pa[0] != upperCase.call(pa[0])) {
                r[0] = upperCase.call(pa[0]);
                switch (r[0]) {
                  case "A":
                    r[1] = pa[1];
                    r[2] = pa[2];
                    r[3] = pa[3];
                    r[4] = pa[4];
                    r[5] = pa[5];
                    r[6] = +(pa[6] + x);
                    r[7] = +(pa[7] + y);
                    break;
                  case "V":
                    r[1] = +pa[1] + y;
                    break;
                  case "H":
                    r[1] = +pa[1] + x;
                    break;
                  case "R":
                    var dots = [x, y][concat](pa.slice(1));
                    for (var j = 2, jj = dots.length; j < jj; j++) {
                      dots[j] = +dots[j] + x;
                      dots[++j] = +dots[j] + y
                    }
                    res.pop();
                    res = res[concat](catmullRom2bezier(dots, crz));
                    break;
                  case "M":
                    mx = +pa[1] + x;
                    my = +pa[2] + y;
                  default:
                    for (j = 1, jj = pa.length; j < jj; j++) {
                      r[j] = +pa[j] + (j % 2 ? x : y)
                    }
                }
              } else if (pa[0] == "R") {
                dots = [x, y][concat](pa.slice(1));
                res.pop();
                res = res[concat](catmullRom2bezier(dots, crz));
                r = ["R"][concat](pa.slice(-2))
              } else {
                for (var k = 0, kk = pa.length; k < kk; k++) {
                  r[k] = pa[k]
                }
              }
              switch (r[0]) {
                case "Z":
                  x = mx;
                  y = my;
                  break;
                case "H":
                  x = r[1];
                  break;
                case "V":
                  y = r[1];
                  break;
                case "M":
                  mx = r[r.length - 2];
                  my = r[r.length - 1];
                default:
                  x = r[r.length - 2];
                  y = r[r.length - 1]
              }
            }
            res.toString = R._path2string;
            pth.abs = pathClone(res);
            return res
          },
          l2c = function(x1, y1, x2, y2) {
            return [x1, y1, x2, y2, x2, y2]
          },
          q2c = function(x1, y1, ax, ay, x2, y2) {
            var _13 = 1 / 3,
              _23 = 2 / 3;
            return [_13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2]
          },
          a2c = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            var _120 = PI * 120 / 180,
              rad = PI / 180 * (+angle || 0),
              res = [],
              xy, rotate = cacher(function(x, y, rad) {
                var X = x * math.cos(rad) - y * math.sin(rad),
                  Y = x * math.sin(rad) + y * math.cos(rad);
                return {
                  x: X,
                  y: Y
                }
              });
            if (!recursive) {
              xy = rotate(x1, y1, -rad);
              x1 = xy.x;
              y1 = xy.y;
              xy = rotate(x2, y2, -rad);
              x2 = xy.x;
              y2 = xy.y;
              var cos = math.cos(PI / 180 * angle),
                sin = math.sin(PI / 180 * angle),
                x = (x1 - x2) / 2,
                y = (y1 - y2) / 2;
              var h = x * x / (rx * rx) + y * y / (ry * ry);
              if (h > 1) {
                h = math.sqrt(h);
                rx = h * rx;
                ry = h * ry
              }
              var rx2 = rx * rx,
                ry2 = ry * ry,
                k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                cx = k * rx * y / ry + (x1 + x2) / 2,
                cy = k * -ry * x / rx + (y1 + y2) / 2,
                f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                f2 = math.asin(((y2 - cy) / ry).toFixed(9));
              f1 = x1 < cx ? PI - f1 : f1;
              f2 = x2 < cx ? PI - f2 : f2;
              f1 < 0 && (f1 = PI * 2 + f1);
              f2 < 0 && (f2 = PI * 2 + f2);
              if (sweep_flag && f1 > f2) {
                f1 = f1 - PI * 2
              }
              if (!sweep_flag && f2 > f1) {
                f2 = f2 - PI * 2
              }
            } else {
              f1 = recursive[0];
              f2 = recursive[1];
              cx = recursive[2];
              cy = recursive[3]
            }
            var df = f2 - f1;
            if (abs(df) > _120) {
              var f2old = f2,
                x2old = x2,
                y2old = y2;
              f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
              x2 = cx + rx * math.cos(f2);
              y2 = cy + ry * math.sin(f2);
              res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy])
            }
            df = f2 - f1;
            var c1 = math.cos(f1),
              s1 = math.sin(f1),
              c2 = math.cos(f2),
              s2 = math.sin(f2),
              t = math.tan(df / 4),
              hx = 4 / 3 * rx * t,
              hy = 4 / 3 * ry * t,
              m1 = [x1, y1],
              m2 = [x1 + hx * s1, y1 - hy * c1],
              m3 = [x2 + hx * s2, y2 - hy * c2],
              m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
              return [m2, m3, m4][concat](res)
            } else {
              res = [m2, m3, m4][concat](res).join()[split](",");
              var newres = [];
              for (var i = 0, ii = res.length; i < ii; i++) {
                newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x
              }
              return newres
            }
          },
          findDotAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t;
            return {
              x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
              y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
            }
          },
          curveDim = cacher(function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
            var a = c2x - 2 * c1x + p1x - (p2x - 2 * c2x + c1x),
              b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
              c = p1x - c1x,
              t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
              t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
              y = [p1y, p2y],
              x = [p1x, p2x],
              dot;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
              dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
              x.push(dot.x);
              y.push(dot.y)
            }
            if (t2 > 0 && t2 < 1) {
              dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
              x.push(dot.x);
              y.push(dot.y)
            }
            a = c2y - 2 * c1y + p1y - (p2y - 2 * c2y + c1y);
            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
            c = p1y - c1y;
            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
              dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
              x.push(dot.x);
              y.push(dot.y)
            }
            if (t2 > 0 && t2 < 1) {
              dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
              x.push(dot.x);
              y.push(dot.y)
            }
            return {
              min: {
                x: mmin[apply](0, x),
                y: mmin[apply](0, y)
              },
              max: {
                x: mmax[apply](0, x),
                y: mmax[apply](0, y)
              }
            }
          }),
          path2curve = R._path2curve = cacher(function(path, path2) {
            var pth = !path2 && paths(path);
            if (!path2 && pth.curve) {
              return pathClone(pth.curve)
            }
            var p = pathToAbsolute(path),
              p2 = path2 && pathToAbsolute(path2),
              attrs = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null,
                qy: null
              },
              attrs2 = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null,
                qy: null
              },
              processPath = function(path, d, pcom) {
                var nx, ny, tq = {
                  T: 1,
                  Q: 1
                };
                if (!path) {
                  return ["C", d.x, d.y, d.x, d.y, d.x, d.y]
                }!(path[0] in tq) && (d.qx = d.qy = null);
                switch (path[0]) {
                  case "M":
                    d.X = path[1];
                    d.Y = path[2];
                    break;
                  case "A":
                    path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                    break;
                  case "S":
                    if (pcom == "C" || pcom == "S") {
                      nx = d.x * 2 - d.bx;
                      ny = d.y * 2 - d.by
                    } else {
                      nx = d.x;
                      ny = d.y
                    }
                    path = ["C", nx, ny][concat](path.slice(1));
                    break;
                  case "T":
                    if (pcom == "Q" || pcom == "T") {
                      d.qx = d.x * 2 - d.qx;
                      d.qy = d.y * 2 - d.qy
                    } else {
                      d.qx = d.x;
                      d.qy = d.y
                    }
                    path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                    break;
                  case "Q":
                    d.qx = path[1];
                    d.qy = path[2];
                    path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                    break;
                  case "L":
                    path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                    break;
                  case "H":
                    path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                    break;
                  case "V":
                    path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                    break;
                  case "Z":
                    path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                    break
                }
                return path
              },
              fixArc = function(pp, i) {
                if (pp[i].length > 7) {
                  pp[i].shift();
                  var pi = pp[i];
                  while (pi.length) {
                    pcoms1[i] = "A";
                    p2 && (pcoms2[i] = "A");
                    pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)))
                  }
                  pp.splice(i, 1);
                  ii = mmax(p.length, p2 && p2.length || 0)
                }
              },
              fixM = function(path1, path2, a1, a2, i) {
                if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                  path2.splice(i, 0, ["M", a2.x, a2.y]);
                  a1.bx = 0;
                  a1.by = 0;
                  a1.x = path1[i][1];
                  a1.y = path1[i][2];
                  ii = mmax(p.length, p2 && p2.length || 0)
                }
              },
              pcoms1 = [],
              pcoms2 = [],
              pfirst = "",
              pcom = "";
            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
              p[i] && (pfirst = p[i][0]);
              if (pfirst != "C") {
                pcoms1[i] = pfirst;
                i && (pcom = pcoms1[i - 1])
              }
              p[i] = processPath(p[i], attrs, pcom);
              if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C";
              fixArc(p, i);
              if (p2) {
                p2[i] && (pfirst = p2[i][0]);
                if (pfirst != "C") {
                  pcoms2[i] = pfirst;
                  i && (pcom = pcoms2[i - 1])
                }
                p2[i] = processPath(p2[i], attrs2, pcom);
                if (pcoms2[i] != "A" && pfirst == "C") pcoms2[i] = "C";
                fixArc(p2, i)
              }
              fixM(p, p2, attrs, attrs2, i);
              fixM(p2, p, attrs2, attrs, i);
              var seg = p[i],
                seg2 = p2 && p2[i],
                seglen = seg.length,
                seg2len = p2 && seg2.length;
              attrs.x = seg[seglen - 2];
              attrs.y = seg[seglen - 1];
              attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
              attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
              attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
              attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
              attrs2.x = p2 && seg2[seg2len - 2];
              attrs2.y = p2 && seg2[seg2len - 1]
            }
            if (!p2) {
              pth.curve = pathClone(p)
            }
            return p2 ? [p, p2] : p
          }, null, pathClone),
          parseDots = R._parseDots = cacher(function(gradient) {
            var dots = [];
            for (var i = 0, ii = gradient.length; i < ii; i++) {
              var dot = {},
                par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
              dot.color = R.getRGB(par[1]);
              if (dot.color.error) {
                return null
              }
              dot.opacity = dot.color.opacity;
              dot.color = dot.color.hex;
              par[2] && (dot.offset = par[2] + "%");
              dots.push(dot)
            }
            for (i = 1, ii = dots.length - 1; i < ii; i++) {
              if (!dots[i].offset) {
                var start = toFloat(dots[i - 1].offset || 0),
                  end = 0;
                for (var j = i + 1; j < ii; j++) {
                  if (dots[j].offset) {
                    end = dots[j].offset;
                    break
                  }
                }
                if (!end) {
                  end = 100;
                  j = ii
                }
                end = toFloat(end);
                var d = (end - start) / (j - i + 1);
                for (; i < j; i++) {
                  start += d;
                  dots[i].offset = start + "%"
                }
              }
            }
            return dots
          }),
          tear = R._tear = function(el, paper) {
            el == paper.top && (paper.top = el.prev);
            el == paper.bottom && (paper.bottom = el.next);
            el.next && (el.next.prev = el.prev);
            el.prev && (el.prev.next = el.next)
          },
          tofront = R._tofront = function(el, paper) {
            if (paper.top === el) {
              return
            }
            tear(el, paper);
            el.next = null;
            el.prev = paper.top;
            paper.top.next = el;
            paper.top = el
          },
          toback = R._toback = function(el, paper) {
            if (paper.bottom === el) {
              return
            }
            tear(el, paper);
            el.next = paper.bottom;
            el.prev = null;
            paper.bottom.prev = el;
            paper.bottom = el
          },
          insertafter = R._insertafter = function(el, el2, paper) {
            tear(el, paper);
            el2 == paper.top && (paper.top = el);
            el2.next && (el2.next.prev = el);
            el.next = el2.next;
            el.prev = el2;
            el2.next = el
          },
          insertbefore = R._insertbefore = function(el, el2, paper) {
            tear(el, paper);
            el2 == paper.bottom && (paper.bottom = el);
            el2.prev && (el2.prev.next = el);
            el.prev = el2.prev;
            el2.prev = el;
            el.next = el2
          },
          toMatrix = R.toMatrix = function(path, transform) {
            var bb = pathDimensions(path),
              el = {
                _: {
                  transform: E
                },
                getBBox: function() {
                  return bb
                }
              };
            extractTransform(el, transform);
            return el.matrix
          },
          transformPath = R.transformPath = function(path, transform) {
            return mapPath(path, toMatrix(path, transform))
          },
          extractTransform = R._extractTransform = function(el, tstr) {
            if (tstr == null) {
              return el._.transform
            }
            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
            var tdata = R.parseTransformString(tstr),
              deg = 0,
              dx = 0,
              dy = 0,
              sx = 1,
              sy = 1,
              _ = el._,
              m = new Matrix;
            _.transform = tdata || [];
            if (tdata) {
              for (var i = 0, ii = tdata.length; i < ii; i++) {
                var t = tdata[i],
                  tlen = t.length,
                  command = Str(t[0]).toLowerCase(),
                  absolute = t[0] != command,
                  inver = absolute ? m.invert() : 0,
                  x1, y1, x2, y2, bb;
                if (command == "t" && tlen == 3) {
                  if (absolute) {
                    x1 = inver.x(0, 0);
                    y1 = inver.y(0, 0);
                    x2 = inver.x(t[1], t[2]);
                    y2 = inver.y(t[1], t[2]);
                    m.translate(x2 - x1, y2 - y1)
                  } else {
                    m.translate(t[1], t[2])
                  }
                } else if (command == "r") {
                  if (tlen == 2) {
                    bb = bb || el.getBBox(1);
                    m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                    deg += t[1]
                  } else if (tlen == 4) {
                    if (absolute) {
                      x2 = inver.x(t[2], t[3]);
                      y2 = inver.y(t[2], t[3]);
                      m.rotate(t[1], x2, y2)
                    } else {
                      m.rotate(t[1], t[2], t[3])
                    }
                    deg += t[1]
                  }
                } else if (command == "s") {
                  if (tlen == 2 || tlen == 3) {
                    bb = bb || el.getBBox(1);
                    m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                    sx *= t[1];
                    sy *= t[tlen - 1]
                  } else if (tlen == 5) {
                    if (absolute) {
                      x2 = inver.x(t[3], t[4]);
                      y2 = inver.y(t[3], t[4]);
                      m.scale(t[1], t[2], x2, y2)
                    } else {
                      m.scale(t[1], t[2], t[3], t[4])
                    }
                    sx *= t[1];
                    sy *= t[2]
                  }
                } else if (command == "m" && tlen == 7) {
                  m.add(t[1], t[2], t[3], t[4], t[5], t[6])
                }
                _.dirtyT = 1;
                el.matrix = m
              }
            }
            el.matrix = m;
            _.sx = sx;
            _.sy = sy;
            _.deg = deg;
            _.dx = dx = m.e;
            _.dy = dy = m.f;
            if (sx == 1 && sy == 1 && !deg && _.bbox) {
              _.bbox.x += +dx;
              _.bbox.y += +dy
            } else {
              _.dirtyT = 1
            }
          },
          getEmpty = function(item) {
            var l = item[0];
            switch (l.toLowerCase()) {
              case "t":
                return [l, 0, 0];
              case "m":
                return [l, 1, 0, 0, 1, 0, 0];
              case "r":
                if (item.length == 4) {
                  return [l, 0, item[2], item[3]]
                } else {
                  return [l, 0]
                }
              case "s":
                if (item.length == 5) {
                  return [l, 1, 1, item[3], item[4]]
                } else if (item.length == 3) {
                  return [l, 1, 1]
                } else {
                  return [l, 1]
                }
            }
          },
          equaliseTransform = R._equaliseTransform = function(t1, t2) {
            t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
            t1 = R.parseTransformString(t1) || [];
            t2 = R.parseTransformString(t2) || [];
            var maxlength = mmax(t1.length, t2.length),
              from = [],
              to = [],
              i = 0,
              j, jj, tt1, tt2;
            for (; i < maxlength; i++) {
              tt1 = t1[i] || getEmpty(t2[i]);
              tt2 = t2[i] || getEmpty(tt1);
              if (tt1[0] != tt2[0] || tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3]) || tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4])) {
                return
              }
              from[i] = [];
              to[i] = [];
              for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
                j in tt1 && (from[i][j] = tt1[j]);
                j in tt2 && (to[i][j] = tt2[j])
              }
            }
            return {
              from: from,
              to: to
            }
          };
        R._getContainer = function(x, y, w, h) {
          var container;
          container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
          if (container == null) {
            return
          }
          if (container.tagName) {
            if (y == null) {
              return {
                container: container,
                width: container.style.pixelWidth || container.offsetWidth,
                height: container.style.pixelHeight || container.offsetHeight
              }
            } else {
              return {
                container: container,
                width: y,
                height: w
              }
            }
          }
          return {
            container: 1,
            x: x,
            y: y,
            width: w,
            height: h
          }
        };
        R.pathToRelative = pathToRelative;
        R._engine = {};
        R.path2curve = path2curve;
        R.matrix = function(a, b, c, d, e, f) {
          return new Matrix(a, b, c, d, e, f)
        };

        function Matrix(a, b, c, d, e, f) {
          if (a != null) {
            this.a = +a;
            this.b = +b;
            this.c = +c;
            this.d = +d;
            this.e = +e;
            this.f = +f
          } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0
          }
        }(function(matrixproto) {
          matrixproto.add = function(a, b, c, d, e, f) {
            var out = [
                [],
                [],
                []
              ],
              m = [
                [this.a, this.c, this.e],
                [this.b, this.d, this.f],
                [0, 0, 1]
              ],
              matrix = [
                [a, c, e],
                [b, d, f],
                [0, 0, 1]
              ],
              x, y, z, res;
            if (a && a instanceof Matrix) {
              matrix = [
                [a.a, a.c, a.e],
                [a.b, a.d, a.f],
                [0, 0, 1]
              ]
            }
            for (x = 0; x < 3; x++) {
              for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                  res += m[x][z] * matrix[z][y]
                }
                out[x][y] = res
              }
            }
            this.a = out[0][0];
            this.b = out[1][0];
            this.c = out[0][1];
            this.d = out[1][1];
            this.e = out[0][2];
            this.f = out[1][2]
          };
          matrixproto.invert = function() {
            var me = this,
              x = me.a * me.d - me.b * me.c;
            return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x)
          };
          matrixproto.clone = function() {
            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f)
          };
          matrixproto.translate = function(x, y) {
            this.add(1, 0, 0, 1, x, y)
          };
          matrixproto.scale = function(x, y, cx, cy) {
            y == null && (y = x);
            (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
            this.add(x, 0, 0, y, 0, 0);
            (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy)
          };
          matrixproto.rotate = function(a, x, y) {
            a = R.rad(a);
            x = x || 0;
            y = y || 0;
            var cos = +math.cos(a).toFixed(9),
              sin = +math.sin(a).toFixed(9);
            this.add(cos, sin, -sin, cos, x, y);
            this.add(1, 0, 0, 1, -x, -y)
          };
          matrixproto.x = function(x, y) {
            return x * this.a + y * this.c + this.e
          };
          matrixproto.y = function(x, y) {
            return x * this.b + y * this.d + this.f
          };
          matrixproto.get = function(i) {
            return +this[Str.fromCharCode(97 + i)].toFixed(4)
          };
          matrixproto.toString = function() {
            return R.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
          };
          matrixproto.toFilter = function() {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
          };
          matrixproto.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)]
          };

          function norm(a) {
            return a[0] * a[0] + a[1] * a[1]
          }

          function normalize(a) {
            var mag = math.sqrt(norm(a));
            a[0] && (a[0] /= mag);
            a[1] && (a[1] /= mag)
          }
          matrixproto.split = function() {
            var out = {};
            out.dx = this.e;
            out.dy = this.f;
            var row = [
              [this.a, this.c],
              [this.b, this.d]
            ];
            out.scalex = math.sqrt(norm(row[0]));
            normalize(row[0]);
            out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
            row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];
            out.scaley = math.sqrt(norm(row[1]));
            normalize(row[1]);
            out.shear /= out.scaley;
            var sin = -row[0][1],
              cos = row[1][1];
            if (cos < 0) {
              out.rotate = R.deg(math.acos(cos));
              if (sin < 0) {
                out.rotate = 360 - out.rotate
              }
            } else {
              out.rotate = R.deg(math.asin(sin))
            }
            out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
            out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
            out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
            return out
          };
          matrixproto.toTransformString = function(shorter) {
            var s = shorter || this[split]();
            if (s.isSimple) {
              s.scalex = +s.scalex.toFixed(4);
              s.scaley = +s.scaley.toFixed(4);
              s.rotate = +s.rotate.toFixed(4);
              return (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) + (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) + (s.rotate ? "r" + [s.rotate, 0, 0] : E)
            } else {
              return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
            }
          }
        })(Matrix.prototype);
        var preventDefault = function() {
            this.returnValue = false
          },
          preventTouch = function() {
            return this.originalEvent.preventDefault()
          },
          stopPropagation = function() {
            this.cancelBubble = true
          },
          stopTouch = function() {
            return this.originalEvent.stopPropagation()
          },
          getEventPosition = function(e) {
            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
              scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            return {
              x: e.clientX + scrollX,
              y: e.clientY + scrollY
            }
          },
          addEvent = function() {
            if (g.doc.addEventListener) {
              return function(obj, type, fn, element) {
                var f = function(e) {
                  var pos = getEventPosition(e);
                  return fn.call(element, e, pos.x, pos.y)
                };
                obj.addEventListener(type, f, false);
                if (supportsTouch && touchMap[type]) {
                  var _f = function(e) {
                    var pos = getEventPosition(e),
                      olde = e;
                    for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                      if (e.targetTouches[i].target == obj) {
                        e = e.targetTouches[i];
                        e.originalEvent = olde;
                        e.preventDefault = preventTouch;
                        e.stopPropagation = stopTouch;
                        break
                      }
                    }
                    return fn.call(element, e, pos.x, pos.y)
                  };
                  obj.addEventListener(touchMap[type], _f, false)
                }
                return function() {
                  obj.removeEventListener(type, f, false);
                  if (supportsTouch && touchMap[type]) obj.removeEventListener(touchMap[type], _f, false);
                  return true
                }
              }
            } else if (g.doc.attachEvent) {
              return function(obj, type, fn, element) {
                var f = function(e) {
                  e = e || g.win.event;
                  var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                    scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                    x = e.clientX + scrollX,
                    y = e.clientY + scrollY;
                  e.preventDefault = e.preventDefault || preventDefault;
                  e.stopPropagation = e.stopPropagation || stopPropagation;
                  return fn.call(element, e, x, y)
                };
                obj.attachEvent("on" + type, f);
                var detacher = function() {
                  obj.detachEvent("on" + type, f);
                  return true
                };
                return detacher
              }
            }
          }(),
          drag = [],
          dragMove = function(e) {
            var x = e.clientX,
              y = e.clientY,
              scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
              scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
              dragi, j = drag.length;
            while (j--) {
              dragi = drag[j];
              if (supportsTouch && e.touches) {
                var i = e.touches.length,
                  touch;
                while (i--) {
                  touch = e.touches[i];
                  if (touch.identifier == dragi.el._drag.id) {
                    x = touch.clientX;
                    y = touch.clientY;
                    (e.originalEvent ? e.originalEvent : e).preventDefault();
                    break
                  }
                }
              } else {
                e.preventDefault()
              }
              var node = dragi.el.node,
                o, next = node.nextSibling,
                parent = node.parentNode,
                display = node.style.display;
              g.win.opera && parent.removeChild(node);
              node.style.display = "none";
              o = dragi.el.paper.getElementByPoint(x, y);
              node.style.display = display;
              g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
              o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
              x += scrollX;
              y += scrollY;
              eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e)
            }
          },
          dragUp = function(e) {
            R.unmousemove(dragMove).unmouseup(dragUp);
            var i = drag.length,
              dragi;
            while (i--) {
              dragi = drag[i];
              dragi.el._drag = {};
              eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e)
            }
            drag = []
          },
          elproto = R.el = {};
        for (var i = events.length; i--;) {
          (function(eventName) {
            R[eventName] = elproto[eventName] = function(fn, scope) {
              if (R.is(fn, "function")) {
                this.events = this.events || [];
                this.events.push({
                  name: eventName,
                  f: fn,
                  unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)
                })
              }
              return this
            };
            R["un" + eventName] = elproto["un" + eventName] = function(fn) {
              var events = this.events || [],
                l = events.length;
              while (l--) {
                if (events[l].name == eventName && (R.is(fn, "undefined") || events[l].f == fn)) {
                  events[l].unbind();
                  events.splice(l, 1);
                  !events.length && delete this.events
                }
              }
              return this
            }
          })(events[i])
        }
        elproto.data = function(key, value) {
          var data = eldata[this.id] = eldata[this.id] || {};
          if (arguments.length == 0) {
            return data
          }
          if (arguments.length == 1) {
            if (R.is(key, "object")) {
              for (var i in key)
                if (key[has](i)) {
                  this.data(i, key[i])
                } return this
            }
            eve("raphael.data.get." + this.id, this, data[key], key);
            return data[key]
          }
          data[key] = value;
          eve("raphael.data.set." + this.id, this, value, key);
          return this
        };
        elproto.removeData = function(key) {
          if (key == null) {
            delete eldata[this.id]
          } else {
            eldata[this.id] && delete eldata[this.id][key]
          }
          return this
        };
        elproto.getData = function() {
          return clone(eldata[this.id] || {})
        };
        elproto.hover = function(f_in, f_out, scope_in, scope_out) {
          return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in)
        };
        elproto.unhover = function(f_in, f_out) {
          return this.unmouseover(f_in).unmouseout(f_out)
        };
        var draggable = [];
        elproto.drag = function(onmove, onstart, onend, move_scope, start_scope, end_scope) {
          function start(e) {
            (e.originalEvent || e).preventDefault();
            var x = e.clientX,
              y = e.clientY,
              scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
              scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            this._drag.id = e.identifier;
            if (supportsTouch && e.touches) {
              var i = e.touches.length,
                touch;
              while (i--) {
                touch = e.touches[i];
                this._drag.id = touch.identifier;
                if (touch.identifier == this._drag.id) {
                  x = touch.clientX;
                  y = touch.clientY;
                  break
                }
              }
            }
            this._drag.x = x + scrollX;
            this._drag.y = y + scrollY;
            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
            drag.push({
              el: this,
              move_scope: move_scope,
              start_scope: start_scope,
              end_scope: end_scope
            });
            onstart && eve.on("raphael.drag.start." + this.id, onstart);
            onmove && eve.on("raphael.drag.move." + this.id, onmove);
            onend && eve.on("raphael.drag.end." + this.id, onend);
            eve("raphael.drag.start." + this.id, start_scope || move_scope || this, this._drag.x, this._drag.y, e)
          }
          this._drag = {};
          draggable.push({
            el: this,
            start: start
          });
          this.mousedown(start);
          return this
        };
        elproto.onDragOver = function(f) {
          f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id)
        };
        elproto.undrag = function() {
          var i = draggable.length;
          while (i--)
            if (draggable[i].el == this) {
              this.unmousedown(draggable[i].start);
              draggable.splice(i, 1);
              eve.unbind("raphael.drag.*." + this.id)
            }! draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
          drag = []
        };
        paperproto.circle = function(x, y, r) {
          var out = R._engine.circle(this, x || 0, y || 0, r || 0);
          this.__set__ && this.__set__.push(out);
          return out
        };
        paperproto.rect = function(x, y, w, h, r) {
          var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
          this.__set__ && this.__set__.push(out);
          return out
        };
        paperproto.ellipse = function(x, y, rx, ry) {
          var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
          this.__set__ && this.__set__.push(out);
          return out
        };
        paperproto.path = function(pathString) {
          pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
          var out = R._engine.path(R.format[apply](R, arguments), this);
          this.__set__ && this.__set__.push(out);
          return out
        };
        paperproto.image = function(src, x, y, w, h) {
          var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
          this.__set__ && this.__set__.push(out);
          return out
        };
        paperproto.text = function(x, y, text) {
          var out = R._engine.text(this, x || 0, y || 0, Str(text));
          this.__set__ && this.__set__.push(out);
          return out
        };
        paperproto.set = function(itemsArray) {
          !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
          var out = new Set(itemsArray);
          this.__set__ && this.__set__.push(out);
          out["paper"] = this;
          out["type"] = "set";
          return out
        };
        paperproto.setStart = function(set) {
          this.__set__ = set || this.set()
        };
        paperproto.setFinish = function(set) {
          var out = this.__set__;
          delete this.__set__;
          return out
        };
        paperproto.getSize = function() {
          var container = this.canvas.parentNode;
          return {
            width: container.offsetWidth,
            height: container.offsetHeight
          }
        };
        paperproto.setSize = function(width, height) {
          return R._engine.setSize.call(this, width, height)
        };
        paperproto.setViewBox = function(x, y, w, h, fit) {
          return R._engine.setViewBox.call(this, x, y, w, h, fit)
        };
        paperproto.top = paperproto.bottom = null;
        paperproto.raphael = R;
        var getOffset = function(elem) {
          var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop,
            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
          return {
            y: top,
            x: left
          }
        };
        paperproto.getElementByPoint = function(x, y) {
          var paper = this,
            svg = paper.canvas,
            target = g.doc.elementFromPoint(x, y);
          if (g.win.opera && target.tagName == "svg") {
            var so = getOffset(svg),
              sr = svg.createSVGRect();
            sr.x = x - so.x;
            sr.y = y - so.y;
            sr.width = sr.height = 1;
            var hits = svg.getIntersectionList(sr, null);
            if (hits.length) {
              target = hits[hits.length - 1]
            }
          }
          if (!target) {
            return null
          }
          while (target.parentNode && target != svg.parentNode && !target.raphael) {
            target = target.parentNode
          }
          target == paper.canvas.parentNode && (target = svg);
          target = target && target.raphael ? paper.getById(target.raphaelid) : null;
          return target
        };
        paperproto.getElementsByBBox = function(bbox) {
          var set = this.set();
          this.forEach(function(el) {
            if (R.isBBoxIntersect(el.getBBox(), bbox)) {
              set.push(el)
            }
          });
          return set
        };
        paperproto.getById = function(id) {
          var bot = this.bottom;
          while (bot) {
            if (bot.id == id) {
              return bot
            }
            bot = bot.next
          }
          return null
        };
        paperproto.forEach = function(callback, thisArg) {
          var bot = this.bottom;
          while (bot) {
            if (callback.call(thisArg, bot) === false) {
              return this
            }
            bot = bot.next
          }
          return this
        };
        paperproto.getElementsByPoint = function(x, y) {
          var set = this.set();
          this.forEach(function(el) {
            if (el.isPointInside(x, y)) {
              set.push(el)
            }
          });
          return set
        };

        function x_y() {
          return this.x + S + this.y
        }

        function x_y_w_h() {
          return this.x + S + this.y + S + this.width + " × " + this.height
        }
        elproto.isPointInside = function(x, y) {
          var rp = this.realPath = getPath[this.type](this);
          if (this.attr("transform") && this.attr("transform").length) {
            rp = R.transformPath(rp, this.attr("transform"))
          }
          return R.isPointInsidePath(rp, x, y)
        };
        elproto.getBBox = function(isWithoutTransform) {
          if (this.removed) {
            return {}
          }
          var _ = this._;
          if (isWithoutTransform) {
            if (_.dirty || !_.bboxwt) {
              this.realPath = getPath[this.type](this);
              _.bboxwt = pathDimensions(this.realPath);
              _.bboxwt.toString = x_y_w_h;
              _.dirty = 0
            }
            return _.bboxwt
          }
          if (_.dirty || _.dirtyT || !_.bbox) {
            if (_.dirty || !this.realPath) {
              _.bboxwt = 0;
              this.realPath = getPath[this.type](this)
            }
            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
            _.bbox.toString = x_y_w_h;
            _.dirty = _.dirtyT = 0
          }
          return _.bbox
        };
        elproto.clone = function() {
          if (this.removed) {
            return null
          }
          var out = this.paper[this.type]().attr(this.attr());
          this.__set__ && this.__set__.push(out);
          return out
        };
        elproto.glow = function(glow) {
          if (this.type == "text") {
            return null
          }
          glow = glow || {};
          var s = {
              width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
              fill: glow.fill || false,
              opacity: glow.opacity == null ? .5 : glow.opacity,
              offsetx: glow.offsetx || 0,
              offsety: glow.offsety || 0,
              color: glow.color || "#000"
            },
            c = s.width / 2,
            r = this.paper,
            out = r.set(),
            path = this.realPath || getPath[this.type](this);
          path = this.matrix ? mapPath(path, this.matrix) : path;
          for (var i = 1; i < c + 1; i++) {
            out.push(r.path(path).attr({
              stroke: s.color,
              fill: s.fill ? s.color : "none",
              "stroke-linejoin": "round",
              "stroke-linecap": "round",
              "stroke-width": +(s.width / c * i).toFixed(3),
              opacity: +(s.opacity / c).toFixed(3)
            }))
          }
          return out.insertBefore(this).translate(s.offsetx, s.offsety)
        };
        var curveslengths = {},
          getPointAtSegmentLength = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
            if (length == null) {
              return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y)
            } else {
              return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length))
            }
          },
          getLengthFactory = function(istotal, subpath) {
            return function(path, length, onlystart) {
              path = path2curve(path);
              var x, y, p, l, sp = "",
                subpaths = {},
                point, len = 0;
              for (var i = 0, ii = path.length; i < ii; i++) {
                p = path[i];
                if (p[0] == "M") {
                  x = +p[1];
                  y = +p[2]
                } else {
                  l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                  if (len + l > length) {
                    if (subpath && !subpaths.start) {
                      point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                      sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                      if (onlystart) {
                        return sp
                      }
                      subpaths.start = sp;
                      sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
                      len += l;
                      x = +p[5];
                      y = +p[6];
                      continue
                    }
                    if (!istotal && !subpath) {
                      point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                      return {
                        x: point.x,
                        y: point.y,
                        alpha: point.alpha
                      }
                    }
                  }
                  len += l;
                  x = +p[5];
                  y = +p[6]
                }
                sp += p.shift() + p
              }
              subpaths.end = sp;
              point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
              point.alpha && (point = {
                x: point.x,
                y: point.y,
                alpha: point.alpha
              });
              return point
            }
          };
        var getTotalLength = getLengthFactory(1),
          getPointAtLength = getLengthFactory(),
          getSubpathsAtLength = getLengthFactory(0, 1);
        R.getTotalLength = getTotalLength;
        R.getPointAtLength = getPointAtLength;
        R.getSubpath = function(path, from, to) {
          if (this.getTotalLength(path) - to < 1e-6) {
            return getSubpathsAtLength(path, from).end
          }
          var a = getSubpathsAtLength(path, to, 1);
          return from ? getSubpathsAtLength(a, from).end : a
        };
        elproto.getTotalLength = function() {
          var path = this.getPath();
          if (!path) {
            return
          }
          if (this.node.getTotalLength) {
            return this.node.getTotalLength()
          }
          return getTotalLength(path)
        };
        elproto.getPointAtLength = function(length) {
          var path = this.getPath();
          if (!path) {
            return
          }
          return getPointAtLength(path, length)
        };
        elproto.getPath = function() {
          var path, getPath = R._getPath[this.type];
          if (this.type == "text" || this.type == "set") {
            return
          }
          if (getPath) {
            path = getPath(this)
          }
          return path
        };
        elproto.getSubpath = function(from, to) {
          var path = this.getPath();
          if (!path) {
            return
          }
          return R.getSubpath(path, from, to)
        };
        var ef = R.easing_formulas = {
          linear: function(n) {
            return n
          },
          "<": function(n) {
            return pow(n, 1.7)
          },
          ">": function(n) {
            return pow(n, .48)
          },
          "<>": function(n) {
            var q = .48 - n / 1.04,
              Q = math.sqrt(.1734 + q * q),
              x = Q - q,
              X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
              y = -Q - q,
              Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
              t = X + Y + .5;
            return (1 - t) * 3 * t * t + t * t * t
          },
          backIn: function(n) {
            var s = 1.70158;
            return n * n * ((s + 1) * n - s)
          },
          backOut: function(n) {
            n = n - 1;
            var s = 1.70158;
            return n * n * ((s + 1) * n + s) + 1
          },
          elastic: function(n) {
            if (n == !!n) {
              return n
            }
            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1
          },
          bounce: function(n) {
            var s = 7.5625,
              p = 2.75,
              l;
            if (n < 1 / p) {
              l = s * n * n
            } else {
              if (n < 2 / p) {
                n -= 1.5 / p;
                l = s * n * n + .75
              } else {
                if (n < 2.5 / p) {
                  n -= 2.25 / p;
                  l = s * n * n + .9375
                } else {
                  n -= 2.625 / p;
                  l = s * n * n + .984375
                }
              }
            }
            return l
          }
        };
        ef.easeIn = ef["ease-in"] = ef["<"];
        ef.easeOut = ef["ease-out"] = ef[">"];
        ef.easeInOut = ef["ease-in-out"] = ef["<>"];
        ef["back-in"] = ef.backIn;
        ef["back-out"] = ef.backOut;
        var animationElements = [],
          requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            setTimeout(callback, 16)
          },
          animation = function() {
            var Now = +new Date,
              l = 0;
            for (; l < animationElements.length; l++) {
              var e = animationElements[l];
              if (e.el.removed || e.paused) {
                continue
              }
              var time = Now - e.start,
                ms = e.ms,
                easing = e.easing,
                from = e.from,
                diff = e.diff,
                to = e.to,
                t = e.t,
                that = e.el,
                set = {},
                now, init = {},
                key;
              if (e.initstatus) {
                time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
                e.status = e.initstatus;
                delete e.initstatus;
                e.stop && animationElements.splice(l--, 1)
              } else {
                e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top
              }
              if (time < 0) {
                continue
              }
              if (time < ms) {
                var pos = easing(time / ms);
                for (var attr in from)
                  if (from[has](attr)) {
                    switch (availableAnimAttrs[attr]) {
                      case nu:
                        now = +from[attr] + pos * ms * diff[attr];
                        break;
                      case "colour":
                        now = "rgb(" + [upto255(round(from[attr].r + pos * ms * diff[attr].r)), upto255(round(from[attr].g + pos * ms * diff[attr].g)), upto255(round(from[attr].b + pos * ms * diff[attr].b))].join(",") + ")";
                        break;
                      case "path":
                        now = [];
                        for (var i = 0, ii = from[attr].length; i < ii; i++) {
                          now[i] = [from[attr][i][0]];
                          for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                            now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j]
                          }
                          now[i] = now[i].join(S)
                        }
                        now = now.join(S);
                        break;
                      case "transform":
                        if (diff[attr].real) {
                          now = [];
                          for (i = 0, ii = from[attr].length; i < ii; i++) {
                            now[i] = [from[attr][i][0]];
                            for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                              now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j]
                            }
                          }
                        } else {
                          var get = function(i) {
                            return +from[attr][i] + pos * ms * diff[attr][i]
                          };
                          now = [
                            ["m", get(0), get(1), get(2), get(3), get(4), get(5)]
                          ]
                        }
                        break;
                      case "csv":
                        if (attr == "clip-rect") {
                          now = [];
                          i = 4;
                          while (i--) {
                            now[i] = +from[attr][i] + pos * ms * diff[attr][i]
                          }
                        }
                        break;
                      default:
                        var from2 = [][concat](from[attr]);
                        now = [];
                        i = that.paper.customAttributes[attr].length;
                        while (i--) {
                          now[i] = +from2[i] + pos * ms * diff[attr][i]
                        }
                        break
                    }
                    set[attr] = now
                  } that.attr(set);
                (function(id, that, anim) {
                  setTimeout(function() {
                    eve("raphael.anim.frame." + id, that, anim)
                  })
                })(that.id, that, e.anim)
              } else {
                (function(f, el, a) {
                  setTimeout(function() {
                    eve("raphael.anim.frame." + el.id, el, a);
                    eve("raphael.anim.finish." + el.id, el, a);
                    R.is(f, "function") && f.call(el)
                  })
                })(e.callback, that, e.anim);
                that.attr(to);
                animationElements.splice(l--, 1);
                if (e.repeat > 1 && !e.next) {
                  for (key in to)
                    if (to[has](key)) {
                      init[key] = e.totalOrigin[key]
                    } e.el.attr(init);
                  runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1)
                }
                if (e.next && !e.stop) {
                  runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat)
                }
              }
            }
            animationElements.length && requestAnimFrame(animation)
          },
          upto255 = function(color) {
            return color > 255 ? 255 : color < 0 ? 0 : color
          };
        elproto.animateWith = function(el, anim, params, ms, easing, callback) {
          var element = this;
          if (element.removed) {
            callback && callback.call(element);
            return element
          }
          var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
            x, y;
          runAnimation(a, element, a.percents[0], null, element.attr());
          for (var i = 0, ii = animationElements.length; i < ii; i++) {
            if (animationElements[i].anim == anim && animationElements[i].el == el) {
              animationElements[ii - 1].start = animationElements[i].start;
              break
            }
          }
          return element
        };

        function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
          var cx = 3 * p1x,
            bx = 3 * (p2x - p1x) - cx,
            ax = 1 - cx - bx,
            cy = 3 * p1y,
            by = 3 * (p2y - p1y) - cy,
            ay = 1 - cy - by;

          function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t
          }

          function solve(x, epsilon) {
            var t = solveCurveX(x, epsilon);
            return ((ay * t + by) * t + cy) * t
          }

          function solveCurveX(x, epsilon) {
            var t0, t1, t2, x2, d2, i;
            for (t2 = x, i = 0; i < 8; i++) {
              x2 = sampleCurveX(t2) - x;
              if (abs(x2) < epsilon) {
                return t2
              }
              d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
              if (abs(d2) < 1e-6) {
                break
              }
              t2 = t2 - x2 / d2
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
              return t0
            }
            if (t2 > t1) {
              return t1
            }
            while (t0 < t1) {
              x2 = sampleCurveX(t2);
              if (abs(x2 - x) < epsilon) {
                return t2
              }
              if (x > x2) {
                t0 = t2
              } else {
                t1 = t2
              }
              t2 = (t1 - t0) / 2 + t0
            }
            return t2
          }
          return solve(t, 1 / (200 * duration))
        }
        elproto.onAnimation = function(f) {
          f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
          return this
        };

        function Animation(anim, ms) {
          var percents = [],
            newAnim = {};
          this.ms = ms;
          this.times = 1;
          if (anim) {
            for (var attr in anim)
              if (anim[has](attr)) {
                newAnim[toFloat(attr)] = anim[attr];
                percents.push(toFloat(attr))
              } percents.sort(sortByNumber)
          }
          this.anim = newAnim;
          this.top = percents[percents.length - 1];
          this.percents = percents
        }
        Animation.prototype.delay = function(delay) {
          var a = new Animation(this.anim, this.ms);
          a.times = this.times;
          a.del = +delay || 0;
          return a
        };
        Animation.prototype.repeat = function(times) {
          var a = new Animation(this.anim, this.ms);
          a.del = this.del;
          a.times = math.floor(mmax(times, 0)) || 1;
          return a
        };

        function runAnimation(anim, element, percent, status, totalOrigin, times) {
          percent = toFloat(percent);
          var params, isInAnim, isInAnimSet, percents = [],
            next, prev, timestamp, ms = anim.ms,
            from = {},
            to = {},
            diff = {};
          if (status) {
            for (i = 0, ii = animationElements.length; i < ii; i++) {
              var e = animationElements[i];
              if (e.el.id == element.id && e.anim == anim) {
                if (e.percent != percent) {
                  animationElements.splice(i, 1);
                  isInAnimSet = 1
                } else {
                  isInAnim = e
                }
                element.attr(e.totalOrigin);
                break
              }
            }
          } else {
            status = +to
          }
          for (var i = 0, ii = anim.percents.length; i < ii; i++) {
            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
              percent = anim.percents[i];
              prev = anim.percents[i - 1] || 0;
              ms = ms / anim.top * (percent - prev);
              next = anim.percents[i + 1];
              params = anim.anim[percent];
              break
            } else if (status) {
              element.attr(anim.anim[anim.percents[i]])
            }
          }
          if (!params) {
            return
          }
          if (!isInAnim) {
            for (var attr in params)
              if (params[has](attr)) {
                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                  from[attr] = element.attr(attr);
                  from[attr] == null && (from[attr] = availableAttrs[attr]);
                  to[attr] = params[attr];
                  switch (availableAnimAttrs[attr]) {
                    case nu:
                      diff[attr] = (to[attr] - from[attr]) / ms;
                      break;
                    case "colour":
                      from[attr] = R.getRGB(from[attr]);
                      var toColour = R.getRGB(to[attr]);
                      diff[attr] = {
                        r: (toColour.r - from[attr].r) / ms,
                        g: (toColour.g - from[attr].g) / ms,
                        b: (toColour.b - from[attr].b) / ms
                      };
                      break;
                    case "path":
                      var pathes = path2curve(from[attr], to[attr]),
                        toPath = pathes[1];
                      from[attr] = pathes[0];
                      diff[attr] = [];
                      for (i = 0, ii = from[attr].length; i < ii; i++) {
                        diff[attr][i] = [0];
                        for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                          diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms
                        }
                      }
                      break;
                    case "transform":
                      var _ = element._,
                        eq = equaliseTransform(_[attr], to[attr]);
                      if (eq) {
                        from[attr] = eq.from;
                        to[attr] = eq.to;
                        diff[attr] = [];
                        diff[attr].real = true;
                        for (i = 0, ii = from[attr].length; i < ii; i++) {
                          diff[attr][i] = [from[attr][i][0]];
                          for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                            diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms
                          }
                        }
                      } else {
                        var m = element.matrix || new Matrix,
                          to2 = {
                            _: {
                              transform: _.transform
                            },
                            getBBox: function() {
                              return element.getBBox(1)
                            }
                          };
                        from[attr] = [m.a, m.b, m.c, m.d, m.e, m.f];
                        extractTransform(to2, to[attr]);
                        to[attr] = to2._.transform;
                        diff[attr] = [(to2.matrix.a - m.a) / ms, (to2.matrix.b - m.b) / ms, (to2.matrix.c - m.c) / ms, (to2.matrix.d - m.d) / ms, (to2.matrix.e - m.e) / ms, (to2.matrix.f - m.f) / ms]
                      }
                      break;
                    case "csv":
                      var values = Str(params[attr])[split](separator),
                        from2 = Str(from[attr])[split](separator);
                      if (attr == "clip-rect") {
                        from[attr] = from2;
                        diff[attr] = [];
                        i = from2.length;
                        while (i--) {
                          diff[attr][i] = (values[i] - from[attr][i]) / ms
                        }
                      }
                      to[attr] = values;
                      break;
                    default:
                      values = [][concat](params[attr]);
                      from2 = [][concat](from[attr]);
                      diff[attr] = [];
                      i = element.paper.customAttributes[attr].length;
                      while (i--) {
                        diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms
                      }
                      break
                  }
                }
              } var easing = params.easing,
              easyeasy = R.easing_formulas[easing];
            if (!easyeasy) {
              easyeasy = Str(easing).match(bezierrg);
              if (easyeasy && easyeasy.length == 5) {
                var curve = easyeasy;
                easyeasy = function(t) {
                  return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms)
                }
              } else {
                easyeasy = pipe
              }
            }
            timestamp = params.start || anim.start || +new Date;
            e = {
              anim: anim,
              percent: percent,
              timestamp: timestamp,
              start: timestamp + (anim.del || 0),
              status: 0,
              initstatus: status || 0,
              stop: false,
              ms: ms,
              easing: easyeasy,
              from: from,
              diff: diff,
              to: to,
              el: element,
              callback: params.callback,
              prev: prev,
              next: next,
              repeat: times || anim.times,
              origin: element.attr(),
              totalOrigin: totalOrigin
            };
            animationElements.push(e);
            if (status && !isInAnim && !isInAnimSet) {
              e.stop = true;
              e.start = new Date - ms * status;
              if (animationElements.length == 1) {
                return animation()
              }
            }
            if (isInAnimSet) {
              e.start = new Date - e.ms * status
            }
            animationElements.length == 1 && requestAnimFrame(animation)
          } else {
            isInAnim.initstatus = status;
            isInAnim.start = new Date - isInAnim.ms * status
          }
          eve("raphael.anim.start." + element.id, element, anim)
        }
        R.animation = function(params, ms, easing, callback) {
          if (params instanceof Animation) {
            return params
          }
          if (R.is(easing, "function") || !easing) {
            callback = callback || easing || null;
            easing = null
          }
          params = Object(params);
          ms = +ms || 0;
          var p = {},
            json, attr;
          for (attr in params)
            if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
              json = true;
              p[attr] = params[attr]
            } if (!json) {
            if (callback) {
              var lastKey = 0;
              for (var i in params) {
                var percent = toInt(i);
                if (params[has](i) && percent > lastKey) {
                  lastKey = percent
                }
              }
              lastKey += "%";
              !params[lastKey].callback && (params[lastKey].callback = callback)
            }
            return new Animation(params, ms)
          } else {
            easing && (p.easing = easing);
            callback && (p.callback = callback);
            return new Animation({
              100: p
            }, ms)
          }
        };
        elproto.animate = function(params, ms, easing, callback) {
          var element = this;
          if (element.removed) {
            callback && callback.call(element);
            return element
          }
          var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
          runAnimation(anim, element, anim.percents[0], null, element.attr());
          return element
        };
        elproto.setTime = function(anim, value) {
          if (anim && value != null) {
            this.status(anim, mmin(value, anim.ms) / anim.ms)
          }
          return this
        };
        elproto.status = function(anim, value) {
          var out = [],
            i = 0,
            len, e;
          if (value != null) {
            runAnimation(anim, this, -1, mmin(value, 1));
            return this
          } else {
            len = animationElements.length;
            for (; i < len; i++) {
              e = animationElements[i];
              if (e.el.id == this.id && (!anim || e.anim == anim)) {
                if (anim) {
                  return e.status
                }
                out.push({
                  anim: e.anim,
                  status: e.status
                })
              }
            }
            if (anim) {
              return 0
            }
            return out
          }
        };
        elproto.pause = function(anim) {
          for (var i = 0; i < animationElements.length; i++)
            if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
              if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
                animationElements[i].paused = true
              }
            } return this
        };
        elproto.resume = function(anim) {
          for (var i = 0; i < animationElements.length; i++)
            if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
              var e = animationElements[i];
              if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
                delete e.paused;
                this.status(e.anim, e.status)
              }
            } return this
        };
        elproto.stop = function(anim) {
          for (var i = 0; i < animationElements.length; i++)
            if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
              if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
                animationElements.splice(i--, 1)
              }
            } return this
        };

        function stopAnimation(paper) {
          for (var i = 0; i < animationElements.length; i++)
            if (animationElements[i].el.paper == paper) {
              animationElements.splice(i--, 1)
            }
        }
        eve.on("raphael.remove", stopAnimation);
        eve.on("raphael.clear", stopAnimation);
        elproto.toString = function() {
          return "Raphaël’s object"
        };
        var Set = function(items) {
            this.items = [];
            this.length = 0;
            this.type = "set";
            if (items) {
              for (var i = 0, ii = items.length; i < ii; i++) {
                if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
                  this[this.items.length] = this.items[this.items.length] = items[i];
                  this.length++
                }
              }
            }
          },
          setproto = Set.prototype;
        setproto.push = function() {
          var item, len;
          for (var i = 0, ii = arguments.length; i < ii; i++) {
            item = arguments[i];
            if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
              len = this.items.length;
              this[len] = this.items[len] = item;
              this.length++
            }
          }
          return this
        };
        setproto.pop = function() {
          this.length && delete this[this.length--];
          return this.items.pop()
        };
        setproto.forEach = function(callback, thisArg) {
          for (var i = 0, ii = this.items.length; i < ii; i++) {
            if (callback.call(thisArg, this.items[i], i) === false) {
              return this
            }
          }
          return this
        };
        for (var method in elproto)
          if (elproto[has](method)) {
            setproto[method] = function(methodname) {
              return function() {
                var arg = arguments;
                return this.forEach(function(el) {
                  el[methodname][apply](el, arg)
                })
              }
            }(method)
          } setproto.attr = function(name, value) {
          if (name && R.is(name, array) && R.is(name[0], "object")) {
            for (var j = 0, jj = name.length; j < jj; j++) {
              this.items[j].attr(name[j])
            }
          } else {
            for (var i = 0, ii = this.items.length; i < ii; i++) {
              this.items[i].attr(name, value)
            }
          }
          return this
        };
        setproto.clear = function() {
          while (this.length) {
            this.pop()
          }
        };
        setproto.splice = function(index, count, insertion) {
          index = index < 0 ? mmax(this.length + index, 0) : index;
          count = mmax(0, mmin(this.length - index, count));
          var tail = [],
            todel = [],
            args = [],
            i;
          for (i = 2; i < arguments.length; i++) {
            args.push(arguments[i])
          }
          for (i = 0; i < count; i++) {
            todel.push(this[index + i])
          }
          for (; i < this.length - index; i++) {
            tail.push(this[index + i])
          }
          var arglen = args.length;
          for (i = 0; i < arglen + tail.length; i++) {
            this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen]
          }
          i = this.items.length = this.length -= count - arglen;
          while (this[i]) {
            delete this[i++]
          }
          return new Set(todel)
        };
        setproto.exclude = function(el) {
          for (var i = 0, ii = this.length; i < ii; i++)
            if (this[i] == el) {
              this.splice(i, 1);
              return true
            }
        };
        setproto.animate = function(params, ms, easing, callback) {
          (R.is(easing, "function") || !easing) && (callback = easing || null);
          var len = this.items.length,
            i = len,
            item, set = this,
            collector;
          if (!len) {
            return this
          }
          callback && (collector = function() {
            !--len && callback.call(set)
          });
          easing = R.is(easing, string) ? easing : collector;
          var anim = R.animation(params, ms, easing, collector);
          item = this.items[--i].animate(anim);
          while (i--) {
            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
            this.items[i] && !this.items[i].removed || len--
          }
          return this
        };
        setproto.insertAfter = function(el) {
          var i = this.items.length;
          while (i--) {
            this.items[i].insertAfter(el)
          }
          return this
        };
        setproto.getBBox = function() {
          var x = [],
            y = [],
            x2 = [],
            y2 = [];
          for (var i = this.items.length; i--;)
            if (!this.items[i].removed) {
              var box = this.items[i].getBBox();
              x.push(box.x);
              y.push(box.y);
              x2.push(box.x + box.width);
              y2.push(box.y + box.height)
            } x = mmin[apply](0, x);
          y = mmin[apply](0, y);
          x2 = mmax[apply](0, x2);
          y2 = mmax[apply](0, y2);
          return {
            x: x,
            y: y,
            x2: x2,
            y2: y2,
            width: x2 - x,
            height: y2 - y
          }
        };
        setproto.clone = function(s) {
          s = this.paper.set();
          for (var i = 0, ii = this.items.length; i < ii; i++) {
            s.push(this.items[i].clone())
          }
          return s
        };
        setproto.toString = function() {
          return "Raphaël‘s set"
        };
        setproto.glow = function(glowConfig) {
          var ret = this.paper.set();
          this.forEach(function(shape, index) {
            var g = shape.glow(glowConfig);
            if (g != null) {
              g.forEach(function(shape2, index2) {
                ret.push(shape2)
              })
            }
          });
          return ret
        };
        setproto.isPointInside = function(x, y) {
          var isPointInside = false;
          this.forEach(function(el) {
            if (el.isPointInside(x, y)) {
              isPointInside = true;
              return false
            }
          });
          return isPointInside
        };
        R.registerFont = function(font) {
          if (!font.face) {
            return font
          }
          this.fonts = this.fonts || {};
          var fontcopy = {
              w: font.w,
              face: {},
              glyphs: {}
            },
            family = font.face["font-family"];
          for (var prop in font.face)
            if (font.face[has](prop)) {
              fontcopy.face[prop] = font.face[prop]
            } if (this.fonts[family]) {
            this.fonts[family].push(fontcopy)
          } else {
            this.fonts[family] = [fontcopy]
          }
          if (!font.svg) {
            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
            for (var glyph in font.glyphs)
              if (font.glyphs[has](glyph)) {
                var path = font.glyphs[glyph];
                fontcopy.glyphs[glyph] = {
                  w: path.w,
                  k: {},
                  d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function(command) {
                    return {
                      l: "L",
                      c: "C",
                      x: "z",
                      t: "m",
                      r: "l",
                      v: "c"
                    } [command] || "M"
                  }) + "z"
                };
                if (path.k) {
                  for (var k in path.k)
                    if (path[has](k)) {
                      fontcopy.glyphs[glyph].k[k] = path.k[k]
                    }
                }
              }
          }
          return font
        };
        paperproto.getFont = function(family, weight, style, stretch) {
          stretch = stretch || "normal";
          style = style || "normal";
          weight = +weight || {
            normal: 400,
            bold: 700,
            lighter: 300,
            bolder: 800
          } [weight] || 400;
          if (!R.fonts) {
            return
          }
          var font = R.fonts[family];
          if (!font) {
            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
            for (var fontName in R.fonts)
              if (R.fonts[has](fontName)) {
                if (name.test(fontName)) {
                  font = R.fonts[fontName];
                  break
                }
              }
          }
          var thefont;
          if (font) {
            for (var i = 0, ii = font.length; i < ii; i++) {
              thefont = font[i];
              if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                break
              }
            }
          }
          return thefont
        };
        paperproto.print = function(x, y, string, font, size, origin, letter_spacing, line_spacing) {
          origin = origin || "middle";
          letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
          line_spacing = mmax(mmin(line_spacing || 1, 3), 1);
          var letters = Str(string)[split](E),
            shift = 0,
            notfirst = 0,
            path = E,
            scale;
          R.is(font, "string") && (font = this.getFont(font));
          if (font) {
            scale = (size || 16) / font.face["units-per-em"];
            var bb = font.face.bbox[split](separator),
              top = +bb[0],
              lineHeight = bb[3] - bb[1],
              shifty = 0,
              height = +bb[1] + (origin == "baseline" ? lineHeight + +font.face.descent : lineHeight / 2);
            for (var i = 0, ii = letters.length; i < ii; i++) {
              if (letters[i] == "\n") {
                shift = 0;
                curr = 0;
                notfirst = 0;
                shifty += lineHeight * line_spacing
              } else {
                var prev = notfirst && font.glyphs[letters[i - 1]] || {},
                  curr = font.glyphs[letters[i]];
                shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + font.w * letter_spacing : 0;
                notfirst = 1
              }
              if (curr && curr.d) {
                path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale])
              }
            }
          }
          return this.path(path).attr({
            fill: "#000",
            stroke: "none"
          })
        };
        paperproto.add = function(json) {
          if (R.is(json, "array")) {
            var res = this.set(),
              i = 0,
              ii = json.length,
              j;
            for (; i < ii; i++) {
              j = json[i] || {};
              elements[has](j.type) && res.push(this[j.type]().attr(j))
            }
          }
          return res
        };
        R.format = function(token, params) {
          var args = R.is(params, array) ? [0][concat](params) : arguments;
          token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function(str, i) {
            return args[++i] == null ? E : args[i]
          }));
          return token || E
        };
        R.fullfill = function() {
          var tokenRegex = /\{([^\}]+)\}/g,
            objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            replacer = function(all, key, obj) {
              var res = obj;
              key.replace(objNotationRegex, function(all, name, quote, quotedName, isFunc) {
                name = name || quotedName;
                if (res) {
                  if (name in res) {
                    res = res[name]
                  }
                  typeof res == "function" && isFunc && (res = res())
                }
              });
              res = (res == null || res == obj ? all : res) + "";
              return res
            };
          return function(str, obj) {
            return String(str).replace(tokenRegex, function(all, key) {
              return replacer(all, key, obj)
            })
          }
        }();
        R.ninja = function() {
          if (oldRaphael.was) {
            g.win.Raphael = oldRaphael.is
          } else {
            window.Raphael = undefined;
            try {
              delete window.Raphael
            } catch (e) {}
          }
          return R
        };
        R.st = setproto;
        eve.on("raphael.DOMload", function() {
          loaded = true
        });
        (function(doc, loaded, f) {
          if (doc.readyState == null && doc.addEventListener) {
            doc.addEventListener(loaded, f = function() {
              doc.removeEventListener(loaded, f, false);
              doc.readyState = "complete"
            }, false);
            doc.readyState = "loading"
          }

          function isLoaded() {
            /in/.test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload")
          }
          isLoaded()
        })(document, "DOMContentLoaded");
        return R
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    },
    "./dev/raphael.svg.js": function(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./dev/raphael.core.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function(R) {
        if (R && !R.svg) {
          return
        }
        var has = "hasOwnProperty",
          Str = String,
          toFloat = parseFloat,
          toInt = parseInt,
          math = Math,
          mmax = math.max,
          abs = math.abs,
          pow = math.pow,
          separator = /[, ]+/,
          eve = R.eve,
          E = "",
          S = " ";
        var xlink = "http://www.w3.org/1999/xlink",
          markers = {
            block: "M5,0 0,2.5 5,5z",
            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open: "M6,1 1,3.5 6,6",
            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
          },
          markerCounter = {};
        R.toString = function() {
          return "Your browser supports SVG.\nYou are running Raphaël " + this.version
        };
        var $ = function(el, attr) {
            if (attr) {
              if (typeof el == "string") {
                el = $(el)
              }
              for (var key in attr)
                if (attr[has](key)) {
                  if (key.substring(0, 6) == "xlink:") {
                    el.setAttributeNS(xlink, key.substring(6), Str(attr[key]))
                  } else {
                    el.setAttribute(key, Str(attr[key]))
                  }
                }
            } else {
              el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
              el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)")
            }
            return el
          },
          addGradientFill = function(element, gradient) {
            var type = "linear",
              id = element.id + gradient,
              fx = .5,
              fy = .5,
              o = element.node,
              SVG = element.paper,
              s = o.style,
              el = R._g.doc.getElementById(id);
            if (!el) {
              gradient = Str(gradient).replace(R._radial_gradient, function(all, _fx, _fy) {
                type = "radial";
                if (_fx && _fy) {
                  fx = toFloat(_fx);
                  fy = toFloat(_fy);
                  var dir = (fy > .5) * 2 - 1;
                  pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) && fy != .5 && (fy = fy.toFixed(5) - 1e-5 * dir)
                }
                return E
              });
              gradient = gradient.split(/\s*\-\s*/);
              if (type == "linear") {
                var angle = gradient.shift();
                angle = -toFloat(angle);
                if (isNaN(angle)) {
                  return null
                }
                var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
                  max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                vector[2] *= max;
                vector[3] *= max;
                if (vector[2] < 0) {
                  vector[0] = -vector[2];
                  vector[2] = 0
                }
                if (vector[3] < 0) {
                  vector[1] = -vector[3];
                  vector[3] = 0
                }
              }
              var dots = R._parseDots(gradient);
              if (!dots) {
                return null
              }
              id = id.replace(/[\(\)\s,\xb0#]/g, "_");
              if (element.gradient && id != element.gradient.id) {
                SVG.defs.removeChild(element.gradient);
                delete element.gradient
              }
              if (!element.gradient) {
                el = $(type + "Gradient", {
                  id: id
                });
                element.gradient = el;
                $(el, type == "radial" ? {
                  fx: fx,
                  fy: fy
                } : {
                  x1: vector[0],
                  y1: vector[1],
                  x2: vector[2],
                  y2: vector[3],
                  gradientTransform: element.matrix.invert()
                });
                SVG.defs.appendChild(el);
                for (var i = 0, ii = dots.length; i < ii; i++) {
                  el.appendChild($("stop", {
                    offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
                    "stop-color": dots[i].color || "#fff",
                    "stop-opacity": isFinite(dots[i].opacity) ? dots[i].opacity : 1
                  }))
                }
              }
            }
            $(o, {
              fill: fillurl(id),
              opacity: 1,
              "fill-opacity": 1
            });
            s.fill = E;
            s.opacity = 1;
            s.fillOpacity = 1;
            return 1
          },
          isIE9or10 = function() {
            var mode = document.documentMode;
            return mode && (mode === 9 || mode === 10)
          },
          fillurl = function(id) {
            if (isIE9or10()) {
              return "url('#" + id + "')"
            }
            var location = document.location;
            var locationString = location.protocol + "//" + location.host + location.pathname + location.search;
            return "url('" + locationString + "#" + id + "')"
          },
          updatePosition = function(o) {
            var bbox = o.getBBox(1);
            $(o.pattern, {
              patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"
            })
          },
          addArrow = function(o, value, isEnd) {
            if (o.type == "path") {
              var values = Str(value).toLowerCase().split("-"),
                p = o.paper,
                se = isEnd ? "end" : "start",
                node = o.node,
                attrs = o.attrs,
                stroke = attrs["stroke-width"],
                i = values.length,
                type = "classic",
                from, to, dx, refX, attr, w = 3,
                h = 3,
                t = 5;
              while (i--) {
                switch (values[i]) {
                  case "block":
                  case "classic":
                  case "oval":
                  case "diamond":
                  case "open":
                  case "none":
                    type = values[i];
                    break;
                  case "wide":
                    h = 5;
                    break;
                  case "narrow":
                    h = 2;
                    break;
                  case "long":
                    w = 5;
                    break;
                  case "short":
                    w = 2;
                    break
                }
              }
              if (type == "open") {
                w += 2;
                h += 2;
                t += 2;
                dx = 1;
                refX = isEnd ? 4 : 1;
                attr = {
                  fill: "none",
                  stroke: attrs.stroke
                }
              } else {
                refX = dx = w / 2;
                attr = {
                  fill: attrs.stroke,
                  stroke: "none"
                }
              }
              if (o._.arrows) {
                if (isEnd) {
                  o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
                  o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--
                } else {
                  o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
                  o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--
                }
              } else {
                o._.arrows = {}
              }
              if (type != "none") {
                var pathId = "raphael-marker-" + type,
                  markerId = "raphael-marker-" + se + type + w + h + "-obj" + o.id;
                if (!R._g.doc.getElementById(pathId)) {
                  p.defs.appendChild($($("path"), {
                    "stroke-linecap": "round",
                    d: markers[type],
                    id: pathId
                  }));
                  markerCounter[pathId] = 1
                } else {
                  markerCounter[pathId]++
                }
                var marker = R._g.doc.getElementById(markerId),
                  use;
                if (!marker) {
                  marker = $($("marker"), {
                    id: markerId,
                    markerHeight: h,
                    markerWidth: w,
                    orient: "auto",
                    refX: refX,
                    refY: h / 2
                  });
                  use = $($("use"), {
                    "xlink:href": "#" + pathId,
                    transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
                    "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
                  });
                  marker.appendChild(use);
                  p.defs.appendChild(marker);
                  markerCounter[markerId] = 1
                } else {
                  markerCounter[markerId]++;
                  use = marker.getElementsByTagName("use")[0]
                }
                $(use, attr);
                var delta = dx * (type != "diamond" && type != "oval");
                if (isEnd) {
                  from = o._.arrows.startdx * stroke || 0;
                  to = R.getTotalLength(attrs.path) - delta * stroke
                } else {
                  from = delta * stroke;
                  to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0)
                }
                attr = {};
                attr["marker-" + se] = "url(#" + markerId + ")";
                if (to || from) {
                  attr.d = R.getSubpath(attrs.path, from, to)
                }
                $(node, attr);
                o._.arrows[se + "Path"] = pathId;
                o._.arrows[se + "Marker"] = markerId;
                o._.arrows[se + "dx"] = delta;
                o._.arrows[se + "Type"] = type;
                o._.arrows[se + "String"] = value
              } else {
                if (isEnd) {
                  from = o._.arrows.startdx * stroke || 0;
                  to = R.getTotalLength(attrs.path) - from
                } else {
                  from = 0;
                  to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0)
                }
                o._.arrows[se + "Path"] && $(node, {
                  d: R.getSubpath(attrs.path, from, to)
                });
                delete o._.arrows[se + "Path"];
                delete o._.arrows[se + "Marker"];
                delete o._.arrows[se + "dx"];
                delete o._.arrows[se + "Type"];
                delete o._.arrows[se + "String"]
              }
              for (attr in markerCounter)
                if (markerCounter[has](attr) && !markerCounter[attr]) {
                  var item = R._g.doc.getElementById(attr);
                  item && item.parentNode.removeChild(item)
                }
            }
          },
          dasharray = {
            "-": [3, 1],
            ".": [1, 1],
            "-.": [3, 1, 1, 1],
            "-..": [3, 1, 1, 1, 1, 1],
            ". ": [1, 3],
            "- ": [4, 3],
            "--": [8, 3],
            "- .": [4, 3, 1, 3],
            "--.": [8, 3, 1, 3],
            "--..": [8, 3, 1, 3, 1, 3]
          },
          addDashes = function(o, value, params) {
            value = dasharray[Str(value).toLowerCase()];
            if (value) {
              var width = o.attrs["stroke-width"] || "1",
                butt = {
                  round: width,
                  square: width,
                  butt: 0
                } [o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                dashes = [],
                i = value.length;
              while (i--) {
                dashes[i] = value[i] * width + (i % 2 ? 1 : -1) * butt
              }
              $(o.node, {
                "stroke-dasharray": dashes.join(",")
              })
            } else {
              $(o.node, {
                "stroke-dasharray": "none"
              })
            }
          },
          setFillAndStroke = function(o, params) {
            var node = o.node,
              attrs = o.attrs,
              vis = node.style.visibility;
            node.style.visibility = "hidden";
            for (var att in params) {
              if (params[has](att)) {
                if (!R._availableAttrs[has](att)) {
                  continue
                }
                var value = params[att];
                attrs[att] = value;
                switch (att) {
                  case "blur":
                    o.blur(value);
                    break;
                  case "title":
                    var title = node.getElementsByTagName("title");
                    if (title.length && (title = title[0])) {
                      title.firstChild.nodeValue = value
                    } else {
                      title = $("title");
                      var val = R._g.doc.createTextNode(value);
                      title.appendChild(val);
                      node.appendChild(title)
                    }
                    break;
                  case "href":
                  case "target":
                    var pn = node.parentNode;
                    if (pn.tagName.toLowerCase() != "a") {
                      var hl = $("a");
                      pn.insertBefore(hl, node);
                      hl.appendChild(node);
                      pn = hl
                    }
                    if (att == "target") {
                      pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value)
                    } else {
                      pn.setAttributeNS(xlink, att, value)
                    }
                    break;
                  case "cursor":
                    node.style.cursor = value;
                    break;
                  case "transform":
                    o.transform(value);
                    break;
                  case "arrow-start":
                    addArrow(o, value);
                    break;
                  case "arrow-end":
                    addArrow(o, value, 1);
                    break;
                  case "clip-rect":
                    var rect = Str(value).split(separator);
                    if (rect.length == 4) {
                      o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                      var el = $("clipPath"),
                        rc = $("rect");
                      el.id = R.createUUID();
                      $(rc, {
                        x: rect[0],
                        y: rect[1],
                        width: rect[2],
                        height: rect[3]
                      });
                      el.appendChild(rc);
                      o.paper.defs.appendChild(el);
                      $(node, {
                        "clip-path": "url(#" + el.id + ")"
                      });
                      o.clip = rc
                    }
                    if (!value) {
                      var path = node.getAttribute("clip-path");
                      if (path) {
                        var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                        clip && clip.parentNode.removeChild(clip);
                        $(node, {
                          "clip-path": E
                        });
                        delete o.clip
                      }
                    }
                    break;
                  case "path":
                    if (o.type == "path") {
                      $(node, {
                        d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"
                      });
                      o._.dirty = 1;
                      if (o._.arrows) {
                        "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                        "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1)
                      }
                    }
                    break;
                  case "width":
                    node.setAttribute(att, value);
                    o._.dirty = 1;
                    if (attrs.fx) {
                      att = "x";
                      value = attrs.x
                    } else {
                      break
                    }
                  case "x":
                    if (attrs.fx) {
                      value = -attrs.x - (attrs.width || 0)
                    }
                  case "rx":
                    if (att == "rx" && o.type == "rect") {
                      break
                    }
                  case "cx":
                    node.setAttribute(att, value);
                    o.pattern && updatePosition(o);
                    o._.dirty = 1;
                    break;
                  case "height":
                    node.setAttribute(att, value);
                    o._.dirty = 1;
                    if (attrs.fy) {
                      att = "y";
                      value = attrs.y
                    } else {
                      break
                    }
                  case "y":
                    if (attrs.fy) {
                      value = -attrs.y - (attrs.height || 0)
                    }
                  case "ry":
                    if (att == "ry" && o.type == "rect") {
                      break
                    }
                  case "cy":
                    node.setAttribute(att, value);
                    o.pattern && updatePosition(o);
                    o._.dirty = 1;
                    break;
                  case "r":
                    if (o.type == "rect") {
                      $(node, {
                        rx: value,
                        ry: value
                      })
                    } else {
                      node.setAttribute(att, value)
                    }
                    o._.dirty = 1;
                    break;
                  case "src":
                    if (o.type == "image") {
                      node.setAttributeNS(xlink, "href", value)
                    }
                    break;
                  case "stroke-width":
                    if (o._.sx != 1 || o._.sy != 1) {
                      value /= mmax(abs(o._.sx), abs(o._.sy)) || 1
                    }
                    node.setAttribute(att, value);
                    if (attrs["stroke-dasharray"]) {
                      addDashes(o, attrs["stroke-dasharray"], params)
                    }
                    if (o._.arrows) {
                      "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                      "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1)
                    }
                    break;
                  case "stroke-dasharray":
                    addDashes(o, value, params);
                    break;
                  case "fill":
                    var isURL = Str(value).match(R._ISURL);
                    if (isURL) {
                      el = $("pattern");
                      var ig = $("image");
                      el.id = R.createUUID();
                      $(el, {
                        x: 0,
                        y: 0,
                        patternUnits: "userSpaceOnUse",
                        height: 1,
                        width: 1
                      });
                      $(ig, {
                        x: 0,
                        y: 0,
                        "xlink:href": isURL[1]
                      });
                      el.appendChild(ig);
                      (function(el) {
                        R._preload(isURL[1], function() {
                          var w = this.offsetWidth,
                            h = this.offsetHeight;
                          $(el, {
                            width: w,
                            height: h
                          });
                          $(ig, {
                            width: w,
                            height: h
                          })
                        })
                      })(el);
                      o.paper.defs.appendChild(el);
                      $(node, {
                        fill: "url(#" + el.id + ")"
                      });
                      o.pattern = el;
                      o.pattern && updatePosition(o);
                      break
                    }
                    var clr = R.getRGB(value);
                    if (!clr.error) {
                      delete params.gradient;
                      delete attrs.gradient;
                      !R.is(attrs.opacity, "undefined") && R.is(params.opacity, "undefined") && $(node, {
                        opacity: attrs.opacity
                      });
                      !R.is(attrs["fill-opacity"], "undefined") && R.is(params["fill-opacity"], "undefined") && $(node, {
                        "fill-opacity": attrs["fill-opacity"]
                      })
                    } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                      if ("opacity" in attrs || "fill-opacity" in attrs) {
                        var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                        if (gradient) {
                          var stops = gradient.getElementsByTagName("stop");
                          $(stops[stops.length - 1], {
                            "stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)
                          })
                        }
                      }
                      attrs.gradient = value;
                      attrs.fill = "none";
                      break
                    }
                    clr[has]("opacity") && $(node, {
                      "fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
                    });
                  case "stroke":
                    clr = R.getRGB(value);
                    node.setAttribute(att, clr.hex);
                    att == "stroke" && clr[has]("opacity") && $(node, {
                      "stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
                    });
                    if (att == "stroke" && o._.arrows) {
                      "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                      "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1)
                    }
                    break;
                  case "gradient":
                    (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
                    break;
                  case "opacity":
                    if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                      $(node, {
                        "stroke-opacity": value > 1 ? value / 100 : value
                      })
                    }
                  case "fill-opacity":
                    if (attrs.gradient) {
                      gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                      if (gradient) {
                        stops = gradient.getElementsByTagName("stop");
                        $(stops[stops.length - 1], {
                          "stop-opacity": value
                        })
                      }
                      break
                    }
                  default:
                    att == "font-size" && (value = toInt(value, 10) + "px");
                    var cssrule = att.replace(/(\-.)/g, function(w) {
                      return w.substring(1).toUpperCase()
                    });
                    node.style[cssrule] = value;
                    o._.dirty = 1;
                    node.setAttribute(att, value);
                    break
                }
              }
            }
            tuneText(o, params);
            node.style.visibility = vis
          },
          leading = 1.2,
          tuneText = function(el, params) {
            if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
              return
            }
            var a = el.attrs,
              node = el.node,
              fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;
            if (params[has]("text")) {
              a.text = params.text;
              while (node.firstChild) {
                node.removeChild(node.firstChild)
              }
              var texts = Str(params.text).split("\n"),
                tspans = [],
                tspan;
              for (var i = 0, ii = texts.length; i < ii; i++) {
                tspan = $("tspan");
                i && $(tspan, {
                  dy: fontSize * leading,
                  x: a.x
                });
                tspan.appendChild(R._g.doc.createTextNode(texts[i]));
                node.appendChild(tspan);
                tspans[i] = tspan
              }
            } else {
              tspans = node.getElementsByTagName("tspan");
              for (i = 0, ii = tspans.length; i < ii; i++)
                if (i) {
                  $(tspans[i], {
                    dy: fontSize * leading,
                    x: a.x
                  })
                } else {
                  $(tspans[0], {
                    dy: 0
                  })
                }
            }
            $(node, {
              x: a.x,
              y: a.y
            });
            el._.dirty = 1;
            var bb = el._getBBox(),
              dif = a.y - (bb.y + bb.height / 2);
            dif && R.is(dif, "finite") && $(tspans[0], {
              dy: dif
            })
          },
          getRealNode = function(node) {
            if (node.parentNode && node.parentNode.tagName.toLowerCase() === "a") {
              return node.parentNode
            } else {
              return node
            }
          },
          Element = function(node, svg) {
            var X = 0,
              Y = 0;
            this[0] = this.node = node;
            node.raphael = true;
            this.id = guid();
            node.raphaelid = this.id;

            function guid() {
              return ("0000" + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5)
            }
            this.matrix = R.matrix();
            this.realPath = null;
            this.paper = svg;
            this.attrs = this.attrs || {};
            this._ = {
              transform: [],
              sx: 1,
              sy: 1,
              deg: 0,
              dx: 0,
              dy: 0,
              dirty: 1
            };
            !svg.bottom && (svg.bottom = this);
            this.prev = svg.top;
            svg.top && (svg.top.next = this);
            svg.top = this;
            this.next = null
          },
          elproto = R.el;
        Element.prototype = elproto;
        elproto.constructor = Element;
        R._engine.path = function(pathString, SVG) {
          var el = $("path");
          SVG.canvas && SVG.canvas.appendChild(el);
          var p = new Element(el, SVG);
          p.type = "path";
          setFillAndStroke(p, {
            fill: "none",
            stroke: "#000",
            path: pathString
          });
          return p
        };
        elproto.rotate = function(deg, cx, cy) {
          if (this.removed) {
            return this
          }
          deg = Str(deg).split(separator);
          if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2])
          }
          deg = toFloat(deg[0]);
          cy == null && (cx = cy);
          if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2
          }
          this.transform(this._.transform.concat([
            ["r", deg, cx, cy]
          ]));
          return this
        };
        elproto.scale = function(sx, sy, cx, cy) {
          if (this.removed) {
            return this
          }
          sx = Str(sx).split(separator);
          if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3])
          }
          sx = toFloat(sx[0]);
          sy == null && (sy = sx);
          cy == null && (cx = cy);
          if (cx == null || cy == null) {
            var bbox = this.getBBox(1)
          }
          cx = cx == null ? bbox.x + bbox.width / 2 : cx;
          cy = cy == null ? bbox.y + bbox.height / 2 : cy;
          this.transform(this._.transform.concat([
            ["s", sx, sy, cx, cy]
          ]));
          return this
        };
        elproto.translate = function(dx, dy) {
          if (this.removed) {
            return this
          }
          dx = Str(dx).split(separator);
          if (dx.length - 1) {
            dy = toFloat(dx[1])
          }
          dx = toFloat(dx[0]) || 0;
          dy = +dy || 0;
          this.transform(this._.transform.concat([
            ["t", dx, dy]
          ]));
          return this
        };
        elproto.transform = function(tstr) {
          var _ = this._;
          if (tstr == null) {
            return _.transform
          }
          R._extractTransform(this, tstr);
          this.clip && $(this.clip, {
            transform: this.matrix.invert()
          });
          this.pattern && updatePosition(this);
          this.node && $(this.node, {
            transform: this.matrix
          });
          if (_.sx != 1 || _.sy != 1) {
            var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({
              "stroke-width": sw
            })
          }
          return this
        };
        elproto.hide = function() {
          if (!this.removed) this.node.style.display = "none";
          return this
        };
        elproto.show = function() {
          if (!this.removed) this.node.style.display = "";
          return this
        };
        elproto.remove = function() {
          var node = getRealNode(this.node);
          if (this.removed || !node.parentNode) {
            return
          }
          var paper = this.paper;
          paper.__set__ && paper.__set__.exclude(this);
          eve.unbind("raphael.*.*." + this.id);
          if (this.gradient) {
            paper.defs.removeChild(this.gradient)
          }
          R._tear(this, paper);
          node.parentNode.removeChild(node);
          this.removeData();
          for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
          }
          this.removed = true
        };
        elproto._getBBox = function() {
          if (this.node.style.display == "none") {
            this.show();
            var hide = true
          }
          var canvasHidden = false,
            containerStyle;
          if (this.paper.canvas.parentElement) {
            containerStyle = this.paper.canvas.parentElement.style
          } else if (this.paper.canvas.parentNode) {
            containerStyle = this.paper.canvas.parentNode.style
          }
          if (containerStyle && containerStyle.display == "none") {
            canvasHidden = true;
            containerStyle.display = ""
          }
          var bbox = {};
          try {
            bbox = this.node.getBBox()
          } catch (e) {
            bbox = {
              x: this.node.clientLeft,
              y: this.node.clientTop,
              width: this.node.clientWidth,
              height: this.node.clientHeight
            }
          } finally {
            bbox = bbox || {};
            if (canvasHidden) {
              containerStyle.display = "none"
            }
          }
          hide && this.hide();
          return bbox
        };
        elproto.attr = function(name, value) {
          if (this.removed) {
            return this
          }
          if (name == null) {
            var res = {};
            for (var a in this.attrs)
              if (this.attrs[has](a)) {
                res[a] = this.attrs[a]
              } res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res
          }
          if (value == null && R.is(name, "string")) {
            if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
              return this.attrs.gradient
            }
            if (name == "transform") {
              return this._.transform
            }
            var names = name.split(separator),
              out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
              name = names[i];
              if (name in this.attrs) {
                out[name] = this.attrs[name]
              } else if (R.is(this.paper.customAttributes[name], "function")) {
                out[name] = this.paper.customAttributes[name].def
              } else {
                out[name] = R._availableAttrs[name]
              }
            }
            return ii - 1 ? out : out[names[0]]
          }
          if (value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
              out[name[i]] = this.attr(name[i])
            }
            return out
          }
          if (value != null) {
            var params = {};
            params[name] = value
          } else if (name != null && R.is(name, "object")) {
            params = name
          }
          for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key])
          }
          for (key in this.paper.customAttributes)
            if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
              var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
              this.attrs[key] = params[key];
              for (var subkey in par)
                if (par[has](subkey)) {
                  params[subkey] = par[subkey]
                }
            } setFillAndStroke(this, params);
          return this
        };
        elproto.toFront = function() {
          if (this.removed) {
            return this
          }
          var node = getRealNode(this.node);
          node.parentNode.appendChild(node);
          var svg = this.paper;
          svg.top != this && R._tofront(this, svg);
          return this
        };
        elproto.toBack = function() {
          if (this.removed) {
            return this
          }
          var node = getRealNode(this.node);
          var parentNode = node.parentNode;
          parentNode.insertBefore(node, parentNode.firstChild);
          R._toback(this, this.paper);
          var svg = this.paper;
          return this
        };
        elproto.insertAfter = function(element) {
          if (this.removed || !element) {
            return this
          }
          var node = getRealNode(this.node);
          var afterNode = getRealNode(element.node || element[element.length - 1].node);
          if (afterNode.nextSibling) {
            afterNode.parentNode.insertBefore(node, afterNode.nextSibling)
          } else {
            afterNode.parentNode.appendChild(node)
          }
          R._insertafter(this, element, this.paper);
          return this
        };
        elproto.insertBefore = function(element) {
          if (this.removed || !element) {
            return this
          }
          var node = getRealNode(this.node);
          var beforeNode = getRealNode(element.node || element[0].node);
          beforeNode.parentNode.insertBefore(node, beforeNode);
          R._insertbefore(this, element, this.paper);
          return this
        };
        elproto.blur = function(size) {
          var t = this;
          if (+size !== 0) {
            var fltr = $("filter"),
              blur = $("feGaussianBlur");
            t.attrs.blur = size;
            fltr.id = R.createUUID();
            $(blur, {
              stdDeviation: +size || 1.5
            });
            fltr.appendChild(blur);
            t.paper.defs.appendChild(fltr);
            t._blur = fltr;
            $(t.node, {
              filter: "url(#" + fltr.id + ")"
            })
          } else {
            if (t._blur) {
              t._blur.parentNode.removeChild(t._blur);
              delete t._blur;
              delete t.attrs.blur
            }
            t.node.removeAttribute("filter")
          }
          return t
        };
        R._engine.circle = function(svg, x, y, r) {
          var el = $("circle");
          svg.canvas && svg.canvas.appendChild(el);
          var res = new Element(el, svg);
          res.attrs = {
            cx: x,
            cy: y,
            r: r,
            fill: "none",
            stroke: "#000"
          };
          res.type = "circle";
          $(el, res.attrs);
          return res
        };
        R._engine.rect = function(svg, x, y, w, h, r) {
          var el = $("rect");
          svg.canvas && svg.canvas.appendChild(el);
          var res = new Element(el, svg);
          res.attrs = {
            x: x,
            y: y,
            width: w,
            height: h,
            rx: r || 0,
            ry: r || 0,
            fill: "none",
            stroke: "#000"
          };
          res.type = "rect";
          $(el, res.attrs);
          return res
        };
        R._engine.ellipse = function(svg, x, y, rx, ry) {
          var el = $("ellipse");
          svg.canvas && svg.canvas.appendChild(el);
          var res = new Element(el, svg);
          res.attrs = {
            cx: x,
            cy: y,
            rx: rx,
            ry: ry,
            fill: "none",
            stroke: "#000"
          };
          res.type = "ellipse";
          $(el, res.attrs);
          return res
        };
        R._engine.image = function(svg, src, x, y, w, h) {
          var el = $("image");
          $(el, {
            x: x,
            y: y,
            width: w,
            height: h,
            preserveAspectRatio: "none"
          });
          el.setAttributeNS(xlink, "href", src);
          svg.canvas && svg.canvas.appendChild(el);
          var res = new Element(el, svg);
          res.attrs = {
            x: x,
            y: y,
            width: w,
            height: h,
            src: src
          };
          res.type = "image";
          return res
        };
        R._engine.text = function(svg, x, y, text) {
          var el = $("text");
          svg.canvas && svg.canvas.appendChild(el);
          var res = new Element(el, svg);
          res.attrs = {
            x: x,
            y: y,
            "text-anchor": "middle",
            text: text,
            "font-family": R._availableAttrs["font-family"],
            "font-size": R._availableAttrs["font-size"],
            stroke: "none",
            fill: "#000"
          };
          res.type = "text";
          setFillAndStroke(res, res.attrs);
          return res
        };
        R._engine.setSize = function(width, height) {
          this.width = width || this.width;
          this.height = height || this.height;
          this.canvas.setAttribute("width", this.width);
          this.canvas.setAttribute("height", this.height);
          if (this._viewBox) {
            this.setViewBox.apply(this, this._viewBox)
          }
          return this
        };
        R._engine.create = function() {
          var con = R._getContainer.apply(0, arguments),
            container = con && con.container;
          if (!container) {
            throw new Error("SVG container not found.")
          }
          var x = con.x,
            y = con.y,
            width = con.width,
            height = con.height,
            cnvs = $("svg"),
            css = "overflow:hidden;",
            isFloating;
          x = x || 0;
          y = y || 0;
          width = width || 512;
          height = height || 342;
          $(cnvs, {
            height: height,
            version: 1.1,
            width: width,
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          });
          if (container == 1) {
            cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
            R._g.doc.body.appendChild(cnvs);
            isFloating = 1
          } else {
            cnvs.style.cssText = css + "position:relative";
            if (container.firstChild) {
              container.insertBefore(cnvs, container.firstChild)
            } else {
              container.appendChild(cnvs)
            }
          }
          container = new R._Paper;
          container.width = width;
          container.height = height;
          container.canvas = cnvs;
          container.clear();
          container._left = container._top = 0;
          isFloating && (container.renderfix = function() {});
          container.renderfix();
          return container
        };
        R._engine.setViewBox = function(x, y, w, h, fit) {
          eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
          var paperSize = this.getSize(),
            size = mmax(w / paperSize.width, h / paperSize.height),
            top = this.top,
            aspectRatio = fit ? "xMidYMid meet" : "xMinYMin",
            vb, sw;
          if (x == null) {
            if (this._vbSize) {
              size = 1
            }
            delete this._vbSize;
            vb = "0 0 " + this.width + S + this.height
          } else {
            this._vbSize = size;
            vb = x + S + y + S + w + S + h
          }
          $(this.canvas, {
            viewBox: vb,
            preserveAspectRatio: aspectRatio
          });
          while (size && top) {
            sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
            top.attr({
              "stroke-width": sw
            });
            top._.dirty = 1;
            top._.dirtyT = 1;
            top = top.prev
          }
          this._viewBox = [x, y, w, h, !!fit];
          return this
        };
        R.prototype.renderfix = function() {
          var cnvs = this.canvas,
            s = cnvs.style,
            pos;
          try {
            pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix()
          } catch (e) {
            pos = cnvs.createSVGMatrix()
          }
          var left = -pos.e % 1,
            top = -pos.f % 1;
          if (left || top) {
            if (left) {
              this._left = (this._left + left) % 1;
              s.left = this._left + "px"
            }
            if (top) {
              this._top = (this._top + top) % 1;
              s.top = this._top + "px"
            }
          }
        };
        R.prototype.clear = function() {
          R.eve("raphael.clear", this);
          var c = this.canvas;
          while (c.firstChild) {
            c.removeChild(c.firstChild)
          }
          this.bottom = this.top = null;
          (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Raphaël " + R.version));
          c.appendChild(this.desc);
          c.appendChild(this.defs = $("defs"))
        };
        R.prototype.remove = function() {
          eve("raphael.remove", this);
          this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
          for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
          }
        };
        var setproto = R.st;
        for (var method in elproto)
          if (elproto[has](method) && !setproto[has](method)) {
            setproto[method] = function(methodname) {
              return function() {
                var arg = arguments;
                return this.forEach(function(el) {
                  el[methodname].apply(el, arg)
                })
              }
            }(method)
          }
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    },
    "./dev/raphael.vml.js": function(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./dev/raphael.core.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function(R) {
        if (R && !R.vml) {
          return
        }
        var has = "hasOwnProperty",
          Str = String,
          toFloat = parseFloat,
          math = Math,
          round = math.round,
          mmax = math.max,
          mmin = math.min,
          abs = math.abs,
          fillString = "fill",
          separator = /[, ]+/,
          eve = R.eve,
          ms = " progid:DXImageTransform.Microsoft",
          S = " ",
          E = "",
          map = {
            M: "m",
            L: "l",
            C: "c",
            Z: "x",
            m: "t",
            l: "r",
            c: "v",
            z: "x"
          },
          bites = /([clmz]),?([^clmz]*)/gi,
          blurregexp = / progid:\S+Blur\([^\)]+\)/g,
          val = /-?[^,\s-]+/g,
          cssDot = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",
          zoom = 21600,
          pathTypes = {
            path: 1,
            rect: 1,
            image: 1
          },
          ovalTypes = {
            circle: 1,
            ellipse: 1
          },
          path2vml = function(path) {
            var total = /[ahqstv]/gi,
              command = R._pathToAbsolute;
            Str(path).match(total) && (command = R._path2curve);
            total = /[clmz]/g;
            if (command == R._pathToAbsolute && !Str(path).match(total)) {
              var res = Str(path).replace(bites, function(all, command, args) {
                var vals = [],
                  isMove = command.toLowerCase() == "m",
                  res = map[command];
                args.replace(val, function(value) {
                  if (isMove && vals.length == 2) {
                    res += vals + map[command == "m" ? "l" : "L"];
                    vals = []
                  }
                  vals.push(round(value * zoom))
                });
                return res + vals
              });
              return res
            }
            var pa = command(path),
              p, r;
            res = [];
            for (var i = 0, ii = pa.length; i < ii; i++) {
              p = pa[i];
              r = pa[i][0].toLowerCase();
              r == "z" && (r = "x");
              for (var j = 1, jj = p.length; j < jj; j++) {
                r += round(p[j] * zoom) + (j != jj - 1 ? "," : E)
              }
              res.push(r)
            }
            return res.join(S)
          },
          compensation = function(deg, dx, dy) {
            var m = R.matrix();
            m.rotate(-deg, .5, .5);
            return {
              dx: m.x(dx, dy),
              dy: m.y(dx, dy)
            }
          },
          setCoords = function(p, sx, sy, dx, dy, deg) {
            var _ = p._,
              m = p.matrix,
              fillpos = _.fillpos,
              o = p.node,
              s = o.style,
              y = 1,
              flip = "",
              dxdy, kx = zoom / sx,
              ky = zoom / sy;
            s.visibility = "hidden";
            if (!sx || !sy) {
              return
            }
            o.coordsize = abs(kx) + S + abs(ky);
            s.rotation = deg * (sx * sy < 0 ? -1 : 1);
            if (deg) {
              var c = compensation(deg, dx, dy);
              dx = c.dx;
              dy = c.dy
            }
            sx < 0 && (flip += "x");
            sy < 0 && (flip += " y") && (y = -1);
            s.flip = flip;
            o.coordorigin = dx * -kx + S + dy * -ky;
            if (fillpos || _.fillsize) {
              var fill = o.getElementsByTagName(fillString);
              fill = fill && fill[0];
              o.removeChild(fill);
              if (fillpos) {
                c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
                fill.position = c.dx * y + S + c.dy * y
              }
              if (_.fillsize) {
                fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy)
              }
              o.appendChild(fill)
            }
            s.visibility = "visible"
          };
        R.toString = function() {
          return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
        };
        var addArrow = function(o, value, isEnd) {
            var values = Str(value).toLowerCase().split("-"),
              se = isEnd ? "end" : "start",
              i = values.length,
              type = "classic",
              w = "medium",
              h = "medium";
            while (i--) {
              switch (values[i]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                  type = values[i];
                  break;
                case "wide":
                case "narrow":
                  h = values[i];
                  break;
                case "long":
                case "short":
                  w = values[i];
                  break
              }
            }
            var stroke = o.node.getElementsByTagName("stroke")[0];
            stroke[se + "arrow"] = type;
            stroke[se + "arrowlength"] = w;
            stroke[se + "arrowwidth"] = h
          },
          setFillAndStroke = function(o, params) {
            o.attrs = o.attrs || {};
            var node = o.node,
              a = o.attrs,
              s = node.style,
              xy, newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
              isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
              res = o;
            for (var par in params)
              if (params[has](par)) {
                a[par] = params[par]
              } if (newpath) {
              a.path = R._getPath[o.type](o);
              o._.dirty = 1
            }
            params.href && (node.href = params.href);
            params.title && (node.title = params.title);
            params.target && (node.target = params.target);
            params.cursor && (s.cursor = params.cursor);
            "blur" in params && o.blur(params.blur);
            if (params.path && o.type == "path" || newpath) {
              node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
              o._.dirty = 1;
              if (o.type == "image") {
                o._.fillpos = [a.x, a.y];
                o._.fillsize = [a.width, a.height];
                setCoords(o, 1, 1, 0, 0, 0)
              }
            }
            "transform" in params && o.transform(params.transform);
            if (isOval) {
              var cx = +a.cx,
                cy = +a.cy,
                rx = +a.rx || +a.r || 0,
                ry = +a.ry || +a.r || 0;
              node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
              o._.dirty = 1
            }
            if ("clip-rect" in params) {
              var rect = Str(params["clip-rect"]).split(separator);
              if (rect.length == 4) {
                rect[2] = +rect[2] + +rect[0];
                rect[3] = +rect[3] + +rect[1];
                var div = node.clipRect || R._g.doc.createElement("div"),
                  dstyle = div.style;
                dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
                if (!node.clipRect) {
                  dstyle.position = "absolute";
                  dstyle.top = 0;
                  dstyle.left = 0;
                  dstyle.width = o.paper.width + "px";
                  dstyle.height = o.paper.height + "px";
                  node.parentNode.insertBefore(div, node);
                  div.appendChild(node);
                  node.clipRect = div
                }
              }
              if (!params["clip-rect"]) {
                node.clipRect && (node.clipRect.style.clip = "auto")
              }
            }
            if (o.textpath) {
              var textpathStyle = o.textpath.style;
              params.font && (textpathStyle.font = params.font);
              params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
              params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
              params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
              params["font-style"] && (textpathStyle.fontStyle = params["font-style"])
            }
            if ("arrow-start" in params) {
              addArrow(res, params["arrow-start"])
            }
            if ("arrow-end" in params) {
              addArrow(res, params["arrow-end"], 1)
            }
            if (params.opacity != null || params.fill != null || params.src != null || params.stroke != null || params["stroke-width"] != null || params["stroke-opacity"] != null || params["fill-opacity"] != null || params["stroke-dasharray"] != null || params["stroke-miterlimit"] != null || params["stroke-linejoin"] != null || params["stroke-linecap"] != null) {
              var fill = node.getElementsByTagName(fillString),
                newfill = false;
              fill = fill && fill[0];
              !fill && (newfill = fill = createNode(fillString));
              if (o.type == "image" && params.src) {
                fill.src = params.src
              }
              params.fill && (fill.on = true);
              if (fill.on == null || params.fill == "none" || params.fill === null) {
                fill.on = false
              }
              if (fill.on && params.fill) {
                var isURL = Str(params.fill).match(R._ISURL);
                if (isURL) {
                  fill.parentNode == node && node.removeChild(fill);
                  fill.rotate = true;
                  fill.src = isURL[1];
                  fill.type = "tile";
                  var bbox = o.getBBox(1);
                  fill.position = bbox.x + S + bbox.y;
                  o._.fillpos = [bbox.x, bbox.y];
                  R._preload(isURL[1], function() {
                    o._.fillsize = [this.offsetWidth, this.offsetHeight]
                  })
                } else {
                  fill.color = R.getRGB(params.fill).hex;
                  fill.src = E;
                  fill.type = "solid";
                  if (R.getRGB(params.fill).error && (res.type in {
                      circle: 1,
                      ellipse: 1
                    } || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
                    a.fill = "none";
                    a.gradient = params.fill;
                    fill.rotate = false
                  }
                }
              }
              if ("fill-opacity" in params || "opacity" in params) {
                var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
                opacity = mmin(mmax(opacity, 0), 1);
                fill.opacity = opacity;
                if (fill.src) {
                  fill.color = "none"
                }
              }
              node.appendChild(fill);
              var stroke = node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0],
                newstroke = false;
              !stroke && (newstroke = stroke = createNode("stroke"));
              if (params.stroke && params.stroke != "none" || params["stroke-width"] || params["stroke-opacity"] != null || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
                stroke.on = true
              }(params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
              var strokeColor = R.getRGB(params.stroke);
              stroke.on && params.stroke && (stroke.color = strokeColor.hex);
              opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
              var width = (toFloat(params["stroke-width"]) || 1) * .75;
              opacity = mmin(mmax(opacity, 0), 1);
              params["stroke-width"] == null && (width = a["stroke-width"]);
              params["stroke-width"] && (stroke.weight = width);
              width && width < 1 && (opacity *= width) && (stroke.weight = 1);
              stroke.opacity = opacity;
              params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
              stroke.miterlimit = params["stroke-miterlimit"] || 8;
              params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
              if ("stroke-dasharray" in params) {
                var dasharray = {
                  "-": "shortdash",
                  ".": "shortdot",
                  "-.": "shortdashdot",
                  "-..": "shortdashdotdot",
                  ". ": "dot",
                  "- ": "dash",
                  "--": "longdash",
                  "- .": "dashdot",
                  "--.": "longdashdot",
                  "--..": "longdashdotdot"
                };
                stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E
              }
              newstroke && node.appendChild(stroke)
            }
            if (res.type == "text") {
              res.paper.canvas.style.display = E;
              var span = res.paper.span,
                m = 100,
                fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
              s = span.style;
              a.font && (s.font = a.font);
              a["font-family"] && (s.fontFamily = a["font-family"]);
              a["font-weight"] && (s.fontWeight = a["font-weight"]);
              a["font-style"] && (s.fontStyle = a["font-style"]);
              fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
              s.fontSize = fontSize * m + "px";
              res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
              var brect = span.getBoundingClientRect();
              res.W = a.w = (brect.right - brect.left) / m;
              res.H = a.h = (brect.bottom - brect.top) / m;
              res.X = a.x;
              res.Y = a.y + res.H / 2;
              ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
              var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
              for (var d = 0, dd = dirtyattrs.length; d < dd; d++)
                if (dirtyattrs[d] in params) {
                  res._.dirty = 1;
                  break
                } switch (a["text-anchor"]) {
                case "start":
                  res.textpath.style["v-text-align"] = "left";
                  res.bbx = res.W / 2;
                  break;
                case "end":
                  res.textpath.style["v-text-align"] = "right";
                  res.bbx = -res.W / 2;
                  break;
                default:
                  res.textpath.style["v-text-align"] = "center";
                  res.bbx = 0;
                  break
              }
              res.textpath.style["v-text-kern"] = true
            }
          },
          addGradientFill = function(o, gradient, fill) {
            o.attrs = o.attrs || {};
            var attrs = o.attrs,
              pow = Math.pow,
              opacity, oindex, type = "linear",
              fxfy = ".5 .5";
            o.attrs.gradient = gradient;
            gradient = Str(gradient).replace(R._radial_gradient, function(all, fx, fy) {
              type = "radial";
              if (fx && fy) {
                fx = toFloat(fx);
                fy = toFloat(fy);
                pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                fxfy = fx + S + fy
              }
              return E
            });
            gradient = gradient.split(/\s*\-\s*/);
            if (type == "linear") {
              var angle = gradient.shift();
              angle = -toFloat(angle);
              if (isNaN(angle)) {
                return null
              }
            }
            var dots = R._parseDots(gradient);
            if (!dots) {
              return null
            }
            o = o.shape || o.node;
            if (dots.length) {
              o.removeChild(fill);
              fill.on = true;
              fill.method = "none";
              fill.color = dots[0].color;
              fill.color2 = dots[dots.length - 1].color;
              var clrs = [];
              for (var i = 0, ii = dots.length; i < ii; i++) {
                dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color)
              }
              fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
              if (type == "radial") {
                fill.type = "gradientTitle";
                fill.focus = "100%";
                fill.focussize = "0 0";
                fill.focusposition = fxfy;
                fill.angle = 0
              } else {
                fill.type = "gradient";
                fill.angle = (270 - angle) % 360
              }
              o.appendChild(fill)
            }
            return 1
          },
          Element = function(node, vml) {
            this[0] = this.node = node;
            node.raphael = true;
            this.id = R._oid++;
            node.raphaelid = this.id;
            this.X = 0;
            this.Y = 0;
            this.attrs = {};
            this.paper = vml;
            this.matrix = R.matrix();
            this._ = {
              transform: [],
              sx: 1,
              sy: 1,
              dx: 0,
              dy: 0,
              deg: 0,
              dirty: 1,
              dirtyT: 1
            };
            !vml.bottom && (vml.bottom = this);
            this.prev = vml.top;
            vml.top && (vml.top.next = this);
            vml.top = this;
            this.next = null
          };
        var elproto = R.el;
        Element.prototype = elproto;
        elproto.constructor = Element;
        elproto.transform = function(tstr) {
          if (tstr == null) {
            return this._.transform
          }
          var vbs = this.paper._viewBoxShift,
            vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
            oldt;
          if (vbs) {
            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E)
          }
          R._extractTransform(this, vbt + tstr);
          var matrix = this.matrix.clone(),
            skew = this.skew,
            o = this.node,
            split, isGrad = ~Str(this.attrs.fill).indexOf("-"),
            isPatt = !Str(this.attrs.fill).indexOf("url(");
          matrix.translate(1, 1);
          if (isPatt || isGrad || this.type == "image") {
            skew.matrix = "1 0 0 1";
            skew.offset = "0 0";
            split = matrix.split();
            if (isGrad && split.noRotation || !split.isSimple) {
              o.style.filter = matrix.toFilter();
              var bb = this.getBBox(),
                bbt = this.getBBox(1),
                dx = bb.x - bbt.x,
                dy = bb.y - bbt.y;
              o.coordorigin = dx * -zoom + S + dy * -zoom;
              setCoords(this, 1, 1, dx, dy, 0)
            } else {
              o.style.filter = E;
              setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate)
            }
          } else {
            o.style.filter = E;
            skew.matrix = Str(matrix);
            skew.offset = matrix.offset()
          }
          if (oldt !== null) {
            this._.transform = oldt;
            R._extractTransform(this, oldt)
          }
          return this
        };
        elproto.rotate = function(deg, cx, cy) {
          if (this.removed) {
            return this
          }
          if (deg == null) {
            return
          }
          deg = Str(deg).split(separator);
          if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2])
          }
          deg = toFloat(deg[0]);
          cy == null && (cx = cy);
          if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2
          }
          this._.dirtyT = 1;
          this.transform(this._.transform.concat([
            ["r", deg, cx, cy]
          ]));
          return this
        };
        elproto.translate = function(dx, dy) {
          if (this.removed) {
            return this
          }
          dx = Str(dx).split(separator);
          if (dx.length - 1) {
            dy = toFloat(dx[1])
          }
          dx = toFloat(dx[0]) || 0;
          dy = +dy || 0;
          if (this._.bbox) {
            this._.bbox.x += dx;
            this._.bbox.y += dy
          }
          this.transform(this._.transform.concat([
            ["t", dx, dy]
          ]));
          return this
        };
        elproto.scale = function(sx, sy, cx, cy) {
          if (this.removed) {
            return this
          }
          sx = Str(sx).split(separator);
          if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
            isNaN(cx) && (cx = null);
            isNaN(cy) && (cy = null)
          }
          sx = toFloat(sx[0]);
          sy == null && (sy = sx);
          cy == null && (cx = cy);
          if (cx == null || cy == null) {
            var bbox = this.getBBox(1)
          }
          cx = cx == null ? bbox.x + bbox.width / 2 : cx;
          cy = cy == null ? bbox.y + bbox.height / 2 : cy;
          this.transform(this._.transform.concat([
            ["s", sx, sy, cx, cy]
          ]));
          this._.dirtyT = 1;
          return this
        };
        elproto.hide = function() {
          !this.removed && (this.node.style.display = "none");
          return this
        };
        elproto.show = function() {
          !this.removed && (this.node.style.display = E);
          return this
        };
        elproto.auxGetBBox = R.el.getBBox;
        elproto.getBBox = function() {
          var b = this.auxGetBBox();
          if (this.paper && this.paper._viewBoxShift) {
            var c = {};
            var z = 1 / this.paper._viewBoxShift.scale;
            c.x = b.x - this.paper._viewBoxShift.dx;
            c.x *= z;
            c.y = b.y - this.paper._viewBoxShift.dy;
            c.y *= z;
            c.width = b.width * z;
            c.height = b.height * z;
            c.x2 = c.x + c.width;
            c.y2 = c.y + c.height;
            return c
          }
          return b
        };
        elproto._getBBox = function() {
          if (this.removed) {
            return {}
          }
          return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
          }
        };
        elproto.remove = function() {
          if (this.removed || !this.node.parentNode) {
            return
          }
          this.paper.__set__ && this.paper.__set__.exclude(this);
          R.eve.unbind("raphael.*.*." + this.id);
          R._tear(this, this.paper);
          this.node.parentNode.removeChild(this.node);
          this.shape && this.shape.parentNode.removeChild(this.shape);
          for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
          }
          this.removed = true
        };
        elproto.attr = function(name, value) {
          if (this.removed) {
            return this
          }
          if (name == null) {
            var res = {};
            for (var a in this.attrs)
              if (this.attrs[has](a)) {
                res[a] = this.attrs[a]
              } res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res
          }
          if (value == null && R.is(name, "string")) {
            if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
              return this.attrs.gradient
            }
            var names = name.split(separator),
              out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
              name = names[i];
              if (name in this.attrs) {
                out[name] = this.attrs[name]
              } else if (R.is(this.paper.customAttributes[name], "function")) {
                out[name] = this.paper.customAttributes[name].def
              } else {
                out[name] = R._availableAttrs[name]
              }
            }
            return ii - 1 ? out : out[names[0]]
          }
          if (this.attrs && value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
              out[name[i]] = this.attr(name[i])
            }
            return out
          }
          var params;
          if (value != null) {
            params = {};
            params[name] = value
          }
          value == null && R.is(name, "object") && (params = name);
          for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key])
          }
          if (params) {
            for (key in this.paper.customAttributes)
              if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
                this.attrs[key] = params[key];
                for (var subkey in par)
                  if (par[has](subkey)) {
                    params[subkey] = par[subkey]
                  }
              } if (params.text && this.type == "text") {
              this.textpath.string = params.text
            }
            setFillAndStroke(this, params)
          }
          return this
        };
        elproto.toFront = function() {
          !this.removed && this.node.parentNode.appendChild(this.node);
          this.paper && this.paper.top != this && R._tofront(this, this.paper);
          return this
        };
        elproto.toBack = function() {
          if (this.removed) {
            return this
          }
          if (this.node.parentNode.firstChild != this.node) {
            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            R._toback(this, this.paper)
          }
          return this
        };
        elproto.insertAfter = function(element) {
          if (this.removed) {
            return this
          }
          if (element.constructor == R.st.constructor) {
            element = element[element.length - 1]
          }
          if (element.node.nextSibling) {
            element.node.parentNode.insertBefore(this.node, element.node.nextSibling)
          } else {
            element.node.parentNode.appendChild(this.node)
          }
          R._insertafter(this, element, this.paper);
          return this
        };
        elproto.insertBefore = function(element) {
          if (this.removed) {
            return this
          }
          if (element.constructor == R.st.constructor) {
            element = element[0]
          }
          element.node.parentNode.insertBefore(this.node, element.node);
          R._insertbefore(this, element, this.paper);
          return this
        };
        elproto.blur = function(size) {
          var s = this.node.runtimeStyle,
            f = s.filter;
          f = f.replace(blurregexp, E);
          if (+size !== 0) {
            this.attrs.blur = size;
            s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
            s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5))
          } else {
            s.filter = f;
            s.margin = 0;
            delete this.attrs.blur
          }
          return this
        };
        R._engine.path = function(pathString, vml) {
          var el = createNode("shape");
          el.style.cssText = cssDot;
          el.coordsize = zoom + S + zoom;
          el.coordorigin = vml.coordorigin;
          var p = new Element(el, vml),
            attr = {
              fill: "none",
              stroke: "#000"
            };
          pathString && (attr.path = pathString);
          p.type = "path";
          p.path = [];
          p.Path = E;
          setFillAndStroke(p, attr);
          vml.canvas && vml.canvas.appendChild(el);
          var skew = createNode("skew");
          skew.on = true;
          el.appendChild(skew);
          p.skew = skew;
          p.transform(E);
          return p
        };
        R._engine.rect = function(vml, x, y, w, h, r) {
          var path = R._rectPath(x, y, w, h, r),
            res = vml.path(path),
            a = res.attrs;
          res.X = a.x = x;
          res.Y = a.y = y;
          res.W = a.width = w;
          res.H = a.height = h;
          a.r = r;
          a.path = path;
          res.type = "rect";
          return res
        };
        R._engine.ellipse = function(vml, x, y, rx, ry) {
          var res = vml.path(),
            a = res.attrs;
          res.X = x - rx;
          res.Y = y - ry;
          res.W = rx * 2;
          res.H = ry * 2;
          res.type = "ellipse";
          setFillAndStroke(res, {
            cx: x,
            cy: y,
            rx: rx,
            ry: ry
          });
          return res
        };
        R._engine.circle = function(vml, x, y, r) {
          var res = vml.path(),
            a = res.attrs;
          res.X = x - r;
          res.Y = y - r;
          res.W = res.H = r * 2;
          res.type = "circle";
          setFillAndStroke(res, {
            cx: x,
            cy: y,
            r: r
          });
          return res
        };
        R._engine.image = function(vml, src, x, y, w, h) {
          var path = R._rectPath(x, y, w, h),
            res = vml.path(path).attr({
              stroke: "none"
            }),
            a = res.attrs,
            node = res.node,
            fill = node.getElementsByTagName(fillString)[0];
          a.src = src;
          res.X = a.x = x;
          res.Y = a.y = y;
          res.W = a.width = w;
          res.H = a.height = h;
          a.path = path;
          res.type = "image";
          fill.parentNode == node && node.removeChild(fill);
          fill.rotate = true;
          fill.src = src;
          fill.type = "tile";
          res._.fillpos = [x, y];
          res._.fillsize = [w, h];
          node.appendChild(fill);
          setCoords(res, 1, 1, 0, 0, 0);
          return res
        };
        R._engine.text = function(vml, x, y, text) {
          var el = createNode("shape"),
            path = createNode("path"),
            o = createNode("textpath");
          x = x || 0;
          y = y || 0;
          text = text || "";
          path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
          path.textpathok = true;
          o.string = Str(text);
          o.on = true;
          el.style.cssText = cssDot;
          el.coordsize = zoom + S + zoom;
          el.coordorigin = "0 0";
          var p = new Element(el, vml),
            attr = {
              fill: "#000",
              stroke: "none",
              font: R._availableAttrs.font,
              text: text
            };
          p.shape = el;
          p.path = path;
          p.textpath = o;
          p.type = "text";
          p.attrs.text = Str(text);
          p.attrs.x = x;
          p.attrs.y = y;
          p.attrs.w = 1;
          p.attrs.h = 1;
          setFillAndStroke(p, attr);
          el.appendChild(o);
          el.appendChild(path);
          vml.canvas.appendChild(el);
          var skew = createNode("skew");
          skew.on = true;
          el.appendChild(skew);
          p.skew = skew;
          p.transform(E);
          return p
        };
        R._engine.setSize = function(width, height) {
          var cs = this.canvas.style;
          this.width = width;
          this.height = height;
          width == +width && (width += "px");
          height == +height && (height += "px");
          cs.width = width;
          cs.height = height;
          cs.clip = "rect(0 " + width + " " + height + " 0)";
          if (this._viewBox) {
            R._engine.setViewBox.apply(this, this._viewBox)
          }
          return this
        };
        R._engine.setViewBox = function(x, y, w, h, fit) {
          R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
          var paperSize = this.getSize(),
            width = paperSize.width,
            height = paperSize.height,
            H, W;
          if (fit) {
            H = height / h;
            W = width / w;
            if (w * H < width) {
              x -= (width - w * H) / 2 / H
            }
            if (h * W < height) {
              y -= (height - h * W) / 2 / W
            }
          }
          this._viewBox = [x, y, w, h, !!fit];
          this._viewBoxShift = {
            dx: -x,
            dy: -y,
            scale: paperSize
          };
          this.forEach(function(el) {
            el.transform("...")
          });
          return this
        };
        var createNode;
        R._engine.initWin = function(win) {
          var doc = win.document;
          if (doc.styleSheets.length < 31) {
            doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)")
          } else {
            doc.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)")
          }
          try {
            !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            createNode = function(tagName) {
              return doc.createElement("<rvml:" + tagName + ' class="rvml">')
            }
          } catch (e) {
            createNode = function(tagName) {
              return doc.createElement("<" + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
          }
        };
        R._engine.initWin(R._g.win);
        R._engine.create = function() {
          var con = R._getContainer.apply(0, arguments),
            container = con.container,
            height = con.height,
            s, width = con.width,
            x = con.x,
            y = con.y;
          if (!container) {
            throw new Error("VML container not found.")
          }
          var res = new R._Paper,
            c = res.canvas = R._g.doc.createElement("div"),
            cs = c.style;
          x = x || 0;
          y = y || 0;
          width = width || 512;
          height = height || 342;
          res.width = width;
          res.height = height;
          width == +width && (width += "px");
          height == +height && (height += "px");
          res.coordsize = zoom * 1e3 + S + zoom * 1e3;
          res.coordorigin = "0 0";
          res.span = R._g.doc.createElement("span");
          res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
          c.appendChild(res.span);
          cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
          if (container == 1) {
            R._g.doc.body.appendChild(c);
            cs.left = x + "px";
            cs.top = y + "px";
            cs.position = "absolute"
          } else {
            if (container.firstChild) {
              container.insertBefore(c, container.firstChild)
            } else {
              container.appendChild(c)
            }
          }
          res.renderfix = function() {};
          return res
        };
        R.prototype.clear = function() {
          R.eve("raphael.clear", this);
          this.canvas.innerHTML = E;
          this.span = R._g.doc.createElement("span");
          this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
          this.canvas.appendChild(this.span);
          this.bottom = this.top = null
        };
        R.prototype.remove = function() {
          R.eve("raphael.remove", this);
          this.canvas.parentNode.removeChild(this.canvas);
          for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
          }
          return true
        };
        var setproto = R.st;
        for (var method in elproto)
          if (elproto[has](method) && !setproto[has](method)) {
            setproto[method] = function(methodname) {
              return function() {
                var arg = arguments;
                return this.forEach(function(el) {
                  el[methodname].apply(el, arg)
                })
              }
            }(method)
          }
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    },
    "./node_modules/eve-raphael/eve.js": function(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      (function(glob) {
        var version = "0.5.0",
          has = "hasOwnProperty",
          separator = /[\.\/]/,
          comaseparator = /\s*,\s*/,
          wildcard = "*",
          fun = function() {},
          numsort = function(a, b) {
            return a - b
          },
          current_event, stop, events = {
            n: {}
          },
          firstDefined = function() {
            for (var i = 0, ii = this.length; i < ii; i++) {
              if (typeof this[i] != "undefined") {
                return this[i]
              }
            }
          },
          lastDefined = function() {
            var i = this.length;
            while (--i) {
              if (typeof this[i] != "undefined") {
                return this[i]
              }
            }
          },
          objtos = Object.prototype.toString,
          Str = String,
          isArray = Array.isArray || function(ar) {
            return ar instanceof Array || objtos.call(ar) == "[object Array]"
          };
        var eve = function(name, scope) {
          var e = events,
            oldstop = stop,
            args = Array.prototype.slice.call(arguments, 2),
            listeners = eve.listeners(name),
            z = 0,
            f = false,
            l, indexed = [],
            queue = {},
            out = [],
            ce = current_event,
            errors = [];
          out.firstDefined = firstDefined;
          out.lastDefined = lastDefined;
          current_event = name;
          stop = 0;
          for (var i = 0, ii = listeners.length; i < ii; i++)
            if ("zIndex" in listeners[i]) {
              indexed.push(listeners[i].zIndex);
              if (listeners[i].zIndex < 0) {
                queue[listeners[i].zIndex] = listeners[i]
              }
            } indexed.sort(numsort);
          while (indexed[z] < 0) {
            l = queue[indexed[z++]];
            out.push(l.apply(scope, args));
            if (stop) {
              stop = oldstop;
              return out
            }
          }
          for (i = 0; i < ii; i++) {
            l = listeners[i];
            if ("zIndex" in l) {
              if (l.zIndex == indexed[z]) {
                out.push(l.apply(scope, args));
                if (stop) {
                  break
                }
                do {
                  z++;
                  l = queue[indexed[z]];
                  l && out.push(l.apply(scope, args));
                  if (stop) {
                    break
                  }
                } while (l)
              } else {
                queue[l.zIndex] = l
              }
            } else {
              out.push(l.apply(scope, args));
              if (stop) {
                break
              }
            }
          }
          stop = oldstop;
          current_event = ce;
          return out
        };
        eve._events = events;
        eve.listeners = function(name) {
          var names = isArray(name) ? name : name.split(separator),
            e = events,
            item, items, k, i, ii, j, jj, nes, es = [e],
            out = [];
          for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
              e = es[j].n;
              items = [e[names[i]], e[wildcard]];
              k = 2;
              while (k--) {
                item = items[k];
                if (item) {
                  nes.push(item);
                  out = out.concat(item.f || [])
                }
              }
            }
            es = nes
          }
          return out
        };
        eve.separator = function(sep) {
          if (sep) {
            sep = Str(sep).replace(/(?=[\.\^\]\[\-])/g, "\\");
            sep = "[" + sep + "]";
            separator = new RegExp(sep)
          } else {
            separator = /[\.\/]/
          }
        };
        eve.on = function(name, f) {
          if (typeof f != "function") {
            return function() {}
          }
          var names = isArray(name) ? isArray(name[0]) ? name : [name] : Str(name).split(comaseparator);
          for (var i = 0, ii = names.length; i < ii; i++) {
            (function(name) {
              var names = isArray(name) ? name : Str(name).split(separator),
                e = events,
                exist;
              for (var i = 0, ii = names.length; i < ii; i++) {
                e = e.n;
                e = e.hasOwnProperty(names[i]) && e[names[i]] || (e[names[i]] = {
                  n: {}
                })
              }
              e.f = e.f || [];
              for (i = 0, ii = e.f.length; i < ii; i++)
                if (e.f[i] == f) {
                  exist = true;
                  break
                }! exist && e.f.push(f)
            })(names[i])
          }
          return function(zIndex) {
            if (+zIndex == +zIndex) {
              f.zIndex = +zIndex
            }
          }
        };
        eve.f = function(event) {
          var attrs = [].slice.call(arguments, 1);
          return function() {
            eve.apply(null, [event, null].concat(attrs).concat([].slice.call(arguments, 0)))
          }
        };
        eve.stop = function() {
          stop = 1
        };
        eve.nt = function(subname) {
          var cur = isArray(current_event) ? current_event.join(".") : current_event;
          if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(cur)
          }
          return cur
        };
        eve.nts = function() {
          return isArray(current_event) ? current_event : current_event.split(separator)
        };
        eve.off = eve.unbind = function(name, f) {
          if (!name) {
            eve._events = events = {
              n: {}
            };
            return
          }
          var names = isArray(name) ? isArray(name[0]) ? name : [name] : Str(name).split(comaseparator);
          if (names.length > 1) {
            for (var i = 0, ii = names.length; i < ii; i++) {
              eve.off(names[i], f)
            }
            return
          }
          names = isArray(name) ? name : Str(name).split(separator);
          var e, key, splice, i, ii, j, jj, cur = [events];
          for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
              splice = [j, 1];
              e = cur[j].n;
              if (names[i] != wildcard) {
                if (e[names[i]]) {
                  splice.push(e[names[i]])
                }
              } else {
                for (key in e)
                  if (e[has](key)) {
                    splice.push(e[key])
                  }
              }
              cur.splice.apply(cur, splice)
            }
          }
          for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
              if (f) {
                if (e.f) {
                  for (j = 0, jj = e.f.length; j < jj; j++)
                    if (e.f[j] == f) {
                      e.f.splice(j, 1);
                      break
                    }! e.f.length && delete e.f
                }
                for (key in e.n)
                  if (e.n[has](key) && e.n[key].f) {
                    var funcs = e.n[key].f;
                    for (j = 0, jj = funcs.length; j < jj; j++)
                      if (funcs[j] == f) {
                        funcs.splice(j, 1);
                        break
                      }! funcs.length && delete e.n[key].f
                  }
              } else {
                delete e.f;
                for (key in e.n)
                  if (e.n[has](key) && e.n[key].f) {
                    delete e.n[key].f
                  }
              }
              e = e.n
            }
          }
        };
        eve.once = function(name, f) {
          var f2 = function() {
            eve.off(name, f2);
            return f.apply(this, arguments)
          };
          return eve.on(name, f2)
        };
        eve.version = version;
        eve.toString = function() {
          return "You are running Eve " + version
        };
        true && module.exports ? module.exports = eve : true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
          return eve
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined
      })(this)
    }
  })
});
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object") module.exports = factory();
  else if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof exports === "object") exports["Handlebars"] = factory();
  else root["Handlebars"] = factory()
})(this, function() {
  return function(modules) {
    var installedModules = {};

    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) return installedModules[moduleId].exports;
      var module = installedModules[moduleId] = {
        exports: {},
        id: moduleId,
        loaded: false
      };
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      module.loaded = true;
      return module.exports
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0)
  }([function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    var _handlebarsRuntime = __webpack_require__(2);
    var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);
    var _handlebarsCompilerAst = __webpack_require__(45);
    var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);
    var _handlebarsCompilerBase = __webpack_require__(46);
    var _handlebarsCompilerCompiler = __webpack_require__(51);
    var _handlebarsCompilerJavascriptCompiler = __webpack_require__(52);
    var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);
    var _handlebarsCompilerVisitor = __webpack_require__(49);
    var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);
    var _handlebarsNoConflict = __webpack_require__(44);
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
    var _create = _handlebarsRuntime2["default"].create;

    function create() {
      var hb = _create();
      hb.compile = function(input, options) {
        return _handlebarsCompilerCompiler.compile(input, options, hb)
      };
      hb.precompile = function(input, options) {
        return _handlebarsCompilerCompiler.precompile(input, options, hb)
      };
      hb.AST = _handlebarsCompilerAst2["default"];
      hb.Compiler = _handlebarsCompilerCompiler.Compiler;
      hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2["default"];
      hb.Parser = _handlebarsCompilerBase.parser;
      hb.parse = _handlebarsCompilerBase.parse;
      hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;
      return hb
    }
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst.Visitor = _handlebarsCompilerVisitor2["default"];
    inst["default"] = inst;
    exports["default"] = inst;
    module.exports = exports["default"]
  }, function(module, exports) {
    "use strict";
    exports["default"] = function(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    };
    exports.__esModule = true
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(3)["default"];
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    var _handlebarsBase = __webpack_require__(4);
    var base = _interopRequireWildcard(_handlebarsBase);
    var _handlebarsSafeString = __webpack_require__(37);
    var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
    var _handlebarsException = __webpack_require__(6);
    var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
    var _handlebarsUtils = __webpack_require__(5);
    var Utils = _interopRequireWildcard(_handlebarsUtils);
    var _handlebarsRuntime = __webpack_require__(38);
    var runtime = _interopRequireWildcard(_handlebarsRuntime);
    var _handlebarsNoConflict = __webpack_require__(44);
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

    function create() {
      var hb = new base.HandlebarsEnvironment;
      Utils.extend(hb, base);
      hb.SafeString = _handlebarsSafeString2["default"];
      hb.Exception = _handlebarsException2["default"];
      hb.Utils = Utils;
      hb.escapeExpression = Utils.escapeExpression;
      hb.VM = runtime;
      hb.template = function(spec) {
        return runtime.template(spec, hb)
      };
      return hb
    }
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst["default"] = inst;
    exports["default"] = inst;
    module.exports = exports["default"]
  }, function(module, exports) {
    "use strict";
    exports["default"] = function(obj) {
      if (obj && obj.__esModule) {
        return obj
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]
          }
        }
        newObj["default"] = obj;
        return newObj
      }
    };
    exports.__esModule = true
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    exports.HandlebarsEnvironment = HandlebarsEnvironment;
    var _utils = __webpack_require__(5);
    var _exception = __webpack_require__(6);
    var _exception2 = _interopRequireDefault(_exception);
    var _helpers = __webpack_require__(10);
    var _decorators = __webpack_require__(30);
    var _logger = __webpack_require__(32);
    var _logger2 = _interopRequireDefault(_logger);
    var _internalProtoAccess = __webpack_require__(33);
    var VERSION = "4.7.7";
    exports.VERSION = VERSION;
    var COMPILER_REVISION = 8;
    exports.COMPILER_REVISION = COMPILER_REVISION;
    var LAST_COMPATIBLE_COMPILER_REVISION = 7;
    exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
    var REVISION_CHANGES = {
      1: "<= 1.0.rc.2",
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: "== 1.x.x",
      5: "== 2.0.0-alpha.x",
      6: ">= 2.0.0-beta.1",
      7: ">= 4.0.0 <4.3.0",
      8: ">= 4.3.0"
    };
    exports.REVISION_CHANGES = REVISION_CHANGES;
    var objectType = "[object Object]";

    function HandlebarsEnvironment(helpers, partials, decorators) {
      this.helpers = helpers || {};
      this.partials = partials || {};
      this.decorators = decorators || {};
      _helpers.registerDefaultHelpers(this);
      _decorators.registerDefaultDecorators(this)
    }
    HandlebarsEnvironment.prototype = {
      constructor: HandlebarsEnvironment,
      logger: _logger2["default"],
      log: _logger2["default"].log,
      registerHelper: function registerHelper(name, fn) {
        if (_utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple helpers")
          }
          _utils.extend(this.helpers, name)
        } else {
          this.helpers[name] = fn
        }
      },
      unregisterHelper: function unregisterHelper(name) {
        delete this.helpers[name]
      },
      registerPartial: function registerPartial(name, partial) {
        if (_utils.toString.call(name) === objectType) {
          _utils.extend(this.partials, name)
        } else {
          if (typeof partial === "undefined") {
            throw new _exception2["default"]('Attempting to register a partial called "' + name + '" as undefined')
          }
          this.partials[name] = partial
        }
      },
      unregisterPartial: function unregisterPartial(name) {
        delete this.partials[name]
      },
      registerDecorator: function registerDecorator(name, fn) {
        if (_utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple decorators")
          }
          _utils.extend(this.decorators, name)
        } else {
          this.decorators[name] = fn
        }
      },
      unregisterDecorator: function unregisterDecorator(name) {
        delete this.decorators[name]
      },
      resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
        _internalProtoAccess.resetLoggedProperties()
      }
    };
    var log = _logger2["default"].log;
    exports.log = log;
    exports.createFrame = _utils.createFrame;
    exports.logger = _logger2["default"]
  }, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = extend;
    exports.indexOf = indexOf;
    exports.escapeExpression = escapeExpression;
    exports.isEmpty = isEmpty;
    exports.createFrame = createFrame;
    exports.blockParams = blockParams;
    exports.appendContextPath = appendContextPath;
    var escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    var badChars = /[&<>"'`=]/g,
      possible = /[&<>"'`=]/;

    function escapeChar(chr) {
      return escape[chr]
    }

    function extend(obj) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
            obj[key] = arguments[i][key]
          }
        }
      }
      return obj
    }
    var toString = Object.prototype.toString;
    exports.toString = toString;
    var isFunction = function isFunction(value) {
      return typeof value === "function"
    };
    if (isFunction(/x/)) {
      exports.isFunction = isFunction = function(value) {
        return typeof value === "function" && toString.call(value) === "[object Function]"
      }
    }
    exports.isFunction = isFunction;
    var isArray = Array.isArray || function(value) {
      return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false
    };
    exports.isArray = isArray;

    function indexOf(array, value) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
          return i
        }
      }
      return -1
    }

    function escapeExpression(string) {
      if (typeof string !== "string") {
        if (string && string.toHTML) {
          return string.toHTML()
        } else if (string == null) {
          return ""
        } else if (!string) {
          return string + ""
        }
        string = "" + string
      }
      if (!possible.test(string)) {
        return string
      }
      return string.replace(badChars, escapeChar)
    }

    function isEmpty(value) {
      if (!value && value !== 0) {
        return true
      } else if (isArray(value) && value.length === 0) {
        return true
      } else {
        return false
      }
    }

    function createFrame(object) {
      var frame = extend({}, object);
      frame._parent = object;
      return frame
    }

    function blockParams(params, ids) {
      params.path = ids;
      return params
    }

    function appendContextPath(contextPath, id) {
      return (contextPath ? contextPath + "." : "") + id
    }
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _Object$defineProperty = __webpack_require__(7)["default"];
    exports.__esModule = true;
    var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];

    function Exception(message, node) {
      var loc = node && node.loc,
        line = undefined,
        endLineNumber = undefined,
        column = undefined,
        endColumn = undefined;
      if (loc) {
        line = loc.start.line;
        endLineNumber = loc.end.line;
        column = loc.start.column;
        endColumn = loc.end.column;
        message += " - " + line + ":" + column
      }
      var tmp = Error.prototype.constructor.call(this, message);
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]]
      }
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception)
      }
      try {
        if (loc) {
          this.lineNumber = line;
          this.endLineNumber = endLineNumber;
          if (_Object$defineProperty) {
            Object.defineProperty(this, "column", {
              value: column,
              enumerable: true
            });
            Object.defineProperty(this, "endColumn", {
              value: endColumn,
              enumerable: true
            })
          } else {
            this.column = column;
            this.endColumn = endColumn
          }
        }
      } catch (nop) {}
    }
    Exception.prototype = new Error;
    exports["default"] = Exception;
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    module.exports = {
      default: __webpack_require__(8),
      __esModule: true
    }
  }, function(module, exports, __webpack_require__) {
    var $ = __webpack_require__(9);
    module.exports = function defineProperty(it, key, desc) {
      return $.setDesc(it, key, desc)
    }
  }, function(module, exports) {
    var $Object = Object;
    module.exports = {
      create: $Object.create,
      getProto: $Object.getPrototypeOf,
      isEnum: {}.propertyIsEnumerable,
      getDesc: $Object.getOwnPropertyDescriptor,
      setDesc: $Object.defineProperty,
      setDescs: $Object.defineProperties,
      getKeys: $Object.keys,
      getNames: $Object.getOwnPropertyNames,
      getSymbols: $Object.getOwnPropertySymbols,
      each: [].forEach
    }
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    exports.registerDefaultHelpers = registerDefaultHelpers;
    exports.moveHelperToHooks = moveHelperToHooks;
    var _helpersBlockHelperMissing = __webpack_require__(11);
    var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
    var _helpersEach = __webpack_require__(12);
    var _helpersEach2 = _interopRequireDefault(_helpersEach);
    var _helpersHelperMissing = __webpack_require__(25);
    var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
    var _helpersIf = __webpack_require__(26);
    var _helpersIf2 = _interopRequireDefault(_helpersIf);
    var _helpersLog = __webpack_require__(27);
    var _helpersLog2 = _interopRequireDefault(_helpersLog);
    var _helpersLookup = __webpack_require__(28);
    var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
    var _helpersWith = __webpack_require__(29);
    var _helpersWith2 = _interopRequireDefault(_helpersWith);

    function registerDefaultHelpers(instance) {
      _helpersBlockHelperMissing2["default"](instance);
      _helpersEach2["default"](instance);
      _helpersHelperMissing2["default"](instance);
      _helpersIf2["default"](instance);
      _helpersLog2["default"](instance);
      _helpersLookup2["default"](instance);
      _helpersWith2["default"](instance)
    }

    function moveHelperToHooks(instance, helperName, keepHelper) {
      if (instance.helpers[helperName]) {
        instance.hooks[helperName] = instance.helpers[helperName];
        if (!keepHelper) {
          delete instance.helpers[helperName]
        }
      }
    }
  }, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    var _utils = __webpack_require__(5);
    exports["default"] = function(instance) {
      instance.registerHelper("blockHelperMissing", function(context, options) {
        var inverse = options.inverse,
          fn = options.fn;
        if (context === true) {
          return fn(this)
        } else if (context === false || context == null) {
          return inverse(this)
        } else if (_utils.isArray(context)) {
          if (context.length > 0) {
            if (options.ids) {
              options.ids = [options.name]
            }
            return instance.helpers.each(context, options)
          } else {
            return inverse(this)
          }
        } else {
          if (options.data && options.ids) {
            var data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
            options = {
              data: data
            }
          }
          return fn(context, options)
        }
      })
    };
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    (function(global) {
      "use strict";
      var _Object$keys = __webpack_require__(13)["default"];
      var _interopRequireDefault = __webpack_require__(1)["default"];
      exports.__esModule = true;
      var _utils = __webpack_require__(5);
      var _exception = __webpack_require__(6);
      var _exception2 = _interopRequireDefault(_exception);
      exports["default"] = function(instance) {
        instance.registerHelper("each", function(context, options) {
          if (!options) {
            throw new _exception2["default"]("Must pass iterator to #each")
          }
          var fn = options.fn,
            inverse = options.inverse,
            i = 0,
            ret = "",
            data = undefined,
            contextPath = undefined;
          if (options.data && options.ids) {
            contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + "."
          }
          if (_utils.isFunction(context)) {
            context = context.call(this)
          }
          if (options.data) {
            data = _utils.createFrame(options.data)
          }

          function execIteration(field, index, last) {
            if (data) {
              data.key = field;
              data.index = index;
              data.first = index === 0;
              data.last = !!last;
              if (contextPath) {
                data.contextPath = contextPath + field
              }
            }
            ret = ret + fn(context[field], {
              data: data,
              blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
            })
          }
          if (context && typeof context === "object") {
            if (_utils.isArray(context)) {
              for (var j = context.length; i < j; i++) {
                if (i in context) {
                  execIteration(i, i, i === context.length - 1)
                }
              }
            } else if (global.Symbol && context[global.Symbol.iterator]) {
              var newContext = [];
              var iterator = context[global.Symbol.iterator]();
              for (var it = iterator.next(); !it.done; it = iterator.next()) {
                newContext.push(it.value)
              }
              context = newContext;
              for (var j = context.length; i < j; i++) {
                execIteration(i, i, i === context.length - 1)
              }
            } else {
              (function() {
                var priorKey = undefined;
                _Object$keys(context).forEach(function(key) {
                  if (priorKey !== undefined) {
                    execIteration(priorKey, i - 1)
                  }
                  priorKey = key;
                  i++
                });
                if (priorKey !== undefined) {
                  execIteration(priorKey, i - 1, true)
                }
              })()
            }
          }
          if (i === 0) {
            ret = inverse(this)
          }
          return ret
        })
      };
      module.exports = exports["default"]
    }).call(exports, function() {
      return this
    }())
  }, function(module, exports, __webpack_require__) {
    module.exports = {
      default: __webpack_require__(14),
      __esModule: true
    }
  }, function(module, exports, __webpack_require__) {
    __webpack_require__(15);
    module.exports = __webpack_require__(21).Object.keys
  }, function(module, exports, __webpack_require__) {
    var toObject = __webpack_require__(16);
    __webpack_require__(18)("keys", function($keys) {
      return function keys(it) {
        return $keys(toObject(it))
      }
    })
  }, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(17);
    module.exports = function(it) {
      return Object(defined(it))
    }
  }, function(module, exports) {
    module.exports = function(it) {
      if (it == undefined) throw TypeError("Can't call method on  " + it);
      return it
    }
  }, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(19),
      core = __webpack_require__(21),
      fails = __webpack_require__(24);
    module.exports = function(KEY, exec) {
      var fn = (core.Object || {})[KEY] || Object[KEY],
        exp = {};
      exp[KEY] = exec(fn);
      $export($export.S + $export.F * fails(function() {
        fn(1)
      }), "Object", exp)
    }
  }, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(20),
      core = __webpack_require__(21),
      ctx = __webpack_require__(22),
      PROTOTYPE = "prototype";
    var $export = function(type, name, source) {
      var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key, own, out;
      if (IS_GLOBAL) source = name;
      for (key in source) {
        own = !IS_FORCED && target && key in target;
        if (own && key in exports) continue;
        out = own ? target[key] : source[key];
        exports[key] = IS_GLOBAL && typeof target[key] != "function" ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
          var F = function(param) {
            return this instanceof C ? new C(param) : C(param)
          };
          F[PROTOTYPE] = C[PROTOTYPE];
          return F
        }(out) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
        if (IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out
      }
    };
    $export.F = 1;
    $export.G = 2;
    $export.S = 4;
    $export.P = 8;
    $export.B = 16;
    $export.W = 32;
    module.exports = $export
  }, function(module, exports) {
    var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global
  }, function(module, exports) {
    var core = module.exports = {
      version: "1.2.6"
    };
    if (typeof __e == "number") __e = core
  }, function(module, exports, __webpack_require__) {
    var aFunction = __webpack_require__(23);
    module.exports = function(fn, that, length) {
      aFunction(fn);
      if (that === undefined) return fn;
      switch (length) {
        case 1:
          return function(a) {
            return fn.call(that, a)
          };
        case 2:
          return function(a, b) {
            return fn.call(that, a, b)
          };
        case 3:
          return function(a, b, c) {
            return fn.call(that, a, b, c)
          }
      }
      return function() {
        return fn.apply(that, arguments)
      }
    }
  }, function(module, exports) {
    module.exports = function(it) {
      if (typeof it != "function") throw TypeError(it + " is not a function!");
      return it
    }
  }, function(module, exports) {
    module.exports = function(exec) {
      try {
        return !!exec()
      } catch (e) {
        return true
      }
    }
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    var _exception = __webpack_require__(6);
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("helperMissing", function() {
        if (arguments.length === 1) {
          return undefined
        } else {
          throw new _exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
        }
      })
    };
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    var _utils = __webpack_require__(5);
    var _exception = __webpack_require__(6);
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("if", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#if requires exactly one argument")
        }
        if (_utils.isFunction(conditional)) {
          conditional = conditional.call(this)
        }
        if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
          return options.inverse(this)
        } else {
          return options.fn(this)
        }
      });
      instance.registerHelper("unless", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#unless requires exactly one argument")
        }
        return instance.helpers["if"].call(this, conditional, {
          fn: options.inverse,
          inverse: options.fn,
          hash: options.hash
        })
      })
    };
    module.exports = exports["default"]
  }, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(instance) {
      instance.registerHelper("log", function() {
        var args = [undefined],
          options = arguments[arguments.length - 1];
        for (var i = 0; i < arguments.length - 1; i++) {
          args.push(arguments[i])
        }
        var level = 1;
        if (options.hash.level != null) {
          level = options.hash.level
        } else if (options.data && options.data.level != null) {
          level = options.data.level
        }
        args[0] = level;
        instance.log.apply(instance, args)
      })
    };
    module.exports = exports["default"]
  }, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(instance) {
      instance.registerHelper("lookup", function(obj, field, options) {
        if (!obj) {
          return obj
        }
        return options.lookupProperty(obj, field)
      })
    };
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    var _utils = __webpack_require__(5);
    var _exception = __webpack_require__(6);
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("with", function(context, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#with requires exactly one argument")
        }
        if (_utils.isFunction(context)) {
          context = context.call(this)
        }
        var fn = options.fn;
        if (!_utils.isEmpty(context)) {
          var data = options.data;
          if (options.data && options.ids) {
            data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0])
          }
          return fn(context, {
            data: data,
            blockParams: _utils.blockParams([context], [data && data.contextPath])
          })
        } else {
          return options.inverse(this)
        }
      })
    };
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    exports.registerDefaultDecorators = registerDefaultDecorators;
    var _decoratorsInline = __webpack_require__(31);
    var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

    function registerDefaultDecorators(instance) {
      _decoratorsInline2["default"](instance)
    }
  }, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    var _utils = __webpack_require__(5);
    exports["default"] = function(instance) {
      instance.registerDecorator("inline", function(fn, props, container, options) {
        var ret = fn;
        if (!props.partials) {
          props.partials = {};
          ret = function(context, options) {
            var original = container.partials;
            container.partials = _utils.extend({}, original, props.partials);
            var ret = fn(context, options);
            container.partials = original;
            return ret
          }
        }
        props.partials[options.args[0]] = options.fn;
        return ret
      })
    };
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    var _utils = __webpack_require__(5);
    var logger = {
      methodMap: ["debug", "info", "warn", "error"],
      level: "info",
      lookupLevel: function lookupLevel(level) {
        if (typeof level === "string") {
          var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
          if (levelMap >= 0) {
            level = levelMap
          } else {
            level = parseInt(level, 10)
          }
        }
        return level
      },
      log: function log(level) {
        level = logger.lookupLevel(level);
        if (typeof console !== "undefined" && logger.lookupLevel(logger.level) <= level) {
          var method = logger.methodMap[level];
          if (!console[method]) {
            method = "log"
          }
          for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            message[_key - 1] = arguments[_key]
          }
          console[method].apply(console, message)
        }
      }
    };
    exports["default"] = logger;
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _Object$create = __webpack_require__(34)["default"];
    var _Object$keys = __webpack_require__(13)["default"];
    var _interopRequireWildcard = __webpack_require__(3)["default"];
    exports.__esModule = true;
    exports.createProtoAccessControl = createProtoAccessControl;
    exports.resultIsAllowed = resultIsAllowed;
    exports.resetLoggedProperties = resetLoggedProperties;
    var _createNewLookupObject = __webpack_require__(36);
    var _logger = __webpack_require__(32);
    var logger = _interopRequireWildcard(_logger);
    var loggedProperties = _Object$create(null);

    function createProtoAccessControl(runtimeOptions) {
      var defaultMethodWhiteList = _Object$create(null);
      defaultMethodWhiteList["constructor"] = false;
      defaultMethodWhiteList["__defineGetter__"] = false;
      defaultMethodWhiteList["__defineSetter__"] = false;
      defaultMethodWhiteList["__lookupGetter__"] = false;
      var defaultPropertyWhiteList = _Object$create(null);
      defaultPropertyWhiteList["__proto__"] = false;
      return {
        properties: {
          whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
          defaultValue: runtimeOptions.allowProtoPropertiesByDefault
        },
        methods: {
          whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
          defaultValue: runtimeOptions.allowProtoMethodsByDefault
        }
      }
    }

    function resultIsAllowed(result, protoAccessControl, propertyName) {
      if (typeof result === "function") {
        return checkWhiteList(protoAccessControl.methods, propertyName)
      } else {
        return checkWhiteList(protoAccessControl.properties, propertyName)
      }
    }

    function checkWhiteList(protoAccessControlForType, propertyName) {
      if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
        return protoAccessControlForType.whitelist[propertyName] === true
      }
      if (protoAccessControlForType.defaultValue !== undefined) {
        return protoAccessControlForType.defaultValue
      }
      logUnexpecedPropertyAccessOnce(propertyName);
      return false
    }

    function logUnexpecedPropertyAccessOnce(propertyName) {
      if (loggedProperties[propertyName] !== true) {
        loggedProperties[propertyName] = true;
        logger.log("error", 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + "You can add a runtime option to disable the check or this warning:\n" + "See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details")
      }
    }

    function resetLoggedProperties() {
      _Object$keys(loggedProperties).forEach(function(propertyName) {
        delete loggedProperties[propertyName]
      })
    }
  }, function(module, exports, __webpack_require__) {
    module.exports = {
      default: __webpack_require__(35),
      __esModule: true
    }
  }, function(module, exports, __webpack_require__) {
    var $ = __webpack_require__(9);
    module.exports = function create(P, D) {
      return $.create(P, D)
    }
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _Object$create = __webpack_require__(34)["default"];
    exports.__esModule = true;
    exports.createNewLookupObject = createNewLookupObject;
    var _utils = __webpack_require__(5);

    function createNewLookupObject() {
      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key]
      }
      return _utils.extend.apply(undefined, [_Object$create(null)].concat(sources))
    }
  }, function(module, exports) {
    "use strict";
    exports.__esModule = true;

    function SafeString(string) {
      this.string = string
    }
    SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
      return "" + this.string
    };
    exports["default"] = SafeString;
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _Object$seal = __webpack_require__(39)["default"];
    var _Object$keys = __webpack_require__(13)["default"];
    var _interopRequireWildcard = __webpack_require__(3)["default"];
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    exports.checkRevision = checkRevision;
    exports.template = template;
    exports.wrapProgram = wrapProgram;
    exports.resolvePartial = resolvePartial;
    exports.invokePartial = invokePartial;
    exports.noop = noop;
    var _utils = __webpack_require__(5);
    var Utils = _interopRequireWildcard(_utils);
    var _exception = __webpack_require__(6);
    var _exception2 = _interopRequireDefault(_exception);
    var _base = __webpack_require__(4);
    var _helpers = __webpack_require__(10);
    var _internalWrapHelper = __webpack_require__(43);
    var _internalProtoAccess = __webpack_require__(33);

    function checkRevision(compilerInfo) {
      var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = _base.COMPILER_REVISION;
      if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
        return
      }
      if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
        var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
        throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").")
      } else {
        throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + compilerInfo[1] + ").")
      }
    }

    function template(templateSpec, env) {
      if (!env) {
        throw new _exception2["default"]("No environment passed to template")
      }
      if (!templateSpec || !templateSpec.main) {
        throw new _exception2["default"]("Unknown template object: " + typeof templateSpec)
      }
      templateSpec.main.decorator = templateSpec.main_d;
      env.VM.checkRevision(templateSpec.compiler);
      var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

      function invokePartialWrapper(partial, context, options) {
        if (options.hash) {
          context = Utils.extend({}, context, options.hash);
          if (options.ids) {
            options.ids[0] = true
          }
        }
        partial = env.VM.resolvePartial.call(this, partial, context, options);
        var extendedOptions = Utils.extend({}, options, {
          hooks: this.hooks,
          protoAccessControl: this.protoAccessControl
        });
        var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
        if (result == null && env.compile) {
          options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
          result = options.partials[options.name](context, extendedOptions)
        }
        if (result != null) {
          if (options.indent) {
            var lines = result.split("\n");
            for (var i = 0, l = lines.length; i < l; i++) {
              if (!lines[i] && i + 1 === l) {
                break
              }
              lines[i] = options.indent + lines[i]
            }
            result = lines.join("\n")
          }
          return result
        } else {
          throw new _exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode")
        }
      }
      var container = {
        strict: function strict(obj, name, loc) {
          if (!obj || !(name in obj)) {
            throw new _exception2["default"]('"' + name + '" not defined in ' + obj, {
              loc: loc
            })
          }
          return container.lookupProperty(obj, name)
        },
        lookupProperty: function lookupProperty(parent, propertyName) {
          var result = parent[propertyName];
          if (result == null) {
            return result
          }
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return result
          }
          if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
            return result
          }
          return undefined
        },
        lookup: function lookup(depths, name) {
          var len = depths.length;
          for (var i = 0; i < len; i++) {
            var result = depths[i] && container.lookupProperty(depths[i], name);
            if (result != null) {
              return depths[i][name]
            }
          }
        },
        lambda: function lambda(current, context) {
          return typeof current === "function" ? current.call(context) : current
        },
        escapeExpression: Utils.escapeExpression,
        invokePartial: invokePartialWrapper,
        fn: function fn(i) {
          var ret = templateSpec[i];
          ret.decorator = templateSpec[i + "_d"];
          return ret
        },
        programs: [],
        program: function program(i, data, declaredBlockParams, blockParams, depths) {
          var programWrapper = this.programs[i],
            fn = this.fn(i);
          if (data || depths || blockParams || declaredBlockParams) {
            programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths)
          } else if (!programWrapper) {
            programWrapper = this.programs[i] = wrapProgram(this, i, fn)
          }
          return programWrapper
        },
        data: function data(value, depth) {
          while (value && depth--) {
            value = value._parent
          }
          return value
        },
        mergeIfNeeded: function mergeIfNeeded(param, common) {
          var obj = param || common;
          if (param && common && param !== common) {
            obj = Utils.extend({}, common, param)
          }
          return obj
        },
        nullContext: _Object$seal({}),
        noop: env.VM.noop,
        compilerInfo: templateSpec.compiler
      };

      function ret(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var data = options.data;
        ret._setup(options);
        if (!options.partial && templateSpec.useData) {
          data = initData(context, data)
        }
        var depths = undefined,
          blockParams = templateSpec.useBlockParams ? [] : undefined;
        if (templateSpec.useDepths) {
          if (options.depths) {
            depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths
          } else {
            depths = [context]
          }
        }

        function main(context) {
          return "" + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths)
        }
        main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
        return main(context, options)
      }
      ret.isTop = true;
      ret._setup = function(options) {
        if (!options.partial) {
          var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
          wrapHelpersToPassLookupProperty(mergedHelpers, container);
          container.helpers = mergedHelpers;
          if (templateSpec.usePartial) {
            container.partials = container.mergeIfNeeded(options.partials, env.partials)
          }
          if (templateSpec.usePartial || templateSpec.useDecorators) {
            container.decorators = Utils.extend({}, env.decorators, options.decorators)
          }
          container.hooks = {};
          container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
          var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
          _helpers.moveHelperToHooks(container, "helperMissing", keepHelperInHelpers);
          _helpers.moveHelperToHooks(container, "blockHelperMissing", keepHelperInHelpers)
        } else {
          container.protoAccessControl = options.protoAccessControl;
          container.helpers = options.helpers;
          container.partials = options.partials;
          container.decorators = options.decorators;
          container.hooks = options.hooks
        }
      };
      ret._child = function(i, data, blockParams, depths) {
        if (templateSpec.useBlockParams && !blockParams) {
          throw new _exception2["default"]("must pass block params")
        }
        if (templateSpec.useDepths && !depths) {
          throw new _exception2["default"]("must pass parent depths")
        }
        return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths)
      };
      return ret
    }

    function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
      function prog(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var currentDepths = depths;
        if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
          currentDepths = [context].concat(depths)
        }
        return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths)
      }
      prog = executeDecorators(fn, prog, container, depths, data, blockParams);
      prog.program = i;
      prog.depth = depths ? depths.length : 0;
      prog.blockParams = declaredBlockParams || 0;
      return prog
    }

    function resolvePartial(partial, context, options) {
      if (!partial) {
        if (options.name === "@partial-block") {
          partial = options.data["partial-block"]
        } else {
          partial = options.partials[options.name]
        }
      } else if (!partial.call && !options.name) {
        options.name = partial;
        partial = options.partials[partial]
      }
      return partial
    }

    function invokePartial(partial, context, options) {
      var currentPartialBlock = options.data && options.data["partial-block"];
      options.partial = true;
      if (options.ids) {
        options.data.contextPath = options.ids[0] || options.data.contextPath
      }
      var partialBlock = undefined;
      if (options.fn && options.fn !== noop) {
        (function() {
          options.data = _base.createFrame(options.data);
          var fn = options.fn;
          partialBlock = options.data["partial-block"] = function partialBlockWrapper(context) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            options.data = _base.createFrame(options.data);
            options.data["partial-block"] = currentPartialBlock;
            return fn(context, options)
          };
          if (fn.partials) {
            options.partials = Utils.extend({}, options.partials, fn.partials)
          }
        })()
      }
      if (partial === undefined && partialBlock) {
        partial = partialBlock
      }
      if (partial === undefined) {
        throw new _exception2["default"]("The partial " + options.name + " could not be found")
      } else if (partial instanceof Function) {
        return partial(context, options)
      }
    }

    function noop() {
      return ""
    }

    function initData(context, data) {
      if (!data || !("root" in data)) {
        data = data ? _base.createFrame(data) : {};
        data.root = context
      }
      return data
    }

    function executeDecorators(fn, prog, container, depths, data, blockParams) {
      if (fn.decorator) {
        var props = {};
        prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
        Utils.extend(prog, props)
      }
      return prog
    }

    function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
      _Object$keys(mergedHelpers).forEach(function(helperName) {
        var helper = mergedHelpers[helperName];
        mergedHelpers[helperName] = passLookupPropertyOption(helper, container)
      })
    }

    function passLookupPropertyOption(helper, container) {
      var lookupProperty = container.lookupProperty;
      return _internalWrapHelper.wrapHelper(helper, function(options) {
        return Utils.extend({
          lookupProperty: lookupProperty
        }, options)
      })
    }
  }, function(module, exports, __webpack_require__) {
    module.exports = {
      default: __webpack_require__(40),
      __esModule: true
    }
  }, function(module, exports, __webpack_require__) {
    __webpack_require__(41);
    module.exports = __webpack_require__(21).Object.seal
  }, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(42);
    __webpack_require__(18)("seal", function($seal) {
      return function seal(it) {
        return $seal && isObject(it) ? $seal(it) : it
      }
    })
  }, function(module, exports) {
    module.exports = function(it) {
      return typeof it === "object" ? it !== null : typeof it === "function"
    }
  }, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.wrapHelper = wrapHelper;

    function wrapHelper(helper, transformOptionsFn) {
      if (typeof helper !== "function") {
        return helper
      }
      var wrapper = function wrapper() {
        var options = arguments[arguments.length - 1];
        arguments[arguments.length - 1] = transformOptionsFn(options);
        return helper.apply(this, arguments)
      };
      return wrapper
    }
  }, function(module, exports) {
    (function(global) {
      "use strict";
      exports.__esModule = true;
      exports["default"] = function(Handlebars) {
        var root = typeof global !== "undefined" ? global : window,
          $Handlebars = root.Handlebars;
        Handlebars.noConflict = function() {
          if (root.Handlebars === Handlebars) {
            root.Handlebars = $Handlebars
          }
          return Handlebars
        }
      };
      module.exports = exports["default"]
    }).call(exports, function() {
      return this
    }())
  }, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    var AST = {
      helpers: {
        helperExpression: function helperExpression(node) {
          return node.type === "SubExpression" || (node.type === "MustacheStatement" || node.type === "BlockStatement") && !!(node.params && node.params.length || node.hash)
        },
        scopedId: function scopedId(path) {
          return /^\.|this\b/.test(path.original)
        },
        simpleId: function simpleId(path) {
          return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth
        }
      }
    };
    exports["default"] = AST;
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    var _interopRequireWildcard = __webpack_require__(3)["default"];
    exports.__esModule = true;
    exports.parseWithoutProcessing = parseWithoutProcessing;
    exports.parse = parse;
    var _parser = __webpack_require__(47);
    var _parser2 = _interopRequireDefault(_parser);
    var _whitespaceControl = __webpack_require__(48);
    var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);
    var _helpers = __webpack_require__(50);
    var Helpers = _interopRequireWildcard(_helpers);
    var _utils = __webpack_require__(5);
    exports.parser = _parser2["default"];
    var yy = {};
    _utils.extend(yy, Helpers);

    function parseWithoutProcessing(input, options) {
      if (input.type === "Program") {
        return input
      }
      _parser2["default"].yy = yy;
      yy.locInfo = function(locInfo) {
        return new yy.SourceLocation(options && options.srcName, locInfo)
      };
      var ast = _parser2["default"].parse(input);
      return ast
    }

    function parse(input, options) {
      var ast = parseWithoutProcessing(input, options);
      var strip = new _whitespaceControl2["default"](options);
      return strip.accept(ast)
    }
  }, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    var handlebars = function() {
      var parser = {
        trace: function trace() {},
        yy: {},
        symbols_: {
          error: 2,
          root: 3,
          program: 4,
          EOF: 5,
          program_repetition0: 6,
          statement: 7,
          mustache: 8,
          block: 9,
          rawBlock: 10,
          partial: 11,
          partialBlock: 12,
          content: 13,
          COMMENT: 14,
          CONTENT: 15,
          openRawBlock: 16,
          rawBlock_repetition0: 17,
          END_RAW_BLOCK: 18,
          OPEN_RAW_BLOCK: 19,
          helperName: 20,
          openRawBlock_repetition0: 21,
          openRawBlock_option0: 22,
          CLOSE_RAW_BLOCK: 23,
          openBlock: 24,
          block_option0: 25,
          closeBlock: 26,
          openInverse: 27,
          block_option1: 28,
          OPEN_BLOCK: 29,
          openBlock_repetition0: 30,
          openBlock_option0: 31,
          openBlock_option1: 32,
          CLOSE: 33,
          OPEN_INVERSE: 34,
          openInverse_repetition0: 35,
          openInverse_option0: 36,
          openInverse_option1: 37,
          openInverseChain: 38,
          OPEN_INVERSE_CHAIN: 39,
          openInverseChain_repetition0: 40,
          openInverseChain_option0: 41,
          openInverseChain_option1: 42,
          inverseAndProgram: 43,
          INVERSE: 44,
          inverseChain: 45,
          inverseChain_option0: 46,
          OPEN_ENDBLOCK: 47,
          OPEN: 48,
          mustache_repetition0: 49,
          mustache_option0: 50,
          OPEN_UNESCAPED: 51,
          mustache_repetition1: 52,
          mustache_option1: 53,
          CLOSE_UNESCAPED: 54,
          OPEN_PARTIAL: 55,
          partialName: 56,
          partial_repetition0: 57,
          partial_option0: 58,
          openPartialBlock: 59,
          OPEN_PARTIAL_BLOCK: 60,
          openPartialBlock_repetition0: 61,
          openPartialBlock_option0: 62,
          param: 63,
          sexpr: 64,
          OPEN_SEXPR: 65,
          sexpr_repetition0: 66,
          sexpr_option0: 67,
          CLOSE_SEXPR: 68,
          hash: 69,
          hash_repetition_plus0: 70,
          hashSegment: 71,
          ID: 72,
          EQUALS: 73,
          blockParams: 74,
          OPEN_BLOCK_PARAMS: 75,
          blockParams_repetition_plus0: 76,
          CLOSE_BLOCK_PARAMS: 77,
          path: 78,
          dataName: 79,
          STRING: 80,
          NUMBER: 81,
          BOOLEAN: 82,
          UNDEFINED: 83,
          NULL: 84,
          DATA: 85,
          pathSegments: 86,
          SEP: 87,
          $accept: 0,
          $end: 1
        },
        terminals_: {
          2: "error",
          5: "EOF",
          14: "COMMENT",
          15: "CONTENT",
          18: "END_RAW_BLOCK",
          19: "OPEN_RAW_BLOCK",
          23: "CLOSE_RAW_BLOCK",
          29: "OPEN_BLOCK",
          33: "CLOSE",
          34: "OPEN_INVERSE",
          39: "OPEN_INVERSE_CHAIN",
          44: "INVERSE",
          47: "OPEN_ENDBLOCK",
          48: "OPEN",
          51: "OPEN_UNESCAPED",
          54: "CLOSE_UNESCAPED",
          55: "OPEN_PARTIAL",
          60: "OPEN_PARTIAL_BLOCK",
          65: "OPEN_SEXPR",
          68: "CLOSE_SEXPR",
          72: "ID",
          73: "EQUALS",
          75: "OPEN_BLOCK_PARAMS",
          77: "CLOSE_BLOCK_PARAMS",
          80: "STRING",
          81: "NUMBER",
          82: "BOOLEAN",
          83: "UNDEFINED",
          84: "NULL",
          85: "DATA",
          87: "SEP"
        },
        productions_: [0, [3, 2],
          [4, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [13, 1],
          [10, 3],
          [16, 5],
          [9, 4],
          [9, 4],
          [24, 6],
          [27, 6],
          [38, 6],
          [43, 2],
          [45, 3],
          [45, 1],
          [26, 3],
          [8, 5],
          [8, 5],
          [11, 5],
          [12, 3],
          [59, 5],
          [63, 1],
          [63, 1],
          [64, 5],
          [69, 1],
          [71, 3],
          [74, 3],
          [20, 1],
          [20, 1],
          [20, 1],
          [20, 1],
          [20, 1],
          [20, 1],
          [20, 1],
          [56, 1],
          [56, 1],
          [79, 2],
          [78, 1],
          [86, 3],
          [86, 1],
          [6, 0],
          [6, 2],
          [17, 0],
          [17, 2],
          [21, 0],
          [21, 2],
          [22, 0],
          [22, 1],
          [25, 0],
          [25, 1],
          [28, 0],
          [28, 1],
          [30, 0],
          [30, 2],
          [31, 0],
          [31, 1],
          [32, 0],
          [32, 1],
          [35, 0],
          [35, 2],
          [36, 0],
          [36, 1],
          [37, 0],
          [37, 1],
          [40, 0],
          [40, 2],
          [41, 0],
          [41, 1],
          [42, 0],
          [42, 1],
          [46, 0],
          [46, 1],
          [49, 0],
          [49, 2],
          [50, 0],
          [50, 1],
          [52, 0],
          [52, 2],
          [53, 0],
          [53, 1],
          [57, 0],
          [57, 2],
          [58, 0],
          [58, 1],
          [61, 0],
          [61, 2],
          [62, 0],
          [62, 1],
          [66, 0],
          [66, 2],
          [67, 0],
          [67, 1],
          [70, 1],
          [70, 2],
          [76, 1],
          [76, 2]
        ],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return $$[$0 - 1];
              break;
            case 2:
              this.$ = yy.prepareProgram($$[$0]);
              break;
            case 3:
              this.$ = $$[$0];
              break;
            case 4:
              this.$ = $$[$0];
              break;
            case 5:
              this.$ = $$[$0];
              break;
            case 6:
              this.$ = $$[$0];
              break;
            case 7:
              this.$ = $$[$0];
              break;
            case 8:
              this.$ = $$[$0];
              break;
            case 9:
              this.$ = {
                type: "CommentStatement",
                value: yy.stripComment($$[$0]),
                strip: yy.stripFlags($$[$0], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 10:
              this.$ = {
                type: "ContentStatement",
                original: $$[$0],
                value: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 11:
              this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 12:
              this.$ = {
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1]
              };
              break;
            case 13:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
              break;
            case 14:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
              break;
            case 15:
              this.$ = {
                open: $$[$0 - 5],
                path: $$[$0 - 4],
                params: $$[$0 - 3],
                hash: $$[$0 - 2],
                blockParams: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 5], $$[$0])
              };
              break;
            case 16:
              this.$ = {
                path: $$[$0 - 4],
                params: $$[$0 - 3],
                hash: $$[$0 - 2],
                blockParams: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 5], $$[$0])
              };
              break;
            case 17:
              this.$ = {
                path: $$[$0 - 4],
                params: $$[$0 - 3],
                hash: $$[$0 - 2],
                blockParams: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 5], $$[$0])
              };
              break;
            case 18:
              this.$ = {
                strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]),
                program: $$[$0]
              };
              break;
            case 19:
              var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
                program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
              program.chained = true;
              this.$ = {
                strip: $$[$0 - 2].strip,
                program: program,
                chain: true
              };
              break;
            case 20:
              this.$ = $$[$0];
              break;
            case 21:
              this.$ = {
                path: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 2], $$[$0])
              };
              break;
            case 22:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 23:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 24:
              this.$ = {
                type: "PartialStatement",
                name: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                indent: "",
                strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 25:
              this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 26:
              this.$ = {
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 4], $$[$0])
              };
              break;
            case 27:
              this.$ = $$[$0];
              break;
            case 28:
              this.$ = $$[$0];
              break;
            case 29:
              this.$ = {
                type: "SubExpression",
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                loc: yy.locInfo(this._$)
              };
              break;
            case 30:
              this.$ = {
                type: "Hash",
                pairs: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 31:
              this.$ = {
                type: "HashPair",
                key: yy.id($$[$0 - 2]),
                value: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 32:
              this.$ = yy.id($$[$0 - 1]);
              break;
            case 33:
              this.$ = $$[$0];
              break;
            case 34:
              this.$ = $$[$0];
              break;
            case 35:
              this.$ = {
                type: "StringLiteral",
                value: $$[$0],
                original: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 36:
              this.$ = {
                type: "NumberLiteral",
                value: Number($$[$0]),
                original: Number($$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 37:
              this.$ = {
                type: "BooleanLiteral",
                value: $$[$0] === "true",
                original: $$[$0] === "true",
                loc: yy.locInfo(this._$)
              };
              break;
            case 38:
              this.$ = {
                type: "UndefinedLiteral",
                original: undefined,
                value: undefined,
                loc: yy.locInfo(this._$)
              };
              break;
            case 39:
              this.$ = {
                type: "NullLiteral",
                original: null,
                value: null,
                loc: yy.locInfo(this._$)
              };
              break;
            case 40:
              this.$ = $$[$0];
              break;
            case 41:
              this.$ = $$[$0];
              break;
            case 42:
              this.$ = yy.preparePath(true, $$[$0], this._$);
              break;
            case 43:
              this.$ = yy.preparePath(false, $$[$0], this._$);
              break;
            case 44:
              $$[$0 - 2].push({
                part: yy.id($$[$0]),
                original: $$[$0],
                separator: $$[$0 - 1]
              });
              this.$ = $$[$0 - 2];
              break;
            case 45:
              this.$ = [{
                part: yy.id($$[$0]),
                original: $$[$0]
              }];
              break;
            case 46:
              this.$ = [];
              break;
            case 47:
              $$[$0 - 1].push($$[$0]);
              break;
            case 48:
              this.$ = [];
              break;
            case 49:
              $$[$0 - 1].push($$[$0]);
              break;
            case 50:
              this.$ = [];
              break;
            case 51:
              $$[$0 - 1].push($$[$0]);
              break;
            case 58:
              this.$ = [];
              break;
            case 59:
              $$[$0 - 1].push($$[$0]);
              break;
            case 64:
              this.$ = [];
              break;
            case 65:
              $$[$0 - 1].push($$[$0]);
              break;
            case 70:
              this.$ = [];
              break;
            case 71:
              $$[$0 - 1].push($$[$0]);
              break;
            case 78:
              this.$ = [];
              break;
            case 79:
              $$[$0 - 1].push($$[$0]);
              break;
            case 82:
              this.$ = [];
              break;
            case 83:
              $$[$0 - 1].push($$[$0]);
              break;
            case 86:
              this.$ = [];
              break;
            case 87:
              $$[$0 - 1].push($$[$0]);
              break;
            case 90:
              this.$ = [];
              break;
            case 91:
              $$[$0 - 1].push($$[$0]);
              break;
            case 94:
              this.$ = [];
              break;
            case 95:
              $$[$0 - 1].push($$[$0]);
              break;
            case 98:
              this.$ = [$$[$0]];
              break;
            case 99:
              $$[$0 - 1].push($$[$0]);
              break;
            case 100:
              this.$ = [$$[$0]];
              break;
            case 101:
              $$[$0 - 1].push($$[$0]);
              break
          }
        },
        table: [{
          3: 1,
          4: 2,
          5: [2, 46],
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          1: [3]
        }, {
          5: [1, 4]
        }, {
          5: [2, 2],
          7: 5,
          8: 6,
          9: 7,
          10: 8,
          11: 9,
          12: 10,
          13: 11,
          14: [1, 12],
          15: [1, 20],
          16: 17,
          19: [1, 23],
          24: 15,
          27: 16,
          29: [1, 21],
          34: [1, 22],
          39: [2, 2],
          44: [2, 2],
          47: [2, 2],
          48: [1, 13],
          51: [1, 14],
          55: [1, 18],
          59: 19,
          60: [1, 24]
        }, {
          1: [2, 1]
        }, {
          5: [2, 47],
          14: [2, 47],
          15: [2, 47],
          19: [2, 47],
          29: [2, 47],
          34: [2, 47],
          39: [2, 47],
          44: [2, 47],
          47: [2, 47],
          48: [2, 47],
          51: [2, 47],
          55: [2, 47],
          60: [2, 47]
        }, {
          5: [2, 3],
          14: [2, 3],
          15: [2, 3],
          19: [2, 3],
          29: [2, 3],
          34: [2, 3],
          39: [2, 3],
          44: [2, 3],
          47: [2, 3],
          48: [2, 3],
          51: [2, 3],
          55: [2, 3],
          60: [2, 3]
        }, {
          5: [2, 4],
          14: [2, 4],
          15: [2, 4],
          19: [2, 4],
          29: [2, 4],
          34: [2, 4],
          39: [2, 4],
          44: [2, 4],
          47: [2, 4],
          48: [2, 4],
          51: [2, 4],
          55: [2, 4],
          60: [2, 4]
        }, {
          5: [2, 5],
          14: [2, 5],
          15: [2, 5],
          19: [2, 5],
          29: [2, 5],
          34: [2, 5],
          39: [2, 5],
          44: [2, 5],
          47: [2, 5],
          48: [2, 5],
          51: [2, 5],
          55: [2, 5],
          60: [2, 5]
        }, {
          5: [2, 6],
          14: [2, 6],
          15: [2, 6],
          19: [2, 6],
          29: [2, 6],
          34: [2, 6],
          39: [2, 6],
          44: [2, 6],
          47: [2, 6],
          48: [2, 6],
          51: [2, 6],
          55: [2, 6],
          60: [2, 6]
        }, {
          5: [2, 7],
          14: [2, 7],
          15: [2, 7],
          19: [2, 7],
          29: [2, 7],
          34: [2, 7],
          39: [2, 7],
          44: [2, 7],
          47: [2, 7],
          48: [2, 7],
          51: [2, 7],
          55: [2, 7],
          60: [2, 7]
        }, {
          5: [2, 8],
          14: [2, 8],
          15: [2, 8],
          19: [2, 8],
          29: [2, 8],
          34: [2, 8],
          39: [2, 8],
          44: [2, 8],
          47: [2, 8],
          48: [2, 8],
          51: [2, 8],
          55: [2, 8],
          60: [2, 8]
        }, {
          5: [2, 9],
          14: [2, 9],
          15: [2, 9],
          19: [2, 9],
          29: [2, 9],
          34: [2, 9],
          39: [2, 9],
          44: [2, 9],
          47: [2, 9],
          48: [2, 9],
          51: [2, 9],
          55: [2, 9],
          60: [2, 9]
        }, {
          20: 25,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 36,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          4: 37,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          39: [2, 46],
          44: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          4: 38,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          44: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          15: [2, 48],
          17: 39,
          18: [2, 48]
        }, {
          20: 41,
          56: 40,
          64: 42,
          65: [1, 43],
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          4: 44,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          5: [2, 10],
          14: [2, 10],
          15: [2, 10],
          18: [2, 10],
          19: [2, 10],
          29: [2, 10],
          34: [2, 10],
          39: [2, 10],
          44: [2, 10],
          47: [2, 10],
          48: [2, 10],
          51: [2, 10],
          55: [2, 10],
          60: [2, 10]
        }, {
          20: 45,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 46,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 47,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 41,
          56: 48,
          64: 42,
          65: [1, 43],
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          33: [2, 78],
          49: 49,
          65: [2, 78],
          72: [2, 78],
          80: [2, 78],
          81: [2, 78],
          82: [2, 78],
          83: [2, 78],
          84: [2, 78],
          85: [2, 78]
        }, {
          23: [2, 33],
          33: [2, 33],
          54: [2, 33],
          65: [2, 33],
          68: [2, 33],
          72: [2, 33],
          75: [2, 33],
          80: [2, 33],
          81: [2, 33],
          82: [2, 33],
          83: [2, 33],
          84: [2, 33],
          85: [2, 33]
        }, {
          23: [2, 34],
          33: [2, 34],
          54: [2, 34],
          65: [2, 34],
          68: [2, 34],
          72: [2, 34],
          75: [2, 34],
          80: [2, 34],
          81: [2, 34],
          82: [2, 34],
          83: [2, 34],
          84: [2, 34],
          85: [2, 34]
        }, {
          23: [2, 35],
          33: [2, 35],
          54: [2, 35],
          65: [2, 35],
          68: [2, 35],
          72: [2, 35],
          75: [2, 35],
          80: [2, 35],
          81: [2, 35],
          82: [2, 35],
          83: [2, 35],
          84: [2, 35],
          85: [2, 35]
        }, {
          23: [2, 36],
          33: [2, 36],
          54: [2, 36],
          65: [2, 36],
          68: [2, 36],
          72: [2, 36],
          75: [2, 36],
          80: [2, 36],
          81: [2, 36],
          82: [2, 36],
          83: [2, 36],
          84: [2, 36],
          85: [2, 36]
        }, {
          23: [2, 37],
          33: [2, 37],
          54: [2, 37],
          65: [2, 37],
          68: [2, 37],
          72: [2, 37],
          75: [2, 37],
          80: [2, 37],
          81: [2, 37],
          82: [2, 37],
          83: [2, 37],
          84: [2, 37],
          85: [2, 37]
        }, {
          23: [2, 38],
          33: [2, 38],
          54: [2, 38],
          65: [2, 38],
          68: [2, 38],
          72: [2, 38],
          75: [2, 38],
          80: [2, 38],
          81: [2, 38],
          82: [2, 38],
          83: [2, 38],
          84: [2, 38],
          85: [2, 38]
        }, {
          23: [2, 39],
          33: [2, 39],
          54: [2, 39],
          65: [2, 39],
          68: [2, 39],
          72: [2, 39],
          75: [2, 39],
          80: [2, 39],
          81: [2, 39],
          82: [2, 39],
          83: [2, 39],
          84: [2, 39],
          85: [2, 39]
        }, {
          23: [2, 43],
          33: [2, 43],
          54: [2, 43],
          65: [2, 43],
          68: [2, 43],
          72: [2, 43],
          75: [2, 43],
          80: [2, 43],
          81: [2, 43],
          82: [2, 43],
          83: [2, 43],
          84: [2, 43],
          85: [2, 43],
          87: [1, 50]
        }, {
          72: [1, 35],
          86: 51
        }, {
          23: [2, 45],
          33: [2, 45],
          54: [2, 45],
          65: [2, 45],
          68: [2, 45],
          72: [2, 45],
          75: [2, 45],
          80: [2, 45],
          81: [2, 45],
          82: [2, 45],
          83: [2, 45],
          84: [2, 45],
          85: [2, 45],
          87: [2, 45]
        }, {
          52: 52,
          54: [2, 82],
          65: [2, 82],
          72: [2, 82],
          80: [2, 82],
          81: [2, 82],
          82: [2, 82],
          83: [2, 82],
          84: [2, 82],
          85: [2, 82]
        }, {
          25: 53,
          38: 55,
          39: [1, 57],
          43: 56,
          44: [1, 58],
          45: 54,
          47: [2, 54]
        }, {
          28: 59,
          43: 60,
          44: [1, 58],
          47: [2, 56]
        }, {
          13: 62,
          15: [1, 20],
          18: [1, 61]
        }, {
          33: [2, 86],
          57: 63,
          65: [2, 86],
          72: [2, 86],
          80: [2, 86],
          81: [2, 86],
          82: [2, 86],
          83: [2, 86],
          84: [2, 86],
          85: [2, 86]
        }, {
          33: [2, 40],
          65: [2, 40],
          72: [2, 40],
          80: [2, 40],
          81: [2, 40],
          82: [2, 40],
          83: [2, 40],
          84: [2, 40],
          85: [2, 40]
        }, {
          33: [2, 41],
          65: [2, 41],
          72: [2, 41],
          80: [2, 41],
          81: [2, 41],
          82: [2, 41],
          83: [2, 41],
          84: [2, 41],
          85: [2, 41]
        }, {
          20: 64,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          26: 65,
          47: [1, 66]
        }, {
          30: 67,
          33: [2, 58],
          65: [2, 58],
          72: [2, 58],
          75: [2, 58],
          80: [2, 58],
          81: [2, 58],
          82: [2, 58],
          83: [2, 58],
          84: [2, 58],
          85: [2, 58]
        }, {
          33: [2, 64],
          35: 68,
          65: [2, 64],
          72: [2, 64],
          75: [2, 64],
          80: [2, 64],
          81: [2, 64],
          82: [2, 64],
          83: [2, 64],
          84: [2, 64],
          85: [2, 64]
        }, {
          21: 69,
          23: [2, 50],
          65: [2, 50],
          72: [2, 50],
          80: [2, 50],
          81: [2, 50],
          82: [2, 50],
          83: [2, 50],
          84: [2, 50],
          85: [2, 50]
        }, {
          33: [2, 90],
          61: 70,
          65: [2, 90],
          72: [2, 90],
          80: [2, 90],
          81: [2, 90],
          82: [2, 90],
          83: [2, 90],
          84: [2, 90],
          85: [2, 90]
        }, {
          20: 74,
          33: [2, 80],
          50: 71,
          63: 72,
          64: 75,
          65: [1, 43],
          69: 73,
          70: 76,
          71: 77,
          72: [1, 78],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          72: [1, 79]
        }, {
          23: [2, 42],
          33: [2, 42],
          54: [2, 42],
          65: [2, 42],
          68: [2, 42],
          72: [2, 42],
          75: [2, 42],
          80: [2, 42],
          81: [2, 42],
          82: [2, 42],
          83: [2, 42],
          84: [2, 42],
          85: [2, 42],
          87: [1, 50]
        }, {
          20: 74,
          53: 80,
          54: [2, 84],
          63: 81,
          64: 75,
          65: [1, 43],
          69: 82,
          70: 76,
          71: 77,
          72: [1, 78],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          26: 83,
          47: [1, 66]
        }, {
          47: [2, 55]
        }, {
          4: 84,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          39: [2, 46],
          44: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          47: [2, 20]
        }, {
          20: 85,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          4: 86,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          26: 87,
          47: [1, 66]
        }, {
          47: [2, 57]
        }, {
          5: [2, 11],
          14: [2, 11],
          15: [2, 11],
          19: [2, 11],
          29: [2, 11],
          34: [2, 11],
          39: [2, 11],
          44: [2, 11],
          47: [2, 11],
          48: [2, 11],
          51: [2, 11],
          55: [2, 11],
          60: [2, 11]
        }, {
          15: [2, 49],
          18: [2, 49]
        }, {
          20: 74,
          33: [2, 88],
          58: 88,
          63: 89,
          64: 75,
          65: [1, 43],
          69: 90,
          70: 76,
          71: 77,
          72: [1, 78],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          65: [2, 94],
          66: 91,
          68: [2, 94],
          72: [2, 94],
          80: [2, 94],
          81: [2, 94],
          82: [2, 94],
          83: [2, 94],
          84: [2, 94],
          85: [2, 94]
        }, {
          5: [2, 25],
          14: [2, 25],
          15: [2, 25],
          19: [2, 25],
          29: [2, 25],
          34: [2, 25],
          39: [2, 25],
          44: [2, 25],
          47: [2, 25],
          48: [2, 25],
          51: [2, 25],
          55: [2, 25],
          60: [2, 25]
        }, {
          20: 92,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 74,
          31: 93,
          33: [2, 60],
          63: 94,
          64: 75,
          65: [1, 43],
          69: 95,
          70: 76,
          71: 77,
          72: [1, 78],
          75: [2, 60],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 74,
          33: [2, 66],
          36: 96,
          63: 97,
          64: 75,
          65: [1, 43],
          69: 98,
          70: 76,
          71: 77,
          72: [1, 78],
          75: [2, 66],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 74,
          22: 99,
          23: [2, 52],
          63: 100,
          64: 75,
          65: [1, 43],
          69: 101,
          70: 76,
          71: 77,
          72: [1, 78],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 74,
          33: [2, 92],
          62: 102,
          63: 103,
          64: 75,
          65: [1, 43],
          69: 104,
          70: 76,
          71: 77,
          72: [1, 78],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          33: [1, 105]
        }, {
          33: [2, 79],
          65: [2, 79],
          72: [2, 79],
          80: [2, 79],
          81: [2, 79],
          82: [2, 79],
          83: [2, 79],
          84: [2, 79],
          85: [2, 79]
        }, {
          33: [2, 81]
        }, {
          23: [2, 27],
          33: [2, 27],
          54: [2, 27],
          65: [2, 27],
          68: [2, 27],
          72: [2, 27],
          75: [2, 27],
          80: [2, 27],
          81: [2, 27],
          82: [2, 27],
          83: [2, 27],
          84: [2, 27],
          85: [2, 27]
        }, {
          23: [2, 28],
          33: [2, 28],
          54: [2, 28],
          65: [2, 28],
          68: [2, 28],
          72: [2, 28],
          75: [2, 28],
          80: [2, 28],
          81: [2, 28],
          82: [2, 28],
          83: [2, 28],
          84: [2, 28],
          85: [2, 28]
        }, {
          23: [2, 30],
          33: [2, 30],
          54: [2, 30],
          68: [2, 30],
          71: 106,
          72: [1, 107],
          75: [2, 30]
        }, {
          23: [2, 98],
          33: [2, 98],
          54: [2, 98],
          68: [2, 98],
          72: [2, 98],
          75: [2, 98]
        }, {
          23: [2, 45],
          33: [2, 45],
          54: [2, 45],
          65: [2, 45],
          68: [2, 45],
          72: [2, 45],
          73: [1, 108],
          75: [2, 45],
          80: [2, 45],
          81: [2, 45],
          82: [2, 45],
          83: [2, 45],
          84: [2, 45],
          85: [2, 45],
          87: [2, 45]
        }, {
          23: [2, 44],
          33: [2, 44],
          54: [2, 44],
          65: [2, 44],
          68: [2, 44],
          72: [2, 44],
          75: [2, 44],
          80: [2, 44],
          81: [2, 44],
          82: [2, 44],
          83: [2, 44],
          84: [2, 44],
          85: [2, 44],
          87: [2, 44]
        }, {
          54: [1, 109]
        }, {
          54: [2, 83],
          65: [2, 83],
          72: [2, 83],
          80: [2, 83],
          81: [2, 83],
          82: [2, 83],
          83: [2, 83],
          84: [2, 83],
          85: [2, 83]
        }, {
          54: [2, 85]
        }, {
          5: [2, 13],
          14: [2, 13],
          15: [2, 13],
          19: [2, 13],
          29: [2, 13],
          34: [2, 13],
          39: [2, 13],
          44: [2, 13],
          47: [2, 13],
          48: [2, 13],
          51: [2, 13],
          55: [2, 13],
          60: [2, 13]
        }, {
          38: 55,
          39: [1, 57],
          43: 56,
          44: [1, 58],
          45: 111,
          46: 110,
          47: [2, 76]
        }, {
          33: [2, 70],
          40: 112,
          65: [2, 70],
          72: [2, 70],
          75: [2, 70],
          80: [2, 70],
          81: [2, 70],
          82: [2, 70],
          83: [2, 70],
          84: [2, 70],
          85: [2, 70]
        }, {
          47: [2, 18]
        }, {
          5: [2, 14],
          14: [2, 14],
          15: [2, 14],
          19: [2, 14],
          29: [2, 14],
          34: [2, 14],
          39: [2, 14],
          44: [2, 14],
          47: [2, 14],
          48: [2, 14],
          51: [2, 14],
          55: [2, 14],
          60: [2, 14]
        }, {
          33: [1, 113]
        }, {
          33: [2, 87],
          65: [2, 87],
          72: [2, 87],
          80: [2, 87],
          81: [2, 87],
          82: [2, 87],
          83: [2, 87],
          84: [2, 87],
          85: [2, 87]
        }, {
          33: [2, 89]
        }, {
          20: 74,
          63: 115,
          64: 75,
          65: [1, 43],
          67: 114,
          68: [2, 96],
          69: 116,
          70: 76,
          71: 77,
          72: [1, 78],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          33: [1, 117]
        }, {
          32: 118,
          33: [2, 62],
          74: 119,
          75: [1, 120]
        }, {
          33: [2, 59],
          65: [2, 59],
          72: [2, 59],
          75: [2, 59],
          80: [2, 59],
          81: [2, 59],
          82: [2, 59],
          83: [2, 59],
          84: [2, 59],
          85: [2, 59]
        }, {
          33: [2, 61],
          75: [2, 61]
        }, {
          33: [2, 68],
          37: 121,
          74: 122,
          75: [1, 120]
        }, {
          33: [2, 65],
          65: [2, 65],
          72: [2, 65],
          75: [2, 65],
          80: [2, 65],
          81: [2, 65],
          82: [2, 65],
          83: [2, 65],
          84: [2, 65],
          85: [2, 65]
        }, {
          33: [2, 67],
          75: [2, 67]
        }, {
          23: [1, 123]
        }, {
          23: [2, 51],
          65: [2, 51],
          72: [2, 51],
          80: [2, 51],
          81: [2, 51],
          82: [2, 51],
          83: [2, 51],
          84: [2, 51],
          85: [2, 51]
        }, {
          23: [2, 53]
        }, {
          33: [1, 124]
        }, {
          33: [2, 91],
          65: [2, 91],
          72: [2, 91],
          80: [2, 91],
          81: [2, 91],
          82: [2, 91],
          83: [2, 91],
          84: [2, 91],
          85: [2, 91]
        }, {
          33: [2, 93]
        }, {
          5: [2, 22],
          14: [2, 22],
          15: [2, 22],
          19: [2, 22],
          29: [2, 22],
          34: [2, 22],
          39: [2, 22],
          44: [2, 22],
          47: [2, 22],
          48: [2, 22],
          51: [2, 22],
          55: [2, 22],
          60: [2, 22]
        }, {
          23: [2, 99],
          33: [2, 99],
          54: [2, 99],
          68: [2, 99],
          72: [2, 99],
          75: [2, 99]
        }, {
          73: [1, 108]
        }, {
          20: 74,
          63: 125,
          64: 75,
          65: [1, 43],
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          5: [2, 23],
          14: [2, 23],
          15: [2, 23],
          19: [2, 23],
          29: [2, 23],
          34: [2, 23],
          39: [2, 23],
          44: [2, 23],
          47: [2, 23],
          48: [2, 23],
          51: [2, 23],
          55: [2, 23],
          60: [2, 23]
        }, {
          47: [2, 19]
        }, {
          47: [2, 77]
        }, {
          20: 74,
          33: [2, 72],
          41: 126,
          63: 127,
          64: 75,
          65: [1, 43],
          69: 128,
          70: 76,
          71: 77,
          72: [1, 78],
          75: [2, 72],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          5: [2, 24],
          14: [2, 24],
          15: [2, 24],
          19: [2, 24],
          29: [2, 24],
          34: [2, 24],
          39: [2, 24],
          44: [2, 24],
          47: [2, 24],
          48: [2, 24],
          51: [2, 24],
          55: [2, 24],
          60: [2, 24]
        }, {
          68: [1, 129]
        }, {
          65: [2, 95],
          68: [2, 95],
          72: [2, 95],
          80: [2, 95],
          81: [2, 95],
          82: [2, 95],
          83: [2, 95],
          84: [2, 95],
          85: [2, 95]
        }, {
          68: [2, 97]
        }, {
          5: [2, 21],
          14: [2, 21],
          15: [2, 21],
          19: [2, 21],
          29: [2, 21],
          34: [2, 21],
          39: [2, 21],
          44: [2, 21],
          47: [2, 21],
          48: [2, 21],
          51: [2, 21],
          55: [2, 21],
          60: [2, 21]
        }, {
          33: [1, 130]
        }, {
          33: [2, 63]
        }, {
          72: [1, 132],
          76: 131
        }, {
          33: [1, 133]
        }, {
          33: [2, 69]
        }, {
          15: [2, 12],
          18: [2, 12]
        }, {
          14: [2, 26],
          15: [2, 26],
          19: [2, 26],
          29: [2, 26],
          34: [2, 26],
          47: [2, 26],
          48: [2, 26],
          51: [2, 26],
          55: [2, 26],
          60: [2, 26]
        }, {
          23: [2, 31],
          33: [2, 31],
          54: [2, 31],
          68: [2, 31],
          72: [2, 31],
          75: [2, 31]
        }, {
          33: [2, 74],
          42: 134,
          74: 135,
          75: [1, 120]
        }, {
          33: [2, 71],
          65: [2, 71],
          72: [2, 71],
          75: [2, 71],
          80: [2, 71],
          81: [2, 71],
          82: [2, 71],
          83: [2, 71],
          84: [2, 71],
          85: [2, 71]
        }, {
          33: [2, 73],
          75: [2, 73]
        }, {
          23: [2, 29],
          33: [2, 29],
          54: [2, 29],
          65: [2, 29],
          68: [2, 29],
          72: [2, 29],
          75: [2, 29],
          80: [2, 29],
          81: [2, 29],
          82: [2, 29],
          83: [2, 29],
          84: [2, 29],
          85: [2, 29]
        }, {
          14: [2, 15],
          15: [2, 15],
          19: [2, 15],
          29: [2, 15],
          34: [2, 15],
          39: [2, 15],
          44: [2, 15],
          47: [2, 15],
          48: [2, 15],
          51: [2, 15],
          55: [2, 15],
          60: [2, 15]
        }, {
          72: [1, 137],
          77: [1, 136]
        }, {
          72: [2, 100],
          77: [2, 100]
        }, {
          14: [2, 16],
          15: [2, 16],
          19: [2, 16],
          29: [2, 16],
          34: [2, 16],
          44: [2, 16],
          47: [2, 16],
          48: [2, 16],
          51: [2, 16],
          55: [2, 16],
          60: [2, 16]
        }, {
          33: [1, 138]
        }, {
          33: [2, 75]
        }, {
          33: [2, 32]
        }, {
          72: [2, 101],
          77: [2, 101]
        }, {
          14: [2, 17],
          15: [2, 17],
          19: [2, 17],
          29: [2, 17],
          34: [2, 17],
          39: [2, 17],
          44: [2, 17],
          47: [2, 17],
          48: [2, 17],
          51: [2, 17],
          55: [2, 17],
          60: [2, 17]
        }],
        defaultActions: {
          4: [2, 1],
          54: [2, 55],
          56: [2, 20],
          60: [2, 57],
          73: [2, 81],
          82: [2, 85],
          86: [2, 18],
          90: [2, 89],
          101: [2, 53],
          104: [2, 93],
          110: [2, 19],
          111: [2, 77],
          116: [2, 97],
          119: [2, 63],
          122: [2, 69],
          135: [2, 75],
          136: [2, 32]
        },
        parseError: function parseError(str, hash) {
          throw new Error(str)
        },
        parse: function parse(input) {
          var self = this,
            stack = [0],
            vstack = [null],
            lstack = [],
            table = this.table,
            yytext = "",
            yylineno = 0,
            yyleng = 0,
            recovering = 0,
            TERROR = 2,
            EOF = 1;
          this.lexer.setInput(input);
          this.lexer.yy = this.yy;
          this.yy.lexer = this.lexer;
          this.yy.parser = this;
          if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
          var yyloc = this.lexer.yylloc;
          lstack.push(yyloc);
          var ranges = this.lexer.options && this.lexer.options.ranges;
          if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;

          function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n
          }

          function lex() {
            var token;
            token = self.lexer.lex() || 1;
            if (typeof token !== "number") {
              token = self.symbols_[token] || token
            }
            return token
          }
          var symbol, preErrorSymbol, state, action, a, r, yyval = {},
            p, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state]
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex()
              }
              action = table[state] && table[state][symbol]
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                expected = [];
                for (p in table[state])
                  if (this.terminals_[p] && p > 2) {
                    expected.push("'" + this.terminals_[p] + "'")
                  } if (this.lexer.showPosition) {
                  errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'"
                } else {
                  errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'")
                }
                this.parseError(errStr, {
                  text: this.lexer.match,
                  token: this.terminals_[symbol] || symbol,
                  line: this.lexer.yylineno,
                  loc: yyloc,
                  expected: expected
                })
              }
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol)
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0) recovering--
                } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {
                  first_line: lstack[lstack.length - (len || 1)].first_line,
                  last_line: lstack[lstack.length - 1].last_line,
                  first_column: lstack[lstack.length - (len || 1)].first_column,
                  last_column: lstack[lstack.length - 1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]]
                }
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                if (typeof r !== "undefined") {
                  return r
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len)
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true
            }
          }
          return true
        }
      };
      var lexer = function() {
        var lexer = {
          EOF: 1,
          parseError: function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash)
            } else {
              throw new Error(str)
            }
          },
          setInput: function setInput(input) {
            this._input = input;
            this._more = this._less = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = ["INITIAL"];
            this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0
            };
            if (this.options.ranges) this.yylloc.range = [0, 0];
            this.offset = 0;
            return this
          },
          input: function input() {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++
            } else {
              this.yylloc.last_column++
            }
            if (this.options.ranges) this.yylloc.range[1]++;
            this._input = this._input.slice(1);
            return ch
          },
          unput: function unput(ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1) this.yylineno -= lines.length - 1;
            var r = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len]
            }
            return this
          },
          more: function more() {
            this._more = true;
            return this
          },
          less: function less(n) {
            this.unput(this.match.slice(n))
          },
          pastInput: function pastInput() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "")
          },
          upcomingInput: function upcomingInput() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length)
            }
            return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "")
          },
          showPosition: function showPosition() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^"
          },
          next: function next() {
            if (this.done) {
              return this.EOF
            }
            if (!this._input) this.done = true;
            var token, match, tempMatch, index, col, lines;
            if (!this._more) {
              this.yytext = "";
              this.match = ""
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break
              }
            }
            if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
              };
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng]
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return
            }
            if (this._input === "") {
              return this.EOF
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              })
            }
          },
          lex: function lex() {
            var r = this.next();
            if (typeof r !== "undefined") {
              return r
            } else {
              return this.lex()
            }
          },
          begin: function begin(condition) {
            this.conditionStack.push(condition)
          },
          popState: function popState() {
            return this.conditionStack.pop()
          },
          _currentRules: function _currentRules() {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
          },
          topState: function topState() {
            return this.conditionStack[this.conditionStack.length - 2]
          },
          pushState: function begin(condition) {
            this.begin(condition)
          }
        };
        lexer.options = {};
        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
          function strip(start, end) {
            return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start)
          }
          var YYSTATE = YY_START;
          switch ($avoiding_name_collisions) {
            case 0:
              if (yy_.yytext.slice(-2) === "\\\\") {
                strip(0, 1);
                this.begin("mu")
              } else if (yy_.yytext.slice(-1) === "\\") {
                strip(0, 1);
                this.begin("emu")
              } else {
                this.begin("mu")
              }
              if (yy_.yytext) return 15;
              break;
            case 1:
              return 15;
              break;
            case 2:
              this.popState();
              return 15;
              break;
            case 3:
              this.begin("raw");
              return 15;
              break;
            case 4:
              this.popState();
              if (this.conditionStack[this.conditionStack.length - 1] === "raw") {
                return 15
              } else {
                strip(5, 9);
                return "END_RAW_BLOCK"
              }
              break;
            case 5:
              return 15;
              break;
            case 6:
              this.popState();
              return 14;
              break;
            case 7:
              return 65;
              break;
            case 8:
              return 68;
              break;
            case 9:
              return 19;
              break;
            case 10:
              this.popState();
              this.begin("raw");
              return 23;
              break;
            case 11:
              return 55;
              break;
            case 12:
              return 60;
              break;
            case 13:
              return 29;
              break;
            case 14:
              return 47;
              break;
            case 15:
              this.popState();
              return 44;
              break;
            case 16:
              this.popState();
              return 44;
              break;
            case 17:
              return 34;
              break;
            case 18:
              return 39;
              break;
            case 19:
              return 51;
              break;
            case 20:
              return 48;
              break;
            case 21:
              this.unput(yy_.yytext);
              this.popState();
              this.begin("com");
              break;
            case 22:
              this.popState();
              return 14;
              break;
            case 23:
              return 48;
              break;
            case 24:
              return 73;
              break;
            case 25:
              return 72;
              break;
            case 26:
              return 72;
              break;
            case 27:
              return 87;
              break;
            case 28:
              break;
            case 29:
              this.popState();
              return 54;
              break;
            case 30:
              this.popState();
              return 33;
              break;
            case 31:
              yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
              return 80;
              break;
            case 32:
              yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
              return 80;
              break;
            case 33:
              return 85;
              break;
            case 34:
              return 82;
              break;
            case 35:
              return 82;
              break;
            case 36:
              return 83;
              break;
            case 37:
              return 84;
              break;
            case 38:
              return 81;
              break;
            case 39:
              return 75;
              break;
            case 40:
              return 77;
              break;
            case 41:
              return 72;
              break;
            case 42:
              yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, "$1");
              return 72;
              break;
            case 43:
              return "INVALID";
              break;
            case 44:
              return 5;
              break
          }
        };
        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
        lexer.conditions = {
          mu: {
            rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
            inclusive: false
          },
          emu: {
            rules: [2],
            inclusive: false
          },
          com: {
            rules: [6],
            inclusive: false
          },
          raw: {
            rules: [3, 4, 5],
            inclusive: false
          },
          INITIAL: {
            rules: [0, 1, 44],
            inclusive: true
          }
        };
        return lexer
      }();
      parser.lexer = lexer;

      function Parser() {
        this.yy = {}
      }
      Parser.prototype = parser;
      parser.Parser = Parser;
      return new Parser
    }();
    exports["default"] = handlebars;
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    var _visitor = __webpack_require__(49);
    var _visitor2 = _interopRequireDefault(_visitor);

    function WhitespaceControl() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      this.options = options
    }
    WhitespaceControl.prototype = new _visitor2["default"];
    WhitespaceControl.prototype.Program = function(program) {
      var doStandalone = !this.options.ignoreStandalone;
      var isRoot = !this.isRootSeen;
      this.isRootSeen = true;
      var body = program.body;
      for (var i = 0, l = body.length; i < l; i++) {
        var current = body[i],
          strip = this.accept(current);
        if (!strip) {
          continue
        }
        var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
          _isNextWhitespace = isNextWhitespace(body, i, isRoot),
          openStandalone = strip.openStandalone && _isPrevWhitespace,
          closeStandalone = strip.closeStandalone && _isNextWhitespace,
          inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
        if (strip.close) {
          omitRight(body, i, true)
        }
        if (strip.open) {
          omitLeft(body, i, true)
        }
        if (doStandalone && inlineStandalone) {
          omitRight(body, i);
          if (omitLeft(body, i)) {
            if (current.type === "PartialStatement") {
              current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1]
            }
          }
        }
        if (doStandalone && openStandalone) {
          omitRight((current.program || current.inverse).body);
          omitLeft(body, i)
        }
        if (doStandalone && closeStandalone) {
          omitRight(body, i);
          omitLeft((current.inverse || current.program).body)
        }
      }
      return program
    };
    WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function(block) {
      this.accept(block.program);
      this.accept(block.inverse);
      var program = block.program || block.inverse,
        inverse = block.program && block.inverse,
        firstInverse = inverse,
        lastInverse = inverse;
      if (inverse && inverse.chained) {
        firstInverse = inverse.body[0].program;
        while (lastInverse.chained) {
          lastInverse = lastInverse.body[lastInverse.body.length - 1].program
        }
      }
      var strip = {
        open: block.openStrip.open,
        close: block.closeStrip.close,
        openStandalone: isNextWhitespace(program.body),
        closeStandalone: isPrevWhitespace((firstInverse || program).body)
      };
      if (block.openStrip.close) {
        omitRight(program.body, null, true)
      }
      if (inverse) {
        var inverseStrip = block.inverseStrip;
        if (inverseStrip.open) {
          omitLeft(program.body, null, true)
        }
        if (inverseStrip.close) {
          omitRight(firstInverse.body, null, true)
        }
        if (block.closeStrip.open) {
          omitLeft(lastInverse.body, null, true)
        }
        if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
          omitLeft(program.body);
          omitRight(firstInverse.body)
        }
      } else if (block.closeStrip.open) {
        omitLeft(program.body, null, true)
      }
      return strip
    };
    WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function(mustache) {
      return mustache.strip
    };
    WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
      var strip = node.strip || {};
      return {
        inlineStandalone: true,
        open: strip.open,
        close: strip.close
      }
    };

    function isPrevWhitespace(body, i, isRoot) {
      if (i === undefined) {
        i = body.length
      }
      var prev = body[i - 1],
        sibling = body[i - 2];
      if (!prev) {
        return isRoot
      }
      if (prev.type === "ContentStatement") {
        return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original)
      }
    }

    function isNextWhitespace(body, i, isRoot) {
      if (i === undefined) {
        i = -1
      }
      var next = body[i + 1],
        sibling = body[i + 2];
      if (!next) {
        return isRoot
      }
      if (next.type === "ContentStatement") {
        return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original)
      }
    }

    function omitRight(body, i, multiple) {
      var current = body[i == null ? 0 : i + 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) {
        return
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
      current.rightStripped = current.value !== original
    }

    function omitLeft(body, i, multiple) {
      var current = body[i == null ? body.length - 1 : i - 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) {
        return
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
      current.leftStripped = current.value !== original;
      return current.leftStripped
    }
    exports["default"] = WhitespaceControl;
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    var _exception = __webpack_require__(6);
    var _exception2 = _interopRequireDefault(_exception);

    function Visitor() {
      this.parents = []
    }
    Visitor.prototype = {
      constructor: Visitor,
      mutating: false,
      acceptKey: function acceptKey(node, name) {
        var value = this.accept(node[name]);
        if (this.mutating) {
          if (value && !Visitor.prototype[value.type]) {
            throw new _exception2["default"]('Unexpected node type "' + value.type + '" found when accepting ' + name + " on " + node.type)
          }
          node[name] = value
        }
      },
      acceptRequired: function acceptRequired(node, name) {
        this.acceptKey(node, name);
        if (!node[name]) {
          throw new _exception2["default"](node.type + " requires " + name)
        }
      },
      acceptArray: function acceptArray(array) {
        for (var i = 0, l = array.length; i < l; i++) {
          this.acceptKey(array, i);
          if (!array[i]) {
            array.splice(i, 1);
            i--;
            l--
          }
        }
      },
      accept: function accept(object) {
        if (!object) {
          return
        }
        if (!this[object.type]) {
          throw new _exception2["default"]("Unknown type: " + object.type, object)
        }
        if (this.current) {
          this.parents.unshift(this.current)
        }
        this.current = object;
        var ret = this[object.type](object);
        this.current = this.parents.shift();
        if (!this.mutating || ret) {
          return ret
        } else if (ret !== false) {
          return object
        }
      },
      Program: function Program(program) {
        this.acceptArray(program.body)
      },
      MustacheStatement: visitSubExpression,
      Decorator: visitSubExpression,
      BlockStatement: visitBlock,
      DecoratorBlock: visitBlock,
      PartialStatement: visitPartial,
      PartialBlockStatement: function PartialBlockStatement(partial) {
        visitPartial.call(this, partial);
        this.acceptKey(partial, "program")
      },
      ContentStatement: function ContentStatement() {},
      CommentStatement: function CommentStatement() {},
      SubExpression: visitSubExpression,
      PathExpression: function PathExpression() {},
      StringLiteral: function StringLiteral() {},
      NumberLiteral: function NumberLiteral() {},
      BooleanLiteral: function BooleanLiteral() {},
      UndefinedLiteral: function UndefinedLiteral() {},
      NullLiteral: function NullLiteral() {},
      Hash: function Hash(hash) {
        this.acceptArray(hash.pairs)
      },
      HashPair: function HashPair(pair) {
        this.acceptRequired(pair, "value")
      }
    };

    function visitSubExpression(mustache) {
      this.acceptRequired(mustache, "path");
      this.acceptArray(mustache.params);
      this.acceptKey(mustache, "hash")
    }

    function visitBlock(block) {
      visitSubExpression.call(this, block);
      this.acceptKey(block, "program");
      this.acceptKey(block, "inverse")
    }

    function visitPartial(partial) {
      this.acceptRequired(partial, "name");
      this.acceptArray(partial.params);
      this.acceptKey(partial, "hash")
    }
    exports["default"] = Visitor;
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    exports.SourceLocation = SourceLocation;
    exports.id = id;
    exports.stripFlags = stripFlags;
    exports.stripComment = stripComment;
    exports.preparePath = preparePath;
    exports.prepareMustache = prepareMustache;
    exports.prepareRawBlock = prepareRawBlock;
    exports.prepareBlock = prepareBlock;
    exports.prepareProgram = prepareProgram;
    exports.preparePartialBlock = preparePartialBlock;
    var _exception = __webpack_require__(6);
    var _exception2 = _interopRequireDefault(_exception);

    function validateClose(open, close) {
      close = close.path ? close.path.original : close;
      if (open.path.original !== close) {
        var errorNode = {
          loc: open.path.loc
        };
        throw new _exception2["default"](open.path.original + " doesn't match " + close, errorNode)
      }
    }

    function SourceLocation(source, locInfo) {
      this.source = source;
      this.start = {
        line: locInfo.first_line,
        column: locInfo.first_column
      };
      this.end = {
        line: locInfo.last_line,
        column: locInfo.last_column
      }
    }

    function id(token) {
      if (/^\[.*\]$/.test(token)) {
        return token.substring(1, token.length - 1)
      } else {
        return token
      }
    }

    function stripFlags(open, close) {
      return {
        open: open.charAt(2) === "~",
        close: close.charAt(close.length - 3) === "~"
      }
    }

    function stripComment(comment) {
      return comment.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "")
    }

    function preparePath(data, parts, loc) {
      loc = this.locInfo(loc);
      var original = data ? "@" : "",
        dig = [],
        depth = 0;
      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i].part,
          isLiteral = parts[i].original !== part;
        original += (parts[i].separator || "") + part;
        if (!isLiteral && (part === ".." || part === "." || part === "this")) {
          if (dig.length > 0) {
            throw new _exception2["default"]("Invalid path: " + original, {
              loc: loc
            })
          } else if (part === "..") {
            depth++
          }
        } else {
          dig.push(part)
        }
      }
      return {
        type: "PathExpression",
        data: data,
        depth: depth,
        parts: dig,
        original: original,
        loc: loc
      }
    }

    function prepareMustache(path, params, hash, open, strip, locInfo) {
      var escapeFlag = open.charAt(3) || open.charAt(2),
        escaped = escapeFlag !== "{" && escapeFlag !== "&";
      var decorator = /\*/.test(open);
      return {
        type: decorator ? "Decorator" : "MustacheStatement",
        path: path,
        params: params,
        hash: hash,
        escaped: escaped,
        strip: strip,
        loc: this.locInfo(locInfo)
      }
    }

    function prepareRawBlock(openRawBlock, contents, close, locInfo) {
      validateClose(openRawBlock, close);
      locInfo = this.locInfo(locInfo);
      var program = {
        type: "Program",
        body: contents,
        strip: {},
        loc: locInfo
      };
      return {
        type: "BlockStatement",
        path: openRawBlock.path,
        params: openRawBlock.params,
        hash: openRawBlock.hash,
        program: program,
        openStrip: {},
        inverseStrip: {},
        closeStrip: {},
        loc: locInfo
      }
    }

    function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
      if (close && close.path) {
        validateClose(openBlock, close)
      }
      var decorator = /\*/.test(openBlock.open);
      program.blockParams = openBlock.blockParams;
      var inverse = undefined,
        inverseStrip = undefined;
      if (inverseAndProgram) {
        if (decorator) {
          throw new _exception2["default"]("Unexpected inverse block on decorator", inverseAndProgram)
        }
        if (inverseAndProgram.chain) {
          inverseAndProgram.program.body[0].closeStrip = close.strip
        }
        inverseStrip = inverseAndProgram.strip;
        inverse = inverseAndProgram.program
      }
      if (inverted) {
        inverted = inverse;
        inverse = program;
        program = inverted
      }
      return {
        type: decorator ? "DecoratorBlock" : "BlockStatement",
        path: openBlock.path,
        params: openBlock.params,
        hash: openBlock.hash,
        program: program,
        inverse: inverse,
        openStrip: openBlock.strip,
        inverseStrip: inverseStrip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      }
    }

    function prepareProgram(statements, loc) {
      if (!loc && statements.length) {
        var firstLoc = statements[0].loc,
          lastLoc = statements[statements.length - 1].loc;
        if (firstLoc && lastLoc) {
          loc = {
            source: firstLoc.source,
            start: {
              line: firstLoc.start.line,
              column: firstLoc.start.column
            },
            end: {
              line: lastLoc.end.line,
              column: lastLoc.end.column
            }
          }
        }
      }
      return {
        type: "Program",
        body: statements,
        strip: {},
        loc: loc
      }
    }

    function preparePartialBlock(open, program, close, locInfo) {
      validateClose(open, close);
      return {
        type: "PartialBlockStatement",
        name: open.path,
        params: open.params,
        hash: open.hash,
        program: program,
        openStrip: open.strip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      }
    }
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _Object$create = __webpack_require__(34)["default"];
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    exports.Compiler = Compiler;
    exports.precompile = precompile;
    exports.compile = compile;
    var _exception = __webpack_require__(6);
    var _exception2 = _interopRequireDefault(_exception);
    var _utils = __webpack_require__(5);
    var _ast = __webpack_require__(45);
    var _ast2 = _interopRequireDefault(_ast);
    var slice = [].slice;

    function Compiler() {}
    Compiler.prototype = {
      compiler: Compiler,
      equals: function equals(other) {
        var len = this.opcodes.length;
        if (other.opcodes.length !== len) {
          return false
        }
        for (var i = 0; i < len; i++) {
          var opcode = this.opcodes[i],
            otherOpcode = other.opcodes[i];
          if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
            return false
          }
        }
        len = this.children.length;
        for (var i = 0; i < len; i++) {
          if (!this.children[i].equals(other.children[i])) {
            return false
          }
        }
        return true
      },
      guid: 0,
      compile: function compile(program, options) {
        this.sourceNode = [];
        this.opcodes = [];
        this.children = [];
        this.options = options;
        this.stringParams = options.stringParams;
        this.trackIds = options.trackIds;
        options.blockParams = options.blockParams || [];
        options.knownHelpers = _utils.extend(_Object$create(null), {
          helperMissing: true,
          blockHelperMissing: true,
          each: true,
          if: true,
          unless: true,
          with: true,
          log: true,
          lookup: true
        }, options.knownHelpers);
        return this.accept(program)
      },
      compileProgram: function compileProgram(program) {
        var childCompiler = new this.compiler,
          result = childCompiler.compile(program, this.options),
          guid = this.guid++;
        this.usePartial = this.usePartial || result.usePartial;
        this.children[guid] = result;
        this.useDepths = this.useDepths || result.useDepths;
        return guid
      },
      accept: function accept(node) {
        if (!this[node.type]) {
          throw new _exception2["default"]("Unknown type: " + node.type, node)
        }
        this.sourceNode.unshift(node);
        var ret = this[node.type](node);
        this.sourceNode.shift();
        return ret
      },
      Program: function Program(program) {
        this.options.blockParams.unshift(program.blockParams);
        var body = program.body,
          bodyLength = body.length;
        for (var i = 0; i < bodyLength; i++) {
          this.accept(body[i])
        }
        this.options.blockParams.shift();
        this.isSimple = bodyLength === 1;
        this.blockParams = program.blockParams ? program.blockParams.length : 0;
        return this
      },
      BlockStatement: function BlockStatement(block) {
        transformLiteralToPath(block);
        var program = block.program,
          inverse = block.inverse;
        program = program && this.compileProgram(program);
        inverse = inverse && this.compileProgram(inverse);
        var type = this.classifySexpr(block);
        if (type === "helper") {
          this.helperSexpr(block, program, inverse)
        } else if (type === "simple") {
          this.simpleSexpr(block);
          this.opcode("pushProgram", program);
          this.opcode("pushProgram", inverse);
          this.opcode("emptyHash");
          this.opcode("blockValue", block.path.original)
        } else {
          this.ambiguousSexpr(block, program, inverse);
          this.opcode("pushProgram", program);
          this.opcode("pushProgram", inverse);
          this.opcode("emptyHash");
          this.opcode("ambiguousBlockValue")
        }
        this.opcode("append")
      },
      DecoratorBlock: function DecoratorBlock(decorator) {
        var program = decorator.program && this.compileProgram(decorator.program);
        var params = this.setupFullMustacheParams(decorator, program, undefined),
          path = decorator.path;
        this.useDecorators = true;
        this.opcode("registerDecorator", params.length, path.original)
      },
      PartialStatement: function PartialStatement(partial) {
        this.usePartial = true;
        var program = partial.program;
        if (program) {
          program = this.compileProgram(partial.program)
        }
        var params = partial.params;
        if (params.length > 1) {
          throw new _exception2["default"]("Unsupported number of partial arguments: " + params.length, partial)
        } else if (!params.length) {
          if (this.options.explicitPartialContext) {
            this.opcode("pushLiteral", "undefined")
          } else {
            params.push({
              type: "PathExpression",
              parts: [],
              depth: 0
            })
          }
        }
        var partialName = partial.name.original,
          isDynamic = partial.name.type === "SubExpression";
        if (isDynamic) {
          this.accept(partial.name)
        }
        this.setupFullMustacheParams(partial, program, undefined, true);
        var indent = partial.indent || "";
        if (this.options.preventIndent && indent) {
          this.opcode("appendContent", indent);
          indent = ""
        }
        this.opcode("invokePartial", isDynamic, partialName, indent);
        this.opcode("append")
      },
      PartialBlockStatement: function PartialBlockStatement(partialBlock) {
        this.PartialStatement(partialBlock)
      },
      MustacheStatement: function MustacheStatement(mustache) {
        this.SubExpression(mustache);
        if (mustache.escaped && !this.options.noEscape) {
          this.opcode("appendEscaped")
        } else {
          this.opcode("append")
        }
      },
      Decorator: function Decorator(decorator) {
        this.DecoratorBlock(decorator)
      },
      ContentStatement: function ContentStatement(content) {
        if (content.value) {
          this.opcode("appendContent", content.value)
        }
      },
      CommentStatement: function CommentStatement() {},
      SubExpression: function SubExpression(sexpr) {
        transformLiteralToPath(sexpr);
        var type = this.classifySexpr(sexpr);
        if (type === "simple") {
          this.simpleSexpr(sexpr)
        } else if (type === "helper") {
          this.helperSexpr(sexpr)
        } else {
          this.ambiguousSexpr(sexpr)
        }
      },
      ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
        var path = sexpr.path,
          name = path.parts[0],
          isBlock = program != null || inverse != null;
        this.opcode("getContext", path.depth);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        path.strict = true;
        this.accept(path);
        this.opcode("invokeAmbiguous", name, isBlock)
      },
      simpleSexpr: function simpleSexpr(sexpr) {
        var path = sexpr.path;
        path.strict = true;
        this.accept(path);
        this.opcode("resolvePossibleLambda")
      },
      helperSexpr: function helperSexpr(sexpr, program, inverse) {
        var params = this.setupFullMustacheParams(sexpr, program, inverse),
          path = sexpr.path,
          name = path.parts[0];
        if (this.options.knownHelpers[name]) {
          this.opcode("invokeKnownHelper", params.length, name)
        } else if (this.options.knownHelpersOnly) {
          throw new _exception2["default"]("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr)
        } else {
          path.strict = true;
          path.falsy = true;
          this.accept(path);
          this.opcode("invokeHelper", params.length, path.original, _ast2["default"].helpers.simpleId(path))
        }
      },
      PathExpression: function PathExpression(path) {
        this.addDepth(path.depth);
        this.opcode("getContext", path.depth);
        var name = path.parts[0],
          scoped = _ast2["default"].helpers.scopedId(path),
          blockParamId = !path.depth && !scoped && this.blockParamIndex(name);
        if (blockParamId) {
          this.opcode("lookupBlockParam", blockParamId, path.parts)
        } else if (!name) {
          this.opcode("pushContext")
        } else if (path.data) {
          this.options.data = true;
          this.opcode("lookupData", path.depth, path.parts, path.strict)
        } else {
          this.opcode("lookupOnContext", path.parts, path.falsy, path.strict, scoped)
        }
      },
      StringLiteral: function StringLiteral(string) {
        this.opcode("pushString", string.value)
      },
      NumberLiteral: function NumberLiteral(number) {
        this.opcode("pushLiteral", number.value)
      },
      BooleanLiteral: function BooleanLiteral(bool) {
        this.opcode("pushLiteral", bool.value)
      },
      UndefinedLiteral: function UndefinedLiteral() {
        this.opcode("pushLiteral", "undefined")
      },
      NullLiteral: function NullLiteral() {
        this.opcode("pushLiteral", "null")
      },
      Hash: function Hash(hash) {
        var pairs = hash.pairs,
          i = 0,
          l = pairs.length;
        this.opcode("pushHash");
        for (; i < l; i++) {
          this.pushParam(pairs[i].value)
        }
        while (i--) {
          this.opcode("assignToHash", pairs[i].key)
        }
        this.opcode("popHash")
      },
      opcode: function opcode(name) {
        this.opcodes.push({
          opcode: name,
          args: slice.call(arguments, 1),
          loc: this.sourceNode[0].loc
        })
      },
      addDepth: function addDepth(depth) {
        if (!depth) {
          return
        }
        this.useDepths = true
      },
      classifySexpr: function classifySexpr(sexpr) {
        var isSimple = _ast2["default"].helpers.simpleId(sexpr.path);
        var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
        var isHelper = !isBlockParam && _ast2["default"].helpers.helperExpression(sexpr);
        var isEligible = !isBlockParam && (isHelper || isSimple);
        if (isEligible && !isHelper) {
          var _name = sexpr.path.parts[0],
            options = this.options;
          if (options.knownHelpers[_name]) {
            isHelper = true
          } else if (options.knownHelpersOnly) {
            isEligible = false
          }
        }
        if (isHelper) {
          return "helper"
        } else if (isEligible) {
          return "ambiguous"
        } else {
          return "simple"
        }
      },
      pushParams: function pushParams(params) {
        for (var i = 0, l = params.length; i < l; i++) {
          this.pushParam(params[i])
        }
      },
      pushParam: function pushParam(val) {
        var value = val.value != null ? val.value : val.original || "";
        if (this.stringParams) {
          if (value.replace) {
            value = value.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")
          }
          if (val.depth) {
            this.addDepth(val.depth)
          }
          this.opcode("getContext", val.depth || 0);
          this.opcode("pushStringParam", value, val.type);
          if (val.type === "SubExpression") {
            this.accept(val)
          }
        } else {
          if (this.trackIds) {
            var blockParamIndex = undefined;
            if (val.parts && !_ast2["default"].helpers.scopedId(val) && !val.depth) {
              blockParamIndex = this.blockParamIndex(val.parts[0])
            }
            if (blockParamIndex) {
              var blockParamChild = val.parts.slice(1).join(".");
              this.opcode("pushId", "BlockParam", blockParamIndex, blockParamChild)
            } else {
              value = val.original || value;
              if (value.replace) {
                value = value.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")
              }
              this.opcode("pushId", val.type, value)
            }
          }
          this.accept(val)
        }
      },
      setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
        var params = sexpr.params;
        this.pushParams(params);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        if (sexpr.hash) {
          this.accept(sexpr.hash)
        } else {
          this.opcode("emptyHash", omitEmpty)
        }
        return params
      },
      blockParamIndex: function blockParamIndex(name) {
        for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
          var blockParams = this.options.blockParams[depth],
            param = blockParams && _utils.indexOf(blockParams, name);
          if (blockParams && param >= 0) {
            return [depth, param]
          }
        }
      }
    };

    function precompile(input, options, env) {
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input)
      }
      options = options || {};
      if (!("data" in options)) {
        options.data = true
      }
      if (options.compat) {
        options.useDepths = true
      }
      var ast = env.parse(input, options),
        environment = (new env.Compiler).compile(ast, options);
      return (new env.JavaScriptCompiler).compile(environment, options)
    }

    function compile(input, options, env) {
      if (options === undefined) options = {};
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input)
      }
      options = _utils.extend({}, options);
      if (!("data" in options)) {
        options.data = true
      }
      if (options.compat) {
        options.useDepths = true
      }
      var compiled = undefined;

      function compileInput() {
        var ast = env.parse(input, options),
          environment = (new env.Compiler).compile(ast, options),
          templateSpec = (new env.JavaScriptCompiler).compile(environment, options, undefined, true);
        return env.template(templateSpec)
      }

      function ret(context, execOptions) {
        if (!compiled) {
          compiled = compileInput()
        }
        return compiled.call(this, context, execOptions)
      }
      ret._setup = function(setupOptions) {
        if (!compiled) {
          compiled = compileInput()
        }
        return compiled._setup(setupOptions)
      };
      ret._child = function(i, data, blockParams, depths) {
        if (!compiled) {
          compiled = compileInput()
        }
        return compiled._child(i, data, blockParams, depths)
      };
      return ret
    }

    function argEquals(a, b) {
      if (a === b) {
        return true
      }
      if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
          if (!argEquals(a[i], b[i])) {
            return false
          }
        }
        return true
      }
    }

    function transformLiteralToPath(sexpr) {
      if (!sexpr.path.parts) {
        var literal = sexpr.path;
        sexpr.path = {
          type: "PathExpression",
          data: false,
          depth: 0,
          parts: [literal.original + ""],
          original: literal.original + "",
          loc: literal.loc
        }
      }
    }
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _Object$keys = __webpack_require__(13)["default"];
    var _interopRequireDefault = __webpack_require__(1)["default"];
    exports.__esModule = true;
    var _base = __webpack_require__(4);
    var _exception = __webpack_require__(6);
    var _exception2 = _interopRequireDefault(_exception);
    var _utils = __webpack_require__(5);
    var _codeGen = __webpack_require__(53);
    var _codeGen2 = _interopRequireDefault(_codeGen);

    function Literal(value) {
      this.value = value
    }

    function JavaScriptCompiler() {}
    JavaScriptCompiler.prototype = {
      nameLookup: function nameLookup(parent, name) {
        return this.internalNameLookup(parent, name)
      },
      depthedLookup: function depthedLookup(name) {
        return [this.aliasable("container.lookup"), "(depths, ", JSON.stringify(name), ")"]
      },
      compilerInfo: function compilerInfo() {
        var revision = _base.COMPILER_REVISION,
          versions = _base.REVISION_CHANGES[revision];
        return [revision, versions]
      },
      appendToBuffer: function appendToBuffer(source, location, explicit) {
        if (!_utils.isArray(source)) {
          source = [source]
        }
        source = this.source.wrap(source, location);
        if (this.environment.isSimple) {
          return ["return ", source, ";"]
        } else if (explicit) {
          return ["buffer += ", source, ";"]
        } else {
          source.appendToBuffer = true;
          return source
        }
      },
      initializeBuffer: function initializeBuffer() {
        return this.quotedString("")
      },
      internalNameLookup: function internalNameLookup(parent, name) {
        this.lookupPropertyFunctionIsUsed = true;
        return ["lookupProperty(", parent, ",", JSON.stringify(name), ")"]
      },
      lookupPropertyFunctionIsUsed: false,
      compile: function compile(environment, options, context, asObject) {
        this.environment = environment;
        this.options = options;
        this.stringParams = this.options.stringParams;
        this.trackIds = this.options.trackIds;
        this.precompile = !asObject;
        this.name = this.environment.name;
        this.isChild = !!context;
        this.context = context || {
          decorators: [],
          programs: [],
          environments: []
        };
        this.preamble();
        this.stackSlot = 0;
        this.stackVars = [];
        this.aliases = {};
        this.registers = {
          list: []
        };
        this.hashes = [];
        this.compileStack = [];
        this.inlineStack = [];
        this.blockParams = [];
        this.compileChildren(environment, options);
        this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
        this.useBlockParams = this.useBlockParams || environment.useBlockParams;
        var opcodes = environment.opcodes,
          opcode = undefined,
          firstLoc = undefined,
          i = undefined,
          l = undefined;
        for (i = 0, l = opcodes.length; i < l; i++) {
          opcode = opcodes[i];
          this.source.currentLocation = opcode.loc;
          firstLoc = firstLoc || opcode.loc;
          this[opcode.opcode].apply(this, opcode.args)
        }
        this.source.currentLocation = firstLoc;
        this.pushSource("");
        if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
          throw new _exception2["default"]("Compile completed with content left on stack")
        }
        if (!this.decorators.isEmpty()) {
          this.useDecorators = true;
          this.decorators.prepend(["var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), ";\n"]);
          this.decorators.push("return fn;");
          if (asObject) {
            this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()])
          } else {
            this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");
            this.decorators.push("}\n");
            this.decorators = this.decorators.merge()
          }
        } else {
          this.decorators = undefined
        }
        var fn = this.createFunctionContext(asObject);
        if (!this.isChild) {
          var ret = {
            compiler: this.compilerInfo(),
            main: fn
          };
          if (this.decorators) {
            ret.main_d = this.decorators;
            ret.useDecorators = true
          }
          var _context = this.context;
          var programs = _context.programs;
          var decorators = _context.decorators;
          for (i = 0, l = programs.length; i < l; i++) {
            if (programs[i]) {
              ret[i] = programs[i];
              if (decorators[i]) {
                ret[i + "_d"] = decorators[i];
                ret.useDecorators = true
              }
            }
          }
          if (this.environment.usePartial) {
            ret.usePartial = true
          }
          if (this.options.data) {
            ret.useData = true
          }
          if (this.useDepths) {
            ret.useDepths = true
          }
          if (this.useBlockParams) {
            ret.useBlockParams = true
          }
          if (this.options.compat) {
            ret.compat = true
          }
          if (!asObject) {
            ret.compiler = JSON.stringify(ret.compiler);
            this.source.currentLocation = {
              start: {
                line: 1,
                column: 0
              }
            };
            ret = this.objectLiteral(ret);
            if (options.srcName) {
              ret = ret.toStringWithSourceMap({
                file: options.destName
              });
              ret.map = ret.map && ret.map.toString()
            } else {
              ret = ret.toString()
            }
          } else {
            ret.compilerOptions = this.options
          }
          return ret
        } else {
          return fn
        }
      },
      preamble: function preamble() {
        this.lastContext = 0;
        this.source = new _codeGen2["default"](this.options.srcName);
        this.decorators = new _codeGen2["default"](this.options.srcName)
      },
      createFunctionContext: function createFunctionContext(asObject) {
        var _this = this;
        var varDeclarations = "";
        var locals = this.stackVars.concat(this.registers.list);
        if (locals.length > 0) {
          varDeclarations += ", " + locals.join(", ")
        }
        var aliasCount = 0;
        _Object$keys(this.aliases).forEach(function(alias) {
          var node = _this.aliases[alias];
          if (node.children && node.referenceCount > 1) {
            varDeclarations += ", alias" + ++aliasCount + "=" + alias;
            node.children[0] = "alias" + aliasCount
          }
        });
        if (this.lookupPropertyFunctionIsUsed) {
          varDeclarations += ", " + this.lookupPropertyFunctionVarDeclaration()
        }
        var params = ["container", "depth0", "helpers", "partials", "data"];
        if (this.useBlockParams || this.useDepths) {
          params.push("blockParams")
        }
        if (this.useDepths) {
          params.push("depths")
        }
        var source = this.mergeSource(varDeclarations);
        if (asObject) {
          params.push(source);
          return Function.apply(this, params)
        } else {
          return this.source.wrap(["function(", params.join(","), ") {\n  ", source, "}"])
        }
      },
      mergeSource: function mergeSource(varDeclarations) {
        var isSimple = this.environment.isSimple,
          appendOnly = !this.forceBuffer,
          appendFirst = undefined,
          sourceSeen = undefined,
          bufferStart = undefined,
          bufferEnd = undefined;
        this.source.each(function(line) {
          if (line.appendToBuffer) {
            if (bufferStart) {
              line.prepend("  + ")
            } else {
              bufferStart = line
            }
            bufferEnd = line
          } else {
            if (bufferStart) {
              if (!sourceSeen) {
                appendFirst = true
              } else {
                bufferStart.prepend("buffer += ")
              }
              bufferEnd.add(";");
              bufferStart = bufferEnd = undefined
            }
            sourceSeen = true;
            if (!isSimple) {
              appendOnly = false
            }
          }
        });
        if (appendOnly) {
          if (bufferStart) {
            bufferStart.prepend("return ");
            bufferEnd.add(";")
          } else if (!sourceSeen) {
            this.source.push('return "";')
          }
        } else {
          varDeclarations += ", buffer = " + (appendFirst ? "" : this.initializeBuffer());
          if (bufferStart) {
            bufferStart.prepend("return buffer + ");
            bufferEnd.add(";")
          } else {
            this.source.push("return buffer;")
          }
        }
        if (varDeclarations) {
          this.source.prepend("var " + varDeclarations.substring(2) + (appendFirst ? "" : ";\n"))
        }
        return this.source.merge()
      },
      lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
        return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim()
      },
      blockValue: function blockValue(name) {
        var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"),
          params = [this.contextName(0)];
        this.setupHelperArgs(name, 0, params);
        var blockName = this.popStack();
        params.splice(1, 0, blockName);
        this.push(this.source.functionCall(blockHelperMissing, "call", params))
      },
      ambiguousBlockValue: function ambiguousBlockValue() {
        var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"),
          params = [this.contextName(0)];
        this.setupHelperArgs("", 0, params, true);
        this.flushInline();
        var current = this.topStack();
        params.splice(1, 0, current);
        this.pushSource(["if (!", this.lastHelper, ") { ", current, " = ", this.source.functionCall(blockHelperMissing, "call", params), "}"])
      },
      appendContent: function appendContent(content) {
        if (this.pendingContent) {
          content = this.pendingContent + content
        } else {
          this.pendingLocation = this.source.currentLocation
        }
        this.pendingContent = content
      },
      append: function append() {
        if (this.isInline()) {
          this.replaceStack(function(current) {
            return [" != null ? ", current, ' : ""']
          });
          this.pushSource(this.appendToBuffer(this.popStack()))
        } else {
          var local = this.popStack();
          this.pushSource(["if (", local, " != null) { ", this.appendToBuffer(local, undefined, true), " }"]);
          if (this.environment.isSimple) {
            this.pushSource(["else { ", this.appendToBuffer("''", undefined, true), " }"])
          }
        }
      },
      appendEscaped: function appendEscaped() {
        this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]))
      },
      getContext: function getContext(depth) {
        this.lastContext = depth
      },
      pushContext: function pushContext() {
        this.pushStackLiteral(this.contextName(this.lastContext))
      },
      lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
        var i = 0;
        if (!scoped && this.options.compat && !this.lastContext) {
          this.push(this.depthedLookup(parts[i++]))
        } else {
          this.pushContext()
        }
        this.resolvePath("context", parts, i, falsy, strict)
      },
      lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
        this.useBlockParams = true;
        this.push(["blockParams[", blockParamId[0], "][", blockParamId[1], "]"]);
        this.resolvePath("context", parts, 1)
      },
      lookupData: function lookupData(depth, parts, strict) {
        if (!depth) {
          this.pushStackLiteral("data")
        } else {
          this.pushStackLiteral("container.data(data, " + depth + ")")
        }
        this.resolvePath("data", parts, 0, true, strict)
      },
      resolvePath: function resolvePath(type, parts, i, falsy, strict) {
        var _this2 = this;
        if (this.options.strict || this.options.assumeObjects) {
          this.push(strictLookup(this.options.strict && strict, this, parts, type));
          return
        }
        var len = parts.length;
        for (; i < len; i++) {
          this.replaceStack(function(current) {
            var lookup = _this2.nameLookup(current, parts[i], type);
            if (!falsy) {
              return [" != null ? ", lookup, " : ", current]
            } else {
              return [" && ", lookup]
            }
          })
        }
      },
      resolvePossibleLambda: function resolvePossibleLambda() {
        this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"])
      },
      pushStringParam: function pushStringParam(string, type) {
        this.pushContext();
        this.pushString(type);
        if (type !== "SubExpression") {
          if (typeof string === "string") {
            this.pushString(string)
          } else {
            this.pushStackLiteral(string)
          }
        }
      },
      emptyHash: function emptyHash(omitEmpty) {
        if (this.trackIds) {
          this.push("{}")
        }
        if (this.stringParams) {
          this.push("{}");
          this.push("{}")
        }
        this.pushStackLiteral(omitEmpty ? "undefined" : "{}")
      },
      pushHash: function pushHash() {
        if (this.hash) {
          this.hashes.push(this.hash)
        }
        this.hash = {
          values: {},
          types: [],
          contexts: [],
          ids: []
        }
      },
      popHash: function popHash() {
        var hash = this.hash;
        this.hash = this.hashes.pop();
        if (this.trackIds) {
          this.push(this.objectLiteral(hash.ids))
        }
        if (this.stringParams) {
          this.push(this.objectLiteral(hash.contexts));
          this.push(this.objectLiteral(hash.types))
        }
        this.push(this.objectLiteral(hash.values))
      },
      pushString: function pushString(string) {
        this.pushStackLiteral(this.quotedString(string))
      },
      pushLiteral: function pushLiteral(value) {
        this.pushStackLiteral(value)
      },
      pushProgram: function pushProgram(guid) {
        if (guid != null) {
          this.pushStackLiteral(this.programExpression(guid))
        } else {
          this.pushStackLiteral(null)
        }
      },
      registerDecorator: function registerDecorator(paramSize, name) {
        var foundDecorator = this.nameLookup("decorators", name, "decorator"),
          options = this.setupHelperArgs(name, paramSize);
        this.decorators.push(["fn = ", this.decorators.functionCall(foundDecorator, "", ["fn", "props", "container", options]), " || fn;"])
      },
      invokeHelper: function invokeHelper(paramSize, name, isSimple) {
        var nonHelper = this.popStack(),
          helper = this.setupHelper(paramSize, name);
        var possibleFunctionCalls = [];
        if (isSimple) {
          possibleFunctionCalls.push(helper.name)
        }
        possibleFunctionCalls.push(nonHelper);
        if (!this.options.strict) {
          possibleFunctionCalls.push(this.aliasable("container.hooks.helperMissing"))
        }
        var functionLookupCode = ["(", this.itemsSeparatedBy(possibleFunctionCalls, "||"), ")"];
        var functionCall = this.source.functionCall(functionLookupCode, "call", helper.callParams);
        this.push(functionCall)
      },
      itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
        var result = [];
        result.push(items[0]);
        for (var i = 1; i < items.length; i++) {
          result.push(separator, items[i])
        }
        return result
      },
      invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
        var helper = this.setupHelper(paramSize, name);
        this.push(this.source.functionCall(helper.name, "call", helper.callParams))
      },
      invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
        this.useRegister("helper");
        var nonHelper = this.popStack();
        this.emptyHash();
        var helper = this.setupHelper(0, name, helperCall);
        var helperName = this.lastHelper = this.nameLookup("helpers", name, "helper");
        var lookup = ["(", "(helper = ", helperName, " || ", nonHelper, ")"];
        if (!this.options.strict) {
          lookup[0] = "(helper = ";
          lookup.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"))
        }
        this.push(["(", lookup, helper.paramsInit ? ["),(", helper.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", helper.callParams), " : helper))"])
      },
      invokePartial: function invokePartial(isDynamic, name, indent) {
        var params = [],
          options = this.setupParams(name, 1, params);
        if (isDynamic) {
          name = this.popStack();
          delete options.name
        }
        if (indent) {
          options.indent = JSON.stringify(indent)
        }
        options.helpers = "helpers";
        options.partials = "partials";
        options.decorators = "container.decorators";
        if (!isDynamic) {
          params.unshift(this.nameLookup("partials", name, "partial"))
        } else {
          params.unshift(name)
        }
        if (this.options.compat) {
          options.depths = "depths"
        }
        options = this.objectLiteral(options);
        params.push(options);
        this.push(this.source.functionCall("container.invokePartial", "", params))
      },
      assignToHash: function assignToHash(key) {
        var value = this.popStack(),
          context = undefined,
          type = undefined,
          id = undefined;
        if (this.trackIds) {
          id = this.popStack()
        }
        if (this.stringParams) {
          type = this.popStack();
          context = this.popStack()
        }
        var hash = this.hash;
        if (context) {
          hash.contexts[key] = context
        }
        if (type) {
          hash.types[key] = type
        }
        if (id) {
          hash.ids[key] = id
        }
        hash.values[key] = value
      },
      pushId: function pushId(type, name, child) {
        if (type === "BlockParam") {
          this.pushStackLiteral("blockParams[" + name[0] + "].path[" + name[1] + "]" + (child ? " + " + JSON.stringify("." + child) : ""))
        } else if (type === "PathExpression") {
          this.pushString(name)
        } else if (type === "SubExpression") {
          this.pushStackLiteral("true")
        } else {
          this.pushStackLiteral("null")
        }
      },
      compiler: JavaScriptCompiler,
      compileChildren: function compileChildren(environment, options) {
        var children = environment.children,
          child = undefined,
          compiler = undefined;
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          compiler = new this.compiler;
          var existing = this.matchExistingProgram(child);
          if (existing == null) {
            this.context.programs.push("");
            var index = this.context.programs.length;
            child.index = index;
            child.name = "program" + index;
            this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
            this.context.decorators[index] = compiler.decorators;
            this.context.environments[index] = child;
            this.useDepths = this.useDepths || compiler.useDepths;
            this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
            child.useDepths = this.useDepths;
            child.useBlockParams = this.useBlockParams
          } else {
            child.index = existing.index;
            child.name = "program" + existing.index;
            this.useDepths = this.useDepths || existing.useDepths;
            this.useBlockParams = this.useBlockParams || existing.useBlockParams
          }
        }
      },
      matchExistingProgram: function matchExistingProgram(child) {
        for (var i = 0, len = this.context.environments.length; i < len; i++) {
          var environment = this.context.environments[i];
          if (environment && environment.equals(child)) {
            return environment
          }
        }
      },
      programExpression: function programExpression(guid) {
        var child = this.environment.children[guid],
          programParams = [child.index, "data", child.blockParams];
        if (this.useBlockParams || this.useDepths) {
          programParams.push("blockParams")
        }
        if (this.useDepths) {
          programParams.push("depths")
        }
        return "container.program(" + programParams.join(", ") + ")"
      },
      useRegister: function useRegister(name) {
        if (!this.registers[name]) {
          this.registers[name] = true;
          this.registers.list.push(name)
        }
      },
      push: function push(expr) {
        if (!(expr instanceof Literal)) {
          expr = this.source.wrap(expr)
        }
        this.inlineStack.push(expr);
        return expr
      },
      pushStackLiteral: function pushStackLiteral(item) {
        this.push(new Literal(item))
      },
      pushSource: function pushSource(source) {
        if (this.pendingContent) {
          this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
          this.pendingContent = undefined
        }
        if (source) {
          this.source.push(source)
        }
      },
      replaceStack: function replaceStack(callback) {
        var prefix = ["("],
          stack = undefined,
          createdStack = undefined,
          usedLiteral = undefined;
        if (!this.isInline()) {
          throw new _exception2["default"]("replaceStack on non-inline")
        }
        var top = this.popStack(true);
        if (top instanceof Literal) {
          stack = [top.value];
          prefix = ["(", stack];
          usedLiteral = true
        } else {
          createdStack = true;
          var _name = this.incrStack();
          prefix = ["((", this.push(_name), " = ", top, ")"];
          stack = this.topStack()
        }
        var item = callback.call(this, stack);
        if (!usedLiteral) {
          this.popStack()
        }
        if (createdStack) {
          this.stackSlot--
        }
        this.push(prefix.concat(item, ")"))
      },
      incrStack: function incrStack() {
        this.stackSlot++;
        if (this.stackSlot > this.stackVars.length) {
          this.stackVars.push("stack" + this.stackSlot)
        }
        return this.topStackName()
      },
      topStackName: function topStackName() {
        return "stack" + this.stackSlot
      },
      flushInline: function flushInline() {
        var inlineStack = this.inlineStack;
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry)
          } else {
            var stack = this.incrStack();
            this.pushSource([stack, " = ", entry, ";"]);
            this.compileStack.push(stack)
          }
        }
      },
      isInline: function isInline() {
        return this.inlineStack.length
      },
      popStack: function popStack(wrapped) {
        var inline = this.isInline(),
          item = (inline ? this.inlineStack : this.compileStack).pop();
        if (!wrapped && item instanceof Literal) {
          return item.value
        } else {
          if (!inline) {
            if (!this.stackSlot) {
              throw new _exception2["default"]("Invalid stack pop")
            }
            this.stackSlot--
          }
          return item
        }
      },
      topStack: function topStack() {
        var stack = this.isInline() ? this.inlineStack : this.compileStack,
          item = stack[stack.length - 1];
        if (item instanceof Literal) {
          return item.value
        } else {
          return item
        }
      },
      contextName: function contextName(context) {
        if (this.useDepths && context) {
          return "depths[" + context + "]"
        } else {
          return "depth" + context
        }
      },
      quotedString: function quotedString(str) {
        return this.source.quotedString(str)
      },
      objectLiteral: function objectLiteral(obj) {
        return this.source.objectLiteral(obj)
      },
      aliasable: function aliasable(name) {
        var ret = this.aliases[name];
        if (ret) {
          ret.referenceCount++;
          return ret
        }
        ret = this.aliases[name] = this.source.wrap(name);
        ret.aliasable = true;
        ret.referenceCount = 1;
        return ret
      },
      setupHelper: function setupHelper(paramSize, name, blockHelper) {
        var params = [],
          paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
        var foundHelper = this.nameLookup("helpers", name, "helper"),
          callContext = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
        return {
          params: params,
          paramsInit: paramsInit,
          name: foundHelper,
          callParams: [callContext].concat(params)
        }
      },
      setupParams: function setupParams(helper, paramSize, params) {
        var options = {},
          contexts = [],
          types = [],
          ids = [],
          objectArgs = !params,
          param = undefined;
        if (objectArgs) {
          params = []
        }
        options.name = this.quotedString(helper);
        options.hash = this.popStack();
        if (this.trackIds) {
          options.hashIds = this.popStack()
        }
        if (this.stringParams) {
          options.hashTypes = this.popStack();
          options.hashContexts = this.popStack()
        }
        var inverse = this.popStack(),
          program = this.popStack();
        if (program || inverse) {
          options.fn = program || "container.noop";
          options.inverse = inverse || "container.noop"
        }
        var i = paramSize;
        while (i--) {
          param = this.popStack();
          params[i] = param;
          if (this.trackIds) {
            ids[i] = this.popStack()
          }
          if (this.stringParams) {
            types[i] = this.popStack();
            contexts[i] = this.popStack()
          }
        }
        if (objectArgs) {
          options.args = this.source.generateArray(params)
        }
        if (this.trackIds) {
          options.ids = this.source.generateArray(ids)
        }
        if (this.stringParams) {
          options.types = this.source.generateArray(types);
          options.contexts = this.source.generateArray(contexts)
        }
        if (this.options.data) {
          options.data = "data"
        }
        if (this.useBlockParams) {
          options.blockParams = "blockParams"
        }
        return options
      },
      setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
        var options = this.setupParams(helper, paramSize, params);
        options.loc = JSON.stringify(this.source.currentLocation);
        options = this.objectLiteral(options);
        if (useRegister) {
          this.useRegister("options");
          params.push("options");
          return ["options=", options]
        } else if (params) {
          params.push(options);
          return ""
        } else {
          return options
        }
      }
    };
    (function() {
      var reservedWords = ("break else new var" + " case finally return void" + " catch for switch while" + " continue function this with" + " default if throw" + " delete in try" + " do instanceof typeof" + " abstract enum int short" + " boolean export interface static" + " byte extends long super" + " char final native synchronized" + " class float package throws" + " const goto private transient" + " debugger implements protected volatile" + " double import public let yield await" + " null true false").split(" ");
      var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
      for (var i = 0, l = reservedWords.length; i < l; i++) {
        compilerWords[reservedWords[i]] = true
      }
    })();
    JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
      return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)
    };

    function strictLookup(requireTerminal, compiler, parts, type) {
      var stack = compiler.popStack(),
        i = 0,
        len = parts.length;
      if (requireTerminal) {
        len--
      }
      for (; i < len; i++) {
        stack = compiler.nameLookup(stack, parts[i], type)
      }
      if (requireTerminal) {
        return [compiler.aliasable("container.strict"), "(", stack, ", ", compiler.quotedString(parts[i]), ", ", JSON.stringify(compiler.source.currentLocation), " )"]
      } else {
        return stack
      }
    }
    exports["default"] = JavaScriptCompiler;
    module.exports = exports["default"]
  }, function(module, exports, __webpack_require__) {
    "use strict";
    var _Object$keys = __webpack_require__(13)["default"];
    exports.__esModule = true;
    var _utils = __webpack_require__(5);
    var SourceNode = undefined;
    try {
      if (false) {
        var SourceMap = require("source-map");
        SourceNode = SourceMap.SourceNode
      }
    } catch (err) {}
    if (!SourceNode) {
      SourceNode = function(line, column, srcFile, chunks) {
        this.src = "";
        if (chunks) {
          this.add(chunks)
        }
      };
      SourceNode.prototype = {
        add: function add(chunks) {
          if (_utils.isArray(chunks)) {
            chunks = chunks.join("")
          }
          this.src += chunks
        },
        prepend: function prepend(chunks) {
          if (_utils.isArray(chunks)) {
            chunks = chunks.join("")
          }
          this.src = chunks + this.src
        },
        toStringWithSourceMap: function toStringWithSourceMap() {
          return {
            code: this.toString()
          }
        },
        toString: function toString() {
          return this.src
        }
      }
    }

    function castChunk(chunk, codeGen, loc) {
      if (_utils.isArray(chunk)) {
        var ret = [];
        for (var i = 0, len = chunk.length; i < len; i++) {
          ret.push(codeGen.wrap(chunk[i], loc))
        }
        return ret
      } else if (typeof chunk === "boolean" || typeof chunk === "number") {
        return chunk + ""
      }
      return chunk
    }

    function CodeGen(srcFile) {
      this.srcFile = srcFile;
      this.source = []
    }
    CodeGen.prototype = {
      isEmpty: function isEmpty() {
        return !this.source.length
      },
      prepend: function prepend(source, loc) {
        this.source.unshift(this.wrap(source, loc))
      },
      push: function push(source, loc) {
        this.source.push(this.wrap(source, loc))
      },
      merge: function merge() {
        var source = this.empty();
        this.each(function(line) {
          source.add(["  ", line, "\n"])
        });
        return source
      },
      each: function each(iter) {
        for (var i = 0, len = this.source.length; i < len; i++) {
          iter(this.source[i])
        }
      },
      empty: function empty() {
        var loc = this.currentLocation || {
          start: {}
        };
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile)
      },
      wrap: function wrap(chunk) {
        var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || {
          start: {}
        } : arguments[1];
        if (chunk instanceof SourceNode) {
          return chunk
        }
        chunk = castChunk(chunk, this, loc);
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk)
      },
      functionCall: function functionCall(fn, type, params) {
        params = this.generateList(params);
        return this.wrap([fn, type ? "." + type + "(" : "(", params, ")"])
      },
      quotedString: function quotedString(str) {
        return '"' + (str + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
      },
      objectLiteral: function objectLiteral(obj) {
        var _this = this;
        var pairs = [];
        _Object$keys(obj).forEach(function(key) {
          var value = castChunk(obj[key], _this);
          if (value !== "undefined") {
            pairs.push([_this.quotedString(key), ":", value])
          }
        });
        var ret = this.generateList(pairs);
        ret.prepend("{");
        ret.add("}");
        return ret
      },
      generateList: function generateList(entries) {
        var ret = this.empty();
        for (var i = 0, len = entries.length; i < len; i++) {
          if (i) {
            ret.add(",")
          }
          ret.add(castChunk(entries[i], this))
        }
        return ret
      },
      generateArray: function generateArray(entries) {
        var ret = this.generateList(entries);
        ret.prepend("[");
        ret.add("]");
        return ret
      }
    };
    exports["default"] = CodeGen;
    module.exports = exports["default"]
  }])
});
//# sourceMappingURL=mandatory.js.map
