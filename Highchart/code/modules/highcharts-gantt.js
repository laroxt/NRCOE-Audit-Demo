/*
 Highcharts Gantt JS v9.1.0 (2021-05-03)

 (c) 2017-2021 Lars Cabrera, Torstein Honsi, Jon Arild Nygard & Oystein Moseng

 License: www.highcharts.com/license
*/
(function (Y, P) {
  "object" === typeof module && module.exports
    ? ((P["default"] = P), (module.exports = Y.document ? P(Y) : P))
    : "function" === typeof define && define.amd
    ? define("highcharts/highcharts-gantt", function () {
        return P(Y);
      })
    : (Y.Highcharts && Y.Highcharts.error(16, !0), (Y.Highcharts = P(Y)));
})("undefined" !== typeof window ? window : this, function (Y) {
  function P(e, h, D, y) {
    e.hasOwnProperty(h) || (e[h] = y.apply(null, D));
  }
  var e = {};
  P(e, "Core/Globals.js", [], function () {
    var e = "undefined" !== typeof Y ? Y : "undefined" !== typeof window ? window : {},
      h;
    (function (h) {
      h.SVG_NS = "http://www.w3.org/2000/svg";
      h.product = "Highcharts";
      h.version = "9.1.0";
      h.win = e;
      h.doc = h.win.document;
      h.svg =
        h.doc && h.doc.createElementNS && !!h.doc.createElementNS(h.SVG_NS, "svg").createSVGRect;
      h.userAgent = (h.win.navigator && h.win.navigator.userAgent) || "";
      h.isChrome = -1 !== h.userAgent.indexOf("Chrome");
      h.isFirefox = -1 !== h.userAgent.indexOf("Firefox");
      h.isMS = /(edge|msie|trident)/i.test(h.userAgent) && !h.win.opera;
      h.isSafari = !h.isChrome && -1 !== h.userAgent.indexOf("Safari");
      h.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(h.userAgent);
      h.isWebKit = -1 !== h.userAgent.indexOf("AppleWebKit");
      h.deg2rad = (2 * Math.PI) / 360;
      h.hasBidiBug = h.isFirefox && 4 > parseInt(h.userAgent.split("Firefox/")[1], 10);
      h.hasTouch = !!h.win.TouchEvent;
      h.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
      h.noop = function () {};
      h.supportsPassiveEvents = (function () {
        var e = !1;
        if (!h.isMS) {
          var Q = Object.defineProperty({}, "passive", {
            get: function () {
              e = !0;
            },
          });
          h.win.addEventListener &&
            h.win.removeEventListener &&
            (h.win.addEventListener("testPassive", h.noop, Q),
            h.win.removeEventListener("testPassive", h.noop, Q));
        }
        return e;
      })();
      h.charts = [];
      h.dateFormats = {};
      h.seriesTypes = {};
      h.symbolSizes = {};
    })(h || (h = {}));
    return h;
  });
  P(e, "Core/Utilities.js", [e["Core/Globals.js"]], function (e) {
    function h(p, a, c, g) {
      var r = a ? "Highcharts error" : "Highcharts warning";
      32 === p && (p = r + ": Deprecated member");
      var v = z(p),
        L = v ? r + " #" + p + ": www.highcharts.com/errors/" + p + "/" : p.toString();
      if ("undefined" !== typeof g) {
        var H = "";
        v && (L += "?");
        d(g, function (x, p) {
          H += "\n - " + p + ": " + x;
          v && (L += encodeURI(p) + "=" + encodeURI(x));
        });
        L += H;
      }
      n(Highcharts, "displayError", { chart: c, code: p, message: L, params: g }, function () {
        if (a) throw Error(L);
        q.console && -1 === h.messages.indexOf(L) && console.warn(L);
      });
      h.messages.push(L);
    }
    function Q(p, a) {
      var c = {};
      d(p, function (r, g) {
        if (C(p[g], !0) && !p.nodeType && a[g])
          (r = Q(p[g], a[g])), Object.keys(r).length && (c[g] = r);
        else if (C(p[g]) || p[g] !== a[g]) c[g] = p[g];
      });
      return c;
    }
    function y(p, a) {
      return parseInt(p, a || 10);
    }
    function F(p) {
      return "string" === typeof p;
    }
    function E(p) {
      p = Object.prototype.toString.call(p);
      return "[object Array]" === p || "[object Array Iterator]" === p;
    }
    function C(p, a) {
      return !!p && "object" === typeof p && (!a || !E(p));
    }
    function G(p) {
      return C(p) && "number" === typeof p.nodeType;
    }
    function t(p) {
      var a = p && p.constructor;
      return !(!C(p, !0) || G(p) || !a || !a.name || "Object" === a.name);
    }
    function z(p) {
      return "number" === typeof p && !isNaN(p) && Infinity > p && -Infinity < p;
    }
    function m(p) {
      return "undefined" !== typeof p && null !== p;
    }
    function f(p, a, c) {
      var r;
      F(a)
        ? m(c)
          ? p.setAttribute(a, c)
          : p &&
            p.getAttribute &&
            ((r = p.getAttribute(a)) || "class" !== a || (r = p.getAttribute(a + "Name")))
        : d(a, function (a, c) {
            p.setAttribute(c, a);
          });
      return r;
    }
    function b(p, a) {
      var c;
      p || (p = {});
      for (c in a) p[c] = a[c];
      return p;
    }
    function A() {
      for (var p = arguments, a = p.length, c = 0; c < a; c++) {
        var g = p[c];
        if ("undefined" !== typeof g && null !== g) return g;
      }
    }
    function u(p, a) {
      e.isMS &&
        !e.svg &&
        a &&
        "undefined" !== typeof a.opacity &&
        (a.filter = "alpha(opacity=" + 100 * a.opacity + ")");
      b(p.style, a);
    }
    function l(a, r, g, v, d) {
      a = c.createElement(a);
      r && b(a, r);
      d && u(a, { padding: "0", border: "none", margin: "0" });
      g && u(a, g);
      v && v.appendChild(a);
      return a;
    }
    function I(a, c) {
      return parseFloat(a.toPrecision(c || 14));
    }
    function k(a, c, g) {
      var p = e.getStyle || k;
      if ("width" === c)
        return (
          (c = Math.min(a.offsetWidth, a.scrollWidth)),
          (g = a.getBoundingClientRect && a.getBoundingClientRect().width),
          g < c && g >= c - 1 && (c = Math.floor(g)),
          Math.max(0, c - (p(a, "padding-left", !0) || 0) - (p(a, "padding-right", !0) || 0))
        );
      if ("height" === c)
        return Math.max(
          0,
          Math.min(a.offsetHeight, a.scrollHeight) -
            (p(a, "padding-top", !0) || 0) -
            (p(a, "padding-bottom", !0) || 0)
        );
      q.getComputedStyle || h(27, !0);
      if ((a = q.getComputedStyle(a, void 0))) {
        var r = a.getPropertyValue(c);
        A(g, "opacity" !== c) && (r = y(r));
      }
      return r;
    }
    function d(a, c, g) {
      for (var p in a) Object.hasOwnProperty.call(a, p) && c.call(g || a[p], a[p], p, a);
    }
    function w(a, c, g) {
      function p(H, x) {
        var c = a.removeEventListener || e.removeEventListenerPolyfill;
        c && c.call(a, H, x, !1);
      }
      function r(H) {
        var x;
        if (a.nodeName) {
          if (c) {
            var g = {};
            g[c] = !0;
          } else g = H;
          d(g, function (a, c) {
            if (H[c]) for (x = H[c].length; x--; ) p(c, H[c][x].fn);
          });
        }
      }
      var q = ("function" === typeof a && a.prototype) || a;
      if (Object.hasOwnProperty.call(q, "hcEvents")) {
        var L = q.hcEvents;
        c
          ? ((q = L[c] || []),
            g
              ? ((L[c] = q.filter(function (H) {
                  return g !== H.fn;
                })),
                p(c, g))
              : (r(L), (L[c] = [])))
          : (r(L), delete q.hcEvents);
      }
    }
    function n(a, g, d, v) {
      d = d || {};
      if (c.createEvent && (a.dispatchEvent || (a.fireEvent && a !== e))) {
        var p = c.createEvent("Events");
        p.initEvent(g, !0, !0);
        d = b(p, d);
        a.dispatchEvent ? a.dispatchEvent(d) : a.fireEvent(g, d);
      } else if (a.hcEvents) {
        d.target ||
          b(d, {
            preventDefault: function () {
              d.defaultPrevented = !0;
            },
            target: a,
            type: g,
          });
        p = [];
        for (var r = a, L = !1; r.hcEvents; )
          Object.hasOwnProperty.call(r, "hcEvents") &&
            r.hcEvents[g] &&
            (p.length && (L = !0), p.unshift.apply(p, r.hcEvents[g])),
            (r = Object.getPrototypeOf(r));
        L &&
          p.sort(function (H, x) {
            return H.order - x.order;
          });
        p.forEach(function (H) {
          !1 === H.fn.call(a, d) && d.preventDefault();
        });
      }
      v && !d.defaultPrevented && v.call(a, d);
    }
    var g = e.charts,
      c = e.doc,
      q = e.win;
    ("");
    (h || (h = {})).messages = [];
    var a;
    Math.easeInOutSine = function (a) {
      return -0.5 * (Math.cos(Math.PI * a) - 1);
    };
    var B = Array.prototype.find
      ? function (a, c) {
          return a.find(c);
        }
      : function (a, c) {
          var p,
            g = a.length;
          for (p = 0; p < g; p++) if (c(a[p], p)) return a[p];
        };
    d(
      { map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" },
      function (a, c) {
        e[c] = function (p) {
          var g;
          h(32, !1, void 0, ((g = {}), (g["Highcharts." + c] = "use Array." + a), g));
          return Array.prototype[a].apply(p, [].slice.call(arguments, 1));
        };
      }
    );
    var J,
      O = (function () {
        var a = Math.random().toString(36).substring(2, 9) + "-",
          c = 0;
        return function () {
          return "highcharts-" + (J ? "" : a) + c++;
        };
      })();
    q.jQuery &&
      (q.jQuery.fn.highcharts = function () {
        var a = [].slice.call(arguments);
        if (this[0])
          return a[0]
            ? (new e[F(a[0]) ? a.shift() : "Chart"](this[0], a[0], a[1]), this)
            : g[f(this[0], "data-highcharts-chart")];
      });
    return {
      addEvent: function (a, c, g, d) {
        void 0 === d && (d = {});
        var p = ("function" === typeof a && a.prototype) || a;
        Object.hasOwnProperty.call(p, "hcEvents") || (p.hcEvents = {});
        p = p.hcEvents;
        e.Point &&
          a instanceof e.Point &&
          a.series &&
          a.series.chart &&
          (a.series.chart.runTrackerClick = !0);
        var r = a.addEventListener || e.addEventListenerPolyfill;
        r &&
          r.call(
            a,
            c,
            g,
            e.supportsPassiveEvents
              ? {
                  passive: void 0 === d.passive ? -1 !== c.indexOf("touch") : d.passive,
                  capture: !1,
                }
              : !1
          );
        p[c] || (p[c] = []);
        p[c].push({ fn: g, order: "number" === typeof d.order ? d.order : Infinity });
        p[c].sort(function (a, H) {
          return a.order - H.order;
        });
        return function () {
          w(a, c, g);
        };
      },
      arrayMax: function (a) {
        for (var c = a.length, p = a[0]; c--; ) a[c] > p && (p = a[c]);
        return p;
      },
      arrayMin: function (a) {
        for (var c = a.length, p = a[0]; c--; ) a[c] < p && (p = a[c]);
        return p;
      },
      attr: f,
      clamp: function (a, c, g) {
        return a > c ? (a < g ? a : g) : c;
      },
      cleanRecursively: Q,
      clearTimeout: function (a) {
        m(a) && clearTimeout(a);
      },
      correctFloat: I,
      createElement: l,
      css: u,
      defined: m,
      destroyObjectProperties: function (a, c) {
        d(a, function (g, p) {
          g && g !== c && g.destroy && g.destroy();
          delete a[p];
        });
      },
      discardElement: function (c) {
        a || (a = l("div"));
        c && a.appendChild(c);
        a.innerHTML = "";
      },
      erase: function (a, c) {
        for (var g = a.length; g--; )
          if (a[g] === c) {
            a.splice(g, 1);
            break;
          }
      },
      error: h,
      extend: b,
      extendClass: function (a, c) {
        var g = function () {};
        g.prototype = new a();
        b(g.prototype, c);
        return g;
      },
      find: B,
      fireEvent: n,
      getMagnitude: function (a) {
        return Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
      },
      getNestedProperty: function (a, c) {
        for (a = a.split("."); a.length && m(c); ) {
          var g = a.shift();
          if ("undefined" === typeof g || "__proto__" === g) return;
          c = c[g];
          if (!m(c) || "function" === typeof c || "number" === typeof c.nodeType || c === q) return;
        }
        return c;
      },
      getStyle: k,
      inArray: function (a, c, g) {
        h(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" });
        return c.indexOf(a, g);
      },
      isArray: E,
      isClass: t,
      isDOMElement: G,
      isFunction: function (a) {
        return "function" === typeof a;
      },
      isNumber: z,
      isObject: C,
      isString: F,
      keys: function (a) {
        h(32, !1, void 0, { "Highcharts.keys": "use Object.keys" });
        return Object.keys(a);
      },
      merge: function () {
        var a,
          c = arguments,
          g = {},
          q = function (a, c) {
            "object" !== typeof a && (a = {});
            d(c, function (H, x) {
              "__proto__" !== x &&
                "constructor" !== x &&
                (!C(H, !0) || t(H) || G(H) ? (a[x] = c[x]) : (a[x] = q(a[x] || {}, H)));
            });
            return a;
          };
        !0 === c[0] && ((g = c[1]), (c = Array.prototype.slice.call(c, 2)));
        var b = c.length;
        for (a = 0; a < b; a++) g = q(g, c[a]);
        return g;
      },
      normalizeTickInterval: function (a, c, g, d, q) {
        var p = a;
        g = A(g, 1);
        var L = a / g;
        c ||
          ((c = q ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10]),
          !1 === d &&
            (1 === g
              ? (c = c.filter(function (a) {
                  return 0 === a % 1;
                }))
              : 0.1 >= g && (c = [1 / g])));
        for (
          d = 0;
          d < c.length &&
          !((p = c[d]), (q && p * g >= a) || (!q && L <= (c[d] + (c[d + 1] || c[d])) / 2));
          d++
        );
        return (p = I(p * g, -Math.round(Math.log(0.001) / Math.LN10)));
      },
      objectEach: d,
      offset: function (a) {
        var g = c.documentElement;
        a =
          a.parentElement || a.parentNode
            ? a.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };
        return {
          top: a.top + (q.pageYOffset || g.scrollTop) - (g.clientTop || 0),
          left: a.left + (q.pageXOffset || g.scrollLeft) - (g.clientLeft || 0),
          width: a.width,
          height: a.height,
        };
      },
      pad: function (a, c, g) {
        return Array((c || 2) + 1 - String(a).replace("-", "").length).join(g || "0") + a;
      },
      pick: A,
      pInt: y,
      relativeLength: function (a, c, g) {
        return /%$/.test(a) ? (c * parseFloat(a)) / 100 + (g || 0) : parseFloat(a);
      },
      removeEvent: w,
      splat: function (a) {
        return E(a) ? a : [a];
      },
      stableSort: function (a, c) {
        var g = a.length,
          d,
          p;
        for (p = 0; p < g; p++) a[p].safeI = p;
        a.sort(function (a, g) {
          d = c(a, g);
          return 0 === d ? a.safeI - g.safeI : d;
        });
        for (p = 0; p < g; p++) delete a[p].safeI;
      },
      syncTimeout: function (a, c, g) {
        if (0 < c) return setTimeout(a, c, g);
        a.call(0, g);
        return -1;
      },
      timeUnits: {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5,
      },
      uniqueKey: O,
      useSerialIds: function (a) {
        return (J = A(a, J));
      },
      wrap: function (a, c, g) {
        var d = a[c];
        a[c] = function () {
          var a = Array.prototype.slice.call(arguments),
            c = arguments,
            L = this;
          L.proceed = function () {
            d.apply(L, arguments.length ? arguments : c);
          };
          a.unshift(d);
          a = g.apply(this, a);
          L.proceed = null;
          return a;
        };
      },
    };
  });
  P(e, "Core/Color/Color.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, h) {
    var Q = h.isNumber,
      y = h.merge,
      F = h.pInt;
    ("");
    h = (function () {
      function h(C) {
        this.parsers = [
          {
            regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
            parse: function (h) {
              return [F(h[1]), F(h[2]), F(h[3]), parseFloat(h[4], 10)];
            },
          },
          {
            regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            parse: function (h) {
              return [F(h[1]), F(h[2]), F(h[3]), 1];
            },
          },
        ];
        this.rgba = [];
        if (e.Color !== h) return new e.Color(C);
        if (!(this instanceof h)) return new h(C);
        this.init(C);
      }
      h.parse = function (e) {
        return new h(e);
      };
      h.prototype.init = function (e) {
        var G, t;
        if ((this.input = e = h.names[e && e.toLowerCase ? e.toLowerCase() : ""] || e) && e.stops)
          this.stops = e.stops.map(function (f) {
            return new h(f[1]);
          });
        else {
          if (e && e.charAt && "#" === e.charAt()) {
            var z = e.length;
            e = parseInt(e.substr(1), 16);
            7 === z
              ? (G = [(e & 16711680) >> 16, (e & 65280) >> 8, e & 255, 1])
              : 4 === z &&
                (G = [
                  ((e & 3840) >> 4) | ((e & 3840) >> 8),
                  ((e & 240) >> 4) | (e & 240),
                  ((e & 15) << 4) | (e & 15),
                  1,
                ]);
          }
          if (!G)
            for (t = this.parsers.length; t-- && !G; ) {
              var m = this.parsers[t];
              (z = m.regex.exec(e)) && (G = m.parse(z));
            }
        }
        this.rgba = G || [];
      };
      h.prototype.get = function (h) {
        var e = this.input,
          t = this.rgba;
        if ("undefined" !== typeof this.stops) {
          var z = y(e);
          z.stops = [].concat(z.stops);
          this.stops.forEach(function (m, f) {
            z.stops[f] = [z.stops[f][0], m.get(h)];
          });
        } else
          z =
            t && Q(t[0])
              ? "rgb" === h || (!h && 1 === t[3])
                ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"
                : "a" === h
                ? t[3]
                : "rgba(" + t.join(",") + ")"
              : e;
        return z;
      };
      h.prototype.brighten = function (h) {
        var e,
          t = this.rgba;
        if (this.stops)
          this.stops.forEach(function (t) {
            t.brighten(h);
          });
        else if (Q(h) && 0 !== h)
          for (e = 0; 3 > e; e++)
            (t[e] += F(255 * h)), 0 > t[e] && (t[e] = 0), 255 < t[e] && (t[e] = 255);
        return this;
      };
      h.prototype.setOpacity = function (h) {
        this.rgba[3] = h;
        return this;
      };
      h.prototype.tweenTo = function (h, e) {
        var t = this.rgba,
          z = h.rgba;
        z.length && t && t.length
          ? ((h = 1 !== z[3] || 1 !== t[3]),
            (e =
              (h ? "rgba(" : "rgb(") +
              Math.round(z[0] + (t[0] - z[0]) * (1 - e)) +
              "," +
              Math.round(z[1] + (t[1] - z[1]) * (1 - e)) +
              "," +
              Math.round(z[2] + (t[2] - z[2]) * (1 - e)) +
              (h ? "," + (z[3] + (t[3] - z[3]) * (1 - e)) : "") +
              ")"))
          : (e = h.input || "none");
        return e;
      };
      h.names = { white: "#ffffff", black: "#000000" };
      return h;
    })();
    e.Color = h;
    e.color = h.parse;
    return h;
  });
  P(e, "Core/Color/Palette.js", [], function () {
    return {
      colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(
        " "
      ),
      backgroundColor: "#ffffff",
      neutralColor100: "#000000",
      neutralColor80: "#333333",
      neutralColor60: "#666666",
      neutralColor40: "#999999",
      neutralColor20: "#cccccc",
      neutralColor10: "#e6e6e6",
      neutralColor5: "#f2f2f2",
      neutralColor3: "#f7f7f7",
      highlightColor100: "#003399",
      highlightColor80: "#335cad",
      highlightColor60: "#6685c2",
      highlightColor20: "#ccd6eb",
      highlightColor10: "#e6ebf5",
      positiveColor: "#06b535",
      negativeColor: "#f21313",
    };
  });
  P(e, "Core/Time.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, h) {
    var Q = e.win,
      y = h.defined,
      F = h.error,
      E = h.extend,
      C = h.isObject,
      G = h.merge,
      t = h.objectEach,
      z = h.pad,
      m = h.pick,
      f = h.splat,
      b = h.timeUnits;
    ("");
    h = (function () {
      function A(b) {
        this.options = {};
        this.variableTimezone = this.useUTC = !1;
        this.Date = Q.Date;
        this.getTimezoneOffset = this.timezoneOffsetFunction();
        this.update(b);
      }
      A.prototype.get = function (b, l) {
        if (this.variableTimezone || this.timezoneOffset) {
          var I = l.getTime(),
            k = I - this.getTimezoneOffset(l);
          l.setTime(k);
          b = l["getUTC" + b]();
          l.setTime(I);
          return b;
        }
        return this.useUTC ? l["getUTC" + b]() : l["get" + b]();
      };
      A.prototype.set = function (b, l, I) {
        if (this.variableTimezone || this.timezoneOffset) {
          if (
            "Milliseconds" === b ||
            "Seconds" === b ||
            ("Minutes" === b && 0 === this.getTimezoneOffset(l) % 36e5)
          )
            return l["setUTC" + b](I);
          var k = this.getTimezoneOffset(l);
          k = l.getTime() - k;
          l.setTime(k);
          l["setUTC" + b](I);
          b = this.getTimezoneOffset(l);
          k = l.getTime() + b;
          return l.setTime(k);
        }
        return this.useUTC ? l["setUTC" + b](I) : l["set" + b](I);
      };
      A.prototype.update = function (b) {
        var l = m(b && b.useUTC, !0);
        this.options = b = G(!0, this.options || {}, b);
        this.Date = b.Date || Q.Date || Date;
        this.timezoneOffset = (this.useUTC = l) && b.timezoneOffset;
        this.getTimezoneOffset = this.timezoneOffsetFunction();
        this.variableTimezone = l && !(!b.getTimezoneOffset && !b.timezone);
      };
      A.prototype.makeTime = function (b, l, I, k, d, w) {
        if (this.useUTC) {
          var n = this.Date.UTC.apply(0, arguments);
          var g = this.getTimezoneOffset(n);
          n += g;
          var c = this.getTimezoneOffset(n);
          g !== c
            ? (n += c - g)
            : g - 36e5 !== this.getTimezoneOffset(n - 36e5) || e.isSafari || (n -= 36e5);
        } else n = new this.Date(b, l, m(I, 1), m(k, 0), m(d, 0), m(w, 0)).getTime();
        return n;
      };
      A.prototype.timezoneOffsetFunction = function () {
        var b = this,
          l = this.options,
          I = l.moment || Q.moment;
        if (!this.useUTC)
          return function (b) {
            return 6e4 * new Date(b.toString()).getTimezoneOffset();
          };
        if (l.timezone) {
          if (I)
            return function (b) {
              return 6e4 * -I.tz(b, l.timezone).utcOffset();
            };
          F(25);
        }
        return this.useUTC && l.getTimezoneOffset
          ? function (b) {
              return 6e4 * l.getTimezoneOffset(b.valueOf());
            }
          : function () {
              return 6e4 * (b.timezoneOffset || 0);
            };
      };
      A.prototype.dateFormat = function (b, l, I) {
        if (!y(l) || isNaN(l))
          return (e.defaultOptions.lang && e.defaultOptions.lang.invalidDate) || "";
        b = m(b, "%Y-%m-%d %H:%M:%S");
        var k = this,
          d = new this.Date(l),
          w = this.get("Hours", d),
          n = this.get("Day", d),
          g = this.get("Date", d),
          c = this.get("Month", d),
          q = this.get("FullYear", d),
          a = e.defaultOptions.lang,
          B = a && a.weekdays,
          J = a && a.shortWeekdays;
        d = E(
          {
            a: J ? J[n] : B[n].substr(0, 3),
            A: B[n],
            d: z(g),
            e: z(g, 2, " "),
            w: n,
            b: a.shortMonths[c],
            B: a.months[c],
            m: z(c + 1),
            o: c + 1,
            y: q.toString().substr(2, 2),
            Y: q,
            H: z(w),
            k: w,
            I: z(w % 12 || 12),
            l: w % 12 || 12,
            M: z(this.get("Minutes", d)),
            p: 12 > w ? "AM" : "PM",
            P: 12 > w ? "am" : "pm",
            S: z(d.getSeconds()),
            L: z(Math.floor(l % 1e3), 3),
          },
          e.dateFormats
        );
        t(d, function (a, c) {
          for (; -1 !== b.indexOf("%" + c); )
            b = b.replace("%" + c, "function" === typeof a ? a.call(k, l) : a);
        });
        return I ? b.substr(0, 1).toUpperCase() + b.substr(1) : b;
      };
      A.prototype.resolveDTLFormat = function (b) {
        return C(b, !0) ? b : ((b = f(b)), { main: b[0], from: b[1], to: b[2] });
      };
      A.prototype.getTimeTicks = function (f, l, I, k) {
        var d = this,
          w = [],
          n = {};
        var g = new d.Date(l);
        var c = f.unitRange,
          q = f.count || 1,
          a;
        k = m(k, 1);
        if (y(l)) {
          d.set(
            "Milliseconds",
            g,
            c >= b.second ? 0 : q * Math.floor(d.get("Milliseconds", g) / q)
          );
          c >= b.second &&
            d.set("Seconds", g, c >= b.minute ? 0 : q * Math.floor(d.get("Seconds", g) / q));
          c >= b.minute &&
            d.set("Minutes", g, c >= b.hour ? 0 : q * Math.floor(d.get("Minutes", g) / q));
          c >= b.hour && d.set("Hours", g, c >= b.day ? 0 : q * Math.floor(d.get("Hours", g) / q));
          c >= b.day &&
            d.set("Date", g, c >= b.month ? 1 : Math.max(1, q * Math.floor(d.get("Date", g) / q)));
          if (c >= b.month) {
            d.set("Month", g, c >= b.year ? 0 : q * Math.floor(d.get("Month", g) / q));
            var B = d.get("FullYear", g);
          }
          c >= b.year && d.set("FullYear", g, B - (B % q));
          c === b.week &&
            ((B = d.get("Day", g)), d.set("Date", g, d.get("Date", g) - B + k + (B < k ? -7 : 0)));
          B = d.get("FullYear", g);
          k = d.get("Month", g);
          var J = d.get("Date", g),
            O = d.get("Hours", g);
          l = g.getTime();
          (!d.variableTimezone && d.useUTC) ||
            !y(I) ||
            (a = I - l > 4 * b.month || d.getTimezoneOffset(l) !== d.getTimezoneOffset(I));
          l = g.getTime();
          for (g = 1; l < I; )
            w.push(l),
              (l =
                c === b.year
                  ? d.makeTime(B + g * q, 0)
                  : c === b.month
                  ? d.makeTime(B, k + g * q)
                  : !a || (c !== b.day && c !== b.week)
                  ? a && c === b.hour && 1 < q
                    ? d.makeTime(B, k, J, O + g * q)
                    : l + c * q
                  : d.makeTime(B, k, J + g * q * (c === b.day ? 1 : 7))),
              g++;
          w.push(l);
          c <= b.hour &&
            1e4 > w.length &&
            w.forEach(function (a) {
              0 === a % 18e5 && "000000000" === d.dateFormat("%H%M%S%L", a) && (n[a] = "day");
            });
        }
        w.info = E(f, { higherRanks: n, totalRange: c * q });
        return w;
      };
      return A;
    })();
    e.Time = h;
    return e.Time;
  });
  P(
    e,
    "Core/Options.js",
    [
      e["Core/Globals.js"],
      e["Core/Color/Color.js"],
      e["Core/Color/Palette.js"],
      e["Core/Time.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F) {
      var Q = e.isTouchDevice,
        C = e.svg;
      h = h.parse;
      var G = F.merge;
      ("");
      var t = {
        colors: D.colors,
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
          loading: "Loading...",
          months: "January February March April May June July August September October November December".split(
            " "
          ),
          shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
          weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
          decimalPoint: ".",
          numericSymbols: "kMGTPE".split(""),
          resetZoom: "Reset zoom",
          resetZoomTitle: "Reset zoom level 1:1",
          thousandsSep: " ",
        },
        global: {},
        time: {
          Date: void 0,
          getTimezoneOffset: void 0,
          timezone: void 0,
          timezoneOffset: 0,
          useUTC: !0,
        },
        chart: {
          panning: { enabled: !1, type: "x" },
          styledMode: !1,
          borderRadius: 0,
          colorCount: 10,
          defaultSeriesType: "line",
          ignoreHiddenSeries: !0,
          spacing: [10, 10, 15, 10],
          resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } },
          zoomBySingleTouch: !1,
          width: null,
          height: null,
          borderColor: D.highlightColor80,
          backgroundColor: D.backgroundColor,
          plotBorderColor: D.neutralColor20,
        },
        title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 },
        subtitle: { text: "", align: "center", widthAdjust: -44 },
        caption: { margin: 15, text: "", align: "left", verticalAlign: "bottom" },
        plotOptions: {},
        labels: { style: { position: "absolute", color: D.neutralColor80 } },
        legend: {
          enabled: !0,
          align: "center",
          alignColumns: !0,
          layout: "horizontal",
          labelFormatter: function () {
            return this.name;
          },
          borderColor: D.neutralColor40,
          borderRadius: 0,
          navigation: { activeColor: D.highlightColor100, inactiveColor: D.neutralColor20 },
          itemStyle: {
            color: D.neutralColor80,
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            textOverflow: "ellipsis",
          },
          itemHoverStyle: { color: D.neutralColor100 },
          itemHiddenStyle: { color: D.neutralColor20 },
          shadow: !1,
          itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" },
          squareSymbol: !0,
          symbolPadding: 5,
          verticalAlign: "bottom",
          x: 0,
          y: 0,
          title: { style: { fontWeight: "bold" } },
        },
        loading: {
          labelStyle: { fontWeight: "bold", position: "relative", top: "45%" },
          style: {
            position: "absolute",
            backgroundColor: D.backgroundColor,
            opacity: 0.5,
            textAlign: "center",
          },
        },
        tooltip: {
          enabled: !0,
          animation: C,
          borderRadius: 3,
          dateTimeLabelFormats: {
            millisecond: "%A, %b %e, %H:%M:%S.%L",
            second: "%A, %b %e, %H:%M:%S",
            minute: "%A, %b %e, %H:%M",
            hour: "%A, %b %e, %H:%M",
            day: "%A, %b %e, %Y",
            week: "Week from %A, %b %e, %Y",
            month: "%B %Y",
            year: "%Y",
          },
          footerFormat: "",
          padding: 8,
          snap: Q ? 25 : 10,
          headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
          pointFormat:
            '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
          backgroundColor: h(D.neutralColor3).setOpacity(0.85).get(),
          borderWidth: 1,
          shadow: !0,
          style: {
            color: D.neutralColor80,
            cursor: "default",
            fontSize: "12px",
            whiteSpace: "nowrap",
          },
        },
        credits: {
          enabled: !0,
          href: "https://www.highcharts.com?credits",
          position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 },
          style: { cursor: "pointer", color: D.neutralColor40, fontSize: "9px" },
          text: "Highcharts.com",
        },
      };
      t.chart.styledMode = !1;
      ("");
      var z = new y(G(t.global, t.time));
      return {
        defaultOptions: t,
        defaultTime: z,
        getOptions: function () {
          return t;
        },
        setOptions: function (m) {
          G(!0, t, m);
          if (m.time || m.global)
            e.time ? e.time.update(G(t.global, t.time, m.global, m.time)) : (e.time = z);
          return t;
        },
      };
    }
  );
  P(
    e,
    "Core/Animation/Fx.js",
    [e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      var Q = e.parse,
        F = h.win,
        E = D.isNumber,
        C = D.objectEach;
      return (function () {
        function h(t, z, m) {
          this.pos = NaN;
          this.options = z;
          this.elem = t;
          this.prop = m;
        }
        h.prototype.dSetter = function () {
          var t = this.paths,
            z = t && t[0];
          t = t && t[1];
          var m = this.now || 0,
            f = [];
          if (1 !== m && z && t)
            if (z.length === t.length && 1 > m)
              for (var b = 0; b < t.length; b++) {
                for (var A = z[b], u = t[b], l = [], I = 0; I < u.length; I++) {
                  var k = A[I],
                    d = u[I];
                  E(k) && E(d) && ("A" !== u[0] || (4 !== I && 5 !== I))
                    ? (l[I] = k + m * (d - k))
                    : (l[I] = d);
                }
                f.push(l);
              }
            else f = t;
          else f = this.toD || [];
          this.elem.attr("d", f, void 0, !0);
        };
        h.prototype.update = function () {
          var t = this.elem,
            z = this.prop,
            m = this.now,
            f = this.options.step;
          if (this[z + "Setter"]) this[z + "Setter"]();
          else t.attr ? t.element && t.attr(z, m, null, !0) : (t.style[z] = m + this.unit);
          f && f.call(t, m, this);
        };
        h.prototype.run = function (t, z, m) {
          var f = this,
            b = f.options,
            A = function (b) {
              return A.stopped ? !1 : f.step(b);
            },
            u =
              F.requestAnimationFrame ||
              function (b) {
                setTimeout(b, 13);
              },
            l = function () {
              for (var b = 0; b < h.timers.length; b++) h.timers[b]() || h.timers.splice(b--, 1);
              h.timers.length && u(l);
            };
          t !== z || this.elem["forceAnimate:" + this.prop]
            ? ((this.startTime = +new Date()),
              (this.start = t),
              (this.end = z),
              (this.unit = m),
              (this.now = this.start),
              (this.pos = 0),
              (A.elem = this.elem),
              (A.prop = this.prop),
              A() && 1 === h.timers.push(A) && u(l))
            : (delete b.curAnim[this.prop],
              b.complete && 0 === Object.keys(b.curAnim).length && b.complete.call(this.elem));
        };
        h.prototype.step = function (t) {
          var z = +new Date(),
            m = this.options,
            f = this.elem,
            b = m.complete,
            A = m.duration,
            u = m.curAnim;
          if (f.attr && !f.element) t = !1;
          else if (t || z >= A + this.startTime) {
            this.now = this.end;
            this.pos = 1;
            this.update();
            var l = (u[this.prop] = !0);
            C(u, function (b) {
              !0 !== b && (l = !1);
            });
            l && b && b.call(f);
            t = !1;
          } else
            (this.pos = m.easing((z - this.startTime) / A)),
              (this.now = this.start + (this.end - this.start) * this.pos),
              this.update(),
              (t = !0);
          return t;
        };
        h.prototype.initPath = function (t, z, m) {
          function f(b, g) {
            for (; b.length < w; ) {
              var c = b[0],
                d = g[w - b.length];
              d &&
                "M" === c[0] &&
                (b[0] =
                  "C" === d[0] ? ["C", c[1], c[2], c[1], c[2], c[1], c[2]] : ["L", c[1], c[2]]);
              b.unshift(c);
              l && ((c = b.pop()), b.push(b[b.length - 1], c));
            }
          }
          function b(b, g) {
            for (; b.length < w; )
              if (
                ((g = b[Math.floor(b.length / I) - 1].slice()),
                "C" === g[0] && ((g[1] = g[5]), (g[2] = g[6])),
                l)
              ) {
                var c = b[Math.floor(b.length / I)].slice();
                b.splice(b.length / 2, 0, g, c);
              } else b.push(g);
          }
          var A = t.startX,
            u = t.endX;
          m = m.slice();
          var l = t.isArea,
            I = l ? 2 : 1;
          z = z && z.slice();
          if (!z) return [m, m];
          if (A && u && u.length) {
            for (t = 0; t < A.length; t++)
              if (A[t] === u[0]) {
                var k = t;
                break;
              } else if (A[0] === u[u.length - A.length + t]) {
                k = t;
                var d = !0;
                break;
              } else if (A[A.length - 1] === u[u.length - A.length + t]) {
                k = A.length - t;
                break;
              }
            "undefined" === typeof k && (z = []);
          }
          if (z.length && E(k)) {
            var w = m.length + k * I;
            d ? (f(z, m), b(m, z)) : (f(m, z), b(z, m));
          }
          return [z, m];
        };
        h.prototype.fillSetter = function () {
          h.prototype.strokeSetter.apply(this, arguments);
        };
        h.prototype.strokeSetter = function () {
          this.elem.attr(this.prop, Q(this.start).tweenTo(Q(this.end), this.pos), null, !0);
        };
        h.timers = [];
        return h;
      })();
    }
  );
  P(
    e,
    "Core/Animation/AnimationUtilities.js",
    [e["Core/Animation/Fx.js"], e["Core/Utilities.js"]],
    function (e, h) {
      function Q(b) {
        return t(b) ? z({ duration: 500, defer: 0 }, b) : { duration: b ? 500 : 0, defer: 0 };
      }
      function y(b, f) {
        for (var u = e.timers.length; u--; )
          e.timers[u].elem !== b || (f && f !== e.timers[u].prop) || (e.timers[u].stopped = !0);
      }
      var F = h.defined,
        E = h.getStyle,
        C = h.isArray,
        G = h.isNumber,
        t = h.isObject,
        z = h.merge,
        m = h.objectEach,
        f = h.pick;
      return {
        animate: function (b, f, u) {
          var l,
            I = "",
            k,
            d;
          if (!t(u)) {
            var w = arguments;
            u = { duration: w[2], easing: w[3], complete: w[4] };
          }
          G(u.duration) || (u.duration = 400);
          u.easing =
            "function" === typeof u.easing ? u.easing : Math[u.easing] || Math.easeInOutSine;
          u.curAnim = z(f);
          m(f, function (n, g) {
            y(b, g);
            d = new e(b, u, g);
            k = void 0;
            "d" === g && C(f.d)
              ? ((d.paths = d.initPath(b, b.pathArray, f.d)), (d.toD = f.d), (l = 0), (k = 1))
              : b.attr
              ? (l = b.attr(g))
              : ((l = parseFloat(E(b, g)) || 0), "opacity" !== g && (I = "px"));
            k || (k = n);
            "string" === typeof k && k.match("px") && (k = k.replace(/px/g, ""));
            d.run(l, k, I);
          });
        },
        animObject: Q,
        getDeferredAnimation: function (b, f, u) {
          var l = Q(f),
            I = 0,
            k = 0;
          (u ? [u] : b.series).forEach(function (b) {
            b = Q(b.options.animation);
            I = f && F(f.defer) ? l.defer : Math.max(I, b.duration + b.defer);
            k = Math.min(l.duration, b.duration);
          });
          b.renderer.forExport && (I = 0);
          return { defer: Math.max(0, I - k), duration: Math.min(I, k) };
        },
        setAnimation: function (b, A) {
          A.renderer.globalAnimation = f(b, A.options.chart.animation, !0);
        },
        stop: y,
      };
    }
  );
  P(
    e,
    "Core/Renderer/HTML/AST.js",
    [e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (e, h) {
      var Q = e.SVG_NS,
        y = h.attr,
        F = h.createElement,
        E = h.discardElement,
        C = h.error,
        G = h.isString,
        t = h.objectEach,
        z = h.splat;
      ("");
      var m = !1;
      try {
        m = !!new DOMParser().parseFromString("", "text/html");
      } catch (f) {}
      return (function () {
        function f(b) {
          this.nodes = "string" === typeof b ? this.parseMarkup(b) : b;
        }
        f.filterUserAttributes = function (b) {
          t(b, function (A, u) {
            var l = !0;
            -1 === f.allowedAttributes.indexOf(u) && (l = !1);
            -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(u) &&
              (l =
                G(A) &&
                f.allowedReferences.some(function (b) {
                  return 0 === A.indexOf(b);
                }));
            l || (C("Highcharts warning: Invalid attribute '" + u + "' in config"), delete b[u]);
          });
          return b;
        };
        f.setElementHTML = function (b, A) {
          b.innerHTML = "";
          A && new f(A).addToDOM(b);
        };
        f.prototype.addToDOM = function (b) {
          function A(b, l) {
            var I;
            z(b).forEach(function (b) {
              var d = b.tagName,
                k = b.textContent ? e.doc.createTextNode(b.textContent) : void 0;
              if (d)
                if ("#text" === d) var n = k;
                else if (-1 !== f.allowedTags.indexOf(d)) {
                  d = e.doc.createElementNS("svg" === d ? Q : l.namespaceURI || Q, d);
                  var g = b.attributes || {};
                  t(b, function (c, b) {
                    "tagName" !== b &&
                      "attributes" !== b &&
                      "children" !== b &&
                      "textContent" !== b &&
                      (g[b] = c);
                  });
                  y(d, f.filterUserAttributes(g));
                  k && d.appendChild(k);
                  A(b.children || [], d);
                  n = d;
                } else C("Highcharts warning: Invalid tagName '" + d + "' in config");
              n && l.appendChild(n);
              I = n;
            });
            return I;
          }
          return A(this.nodes, b);
        };
        f.prototype.parseMarkup = function (b) {
          var f = [];
          if (m) b = new DOMParser().parseFromString(b, "text/html");
          else {
            var u = F("div");
            u.innerHTML = b;
            b = { body: u };
          }
          var l = function (b, k) {
            var d = b.nodeName.toLowerCase(),
              w = { tagName: d };
            if ("#text" === d) {
              d = b.textContent || "";
              if (/^[\s]*$/.test(d)) return;
              w.textContent = d;
            }
            if ((d = b.attributes)) {
              var n = {};
              [].forEach.call(d, function (c) {
                n[c.name] = c.value;
              });
              w.attributes = n;
            }
            if (b.childNodes.length) {
              var g = [];
              [].forEach.call(b.childNodes, function (c) {
                l(c, g);
              });
              g.length && (w.children = g);
            }
            k.push(w);
          };
          [].forEach.call(b.body.childNodes, function (b) {
            return l(b, f);
          });
          u && E(u);
          return f;
        };
        f.allowedTags = "a b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(
          " "
        );
        f.allowedAttributes = "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style result rowspan summary target tabindex text-align textAnchor textLength type valign width x x1 x2 y y1 y2 zIndex".split(
          " "
        );
        f.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
        return f;
      })();
    }
  );
  P(e, "Core/FormatUtilities.js", [e["Core/Options.js"], e["Core/Utilities.js"]], function (e, h) {
    function Q(z, m, f, b) {
      z = +z || 0;
      m = +m;
      var A = y.lang,
        u = (z.toString().split(".")[1] || "").split("e")[0].length,
        l = z.toString().split("e"),
        I = m;
      if (-1 === m) m = Math.min(u, 20);
      else if (!C(m)) m = 2;
      else if (m && l[1] && 0 > l[1]) {
        var k = m + +l[1];
        0 <= k
          ? ((l[0] = (+l[0]).toExponential(k).split("e")[0]), (m = k))
          : ((l[0] = l[0].split(".")[0] || 0),
            (z = 20 > m ? (l[0] * Math.pow(10, l[1])).toFixed(m) : 0),
            (l[1] = 0));
      }
      k = (Math.abs(l[1] ? l[0] : z) + Math.pow(10, -Math.max(m, u) - 1)).toFixed(m);
      u = String(t(k));
      var d = 3 < u.length ? u.length % 3 : 0;
      f = G(f, A.decimalPoint);
      b = G(b, A.thousandsSep);
      z = (0 > z ? "-" : "") + (d ? u.substr(0, d) + b : "");
      z = 0 > +l[1] && !I ? "0" : z + u.substr(d).replace(/(\d{3})(?=\d)/g, "$1" + b);
      m && (z += f + k.slice(-m));
      l[1] && 0 !== +z && (z += "e" + l[1]);
      return z;
    }
    var y = e.defaultOptions,
      F = e.defaultTime,
      E = h.getNestedProperty,
      C = h.isNumber,
      G = h.pick,
      t = h.pInt;
    return {
      dateFormat: function (t, m, f) {
        return F.dateFormat(t, m, f);
      },
      format: function (t, m, f) {
        var b = "{",
          A = !1,
          u = /f$/,
          l = /\.([0-9])/,
          I = y.lang,
          k = (f && f.time) || F;
        f = (f && f.numberFormatter) || Q;
        for (var d = []; t; ) {
          var w = t.indexOf(b);
          if (-1 === w) break;
          var n = t.slice(0, w);
          if (A) {
            n = n.split(":");
            b = E(n.shift() || "", m);
            if (n.length && "number" === typeof b)
              if (((n = n.join(":")), u.test(n))) {
                var g = parseInt((n.match(l) || ["", "-1"])[1], 10);
                null !== b &&
                  (b = f(b, g, I.decimalPoint, -1 < n.indexOf(",") ? I.thousandsSep : ""));
              } else b = k.dateFormat(n, b);
            d.push(b);
          } else d.push(n);
          t = t.slice(w + 1);
          b = (A = !A) ? "}" : "{";
        }
        d.push(t);
        return d.join("");
      },
      numberFormat: Q,
    };
  });
  P(
    e,
    "Core/Renderer/SVG/SVGElement.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Renderer/HTML/AST.js"],
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Color/Palette.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E) {
      var C = e.animate,
        G = e.animObject,
        t = e.stop,
        z = y.deg2rad,
        m = y.doc,
        f = y.noop,
        b = y.svg,
        A = y.SVG_NS,
        u = y.win,
        l = E.addEvent,
        I = E.attr,
        k = E.createElement,
        d = E.css,
        w = E.defined,
        n = E.erase,
        g = E.extend,
        c = E.fireEvent,
        q = E.isArray,
        a = E.isFunction,
        B = E.isNumber,
        J = E.isString,
        O = E.merge,
        p = E.objectEach,
        r = E.pick,
        M = E.pInt,
        v = E.syncTimeout,
        N = E.uniqueKey;
      e = (function () {
        function K() {
          this.element = void 0;
          this.onEvents = {};
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = A;
          this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(
            " "
          );
        }
        K.prototype._defaultGetter = function (a) {
          a = r(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
          /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
          return a;
        };
        K.prototype._defaultSetter = function (a, c, x) {
          x.setAttribute(c, a);
        };
        K.prototype.add = function (a) {
          var c = this.renderer,
            x = this.element;
          a && (this.parentGroup = a);
          this.parentInverted = a && a.inverted;
          "undefined" !== typeof this.textStr &&
            "text" === this.element.nodeName &&
            c.buildText(this);
          this.added = !0;
          if (!a || a.handleZ || this.zIndex) var g = this.zIndexSetter();
          g || (a ? a.element : c.box).appendChild(x);
          if (this.onAdd) this.onAdd();
          return this;
        };
        K.prototype.addClass = function (a, c) {
          var x = c ? "" : this.attr("class") || "";
          a = (a || "")
            .split(/ /g)
            .reduce(
              function (a, c) {
                -1 === x.indexOf(c) && a.push(c);
                return a;
              },
              x ? [x] : []
            )
            .join(" ");
          a !== x && this.attr("class", a);
          return this;
        };
        K.prototype.afterSetters = function () {
          this.doTransform && (this.updateTransform(), (this.doTransform = !1));
        };
        K.prototype.align = function (a, c, x) {
          var H = {},
            g = this.renderer,
            b = g.alignedObjects,
            d,
            p,
            L;
          if (a) {
            if (((this.alignOptions = a), (this.alignByTranslate = c), !x || J(x)))
              (this.alignTo = d = x || "renderer"), n(b, this), b.push(this), (x = void 0);
          } else (a = this.alignOptions), (c = this.alignByTranslate), (d = this.alignTo);
          x = r(x, g[d], "scrollablePlotBox" === d ? g.plotBox : void 0, g);
          d = a.align;
          var q = a.verticalAlign;
          g = (x.x || 0) + (a.x || 0);
          b = (x.y || 0) + (a.y || 0);
          "right" === d ? (p = 1) : "center" === d && (p = 2);
          p && (g += (x.width - (a.width || 0)) / p);
          H[c ? "translateX" : "x"] = Math.round(g);
          "bottom" === q ? (L = 1) : "middle" === q && (L = 2);
          L && (b += (x.height - (a.height || 0)) / L);
          H[c ? "translateY" : "y"] = Math.round(b);
          this[this.placed ? "animate" : "attr"](H);
          this.placed = !0;
          this.alignAttr = H;
          return this;
        };
        K.prototype.alignSetter = function (a) {
          var c = { left: "start", center: "middle", right: "end" };
          c[a] && ((this.alignValue = a), this.element.setAttribute("text-anchor", c[a]));
        };
        K.prototype.animate = function (a, c, x) {
          var H = this,
            g = G(r(c, this.renderer.globalAnimation, !0));
          c = g.defer;
          r(m.hidden, m.msHidden, m.webkitHidden, !1) && (g.duration = 0);
          0 !== g.duration
            ? (x && (g.complete = x),
              v(function () {
                H.element && C(H, a, g);
              }, c))
            : (this.attr(a, void 0, x),
              p(
                a,
                function (a, x) {
                  g.step && g.step.call(this, a, { prop: x, pos: 1, elem: this });
                },
                this
              ));
          return this;
        };
        K.prototype.applyTextOutline = function (a) {
          var c = this.element;
          -1 !== a.indexOf("contrast") &&
            (a = a.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
          var x = a.split(" ");
          a = x[x.length - 1];
          if ((x = x[0]) && "none" !== x && y.svg) {
            this.fakeTS = !0;
            this.ySetter = this.xSetter;
            x = x.replace(/(^[\d\.]+)(.*?)$/g, function (a, x, c) {
              return 2 * Number(x) + c;
            });
            this.removeTextOutline();
            var g = m.createElementNS(A, "tspan");
            I(g, {
              class: "highcharts-text-outline",
              fill: a,
              stroke: a,
              "stroke-width": x,
              "stroke-linejoin": "round",
            });
            [].forEach.call(c.childNodes, function (a) {
              var x = a.cloneNode(!0);
              x.removeAttribute &&
                ["fill", "stroke", "stroke-width", "stroke"].forEach(function (a) {
                  return x.removeAttribute(a);
                });
              g.appendChild(x);
            });
            var b = m.createElementNS(A, "tspan");
            b.textContent = "\u200b";
            ["x", "y"].forEach(function (a) {
              var x = c.getAttribute(a);
              x && b.setAttribute(a, x);
            });
            g.appendChild(b);
            c.insertBefore(g, c.firstChild);
          }
        };
        K.prototype.attr = function (a, c, x, g) {
          var H = this.element,
            b = this.symbolCustomAttribs,
            d,
            q = this,
            L,
            r;
          if ("string" === typeof a && "undefined" !== typeof c) {
            var v = a;
            a = {};
            a[v] = c;
          }
          "string" === typeof a
            ? (q = (this[a + "Getter"] || this._defaultGetter).call(this, a, H))
            : (p(
                a,
                function (x, c) {
                  L = !1;
                  g || t(this, c);
                  this.symbolName &&
                    -1 !== b.indexOf(c) &&
                    (d || (this.symbolAttr(a), (d = !0)), (L = !0));
                  !this.rotation || ("x" !== c && "y" !== c) || (this.doTransform = !0);
                  L ||
                    ((r = this[c + "Setter"] || this._defaultSetter),
                    r.call(this, x, c, H),
                    !this.styledMode &&
                      this.shadows &&
                      /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) &&
                      this.updateShadows(c, x, r));
                },
                this
              ),
              this.afterSetters());
          x && x.call(this);
          return q;
        };
        K.prototype.clip = function (a) {
          return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none");
        };
        K.prototype.crisp = function (a, c) {
          c = c || a.strokeWidth || 0;
          var x = (Math.round(c) % 2) / 2;
          a.x = Math.floor(a.x || this.x || 0) + x;
          a.y = Math.floor(a.y || this.y || 0) + x;
          a.width = Math.floor((a.width || this.width || 0) - 2 * x);
          a.height = Math.floor((a.height || this.height || 0) - 2 * x);
          w(a.strokeWidth) && (a.strokeWidth = c);
          return a;
        };
        K.prototype.complexColor = function (a, H, x) {
          var g = this.renderer,
            b,
            d,
            r,
            L,
            v,
            k,
            n,
            B,
            J,
            M,
            l = [],
            f;
          c(this.renderer, "complexColor", { args: arguments }, function () {
            a.radialGradient ? (d = "radialGradient") : a.linearGradient && (d = "linearGradient");
            if (d) {
              r = a[d];
              v = g.gradients;
              k = a.stops;
              J = x.radialReference;
              q(r) &&
                (a[d] = r = {
                  x1: r[0],
                  y1: r[1],
                  x2: r[2],
                  y2: r[3],
                  gradientUnits: "userSpaceOnUse",
                });
              "radialGradient" === d &&
                J &&
                !w(r.gradientUnits) &&
                ((L = r), (r = O(r, g.getRadialAttr(J, L), { gradientUnits: "userSpaceOnUse" })));
              p(r, function (a, c) {
                "id" !== c && l.push(c, a);
              });
              p(k, function (a) {
                l.push(a);
              });
              l = l.join(",");
              if (v[l]) M = v[l].attr("id");
              else {
                r.id = M = N();
                var c = (v[l] = g.createElement(d).attr(r).add(g.defs));
                c.radAttr = L;
                c.stops = [];
                k.forEach(function (a) {
                  0 === a[1].indexOf("rgba")
                    ? ((b = D.parse(a[1])), (n = b.get("rgb")), (B = b.get("a")))
                    : ((n = a[1]), (B = 1));
                  a = g
                    .createElement("stop")
                    .attr({ offset: a[0], "stop-color": n, "stop-opacity": B })
                    .add(c);
                  c.stops.push(a);
                });
              }
              f = "url(" + g.url + "#" + M + ")";
              x.setAttribute(H, f);
              x.gradient = l;
              a.toString = function () {
                return f;
              };
            }
          });
        };
        K.prototype.css = function (a) {
          var c = this.styles,
            x = {},
            q = this.element,
            r = ["textOutline", "textOverflow", "width"],
            v = "",
            k = !c;
          a && a.color && (a.fill = a.color);
          c &&
            p(a, function (a, H) {
              c && c[H] !== a && ((x[H] = a), (k = !0));
            });
          if (k) {
            c && (a = g(c, x));
            if (a)
              if (null === a.width || "auto" === a.width) delete this.textWidth;
              else if ("text" === q.nodeName.toLowerCase() && a.width)
                var n = (this.textWidth = M(a.width));
            this.styles = a;
            n && !b && this.renderer.forExport && delete a.width;
            if (q.namespaceURI === this.SVG_NS) {
              var L = function (a, c) {
                return "-" + c.toLowerCase();
              };
              p(a, function (a, c) {
                -1 === r.indexOf(c) && (v += c.replace(/([A-Z])/g, L) + ":" + a + ";");
              });
              v && I(q, "style", v);
            } else d(q, a);
            this.added &&
              ("text" === this.element.nodeName && this.renderer.buildText(this),
              a && a.textOutline && this.applyTextOutline(a.textOutline));
          }
          return this;
        };
        K.prototype.dashstyleSetter = function (a) {
          var c = this["stroke-width"];
          "inherit" === c && (c = 1);
          if ((a = a && a.toLowerCase())) {
            var x = a
              .replace("shortdashdotdot", "3,1,1,1,1,1,")
              .replace("shortdashdot", "3,1,1,1")
              .replace("shortdot", "1,1,")
              .replace("shortdash", "3,1,")
              .replace("longdash", "8,3,")
              .replace(/dot/g, "1,3,")
              .replace("dash", "4,3,")
              .replace(/,$/, "")
              .split(",");
            for (a = x.length; a--; ) x[a] = "" + M(x[a]) * r(c, NaN);
            a = x.join(",").replace(/NaN/g, "none");
            this.element.setAttribute("stroke-dasharray", a);
          }
        };
        K.prototype.destroy = function () {
          var a = this,
            c = a.element || {},
            x = a.renderer,
            g = c.ownerSVGElement,
            b = (x.isSVG && "SPAN" === c.nodeName && a.parentGroup) || void 0;
          c.onclick = c.onmouseout = c.onmouseover = c.onmousemove = c.point = null;
          t(a);
          if (a.clipPath && g) {
            var d = a.clipPath;
            [].forEach.call(g.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
              -1 < a.getAttribute("clip-path").indexOf(d.element.id) &&
                a.removeAttribute("clip-path");
            });
            a.clipPath = d.destroy();
          }
          if (a.stops) {
            for (g = 0; g < a.stops.length; g++) a.stops[g].destroy();
            a.stops.length = 0;
            a.stops = void 0;
          }
          a.safeRemoveChild(c);
          for (x.styledMode || a.destroyShadows(); b && b.div && 0 === b.div.childNodes.length; )
            (c = b.parentGroup), a.safeRemoveChild(b.div), delete b.div, (b = c);
          a.alignTo && n(x.alignedObjects, a);
          p(a, function (c, x) {
            a[x] && a[x].parentGroup === a && a[x].destroy && a[x].destroy();
            delete a[x];
          });
        };
        K.prototype.destroyShadows = function () {
          (this.shadows || []).forEach(function (a) {
            this.safeRemoveChild(a);
          }, this);
          this.shadows = void 0;
        };
        K.prototype.destroyTextPath = function (a, c) {
          var x = a.getElementsByTagName("text")[0];
          if (x) {
            if (
              (x.removeAttribute("dx"),
              x.removeAttribute("dy"),
              c.element.setAttribute("id", ""),
              this.textPathWrapper && x.getElementsByTagName("textPath").length)
            ) {
              for (a = this.textPathWrapper.element.childNodes; a.length; ) x.appendChild(a[0]);
              x.removeChild(this.textPathWrapper.element);
            }
          } else if (a.getAttribute("dx") || a.getAttribute("dy"))
            a.removeAttribute("dx"), a.removeAttribute("dy");
          this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy());
        };
        K.prototype.dSetter = function (a, c, x) {
          q(a) &&
            ("string" === typeof a[0] && (a = this.renderer.pathToSegments(a)),
            (this.pathArray = a),
            (a = a.reduce(function (a, c, x) {
              return c && c.join ? (x ? a + " " : "") + c.join(" ") : (c || "").toString();
            }, "")));
          /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
          this[c] !== a && (x.setAttribute(c, a), (this[c] = a));
        };
        K.prototype.fadeOut = function (a) {
          var c = this;
          c.animate(
            { opacity: 0 },
            {
              duration: r(a, 150),
              complete: function () {
                c.attr({ y: -9999 }).hide();
              },
            }
          );
        };
        K.prototype.fillSetter = function (a, c, x) {
          "string" === typeof a ? x.setAttribute(c, a) : a && this.complexColor(a, c, x);
        };
        K.prototype.getBBox = function (c, H) {
          var x = this.renderer,
            b = this.element,
            p = this.styles,
            q = this.textStr,
            v = x.cache,
            k = x.cacheKeys,
            n = b.namespaceURI === this.SVG_NS;
          H = r(H, this.rotation, 0);
          var B = x.styledMode ? b && K.prototype.getStyle.call(b, "font-size") : p && p.fontSize,
            J;
          if (w(q)) {
            var l = q.toString();
            -1 === l.indexOf("<") && (l = l.replace(/[0-9]/g, "0"));
            l += ["", H, B, this.textWidth, p && p.textOverflow, p && p.fontWeight].join();
          }
          l && !c && (J = v[l]);
          if (!J) {
            if (n || x.forExport) {
              try {
                var M =
                  this.fakeTS &&
                  function (a) {
                    var c = b.querySelector(".highcharts-text-outline");
                    c && d(c, { display: a });
                  };
                a(M) && M("none");
                J = b.getBBox
                  ? g({}, b.getBBox())
                  : { width: b.offsetWidth, height: b.offsetHeight };
                a(M) && M("");
              } catch (X) {
                ("");
              }
              if (!J || 0 > J.width) J = { width: 0, height: 0 };
            } else J = this.htmlGetBBox();
            x.isSVG &&
              ((c = J.width),
              (x = J.height),
              n &&
                (J.height = x =
                  { "11px,17": 14, "13px,20": 16 }[p && p.fontSize + "," + Math.round(x)] || x),
              H &&
                ((p = H * z),
                (J.width = Math.abs(x * Math.sin(p)) + Math.abs(c * Math.cos(p))),
                (J.height = Math.abs(x * Math.cos(p)) + Math.abs(c * Math.sin(p)))));
            if (l && 0 < J.height) {
              for (; 250 < k.length; ) delete v[k.shift()];
              v[l] || k.push(l);
              v[l] = J;
            }
          }
          return J;
        };
        K.prototype.getStyle = function (a) {
          return u.getComputedStyle(this.element || this, "").getPropertyValue(a);
        };
        K.prototype.hasClass = function (a) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(a);
        };
        K.prototype.hide = function (a) {
          a ? this.attr({ y: -9999 }) : this.attr({ visibility: "hidden" });
          return this;
        };
        K.prototype.htmlGetBBox = function () {
          return { height: 0, width: 0, x: 0, y: 0 };
        };
        K.prototype.init = function (a, g) {
          this.element = "span" === g ? k(g) : m.createElementNS(this.SVG_NS, g);
          this.renderer = a;
          c(this, "afterInit");
        };
        K.prototype.invert = function (a) {
          this.inverted = a;
          this.updateTransform();
          return this;
        };
        K.prototype.on = function (a, c) {
          var x = this.onEvents;
          if (x[a]) x[a]();
          x[a] = l(this.element, a, c);
          return this;
        };
        K.prototype.opacitySetter = function (a, c, x) {
          this.opacity = a = Number(Number(a).toFixed(3));
          x.setAttribute(c, a);
        };
        K.prototype.removeClass = function (a) {
          return this.attr(
            "class",
            ("" + this.attr("class"))
              .replace(J(a) ? new RegExp("(^| )" + a + "( |$)") : a, " ")
              .replace(/ +/g, " ")
              .trim()
          );
        };
        K.prototype.removeTextOutline = function () {
          var a = this.element.querySelector("tspan.highcharts-text-outline");
          a && this.safeRemoveChild(a);
        };
        K.prototype.safeRemoveChild = function (a) {
          var c = a.parentNode;
          c && c.removeChild(a);
        };
        K.prototype.setRadialReference = function (a) {
          var c = this.element.gradient && this.renderer.gradients[this.element.gradient];
          this.element.radialReference = a;
          c && c.radAttr && c.animate(this.renderer.getRadialAttr(a, c.radAttr));
          return this;
        };
        K.prototype.setTextPath = function (a, c) {
          var x = this.element,
            g = this.text ? this.text.element : x,
            H = { textAnchor: "text-anchor" },
            b = !1,
            d = this.textPathWrapper,
            q = !d;
          c = O(
            !0,
            { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } },
            c
          );
          var r = h.filterUserAttributes(c.attributes);
          if (a && c && c.enabled) {
            d && null === d.element.parentNode
              ? ((q = !0), (d = d.destroy()))
              : d && this.removeTextOutline.call(d.parentGroup);
            this.options && this.options.padding && (r.dx = -this.options.padding);
            d || ((this.textPathWrapper = d = this.renderer.createElement("textPath")), (b = !0));
            var v = d.element;
            (c = a.element.getAttribute("id")) || a.element.setAttribute("id", (c = N()));
            if (q)
              for (
                g.setAttribute("y", 0),
                  B(r.dx) && g.setAttribute("x", -r.dx),
                  a = [].slice.call(g.childNodes),
                  q = 0;
                q < a.length;
                q++
              ) {
                var k = a[q];
                (k.nodeType !== Node.TEXT_NODE && "tspan" !== k.nodeName) || v.appendChild(k);
              }
            b && d && d.add({ element: g });
            v.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + c);
            w(r.dy) && (v.parentNode.setAttribute("dy", r.dy), delete r.dy);
            w(r.dx) && (v.parentNode.setAttribute("dx", r.dx), delete r.dx);
            p(r, function (a, c) {
              v.setAttribute(H[c] || c, a);
            });
            x.removeAttribute("transform");
            this.removeTextOutline.call(d);
            this.text &&
              !this.renderer.styledMode &&
              this.attr({ fill: "none", "stroke-width": 0 });
            this.applyTextOutline = this.updateTransform = f;
          } else
            d &&
              (delete this.updateTransform,
              delete this.applyTextOutline,
              this.destroyTextPath(x, a),
              this.updateTransform(),
              this.options &&
                this.options.rotation &&
                this.applyTextOutline(this.options.style.textOutline));
          return this;
        };
        K.prototype.shadow = function (a, c, x) {
          var H = [],
            b = this.element,
            d = this.oldShadowOptions,
            q = { color: F.neutralColor100, offsetX: 1, offsetY: 1, opacity: 0.15, width: 3 },
            r = !1,
            v;
          !0 === a ? (v = q) : "object" === typeof a && (v = g(q, a));
          v &&
            (v &&
              d &&
              p(v, function (a, c) {
                a !== d[c] && (r = !0);
              }),
            r && this.destroyShadows(),
            (this.oldShadowOptions = v));
          if (!v) this.destroyShadows();
          else if (!this.shadows) {
            var k = v.opacity / v.width;
            var n = this.parentInverted
              ? "translate(-1,-1)"
              : "translate(" + v.offsetX + ", " + v.offsetY + ")";
            for (q = 1; q <= v.width; q++) {
              var B = b.cloneNode(!1);
              var J = 2 * v.width + 1 - 2 * q;
              I(B, {
                stroke: a.color || F.neutralColor100,
                "stroke-opacity": k * q,
                "stroke-width": J,
                transform: n,
                fill: "none",
              });
              B.setAttribute("class", (B.getAttribute("class") || "") + " highcharts-shadow");
              x && (I(B, "height", Math.max(I(B, "height") - J, 0)), (B.cutHeight = J));
              c ? c.element.appendChild(B) : b.parentNode && b.parentNode.insertBefore(B, b);
              H.push(B);
            }
            this.shadows = H;
          }
          return this;
        };
        K.prototype.show = function (a) {
          return this.attr({ visibility: a ? "inherit" : "visible" });
        };
        K.prototype.strokeSetter = function (a, c, x) {
          this[c] = a;
          this.stroke && this["stroke-width"]
            ? (K.prototype.fillSetter.call(this, this.stroke, "stroke", x),
              x.setAttribute("stroke-width", this["stroke-width"]),
              (this.hasStroke = !0))
            : "stroke-width" === c && 0 === a && this.hasStroke
            ? (x.removeAttribute("stroke"), (this.hasStroke = !1))
            : this.renderer.styledMode &&
              this["stroke-width"] &&
              (x.setAttribute("stroke-width", this["stroke-width"]), (this.hasStroke = !0));
        };
        K.prototype.strokeWidth = function () {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          var a = this.getStyle("stroke-width"),
            c = 0;
          if (a.indexOf("px") === a.length - 2) c = M(a);
          else if ("" !== a) {
            var x = m.createElementNS(A, "rect");
            I(x, { width: a, "stroke-width": 0 });
            this.element.parentNode.appendChild(x);
            c = x.getBBox().width;
            x.parentNode.removeChild(x);
          }
          return c;
        };
        K.prototype.symbolAttr = function (a) {
          var c = this;
          "x y r start end width height innerR anchorX anchorY clockwise"
            .split(" ")
            .forEach(function (x) {
              c[x] = r(a[x], c[x]);
            });
          c.attr({ d: c.renderer.symbols[c.symbolName](c.x, c.y, c.width, c.height, c) });
        };
        K.prototype.textSetter = function (a) {
          a !== this.textStr &&
            (delete this.textPxLength,
            (this.textStr = a),
            this.added && this.renderer.buildText(this));
        };
        K.prototype.titleSetter = function (a) {
          var c = this.element,
            x = c.getElementsByTagName("title")[0] || m.createElementNS(this.SVG_NS, "title");
          c.insertBefore ? c.insertBefore(x, c.firstChild) : c.appendChild(x);
          x.textContent = String(r(a, ""))
            .replace(/<[^>]*>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        };
        K.prototype.toFront = function () {
          var a = this.element;
          a.parentNode.appendChild(a);
          return this;
        };
        K.prototype.translate = function (a, c) {
          return this.attr({ translateX: a, translateY: c });
        };
        K.prototype.updateShadows = function (a, c, x) {
          var g = this.shadows;
          if (g)
            for (var b = g.length; b--; )
              x.call(
                g[b],
                "height" === a ? Math.max(c - (g[b].cutHeight || 0), 0) : "d" === a ? this.d : c,
                a,
                g[b]
              );
        };
        K.prototype.updateTransform = function () {
          var a = this.scaleX,
            c = this.scaleY,
            x = this.inverted,
            g = this.rotation,
            b = this.matrix,
            d = this.element,
            p = this.translateX || 0,
            q = this.translateY || 0;
          x && ((p += this.width), (q += this.height));
          p = ["translate(" + p + "," + q + ")"];
          w(b) && p.push("matrix(" + b.join(",") + ")");
          x
            ? p.push("rotate(90) scale(-1,1)")
            : g &&
              p.push(
                "rotate(" +
                  g +
                  " " +
                  r(this.rotationOriginX, d.getAttribute("x"), 0) +
                  " " +
                  r(this.rotationOriginY, d.getAttribute("y") || 0) +
                  ")"
              );
          (w(a) || w(c)) && p.push("scale(" + r(a, 1) + " " + r(c, 1) + ")");
          p.length && d.setAttribute("transform", p.join(" "));
        };
        K.prototype.visibilitySetter = function (a, c, x) {
          "inherit" === a ? x.removeAttribute(c) : this[c] !== a && x.setAttribute(c, a);
          this[c] = a;
        };
        K.prototype.xGetter = function (a) {
          "circle" === this.element.nodeName && ("x" === a ? (a = "cx") : "y" === a && (a = "cy"));
          return this._defaultGetter(a);
        };
        K.prototype.zIndexSetter = function (a, c) {
          var x = this.renderer,
            g = this.parentGroup,
            b = (g || x).element || x.box,
            H = this.element;
          x = b === x.box;
          var d = !1;
          var p = this.added;
          var q;
          w(a)
            ? (H.setAttribute("data-z-index", a), (a = +a), this[c] === a && (p = !1))
            : w(this[c]) && H.removeAttribute("data-z-index");
          this[c] = a;
          if (p) {
            (a = this.zIndex) && g && (g.handleZ = !0);
            c = b.childNodes;
            for (q = c.length - 1; 0 <= q && !d; q--) {
              g = c[q];
              p = g.getAttribute("data-z-index");
              var r = !w(p);
              if (g !== H)
                if (0 > a && r && !x && !q) b.insertBefore(H, c[q]), (d = !0);
                else if (M(p) <= a || (r && (!w(a) || 0 <= a)))
                  b.insertBefore(H, c[q + 1] || null), (d = !0);
            }
            d || (b.insertBefore(H, c[x ? 3 : 0] || null), (d = !0));
          }
          return d;
        };
        return K;
      })();
      e.prototype["stroke-widthSetter"] = e.prototype.strokeSetter;
      e.prototype.yGetter = e.prototype.xGetter;
      e.prototype.matrixSetter = e.prototype.rotationOriginXSetter = e.prototype.rotationOriginYSetter = e.prototype.rotationSetter = e.prototype.scaleXSetter = e.prototype.scaleYSetter = e.prototype.translateXSetter = e.prototype.translateYSetter = e.prototype.verticalAlignSetter = function (
        a,
        c
      ) {
        this[c] = a;
        this.doTransform = !0;
      };
      ("");
      return e;
    }
  );
  P(
    e,
    "Core/Renderer/SVG/SVGLabel.js",
    [e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]],
    function (e, h) {
      function Q(m, f) {
        C(m) ? m !== this[f] && ((this[f] = m), this.updateTextPadding()) : (this[f] = void 0);
      }
      var y =
          (this && this.__extends) ||
          (function () {
            var m = function (f, b) {
              m =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, f) {
                    b.__proto__ = f;
                  }) ||
                function (b, f) {
                  for (var l in f) f.hasOwnProperty(l) && (b[l] = f[l]);
                };
              return m(f, b);
            };
            return function (f, b) {
              function A() {
                this.constructor = f;
              }
              m(f, b);
              f.prototype = null === b ? Object.create(b) : ((A.prototype = b.prototype), new A());
            };
          })(),
        F = h.defined,
        E = h.extend,
        C = h.isNumber,
        G = h.merge,
        t = h.pick,
        z = h.removeEvent;
      return (function (m) {
        function f(b, A, u, l, I, k, d, w, n, g) {
          var c = m.call(this) || this;
          c.paddingSetter = Q;
          c.paddingLeftSetter = Q;
          c.paddingRightSetter = Q;
          c.init(b, "g");
          c.textStr = A;
          c.x = u;
          c.y = l;
          c.anchorX = k;
          c.anchorY = d;
          c.baseline = n;
          c.className = g;
          "button" !== g && c.addClass("highcharts-label");
          g && c.addClass("highcharts-" + g);
          c.text = b.text("", 0, 0, w).attr({ zIndex: 1 });
          if ("string" === typeof I) {
            var q = /^url\((.*?)\)$/.test(I);
            if (c.renderer.symbols[I] || q) c.symbolKey = I;
          }
          c.bBox = f.emptyBBox;
          c.padding = 3;
          c.baselineOffset = 0;
          c.needsBox = b.styledMode || q;
          c.deferredAttr = {};
          c.alignFactor = 0;
          return c;
        }
        y(f, m);
        f.prototype.alignSetter = function (b) {
          b = { left: 0, center: 0.5, right: 1 }[b];
          b !== this.alignFactor &&
            ((this.alignFactor = b),
            this.bBox && C(this.xSetting) && this.attr({ x: this.xSetting }));
        };
        f.prototype.anchorXSetter = function (b, f) {
          this.anchorX = b;
          this.boxAttr(f, Math.round(b) - this.getCrispAdjust() - this.xSetting);
        };
        f.prototype.anchorYSetter = function (b, f) {
          this.anchorY = b;
          this.boxAttr(f, b - this.ySetting);
        };
        f.prototype.boxAttr = function (b, f) {
          this.box ? this.box.attr(b, f) : (this.deferredAttr[b] = f);
        };
        f.prototype.css = function (b) {
          if (b) {
            var m = {},
              u = void 0;
            b = G(b);
            f.textProps.forEach(function (l) {
              "undefined" !== typeof b[l] && ((m[l] = b[l]), delete b[l]);
            });
            this.text.css(m);
            u = "width" in m;
            "fontSize" in m || "fontWeight" in m
              ? this.updateTextPadding()
              : u && this.updateBoxSize();
          }
          return e.prototype.css.call(this, b);
        };
        f.prototype.destroy = function () {
          z(this.element, "mouseenter");
          z(this.element, "mouseleave");
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          e.prototype.destroy.call(this);
        };
        f.prototype.fillSetter = function (b, f) {
          b && (this.needsBox = !0);
          this.fill = b;
          this.boxAttr(f, b);
        };
        f.prototype.getBBox = function () {
          this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
          var b = this.padding,
            f = t(this.paddingLeft, b);
          return { width: this.width, height: this.height, x: this.bBox.x - f, y: this.bBox.y - b };
        };
        f.prototype.getCrispAdjust = function () {
          return this.renderer.styledMode && this.box
            ? (this.box.strokeWidth() % 2) / 2
            : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2) / 2;
        };
        f.prototype.heightSetter = function (b) {
          this.heightSetting = b;
        };
        f.prototype.on = function (b, f) {
          var u = this,
            l = u.text,
            I = l && "SPAN" === l.element.tagName ? l : void 0;
          if (I) {
            var k = function (d) {
              (("mouseenter" === b || "mouseleave" === b) &&
                d.relatedTarget instanceof Element &&
                (u.element.compareDocumentPosition(d.relatedTarget) &
                  Node.DOCUMENT_POSITION_CONTAINED_BY ||
                  I.element.compareDocumentPosition(d.relatedTarget) &
                    Node.DOCUMENT_POSITION_CONTAINED_BY)) ||
                f.call(u.element, d);
            };
            I.on(b, k);
          }
          e.prototype.on.call(u, b, k || f);
          return u;
        };
        f.prototype.onAdd = function () {
          var b = this.textStr;
          this.text.add(this);
          this.attr({ text: F(b) ? b : "", x: this.x, y: this.y });
          this.box &&
            F(this.anchorX) &&
            this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        };
        f.prototype.rSetter = function (b, f) {
          this.boxAttr(f, b);
        };
        f.prototype.shadow = function (b) {
          b && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(b));
          return this;
        };
        f.prototype.strokeSetter = function (b, f) {
          this.stroke = b;
          this.boxAttr(f, b);
        };
        f.prototype["stroke-widthSetter"] = function (b, f) {
          b && (this.needsBox = !0);
          this["stroke-width"] = b;
          this.boxAttr(f, b);
        };
        f.prototype["text-alignSetter"] = function (b) {
          this.textAlign = b;
        };
        f.prototype.textSetter = function (b) {
          "undefined" !== typeof b && this.text.attr({ text: b });
          this.updateTextPadding();
        };
        f.prototype.updateBoxSize = function () {
          var b = this.text.element.style,
            m = {},
            u = this.padding,
            l = (this.bBox =
              (C(this.widthSetting) && C(this.heightSetting) && !this.textAlign) ||
              !F(this.text.textStr)
                ? f.emptyBBox
                : this.text.getBBox());
          this.width = this.getPaddedWidth();
          this.height = (this.heightSetting || l.height || 0) + 2 * u;
          this.baselineOffset =
            u +
            Math.min(this.renderer.fontMetrics(b && b.fontSize, this.text).b, l.height || Infinity);
          this.needsBox &&
            (this.box ||
              ((b = this.box = this.symbolKey
                ? this.renderer.symbol(this.symbolKey)
                : this.renderer.rect()),
              b.addClass(
                ("button" === this.className ? "" : "highcharts-label-box") +
                  (this.className ? " highcharts-" + this.className + "-box" : "")
              ),
              b.add(this)),
            (b = this.getCrispAdjust()),
            (m.x = b),
            (m.y = (this.baseline ? -this.baselineOffset : 0) + b),
            (m.width = Math.round(this.width)),
            (m.height = Math.round(this.height)),
            this.box.attr(E(m, this.deferredAttr)),
            (this.deferredAttr = {}));
        };
        f.prototype.updateTextPadding = function () {
          var b = this.text;
          this.updateBoxSize();
          var f = this.baseline ? 0 : this.baselineOffset,
            u = t(this.paddingLeft, this.padding);
          F(this.widthSetting) &&
            this.bBox &&
            ("center" === this.textAlign || "right" === this.textAlign) &&
            (u +=
              { center: 0.5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width));
          if (u !== b.x || f !== b.y)
            b.attr("x", u),
              b.hasBoxWidthChanged && (this.bBox = b.getBBox(!0)),
              "undefined" !== typeof f && b.attr("y", f);
          b.x = u;
          b.y = f;
        };
        f.prototype.widthSetter = function (b) {
          this.widthSetting = C(b) ? b : void 0;
        };
        f.prototype.getPaddedWidth = function () {
          var b = this.padding,
            f = t(this.paddingLeft, b);
          b = t(this.paddingRight, b);
          return (this.widthSetting || this.bBox.width || 0) + f + b;
        };
        f.prototype.xSetter = function (b) {
          this.x = b;
          this.alignFactor &&
            ((b -= this.alignFactor * this.getPaddedWidth()), (this["forceAnimate:x"] = !0));
          this.xSetting = Math.round(b);
          this.attr("translateX", this.xSetting);
        };
        f.prototype.ySetter = function (b) {
          this.ySetting = this.y = Math.round(b);
          this.attr("translateY", this.ySetting);
        };
        f.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
        f.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(
          " "
        );
        return f;
      })(e);
    }
  );
  P(
    e,
    "Core/Renderer/SVG/TextBuilder.js",
    [e["Core/Globals.js"], e["Core/Utilities.js"], e["Core/Renderer/HTML/AST.js"]],
    function (e, h, D) {
      var y = e.doc,
        F = e.SVG_NS,
        E = h.attr,
        C = h.isString,
        G = h.objectEach,
        t = h.pick;
      return (function () {
        function h(m) {
          var f = m.styles;
          this.renderer = m.renderer;
          this.svgElement = m;
          this.width = m.textWidth;
          this.textLineHeight = f && f.lineHeight;
          this.textOutline = f && f.textOutline;
          this.ellipsis = !(!f || "ellipsis" !== f.textOverflow);
          this.noWrap = !(!f || "nowrap" !== f.whiteSpace);
          this.fontSize = f && f.fontSize;
        }
        h.prototype.buildSVG = function () {
          var m = this.svgElement,
            f = m.element,
            b = m.renderer,
            A = t(m.textStr, "").toString(),
            u = -1 !== A.indexOf("<"),
            l = f.childNodes,
            I = l.length;
          b = this.width && !m.added && b.box;
          var k = /<br.*?>/g;
          var d = [
            A,
            this.ellipsis,
            this.noWrap,
            this.textLineHeight,
            this.textOutline,
            this.fontSize,
            this.width,
          ].join();
          if (d !== m.textCache) {
            m.textCache = d;
            for (delete m.actualWidth; I--; ) f.removeChild(l[I]);
            u ||
            this.ellipsis ||
            this.width ||
            (-1 !== A.indexOf(" ") && (!this.noWrap || k.test(A)))
              ? "" !== A &&
                (b && b.appendChild(f),
                (A = new D(A)),
                this.modifyTree(A.nodes),
                A.addToDOM(m.element),
                this.modifyDOM(),
                this.ellipsis &&
                  -1 !== (f.textContent || "").indexOf("\u2026") &&
                  m.attr("title", this.unescapeEntities(m.textStr || "", ["&lt;", "&gt;"])),
                b && b.removeChild(f))
              : f.appendChild(y.createTextNode(this.unescapeEntities(A)));
            C(this.textOutline) && m.applyTextOutline && m.applyTextOutline(this.textOutline);
          }
        };
        h.prototype.modifyDOM = function () {
          var m = this,
            f = this.svgElement,
            b = E(f.element, "x");
          [].forEach.call(f.element.querySelectorAll("tspan.highcharts-br"), function (l) {
            l.nextSibling &&
              l.previousSibling &&
              E(l, { dy: m.getLineHeight(l.nextSibling), x: b });
          });
          var A = this.width || 0;
          if (A) {
            var u = function (l, k) {
                var d = l.textContent || "",
                  w = d.replace(/([^\^])-/g, "$1- ").split(" "),
                  n = !m.noWrap && (1 < w.length || 1 < f.element.childNodes.length),
                  g = m.getLineHeight(k),
                  c = 0,
                  q = f.actualWidth;
                if (m.ellipsis)
                  d &&
                    m.truncate(
                      l,
                      d,
                      void 0,
                      0,
                      Math.max(0, A - parseInt(m.fontSize || 12, 10)),
                      function (a, c) {
                        return a.substring(0, c) + "\u2026";
                      }
                    );
                else if (n) {
                  d = [];
                  for (n = []; k.firstChild && k.firstChild !== l; )
                    n.push(k.firstChild), k.removeChild(k.firstChild);
                  for (; w.length; )
                    w.length &&
                      !m.noWrap &&
                      0 < c &&
                      (d.push(l.textContent || ""),
                      (l.textContent = w.join(" ").replace(/- /g, "-"))),
                      m.truncate(l, void 0, w, 0 === c ? q || 0 : 0, A, function (a, c) {
                        return w.slice(0, c).join(" ").replace(/- /g, "-");
                      }),
                      (q = f.actualWidth),
                      c++;
                  n.forEach(function (a) {
                    k.insertBefore(a, l);
                  });
                  d.forEach(function (a) {
                    k.insertBefore(y.createTextNode(a), l);
                    a = y.createElementNS(F, "tspan");
                    a.textContent = "\u200b";
                    E(a, { dy: g, x: b });
                    k.insertBefore(a, l);
                  });
                }
              },
              l = function (b) {
                [].slice.call(b.childNodes).forEach(function (k) {
                  k.nodeType === Node.TEXT_NODE
                    ? u(k, b)
                    : (-1 !== k.className.baseVal.indexOf("highcharts-br") && (f.actualWidth = 0),
                      l(k));
                });
              };
            l(f.element);
          }
        };
        h.prototype.getLineHeight = function (m) {
          var f;
          m = m.nodeType === Node.TEXT_NODE ? m.parentElement : m;
          this.renderer.styledMode ||
            (f =
              m && /(px|em)$/.test(m.style.fontSize)
                ? m.style.fontSize
                : this.fontSize || this.renderer.style.fontSize || 12);
          return this.textLineHeight
            ? parseInt(this.textLineHeight.toString(), 10)
            : this.renderer.fontMetrics(f, m || this.svgElement.element).h;
        };
        h.prototype.modifyTree = function (m) {
          var f = this,
            b = function (A, u) {
              var l = A.tagName,
                I = f.renderer.styledMode,
                k = A.attributes || {};
              if ("b" === l || "strong" === l)
                I
                  ? (k["class"] = "highcharts-strong")
                  : (k.style = "font-weight:bold;" + (k.style || ""));
              else if ("i" === l || "em" === l)
                I
                  ? (k["class"] = "highcharts-emphasized")
                  : (k.style = "font-style:italic;" + (k.style || ""));
              C(k.style) && (k.style = k.style.replace(/(;| |^)color([ :])/, "$1fill$2"));
              "br" === l &&
                ((k["class"] = "highcharts-br"),
                (A.textContent = "\u200b"),
                (u = m[u + 1]) &&
                  u.textContent &&
                  (u.textContent = u.textContent.replace(/^ +/gm, "")));
              "#text" !== l && "a" !== l && (A.tagName = "tspan");
              A.attributes = k;
              A.children &&
                A.children
                  .filter(function (b) {
                    return "#text" !== b.tagName;
                  })
                  .forEach(b);
            };
          for (m.forEach(b); m[0] && "tspan" === m[0].tagName && !m[0].children; ) m.splice(0, 1);
        };
        h.prototype.truncate = function (m, f, b, A, u, l) {
          var I = this.svgElement,
            k = I.renderer,
            d = I.rotation,
            w = [],
            n = b ? 1 : 0,
            g = (f || b || "").length,
            c = g,
            q,
            a = function (a, c) {
              c = c || a;
              var g = m.parentNode;
              if (g && "undefined" === typeof w[c])
                if (g.getSubStringLength)
                  try {
                    w[c] = A + g.getSubStringLength(0, b ? c + 1 : c);
                  } catch (r) {
                    ("");
                  }
                else
                  k.getSpanWidth &&
                    ((m.textContent = l(f || b, a)), (w[c] = A + k.getSpanWidth(I, m)));
              return w[c];
            };
          I.rotation = 0;
          var B = a(m.textContent.length);
          if (A + B > u) {
            for (; n <= g; )
              (c = Math.ceil((n + g) / 2)),
                b && (q = l(b, c)),
                (B = a(c, q && q.length - 1)),
                n === g ? (n = g + 1) : B > u ? (g = c - 1) : (n = c);
            0 === g
              ? (m.textContent = "")
              : (f && g === f.length - 1) || (m.textContent = q || l(f || b, c));
          }
          b && b.splice(0, c);
          I.actualWidth = B;
          I.rotation = d;
        };
        h.prototype.unescapeEntities = function (m, f) {
          G(this.renderer.escapes, function (b, A) {
            (f && -1 !== f.indexOf(b)) || (m = m.toString().replace(new RegExp(b, "g"), A));
          });
          return m;
        };
        return h;
      })();
    }
  );
  P(
    e,
    "Core/Renderer/SVG/SVGRenderer.js",
    [
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Color/Palette.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Renderer/SVG/SVGLabel.js"],
      e["Core/Renderer/HTML/AST.js"],
      e["Core/Renderer/SVG/TextBuilder.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E, C, G) {
      var t = G.addEvent,
        z = G.attr,
        m = G.createElement,
        f = G.css,
        b = G.defined,
        A = G.destroyObjectProperties,
        u = G.extend,
        l = G.isArray,
        I = G.isNumber,
        k = G.isObject,
        d = G.isString,
        w = G.merge,
        n = G.pick,
        g = G.pInt,
        c = G.uniqueKey,
        q = h.charts,
        a = h.deg2rad,
        B = h.doc,
        J = h.isFirefox,
        O = h.isMS,
        p = h.isWebKit,
        r = h.noop,
        M = h.SVG_NS,
        v = h.symbolSizes,
        N = h.win,
        K;
      G = (function () {
        function H(a, c, g, b, H, d, p) {
          this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
          this.init(a, c, g, b, H, d, p);
        }
        H.prototype.init = function (a, c, g, b, H, d, p) {
          var x = this.createElement("svg").attr({ version: "1.1", class: "highcharts-root" });
          p || x.css(this.getStyle(b));
          b = x.element;
          a.appendChild(b);
          z(a, "dir", "ltr");
          -1 === a.innerHTML.indexOf("xmlns") && z(b, "xmlns", this.SVG_NS);
          this.isSVG = !0;
          this.box = b;
          this.boxWrapper = x;
          this.alignedObjects = [];
          this.url = this.getReferenceURL();
          this.createElement("desc")
            .add()
            .element.appendChild(B.createTextNode("Created with Highcharts 9.1.0"));
          this.defs = this.createElement("defs").add();
          this.allowHTML = d;
          this.forExport = H;
          this.styledMode = p;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.setSize(c, g, !1);
          var q;
          J &&
            a.getBoundingClientRect &&
            ((c = function () {
              f(a, { left: 0, top: 0 });
              q = a.getBoundingClientRect();
              f(a, {
                left: Math.ceil(q.left) - q.left + "px",
                top: Math.ceil(q.top) - q.top + "px",
              });
            }),
            c(),
            (this.unSubPixelFix = t(N, "resize", c)));
        };
        H.prototype.definition = function (a) {
          return new E([a]).addToDOM(this.defs.element);
        };
        H.prototype.getReferenceURL = function () {
          if ((J || p) && B.getElementsByTagName("base").length) {
            if (!b(K)) {
              var a = c();
              a = new E([
                {
                  tagName: "svg",
                  attributes: { width: 8, height: 8 },
                  children: [
                    {
                      tagName: "defs",
                      children: [
                        {
                          tagName: "clipPath",
                          attributes: { id: a },
                          children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }],
                        },
                      ],
                    },
                    {
                      tagName: "rect",
                      attributes: {
                        id: "hitme",
                        width: 8,
                        height: 8,
                        "clip-path": "url(#" + a + ")",
                        fill: "rgba(0,0,0,0.001)",
                      },
                    },
                  ],
                },
              ]).addToDOM(B.body);
              f(a, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              var g = B.elementFromPoint(6, 6);
              K = "hitme" === (g && g.id);
              B.body.removeChild(a);
            }
            if (K)
              return N.location.href
                .split("#")[0]
                .replace(/<[^>]*>/g, "")
                .replace(/([\('\)])/g, "\\$1")
                .replace(/ /g, "%20");
          }
          return "";
        };
        H.prototype.getStyle = function (a) {
          return (this.style = u(
            {
              fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
              fontSize: "12px",
            },
            a
          ));
        };
        H.prototype.setStyle = function (a) {
          this.boxWrapper.css(this.getStyle(a));
        };
        H.prototype.isHidden = function () {
          return !this.boxWrapper.getBBox().width;
        };
        H.prototype.destroy = function () {
          var a = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          A(this.gradients || {});
          this.gradients = null;
          a && (this.defs = a.destroy());
          this.unSubPixelFix && this.unSubPixelFix();
          return (this.alignedObjects = null);
        };
        H.prototype.createElement = function (a) {
          var c = new this.Element();
          c.init(this, a);
          return c;
        };
        H.prototype.getRadialAttr = function (a, c) {
          return {
            cx: a[0] - a[2] / 2 + (c.cx || 0) * a[2],
            cy: a[1] - a[2] / 2 + (c.cy || 0) * a[2],
            r: (c.r || 0) * a[2],
          };
        };
        H.prototype.buildText = function (a) {
          new C(a).buildSVG();
        };
        H.prototype.getContrast = function (a) {
          a = e.parse(a).rgba;
          a[0] *= 1;
          a[1] *= 1.2;
          a[2] *= 0.5;
          return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF";
        };
        H.prototype.button = function (a, c, g, b, H, d, p, q, r, v) {
          var x = this.label(a, c, g, r, void 0, void 0, v, void 0, "button"),
            k = 0,
            n = this.styledMode,
            B = H ? w(H) : {};
          a = (B && B.style) || {};
          B = E.filterUserAttributes(B);
          x.attr(w({ padding: 8, r: 2 }, B));
          if (!n) {
            B = w(
              {
                fill: D.neutralColor3,
                stroke: D.neutralColor20,
                "stroke-width": 1,
                style: { color: D.neutralColor80, cursor: "pointer", fontWeight: "normal" },
              },
              { style: a },
              B
            );
            var l = B.style;
            delete B.style;
            d = w(B, { fill: D.neutralColor10 }, E.filterUserAttributes(d || {}));
            var J = d.style;
            delete d.style;
            p = w(
              B,
              { fill: D.highlightColor10, style: { color: D.neutralColor100, fontWeight: "bold" } },
              E.filterUserAttributes(p || {})
            );
            var M = p.style;
            delete p.style;
            q = w(B, { style: { color: D.neutralColor20 } }, E.filterUserAttributes(q || {}));
            var f = q.style;
            delete q.style;
          }
          t(x.element, O ? "mouseover" : "mouseenter", function () {
            3 !== k && x.setState(1);
          });
          t(x.element, O ? "mouseout" : "mouseleave", function () {
            3 !== k && x.setState(k);
          });
          x.setState = function (a) {
            1 !== a && (x.state = k = a);
            x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass(
              "highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]
            );
            n || x.attr([B, d, p, q][a || 0]).css([l, J, M, f][a || 0]);
          };
          n || x.attr(B).css(u({ cursor: "default" }, l));
          return x
            .on("touchstart", function (a) {
              return a.stopPropagation();
            })
            .on("click", function (a) {
              3 !== k && b.call(x, a);
            });
        };
        H.prototype.crispLine = function (a, c, g) {
          void 0 === g && (g = "round");
          var x = a[0],
            b = a[1];
          x[1] === b[1] && (x[1] = b[1] = Math[g](x[1]) - (c % 2) / 2);
          x[2] === b[2] && (x[2] = b[2] = Math[g](x[2]) + (c % 2) / 2);
          return a;
        };
        H.prototype.path = function (a) {
          var c = this.styledMode ? {} : { fill: "none" };
          l(a) ? (c.d = a) : k(a) && u(c, a);
          return this.createElement("path").attr(c);
        };
        H.prototype.circle = function (a, c, g) {
          a = k(a) ? a : "undefined" === typeof a ? {} : { x: a, y: c, r: g };
          c = this.createElement("circle");
          c.xSetter = c.ySetter = function (a, c, x) {
            x.setAttribute("c" + c, a);
          };
          return c.attr(a);
        };
        H.prototype.arc = function (a, c, g, b, H, d) {
          k(a) ? ((b = a), (c = b.y), (g = b.r), (a = b.x)) : (b = { innerR: b, start: H, end: d });
          a = this.symbol("arc", a, c, g, g, b);
          a.r = g;
          return a;
        };
        H.prototype.rect = function (a, c, g, b, H, d) {
          H = k(a) ? a.r : H;
          var x = this.createElement("rect");
          a = k(a)
            ? a
            : "undefined" === typeof a
            ? {}
            : { x: a, y: c, width: Math.max(g, 0), height: Math.max(b, 0) };
          this.styledMode ||
            ("undefined" !== typeof d && ((a["stroke-width"] = d), (a = x.crisp(a))),
            (a.fill = "none"));
          H && (a.r = H);
          x.rSetter = function (a, c, g) {
            x.r = a;
            z(g, { rx: a, ry: a });
          };
          x.rGetter = function () {
            return x.r || 0;
          };
          return x.attr(a);
        };
        H.prototype.setSize = function (a, c, g) {
          this.width = a;
          this.height = c;
          this.boxWrapper.animate(
            { width: a, height: c },
            {
              step: function () {
                this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
              },
              duration: n(g, !0) ? void 0 : 0,
            }
          );
          this.alignElements();
        };
        H.prototype.g = function (a) {
          var c = this.createElement("g");
          return a ? c.attr({ class: "highcharts-" + a }) : c;
        };
        H.prototype.image = function (a, c, g, b, H, d) {
          var x = { preserveAspectRatio: "none" },
            p = function (a, c) {
              a.setAttributeNS
                ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", c)
                : a.setAttribute("hc-svg-href", c);
            },
            q = function (c) {
              p(r.element, a);
              d.call(r, c);
            };
          1 < arguments.length && u(x, { x: c, y: g, width: b, height: H });
          var r = this.createElement("image").attr(x);
          d
            ? (p(
                r.element,
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              ),
              (x = new N.Image()),
              t(x, "load", q),
              (x.src = a),
              x.complete && q({}))
            : p(r.element, a);
          return r;
        };
        H.prototype.symbol = function (a, c, g, H, d, p) {
          var x = this,
            r = /^url\((.*?)\)$/,
            k = r.test(a),
            l = !k && (this.symbols[a] ? a : "circle"),
            J = l && this.symbols[l],
            M;
          if (J) {
            "number" === typeof c &&
              (M = J.call(this.symbols, Math.round(c || 0), Math.round(g || 0), H || 0, d || 0, p));
            var w = this.path(M);
            x.styledMode || w.attr("fill", "none");
            u(w, { symbolName: l, x: c, y: g, width: H, height: d });
            p && u(w, p);
          } else if (k) {
            var N = a.match(r)[1];
            w = this.image(N);
            w.imgwidth = n(v[N] && v[N].width, p && p.width);
            w.imgheight = n(v[N] && v[N].height, p && p.height);
            var R = function () {
              w.attr({ width: w.width, height: w.height });
            };
            ["width", "height"].forEach(function (a) {
              w[a + "Setter"] = function (a, c) {
                var g = this["img" + c];
                this[c] = a;
                b(g) &&
                  (p &&
                    "within" === p.backgroundSize &&
                    this.width &&
                    this.height &&
                    (g = Math.round(
                      g * Math.min(this.width / this.imgwidth, this.height / this.imgheight)
                    )),
                  this.element && this.element.setAttribute(c, g),
                  this.alignByTranslate ||
                    ((a = ((this[c] || 0) - g) / 2),
                    this.attr("width" === c ? { translateX: a } : { translateY: a })));
              };
            });
            b(c) && w.attr({ x: c, y: g });
            w.isImg = !0;
            b(w.imgwidth) && b(w.imgheight)
              ? R()
              : (w.attr({ width: 0, height: 0 }),
                m("img", {
                  onload: function () {
                    var a = q[x.chartIndex];
                    0 === this.width &&
                      (f(this, { position: "absolute", top: "-999em" }), B.body.appendChild(this));
                    v[N] = { width: this.width, height: this.height };
                    w.imgwidth = this.width;
                    w.imgheight = this.height;
                    w.element && R();
                    this.parentNode && this.parentNode.removeChild(this);
                    x.imgCount--;
                    if (!x.imgCount && a && !a.hasLoaded) a.onload();
                  },
                  src: N,
                }),
                this.imgCount++);
          }
          return w;
        };
        H.prototype.clipRect = function (a, g, b, H) {
          var x = c() + "-",
            d = this.createElement("clipPath").attr({ id: x }).add(this.defs);
          a = this.rect(a, g, b, H, 0).add(d);
          a.id = x;
          a.clipPath = d;
          a.count = 0;
          return a;
        };
        H.prototype.text = function (a, c, g, H) {
          var x = {};
          if (H && (this.allowHTML || !this.forExport)) return this.html(a, c, g);
          x.x = Math.round(c || 0);
          g && (x.y = Math.round(g));
          b(a) && (x.text = a);
          a = this.createElement("text").attr(x);
          H ||
            (a.xSetter = function (a, c, g) {
              var x = g.getElementsByTagName("tspan"),
                b = g.getAttribute(c),
                H;
              for (H = 0; H < x.length; H++) {
                var d = x[H];
                d.getAttribute(c) === b && d.setAttribute(c, a);
              }
              g.setAttribute(c, a);
            });
          return a;
        };
        H.prototype.fontMetrics = function (a, c) {
          a =
            (!this.styledMode && /px/.test(a)) || !N.getComputedStyle
              ? a || (c && c.style && c.style.fontSize) || (this.style && this.style.fontSize)
              : c && y.prototype.getStyle.call(c, "font-size");
          a = /px/.test(a) ? g(a) : 12;
          c = 24 > a ? a + 3 : Math.round(1.2 * a);
          return { h: c, b: Math.round(0.8 * c), f: a };
        };
        H.prototype.rotCorr = function (c, g, b) {
          var x = c;
          g && b && (x = Math.max(x * Math.cos(g * a), 4));
          return { x: (-c / 3) * Math.sin(g * a), y: x };
        };
        H.prototype.pathToSegments = function (a) {
          for (
            var c = [], g = [], b = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 }, x = 0;
            x < a.length;
            x++
          )
            d(g[0]) &&
              I(a[x]) &&
              g.length === b[g[0].toUpperCase()] &&
              a.splice(x, 0, g[0].replace("M", "L").replace("m", "l")),
              "string" === typeof a[x] && (g.length && c.push(g.slice(0)), (g.length = 0)),
              g.push(a[x]);
          c.push(g.slice(0));
          return c;
        };
        H.prototype.label = function (a, c, g, b, H, d, p, q, r) {
          return new F(this, a, c, g, b, H, d, p, q, r);
        };
        H.prototype.alignElements = function () {
          this.alignedObjects.forEach(function (a) {
            return a.align();
          });
        };
        return H;
      })();
      G.prototype.Element = y;
      G.prototype.SVG_NS = M;
      G.prototype.draw = r;
      G.prototype.escapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
      var L = function (a, c, g, b, d) {
        d = (d && d.r) || 0;
        return [
          ["M", a + d, c],
          ["L", a + g - d, c],
          ["C", a + g, c, a + g, c, a + g, c + d],
          ["L", a + g, c + b - d],
          ["C", a + g, c + b, a + g, c + b, a + g - d, c + b],
          ["L", a + d, c + b],
          ["C", a, c + b, a, c + b, a, c + b - d],
          ["L", a, c + d],
          ["C", a, c, a, c, a + d, c],
        ];
      };
      r = function (a, c, g, b, d) {
        return d && d.r
          ? L(a, c, g, b, d)
          : [["M", a, c], ["L", a + g, c], ["L", a + g, c + b], ["L", a, c + b], ["Z"]];
      };
      G.prototype.symbols = {
        circle: function (a, c, g, b) {
          return this.arc(a + g / 2, c + b / 2, g / 2, b / 2, {
            start: 0.5 * Math.PI,
            end: 2.5 * Math.PI,
            open: !1,
          });
        },
        rect: r,
        square: r,
        triangle: function (a, c, g, b) {
          return [["M", a + g / 2, c], ["L", a + g, c + b], ["L", a, c + b], ["Z"]];
        },
        "triangle-down": function (a, c, g, b) {
          return [["M", a, c], ["L", a + g, c], ["L", a + g / 2, c + b], ["Z"]];
        },
        diamond: function (a, c, g, b) {
          return [
            ["M", a + g / 2, c],
            ["L", a + g, c + b / 2],
            ["L", a + g / 2, c + b],
            ["L", a, c + b / 2],
            ["Z"],
          ];
        },
        arc: function (a, c, g, d, p) {
          var x = [];
          if (p) {
            var H = p.start || 0,
              q = n(p.r, g);
            g = n(p.r, d || g);
            var r = (p.end || 0) - 0.001;
            d = p.innerR;
            var v = n(p.open, 0.001 > Math.abs((p.end || 0) - H - 2 * Math.PI)),
              k = Math.cos(H),
              B = Math.sin(H),
              l = Math.cos(r),
              J = Math.sin(r);
            H = n(p.longArc, 0.001 > r - H - Math.PI ? 0 : 1);
            x.push(
              ["M", a + q * k, c + g * B],
              ["A", q, g, 0, H, n(p.clockwise, 1), a + q * l, c + g * J]
            );
            b(d) &&
              x.push(v ? ["M", a + d * l, c + d * J] : ["L", a + d * l, c + d * J], [
                "A",
                d,
                d,
                0,
                H,
                b(p.clockwise) ? 1 - p.clockwise : 0,
                a + d * k,
                c + d * B,
              ]);
            v || x.push(["Z"]);
          }
          return x;
        },
        callout: function (a, c, g, b, d) {
          var x = Math.min((d && d.r) || 0, g, b),
            p = x + 6,
            H = d && d.anchorX;
          d = (d && d.anchorY) || 0;
          var q = L(a, c, g, b, { r: x });
          if (!I(H)) return q;
          a + H >= g
            ? d > c + p && d < c + b - p
              ? q.splice(
                  3,
                  1,
                  ["L", a + g, d - 6],
                  ["L", a + g + 6, d],
                  ["L", a + g, d + 6],
                  ["L", a + g, c + b - x]
                )
              : q.splice(
                  3,
                  1,
                  ["L", a + g, b / 2],
                  ["L", H, d],
                  ["L", a + g, b / 2],
                  ["L", a + g, c + b - x]
                )
            : 0 >= a + H
            ? d > c + p && d < c + b - p
              ? q.splice(7, 1, ["L", a, d + 6], ["L", a - 6, d], ["L", a, d - 6], ["L", a, c + x])
              : q.splice(7, 1, ["L", a, b / 2], ["L", H, d], ["L", a, b / 2], ["L", a, c + x])
            : d && d > b && H > a + p && H < a + g - p
            ? q.splice(
                5,
                1,
                ["L", H + 6, c + b],
                ["L", H, c + b + 6],
                ["L", H - 6, c + b],
                ["L", a + x, c + b]
              )
            : d &&
              0 > d &&
              H > a + p &&
              H < a + g - p &&
              q.splice(1, 1, ["L", H - 6, c], ["L", H, c - 6], ["L", H + 6, c], ["L", g - x, c]);
          return q;
        },
      };
      h.SVGRenderer = G;
      h.Renderer = h.SVGRenderer;
      return h.Renderer;
    }
  );
  P(
    e,
    "Core/Renderer/HTML/HTMLElement.js",
    [e["Core/Globals.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      var y = e.isFirefox,
        F = e.isMS,
        E = e.isWebKit,
        C = e.win,
        G = D.css,
        t = D.defined,
        z = D.extend,
        m = D.pick,
        f = D.pInt;
      z(h.prototype, {
        htmlCss: function (b) {
          var f = "SPAN" === this.element.tagName && b && "width" in b,
            u = m(f && b.width, void 0);
          if (f) {
            delete b.width;
            this.textWidth = u;
            var l = !0;
          }
          b &&
            "ellipsis" === b.textOverflow &&
            ((b.whiteSpace = "nowrap"), (b.overflow = "hidden"));
          this.styles = z(this.styles, b);
          G(this.element, b);
          l && this.htmlUpdateTransform();
          return this;
        },
        htmlGetBBox: function () {
          var b = this.element;
          return { x: b.offsetLeft, y: b.offsetTop, width: b.offsetWidth, height: b.offsetHeight };
        },
        htmlUpdateTransform: function () {
          if (this.added) {
            var b = this.renderer,
              m = this.element,
              u = this.translateX || 0,
              l = this.translateY || 0,
              I = this.x || 0,
              k = this.y || 0,
              d = this.textAlign || "left",
              w = { left: 0, center: 0.5, right: 1 }[d],
              n = this.styles;
            n = n && n.whiteSpace;
            G(m, { marginLeft: u, marginTop: l });
            !b.styledMode &&
              this.shadows &&
              this.shadows.forEach(function (a) {
                G(a, { marginLeft: u + 1, marginTop: l + 1 });
              });
            this.inverted &&
              [].forEach.call(m.childNodes, function (a) {
                b.invertChild(a, m);
              });
            if ("SPAN" === m.tagName) {
              var g = this.rotation,
                c = void 0;
              c = this.textWidth && f(this.textWidth);
              var q = [g, d, m.innerHTML, this.textWidth, this.textAlign].join(),
                a;
              (a = c !== this.oldTextWidth) &&
                !(a = c > this.oldTextWidth) &&
                ((a = this.textPxLength) ||
                  (G(m, { width: "", whiteSpace: n || "nowrap" }), (a = m.offsetWidth)),
                (a = a > c));
              a &&
              (/[ \-]/.test(m.textContent || m.innerText) || "ellipsis" === m.style.textOverflow)
                ? (G(m, { width: c + "px", display: "block", whiteSpace: n || "normal" }),
                  (this.oldTextWidth = c),
                  (this.hasBoxWidthChanged = !0))
                : (this.hasBoxWidthChanged = !1);
              q !== this.cTT &&
                ((c = b.fontMetrics(m.style.fontSize, m).b),
                !t(g) ||
                  (g === (this.oldRotation || 0) && d === this.oldAlign) ||
                  this.setSpanRotation(g, w, c),
                this.getSpanCorrection((!t(g) && this.textPxLength) || m.offsetWidth, c, w, g, d));
              G(m, { left: I + (this.xCorr || 0) + "px", top: k + (this.yCorr || 0) + "px" });
              this.cTT = q;
              this.oldRotation = g;
              this.oldAlign = d;
            }
          } else this.alignOnAdd = !0;
        },
        setSpanRotation: function (b, f, m) {
          var l = {},
            I =
              F && !/Edge/.test(C.navigator.userAgent)
                ? "-ms-transform"
                : E
                ? "-webkit-transform"
                : y
                ? "MozTransform"
                : C.opera
                ? "-o-transform"
                : void 0;
          I &&
            ((l[I] = l.transform = "rotate(" + b + "deg)"),
            (l[I + (y ? "Origin" : "-origin")] = l.transformOrigin = 100 * f + "% " + m + "px"),
            G(this.element, l));
        },
        getSpanCorrection: function (b, f, m) {
          this.xCorr = -b * m;
          this.yCorr = -f;
        },
      });
      return h;
    }
  );
  P(
    e,
    "Core/Renderer/HTML/HTMLRenderer.js",
    [
      e["Core/Renderer/HTML/AST.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Renderer/SVG/SVGRenderer.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y) {
      var F = y.attr,
        E = y.createElement,
        C = y.extend,
        G = y.pick;
      C(D.prototype, {
        html: function (t, z, m) {
          var f = this.createElement("span"),
            b = f.element,
            A = f.renderer,
            u = A.isSVG,
            l = function (b, k) {
              ["opacity", "visibility"].forEach(function (d) {
                b[d + "Setter"] = function (l, n, g) {
                  var c = b.div ? b.div.style : k;
                  h.prototype[d + "Setter"].call(this, l, n, g);
                  c && (c[n] = l);
                };
              });
              b.addedSetters = !0;
            };
          f.textSetter = function (b) {
            b !== this.textStr &&
              (delete this.bBox,
              delete this.oldTextWidth,
              e.setElementHTML(this.element, G(b, "")),
              (this.textStr = b),
              (f.doTransform = !0));
          };
          u && l(f, f.element.style);
          f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function (b, k) {
            "align" === k ? (f.alignValue = f.textAlign = b) : (f[k] = b);
            f.doTransform = !0;
          };
          f.afterSetters = function () {
            this.doTransform && (this.htmlUpdateTransform(), (this.doTransform = !1));
          };
          f.attr({ text: t, x: Math.round(z), y: Math.round(m) }).css({ position: "absolute" });
          A.styledMode ||
            f.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize });
          b.style.whiteSpace = "nowrap";
          f.css = f.htmlCss;
          u &&
            (f.add = function (I) {
              var k = A.box.parentNode,
                d = [];
              if ((this.parentGroup = I)) {
                var w = I.div;
                if (!w) {
                  for (; I; ) d.push(I), (I = I.parentGroup);
                  d.reverse().forEach(function (b) {
                    function g(c, g) {
                      b[g] = c;
                      "translateX" === g ? (a.left = c + "px") : (a.top = c + "px");
                      b.doTransform = !0;
                    }
                    var c = F(b.element, "class"),
                      q = b.styles || {};
                    w = b.div =
                      b.div ||
                      E(
                        "div",
                        c ? { className: c } : void 0,
                        {
                          position: "absolute",
                          left: (b.translateX || 0) + "px",
                          top: (b.translateY || 0) + "px",
                          display: b.display,
                          opacity: b.opacity,
                          cursor: q.cursor,
                          pointerEvents: q.pointerEvents,
                        },
                        w || k
                      );
                    var a = w.style;
                    C(b, {
                      classSetter: (function (a) {
                        return function (c) {
                          this.element.setAttribute("class", c);
                          a.className = c;
                        };
                      })(w),
                      on: function () {
                        d[0].div &&
                          f.on.apply({ element: d[0].div, onEvents: f.onEvents }, arguments);
                        return b;
                      },
                      translateXSetter: g,
                      translateYSetter: g,
                    });
                    b.addedSetters || l(b);
                  });
                }
              } else w = k;
              w.appendChild(b);
              f.added = !0;
              f.alignOnAdd && f.htmlUpdateTransform();
              return f;
            });
          return f;
        },
      });
      return D;
    }
  );
  P(
    e,
    "Core/Axis/Tick.js",
    [e["Core/FormatUtilities.js"], e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      var y = h.deg2rad,
        F = D.clamp,
        E = D.correctFloat,
        C = D.defined,
        G = D.destroyObjectProperties,
        t = D.extend,
        z = D.fireEvent,
        m = D.isNumber,
        f = D.merge,
        b = D.objectEach,
        A = D.pick;
      ("");
      D = (function () {
        function u(b, f, k, d, w) {
          this.isNewLabel = this.isNew = !0;
          this.axis = b;
          this.pos = f;
          this.type = k || "";
          this.parameters = w || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          z(this, "init");
          k || d || this.addLabel();
        }
        u.prototype.addLabel = function () {
          var b = this,
            f = b.axis,
            k = f.options,
            d = f.chart,
            w = f.categories,
            n = f.logarithmic,
            g = f.names,
            c = b.pos,
            q = A(b.options && b.options.labels, k.labels),
            a = f.tickPositions,
            B = c === a[0],
            J = c === a[a.length - 1],
            O = b.label,
            p = (!q.step || 1 === q.step) && 1 === f.tickInterval;
          a = a.info;
          var r, M;
          w = this.parameters.category || (w ? A(w[c], g[c], c) : c);
          n && m(w) && (w = E(n.lin2log(w)));
          if (f.dateTime && a) {
            var v = d.time.resolveDTLFormat(
              k.dateTimeLabelFormats[(!k.grid && a.higherRanks[c]) || a.unitName]
            );
            var N = v.main;
          }
          b.isFirst = B;
          b.isLast = J;
          var K = {
            axis: f,
            chart: d,
            dateTimeLabelFormat: N,
            isFirst: B,
            isLast: J,
            pos: c,
            tick: b,
            tickPositionInfo: a,
            value: w,
          };
          z(this, "labelFormat", K);
          var u = function (a) {
            return q.formatter
              ? q.formatter.call(a, a)
              : q.format
              ? ((a.text = f.defaultLabelFormatter.call(a)), e.format(q.format, a, d))
              : f.defaultLabelFormatter.call(a, a);
          };
          k = u.call(K, K);
          if ((M = v && v.list))
            b.shortenLabel = function () {
              for (r = 0; r < M.length; r++)
                if (
                  (t(K, { dateTimeLabelFormat: M[r] }),
                  O.attr({ text: u.call(K, K) }),
                  O.getBBox().width < f.getSlotWidth(b) - 2 * q.padding)
                )
                  return;
              O.attr({ text: "" });
            };
          p && f._addedPlotLB && b.moveLabel(k, q);
          C(O) || b.movedLabel
            ? O &&
              O.textStr !== k &&
              !p &&
              (!O.textWidth || q.style.width || O.styles.width || O.css({ width: null }),
              O.attr({ text: k }),
              (O.textPxLength = O.getBBox().width))
            : ((b.label = O = b.createLabel({ x: 0, y: 0 }, k, q)), (b.rotation = 0));
        };
        u.prototype.createLabel = function (b, m, k) {
          var d = this.axis,
            l = d.chart;
          if (
            (b =
              C(m) && k.enabled ? l.renderer.text(m, b.x, b.y, k.useHTML).add(d.labelGroup) : null)
          )
            l.styledMode || b.css(f(k.style)), (b.textPxLength = b.getBBox().width);
          return b;
        };
        u.prototype.destroy = function () {
          G(this, this.axis);
        };
        u.prototype.getPosition = function (b, f, k, d) {
          var l = this.axis,
            n = l.chart,
            g = (d && n.oldChartHeight) || n.chartHeight;
          b = {
            x: b
              ? E(l.translate(f + k, null, null, d) + l.transB)
              : l.left +
                l.offset +
                (l.opposite ? ((d && n.oldChartWidth) || n.chartWidth) - l.right - l.left : 0),
            y: b
              ? g - l.bottom + l.offset - (l.opposite ? l.height : 0)
              : E(g - l.translate(f + k, null, null, d) - l.transB),
          };
          b.y = F(b.y, -1e5, 1e5);
          z(this, "afterGetPosition", { pos: b });
          return b;
        };
        u.prototype.getLabelPosition = function (b, f, k, d, w, n, g, c) {
          var q = this.axis,
            a = q.transA,
            B = q.isLinked && q.linkedParent ? q.linkedParent.reversed : q.reversed,
            J = q.staggerLines,
            l = q.tickRotCorr || { x: 0, y: 0 },
            p = w.y,
            r =
              d || q.reserveSpaceDefault
                ? 0
                : -q.labelOffset * ("center" === q.labelAlign ? 0.5 : 1),
            M = {};
          C(p) ||
            (p =
              0 === q.side
                ? k.rotation
                  ? -8
                  : -k.getBBox().height
                : 2 === q.side
                ? l.y + 8
                : Math.cos(k.rotation * y) * (l.y - k.getBBox(!1, 0).height / 2));
          b = b + w.x + r + l.x - (n && d ? n * a * (B ? -1 : 1) : 0);
          f = f + p - (n && !d ? n * a * (B ? 1 : -1) : 0);
          J &&
            ((k = (g / (c || 1)) % J),
            q.opposite && (k = J - k - 1),
            (f += (q.labelOffset / J) * k));
          M.x = b;
          M.y = Math.round(f);
          z(this, "afterGetLabelPosition", { pos: M, tickmarkOffset: n, index: g });
          return M;
        };
        u.prototype.getLabelSize = function () {
          return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
        };
        u.prototype.getMarkPath = function (b, f, k, d, w, n) {
          return n.crispLine(
            [
              ["M", b, f],
              ["L", b + (w ? 0 : -k), f + (w ? k : 0)],
            ],
            d
          );
        };
        u.prototype.handleOverflow = function (b) {
          var f = this.axis,
            k = f.options.labels,
            d = b.x,
            l = f.chart.chartWidth,
            n = f.chart.spacing,
            g = A(f.labelLeft, Math.min(f.pos, n[3]));
          n = A(f.labelRight, Math.max(f.isRadial ? 0 : f.pos + f.len, l - n[1]));
          var c = this.label,
            q = this.rotation,
            a = { left: 0, center: 0.5, right: 1 }[f.labelAlign || c.attr("align")],
            B = c.getBBox().width,
            J = f.getSlotWidth(this),
            m = J,
            p = 1,
            r,
            M = {};
          if (q || "justify" !== k.overflow)
            0 > q && d - a * B < g
              ? (r = Math.round(d / Math.cos(q * y) - g))
              : 0 < q && d + a * B > n && (r = Math.round((l - d) / Math.cos(q * y)));
          else if (
            ((l = d + (1 - a) * B),
            d - a * B < g
              ? (m = b.x + m * (1 - a) - g)
              : l > n && ((m = n - b.x + m * a), (p = -1)),
            (m = Math.min(J, m)),
            m < J && "center" === f.labelAlign && (b.x += p * (J - m - a * (J - Math.min(B, m)))),
            B > m || (f.autoRotation && (c.styles || {}).width))
          )
            r = m;
          r &&
            (this.shortenLabel
              ? this.shortenLabel()
              : ((M.width = Math.floor(r) + "px"),
                (k.style || {}).textOverflow || (M.textOverflow = "ellipsis"),
                c.css(M)));
        };
        u.prototype.moveLabel = function (f, m) {
          var k = this,
            d = k.label,
            l = !1,
            n = k.axis,
            g = n.reversed;
          d && d.textStr === f
            ? ((k.movedLabel = d), (l = !0), delete k.label)
            : b(n.ticks, function (c) {
                l ||
                  c.isNew ||
                  c === k ||
                  !c.label ||
                  c.label.textStr !== f ||
                  ((k.movedLabel = c.label),
                  (l = !0),
                  (c.labelPos = k.movedLabel.xy),
                  delete c.label);
              });
          if (!l && (k.labelPos || d)) {
            var c = k.labelPos || d.xy;
            d = n.horiz ? (g ? 0 : n.width + n.left) : c.x;
            n = n.horiz ? c.y : g ? n.width + n.left : 0;
            k.movedLabel = k.createLabel({ x: d, y: n }, f, m);
            k.movedLabel && k.movedLabel.attr({ opacity: 0 });
          }
        };
        u.prototype.render = function (b, f, k) {
          var d = this.axis,
            l = d.horiz,
            n = this.pos,
            g = A(this.tickmarkOffset, d.tickmarkOffset);
          n = this.getPosition(l, n, g, f);
          g = n.x;
          var c = n.y;
          d = (l && g === d.pos + d.len) || (!l && c === d.pos) ? -1 : 1;
          l = A(k, this.label && this.label.newOpacity, 1);
          k = A(k, 1);
          this.isActive = !0;
          this.renderGridLine(f, k, d);
          this.renderMark(n, k, d);
          this.renderLabel(n, f, l, b);
          this.isNew = !1;
          z(this, "afterRender");
        };
        u.prototype.renderGridLine = function (b, f, k) {
          var d = this.axis,
            l = d.options,
            n = this.gridLine,
            g = {},
            c = this.pos,
            q = this.type,
            a = A(this.tickmarkOffset, d.tickmarkOffset),
            B = d.chart.renderer,
            J = l.gridLineWidth,
            m = l.gridLineColor,
            p = l.gridLineDashStyle;
          "minor" === this.type &&
            ((J = l.minorGridLineWidth),
            (m = l.minorGridLineColor),
            (p = l.minorGridLineDashStyle));
          n ||
            (d.chart.styledMode ||
              ((g.stroke = m), (g["stroke-width"] = J || 0), (g.dashstyle = p)),
            q || (g.zIndex = 1),
            b && (f = 0),
            (this.gridLine = n = B.path()
              .attr(g)
              .addClass("highcharts-" + (q ? q + "-" : "") + "grid-line")
              .add(d.gridGroup)));
          if (
            n &&
            (k = d.getPlotLinePath({
              value: c + a,
              lineWidth: n.strokeWidth() * k,
              force: "pass",
              old: b,
            }))
          )
            n[b || this.isNew ? "attr" : "animate"]({ d: k, opacity: f });
        };
        u.prototype.renderMark = function (b, f, k) {
          var d = this.axis,
            l = d.options,
            n = d.chart.renderer,
            g = this.type,
            c = d.tickSize(g ? g + "Tick" : "tick"),
            q = this.mark,
            a = !q,
            B = b.x;
          b = b.y;
          var J = A(l["minor" !== g ? "tickWidth" : "minorTickWidth"], !g && d.isXAxis ? 1 : 0);
          l = l["minor" !== g ? "tickColor" : "minorTickColor"];
          c &&
            (d.opposite && (c[0] = -c[0]),
            a &&
              ((this.mark = q = n
                .path()
                .addClass("highcharts-" + (g ? g + "-" : "") + "tick")
                .add(d.axisGroup)),
              d.chart.styledMode || q.attr({ stroke: l, "stroke-width": J })),
            q[a ? "attr" : "animate"]({
              d: this.getMarkPath(B, b, c[0], q.strokeWidth() * k, d.horiz, n),
              opacity: f,
            }));
        };
        u.prototype.renderLabel = function (b, f, k, d) {
          var l = this.axis,
            n = l.horiz,
            g = l.options,
            c = this.label,
            q = g.labels,
            a = q.step;
          l = A(this.tickmarkOffset, l.tickmarkOffset);
          var B = !0,
            J = b.x;
          b = b.y;
          c &&
            m(J) &&
            ((c.xy = b = this.getLabelPosition(J, b, c, n, q, l, d, a)),
            (this.isFirst && !this.isLast && !g.showFirstLabel) ||
            (this.isLast && !this.isFirst && !g.showLastLabel)
              ? (B = !1)
              : !n || q.step || q.rotation || f || 0 === k || this.handleOverflow(b),
            a && d % a && (B = !1),
            B && m(b.y)
              ? ((b.opacity = k),
                c[this.isNewLabel ? "attr" : "animate"](b),
                (this.isNewLabel = !1))
              : (c.attr("y", -9999), (this.isNewLabel = !0)));
        };
        u.prototype.replaceMovedLabel = function () {
          var b = this.label,
            f = this.axis,
            k = f.reversed;
          if (b && !this.isNew) {
            var d = f.horiz ? (k ? f.left : f.width + f.left) : b.xy.x;
            k = f.horiz ? b.xy.y : k ? f.width + f.top : f.top;
            b.animate({ x: d, y: k, opacity: 0 }, void 0, b.destroy);
            delete this.label;
          }
          f.isDirty = !0;
          this.label = this.movedLabel;
          delete this.movedLabel;
        };
        return u;
      })();
      h.Tick = D;
      return h.Tick;
    }
  );
  P(
    e,
    "Core/Axis/Axis.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Color/Palette.js"],
      e["Core/Options.js"],
      e["Core/Axis/Tick.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E, C) {
      var G = e.animObject,
        t = F.defaultOptions,
        z = C.addEvent,
        m = C.arrayMax,
        f = C.arrayMin,
        b = C.clamp,
        A = C.correctFloat,
        u = C.defined,
        l = C.destroyObjectProperties,
        I = C.erase,
        k = C.error,
        d = C.extend,
        w = C.fireEvent,
        n = C.getMagnitude,
        g = C.isArray,
        c = C.isFunction,
        q = C.isNumber,
        a = C.isString,
        B = C.merge,
        J = C.normalizeTickInterval,
        O = C.objectEach,
        p = C.pick,
        r = C.relativeLength,
        M = C.removeEvent,
        v = C.splat,
        N = C.syncTimeout;
      ("");
      var K = D.deg2rad;
      e = (function () {
        function L(a, c) {
          this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
          this.init(a, c);
        }
        L.prototype.init = function (a, b) {
          var g = b.isX,
            d = this;
          d.chart = a;
          d.horiz = a.inverted && !d.isZAxis ? !g : g;
          d.isXAxis = g;
          d.coll = d.coll || (g ? "xAxis" : "yAxis");
          w(this, "init", { userOptions: b });
          d.opposite = p(b.opposite, d.opposite);
          d.side = p(b.side, d.side, d.horiz ? (d.opposite ? 0 : 2) : d.opposite ? 1 : 3);
          d.setOptions(b);
          var x = this.options,
            H = x.labels,
            r = x.type;
          d.userOptions = b;
          d.minPixelPadding = 0;
          d.reversed = p(x.reversed, d.reversed);
          d.visible = x.visible;
          d.zoomEnabled = x.zoomEnabled;
          d.hasNames = "category" === r || !0 === x.categories;
          d.categories = x.categories || d.hasNames;
          d.names || ((d.names = []), (d.names.keys = {}));
          d.plotLinesAndBandsGroups = {};
          d.positiveValuesOnly = !!d.logarithmic;
          d.isLinked = u(x.linkedTo);
          d.ticks = {};
          d.labelEdge = [];
          d.minorTicks = {};
          d.plotLinesAndBands = [];
          d.alternateBands = {};
          d.len = 0;
          d.minRange = d.userMinRange = x.minRange || x.maxZoom;
          d.range = x.range;
          d.offset = x.offset || 0;
          d.max = null;
          d.min = null;
          b = p(x.crosshair, v(a.options.tooltip.crosshairs)[g ? 0 : 1]);
          d.crosshair = !0 === b ? {} : b;
          b = d.options.events;
          -1 === a.axes.indexOf(d) &&
            (g ? a.axes.splice(a.xAxis.length, 0, d) : a.axes.push(d), a[d.coll].push(d));
          d.series = d.series || [];
          a.inverted && !d.isZAxis && g && "undefined" === typeof d.reversed && (d.reversed = !0);
          d.labelRotation = q(H.rotation) ? H.rotation : void 0;
          O(b, function (a, b) {
            c(a) && z(d, b, a);
          });
          w(this, "afterInit");
        };
        L.prototype.setOptions = function (a) {
          this.options = B(
            L.defaultOptions,
            "yAxis" === this.coll && L.defaultYAxisOptions,
            [
              L.defaultTopAxisOptions,
              L.defaultRightAxisOptions,
              L.defaultBottomAxisOptions,
              L.defaultLeftAxisOptions,
            ][this.side],
            B(t[this.coll], a)
          );
          w(this, "afterSetOptions", { userOptions: a });
        };
        L.prototype.defaultLabelFormatter = function () {
          var a = this.axis,
            c = q(this.value) ? this.value : NaN,
            b = a.chart.time,
            g = this.dateTimeLabelFormat,
            d = t.lang,
            p = d.numericSymbols;
          d = d.numericSymbolMagnitude || 1e3;
          var r = p && p.length,
            v = a.logarithmic ? Math.abs(c) : a.tickInterval,
            k = this.chart.numberFormatter;
          if (a.categories) var f = "" + this.value;
          else if (g) f = b.dateFormat(g, c);
          else if (r && 1e3 <= v)
            for (; r-- && "undefined" === typeof f; )
              (a = Math.pow(d, r + 1)),
                v >= a &&
                  0 === (10 * c) % a &&
                  null !== p[r] &&
                  0 !== c &&
                  (f = k(c / a, -1) + p[r]);
          "undefined" === typeof f && (f = 1e4 <= Math.abs(c) ? k(c, -1) : k(c, -1, void 0, ""));
          return f;
        };
        L.prototype.getSeriesExtremes = function () {
          var a = this,
            c = a.chart,
            b;
          w(this, "getSeriesExtremes", null, function () {
            a.hasVisibleSeries = !1;
            a.dataMin = a.dataMax = a.threshold = null;
            a.softThreshold = !a.isXAxis;
            a.stacking && a.stacking.buildStacks();
            a.series.forEach(function (g) {
              if (g.visible || !c.options.chart.ignoreHiddenSeries) {
                var d = g.options,
                  x = d.threshold;
                a.hasVisibleSeries = !0;
                a.positiveValuesOnly && 0 >= x && (x = null);
                if (a.isXAxis) {
                  if (((d = g.xData), d.length)) {
                    d = a.logarithmic ? d.filter(a.validatePositiveValue) : d;
                    b = g.getXExtremes(d);
                    var H = b.min;
                    var r = b.max;
                    q(H) ||
                      H instanceof Date ||
                      ((d = d.filter(q)), (b = g.getXExtremes(d)), (H = b.min), (r = b.max));
                    d.length &&
                      ((a.dataMin = Math.min(p(a.dataMin, H), H)),
                      (a.dataMax = Math.max(p(a.dataMax, r), r)));
                  }
                } else if (
                  ((g = g.applyExtremes()),
                  q(g.dataMin) && ((H = g.dataMin), (a.dataMin = Math.min(p(a.dataMin, H), H))),
                  q(g.dataMax) && ((r = g.dataMax), (a.dataMax = Math.max(p(a.dataMax, r), r))),
                  u(x) && (a.threshold = x),
                  !d.softThreshold || a.positiveValuesOnly)
                )
                  a.softThreshold = !1;
              }
            });
          });
          w(this, "afterGetSeriesExtremes");
        };
        L.prototype.translate = function (a, c, b, g, d, p) {
          var x = this.linkedParent || this,
            r = 1,
            H = 0,
            v = g && x.old ? x.old.transA : x.transA;
          g = g && x.old ? x.old.min : x.min;
          var k = x.minPixelPadding;
          d =
            (x.isOrdinal || (x.brokenAxis && x.brokenAxis.hasBreaks) || (x.logarithmic && d)) &&
            x.lin2val;
          v || (v = x.transA);
          b && ((r *= -1), (H = x.len));
          x.reversed && ((r *= -1), (H -= r * (x.sector || x.len)));
          c
            ? ((a = (a * r + H - k) / v + g), d && (a = x.lin2val(a)))
            : (d && (a = x.val2lin(a)),
              (a = q(g) ? r * (a - g) * v + H + r * k + (q(p) ? v * p : 0) : void 0));
          return a;
        };
        L.prototype.toPixels = function (a, c) {
          return this.translate(a, !1, !this.horiz, null, !0) + (c ? 0 : this.pos);
        };
        L.prototype.toValue = function (a, c) {
          return this.translate(a - (c ? 0 : this.pos), !0, !this.horiz, null, !0);
        };
        L.prototype.getPlotLinePath = function (a) {
          function c(a, c, g) {
            if (("pass" !== B && a < c) || a > g) B ? (a = b(a, c, g)) : (u = !0);
            return a;
          }
          var g = this,
            d = g.chart,
            r = g.left,
            H = g.top,
            v = a.old,
            k = a.value,
            f = a.translatedValue,
            n = a.lineWidth,
            B = a.force,
            J,
            l,
            M,
            N,
            K = (v && d.oldChartHeight) || d.chartHeight,
            m = (v && d.oldChartWidth) || d.chartWidth,
            u,
            O = g.transB;
          a = {
            value: k,
            lineWidth: n,
            old: v,
            force: B,
            acrossPanes: a.acrossPanes,
            translatedValue: f,
          };
          w(this, "getPlotLinePath", a, function (a) {
            f = p(f, g.translate(k, null, null, v));
            f = b(f, -1e5, 1e5);
            J = M = Math.round(f + O);
            l = N = Math.round(K - f - O);
            q(f)
              ? g.horiz
                ? ((l = H), (N = K - g.bottom), (J = M = c(J, r, r + g.width)))
                : ((J = r), (M = m - g.right), (l = N = c(l, H, H + g.height)))
              : ((u = !0), (B = !1));
            a.path =
              u && !B
                ? null
                : d.renderer.crispLine(
                    [
                      ["M", J, l],
                      ["L", M, N],
                    ],
                    n || 1
                  );
          });
          return a.path;
        };
        L.prototype.getLinearTickPositions = function (a, c, b) {
          var g = A(Math.floor(c / a) * a);
          b = A(Math.ceil(b / a) * a);
          var d = [],
            x;
          A(g + a) === g && (x = 20);
          if (this.single) return [c];
          for (c = g; c <= b; ) {
            d.push(c);
            c = A(c + a, x);
            if (c === p) break;
            var p = c;
          }
          return d;
        };
        L.prototype.getMinorTickInterval = function () {
          var a = this.options;
          return !0 === a.minorTicks
            ? p(a.minorTickInterval, "auto")
            : !1 === a.minorTicks
            ? null
            : a.minorTickInterval;
        };
        L.prototype.getMinorTickPositions = function () {
          var a = this.options,
            c = this.tickPositions,
            b = this.minorTickInterval,
            g = [],
            d = this.pointRangePadding || 0,
            p = this.min - d;
          d = this.max + d;
          var q = d - p;
          if (q && q / b < this.len / 3) {
            var r = this.logarithmic;
            if (r)
              this.paddedTicks.forEach(function (a, c, d) {
                c && g.push.apply(g, r.getLogTickPositions(b, d[c - 1], d[c], !0));
              });
            else if (this.dateTime && "auto" === this.getMinorTickInterval())
              g = g.concat(
                this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(b), p, d, a.startOfWeek)
              );
            else for (a = p + ((c[0] - p) % b); a <= d && a !== g[0]; a += b) g.push(a);
          }
          0 !== g.length && this.trimTicks(g);
          return g;
        };
        L.prototype.adjustForMinRange = function () {
          var a = this.options,
            c = this.min,
            b = this.max,
            g = this.logarithmic,
            d = 0,
            q,
            r,
            v,
            k;
          this.isXAxis &&
            "undefined" === typeof this.minRange &&
            !g &&
            (u(a.min) || u(a.max)
              ? (this.minRange = null)
              : (this.series.forEach(function (a) {
                  v = a.xData;
                  k = a.xIncrement ? 1 : v.length - 1;
                  if (1 < v.length)
                    for (q = k; 0 < q; q--) if (((r = v[q] - v[q - 1]), !d || r < d)) d = r;
                }),
                (this.minRange = Math.min(5 * d, this.dataMax - this.dataMin))));
          if (b - c < this.minRange) {
            var n = this.dataMax - this.dataMin >= this.minRange;
            var B = this.minRange;
            var J = (B - b + c) / 2;
            J = [c - J, p(a.min, c - J)];
            n && (J[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
            c = m(J);
            b = [c + B, p(a.max, c + B)];
            n && (b[2] = g ? g.log2lin(this.dataMax) : this.dataMax);
            b = f(b);
            b - c < B && ((J[0] = b - B), (J[1] = p(a.min, b - B)), (c = m(J)));
          }
          this.min = c;
          this.max = b;
        };
        L.prototype.getClosest = function () {
          var a;
          this.categories
            ? (a = 1)
            : this.series.forEach(function (c) {
                var b = c.closestPointRange,
                  g = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
                !c.noSharedTooltip && u(b) && g && (a = u(a) ? Math.min(a, b) : b);
              });
          return a;
        };
        L.prototype.nameToX = function (a) {
          var c = g(this.categories),
            b = c ? this.categories : this.names,
            d = a.options.x;
          a.series.requireSorting = !1;
          u(d) ||
            (d = this.options.uniqueNames
              ? c
                ? b.indexOf(a.name)
                : p(b.keys[a.name], -1)
              : a.series.autoIncrement());
          if (-1 === d) {
            if (!c) var q = b.length;
          } else q = d;
          "undefined" !== typeof q && ((this.names[q] = a.name), (this.names.keys[a.name] = q));
          return q;
        };
        L.prototype.updateNames = function () {
          var a = this,
            c = this.names;
          0 < c.length &&
            (Object.keys(c.keys).forEach(function (a) {
              delete c.keys[a];
            }),
            (c.length = 0),
            (this.minRange = this.userMinRange),
            (this.series || []).forEach(function (c) {
              c.xIncrement = null;
              if (!c.points || c.isDirtyData)
                (a.max = Math.max(a.max, c.xData.length - 1)), c.processData(), c.generatePoints();
              c.data.forEach(function (b, g) {
                if (b && b.options && "undefined" !== typeof b.name) {
                  var d = a.nameToX(b);
                  "undefined" !== typeof d && d !== b.x && ((b.x = d), (c.xData[g] = d));
                }
              });
            }));
        };
        L.prototype.setAxisTranslation = function () {
          var c = this,
            b = c.max - c.min,
            g = c.axisPointRange || 0,
            d = 0,
            q = 0,
            r = c.linkedParent,
            v = !!c.categories,
            k = c.transA,
            f = c.isXAxis;
          if (f || v || g) {
            var B = c.getClosest();
            r
              ? ((d = r.minPointOffset), (q = r.pointRangePadding))
              : c.series.forEach(function (b) {
                  var x = v ? 1 : f ? p(b.options.pointRange, B, 0) : c.axisPointRange || 0,
                    r = b.options.pointPlacement;
                  g = Math.max(g, x);
                  if (!c.single || v)
                    (b = b.is("xrange") ? !f : f),
                      (d = Math.max(d, b && a(r) ? 0 : x / 2)),
                      (q = Math.max(q, b && "on" === r ? 0 : x));
                });
            r = c.ordinal && c.ordinal.slope && B ? c.ordinal.slope / B : 1;
            c.minPointOffset = d *= r;
            c.pointRangePadding = q *= r;
            c.pointRange = Math.min(g, c.single && v ? 1 : b);
            f && (c.closestPointRange = B);
          }
          c.translationSlope = c.transA = k = c.staticScale || c.len / (b + q || 1);
          c.transB = c.horiz ? c.left : c.bottom;
          c.minPixelPadding = k * d;
          w(this, "afterSetAxisTranslation");
        };
        L.prototype.minFromRange = function () {
          return this.max - this.range;
        };
        L.prototype.setTickInterval = function (a) {
          var c = this,
            b = c.chart,
            g = c.logarithmic,
            d = c.options,
            r = c.isXAxis,
            v = c.isLinked,
            f = d.maxPadding,
            B = d.minPadding,
            H = d.tickInterval,
            l = d.tickPixelInterval,
            M = c.categories,
            N = q(c.threshold) ? c.threshold : null,
            K = c.softThreshold;
          c.dateTime || M || v || this.getTickAmount();
          var m = p(c.userMin, d.min);
          var O = p(c.userMax, d.max);
          if (v) {
            c.linkedParent = b[c.coll][d.linkedTo];
            var L = c.linkedParent.getExtremes();
            c.min = p(L.min, L.dataMin);
            c.max = p(L.max, L.dataMax);
            d.type !== c.linkedParent.options.type && k(11, 1, b);
          } else {
            if (K && u(N))
              if (c.dataMin >= N) (L = N), (B = 0);
              else if (c.dataMax <= N) {
                var I = N;
                f = 0;
              }
            c.min = p(m, L, c.dataMin);
            c.max = p(O, I, c.dataMax);
          }
          g &&
            (c.positiveValuesOnly && !a && 0 >= Math.min(c.min, p(c.dataMin, c.min)) && k(10, 1, b),
            (c.min = A(g.log2lin(c.min), 16)),
            (c.max = A(g.log2lin(c.max), 16)));
          c.range &&
            u(c.max) &&
            ((c.userMin = c.min = m = Math.max(c.dataMin, c.minFromRange())),
            (c.userMax = O = c.max),
            (c.range = null));
          w(c, "foundExtremes");
          c.beforePadding && c.beforePadding();
          c.adjustForMinRange();
          !(M || c.axisPointRange || (c.stacking && c.stacking.usePercentage) || v) &&
            u(c.min) &&
            u(c.max) &&
            (b = c.max - c.min) &&
            (!u(m) && B && (c.min -= b * B), !u(O) && f && (c.max += b * f));
          q(c.userMin) ||
            (q(d.softMin) && d.softMin < c.min && (c.min = m = d.softMin),
            q(d.floor) && (c.min = Math.max(c.min, d.floor)));
          q(c.userMax) ||
            (q(d.softMax) && d.softMax > c.max && (c.max = O = d.softMax),
            q(d.ceiling) && (c.max = Math.min(c.max, d.ceiling)));
          K &&
            u(c.dataMin) &&
            ((N = N || 0),
            !u(m) && c.min < N && c.dataMin >= N
              ? (c.min = c.options.minRange ? Math.min(N, c.max - c.minRange) : N)
              : !u(O) &&
                c.max > N &&
                c.dataMax <= N &&
                (c.max = c.options.minRange ? Math.max(N, c.min + c.minRange) : N));
          q(c.min) &&
            q(c.max) &&
            !this.chart.polar &&
            c.min > c.max &&
            (u(c.options.min) ? (c.max = c.min) : u(c.options.max) && (c.min = c.max));
          c.tickInterval =
            c.min === c.max || "undefined" === typeof c.min || "undefined" === typeof c.max
              ? 1
              : v && c.linkedParent && !H && l === c.linkedParent.options.tickPixelInterval
              ? (H = c.linkedParent.tickInterval)
              : p(
                  H,
                  this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0,
                  M ? 1 : ((c.max - c.min) * l) / Math.max(c.len, l)
                );
          r &&
            !a &&
            c.series.forEach(function (a) {
              a.processData(c.min !== (c.old && c.old.min) || c.max !== (c.old && c.old.max));
            });
          c.setAxisTranslation();
          w(this, "initialAxisTranslation");
          c.pointRange && !H && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
          a = p(
            d.minTickInterval,
            c.dateTime &&
              !c.series.some(function (a) {
                return a.noSharedTooltip;
              })
              ? c.closestPointRange
              : 0
          );
          !H && c.tickInterval < a && (c.tickInterval = a);
          c.dateTime ||
            c.logarithmic ||
            H ||
            (c.tickInterval = J(
              c.tickInterval,
              void 0,
              n(c.tickInterval),
              p(d.allowDecimals, 0.5 > c.tickInterval || void 0 !== this.tickAmount),
              !!this.tickAmount
            ));
          this.tickAmount || (c.tickInterval = c.unsquish());
          this.setTickPositions();
        };
        L.prototype.setTickPositions = function () {
          var a = this.options,
            c = a.tickPositions;
          var b = this.getMinorTickInterval();
          var g = a.tickPositioner,
            d = this.hasVerticalPanning(),
            p = "colorAxis" === this.coll,
            q = (p || !d) && a.startOnTick;
          d = (p || !d) && a.endOnTick;
          this.tickmarkOffset =
            this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval
              ? 0.5
              : 0;
          this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
          this.single =
            this.min === this.max &&
            u(this.min) &&
            !this.tickAmount &&
            (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
          this.tickPositions = b = c && c.slice();
          !b &&
            ((this.ordinal && this.ordinal.positions) ||
            !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200))
              ? (b = this.dateTime
                  ? this.getTimeTicks(
                      this.dateTime.normalizeTimeTickInterval(this.tickInterval, a.units),
                      this.min,
                      this.max,
                      a.startOfWeek,
                      this.ordinal && this.ordinal.positions,
                      this.closestPointRange,
                      !0
                    )
                  : this.logarithmic
                  ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max)
                  : this.getLinearTickPositions(this.tickInterval, this.min, this.max))
              : ((b = [this.min, this.max]), k(19, !1, this.chart)),
            b.length > this.len && ((b = [b[0], b.pop()]), b[0] === b[1] && (b.length = 1)),
            (this.tickPositions = b),
            g && (g = g.apply(this, [this.min, this.max]))) &&
            (this.tickPositions = b = g);
          this.paddedTicks = b.slice(0);
          this.trimTicks(b, q, d);
          this.isLinked ||
            (this.single &&
              2 > b.length &&
              !this.categories &&
              !this.series.some(function (a) {
                return a.is("heatmap") && "between" === a.options.pointPlacement;
              }) &&
              ((this.min -= 0.5), (this.max += 0.5)),
            c || g || this.adjustTickAmount());
          w(this, "afterSetTickPositions");
        };
        L.prototype.trimTicks = function (a, c, b) {
          var g = a[0],
            d = a[a.length - 1],
            p = (!this.isOrdinal && this.minPointOffset) || 0;
          w(this, "trimTicks");
          if (!this.isLinked) {
            if (c && -Infinity !== g) this.min = g;
            else for (; this.min - p > a[0]; ) a.shift();
            if (b) this.max = d;
            else for (; this.max + p < a[a.length - 1]; ) a.pop();
            0 === a.length && u(g) && !this.options.tickPositions && a.push((d + g) / 2);
          }
        };
        L.prototype.alignToOthers = function () {
          var a = {},
            c,
            b = this.options;
          !1 !== this.chart.options.chart.alignTicks &&
            b.alignTicks &&
            !1 !== b.startOnTick &&
            !1 !== b.endOnTick &&
            !this.logarithmic &&
            this.chart[this.coll].forEach(function (b) {
              var g = b.options;
              g = [b.horiz ? g.left : g.top, g.width, g.height, g.pane].join();
              b.series.length && (a[g] ? (c = !0) : (a[g] = 1));
            });
          return c;
        };
        L.prototype.getTickAmount = function () {
          var a = this.options,
            c = a.tickAmount,
            b = a.tickPixelInterval;
          !u(a.tickInterval) &&
            !c &&
            this.len < b &&
            !this.isRadial &&
            !this.logarithmic &&
            a.startOnTick &&
            a.endOnTick &&
            (c = 2);
          !c && this.alignToOthers() && (c = Math.ceil(this.len / b) + 1);
          4 > c && ((this.finalTickAmt = c), (c = 5));
          this.tickAmount = c;
        };
        L.prototype.adjustTickAmount = function () {
          var a = this.options,
            c = this.tickInterval,
            b = this.tickPositions,
            g = this.tickAmount,
            d = this.finalTickAmt,
            r = b && b.length,
            v = p(this.threshold, this.softThreshold ? 0 : null);
          if (this.hasData() && q(this.min) && q(this.max)) {
            if (r < g) {
              for (; b.length < g; )
                b.length % 2 || this.min === v
                  ? b.push(A(b[b.length - 1] + c))
                  : b.unshift(A(b[0] - c));
              this.transA *= (r - 1) / (g - 1);
              this.min = a.startOnTick ? b[0] : Math.min(this.min, b[0]);
              this.max = a.endOnTick ? b[b.length - 1] : Math.max(this.max, b[b.length - 1]);
            } else r > g && ((this.tickInterval *= 2), this.setTickPositions());
            if (u(d)) {
              for (c = a = b.length; c--; )
                ((3 === d && 1 === c % 2) || (2 >= d && 0 < c && c < a - 1)) && b.splice(c, 1);
              this.finalTickAmt = void 0;
            }
          }
        };
        L.prototype.setScale = function () {
          var a,
            c = !1,
            b = !1;
          this.series.forEach(function (a) {
            c = c || a.isDirtyData || a.isDirty;
            b = b || (a.xAxis && a.xAxis.isDirty) || !1;
          });
          this.setAxisSize();
          (a = this.len !== (this.old && this.old.len)) ||
          c ||
          b ||
          this.isLinked ||
          this.forceRedraw ||
          this.userMin !== (this.old && this.old.userMin) ||
          this.userMax !== (this.old && this.old.userMax) ||
          this.alignToOthers()
            ? (this.stacking && this.stacking.resetStacks(),
              (this.forceRedraw = !1),
              this.getSeriesExtremes(),
              this.setTickInterval(),
              this.isDirty ||
                (this.isDirty =
                  a ||
                  this.min !== (this.old && this.old.min) ||
                  this.max !== (this.old && this.old.max)))
            : this.stacking && this.stacking.cleanStacks();
          c && this.panningState && (this.panningState.isDirty = !0);
          w(this, "afterSetScale");
        };
        L.prototype.setExtremes = function (a, c, b, g, q) {
          var r = this,
            v = r.chart;
          b = p(b, !0);
          r.series.forEach(function (a) {
            delete a.kdTree;
          });
          q = d(q, { min: a, max: c });
          w(r, "setExtremes", q, function () {
            r.userMin = a;
            r.userMax = c;
            r.eventArgs = q;
            b && v.redraw(g);
          });
        };
        L.prototype.zoom = function (a, c) {
          var b = this,
            g = this.dataMin,
            d = this.dataMax,
            q = this.options,
            r = Math.min(g, p(q.min, g)),
            v = Math.max(d, p(q.max, d));
          a = { newMin: a, newMax: c };
          w(this, "zoom", a, function (a) {
            var c = a.newMin,
              p = a.newMax;
            if (c !== b.min || p !== b.max)
              b.allowZoomOutside ||
                (u(g) && (c < r && (c = r), c > v && (c = v)),
                u(d) && (p < r && (p = r), p > v && (p = v))),
                (b.displayBtn = "undefined" !== typeof c || "undefined" !== typeof p),
                b.setExtremes(c, p, !1, void 0, { trigger: "zoom" });
            a.zoomed = !0;
          });
          return a.zoomed;
        };
        L.prototype.setAxisSize = function () {
          var a = this.chart,
            c = this.options,
            b = c.offsets || [0, 0, 0, 0],
            g = this.horiz,
            d = (this.width = Math.round(r(p(c.width, a.plotWidth - b[3] + b[1]), a.plotWidth))),
            q = (this.height = Math.round(
              r(p(c.height, a.plotHeight - b[0] + b[2]), a.plotHeight)
            )),
            v = (this.top = Math.round(r(p(c.top, a.plotTop + b[0]), a.plotHeight, a.plotTop)));
          c = this.left = Math.round(r(p(c.left, a.plotLeft + b[3]), a.plotWidth, a.plotLeft));
          this.bottom = a.chartHeight - q - v;
          this.right = a.chartWidth - d - c;
          this.len = Math.max(g ? d : q, 0);
          this.pos = g ? c : v;
        };
        L.prototype.getExtremes = function () {
          var a = this.logarithmic;
          return {
            min: a ? A(a.lin2log(this.min)) : this.min,
            max: a ? A(a.lin2log(this.max)) : this.max,
            dataMin: this.dataMin,
            dataMax: this.dataMax,
            userMin: this.userMin,
            userMax: this.userMax,
          };
        };
        L.prototype.getThreshold = function (a) {
          var c = this.logarithmic,
            b = c ? c.lin2log(this.min) : this.min;
          c = c ? c.lin2log(this.max) : this.max;
          null === a || -Infinity === a
            ? (a = b)
            : Infinity === a
            ? (a = c)
            : b > a
            ? (a = b)
            : c < a && (a = c);
          return this.translate(a, 0, 1, 0, 1);
        };
        L.prototype.autoLabelAlign = function (a) {
          var c = (p(a, 0) - 90 * this.side + 720) % 360;
          a = { align: "center" };
          w(this, "autoLabelAlign", a, function (a) {
            15 < c && 165 > c ? (a.align = "right") : 195 < c && 345 > c && (a.align = "left");
          });
          return a.align;
        };
        L.prototype.tickSize = function (a) {
          var c = this.options,
            b = c["tick" === a ? "tickLength" : "minorTickLength"],
            g = p(
              c["tick" === a ? "tickWidth" : "minorTickWidth"],
              "tick" === a && this.isXAxis && !this.categories ? 1 : 0
            );
          if (g && b) {
            "inside" === c[a + "Position"] && (b = -b);
            var d = [b, g];
          }
          a = { tickSize: d };
          w(this, "afterTickSize", a);
          return a.tickSize;
        };
        L.prototype.labelMetrics = function () {
          var a = (this.tickPositions && this.tickPositions[0]) || 0;
          return this.chart.renderer.fontMetrics(
            this.options.labels.style.fontSize,
            this.ticks[a] && this.ticks[a].label
          );
        };
        L.prototype.unsquish = function () {
          var a = this.options.labels,
            c = this.horiz,
            b = this.tickInterval,
            g = b,
            d = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / b),
            r,
            v = a.rotation,
            k = this.labelMetrics(),
            f,
            B = Number.MAX_VALUE,
            n = Math.max(this.max - this.min, 0),
            J = function (a) {
              var c = a / (d || 1);
              c = 1 < c ? Math.ceil(c) : 1;
              c * b > n && Infinity !== a && Infinity !== d && n && (c = Math.ceil(n / b));
              return A(c * b);
            };
          if (c) {
            if (!a.staggerLines && !a.step)
              if (q(v)) var l = [v];
              else d < a.autoRotationLimit && (l = a.autoRotation);
            l &&
              l.forEach(function (a) {
                if (a === v || (a && -90 <= a && 90 >= a)) {
                  f = J(Math.abs(k.h / Math.sin(K * a)));
                  var c = f + Math.abs(a / 360);
                  c < B && ((B = c), (r = a), (g = f));
                }
              });
          } else a.step || (g = J(k.h));
          this.autoRotation = l;
          this.labelRotation = p(r, q(v) ? v : 0);
          return g;
        };
        L.prototype.getSlotWidth = function (a) {
          var c = this.chart,
            b = this.horiz,
            g = this.options.labels,
            d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
            p = c.margin[3];
          if (a && q(a.slotWidth)) return a.slotWidth;
          if (b && 2 > g.step) return g.rotation ? 0 : ((this.staggerLines || 1) * this.len) / d;
          if (!b) {
            a = g.style.width;
            if (void 0 !== a) return parseInt(String(a), 10);
            if (p) return p - c.spacing[3];
          }
          return 0.33 * c.chartWidth;
        };
        L.prototype.renderUnsquish = function () {
          var c = this.chart,
            b = c.renderer,
            g = this.tickPositions,
            d = this.ticks,
            p = this.options.labels,
            q = p.style,
            r = this.horiz,
            v = this.getSlotWidth(),
            k = Math.max(1, Math.round(v - 2 * p.padding)),
            f = {},
            B = this.labelMetrics(),
            n = q.textOverflow,
            J = 0;
          a(p.rotation) || (f.rotation = p.rotation || 0);
          g.forEach(function (a) {
            a = d[a];
            a.movedLabel && a.replaceMovedLabel();
            a && a.label && a.label.textPxLength > J && (J = a.label.textPxLength);
          });
          this.maxLabelLength = J;
          if (this.autoRotation)
            J > k && J > B.h ? (f.rotation = this.labelRotation) : (this.labelRotation = 0);
          else if (v) {
            var l = k;
            if (!n) {
              var M = "clip";
              for (k = g.length; !r && k--; ) {
                var N = g[k];
                if ((N = d[N].label))
                  N.styles && "ellipsis" === N.styles.textOverflow
                    ? N.css({ textOverflow: "clip" })
                    : N.textPxLength > v && N.css({ width: v + "px" }),
                    N.getBBox().height > this.len / g.length - (B.h - B.f) &&
                      (N.specificTextOverflow = "ellipsis");
              }
            }
          }
          f.rotation &&
            ((l = J > 0.5 * c.chartHeight ? 0.33 * c.chartHeight : J), n || (M = "ellipsis"));
          if ((this.labelAlign = p.align || this.autoLabelAlign(this.labelRotation)))
            f.align = this.labelAlign;
          g.forEach(function (a) {
            var c = (a = d[a]) && a.label,
              b = q.width,
              g = {};
            c &&
              (c.attr(f),
              a.shortenLabel
                ? a.shortenLabel()
                : l &&
                  !b &&
                  "nowrap" !== q.whiteSpace &&
                  (l < c.textPxLength || "SPAN" === c.element.tagName)
                ? ((g.width = l + "px"),
                  n || (g.textOverflow = c.specificTextOverflow || M),
                  c.css(g))
                : c.styles && c.styles.width && !g.width && !b && c.css({ width: null }),
              delete c.specificTextOverflow,
              (a.rotation = f.rotation));
          }, this);
          this.tickRotCorr = b.rotCorr(B.b, this.labelRotation || 0, 0 !== this.side);
        };
        L.prototype.hasData = function () {
          return (
            this.series.some(function (a) {
              return a.hasData();
            }) ||
            (this.options.showEmpty && u(this.min) && u(this.max))
          );
        };
        L.prototype.addTitle = function (a) {
          var c = this.chart.renderer,
            b = this.horiz,
            g = this.opposite,
            d = this.options.title,
            p,
            q = this.chart.styledMode;
          this.axisTitle ||
            ((p = d.textAlign) ||
              (p = (b
                ? { low: "left", middle: "center", high: "right" }
                : { low: g ? "right" : "left", middle: "center", high: g ? "left" : "right" })[
                d.align
              ]),
            (this.axisTitle = c
              .text(d.text || "", 0, 0, d.useHTML)
              .attr({ zIndex: 7, rotation: d.rotation, align: p })
              .addClass("highcharts-axis-title")),
            q || this.axisTitle.css(B(d.style)),
            this.axisTitle.add(this.axisGroup),
            (this.axisTitle.isNew = !0));
          q || d.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" });
          this.axisTitle[a ? "show" : "hide"](a);
        };
        L.prototype.generateTick = function (a) {
          var c = this.ticks;
          c[a] ? c[a].addLabel() : (c[a] = new E(this, a));
        };
        L.prototype.getOffset = function () {
          var a = this,
            c = this,
            b = c.chart,
            g = b.renderer,
            d = c.options,
            q = c.tickPositions,
            r = c.ticks,
            v = c.horiz,
            k = c.side,
            f = b.inverted && !c.isZAxis ? [1, 0, 3, 2][k] : k,
            B,
            n = 0,
            J = 0,
            l = d.title,
            M = d.labels,
            N = 0,
            K = b.axisOffset;
          b = b.clipOffset;
          var m = [-1, 1, 1, -1][k],
            L = d.className,
            I = c.axisParent;
          var t = c.hasData();
          c.showAxis = B = t || d.showEmpty;
          c.staggerLines = (c.horiz && M.staggerLines) || void 0;
          if (!c.axisGroup) {
            var A = function (c, b, d) {
              return g
                .g(c)
                .attr({ zIndex: d })
                .addClass(
                  "highcharts-" +
                    a.coll.toLowerCase() +
                    b +
                    " " +
                    (a.isRadial ? "highcharts-radial-axis" + b + " " : "") +
                    (L || "")
                )
                .add(I);
            };
            c.gridGroup = A("grid", "-grid", d.gridZIndex);
            c.axisGroup = A("axis", "", d.zIndex);
            c.labelGroup = A("axis-labels", "-labels", M.zIndex);
          }
          t || c.isLinked
            ? (q.forEach(function (a, b) {
                c.generateTick(a, b);
              }),
              c.renderUnsquish(),
              (c.reserveSpaceDefault =
                0 === k || 2 === k || { 1: "left", 3: "right" }[k] === c.labelAlign),
              p(M.reserveSpace, "center" === c.labelAlign ? !0 : null, c.reserveSpaceDefault) &&
                q.forEach(function (a) {
                  N = Math.max(r[a].getLabelSize(), N);
                }),
              c.staggerLines && (N *= c.staggerLines),
              (c.labelOffset = N * (c.opposite ? -1 : 1)))
            : O(r, function (a, c) {
                a.destroy();
                delete r[c];
              });
          if (l && l.text && !1 !== l.enabled && (c.addTitle(B), B && !1 !== l.reserveSpace)) {
            c.titleOffset = n = c.axisTitle.getBBox()[v ? "height" : "width"];
            var h = l.offset;
            J = u(h) ? 0 : p(l.margin, v ? 5 : 10);
          }
          c.renderLine();
          c.offset = m * p(d.offset, K[k] ? K[k] + (d.margin || 0) : 0);
          c.tickRotCorr = c.tickRotCorr || { x: 0, y: 0 };
          l = 0 === k ? -c.labelMetrics().h : 2 === k ? c.tickRotCorr.y : 0;
          J = Math.abs(N) + J;
          N && (J = J - l + m * (v ? p(M.y, c.tickRotCorr.y + 8 * m) : M.x));
          c.axisTitleMargin = p(h, J);
          c.getMaxLabelDimensions && (c.maxLabelDimensions = c.getMaxLabelDimensions(r, q));
          v = this.tickSize("tick");
          K[k] = Math.max(
            K[k],
            (c.axisTitleMargin || 0) + n + m * c.offset,
            J,
            q && q.length && v ? v[0] + m * c.offset : 0
          );
          d = d.offset ? 0 : 2 * Math.floor(c.axisLine.strokeWidth() / 2);
          b[f] = Math.max(b[f], d);
          w(this, "afterGetOffset");
        };
        L.prototype.getLinePath = function (a) {
          var c = this.chart,
            b = this.opposite,
            g = this.offset,
            d = this.horiz,
            p = this.left + (b ? this.width : 0) + g;
          g = c.chartHeight - this.bottom - (b ? this.height : 0) + g;
          b && (a *= -1);
          return c.renderer.crispLine(
            [
              ["M", d ? this.left : p, d ? g : this.top],
              ["L", d ? c.chartWidth - this.right : p, d ? g : c.chartHeight - this.bottom],
            ],
            a
          );
        };
        L.prototype.renderLine = function () {
          this.axisLine ||
            ((this.axisLine = this.chart.renderer
              .path()
              .addClass("highcharts-axis-line")
              .add(this.axisGroup)),
            this.chart.styledMode ||
              this.axisLine.attr({
                stroke: this.options.lineColor,
                "stroke-width": this.options.lineWidth,
                zIndex: 7,
              }));
        };
        L.prototype.getTitlePosition = function () {
          var a = this.horiz,
            c = this.left,
            b = this.top,
            g = this.len,
            d = this.options.title,
            p = a ? c : b,
            q = this.opposite,
            r = this.offset,
            v = d.x,
            k = d.y,
            f = this.axisTitle,
            B = this.chart.renderer.fontMetrics(d.style.fontSize, f);
          f = Math.max(f.getBBox(null, 0).height - B.h - 1, 0);
          g = { low: p + (a ? 0 : g), middle: p + g / 2, high: p + (a ? g : 0) }[d.align];
          c =
            (a ? b + this.height : c) +
            (a ? 1 : -1) * (q ? -1 : 1) * this.axisTitleMargin +
            [-f, f, B.f, -f][this.side];
          a = {
            x: a ? g + v : c + (q ? this.width : 0) + r + v,
            y: a ? c + k - (q ? this.height : 0) + r : g + k,
          };
          w(this, "afterGetTitlePosition", { titlePosition: a });
          return a;
        };
        L.prototype.renderMinorTick = function (a) {
          var c = this.chart.hasRendered && this.old,
            b = this.minorTicks;
          b[a] || (b[a] = new E(this, a, "minor"));
          c && b[a].isNew && b[a].render(null, !0);
          b[a].render(null, !1, 1);
        };
        L.prototype.renderTick = function (a, c) {
          var b = this.ticks,
            g = this.chart.hasRendered && this.old;
          if (
            !this.isLinked ||
            (a >= this.min && a <= this.max) ||
            (this.grid && this.grid.isColumn)
          )
            b[a] || (b[a] = new E(this, a)),
              g && b[a].isNew && b[a].render(c, !0, -1),
              b[a].render(c);
        };
        L.prototype.render = function () {
          var a = this,
            c = a.chart,
            b = a.logarithmic,
            g = a.options,
            d = a.isLinked,
            p = a.tickPositions,
            r = a.axisTitle,
            v = a.ticks,
            k = a.minorTicks,
            f = a.alternateBands,
            B = g.stackLabels,
            J = g.alternateGridColor,
            n = a.tickmarkOffset,
            l = a.axisLine,
            M = a.showAxis,
            K = G(c.renderer.globalAnimation),
            m,
            u;
          a.labelEdge.length = 0;
          a.overlap = !1;
          [v, k, f].forEach(function (a) {
            O(a, function (a) {
              a.isActive = !1;
            });
          });
          if (a.hasData() || d)
            a.minorTickInterval &&
              !a.categories &&
              a.getMinorTickPositions().forEach(function (c) {
                a.renderMinorTick(c);
              }),
              p.length &&
                (p.forEach(function (c, b) {
                  a.renderTick(c, b);
                }),
                n &&
                  (0 === a.min || a.single) &&
                  (v[-1] || (v[-1] = new E(a, -1, null, !0)), v[-1].render(-1))),
              J &&
                p.forEach(function (g, d) {
                  u = "undefined" !== typeof p[d + 1] ? p[d + 1] + n : a.max - n;
                  0 === d % 2 &&
                    g < a.max &&
                    u <= a.max + (c.polar ? -n : n) &&
                    (f[g] || (f[g] = new D.PlotLineOrBand(a)),
                    (m = g + n),
                    (f[g].options = {
                      from: b ? b.lin2log(m) : m,
                      to: b ? b.lin2log(u) : u,
                      color: J,
                      className: "highcharts-alternate-grid",
                    }),
                    f[g].render(),
                    (f[g].isActive = !0));
                }),
              a._addedPlotLB ||
                ((a._addedPlotLB = !0),
                (g.plotLines || []).concat(g.plotBands || []).forEach(function (c) {
                  a.addPlotBandOrLine(c);
                }));
          [v, k, f].forEach(function (a) {
            var b,
              g = [],
              d = K.duration;
            O(a, function (a, c) {
              a.isActive || (a.render(c, !1, 0), (a.isActive = !1), g.push(c));
            });
            N(
              function () {
                for (b = g.length; b--; )
                  a[g[b]] && !a[g[b]].isActive && (a[g[b]].destroy(), delete a[g[b]]);
              },
              a !== f && c.hasRendered && d ? d : 0
            );
          });
          l &&
            (l[l.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(l.strokeWidth()) }),
            (l.isPlaced = !0),
            l[M ? "show" : "hide"](M));
          r &&
            M &&
            ((g = a.getTitlePosition()),
            q(g.y)
              ? (r[r.isNew ? "attr" : "animate"](g), (r.isNew = !1))
              : (r.attr("y", -9999), (r.isNew = !0)));
          B && B.enabled && a.stacking && a.stacking.renderStackTotals();
          a.old = {
            len: a.len,
            max: a.max,
            min: a.min,
            transA: a.transA,
            userMax: a.userMax,
            userMin: a.userMin,
          };
          a.isDirty = !1;
          w(this, "afterRender");
        };
        L.prototype.redraw = function () {
          this.visible &&
            (this.render(),
            this.plotLinesAndBands.forEach(function (a) {
              a.render();
            }));
          this.series.forEach(function (a) {
            a.isDirty = !0;
          });
        };
        L.prototype.getKeepProps = function () {
          return this.keepProps || L.keepProps;
        };
        L.prototype.destroy = function (a) {
          var c = this,
            b = c.plotLinesAndBands,
            g;
          w(this, "destroy", { keepEvents: a });
          a || M(c);
          [c.ticks, c.minorTicks, c.alternateBands].forEach(function (a) {
            l(a);
          });
          if (b) for (a = b.length; a--; ) b[a].destroy();
          "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar"
            .split(" ")
            .forEach(function (a) {
              c[a] && (c[a] = c[a].destroy());
            });
          for (g in c.plotLinesAndBandsGroups)
            c.plotLinesAndBandsGroups[g] = c.plotLinesAndBandsGroups[g].destroy();
          O(c, function (a, b) {
            -1 === c.getKeepProps().indexOf(b) && delete c[b];
          });
        };
        L.prototype.drawCrosshair = function (a, c) {
          var b = this.crosshair,
            g = p(b && b.snap, !0),
            q,
            r = this.cross,
            v = this.chart;
          w(this, "drawCrosshair", { e: a, point: c });
          a || (a = this.cross && this.cross.e);
          if (b && !1 !== (u(c) || !g)) {
            g
              ? u(c) &&
                (q = p(
                  "colorAxis" !== this.coll ? c.crosshairPos : null,
                  this.isXAxis ? c.plotX : this.len - c.plotY
                ))
              : (q = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos));
            if (u(q)) {
              var k = { value: c && (this.isXAxis ? c.x : p(c.stackY, c.y)), translatedValue: q };
              v.polar &&
                d(k, { isCrosshair: !0, chartX: a && a.chartX, chartY: a && a.chartY, point: c });
              k = this.getPlotLinePath(k) || null;
            }
            if (!u(k)) {
              this.hideCrosshair();
              return;
            }
            g = this.categories && !this.isRadial;
            r ||
              ((this.cross = r = v.renderer
                .path()
                .addClass(
                  "highcharts-crosshair highcharts-crosshair-" +
                    (g ? "category " : "thin ") +
                    (b.className || "")
                )
                .attr({ zIndex: p(b.zIndex, 2) })
                .add()),
              v.styledMode ||
                (r
                  .attr({
                    stroke:
                      b.color ||
                      (g ? h.parse(y.highlightColor20).setOpacity(0.25).get() : y.neutralColor20),
                    "stroke-width": p(b.width, 1),
                  })
                  .css({ "pointer-events": "none" }),
                b.dashStyle && r.attr({ dashstyle: b.dashStyle })));
            r.show().attr({ d: k });
            g && !b.width && r.attr({ "stroke-width": this.transA });
            this.cross.e = a;
          } else this.hideCrosshair();
          w(this, "afterDrawCrosshair", { e: a, point: c });
        };
        L.prototype.hideCrosshair = function () {
          this.cross && this.cross.hide();
          w(this, "afterHideCrosshair");
        };
        L.prototype.hasVerticalPanning = function () {
          var a = this.chart.options.chart.panning;
          return !!(a && a.enabled && /y/.test(a.type));
        };
        L.prototype.validatePositiveValue = function (a) {
          return q(a) && 0 < a;
        };
        L.prototype.update = function (a, c) {
          var b = this.chart,
            g = (a && a.events) || {};
          a = B(this.userOptions, a);
          O(b.options[this.coll].events, function (a, c) {
            "undefined" === typeof g[c] && (g[c] = void 0);
          });
          this.destroy(!0);
          this.init(b, d(a, { events: g }));
          b.isDirtyBox = !0;
          p(c, !0) && b.redraw();
        };
        L.prototype.remove = function (a) {
          for (var c = this.chart, b = this.coll, g = this.series, d = g.length; d--; )
            g[d] && g[d].remove(!1);
          I(c.axes, this);
          I(c[b], this);
          c[b].forEach(function (a, c) {
            a.options.index = a.userOptions.index = c;
          });
          this.destroy();
          c.isDirtyBox = !0;
          p(a, !0) && c.redraw();
        };
        L.prototype.setTitle = function (a, c) {
          this.update({ title: a }, c);
        };
        L.prototype.setCategories = function (a, c) {
          this.update({ categories: a }, c);
        };
        L.defaultOptions = {
          alignTicks: !0,
          allowDecimals: void 0,
          zIndex: 2,
          zoomEnabled: !0,
          dateTimeLabelFormats: {
            millisecond: { main: "%H:%M:%S.%L", range: !1 },
            second: { main: "%H:%M:%S", range: !1 },
            minute: { main: "%H:%M", range: !1 },
            hour: { main: "%H:%M", range: !1 },
            day: { main: "%e. %b" },
            week: { main: "%e. %b" },
            month: { main: "%b '%y" },
            year: { main: "%Y" },
          },
          endOnTick: !1,
          gridLineDashStyle: "Solid",
          gridZIndex: 1,
          labels: {
            autoRotation: void 0,
            autoRotationLimit: 80,
            distance: void 0,
            enabled: !0,
            indentation: 10,
            overflow: "justify",
            padding: 5,
            reserveSpace: void 0,
            rotation: void 0,
            staggerLines: 0,
            step: 0,
            useHTML: !1,
            x: 0,
            zIndex: 7,
            style: { color: y.neutralColor60, cursor: "default", fontSize: "11px" },
          },
          maxPadding: 0.01,
          minorGridLineDashStyle: "Solid",
          minorTickLength: 2,
          minorTickPosition: "outside",
          minPadding: 0.01,
          offset: void 0,
          opposite: !1,
          reversed: void 0,
          reversedStacks: !1,
          showEmpty: !0,
          showFirstLabel: !0,
          showLastLabel: !0,
          startOfWeek: 1,
          startOnTick: !1,
          tickLength: 10,
          tickPixelInterval: 100,
          tickmarkPlacement: "between",
          tickPosition: "outside",
          title: {
            align: "middle",
            rotation: 0,
            useHTML: !1,
            x: 0,
            y: 0,
            style: { color: y.neutralColor60 },
          },
          type: "linear",
          uniqueNames: !0,
          visible: !0,
          minorGridLineColor: y.neutralColor5,
          minorGridLineWidth: 1,
          minorTickColor: y.neutralColor40,
          lineColor: y.highlightColor20,
          lineWidth: 1,
          gridLineColor: y.neutralColor10,
          gridLineWidth: void 0,
          tickColor: y.highlightColor20,
        };
        L.defaultYAxisOptions = {
          reversedStacks: !0,
          endOnTick: !0,
          maxPadding: 0.05,
          minPadding: 0.05,
          tickPixelInterval: 72,
          showLastLabel: !0,
          labels: { x: -8 },
          startOnTick: !0,
          title: { rotation: 270, text: "Values" },
          stackLabels: {
            animation: {},
            allowOverlap: !1,
            enabled: !1,
            crop: !0,
            overflow: "justify",
            formatter: function () {
              var a = this.axis.chart.numberFormatter;
              return a(this.total, -1);
            },
            style: {
              color: y.neutralColor100,
              fontSize: "11px",
              fontWeight: "bold",
              textOutline: "1px contrast",
            },
          },
          gridLineWidth: 1,
          lineWidth: 0,
        };
        L.defaultLeftAxisOptions = { labels: { x: -15 }, title: { rotation: 270 } };
        L.defaultRightAxisOptions = { labels: { x: 15 }, title: { rotation: 90 } };
        L.defaultBottomAxisOptions = {
          labels: { autoRotation: [-45], x: 0 },
          margin: 15,
          title: { rotation: 0 },
        };
        L.defaultTopAxisOptions = {
          labels: { autoRotation: [-45], x: 0 },
          margin: 15,
          title: { rotation: 0 },
        };
        L.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
        return L;
      })();
      D.Axis = e;
      return D.Axis;
    }
  );
  P(
    e,
    "Core/Axis/DateTimeAxis.js",
    [e["Core/Axis/Axis.js"], e["Core/Utilities.js"]],
    function (e, h) {
      var D = h.addEvent,
        y = h.getMagnitude,
        F = h.normalizeTickInterval,
        E = h.timeUnits,
        C = (function () {
          function h(t) {
            this.axis = t;
          }
          h.prototype.normalizeTimeTickInterval = function (t, h) {
            var m = h || [
              ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
              ["second", [1, 2, 5, 10, 15, 30]],
              ["minute", [1, 2, 5, 10, 15, 30]],
              ["hour", [1, 2, 3, 4, 6, 8, 12]],
              ["day", [1, 2]],
              ["week", [1, 2]],
              ["month", [1, 2, 3, 4, 6]],
              ["year", null],
            ];
            h = m[m.length - 1];
            var f = E[h[0]],
              b = h[1],
              A;
            for (
              A = 0;
              A < m.length &&
              !((h = m[A]),
              (f = E[h[0]]),
              (b = h[1]),
              m[A + 1] && t <= (f * b[b.length - 1] + E[m[A + 1][0]]) / 2);
              A++
            );
            f === E.year && t < 5 * f && (b = [1, 2, 5]);
            t = F(t / f, b, "year" === h[0] ? Math.max(y(t / f), 1) : 1);
            return { unitRange: f, count: t, unitName: h[0] };
          };
          return h;
        })();
      h = (function () {
        function h() {}
        h.compose = function (h) {
          h.keepProps.push("dateTime");
          h.prototype.getTimeTicks = function () {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
          };
          D(h, "init", function (h) {
            "datetime" !== h.userOptions.type
              ? (this.dateTime = void 0)
              : this.dateTime || (this.dateTime = new C(this));
          });
        };
        h.AdditionsClass = C;
        return h;
      })();
      h.compose(e);
      return h;
    }
  );
  P(
    e,
    "Core/Axis/LogarithmicAxis.js",
    [e["Core/Axis/Axis.js"], e["Core/Utilities.js"]],
    function (e, h) {
      var D = h.addEvent,
        y = h.getMagnitude,
        F = h.normalizeTickInterval,
        E = h.pick,
        C = (function () {
          function h(h) {
            this.axis = h;
          }
          h.prototype.getLogTickPositions = function (h, e, m, f) {
            var b = this.axis,
              A = b.len,
              u = b.options,
              l = [];
            f || (this.minorAutoInterval = void 0);
            if (0.5 <= h) (h = Math.round(h)), (l = b.getLinearTickPositions(h, e, m));
            else if (0.08 <= h) {
              var I = Math.floor(e),
                k,
                d = (u = void 0);
              for (
                A = 0.3 < h ? [1, 2, 4] : 0.15 < h ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
                I < m + 1 && !d;
                I++
              ) {
                var w = A.length;
                for (k = 0; k < w && !d; k++) {
                  var n = this.log2lin(this.lin2log(I) * A[k]);
                  n > e && (!f || u <= m) && "undefined" !== typeof u && l.push(u);
                  u > m && (d = !0);
                  u = n;
                }
              }
            } else
              (e = this.lin2log(e)),
                (m = this.lin2log(m)),
                (h = f ? b.getMinorTickInterval() : u.tickInterval),
                (h = E(
                  "auto" === h ? null : h,
                  this.minorAutoInterval,
                  ((u.tickPixelInterval / (f ? 5 : 1)) * (m - e)) /
                    ((f ? A / b.tickPositions.length : A) || 1)
                )),
                (h = F(h, void 0, y(h))),
                (l = b.getLinearTickPositions(h, e, m).map(this.log2lin)),
                f || (this.minorAutoInterval = h / 5);
            f || (b.tickInterval = h);
            return l;
          };
          h.prototype.lin2log = function (h) {
            return Math.pow(10, h);
          };
          h.prototype.log2lin = function (h) {
            return Math.log(h) / Math.LN10;
          };
          return h;
        })();
      h = (function () {
        function h() {}
        h.compose = function (h) {
          h.keepProps.push("logarithmic");
          D(h, "init", function (h) {
            var m = this.logarithmic;
            "logarithmic" !== h.userOptions.type
              ? (this.logarithmic = void 0)
              : m || (this.logarithmic = new C(this));
          });
          D(h, "afterInit", function () {
            var h = this.logarithmic;
            h &&
              ((this.lin2val = function (m) {
                return h.lin2log(m);
              }),
              (this.val2lin = function (m) {
                return h.log2lin(m);
              }));
          });
        };
        return h;
      })();
      h.compose(e);
      return h;
    }
  );
  P(
    e,
    "Core/Axis/PlotLineOrBand.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Globals.js"],
      e["Core/Color/Palette.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y) {
      var F = y.arrayMax,
        E = y.arrayMin,
        C = y.defined,
        G = y.destroyObjectProperties,
        t = y.erase,
        z = y.extend,
        m = y.fireEvent,
        f = y.isNumber,
        b = y.merge,
        A = y.objectEach,
        u = y.pick;
      y = (function () {
        function f(b, k) {
          this.axis = b;
          k && ((this.options = k), (this.id = k.id));
        }
        f.prototype.render = function () {
          m(this, "render");
          var f = this,
            k = f.axis,
            d = k.horiz,
            l = k.logarithmic,
            n = f.options,
            g = n.label,
            c = f.label,
            q = n.to,
            a = n.from,
            B = n.value,
            J = C(a) && C(q),
            O = C(B),
            p = f.svgElem,
            r = !p,
            M = [],
            v = n.color,
            N = u(n.zIndex, 0),
            K = n.events;
          M = { class: "highcharts-plot-" + (J ? "band " : "line ") + (n.className || "") };
          var L = {},
            h = k.chart.renderer,
            x = J ? "bands" : "lines";
          l && ((a = l.log2lin(a)), (q = l.log2lin(q)), (B = l.log2lin(B)));
          k.chart.styledMode ||
            (O
              ? ((M.stroke = v || D.neutralColor40),
                (M["stroke-width"] = u(n.width, 1)),
                n.dashStyle && (M.dashstyle = n.dashStyle))
              : J &&
                ((M.fill = v || D.highlightColor10),
                n.borderWidth &&
                  ((M.stroke = n.borderColor), (M["stroke-width"] = n.borderWidth))));
          L.zIndex = N;
          x += "-" + N;
          (l = k.plotLinesAndBandsGroups[x]) ||
            (k.plotLinesAndBandsGroups[x] = l = h
              .g("plot-" + x)
              .attr(L)
              .add());
          r && (f.svgElem = p = h.path().attr(M).add(l));
          if (O)
            M = k.getPlotLinePath({
              value: B,
              lineWidth: p.strokeWidth(),
              acrossPanes: n.acrossPanes,
            });
          else if (J) M = k.getPlotBandPath(a, q, n);
          else return;
          !f.eventsAdded &&
            K &&
            (A(K, function (a, c) {
              p.on(c, function (a) {
                K[c].apply(f, [a]);
              });
            }),
            (f.eventsAdded = !0));
          (r || !p.d) && M && M.length
            ? p.attr({ d: M })
            : p &&
              (M
                ? (p.show(!0), p.animate({ d: M }))
                : p.d && (p.hide(), c && (f.label = c = c.destroy())));
          g &&
          (C(g.text) || C(g.formatter)) &&
          M &&
          M.length &&
          0 < k.width &&
          0 < k.height &&
          !M.isFlat
            ? ((g = b(
                {
                  align: d && J && "center",
                  x: d ? !J && 4 : 10,
                  verticalAlign: !d && J && "middle",
                  y: d ? (J ? 16 : 10) : J ? 6 : -4,
                  rotation: d && !J && 90,
                },
                g
              )),
              this.renderLabel(g, M, J, N))
            : c && c.hide();
          return f;
        };
        f.prototype.renderLabel = function (b, f, d, l) {
          var k = this.label,
            g = this.axis.chart.renderer;
          k ||
            ((k = {
              align: b.textAlign || b.align,
              rotation: b.rotation,
              class: "highcharts-plot-" + (d ? "band" : "line") + "-label " + (b.className || ""),
            }),
            (k.zIndex = l),
            (l = this.getLabelText(b)),
            (this.label = k = g.text(l, 0, 0, b.useHTML).attr(k).add()),
            this.axis.chart.styledMode || k.css(b.style));
          g = f.xBounds || [f[0][1], f[1][1], d ? f[2][1] : f[0][1]];
          f = f.yBounds || [f[0][2], f[1][2], d ? f[2][2] : f[0][2]];
          d = E(g);
          l = E(f);
          k.align(b, !1, { x: d, y: l, width: F(g) - d, height: F(f) - l });
          k.show(!0);
        };
        f.prototype.getLabelText = function (b) {
          return C(b.formatter) ? b.formatter.call(this) : b.text;
        };
        f.prototype.destroy = function () {
          t(this.axis.plotLinesAndBands, this);
          delete this.axis;
          G(this);
        };
        return f;
      })();
      z(e.prototype, {
        getPlotBandPath: function (b, m, k) {
          void 0 === k && (k = this.options);
          var d = this.getPlotLinePath({ value: m, force: !0, acrossPanes: k.acrossPanes });
          k = this.getPlotLinePath({ value: b, force: !0, acrossPanes: k.acrossPanes });
          var l = [],
            n = this.horiz,
            g = 1;
          b =
            !f(this.min) ||
            !f(this.max) ||
            (b < this.min && m < this.min) ||
            (b > this.max && m > this.max);
          if (k && d) {
            if (b) {
              var c = k.toString() === d.toString();
              g = 0;
            }
            for (b = 0; b < k.length; b += 2) {
              m = k[b];
              var q = k[b + 1],
                a = d[b],
                B = d[b + 1];
              ("M" !== m[0] && "L" !== m[0]) ||
                ("M" !== q[0] && "L" !== q[0]) ||
                ("M" !== a[0] && "L" !== a[0]) ||
                ("M" !== B[0] && "L" !== B[0]) ||
                (n && a[1] === m[1]
                  ? ((a[1] += g), (B[1] += g))
                  : n || a[2] !== m[2] || ((a[2] += g), (B[2] += g)),
                l.push(
                  ["M", m[1], m[2]],
                  ["L", q[1], q[2]],
                  ["L", B[1], B[2]],
                  ["L", a[1], a[2]],
                  ["Z"]
                ));
              l.isFlat = c;
            }
          }
          return l;
        },
        addPlotBand: function (b) {
          return this.addPlotBandOrLine(b, "plotBands");
        },
        addPlotLine: function (b) {
          return this.addPlotBandOrLine(b, "plotLines");
        },
        addPlotBandOrLine: function (b, f) {
          var k = this,
            d = new h.PlotLineOrBand(this, b),
            l = this.userOptions;
          this.visible && (d = d.render());
          if (d) {
            this._addedPlotLB ||
              ((this._addedPlotLB = !0),
              (l.plotLines || []).concat(l.plotBands || []).forEach(function (b) {
                k.addPlotBandOrLine(b);
              }));
            if (f) {
              var n = l[f] || [];
              n.push(b);
              l[f] = n;
            }
            this.plotLinesAndBands.push(d);
          }
          return d;
        },
        removePlotBandOrLine: function (b) {
          for (
            var f = this.plotLinesAndBands, k = this.options, d = this.userOptions, l = f.length;
            l--;

          )
            f[l].id === b && f[l].destroy();
          [k.plotLines || [], d.plotLines || [], k.plotBands || [], d.plotBands || []].forEach(
            function (d) {
              for (l = d.length; l--; ) (d[l] || {}).id === b && t(d, d[l]);
            }
          );
        },
        removePlotBand: function (b) {
          this.removePlotBandOrLine(b);
        },
        removePlotLine: function (b) {
          this.removePlotBandOrLine(b);
        },
      });
      h.PlotLineOrBand = y;
      return h.PlotLineOrBand;
    }
  );
  P(
    e,
    "Core/Tooltip.js",
    [
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Color/Palette.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y) {
      var F = e.format,
        E = h.doc,
        C = y.clamp,
        G = y.css,
        t = y.defined,
        z = y.discardElement,
        m = y.extend,
        f = y.fireEvent,
        b = y.isArray,
        A = y.isNumber,
        u = y.isString,
        l = y.merge,
        I = y.pick,
        k = y.splat,
        d = y.syncTimeout,
        w = y.timeUnits;
      ("");
      e = (function () {
        function n(b, c) {
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = !0;
          this.isSticky = !1;
          this.now = {};
          this.options = {};
          this.outside = !1;
          this.chart = b;
          this.init(b, c);
        }
        n.prototype.applyFilter = function () {
          var b = this.chart;
          b.renderer.definition({
            tagName: "filter",
            attributes: { id: "drop-shadow-" + b.index, opacity: 0.5 },
            children: [
              { tagName: "feGaussianBlur", attributes: { in: "SourceAlpha", stdDeviation: 1 } },
              { tagName: "feOffset", attributes: { dx: 1, dy: 1 } },
              {
                tagName: "feComponentTransfer",
                children: [{ tagName: "feFuncA", attributes: { type: "linear", slope: 0.3 } }],
              },
              {
                tagName: "feMerge",
                children: [
                  { tagName: "feMergeNode" },
                  { tagName: "feMergeNode", attributes: { in: "SourceGraphic" } },
                ],
              },
            ],
          });
          b.renderer.definition({
            tagName: "style",
            textContent:
              ".highcharts-tooltip-" + b.index + "{filter:url(#drop-shadow-" + b.index + ")}",
          });
        };
        n.prototype.bodyFormatter = function (b) {
          return b.map(function (c) {
            var b = c.series.tooltipOptions;
            return (
              b[(c.point.formatPrefix || "point") + "Formatter"] || c.point.tooltipFormatter
            ).call(c.point, b[(c.point.formatPrefix || "point") + "Format"] || "");
          });
        };
        n.prototype.cleanSplit = function (b) {
          this.chart.series.forEach(function (c) {
            var g = c && c.tt;
            g && (!g.isActive || b ? (c.tt = g.destroy()) : (g.isActive = !1));
          });
        };
        n.prototype.defaultFormatter = function (b) {
          var c = this.points || k(this);
          var g = [b.tooltipFooterHeaderFormatter(c[0])];
          g = g.concat(b.bodyFormatter(c));
          g.push(b.tooltipFooterHeaderFormatter(c[0], !0));
          return g;
        };
        n.prototype.destroy = function () {
          this.label && (this.label = this.label.destroy());
          this.split && this.tt && (this.cleanSplit(this.chart, !0), (this.tt = this.tt.destroy()));
          this.renderer && ((this.renderer = this.renderer.destroy()), z(this.container));
          y.clearTimeout(this.hideTimer);
          y.clearTimeout(this.tooltipTimeout);
        };
        n.prototype.getAnchor = function (b, c) {
          var g = this.chart;
          var a = g.pointer;
          var d = g.inverted,
            f = g.plotTop,
            n = g.plotLeft,
            p = 0,
            r = 0,
            l,
            v;
          b = k(b);
          this.followPointer && c
            ? ("undefined" === typeof c.chartX && (c = a.normalize(c)),
              (a = [c.chartX - n, c.chartY - f]))
            : b[0].tooltipPos
            ? (a = b[0].tooltipPos)
            : (b.forEach(function (a) {
                l = a.series.yAxis;
                v = a.series.xAxis;
                p += a.plotX || 0;
                r += a.plotLow ? (a.plotLow + (a.plotHigh || 0)) / 2 : a.plotY || 0;
                v &&
                  l &&
                  (d
                    ? ((p += f + g.plotHeight - v.len - v.pos),
                      (r += n + g.plotWidth - l.len - l.pos))
                    : ((p += v.pos - n), (r += l.pos - f)));
              }),
              (p /= b.length),
              (r /= b.length),
              (a = [d ? g.plotWidth - r : p, d ? g.plotHeight - p : r]),
              this.shared &&
                1 < b.length &&
                c &&
                (d ? (a[0] = c.chartX - n) : (a[1] = c.chartY - f)));
          return a.map(Math.round);
        };
        n.prototype.getDateFormat = function (b, c, d, a) {
          var g = this.chart.time,
            q = g.dateFormat("%m-%d %H:%M:%S.%L", c),
            f = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
            p = "millisecond";
          for (r in w) {
            if (b === w.week && +g.dateFormat("%w", c) === d && "00:00:00.000" === q.substr(6)) {
              var r = "week";
              break;
            }
            if (w[r] > b) {
              r = p;
              break;
            }
            if (f[r] && q.substr(f[r]) !== "01-01 00:00:00.000".substr(f[r])) break;
            "week" !== r && (p = r);
          }
          if (r) var k = g.resolveDTLFormat(a[r]).main;
          return k;
        };
        n.prototype.getLabel = function () {
          var b = this,
            c = this.chart.renderer,
            d = this.chart.styledMode,
            a = this.options,
            f = "tooltip" + (t(a.className) ? " " + a.className : ""),
            k =
              (a.style && a.style.pointerEvents) ||
              (!this.followPointer && a.stickOnContact ? "auto" : "none"),
            n,
            p = function () {
              b.inContact = !0;
            },
            r = function () {
              var a = b.chart.hoverSeries;
              b.inContact = !1;
              if (a && a.onMouseOut) a.onMouseOut();
            };
          if (!this.label) {
            if (this.outside) {
              var l = this.chart.options.chart.style;
              this.container = n = h.doc.createElement("div");
              n.className = "highcharts-tooltip-container";
              G(n, {
                position: "absolute",
                top: "1px",
                pointerEvents: k,
                zIndex: Math.max(
                  (this.options.style && this.options.style.zIndex) || 0,
                  ((l && l.zIndex) || 0) + 3
                ),
              });
              h.doc.body.appendChild(n);
              this.renderer = c = new h.Renderer(n, 0, 0, l, void 0, void 0, c.styledMode);
            }
            this.split
              ? (this.label = c.g(f))
              : ((this.label = c
                  .label("", 0, 0, a.shape || "callout", null, null, a.useHTML, null, f)
                  .attr({ padding: a.padding, r: a.borderRadius })),
                d ||
                  this.label
                    .attr({ fill: a.backgroundColor, "stroke-width": a.borderWidth })
                    .css(a.style)
                    .css({ pointerEvents: k })
                    .shadow(a.shadow));
            d &&
              (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
            if (b.outside && !b.split) {
              var v = this.label,
                N = v.xSetter,
                m = v.ySetter;
              v.xSetter = function (a) {
                N.call(v, b.distance);
                n.style.left = a + "px";
              };
              v.ySetter = function (a) {
                m.call(v, b.distance);
                n.style.top = a + "px";
              };
            }
            this.label.on("mouseenter", p).on("mouseleave", r).attr({ zIndex: 8 }).add();
          }
          return this.label;
        };
        n.prototype.getPosition = function (b, c, d) {
          var a = this.chart,
            g = this.distance,
            q = {},
            f = (a.inverted && d.h) || 0,
            p,
            r = this.outside,
            k = r ? E.documentElement.clientWidth - 2 * g : a.chartWidth,
            v = r
              ? Math.max(
                  E.body.scrollHeight,
                  E.documentElement.scrollHeight,
                  E.body.offsetHeight,
                  E.documentElement.offsetHeight,
                  E.documentElement.clientHeight
                )
              : a.chartHeight,
            n = a.pointer.getChartPosition(),
            l = function (p) {
              var q = "x" === p;
              return [p, q ? k : v, q ? b : c].concat(
                r
                  ? [
                      q ? b * n.scaleX : c * n.scaleY,
                      q
                        ? n.left - g + (d.plotX + a.plotLeft) * n.scaleX
                        : n.top - g + (d.plotY + a.plotTop) * n.scaleY,
                      0,
                      q ? k : v,
                    ]
                  : [
                      q ? b : c,
                      q ? d.plotX + a.plotLeft : d.plotY + a.plotTop,
                      q ? a.plotLeft : a.plotTop,
                      q ? a.plotLeft + a.plotWidth : a.plotTop + a.plotHeight,
                    ]
              );
            },
            m = l("y"),
            w = l("x"),
            u = !this.followPointer && I(d.ttBelow, !a.inverted === !!d.negative),
            h = function (a, c, b, d, p, v, k) {
              var l = r ? ("y" === a ? g * n.scaleY : g * n.scaleX) : g,
                B = (b - d) / 2,
                J = d < p - g,
                M = p + g + d < c,
                N = p - l - b + B;
              p = p + l - B;
              if (u && M) q[a] = p;
              else if (!u && J) q[a] = N;
              else if (J) q[a] = Math.min(k - d, 0 > N - f ? N : N - f);
              else if (M) q[a] = Math.max(v, p + f + b > c ? p : p + f);
              else return !1;
            },
            A = function (a, c, b, d, p) {
              var r;
              p < g || p > c - g
                ? (r = !1)
                : (q[a] = p < b / 2 ? 1 : p > c - d / 2 ? c - d - 2 : p - b / 2);
              return r;
            },
            e = function (a) {
              var c = m;
              m = w;
              w = c;
              p = a;
            },
            R = function () {
              !1 !== h.apply(0, m)
                ? !1 !== A.apply(0, w) || p || (e(!0), R())
                : p
                ? (q.x = q.y = 0)
                : (e(!0), R());
            };
          (a.inverted || 1 < this.len) && e();
          R();
          return q;
        };
        n.prototype.getXDateFormat = function (b, c, d) {
          c = c.dateTimeLabelFormats;
          var a = d && d.closestPointRange;
          return (a ? this.getDateFormat(a, b.x, d.options.startOfWeek, c) : c.day) || c.year;
        };
        n.prototype.hide = function (b) {
          var c = this;
          y.clearTimeout(this.hideTimer);
          b = I(b, this.options.hideDelay, 500);
          this.isHidden ||
            (this.hideTimer = d(function () {
              c.getLabel().fadeOut(b ? void 0 : b);
              c.isHidden = !0;
            }, b));
        };
        n.prototype.init = function (b, c) {
          this.chart = b;
          this.options = c;
          this.crosshairs = [];
          this.now = { x: 0, y: 0 };
          this.isHidden = !0;
          this.split = c.split && !b.inverted && !b.polar;
          this.shared = c.shared || this.split;
          this.outside = I(c.outside, !(!b.scrollablePixelsX && !b.scrollablePixelsY));
        };
        n.prototype.isStickyOnContact = function () {
          return !(this.followPointer || !this.options.stickOnContact || !this.inContact);
        };
        n.prototype.move = function (b, c, d, a) {
          var g = this,
            q = g.now,
            f =
              !1 !== g.options.animation &&
              !g.isHidden &&
              (1 < Math.abs(b - q.x) || 1 < Math.abs(c - q.y)),
            p = g.followPointer || 1 < g.len;
          m(q, {
            x: f ? (2 * q.x + b) / 3 : b,
            y: f ? (q.y + c) / 2 : c,
            anchorX: p ? void 0 : f ? (2 * q.anchorX + d) / 3 : d,
            anchorY: p ? void 0 : f ? (q.anchorY + a) / 2 : a,
          });
          g.getLabel().attr(q);
          g.drawTracker();
          f &&
            (y.clearTimeout(this.tooltipTimeout),
            (this.tooltipTimeout = setTimeout(function () {
              g && g.move(b, c, d, a);
            }, 32)));
        };
        n.prototype.refresh = function (g, c) {
          var d = this.chart,
            a = this.options,
            n = k(g),
            l = n[0],
            m = {},
            p = [],
            r = a.formatter || this.defaultFormatter;
          m = this.shared;
          var M = d.styledMode;
          if (a.enabled) {
            y.clearTimeout(this.hideTimer);
            this.followPointer = !this.split && l.series.tooltipOptions.followPointer;
            var v = this.getAnchor(g, c);
            var N = v[0];
            var K = v[1];
            !m || (!b(g) && g.series && g.series.noSharedTooltip)
              ? (m = l.getLabelConfig())
              : (d.pointer.applyInactiveState(n),
                n.forEach(function (a) {
                  a.setState("hover");
                  p.push(a.getLabelConfig());
                }),
                (m = { x: l.category, y: l.y }),
                (m.points = p));
            this.len = p.length;
            g = r.call(m, this);
            r = l.series;
            this.distance = I(r.tooltipOptions.distance, 16);
            if (!1 === g) this.hide();
            else {
              if (this.split) this.renderSplit(g, n);
              else if (
                ((n = N),
                (m = K),
                c &&
                  d.pointer.isDirectTouch &&
                  ((n = c.chartX - d.plotLeft), (m = c.chartY - d.plotTop)),
                d.polar || !1 === r.options.clip || r.shouldShowTooltip(n, m))
              )
                (c = this.getLabel()),
                  (a.style.width && !M) || c.css({ width: this.chart.spacingBox.width + "px" }),
                  c.attr({ text: g && g.join ? g.join("") : g }),
                  c
                    .removeClass(/highcharts-color-[\d]+/g)
                    .addClass("highcharts-color-" + I(l.colorIndex, r.colorIndex)),
                  M || c.attr({ stroke: a.borderColor || l.color || r.color || D.neutralColor60 }),
                  this.updatePosition({
                    plotX: N,
                    plotY: K,
                    negative: l.negative,
                    ttBelow: l.ttBelow,
                    h: v[2] || 0,
                  });
              else {
                this.hide();
                return;
              }
              this.isHidden && this.label && this.label.attr({ opacity: 1 }).show();
              this.isHidden = !1;
            }
            f(this, "refresh");
          }
        };
        n.prototype.renderSplit = function (b, c) {
          function g(c, b, g, d, p) {
            void 0 === p && (p = !0);
            g
              ? ((b = W ? 0 : da), (c = C(c - d / 2, S.left, S.right - d - (a.outside ? y : 0))))
              : ((b -= F), (c = p ? c - d - t : c + t), (c = C(c, p ? c : S.left, S.right)));
            return { x: c, y: b };
          }
          var a = this,
            d = a.chart,
            f = a.chart,
            k = f.chartWidth,
            p = f.chartHeight,
            r = f.plotHeight,
            n = f.plotLeft,
            v = f.plotTop,
            l = f.pointer,
            K = f.scrollablePixelsY;
          K = void 0 === K ? 0 : K;
          var w = f.scrollablePixelsX,
            A = f.scrollingContainer;
          A = void 0 === A ? { scrollLeft: 0, scrollTop: 0 } : A;
          var x = A.scrollLeft;
          A = A.scrollTop;
          var e = f.styledMode,
            t = a.distance,
            z = a.options,
            R = a.options.positioner,
            S =
              a.outside && "number" !== typeof w
                ? E.documentElement.getBoundingClientRect()
                : { left: x, right: x + k, top: A, bottom: A + p },
            T = a.getLabel(),
            G = this.renderer || d.renderer,
            W = !(!d.xAxis[0] || !d.xAxis[0].opposite);
          d = l.getChartPosition();
          var y = d.left;
          d = d.top;
          var F = v + A,
            Q = 0,
            da = r - K;
          u(b) && (b = [!1, b]);
          b = b.slice(0, c.length + 1).reduce(function (b, d, p) {
            if (!1 !== d && "" !== d) {
              p = c[p - 1] || { isHeader: !0, plotX: c[0].plotX, plotY: r, series: {} };
              var f = p.isHeader,
                q = f ? a : p.series;
              d = d.toString();
              var k = q.tt,
                l = p.isHeader;
              var B = p.series;
              var M = "highcharts-color-" + I(p.colorIndex, B.colorIndex, "none");
              k ||
                ((k = { padding: z.padding, r: z.borderRadius }),
                e || ((k.fill = z.backgroundColor), (k["stroke-width"] = z.borderWidth)),
                (k = G.label(
                  "",
                  0,
                  0,
                  z[l ? "headerShape" : "shape"] || "callout",
                  void 0,
                  void 0,
                  z.useHTML
                )
                  .addClass((l ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + M)
                  .attr(k)
                  .add(T)));
              k.isActive = !0;
              k.attr({ text: d });
              e ||
                k
                  .css(z.style)
                  .shadow(z.shadow)
                  .attr({ stroke: z.borderColor || p.color || B.color || D.neutralColor80 });
              q = q.tt = k;
              l = q.getBBox();
              d = l.width + q.strokeWidth();
              f && ((Q = l.height), (da += Q), W && (F -= Q));
              B = p.plotX;
              B = void 0 === B ? 0 : B;
              M = p.plotY;
              M = void 0 === M ? 0 : M;
              k = p.series;
              if (p.isHeader) {
                B = n + B;
                var J = v + r / 2;
              } else {
                var N = k.xAxis,
                  m = k.yAxis;
                B = N.pos + C(B, -t, N.len + t);
                k.shouldShowTooltip(0, m.pos - v + M, { ignoreX: !0 }) && (J = m.pos + M);
              }
              B = C(B, S.left - t, S.right + t);
              "number" === typeof J
                ? ((l = l.height + 1),
                  (M = R ? R.call(a, d, l, p) : g(B, J, f, d)),
                  b.push({
                    align: R ? 0 : void 0,
                    anchorX: B,
                    anchorY: J,
                    boxWidth: d,
                    point: p,
                    rank: I(M.rank, f ? 1 : 0),
                    size: l,
                    target: M.y,
                    tt: q,
                    x: M.x,
                  }))
                : (q.isActive = !1);
            }
            return b;
          }, []);
          !R &&
            b.some(function (c) {
              var b = (a.outside ? y : 0) + c.anchorX;
              return b < S.left && b + c.boxWidth < S.right
                ? !0
                : b < y - S.left + c.boxWidth && S.right - b > b;
            }) &&
            (b = b.map(function (a) {
              var c = g(a.anchorX, a.anchorY, a.point.isHeader, a.boxWidth, !1);
              return m(a, { target: c.y, x: c.x });
            }));
          a.cleanSplit();
          h.distribute(b, da);
          var ba = y,
            P = y;
          b.forEach(function (c) {
            var b = c.x,
              g = c.boxWidth;
            c = c.isHeader;
            c ||
              (a.outside && y + b < ba && (ba = y + b),
              !c && a.outside && ba + g > P && (P = y + b));
          });
          b.forEach(function (c) {
            var b = c.x,
              g = c.anchorX,
              d = c.pos,
              p = c.point.isHeader;
            d = {
              visibility: "undefined" === typeof d ? "hidden" : "inherit",
              x: b,
              y: d + F,
              anchorX: g,
              anchorY: c.anchorY,
            };
            if (a.outside && b < g) {
              var r = y - ba;
              0 < r &&
                (p || ((d.x = b + r), (d.anchorX = g + r)),
                p && ((d.x = (P - ba) / 2), (d.anchorX = g + r)));
            }
            c.tt.attr(d);
          });
          b = a.container;
          K = a.renderer;
          a.outside &&
            b &&
            K &&
            ((f = T.getBBox()),
            K.setSize(f.width + f.x, f.height + f.y, !1),
            (b.style.left = ba + "px"),
            (b.style.top = d + "px"));
        };
        n.prototype.drawTracker = function () {
          if (this.followPointer || !this.options.stickOnContact)
            this.tracker && this.tracker.destroy();
          else {
            var b = this.chart,
              c = this.label,
              d = b.hoverPoint;
            if (c && d) {
              var a = { x: 0, y: 0, width: 0, height: 0 };
              d = this.getAnchor(d);
              var f = c.getBBox();
              d[0] += b.plotLeft - c.translateX;
              d[1] += b.plotTop - c.translateY;
              a.x = Math.min(0, d[0]);
              a.y = Math.min(0, d[1]);
              a.width =
                0 > d[0]
                  ? Math.max(Math.abs(d[0]), f.width - d[0])
                  : Math.max(Math.abs(d[0]), f.width);
              a.height =
                0 > d[1]
                  ? Math.max(Math.abs(d[1]), f.height - Math.abs(d[1]))
                  : Math.max(Math.abs(d[1]), f.height);
              this.tracker
                ? this.tracker.attr(a)
                : ((this.tracker = c.renderer.rect(a).addClass("highcharts-tracker").add(c)),
                  b.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
            }
          }
        };
        n.prototype.styledModeFormat = function (b) {
          return b
            .replace('style="font-size: 10px"', 'class="highcharts-header"')
            .replace(
              /style="color:{(point|series)\.color}"/g,
              'class="highcharts-color-{$1.colorIndex}"'
            );
        };
        n.prototype.tooltipFooterHeaderFormatter = function (b, c) {
          var d = c ? "footer" : "header",
            a = b.series,
            g = a.tooltipOptions,
            k = g.xDateFormat,
            l = a.xAxis,
            p = l && "datetime" === l.options.type && A(b.key),
            r = g[d + "Format"];
          c = { isFooter: c, labelConfig: b };
          f(this, "headerFormatter", c, function (c) {
            p && !k && (k = this.getXDateFormat(b, g, l));
            p &&
              k &&
              ((b.point && b.point.tooltipDateKeys) || ["key"]).forEach(function (a) {
                r = r.replace("{point." + a + "}", "{point." + a + ":" + k + "}");
              });
            a.chart.styledMode && (r = this.styledModeFormat(r));
            c.text = F(r, { point: b, series: a }, this.chart);
          });
          return c.text;
        };
        n.prototype.update = function (b) {
          this.destroy();
          l(!0, this.chart.options.tooltip.userOptions, b);
          this.init(this.chart, l(!0, this.options, b));
        };
        n.prototype.updatePosition = function (b) {
          var c = this.chart,
            d = c.pointer,
            a = this.getLabel(),
            g = b.plotX + c.plotLeft;
          c = b.plotY + c.plotTop;
          d = d.getChartPosition();
          b = (this.options.positioner || this.getPosition).call(this, a.width, a.height, b);
          if (this.outside) {
            var f = (this.options.borderWidth || 0) + 2 * this.distance;
            this.renderer.setSize(a.width + f, a.height + f, !1);
            if (1 !== d.scaleX || 1 !== d.scaleY)
              G(this.container, { transform: "scale(" + d.scaleX + ", " + d.scaleY + ")" }),
                (g *= d.scaleX),
                (c *= d.scaleY);
            g += d.left - b.x;
            c += d.top - b.y;
          }
          this.move(Math.round(b.x), Math.round(b.y || 0), g, c);
        };
        return n;
      })();
      h.Tooltip = e;
      return h.Tooltip;
    }
  );
  P(
    e,
    "Core/Pointer.js",
    [
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Color/Palette.js"],
      e["Core/Tooltip.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F) {
      var E = e.parse,
        C = h.charts,
        G = h.noop,
        t = F.addEvent,
        z = F.attr,
        m = F.css,
        f = F.defined,
        b = F.extend,
        A = F.find,
        u = F.fireEvent,
        l = F.isNumber,
        I = F.isObject,
        k = F.objectEach,
        d = F.offset,
        w = F.pick,
        n = F.splat;
      ("");
      e = (function () {
        function g(c, b) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = c;
          this.hasDragged = !1;
          this.options = b;
          this.init(c, b);
        }
        g.prototype.applyInactiveState = function (c) {
          var b = [],
            a;
          (c || []).forEach(function (c) {
            a = c.series;
            b.push(a);
            a.linkedParent && b.push(a.linkedParent);
            a.linkedSeries && (b = b.concat(a.linkedSeries));
            a.navigatorSeries && b.push(a.navigatorSeries);
          });
          this.chart.series.forEach(function (a) {
            -1 === b.indexOf(a)
              ? a.setState("inactive", !0)
              : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive");
          });
        };
        g.prototype.destroy = function () {
          var c = this;
          this.eventsToUnbind.forEach(function (c) {
            return c();
          });
          this.eventsToUnbind = [];
          h.chartCount ||
            (h.unbindDocumentMouseUp && (h.unbindDocumentMouseUp = h.unbindDocumentMouseUp()),
            h.unbindDocumentTouchEnd && (h.unbindDocumentTouchEnd = h.unbindDocumentTouchEnd()));
          clearInterval(c.tooltipTimeout);
          k(c, function (b, a) {
            c[a] = void 0;
          });
        };
        g.prototype.drag = function (c) {
          var b = this.chart,
            a = b.options.chart,
            d = c.chartX,
            g = c.chartY,
            f = this.zoomHor,
            p = this.zoomVert,
            r = b.plotLeft,
            k = b.plotTop,
            v = b.plotWidth,
            l = b.plotHeight,
            n = this.selectionMarker,
            m = this.mouseDownX || 0,
            w = this.mouseDownY || 0,
            u = I(a.panning) ? a.panning && a.panning.enabled : a.panning,
            h = a.panKey && c[a.panKey + "Key"];
          if (!n || !n.touch)
            if (
              (d < r ? (d = r) : d > r + v && (d = r + v),
              g < k ? (g = k) : g > k + l && (g = k + l),
              (this.hasDragged = Math.sqrt(Math.pow(m - d, 2) + Math.pow(w - g, 2))),
              10 < this.hasDragged)
            ) {
              var A = b.isInsidePlot(m - r, w - k, { visiblePlotOnly: !0 });
              b.hasCartesianSeries &&
                (this.zoomX || this.zoomY) &&
                A &&
                !h &&
                !n &&
                ((this.selectionMarker = n = b.renderer
                  .rect(r, k, f ? 1 : v, p ? 1 : l, 0)
                  .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                  .add()),
                b.styledMode ||
                  n.attr({
                    fill: a.selectionMarkerFill || E(D.highlightColor80).setOpacity(0.25).get(),
                  }));
              n && f && ((d -= m), n.attr({ width: Math.abs(d), x: (0 < d ? 0 : d) + m }));
              n && p && ((d = g - w), n.attr({ height: Math.abs(d), y: (0 < d ? 0 : d) + w }));
              A && !n && u && b.pan(c, a.panning);
            }
        };
        g.prototype.dragStart = function (c) {
          var b = this.chart;
          b.mouseIsDown = c.type;
          b.cancelClick = !1;
          b.mouseDownX = this.mouseDownX = c.chartX;
          b.mouseDownY = this.mouseDownY = c.chartY;
        };
        g.prototype.drop = function (c) {
          var d = this,
            a = this.chart,
            g = this.hasPinched;
          if (this.selectionMarker) {
            var k = { originalEvent: c, xAxis: [], yAxis: [] },
              n = this.selectionMarker,
              p = n.attr ? n.attr("x") : n.x,
              r = n.attr ? n.attr("y") : n.y,
              M = n.attr ? n.attr("width") : n.width,
              v = n.attr ? n.attr("height") : n.height,
              N;
            if (this.hasDragged || g)
              a.axes.forEach(function (a) {
                if (
                  a.zoomEnabled &&
                  f(a.min) &&
                  (g || d[{ xAxis: "zoomX", yAxis: "zoomY" }[a.coll]]) &&
                  l(p) &&
                  l(r)
                ) {
                  var b = a.horiz,
                    q = "touchend" === c.type ? a.minPixelPadding : 0,
                    n = a.toValue((b ? p : r) + q);
                  b = a.toValue((b ? p + M : r + v) - q);
                  k[a.coll].push({ axis: a, min: Math.min(n, b), max: Math.max(n, b) });
                  N = !0;
                }
              }),
                N &&
                  u(a, "selection", k, function (c) {
                    a.zoom(b(c, g ? { animation: !1 } : null));
                  });
            l(a.index) && (this.selectionMarker = this.selectionMarker.destroy());
            g && this.scaleGroups();
          }
          a &&
            l(a.index) &&
            (m(a.container, { cursor: a._cursor }),
            (a.cancelClick = 10 < this.hasDragged),
            (a.mouseIsDown = this.hasDragged = this.hasPinched = !1),
            (this.pinchDown = []));
        };
        g.prototype.findNearestKDPoint = function (c, b, a) {
          var d = this.chart,
            g = d.hoverPoint;
          d = d.tooltip;
          if (g && d && d.isStickyOnContact()) return g;
          var f;
          c.forEach(function (c) {
            var d = !(c.noSharedTooltip && b) && 0 > c.options.findNearestPointBy.indexOf("y");
            c = c.searchPoint(a, d);
            if ((d = I(c, !0) && c.series) && !(d = !I(f, !0))) {
              d = f.distX - c.distX;
              var g = f.dist - c.dist,
                p =
                  (c.series.group && c.series.group.zIndex) -
                  (f.series.group && f.series.group.zIndex);
              d =
                0 <
                (0 !== d && b
                  ? d
                  : 0 !== g
                  ? g
                  : 0 !== p
                  ? p
                  : f.series.index > c.series.index
                  ? -1
                  : 1);
            }
            d && (f = c);
          });
          return f;
        };
        g.prototype.getChartCoordinatesFromPoint = function (c, b) {
          var a = c.series,
            d = a.xAxis;
          a = a.yAxis;
          var g = c.shapeArgs;
          if (d && a) {
            var f = w(c.clientX, c.plotX),
              p = c.plotY || 0;
            c.isNode && g && l(g.x) && l(g.y) && ((f = g.x), (p = g.y));
            return b
              ? { chartX: a.len + a.pos - p, chartY: d.len + d.pos - f }
              : { chartX: f + d.pos, chartY: p + a.pos };
          }
          if (g && g.x && g.y) return { chartX: g.x, chartY: g.y };
        };
        g.prototype.getChartPosition = function () {
          if (this.chartPosition) return this.chartPosition;
          var c = this.chart.container,
            b = d(c);
          this.chartPosition = { left: b.left, top: b.top, scaleX: 1, scaleY: 1 };
          var a = c.offsetWidth;
          c = c.offsetHeight;
          2 < a &&
            2 < c &&
            ((this.chartPosition.scaleX = b.width / a), (this.chartPosition.scaleY = b.height / c));
          return this.chartPosition;
        };
        g.prototype.getCoordinates = function (c) {
          var b = { xAxis: [], yAxis: [] };
          this.chart.axes.forEach(function (a) {
            b[a.isXAxis ? "xAxis" : "yAxis"].push({
              axis: a,
              value: a.toValue(c[a.horiz ? "chartX" : "chartY"]),
            });
          });
          return b;
        };
        g.prototype.getHoverData = function (c, b, a, d, g, f) {
          var p,
            r = [];
          d = !(!d || !c);
          var k = b && !b.stickyTracking,
            v = { chartX: f ? f.chartX : void 0, chartY: f ? f.chartY : void 0, shared: g };
          u(this, "beforeGetHoverData", v);
          k = k
            ? [b]
            : a.filter(function (a) {
                return v.filter
                  ? v.filter(a)
                  : a.visible &&
                      !(!g && a.directTouch) &&
                      w(a.options.enableMouseTracking, !0) &&
                      a.stickyTracking;
              });
          b = (p = d || !f ? c : this.findNearestKDPoint(k, g, f)) && p.series;
          p &&
            (g && !b.noSharedTooltip
              ? ((k = a.filter(function (a) {
                  return v.filter
                    ? v.filter(a)
                    : a.visible &&
                        !(!g && a.directTouch) &&
                        w(a.options.enableMouseTracking, !0) &&
                        !a.noSharedTooltip;
                })),
                k.forEach(function (a) {
                  var c = A(a.points, function (a) {
                    return a.x === p.x && !a.isNull;
                  });
                  I(c) && (a.chart.isBoosting && (c = a.getPoint(c)), r.push(c));
                }))
              : r.push(p));
          v = { hoverPoint: p };
          u(this, "afterGetHoverData", v);
          return { hoverPoint: v.hoverPoint, hoverSeries: b, hoverPoints: r };
        };
        g.prototype.getPointFromEvent = function (c) {
          c = c.target;
          for (var b; c && !b; ) (b = c.point), (c = c.parentNode);
          return b;
        };
        g.prototype.onTrackerMouseOut = function (c) {
          c = c.relatedTarget || c.toElement;
          var b = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (
            !(
              !b ||
              !c ||
              b.stickyTracking ||
              this.inClass(c, "highcharts-tooltip") ||
              (this.inClass(c, "highcharts-series-" + b.index) &&
                this.inClass(c, "highcharts-tracker"))
            )
          )
            b.onMouseOut();
        };
        g.prototype.inClass = function (c, b) {
          for (var a; c; ) {
            if ((a = z(c, "class"))) {
              if (-1 !== a.indexOf(b)) return !0;
              if (-1 !== a.indexOf("highcharts-container")) return !1;
            }
            c = c.parentNode;
          }
        };
        g.prototype.init = function (c, b) {
          this.options = b;
          this.chart = c;
          this.runChartClick = !(!b.chart.events || !b.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          y &&
            ((c.tooltip = new y(c, b.tooltip)),
            (this.followTouchMove = w(b.tooltip.followTouchMove, !0)));
          this.setDOMEvents();
        };
        g.prototype.normalize = function (c, d) {
          var a = c.touches,
            g = a ? (a.length ? a.item(0) : w(a.changedTouches, c.changedTouches)[0]) : c;
          d || (d = this.getChartPosition());
          a = g.pageX - d.left;
          g = g.pageY - d.top;
          a /= d.scaleX;
          g /= d.scaleY;
          return b(c, { chartX: Math.round(a), chartY: Math.round(g) });
        };
        g.prototype.onContainerClick = function (c) {
          var d = this.chart,
            a = d.hoverPoint;
          c = this.normalize(c);
          var g = d.plotLeft,
            f = d.plotTop;
          d.cancelClick ||
            (a && this.inClass(c.target, "highcharts-tracker")
              ? (u(a.series, "click", b(c, { point: a })),
                d.hoverPoint && a.firePointEvent("click", c))
              : (b(c, this.getCoordinates(c)),
                d.isInsidePlot(c.chartX - g, c.chartY - f, { visiblePlotOnly: !0 }) &&
                  u(d, "click", c)));
        };
        g.prototype.onContainerMouseDown = function (c) {
          var b = 1 === ((c.buttons || c.button) & 1);
          c = this.normalize(c);
          if (h.isFirefox && 0 !== c.button) this.onContainerMouseMove(c);
          if ("undefined" === typeof c.button || b)
            this.zoomOption(c), b && c.preventDefault && c.preventDefault(), this.dragStart(c);
        };
        g.prototype.onContainerMouseLeave = function (c) {
          var b = C[w(h.hoverChartIndex, -1)],
            a = this.chart.tooltip;
          c = this.normalize(c);
          b &&
            (c.relatedTarget || c.toElement) &&
            (b.pointer.reset(), (b.pointer.chartPosition = void 0));
          a && !a.isHidden && this.reset();
        };
        g.prototype.onContainerMouseEnter = function (c) {
          delete this.chartPosition;
        };
        g.prototype.onContainerMouseMove = function (c) {
          var b = this.chart;
          c = this.normalize(c);
          this.setHoverChartIndex();
          c.preventDefault || (c.returnValue = !1);
          ("mousedown" === b.mouseIsDown || this.touchSelect(c)) && this.drag(c);
          b.openMenu ||
            (!this.inClass(c.target, "highcharts-tracker") &&
              !b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop, {
                visiblePlotOnly: !0,
              })) ||
            this.runPointActions(c);
        };
        g.prototype.onDocumentTouchEnd = function (c) {
          C[h.hoverChartIndex] && C[h.hoverChartIndex].pointer.drop(c);
        };
        g.prototype.onContainerTouchMove = function (c) {
          if (this.touchSelect(c)) this.onContainerMouseMove(c);
          else this.touch(c);
        };
        g.prototype.onContainerTouchStart = function (c) {
          if (this.touchSelect(c)) this.onContainerMouseDown(c);
          else this.zoomOption(c), this.touch(c, !0);
        };
        g.prototype.onDocumentMouseMove = function (c) {
          var b = this.chart,
            a = this.chartPosition;
          c = this.normalize(c, a);
          var d = b.tooltip;
          !a ||
            (d && d.isStickyOnContact()) ||
            b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop, { visiblePlotOnly: !0 }) ||
            this.inClass(c.target, "highcharts-tracker") ||
            this.reset();
        };
        g.prototype.onDocumentMouseUp = function (c) {
          var b = C[w(h.hoverChartIndex, -1)];
          b && b.pointer.drop(c);
        };
        g.prototype.pinch = function (c) {
          var d = this,
            a = d.chart,
            g = d.pinchDown,
            f = c.touches || [],
            k = f.length,
            p = d.lastValidTouch,
            r = d.hasZoom,
            n = d.selectionMarker,
            v = {},
            l =
              1 === k &&
              ((d.inClass(c.target, "highcharts-tracker") && a.runTrackerClick) || d.runChartClick),
            m = {};
          1 < k && (d.initiated = !0);
          r && d.initiated && !l && !1 !== c.cancelable && c.preventDefault();
          [].map.call(f, function (a) {
            return d.normalize(a);
          });
          "touchstart" === c.type
            ? ([].forEach.call(f, function (a, c) {
                g[c] = { chartX: a.chartX, chartY: a.chartY };
              }),
              (p.x = [g[0].chartX, g[1] && g[1].chartX]),
              (p.y = [g[0].chartY, g[1] && g[1].chartY]),
              a.axes.forEach(function (c) {
                if (c.zoomEnabled) {
                  var b = a.bounds[c.horiz ? "h" : "v"],
                    d = c.minPixelPadding,
                    g = c.toPixels(Math.min(w(c.options.min, c.dataMin), c.dataMin)),
                    p = c.toPixels(Math.max(w(c.options.max, c.dataMax), c.dataMax)),
                    f = Math.max(g, p);
                  b.min = Math.min(c.pos, Math.min(g, p) - d);
                  b.max = Math.max(c.pos + c.len, f + d);
                }
              }),
              (d.res = !0))
            : d.followTouchMove && 1 === k
            ? this.runPointActions(d.normalize(c))
            : g.length &&
              (n || (d.selectionMarker = n = b({ destroy: G, touch: !0 }, a.plotBox)),
              d.pinchTranslate(g, f, v, n, m, p),
              (d.hasPinched = r),
              d.scaleGroups(v, m),
              d.res && ((d.res = !1), this.reset(!1, 0)));
        };
        g.prototype.pinchTranslate = function (c, b, a, d, g, f) {
          this.zoomHor && this.pinchTranslateDirection(!0, c, b, a, d, g, f);
          this.zoomVert && this.pinchTranslateDirection(!1, c, b, a, d, g, f);
        };
        g.prototype.pinchTranslateDirection = function (c, b, a, d, g, f, p, r) {
          var k = this.chart,
            v = c ? "x" : "y",
            n = c ? "X" : "Y",
            l = "chart" + n,
            q = c ? "width" : "height",
            m = k["plot" + (c ? "Left" : "Top")],
            B,
            J,
            w = r || 1,
            u = k.inverted,
            h = k.bounds[c ? "h" : "v"],
            A = 1 === b.length,
            e = b[0][l],
            O = a[0][l],
            I = !A && b[1][l],
            t = !A && a[1][l];
          a = function () {
            "number" === typeof t &&
              20 < Math.abs(e - I) &&
              (w = r || Math.abs(O - t) / Math.abs(e - I));
            J = (m - O) / w + e;
            B = k["plot" + (c ? "Width" : "Height")] / w;
          };
          a();
          b = J;
          if (b < h.min) {
            b = h.min;
            var z = !0;
          } else b + B > h.max && ((b = h.max - B), (z = !0));
          z
            ? ((O -= 0.8 * (O - p[v][0])), "number" === typeof t && (t -= 0.8 * (t - p[v][1])), a())
            : (p[v] = [O, t]);
          u || ((f[v] = J - m), (f[q] = B));
          f = u ? 1 / w : w;
          g[q] = B;
          g[v] = b;
          d[u ? (c ? "scaleY" : "scaleX") : "scale" + n] = w;
          d["translate" + n] = f * m + (O - f * e);
        };
        g.prototype.reset = function (c, b) {
          var a = this.chart,
            d = a.hoverSeries,
            g = a.hoverPoint,
            f = a.hoverPoints,
            p = a.tooltip,
            r = p && p.shared ? f : g;
          c &&
            r &&
            n(r).forEach(function (a) {
              a.series.isCartesian && "undefined" === typeof a.plotX && (c = !1);
            });
          if (c)
            p &&
              r &&
              n(r).length &&
              (p.refresh(r),
              p.shared && f
                ? f.forEach(function (a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian &&
                      (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a),
                      a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a));
                  })
                : g &&
                  (g.setState(g.state, !0),
                  a.axes.forEach(function (a) {
                    a.crosshair && g.series[a.coll] === a && a.drawCrosshair(null, g);
                  })));
          else {
            if (g) g.onMouseOut();
            f &&
              f.forEach(function (a) {
                a.setState();
              });
            if (d) d.onMouseOut();
            p && p.hide(b);
            this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
            a.axes.forEach(function (a) {
              a.hideCrosshair();
            });
            this.hoverX = a.hoverPoints = a.hoverPoint = null;
          }
        };
        g.prototype.runPointActions = function (c, b) {
          var a = this.chart,
            d = a.tooltip && a.tooltip.options.enabled ? a.tooltip : void 0,
            g = d ? d.shared : !1,
            f = b || a.hoverPoint,
            p = (f && f.series) || a.hoverSeries;
          p = this.getHoverData(
            f,
            p,
            a.series,
            (!c || "touchmove" !== c.type) && (!!b || (p && p.directTouch && this.isDirectTouch)),
            g,
            c
          );
          f = p.hoverPoint;
          var r = p.hoverPoints;
          b = (p = p.hoverSeries) && p.tooltipOptions.followPointer && !p.tooltipOptions.split;
          g = g && p && !p.noSharedTooltip;
          if (f && (f !== a.hoverPoint || (d && d.isHidden))) {
            (a.hoverPoints || []).forEach(function (a) {
              -1 === r.indexOf(a) && a.setState();
            });
            if (a.hoverSeries !== p) p.onMouseOver();
            this.applyInactiveState(r);
            (r || []).forEach(function (a) {
              a.setState("hover");
            });
            a.hoverPoint && a.hoverPoint.firePointEvent("mouseOut");
            if (!f.series) return;
            a.hoverPoints = r;
            a.hoverPoint = f;
            f.firePointEvent("mouseOver");
            d && d.refresh(g ? r : f, c);
          } else
            b &&
              d &&
              !d.isHidden &&
              ((f = d.getAnchor([{}], c)),
              a.isInsidePlot(f[0], f[1], { visiblePlotOnly: !0 }) &&
                d.updatePosition({ plotX: f[0], plotY: f[1] }));
          this.unDocMouseMove ||
            ((this.unDocMouseMove = t(a.container.ownerDocument, "mousemove", function (a) {
              var c = C[h.hoverChartIndex];
              if (c) c.pointer.onDocumentMouseMove(a);
            })),
            this.eventsToUnbind.push(this.unDocMouseMove));
          a.axes.forEach(function (b) {
            var d = w((b.crosshair || {}).snap, !0),
              g;
            d &&
              (((g = a.hoverPoint) && g.series[b.coll] === b) ||
                (g = A(r, function (a) {
                  return a.series[b.coll] === b;
                })));
            g || !d ? b.drawCrosshair(c, g) : b.hideCrosshair();
          });
        };
        g.prototype.scaleGroups = function (c, b) {
          var a = this.chart,
            d;
          a.series.forEach(function (g) {
            d = c || g.getPlotBox();
            g.xAxis &&
              g.xAxis.zoomEnabled &&
              g.group &&
              (g.group.attr(d),
              g.markerGroup && (g.markerGroup.attr(d), g.markerGroup.clip(b ? a.clipRect : null)),
              g.dataLabelsGroup && g.dataLabelsGroup.attr(d));
          });
          a.clipRect.attr(b || a.clipBox);
        };
        g.prototype.setDOMEvents = function () {
          var c = this,
            b = this.chart.container,
            a = b.ownerDocument;
          b.onmousedown = this.onContainerMouseDown.bind(this);
          b.onmousemove = this.onContainerMouseMove.bind(this);
          b.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(t(b, "mouseenter", this.onContainerMouseEnter.bind(this)));
          this.eventsToUnbind.push(t(b, "mouseleave", this.onContainerMouseLeave.bind(this)));
          h.unbindDocumentMouseUp ||
            (h.unbindDocumentMouseUp = t(a, "mouseup", this.onDocumentMouseUp.bind(this)));
          for (var d = this.chart.renderTo.parentElement; d && "BODY" !== d.tagName; )
            this.eventsToUnbind.push(
              t(d, "scroll", function () {
                delete c.chartPosition;
              })
            ),
              (d = d.parentElement);
          h.hasTouch &&
            (this.eventsToUnbind.push(
              t(b, "touchstart", this.onContainerTouchStart.bind(this), { passive: !1 })
            ),
            this.eventsToUnbind.push(
              t(b, "touchmove", this.onContainerTouchMove.bind(this), { passive: !1 })
            ),
            h.unbindDocumentTouchEnd ||
              (h.unbindDocumentTouchEnd = t(a, "touchend", this.onDocumentTouchEnd.bind(this), {
                passive: !1,
              })));
        };
        g.prototype.setHoverChartIndex = function () {
          var c = this.chart,
            b = h.charts[w(h.hoverChartIndex, -1)];
          if (b && b !== c) b.pointer.onContainerMouseLeave({ relatedTarget: !0 });
          (b && b.mouseIsDown) || (h.hoverChartIndex = c.index);
        };
        g.prototype.touch = function (c, b) {
          var a = this.chart,
            d;
          this.setHoverChartIndex();
          if (1 === c.touches.length)
            if (
              ((c = this.normalize(c)),
              (d = a.isInsidePlot(c.chartX - a.plotLeft, c.chartY - a.plotTop, {
                visiblePlotOnly: !0,
              })) && !a.openMenu)
            ) {
              b && this.runPointActions(c);
              if ("touchmove" === c.type) {
                b = this.pinchDown;
                var g = b[0]
                  ? 4 <=
                    Math.sqrt(
                      Math.pow(b[0].chartX - c.chartX, 2) + Math.pow(b[0].chartY - c.chartY, 2)
                    )
                  : !1;
              }
              w(g, !0) && this.pinch(c);
            } else b && this.reset();
          else 2 === c.touches.length && this.pinch(c);
        };
        g.prototype.touchSelect = function (c) {
          return !(
            !this.chart.options.chart.zoomBySingleTouch ||
            !c.touches ||
            1 !== c.touches.length
          );
        };
        g.prototype.zoomOption = function (c) {
          var b = this.chart,
            a = b.options.chart,
            d = a.zoomType || "";
          b = b.inverted;
          /touch/.test(c.type) && (d = w(a.pinchType, d));
          this.zoomX = c = /x/.test(d);
          this.zoomY = d = /y/.test(d);
          this.zoomHor = (c && !b) || (d && b);
          this.zoomVert = (d && !b) || (c && b);
          this.hasZoom = c || d;
        };
        return g;
      })();
      return (h.Pointer = e);
    }
  );
  P(
    e,
    "Core/MSPointer.js",
    [e["Core/Globals.js"], e["Core/Pointer.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      function y() {
        var b = [];
        b.item = function (b) {
          return this[b];
        };
        f(A, function (f) {
          b.push({ pageX: f.pageX, pageY: f.pageY, target: f.target });
        });
        return b;
      }
      function F(b, f, k, d) {
        ("touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH) ||
          !C[e.hoverChartIndex] ||
          (d(b),
          (d = C[e.hoverChartIndex].pointer),
          d[f]({ type: k, target: b.currentTarget, preventDefault: t, touches: y() }));
      }
      var E =
          (this && this.__extends) ||
          (function () {
            var b = function (f, k) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, f) {
                    b.__proto__ = f;
                  }) ||
                function (b, f) {
                  for (var d in f) f.hasOwnProperty(d) && (b[d] = f[d]);
                };
              return b(f, k);
            };
            return function (f, k) {
              function d() {
                this.constructor = f;
              }
              b(f, k);
              f.prototype = null === k ? Object.create(k) : ((d.prototype = k.prototype), new d());
            };
          })(),
        C = e.charts,
        G = e.doc,
        t = e.noop,
        z = D.addEvent,
        m = D.css,
        f = D.objectEach,
        b = D.removeEvent,
        A = {},
        u = !!e.win.PointerEvent;
      return (function (f) {
        function l() {
          return (null !== f && f.apply(this, arguments)) || this;
        }
        E(l, f);
        l.prototype.batchMSEvents = function (b) {
          b(this.chart.container, u ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
          b(this.chart.container, u ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
          b(G, u ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        };
        l.prototype.destroy = function () {
          this.batchMSEvents(b);
          f.prototype.destroy.call(this);
        };
        l.prototype.init = function (b, d) {
          f.prototype.init.call(this, b, d);
          this.hasZoom && m(b.container, { "-ms-touch-action": "none", "touch-action": "none" });
        };
        l.prototype.onContainerPointerDown = function (b) {
          F(b, "onContainerTouchStart", "touchstart", function (b) {
            A[b.pointerId] = { pageX: b.pageX, pageY: b.pageY, target: b.currentTarget };
          });
        };
        l.prototype.onContainerPointerMove = function (b) {
          F(b, "onContainerTouchMove", "touchmove", function (b) {
            A[b.pointerId] = { pageX: b.pageX, pageY: b.pageY };
            A[b.pointerId].target || (A[b.pointerId].target = b.currentTarget);
          });
        };
        l.prototype.onDocumentPointerUp = function (b) {
          F(b, "onDocumentTouchEnd", "touchend", function (b) {
            delete A[b.pointerId];
          });
        };
        l.prototype.setDOMEvents = function () {
          f.prototype.setDOMEvents.call(this);
          (this.hasZoom || this.followTouchMove) && this.batchMSEvents(z);
        };
        return l;
      })(h);
    }
  );
  P(
    e,
    "Core/Series/Point.js",
    [
      e["Core/Renderer/HTML/AST.js"],
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Options.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E) {
      var C = h.animObject,
        G = D.format,
        t = F.defaultOptions,
        z = E.addEvent,
        m = E.defined,
        f = E.erase,
        b = E.extend,
        A = E.fireEvent,
        u = E.getNestedProperty,
        l = E.isArray,
        I = E.isFunction,
        k = E.isNumber,
        d = E.isObject,
        w = E.merge,
        n = E.objectEach,
        g = E.pick,
        c = E.syncTimeout,
        q = E.removeEvent,
        a = E.uniqueKey;
      ("");
      h = (function () {
        function B() {
          this.colorIndex = this.category = void 0;
          this.formatPrefix = "point";
          this.id = void 0;
          this.isNull = !1;
          this.percentage = this.options = this.name = void 0;
          this.selected = !1;
          this.total = this.series = void 0;
          this.visible = !0;
          this.x = void 0;
        }
        B.prototype.animateBeforeDestroy = function () {
          var a = this,
            c = { x: a.startXPos, opacity: 0 },
            d,
            g = a.getGraphicalProps();
          g.singular.forEach(function (b) {
            d = "dataLabel" === b;
            a[b] = a[b].animate(d ? { x: a[b].startXPos, y: a[b].startYPos, opacity: 0 } : c);
          });
          g.plural.forEach(function (c) {
            a[c].forEach(function (c) {
              c.element &&
                c.animate(
                  b({ x: a.startXPos }, c.startYPos ? { x: c.startXPos, y: c.startYPos } : {})
                );
            });
          });
        };
        B.prototype.applyOptions = function (a, c) {
          var d = this.series,
            f = d.options.pointValKey || d.pointValKey;
          a = B.prototype.optionsToObject.call(this, a);
          b(this, a);
          this.options = this.options ? b(this.options, a) : a;
          a.group && delete this.group;
          a.dataLabels && delete this.dataLabels;
          f && (this.y = B.prototype.getNestedProperty.call(this, f));
          this.formatPrefix = (this.isNull = g(
            this.isValid && !this.isValid(),
            null === this.x || !k(this.y)
          ))
            ? "null"
            : "point";
          this.selected && (this.state = "select");
          "name" in this &&
            "undefined" === typeof c &&
            d.xAxis &&
            d.xAxis.hasNames &&
            (this.x = d.xAxis.nameToX(this));
          "undefined" === typeof this.x &&
            d &&
            (this.x = "undefined" === typeof c ? d.autoIncrement(this) : c);
          return this;
        };
        B.prototype.destroy = function () {
          function a() {
            if (b.graphic || b.dataLabel || b.dataLabels) q(b), b.destroyElements();
            for (n in b) b[n] = null;
          }
          var b = this,
            d = b.series,
            g = d.chart;
          d = d.options.dataSorting;
          var k = g.hoverPoints,
            v = C(b.series.chart.renderer.globalAnimation),
            n;
          b.legendItem && g.legend.destroyItem(b);
          k && (b.setState(), f(k, b), k.length || (g.hoverPoints = null));
          if (b === g.hoverPoint) b.onMouseOut();
          d && d.enabled ? (this.animateBeforeDestroy(), c(a, v.duration)) : a();
          g.pointCount--;
        };
        B.prototype.destroyElements = function (a) {
          var c = this;
          a = c.getGraphicalProps(a);
          a.singular.forEach(function (a) {
            c[a] = c[a].destroy();
          });
          a.plural.forEach(function (a) {
            c[a].forEach(function (a) {
              a.element && a.destroy();
            });
            delete c[a];
          });
        };
        B.prototype.firePointEvent = function (a, c, b) {
          var d = this,
            g = this.series.options;
          (g.point.events[a] || (d.options && d.options.events && d.options.events[a])) &&
            d.importEvents();
          "click" === a &&
            g.allowPointSelect &&
            (b = function (a) {
              d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
            });
          A(d, a, c, b);
        };
        B.prototype.getClassName = function () {
          return (
            "highcharts-point" +
            (this.selected ? " highcharts-point-select" : "") +
            (this.negative ? " highcharts-negative" : "") +
            (this.isNull ? " highcharts-null-point" : "") +
            ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") +
            (this.options.className ? " " + this.options.className : "") +
            (this.zone && this.zone.className
              ? " " + this.zone.className.replace("highcharts-negative", "")
              : "")
          );
        };
        B.prototype.getGraphicalProps = function (a) {
          var c = this,
            b = [],
            d,
            g = { singular: [], plural: [] };
          a = a || { graphic: 1, dataLabel: 1 };
          a.graphic && b.push("graphic", "upperGraphic", "shadowGroup");
          a.dataLabel && b.push("dataLabel", "dataLabelUpper", "connector");
          for (d = b.length; d--; ) {
            var f = b[d];
            c[f] && g.singular.push(f);
          }
          ["dataLabel", "connector"].forEach(function (b) {
            var d = b + "s";
            a[b] && c[d] && g.plural.push(d);
          });
          return g;
        };
        B.prototype.getLabelConfig = function () {
          return {
            x: this.category,
            y: this.y,
            color: this.color,
            colorIndex: this.colorIndex,
            key: this.name || this.category,
            series: this.series,
            point: this,
            percentage: this.percentage,
            total: this.total || this.stackTotal,
          };
        };
        B.prototype.getNestedProperty = function (a) {
          if (a) return 0 === a.indexOf("custom.") ? u(a, this.options) : this[a];
        };
        B.prototype.getZone = function () {
          var a = this.series,
            c = a.zones;
          a = a.zoneAxis || "y";
          var b = 0,
            d;
          for (d = c[b]; this[a] >= d.value; ) d = c[++b];
          this.nonZonedColor || (this.nonZonedColor = this.color);
          this.color = d && d.color && !this.options.color ? d.color : this.nonZonedColor;
          return d;
        };
        B.prototype.hasNewShapeType = function () {
          return (
            (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !==
            this.shapeType
          );
        };
        B.prototype.init = function (c, b, d) {
          this.series = c;
          this.applyOptions(b, d);
          this.id = m(this.id) ? this.id : a();
          this.resolveColor();
          c.chart.pointCount++;
          A(this, "afterInit");
          return this;
        };
        B.prototype.optionsToObject = function (a) {
          var c = {},
            b = this.series,
            d = b.options.keys,
            g = d || b.pointArrayMap || ["y"],
            f = g.length,
            n = 0,
            q = 0;
          if (k(a) || null === a) c[g[0]] = a;
          else if (l(a))
            for (
              !d &&
              a.length > f &&
              ((b = typeof a[0]),
              "string" === b ? (c.name = a[0]) : "number" === b && (c.x = a[0]),
              n++);
              q < f;

            )
              (d && "undefined" === typeof a[n]) ||
                (0 < g[q].indexOf(".")
                  ? B.prototype.setNestedProperty(c, a[n], g[q])
                  : (c[g[q]] = a[n])),
                n++,
                q++;
          else
            "object" === typeof a &&
              ((c = a),
              a.dataLabels && (b._hasPointLabels = !0),
              a.marker && (b._hasPointMarkers = !0));
          return c;
        };
        B.prototype.resolveColor = function () {
          var a = this.series;
          var c = a.chart.options.chart.colorCount;
          var b = a.chart.styledMode;
          delete this.nonZonedColor;
          if (a.options.colorByPoint) {
            if (!b) {
              c = a.options.colors || a.chart.options.colors;
              var d = c[a.colorCounter];
              c = c.length;
            }
            b = a.colorCounter;
            a.colorCounter++;
            a.colorCounter === c && (a.colorCounter = 0);
          } else b || (d = a.color), (b = a.colorIndex);
          this.colorIndex = g(this.options.colorIndex, b);
          this.color = g(this.options.color, d);
        };
        B.prototype.setNestedProperty = function (a, c, b) {
          b.split(".").reduce(function (a, b, g, f) {
            a[b] = f.length - 1 === g ? c : d(a[b], !0) ? a[b] : {};
            return a[b];
          }, a);
          return a;
        };
        B.prototype.tooltipFormatter = function (a) {
          var c = this.series,
            b = c.tooltipOptions,
            d = g(b.valueDecimals, ""),
            f = b.valuePrefix || "",
            k = b.valueSuffix || "";
          c.chart.styledMode && (a = c.chart.tooltip.styledModeFormat(a));
          (c.pointArrayMap || ["y"]).forEach(function (c) {
            c = "{point." + c;
            if (f || k) a = a.replace(RegExp(c + "}", "g"), f + c + "}" + k);
            a = a.replace(RegExp(c + "}", "g"), c + ":,." + d + "f}");
          });
          return G(a, { point: this, series: this.series }, c.chart);
        };
        B.prototype.update = function (a, c, b, f) {
          function p() {
            k.applyOptions(a);
            var f = n && k.hasDummyGraphic;
            f = null === k.y ? !f : f;
            n && f && ((k.graphic = n.destroy()), delete k.hasDummyGraphic);
            d(a, !0) &&
              (n &&
                n.element &&
                a &&
                a.marker &&
                "undefined" !== typeof a.marker.symbol &&
                (k.graphic = n.destroy()),
              a && a.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()),
              k.connector && (k.connector = k.connector.destroy()));
            l = k.index;
            r.updateParallelArrays(k, l);
            m.data[l] = d(m.data[l], !0) || d(a, !0) ? k.options : g(a, m.data[l]);
            r.isDirty = r.isDirtyData = !0;
            !r.fixedBox && r.hasCartesianSeries && (q.isDirtyBox = !0);
            "point" === m.legendType && (q.isDirtyLegend = !0);
            c && q.redraw(b);
          }
          var k = this,
            r = k.series,
            n = k.graphic,
            l,
            q = r.chart,
            m = r.options;
          c = g(c, !0);
          !1 === f ? p() : k.firePointEvent("update", { options: a }, p);
        };
        B.prototype.remove = function (a, c) {
          this.series.removePoint(this.series.data.indexOf(this), a, c);
        };
        B.prototype.select = function (a, c) {
          var b = this,
            d = b.series,
            f = d.chart;
          this.selectedStaging = a = g(a, !b.selected);
          b.firePointEvent(a ? "select" : "unselect", { accumulate: c }, function () {
            b.selected = b.options.selected = a;
            d.options.data[d.data.indexOf(b)] = b.options;
            b.setState(a && "select");
            c ||
              f.getSelectedPoints().forEach(function (a) {
                var c = a.series;
                a.selected &&
                  a !== b &&
                  ((a.selected = a.options.selected = !1),
                  (c.options.data[c.data.indexOf(a)] = a.options),
                  a.setState(f.hoverPoints && c.options.inactiveOtherPoints ? "inactive" : ""),
                  a.firePointEvent("unselect"));
              });
          });
          delete this.selectedStaging;
        };
        B.prototype.onMouseOver = function (a) {
          var c = this.series.chart,
            b = c.pointer;
          a = a ? b.normalize(a) : b.getChartCoordinatesFromPoint(this, c.inverted);
          b.runPointActions(a, this);
        };
        B.prototype.onMouseOut = function () {
          var a = this.series.chart;
          this.firePointEvent("mouseOut");
          this.series.options.inactiveOtherPoints ||
            (a.hoverPoints || []).forEach(function (a) {
              a.setState();
            });
          a.hoverPoints = a.hoverPoint = null;
        };
        B.prototype.importEvents = function () {
          if (!this.hasImportedEvents) {
            var a = this,
              c = w(a.series.options.point, a.options).events;
            a.events = c;
            n(c, function (c, b) {
              I(c) && z(a, b, c);
            });
            this.hasImportedEvents = !0;
          }
        };
        B.prototype.setState = function (a, c) {
          var d = this.series,
            f = this.state,
            n = d.options.states[a || "normal"] || {},
            v = t.plotOptions[d.type].marker && d.options.marker,
            l = v && !1 === v.enabled,
            q = (v && v.states && v.states[a || "normal"]) || {},
            m = !1 === q.enabled,
            B = d.stateMarkerGraphic,
            w = this.marker || {},
            u = d.chart,
            h = d.halo,
            J,
            R = v && d.markerAttribs;
          a = a || "";
          if (
            !(
              (a === this.state && !c) ||
              (this.selected && "select" !== a) ||
              !1 === n.enabled ||
              (a && (m || (l && !1 === q.enabled))) ||
              (a && w.states && w.states[a] && !1 === w.states[a].enabled)
            )
          ) {
            this.state = a;
            R && (J = d.markerAttribs(this, a));
            if (this.graphic && !this.hasDummyGraphic) {
              f && this.graphic.removeClass("highcharts-point-" + f);
              a && this.graphic.addClass("highcharts-point-" + a);
              if (!u.styledMode) {
                var I = d.pointAttribs(this, a);
                var z = g(u.options.chart.animation, n.animation);
                d.options.inactiveOtherPoints &&
                  k(I.opacity) &&
                  ((this.dataLabels || []).forEach(function (a) {
                    a && a.animate({ opacity: I.opacity }, z);
                  }),
                  this.connector && this.connector.animate({ opacity: I.opacity }, z));
                this.graphic.animate(I, z);
              }
              J && this.graphic.animate(J, g(u.options.chart.animation, q.animation, v.animation));
              B && B.hide();
            } else {
              if (a && q) {
                f = w.symbol || d.symbol;
                B && B.currentSymbol !== f && (B = B.destroy());
                if (J)
                  if (B) B[c ? "animate" : "attr"]({ x: J.x, y: J.y });
                  else
                    f &&
                      ((d.stateMarkerGraphic = B = u.renderer
                        .symbol(f, J.x, J.y, J.width, J.height)
                        .add(d.markerGroup)),
                      (B.currentSymbol = f));
                !u.styledMode && B && B.attr(d.pointAttribs(this, a));
              }
              B && (B[a && this.isInside ? "show" : "hide"](), (B.element.point = this));
            }
            n = n.halo;
            J = ((B = this.graphic || B) && B.visibility) || "inherit";
            n && n.size && B && "hidden" !== J && !this.isCluster
              ? (h || (d.halo = h = u.renderer.path().add(B.parentGroup)),
                h.show()[c ? "animate" : "attr"]({ d: this.haloPath(n.size) }),
                h.attr({
                  class:
                    "highcharts-halo highcharts-color-" +
                    g(this.colorIndex, d.colorIndex) +
                    (this.className ? " " + this.className : ""),
                  visibility: J,
                  zIndex: -1,
                }),
                (h.point = this),
                u.styledMode ||
                  h.attr(
                    b(
                      { fill: this.color || d.color, "fill-opacity": n.opacity },
                      e.filterUserAttributes(n.attributes || {})
                    )
                  ))
              : h &&
                h.point &&
                h.point.haloPath &&
                h.animate({ d: h.point.haloPath(0) }, null, h.hide);
            A(this, "afterSetState", { state: a });
          }
        };
        B.prototype.haloPath = function (a) {
          return this.series.chart.renderer.symbols.circle(
            Math.floor(this.plotX) - a,
            this.plotY - a,
            2 * a,
            2 * a
          );
        };
        return B;
      })();
      return (y.Point = h);
    }
  );
  P(
    e,
    "Core/Legend.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Series/Point.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F) {
      var E = e.animObject,
        C = e.setAnimation,
        G = h.format;
      e = D.isFirefox;
      var t = D.marginNames;
      h = D.win;
      var z = F.addEvent,
        m = F.createElement,
        f = F.css,
        b = F.defined,
        A = F.discardElement,
        u = F.find,
        l = F.fireEvent,
        I = F.isNumber,
        k = F.merge,
        d = F.pick,
        w = F.relativeLength,
        n = F.stableSort,
        g = F.syncTimeout;
      F = F.wrap;
      var c = (function () {
        function c(a, c) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = !1;
          this.group = void 0;
          this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
          this.options = {};
          this.padding = 0;
          this.pages = [];
          this.proximate = !1;
          this.scrollGroup = void 0;
          this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
          this.chart = a;
          this.init(a, c);
        }
        c.prototype.init = function (a, c) {
          this.chart = a;
          this.setOptions(c);
          c.enabled &&
            (this.render(),
            z(this.chart, "endResize", function () {
              this.legend.positionCheckboxes();
            }),
            this.proximate
              ? (this.unchartrender = z(this.chart, "render", function () {
                  this.legend.proximatePositions();
                  this.legend.positionItems();
                }))
              : this.unchartrender && this.unchartrender());
        };
        c.prototype.setOptions = function (a) {
          var c = d(a.padding, 8);
          this.options = a;
          this.chart.styledMode ||
            ((this.itemStyle = a.itemStyle),
            (this.itemHiddenStyle = k(this.itemStyle, a.itemHiddenStyle)));
          this.itemMarginTop = a.itemMarginTop || 0;
          this.itemMarginBottom = a.itemMarginBottom || 0;
          this.padding = c;
          this.initialItemY = c - 5;
          this.symbolWidth = d(a.symbolWidth, 16);
          this.pages = [];
          this.proximate = "proximate" === a.layout && !this.chart.inverted;
          this.baseline = void 0;
        };
        c.prototype.update = function (a, c) {
          var b = this.chart;
          this.setOptions(k(!0, this.options, a));
          this.destroy();
          b.isDirtyLegend = b.isDirtyBox = !0;
          d(c, !0) && b.redraw();
          l(this, "afterUpdate");
        };
        c.prototype.colorizeItem = function (a, c) {
          a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
          if (!this.chart.styledMode) {
            var b = this.options,
              d = a.legendItem,
              g = a.legendLine,
              f = a.legendSymbol,
              k = this.itemHiddenStyle.color;
            b = c ? b.itemStyle.color : k;
            var n = c ? a.color || k : k,
              m = a.options && a.options.marker,
              q = { fill: n };
            d && d.css({ fill: b, color: b });
            g && g.attr({ stroke: n });
            f &&
              (m && f.isMarker && ((q = a.pointAttribs()), c || (q.stroke = q.fill = k)),
              f.attr(q));
          }
          l(this, "afterColorizeItem", { item: a, visible: c });
        };
        c.prototype.positionItems = function () {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        };
        c.prototype.positionItem = function (a) {
          var c = this,
            d = this.options,
            g = d.symbolPadding,
            f = !d.rtl,
            k = a._legendItemPos;
          d = k[0];
          k = k[1];
          var n = a.checkbox,
            v = a.legendGroup;
          v &&
            v.element &&
            ((g = { translateX: f ? d : this.legendWidth - d - 2 * g - 4, translateY: k }),
            (f = function () {
              l(c, "afterPositionItem", { item: a });
            }),
            b(v.translateY) ? v.animate(g, void 0, f) : (v.attr(g), f()));
          n && ((n.x = d), (n.y = k));
        };
        c.prototype.destroyItem = function (a) {
          var c = a.checkbox;
          ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (c) {
            a[c] && (a[c] = a[c].destroy());
          });
          c && A(a.checkbox);
        };
        c.prototype.destroy = function () {
          function a(a) {
            this[a] && (this[a] = this[a].destroy());
          }
          this.getAllItems().forEach(function (c) {
            ["legendItem", "legendGroup"].forEach(a, c);
          });
          "clipRect up down pager nav box title group".split(" ").forEach(a, this);
          this.display = null;
        };
        c.prototype.positionCheckboxes = function () {
          var a = this.group && this.group.alignAttr,
            c = this.clipHeight || this.legendHeight,
            b = this.titleHeight;
          if (a) {
            var d = a.translateY;
            this.allItems.forEach(function (g) {
              var k = g.checkbox;
              if (k) {
                var p = d + b + k.y + (this.scrollOffset || 0) + 3;
                f(k, {
                  left: a.translateX + g.checkboxOffset + k.x - 20 + "px",
                  top: p + "px",
                  display: this.proximate || (p > d - 6 && p < d + c - 6) ? "" : "none",
                });
              }
            }, this);
          }
        };
        c.prototype.renderTitle = function () {
          var a = this.options,
            c = this.padding,
            b = a.title,
            d = 0;
          b.text &&
            (this.title ||
              ((this.title = this.chart.renderer
                .label(b.text, c - 3, c - 4, null, null, null, a.useHTML, null, "legend-title")
                .attr({ zIndex: 1 })),
              this.chart.styledMode || this.title.css(b.style),
              this.title.add(this.group)),
            b.width || this.title.css({ width: this.maxLegendWidth + "px" }),
            (a = this.title.getBBox()),
            (d = a.height),
            (this.offsetWidth = a.width),
            this.contentGroup.attr({ translateY: d }));
          this.titleHeight = d;
        };
        c.prototype.setText = function (a) {
          var c = this.options;
          a.legendItem.attr({
            text: c.labelFormat ? G(c.labelFormat, a, this.chart) : c.labelFormatter.call(a),
          });
        };
        c.prototype.renderItem = function (a) {
          var c = this.chart,
            b = c.renderer,
            g = this.options,
            f = this.symbolWidth,
            n = g.symbolPadding || 0,
            l = this.itemStyle,
            v = this.itemHiddenStyle,
            m = "horizontal" === g.layout ? d(g.itemDistance, 20) : 0,
            q = !g.rtl,
            w = a.legendItem,
            u = !a.series,
            h = !u && a.series.drawLegendSymbol ? a.series : a,
            e = h.options,
            A = this.createCheckboxForItem && e && e.showCheckbox;
          e = f + n + m + (A ? 20 : 0);
          var t = g.useHTML,
            R = a.options.className;
          w ||
            ((a.legendGroup = b
              .g("legend-item")
              .addClass(
                "highcharts-" +
                  h.type +
                  "-series highcharts-color-" +
                  a.colorIndex +
                  (R ? " " + R : "") +
                  (u ? " highcharts-series-" + a.index : "")
              )
              .attr({ zIndex: 1 })
              .add(this.scrollGroup)),
            (a.legendItem = w = b.text("", q ? f + n : -n, this.baseline || 0, t)),
            c.styledMode || w.css(k(a.visible ? l : v)),
            w.attr({ align: q ? "left" : "right", zIndex: 2 }).add(a.legendGroup),
            this.baseline ||
              ((this.fontMetrics = b.fontMetrics(c.styledMode ? 12 : l.fontSize, w)),
              (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
              w.attr("y", this.baseline),
              (this.symbolHeight = g.symbolHeight || this.fontMetrics.f),
              g.squareSymbol &&
                ((this.symbolWidth = d(g.symbolWidth, Math.max(this.symbolHeight, 16))),
                (e = this.symbolWidth + n + m + (A ? 20 : 0)),
                q && w.attr("x", this.symbolWidth + n))),
            h.drawLegendSymbol(this, a),
            this.setItemEvents && this.setItemEvents(a, w, t));
          A && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a);
          this.colorizeItem(a, a.visible);
          (!c.styledMode && l.width) ||
            w.css({ width: (g.itemWidth || this.widthOption || c.spacingBox.width) - e + "px" });
          this.setText(a);
          c = w.getBBox();
          a.itemWidth = a.checkboxOffset = g.itemWidth || a.legendItemWidth || c.width + e;
          this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
          this.totalItemWidth += a.itemWidth;
          this.itemHeight = a.itemHeight = Math.round(
            a.legendItemHeight || c.height || this.symbolHeight
          );
        };
        c.prototype.layoutItem = function (a) {
          var c = this.options,
            b = this.padding,
            g = "horizontal" === c.layout,
            f = a.itemHeight,
            k = this.itemMarginBottom,
            n = this.itemMarginTop,
            l = g ? d(c.itemDistance, 20) : 0,
            m = this.maxLegendWidth;
          c = c.alignColumns && this.totalItemWidth > m ? this.maxItemWidth : a.itemWidth;
          g &&
            this.itemX - b + c > m &&
            ((this.itemX = b),
            this.lastLineHeight && (this.itemY += n + this.lastLineHeight + k),
            (this.lastLineHeight = 0));
          this.lastItemY = n + this.itemY + k;
          this.lastLineHeight = Math.max(f, this.lastLineHeight);
          a._legendItemPos = [this.itemX, this.itemY];
          g ? (this.itemX += c) : ((this.itemY += n + f + k), (this.lastLineHeight = f));
          this.offsetWidth =
            this.widthOption ||
            Math.max((g ? this.itemX - b - (a.checkbox ? 0 : l) : c) + b, this.offsetWidth);
        };
        c.prototype.getAllItems = function () {
          var a = [];
          this.chart.series.forEach(function (c) {
            var g = c && c.options;
            c &&
              d(g.showInLegend, b(g.linkedTo) ? !1 : void 0, !0) &&
              (a = a.concat(c.legendItems || ("point" === g.legendType ? c.data : c)));
          });
          l(this, "afterGetAllItems", { allItems: a });
          return a;
        };
        c.prototype.getAlignment = function () {
          var a = this.options;
          return this.proximate
            ? a.align.charAt(0) + "tv"
            : a.floating
            ? ""
            : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0);
        };
        c.prototype.adjustMargins = function (a, c) {
          var g = this.chart,
            f = this.options,
            k = this.getAlignment();
          k &&
            [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (
              p,
              n
            ) {
              p.test(k) &&
                !b(a[n]) &&
                (g[t[n]] = Math.max(
                  g[t[n]],
                  g.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] +
                    [1, -1, -1, 1][n] * f[n % 2 ? "x" : "y"] +
                    d(f.margin, 12) +
                    c[n] +
                    (g.titleOffset[n] || 0)
                ));
            });
        };
        c.prototype.proximatePositions = function () {
          var a = this.chart,
            c = [],
            b = "left" === this.options.align;
          this.allItems.forEach(function (d) {
            var g;
            var f = b;
            if (d.yAxis) {
              d.xAxis.options.reversed && (f = !f);
              d.points &&
                (g = u(f ? d.points : d.points.slice(0).reverse(), function (a) {
                  return I(a.plotY);
                }));
              f = this.itemMarginTop + d.legendItem.getBBox().height + this.itemMarginBottom;
              var k = d.yAxis.top - a.plotTop;
              d.visible
                ? ((g = g ? g.plotY : d.yAxis.height), (g += k - 0.3 * f))
                : (g = k + d.yAxis.height);
              c.push({ target: g, size: f, item: d });
            }
          }, this);
          D.distribute(c, a.plotHeight);
          c.forEach(function (c) {
            c.item._legendItemPos[1] = a.plotTop - a.spacing[0] + c.pos;
          });
        };
        c.prototype.render = function () {
          var a = this.chart,
            c = a.renderer,
            b = this.group,
            d = this.box,
            g = this.options,
            f = this.padding;
          this.itemX = f;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = w(g.width, a.spacingBox.width - f);
          var k = a.spacingBox.width - 2 * f - g.x;
          -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (k /= 2);
          this.maxLegendWidth = this.widthOption || k;
          b ||
            ((this.group = b = c.g("legend").attr({ zIndex: 7 }).add()),
            (this.contentGroup = c.g().attr({ zIndex: 1 }).add(b)),
            (this.scrollGroup = c.g().add(this.contentGroup)));
          this.renderTitle();
          var v = this.getAllItems();
          n(v, function (a, c) {
            return (
              ((a.options && a.options.legendIndex) || 0) -
              ((c.options && c.options.legendIndex) || 0)
            );
          });
          g.reversed && v.reverse();
          this.allItems = v;
          this.display = k = !!v.length;
          this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
          v.forEach(this.renderItem, this);
          v.forEach(this.layoutItem, this);
          v = (this.widthOption || this.offsetWidth) + f;
          var m = this.lastItemY + this.lastLineHeight + this.titleHeight;
          m = this.handleOverflow(m);
          m += f;
          d ||
            ((this.box = d = c
              .rect()
              .addClass("highcharts-legend-box")
              .attr({ r: g.borderRadius })
              .add(b)),
            (d.isNew = !0));
          a.styledMode ||
            d
              .attr({
                stroke: g.borderColor,
                "stroke-width": g.borderWidth || 0,
                fill: g.backgroundColor || "none",
              })
              .shadow(g.shadow);
          0 < v &&
            0 < m &&
            (d[d.isNew ? "attr" : "animate"](
              d.crisp.call({}, { x: 0, y: 0, width: v, height: m }, d.strokeWidth())
            ),
            (d.isNew = !1));
          d[k ? "show" : "hide"]();
          a.styledMode && "none" === b.getStyle("display") && (v = m = 0);
          this.legendWidth = v;
          this.legendHeight = m;
          k && this.align();
          this.proximate || this.positionItems();
          l(this, "afterRender");
        };
        c.prototype.align = function (a) {
          void 0 === a && (a = this.chart.spacingBox);
          var c = this.chart,
            b = this.options,
            d = a.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < c.titleOffset[0]
            ? (d += c.titleOffset[0])
            : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
              0 < c.titleOffset[2] &&
              (d -= c.titleOffset[2]);
          d !== a.y && (a = k(a, { y: d }));
          this.group.align(
            k(b, {
              width: this.legendWidth,
              height: this.legendHeight,
              verticalAlign: this.proximate ? "top" : b.verticalAlign,
            }),
            !0,
            a
          );
        };
        c.prototype.handleOverflow = function (a) {
          var c = this,
            b = this.chart,
            g = b.renderer,
            f = this.options,
            k = f.y,
            n = this.padding;
          k = b.spacingBox.height + ("top" === f.verticalAlign ? -k : k) - n;
          var l = f.maxHeight,
            m,
            q = this.clipRect,
            w = f.navigation,
            u = d(w.animation, !0),
            h = w.arrowSize || 12,
            e = this.nav,
            A = this.pages,
            t,
            R = this.allItems,
            I = function (a) {
              "number" === typeof a
                ? q.attr({ height: a })
                : q && ((c.clipRect = q.destroy()), c.contentGroup.clip());
              c.contentGroup.div &&
                (c.contentGroup.div.style.clip = a
                  ? "rect(" + n + "px,9999px," + (n + a) + "px,0)"
                  : "auto");
            },
            z = function (a) {
              c[a] = g
                .circle(0, 0, 1.3 * h)
                .translate(h / 2, h / 2)
                .add(e);
              b.styledMode || c[a].attr("fill", "rgba(0,0,0,0.0001)");
              return c[a];
            };
          "horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (k /= 2);
          l && (k = Math.min(k, l));
          A.length = 0;
          a && 0 < k && a > k && !1 !== w.enabled
            ? ((this.clipHeight = m = Math.max(k - 20 - this.titleHeight - n, 0)),
              (this.currentPage = d(this.currentPage, 1)),
              (this.fullHeight = a),
              R.forEach(function (a, c) {
                var b = a._legendItemPos[1],
                  d = Math.round(a.legendItem.getBBox().height),
                  g = A.length;
                if (!g || (b - A[g - 1] > m && (t || b) !== A[g - 1])) A.push(t || b), g++;
                a.pageIx = g - 1;
                t && (R[c - 1].pageIx = g - 1);
                c === R.length - 1 &&
                  b + d - A[g - 1] > m &&
                  b !== t &&
                  (A.push(b), (a.pageIx = g));
                b !== t && (t = b);
              }),
              q || ((q = c.clipRect = g.clipRect(0, n, 9999, 0)), c.contentGroup.clip(q)),
              I(m),
              e ||
                ((this.nav = e = g.g().attr({ zIndex: 1 }).add(this.group)),
                (this.up = g.symbol("triangle", 0, 0, h, h).add(e)),
                z("upTracker").on("click", function () {
                  c.scroll(-1, u);
                }),
                (this.pager = g.text("", 15, 10).addClass("highcharts-legend-navigation")),
                b.styledMode || this.pager.css(w.style),
                this.pager.add(e),
                (this.down = g.symbol("triangle-down", 0, 0, h, h).add(e)),
                z("downTracker").on("click", function () {
                  c.scroll(1, u);
                })),
              c.scroll(0),
              (a = k))
            : e &&
              (I(),
              (this.nav = e.destroy()),
              this.scrollGroup.attr({ translateY: 1 }),
              (this.clipHeight = 0));
          return a;
        };
        c.prototype.scroll = function (a, c) {
          var b = this,
            f = this.chart,
            k = this.pages,
            n = k.length,
            m = this.currentPage + a;
          a = this.clipHeight;
          var v = this.options.navigation,
            q = this.pager,
            w = this.padding;
          m > n && (m = n);
          0 < m &&
            ("undefined" !== typeof c && C(c, f),
            this.nav.attr({
              translateX: w,
              translateY: a + this.padding + 7 + this.titleHeight,
              visibility: "visible",
            }),
            [this.up, this.upTracker].forEach(function (a) {
              a.attr({
                class: 1 === m ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active",
              });
            }),
            q.attr({ text: m + "/" + n }),
            [this.down, this.downTracker].forEach(function (a) {
              a.attr({
                x: 18 + this.pager.getBBox().width,
                class: m === n ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active",
              });
            }, this),
            f.styledMode ||
              (this.up.attr({ fill: 1 === m ? v.inactiveColor : v.activeColor }),
              this.upTracker.css({ cursor: 1 === m ? "default" : "pointer" }),
              this.down.attr({ fill: m === n ? v.inactiveColor : v.activeColor }),
              this.downTracker.css({ cursor: m === n ? "default" : "pointer" })),
            (this.scrollOffset = -k[m - 1] + this.initialItemY),
            this.scrollGroup.animate({ translateY: this.scrollOffset }),
            (this.currentPage = m),
            this.positionCheckboxes(),
            (c = E(d(c, f.renderer.globalAnimation, !0))),
            g(function () {
              l(b, "afterScroll", { currentPage: m });
            }, c.duration));
        };
        c.prototype.setItemEvents = function (a, c, b) {
          var d = this,
            g = d.chart.renderer.boxWrapper,
            f = a instanceof y,
            n = "highcharts-legend-" + (f ? "point" : "series") + "-active",
            v = d.chart.styledMode;
          (b ? [c, a.legendSymbol] : [a.legendGroup]).forEach(function (b) {
            if (b)
              b.on("mouseover", function () {
                a.visible &&
                  d.allItems.forEach(function (c) {
                    a !== c && c.setState("inactive", !f);
                  });
                a.setState("hover");
                a.visible && g.addClass(n);
                v || c.css(d.options.itemHoverStyle);
              })
                .on("mouseout", function () {
                  d.chart.styledMode || c.css(k(a.visible ? d.itemStyle : d.itemHiddenStyle));
                  d.allItems.forEach(function (c) {
                    a !== c && c.setState("", !f);
                  });
                  g.removeClass(n);
                  a.setState();
                })
                .on("click", function (c) {
                  var b = function () {
                    a.setVisible && a.setVisible();
                    d.allItems.forEach(function (c) {
                      a !== c && c.setState(a.visible ? "inactive" : "", !f);
                    });
                  };
                  g.removeClass(n);
                  c = { browserEvent: c };
                  a.firePointEvent
                    ? a.firePointEvent("legendItemClick", c, b)
                    : l(a, "legendItemClick", c, b);
                });
          });
        };
        c.prototype.createCheckboxForItem = function (a) {
          a.checkbox = m(
            "input",
            {
              type: "checkbox",
              className: "highcharts-legend-checkbox",
              checked: a.selected,
              defaultChecked: a.selected,
            },
            this.options.itemCheckboxStyle,
            this.chart.container
          );
          z(a.checkbox, "click", function (c) {
            l(a.series || a, "checkboxClick", { checked: c.target.checked, item: a }, function () {
              a.select();
            });
          });
        };
        return c;
      })();
      (/Trident\/7\.0/.test(h.navigator && h.navigator.userAgent) || e) &&
        F(c.prototype, "positionItem", function (c, a) {
          var b = this,
            d = function () {
              a._legendItemPos && c.call(b, a);
            };
          d();
          b.bubbleLegend || setTimeout(d);
        });
      D.Legend = c;
      return D.Legend;
    }
  );
  P(
    e,
    "Core/Series/SeriesRegistry.js",
    [e["Core/Globals.js"], e["Core/Options.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]],
    function (e, h, D, y) {
      var F = h.defaultOptions,
        E = y.error,
        C = y.extendClass,
        G = y.merge,
        t;
      (function (h) {
        function m(f, b) {
          var m = F.plotOptions || {},
            u = b.defaultOptions;
          b.prototype.pointClass || (b.prototype.pointClass = D);
          b.prototype.type = f;
          u && (m[f] = u);
          h.seriesTypes[f] = b;
        }
        h.seriesTypes = e.seriesTypes;
        h.getSeries = function (f, b) {
          void 0 === b && (b = {});
          var m = f.options.chart;
          m = b.type || m.type || m.defaultSeriesType || "";
          var u = h.seriesTypes[m];
          h || E(17, !0, f, { missingModuleFor: m });
          m = new u();
          "function" === typeof m.init && m.init(f, b);
          return m;
        };
        h.registerSeriesType = m;
        h.seriesType = function (f, b, e, u, l) {
          var A = F.plotOptions || {};
          b = b || "";
          A[f] = G(A[b], e);
          m(f, C(h.seriesTypes[b] || function () {}, u));
          h.seriesTypes[f].prototype.type = f;
          l && (h.seriesTypes[f].prototype.pointClass = C(D, l));
          return h.seriesTypes[f];
        };
      })(t || (t = {}));
      e.seriesType = t.seriesType;
      return t;
    }
  );
  P(
    e,
    "Core/Chart/Chart.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Axis/Axis.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Legend.js"],
      e["Core/MSPointer.js"],
      e["Core/Options.js"],
      e["Core/Color/Palette.js"],
      e["Core/Pointer.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Time.js"],
      e["Core/Utilities.js"],
      e["Core/Renderer/HTML/AST.js"],
    ],
    function (e, h, D, y, F, E, C, G, t, z, m, f, b) {
      var A = e.animate,
        u = e.animObject,
        l = e.setAnimation,
        I = D.numberFormat,
        k = y.charts,
        d = y.doc,
        w = y.win,
        n = C.defaultOptions,
        g = C.defaultTime,
        c = z.seriesTypes,
        q = f.addEvent,
        a = f.attr,
        B = f.cleanRecursively,
        J = f.createElement,
        O = f.css,
        p = f.defined,
        r = f.discardElement,
        M = f.erase,
        v = f.error,
        N = f.extend,
        K = f.find,
        L = f.fireEvent,
        H = f.getStyle,
        x = f.isArray,
        Q = f.isFunction,
        Z = f.isNumber,
        ea = f.isObject,
        R = f.isString,
        S = f.merge,
        T = f.objectEach,
        U = f.pick,
        W = f.pInt,
        V = f.relativeLength,
        aa = f.removeEvent,
        X = f.splat,
        da = f.syncTimeout,
        ba = f.uniqueKey,
        P = y.marginNames,
        ca = (function () {
          function e(a, c, b) {
            this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
            this.sharedClips = {};
            this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
            this.getArgs(a, c, b);
          }
          e.prototype.getArgs = function (a, c, b) {
            R(a) || a.nodeName ? ((this.renderTo = a), this.init(c, b)) : this.init(a, c);
          };
          e.prototype.init = function (a, c) {
            var b = a.plotOptions || {};
            L(this, "init", { args: arguments }, function () {
              var d = S(n, a),
                g = d.chart;
              T(d.plotOptions, function (a, c) {
                ea(a) && (a.tooltip = (b[c] && S(b[c].tooltip)) || void 0);
              });
              d.tooltip.userOptions =
                (a.chart && a.chart.forExport && a.tooltip.userOptions) || a.tooltip;
              this.userOptions = a;
              var f = g.events;
              this.margin = [];
              this.spacing = [];
              this.bounds = { h: {}, v: {} };
              this.labelCollectors = [];
              this.callback = c;
              this.isResizing = 0;
              this.options = d;
              this.axes = [];
              this.series = [];
              this.time = a.time && Object.keys(a.time).length ? new m(a.time) : y.time;
              this.numberFormatter = g.numberFormatter || I;
              this.styledMode = g.styledMode;
              this.hasCartesianSeries = g.showAxes;
              var p = this;
              p.index = k.length;
              k.push(p);
              y.chartCount++;
              f &&
                T(f, function (a, c) {
                  Q(a) && q(p, c, a);
                });
              p.xAxis = [];
              p.yAxis = [];
              p.pointCount = p.colorCounter = p.symbolCounter = 0;
              L(p, "afterInit");
              p.firstRender();
            });
          };
          e.prototype.initSeries = function (a) {
            var b = this.options.chart;
            b = a.type || b.type || b.defaultSeriesType;
            var d = c[b];
            d || v(17, !0, this, { missingModuleFor: b });
            b = new d();
            "function" === typeof b.init && b.init(this, a);
            return b;
          };
          e.prototype.setSeriesData = function () {
            this.getSeriesOrderByLinks().forEach(function (a) {
              a.points || a.data || !a.enabledDataSorting || a.setData(a.options.data, !1);
            });
          };
          e.prototype.getSeriesOrderByLinks = function () {
            return this.series.concat().sort(function (a, c) {
              return a.linkedSeries.length || c.linkedSeries.length
                ? c.linkedSeries.length - a.linkedSeries.length
                : 0;
            });
          };
          e.prototype.orderSeries = function (a) {
            var c = this.series;
            for (a = a || 0; a < c.length; a++)
              c[a] && ((c[a].index = a), (c[a].name = c[a].getName()));
          };
          e.prototype.isInsidePlot = function (a, c, b) {
            void 0 === b && (b = {});
            var d = this.inverted,
              g = this.plotBox,
              f = this.plotLeft,
              k = this.plotTop,
              n = this.scrollablePlotBox,
              p = this.scrollingContainer;
            p = void 0 === p ? { scrollLeft: 0, scrollTop: 0 } : p;
            var l = p.scrollLeft;
            p = p.scrollTop;
            var v = b.series;
            g = (b.visiblePlotOnly && n) || g;
            n = b.inverted ? c : a;
            c = b.inverted ? a : c;
            a = { x: n, y: c, isInsidePlot: !0 };
            if (!b.ignoreX) {
              var r = (v && (d ? v.yAxis : v.xAxis)) || { pos: f, len: Infinity };
              n = b.paneCoordinates ? r.pos + n : f + n;
              (n >= Math.max(l + f, r.pos) && n <= Math.min(l + f + g.width, r.pos + r.len)) ||
                (a.isInsidePlot = !1);
            }
            !b.ignoreY &&
              a.isInsidePlot &&
              ((d = (v && (d ? v.xAxis : v.yAxis)) || { pos: k, len: Infinity }),
              (b = b.paneCoordinates ? d.pos + c : k + c),
              (b >= Math.max(p + k, d.pos) && b <= Math.min(p + k + g.height, d.pos + d.len)) ||
                (a.isInsidePlot = !1));
            L(this, "afterIsInsidePlot", a);
            return a.isInsidePlot;
          };
          e.prototype.redraw = function (a) {
            L(this, "beforeRedraw");
            var c = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
              b = this.series,
              d = this.pointer,
              g = this.legend,
              f = this.userOptions.legend,
              k = this.isDirtyLegend,
              n = this.isDirtyBox,
              p = this.renderer,
              v = p.isHidden(),
              r = [];
            this.setResponsive && this.setResponsive(!1);
            l(this.hasRendered ? a : !1, this);
            v && this.temporaryDisplay();
            this.layOutTitles();
            for (a = b.length; a--; ) {
              var m = b[a];
              if (m.options.stacking || m.options.centerInCategory) {
                var q = !0;
                if (m.isDirty) {
                  var w = !0;
                  break;
                }
              }
            }
            if (w) for (a = b.length; a--; ) (m = b[a]), m.options.stacking && (m.isDirty = !0);
            b.forEach(function (a) {
              a.isDirty &&
                ("point" === a.options.legendType
                  ? ("function" === typeof a.updateTotals && a.updateTotals(), (k = !0))
                  : f && (f.labelFormatter || f.labelFormat) && (k = !0));
              a.isDirtyData && L(a, "updatedData");
            });
            k && g && g.options.enabled && (g.render(), (this.isDirtyLegend = !1));
            q && this.getStacks();
            c.forEach(function (a) {
              a.updateNames();
              a.setScale();
            });
            this.getMargins();
            c.forEach(function (a) {
              a.isDirty && (n = !0);
            });
            c.forEach(function (a) {
              var c = a.min + "," + a.max;
              a.extKey !== c &&
                ((a.extKey = c),
                r.push(function () {
                  L(a, "afterSetExtremes", N(a.eventArgs, a.getExtremes()));
                  delete a.eventArgs;
                }));
              (n || q) && a.redraw();
            });
            n && this.drawChartBox();
            L(this, "predraw");
            b.forEach(function (a) {
              (n || a.isDirty) && a.visible && a.redraw();
              a.isDirtyData = !1;
            });
            d && d.reset(!0);
            p.draw();
            L(this, "redraw");
            L(this, "render");
            v && this.temporaryDisplay(!0);
            r.forEach(function (a) {
              a.call();
            });
          };
          e.prototype.get = function (a) {
            function c(c) {
              return c.id === a || (c.options && c.options.id === a);
            }
            var b = this.series,
              d;
            var g = K(this.axes, c) || K(this.series, c);
            for (d = 0; !g && d < b.length; d++) g = K(b[d].points || [], c);
            return g;
          };
          e.prototype.getAxes = function () {
            var a = this,
              c = this.options,
              b = (c.xAxis = X(c.xAxis || {}));
            c = c.yAxis = X(c.yAxis || {});
            L(this, "getAxes");
            b.forEach(function (a, c) {
              a.index = c;
              a.isX = !0;
            });
            c.forEach(function (a, c) {
              a.index = c;
            });
            b.concat(c).forEach(function (c) {
              new h(a, c);
            });
            L(this, "afterGetAxes");
          };
          e.prototype.getSelectedPoints = function () {
            var a = [];
            this.series.forEach(function (c) {
              a = a.concat(
                c.getPointsCollection().filter(function (a) {
                  return U(a.selectedStaging, a.selected);
                })
              );
            });
            return a;
          };
          e.prototype.getSelectedSeries = function () {
            return this.series.filter(function (a) {
              return a.selected;
            });
          };
          e.prototype.setTitle = function (a, c, b) {
            this.applyDescription("title", a);
            this.applyDescription("subtitle", c);
            this.applyDescription("caption", void 0);
            this.layOutTitles(b);
          };
          e.prototype.applyDescription = function (a, c) {
            var b = this,
              d =
                "title" === a
                  ? { color: G.neutralColor80, fontSize: this.options.isStock ? "16px" : "18px" }
                  : { color: G.neutralColor60 };
            d = this.options[a] = S(!this.styledMode && { style: d }, this.options[a], c);
            var g = this[a];
            g && c && (this[a] = g = g.destroy());
            d &&
              !g &&
              ((g = this.renderer
                .text(d.text, 0, 0, d.useHTML)
                .attr({ align: d.align, class: "highcharts-" + a, zIndex: d.zIndex || 4 })
                .add()),
              (g.update = function (c) {
                b[{ title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }[a]](c);
              }),
              this.styledMode || g.css(d.style),
              (this[a] = g));
          };
          e.prototype.layOutTitles = function (a) {
            var c = [0, 0, 0],
              b = this.renderer,
              d = this.spacingBox;
            ["title", "subtitle", "caption"].forEach(function (a) {
              var g = this[a],
                f = this.options[a],
                k = f.verticalAlign || "top";
              a = "title" === a ? -3 : "top" === k ? c[0] + 2 : 0;
              if (g) {
                if (!this.styledMode) var n = f.style.fontSize;
                n = b.fontMetrics(n, g).b;
                g.css({ width: (f.width || d.width + (f.widthAdjust || 0)) + "px" });
                var p = Math.round(g.getBBox(f.useHTML).height);
                g.align(N({ y: "bottom" === k ? n : a + n, height: p }, f), !1, "spacingBox");
                f.floating ||
                  ("top" === k
                    ? (c[0] = Math.ceil(c[0] + p))
                    : "bottom" === k && (c[2] = Math.ceil(c[2] + p)));
              }
            }, this);
            c[0] &&
              "top" === (this.options.title.verticalAlign || "top") &&
              (c[0] += this.options.title.margin);
            c[2] &&
              "bottom" === this.options.caption.verticalAlign &&
              (c[2] += this.options.caption.margin);
            var g = !this.titleOffset || this.titleOffset.join(",") !== c.join(",");
            this.titleOffset = c;
            L(this, "afterLayOutTitles");
            !this.isDirtyBox &&
              g &&
              ((this.isDirtyBox = this.isDirtyLegend = g),
              this.hasRendered && U(a, !0) && this.isDirtyBox && this.redraw());
          };
          e.prototype.getChartSize = function () {
            var a = this.options.chart,
              c = a.width;
            a = a.height;
            var b = this.renderTo;
            p(c) || (this.containerWidth = H(b, "width"));
            p(a) || (this.containerHeight = H(b, "height"));
            this.chartWidth = Math.max(0, c || this.containerWidth || 600);
            this.chartHeight = Math.max(
              0,
              V(a, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400)
            );
          };
          e.prototype.temporaryDisplay = function (a) {
            var c = this.renderTo;
            if (a)
              for (; c && c.style; )
                c.hcOrigStyle && (O(c, c.hcOrigStyle), delete c.hcOrigStyle),
                  c.hcOrigDetached && (d.body.removeChild(c), (c.hcOrigDetached = !1)),
                  (c = c.parentNode);
            else
              for (; c && c.style; ) {
                d.body.contains(c) ||
                  c.parentNode ||
                  ((c.hcOrigDetached = !0), d.body.appendChild(c));
                if ("none" === H(c, "display", !1) || c.hcOricDetached)
                  (c.hcOrigStyle = {
                    display: c.style.display,
                    height: c.style.height,
                    overflow: c.style.overflow,
                  }),
                    (a = { display: "block", overflow: "hidden" }),
                    c !== this.renderTo && (a.height = 0),
                    O(c, a),
                    c.offsetWidth || c.style.setProperty("display", "block", "important");
                c = c.parentNode;
                if (c === d.body) break;
              }
          };
          e.prototype.setClassName = function (a) {
            this.container.className = "highcharts-container " + (a || "");
          };
          e.prototype.getContainer = function () {
            var c = this.options,
              b = c.chart;
            var g = this.renderTo;
            var f = ba(),
              n,
              p;
            g || (this.renderTo = g = b.renderTo);
            R(g) && (this.renderTo = g = d.getElementById(g));
            g || v(13, !0, this);
            var r = W(a(g, "data-highcharts-chart"));
            Z(r) && k[r] && k[r].hasRendered && k[r].destroy();
            a(g, "data-highcharts-chart", this.index);
            g.innerHTML = "";
            b.skipClone || g.offsetWidth || this.temporaryDisplay();
            this.getChartSize();
            r = this.chartWidth;
            var m = this.chartHeight;
            O(g, { overflow: "hidden" });
            this.styledMode ||
              (n = N(
                {
                  position: "relative",
                  overflow: "hidden",
                  width: r + "px",
                  height: m + "px",
                  textAlign: "left",
                  lineHeight: "normal",
                  zIndex: 0,
                  "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                  userSelect: "none",
                  "touch-action": "manipulation",
                  outline: "none",
                },
                b.style || {}
              ));
            this.container = g = J("div", { id: f }, n, g);
            this._cursor = g.style.cursor;
            this.renderer = new (y[b.renderer] || y.Renderer)(
              g,
              r,
              m,
              null,
              b.forExport,
              c.exporting && c.exporting.allowHTML,
              this.styledMode
            );
            l(void 0, this);
            this.setClassName(b.className);
            if (this.styledMode) for (p in c.defs) this.renderer.definition(c.defs[p]);
            else this.renderer.setStyle(b.style);
            this.renderer.chartIndex = this.index;
            L(this, "afterGetContainer");
          };
          e.prototype.getMargins = function (a) {
            var c = this.spacing,
              b = this.margin,
              d = this.titleOffset;
            this.resetMargins();
            d[0] && !p(b[0]) && (this.plotTop = Math.max(this.plotTop, d[0] + c[0]));
            d[2] && !p(b[2]) && (this.marginBottom = Math.max(this.marginBottom, d[2] + c[2]));
            this.legend && this.legend.display && this.legend.adjustMargins(b, c);
            L(this, "getMargins");
            a || this.getAxisMargins();
          };
          e.prototype.getAxisMargins = function () {
            var a = this,
              c = (a.axisOffset = [0, 0, 0, 0]),
              b = a.colorAxis,
              d = a.margin,
              g = function (a) {
                a.forEach(function (a) {
                  a.visible && a.getOffset();
                });
              };
            a.hasCartesianSeries ? g(a.axes) : b && b.length && g(b);
            P.forEach(function (b, g) {
              p(d[g]) || (a[b] += c[g]);
            });
            a.setChartSize();
          };
          e.prototype.reflow = function (a) {
            var c = this,
              b = c.options.chart,
              g = c.renderTo,
              k = p(b.width) && p(b.height),
              n = b.width || H(g, "width");
            b = b.height || H(g, "height");
            g = a ? a.target : w;
            delete c.pointer.chartPosition;
            if (!k && !c.isPrinting && n && b && (g === w || g === d)) {
              if (n !== c.containerWidth || b !== c.containerHeight)
                f.clearTimeout(c.reflowTimeout),
                  (c.reflowTimeout = da(
                    function () {
                      c.container && c.setSize(void 0, void 0, !1);
                    },
                    a ? 100 : 0
                  ));
              c.containerWidth = n;
              c.containerHeight = b;
            }
          };
          e.prototype.setReflow = function (a) {
            var c = this;
            !1 === a || this.unbindReflow
              ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow())
              : ((this.unbindReflow = q(w, "resize", function (a) {
                  c.options && c.reflow(a);
                })),
                q(this, "destroy", this.unbindReflow));
          };
          e.prototype.setSize = function (a, c, b) {
            var d = this,
              g = d.renderer;
            d.isResizing += 1;
            l(b, d);
            b = g.globalAnimation;
            d.oldChartHeight = d.chartHeight;
            d.oldChartWidth = d.chartWidth;
            "undefined" !== typeof a && (d.options.chart.width = a);
            "undefined" !== typeof c && (d.options.chart.height = c);
            d.getChartSize();
            d.styledMode ||
              (b ? A : O)(
                d.container,
                { width: d.chartWidth + "px", height: d.chartHeight + "px" },
                b
              );
            d.setChartSize(!0);
            g.setSize(d.chartWidth, d.chartHeight, b);
            d.axes.forEach(function (a) {
              a.isDirty = !0;
              a.setScale();
            });
            d.isDirtyLegend = !0;
            d.isDirtyBox = !0;
            d.layOutTitles();
            d.getMargins();
            d.redraw(b);
            d.oldChartHeight = null;
            L(d, "resize");
            da(function () {
              d &&
                L(d, "endResize", null, function () {
                  --d.isResizing;
                });
            }, u(b).duration);
          };
          e.prototype.setChartSize = function (a) {
            var c = this.inverted,
              b = this.renderer,
              d = this.chartWidth,
              g = this.chartHeight,
              f = this.options.chart,
              k = this.spacing,
              n = this.clipOffset,
              p,
              l,
              v,
              r;
            this.plotLeft = p = Math.round(this.plotLeft);
            this.plotTop = l = Math.round(this.plotTop);
            this.plotWidth = v = Math.max(0, Math.round(d - p - this.marginRight));
            this.plotHeight = r = Math.max(0, Math.round(g - l - this.marginBottom));
            this.plotSizeX = c ? r : v;
            this.plotSizeY = c ? v : r;
            this.plotBorderWidth = f.plotBorderWidth || 0;
            this.spacingBox = b.spacingBox = {
              x: k[3],
              y: k[0],
              width: d - k[3] - k[1],
              height: g - k[0] - k[2],
            };
            this.plotBox = b.plotBox = { x: p, y: l, width: v, height: r };
            g = 2 * Math.floor(this.plotBorderWidth / 2);
            c = Math.ceil(Math.max(g, n[3]) / 2);
            d = Math.ceil(Math.max(g, n[0]) / 2);
            this.clipBox = {
              x: c,
              y: d,
              width: Math.floor(this.plotSizeX - Math.max(g, n[1]) / 2 - c),
              height: Math.max(0, Math.floor(this.plotSizeY - Math.max(g, n[2]) / 2 - d)),
            };
            a ||
              (this.axes.forEach(function (a) {
                a.setAxisSize();
                a.setAxisTranslation();
              }),
              b.alignElements());
            L(this, "afterSetChartSize", { skipAxes: a });
          };
          e.prototype.resetMargins = function () {
            L(this, "resetMargins");
            var a = this,
              c = a.options.chart;
            ["margin", "spacing"].forEach(function (b) {
              var d = c[b],
                g = ea(d) ? d : [d, d, d, d];
              ["Top", "Right", "Bottom", "Left"].forEach(function (d, f) {
                a[b][f] = U(c[b + d], g[f]);
              });
            });
            P.forEach(function (c, b) {
              a[c] = U(a.margin[b], a.spacing[b]);
            });
            a.axisOffset = [0, 0, 0, 0];
            a.clipOffset = [0, 0, 0, 0];
          };
          e.prototype.drawChartBox = function () {
            var a = this.options.chart,
              c = this.renderer,
              b = this.chartWidth,
              d = this.chartHeight,
              g = this.chartBackground,
              f = this.plotBackground,
              k = this.plotBorder,
              n = this.styledMode,
              p = this.plotBGImage,
              l = a.backgroundColor,
              v = a.plotBackgroundColor,
              r = a.plotBackgroundImage,
              m,
              q = this.plotLeft,
              w = this.plotTop,
              u = this.plotWidth,
              h = this.plotHeight,
              e = this.plotBox,
              N = this.clipRect,
              B = this.clipBox,
              x = "animate";
            g ||
              ((this.chartBackground = g = c.rect().addClass("highcharts-background").add()),
              (x = "attr"));
            if (n) var M = (m = g.strokeWidth());
            else {
              M = a.borderWidth || 0;
              m = M + (a.shadow ? 8 : 0);
              l = { fill: l || "none" };
              if (M || g["stroke-width"]) (l.stroke = a.borderColor), (l["stroke-width"] = M);
              g.attr(l).shadow(a.shadow);
            }
            g[x]({
              x: m / 2,
              y: m / 2,
              width: b - m - (M % 2),
              height: d - m - (M % 2),
              r: a.borderRadius,
            });
            x = "animate";
            f ||
              ((x = "attr"),
              (this.plotBackground = f = c.rect().addClass("highcharts-plot-background").add()));
            f[x](e);
            n ||
              (f.attr({ fill: v || "none" }).shadow(a.plotShadow),
              r &&
                (p
                  ? (r !== p.attr("href") && p.attr("href", r), p.animate(e))
                  : (this.plotBGImage = c.image(r, q, w, u, h).add())));
            N ? N.animate({ width: B.width, height: B.height }) : (this.clipRect = c.clipRect(B));
            x = "animate";
            k ||
              ((x = "attr"),
              (this.plotBorder = k = c
                .rect()
                .addClass("highcharts-plot-border")
                .attr({ zIndex: 1 })
                .add()));
            n ||
              k.attr({
                stroke: a.plotBorderColor,
                "stroke-width": a.plotBorderWidth || 0,
                fill: "none",
              });
            k[x](k.crisp({ x: q, y: w, width: u, height: h }, -k.strokeWidth()));
            this.isDirtyBox = !1;
            L(this, "afterDrawChartBox");
          };
          e.prototype.propFromSeries = function () {
            var a = this,
              b = a.options.chart,
              d,
              g = a.options.series,
              f,
              k;
            ["inverted", "angular", "polar"].forEach(function (n) {
              d = c[b.type || b.defaultSeriesType];
              k = b[n] || (d && d.prototype[n]);
              for (f = g && g.length; !k && f--; ) (d = c[g[f].type]) && d.prototype[n] && (k = !0);
              a[n] = k;
            });
          };
          e.prototype.linkSeries = function () {
            var a = this,
              c = a.series;
            c.forEach(function (a) {
              a.linkedSeries.length = 0;
            });
            c.forEach(function (c) {
              var b = c.options.linkedTo;
              R(b) &&
                (b = ":previous" === b ? a.series[c.index - 1] : a.get(b)) &&
                b.linkedParent !== c &&
                (b.linkedSeries.push(c),
                (c.linkedParent = b),
                b.enabledDataSorting && c.setDataSortingOptions(),
                (c.visible = U(c.options.visible, b.options.visible, c.visible)));
            });
            L(this, "afterLinkSeries");
          };
          e.prototype.renderSeries = function () {
            this.series.forEach(function (a) {
              a.translate();
              a.render();
            });
          };
          e.prototype.renderLabels = function () {
            var a = this,
              c = a.options.labels;
            c.items &&
              c.items.forEach(function (b) {
                var d = N(c.style, b.style),
                  g = W(d.left) + a.plotLeft,
                  f = W(d.top) + a.plotTop + 12;
                delete d.left;
                delete d.top;
                a.renderer.text(b.html, g, f).attr({ zIndex: 2 }).css(d).add();
              });
          };
          e.prototype.render = function () {
            var a = this.axes,
              c = this.colorAxis,
              b = this.renderer,
              d = this.options,
              g = 0,
              f = function (a) {
                a.forEach(function (a) {
                  a.visible && a.render();
                });
              };
            this.setTitle();
            this.legend = new F(this, d.legend);
            this.getStacks && this.getStacks();
            this.getMargins(!0);
            this.setChartSize();
            d = this.plotWidth;
            a.some(function (a) {
              if (a.horiz && a.visible && a.options.labels.enabled && a.series.length)
                return (g = 21), !0;
            });
            var k = (this.plotHeight = Math.max(this.plotHeight - g, 0));
            a.forEach(function (a) {
              a.setScale();
            });
            this.getAxisMargins();
            var n = 1.1 < d / this.plotWidth;
            var p = 1.05 < k / this.plotHeight;
            if (n || p)
              a.forEach(function (a) {
                ((a.horiz && n) || (!a.horiz && p)) && a.setTickInterval(!0);
              }),
                this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries ? f(a) : c && c.length && f(c);
            this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add());
            this.renderSeries();
            this.renderLabels();
            this.addCredits();
            this.setResponsive && this.setResponsive();
            this.hasRendered = !0;
          };
          e.prototype.addCredits = function (a) {
            var c = this,
              b = S(!0, this.options.credits, a);
            b.enabled &&
              !this.credits &&
              ((this.credits = this.renderer
                .text(b.text + (this.mapCredits || ""), 0, 0)
                .addClass("highcharts-credits")
                .on("click", function () {
                  b.href && (w.location.href = b.href);
                })
                .attr({ align: b.position.align, zIndex: 8 })),
              c.styledMode || this.credits.css(b.style),
              this.credits.add().align(b.position),
              (this.credits.update = function (a) {
                c.credits = c.credits.destroy();
                c.addCredits(a);
              }));
          };
          e.prototype.destroy = function () {
            var a = this,
              c = a.axes,
              b = a.series,
              d = a.container,
              g,
              f = d && d.parentNode;
            L(a, "destroy");
            a.renderer.forExport ? M(k, a) : (k[a.index] = void 0);
            y.chartCount--;
            a.renderTo.removeAttribute("data-highcharts-chart");
            aa(a);
            for (g = c.length; g--; ) c[g] = c[g].destroy();
            this.scroller && this.scroller.destroy && this.scroller.destroy();
            for (g = b.length; g--; ) b[g] = b[g].destroy();
            "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
              .split(" ")
              .forEach(function (c) {
                var b = a[c];
                b && b.destroy && (a[c] = b.destroy());
              });
            d && ((d.innerHTML = ""), aa(d), f && r(d));
            T(a, function (c, b) {
              delete a[b];
            });
          };
          e.prototype.firstRender = function () {
            var a = this,
              c = a.options;
            if (!a.isReadyToRender || a.isReadyToRender()) {
              a.getContainer();
              a.resetMargins();
              a.setChartSize();
              a.propFromSeries();
              a.getAxes();
              (x(c.series) ? c.series : []).forEach(function (c) {
                a.initSeries(c);
              });
              a.linkSeries();
              a.setSeriesData();
              L(a, "beforeRender");
              t &&
                (a.pointer =
                  y.hasTouch || (!w.PointerEvent && !w.MSPointerEvent) ? new t(a, c) : new E(a, c));
              a.render();
              a.pointer.getChartPosition();
              if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
              a.temporaryDisplay(!0);
            }
          };
          e.prototype.onload = function () {
            this.callbacks.concat([this.callback]).forEach(function (a) {
              a && "undefined" !== typeof this.index && a.apply(this, [this]);
            }, this);
            L(this, "load");
            L(this, "render");
            p(this.index) && this.setReflow(this.options.chart.reflow);
            this.hasLoaded = !0;
          };
          e.prototype.addSeries = function (a, c, b) {
            var d,
              g = this;
            a &&
              ((c = U(c, !0)),
              L(g, "addSeries", { options: a }, function () {
                d = g.initSeries(a);
                g.isDirtyLegend = !0;
                g.linkSeries();
                d.enabledDataSorting && d.setData(a.data, !1);
                L(g, "afterAddSeries", { series: d });
                c && g.redraw(b);
              }));
            return d;
          };
          e.prototype.addAxis = function (a, c, b, d) {
            return this.createAxis(c ? "xAxis" : "yAxis", { axis: a, redraw: b, animation: d });
          };
          e.prototype.addColorAxis = function (a, c, b) {
            return this.createAxis("colorAxis", { axis: a, redraw: c, animation: b });
          };
          e.prototype.createAxis = function (a, c) {
            var b = "colorAxis" === a,
              d = c.redraw,
              g = c.animation;
            a = S(c.axis, { index: this[a].length, isX: "xAxis" === a });
            a = b ? new y.ColorAxis(this, a) : new h(this, a);
            b &&
              ((this.isDirtyLegend = !0),
              this.axes.forEach(function (a) {
                a.series = [];
              }),
              this.series.forEach(function (a) {
                a.bindAxes();
                a.isDirtyData = !0;
              }));
            U(d, !0) && this.redraw(g);
            return a;
          };
          e.prototype.showLoading = function (a) {
            var c = this,
              d = c.options,
              g = c.loadingDiv,
              f = c.loadingSpan,
              k = d.loading,
              n = function () {
                g &&
                  O(g, {
                    left: c.plotLeft + "px",
                    top: c.plotTop + "px",
                    width: c.plotWidth + "px",
                    height: c.plotHeight + "px",
                  });
              };
            g ||
              (c.loadingDiv = g = J(
                "div",
                { className: "highcharts-loading highcharts-loading-hidden" },
                null,
                c.container
              ));
            f ||
              ((c.loadingSpan = f = J("span", { className: "highcharts-loading-inner" }, null, g)),
              q(c, "redraw", n));
            g.className = "highcharts-loading";
            b.setElementHTML(f, U(a, d.lang.loading, ""));
            c.styledMode ||
              (O(g, N(k.style, { zIndex: 10 })),
              O(f, k.labelStyle),
              c.loadingShown ||
                (O(g, { opacity: 0, display: "" }),
                A(g, { opacity: k.style.opacity || 0.5 }, { duration: k.showDuration || 0 })));
            c.loadingShown = !0;
            n();
          };
          e.prototype.hideLoading = function () {
            var a = this.options,
              c = this.loadingDiv;
            c &&
              ((c.className = "highcharts-loading highcharts-loading-hidden"),
              this.styledMode ||
                A(
                  c,
                  { opacity: 0 },
                  {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                      O(c, { display: "none" });
                    },
                  }
                ));
            this.loadingShown = !1;
          };
          e.prototype.update = function (a, c, b, d) {
            var f = this,
              k = {
                credits: "addCredits",
                title: "setTitle",
                subtitle: "setSubtitle",
                caption: "setCaption",
              },
              n,
              l,
              v,
              r = a.isResponsiveOptions,
              q = [];
            L(f, "update", { options: a });
            r || f.setResponsive(!1, !0);
            a = B(a, f.options);
            f.userOptions = S(f.userOptions, a);
            if ((n = a.chart)) {
              S(!0, f.options.chart, n);
              "className" in n && f.setClassName(n.className);
              "reflow" in n && f.setReflow(n.reflow);
              if ("inverted" in n || "polar" in n || "type" in n) {
                f.propFromSeries();
                var w = !0;
              }
              "alignTicks" in n && (w = !0);
              T(n, function (a, c) {
                -1 !== f.propsRequireUpdateSeries.indexOf("chart." + c) && (l = !0);
                -1 !== f.propsRequireDirtyBox.indexOf(c) && (f.isDirtyBox = !0);
                -1 !== f.propsRequireReflow.indexOf(c) && (r ? (f.isDirtyBox = !0) : (v = !0));
              });
              !f.styledMode && "style" in n && f.renderer.setStyle(n.style);
            }
            !f.styledMode && a.colors && (this.options.colors = a.colors);
            a.time &&
              (this.time === g && (this.time = new m(a.time)), S(!0, f.options.time, a.time));
            T(a, function (c, b) {
              if (f[b] && "function" === typeof f[b].update) f[b].update(c, !1);
              else if ("function" === typeof f[k[b]]) f[k[b]](c);
              else
                "colors" !== b &&
                  -1 === f.collectionsWithUpdate.indexOf(b) &&
                  S(!0, f.options[b], a[b]);
              "chart" !== b && -1 !== f.propsRequireUpdateSeries.indexOf(b) && (l = !0);
            });
            this.collectionsWithUpdate.forEach(function (c) {
              if (a[c]) {
                var d = [];
                f[c].forEach(function (a, c) {
                  a.options.isInternal || d.push(U(a.options.index, c));
                });
                X(a[c]).forEach(function (a, g) {
                  var k = p(a.id),
                    n;
                  k && (n = f.get(a.id));
                  !n && f[c] && (n = f[c][d ? d[g] : g]) && k && p(n.options.id) && (n = void 0);
                  n && n.coll === c && (n.update(a, !1), b && (n.touched = !0));
                  !n &&
                    b &&
                    f.collectionsWithInit[c] &&
                    (f.collectionsWithInit[c][0].apply(
                      f,
                      [a].concat(f.collectionsWithInit[c][1] || []).concat([!1])
                    ).touched = !0);
                });
                b &&
                  f[c].forEach(function (a) {
                    a.touched || a.options.isInternal ? delete a.touched : q.push(a);
                  });
              }
            });
            q.forEach(function (a) {
              a.chart && a.remove(!1);
            });
            w &&
              f.axes.forEach(function (a) {
                a.update({}, !1);
              });
            l &&
              f.getSeriesOrderByLinks().forEach(function (a) {
                a.chart && a.update({}, !1);
              }, this);
            w = n && n.width;
            n = n && n.height;
            R(n) && (n = V(n, w || f.chartWidth));
            v || (Z(w) && w !== f.chartWidth) || (Z(n) && n !== f.chartHeight)
              ? f.setSize(w, n, d)
              : U(c, !0) && f.redraw(d);
            L(f, "afterUpdate", { options: a, redraw: c, animation: d });
          };
          e.prototype.setSubtitle = function (a, c) {
            this.applyDescription("subtitle", a);
            this.layOutTitles(c);
          };
          e.prototype.setCaption = function (a, c) {
            this.applyDescription("caption", a);
            this.layOutTitles(c);
          };
          e.prototype.showResetZoom = function () {
            function a() {
              c.zoomOut();
            }
            var c = this,
              b = n.lang,
              d = c.options.chart.resetZoomButton,
              g = d.theme,
              f = g.states,
              k =
                "chart" === d.relativeTo || "spacingBox" === d.relativeTo
                  ? null
                  : "scrollablePlotBox";
            L(this, "beforeShowResetZoom", null, function () {
              c.resetZoomButton = c.renderer
                .button(b.resetZoom, null, null, a, g, f && f.hover)
                .attr({ align: d.position.align, title: b.resetZoomTitle })
                .addClass("highcharts-reset-zoom")
                .add()
                .align(d.position, !1, k);
            });
            L(this, "afterShowResetZoom");
          };
          e.prototype.zoomOut = function () {
            L(this, "selection", { resetSelection: !0 }, this.zoom);
          };
          e.prototype.zoom = function (a) {
            var c = this,
              b,
              d = c.pointer,
              g = !1,
              f = c.inverted ? d.mouseDownX : d.mouseDownY;
            !a || a.resetSelection
              ? (c.axes.forEach(function (a) {
                  b = a.zoom();
                }),
                (d.initiated = !1))
              : a.xAxis.concat(a.yAxis).forEach(function (a) {
                  var k = a.axis,
                    n = c.inverted ? k.left : k.top,
                    l = c.inverted ? n + k.width : n + k.height,
                    v = k.isXAxis,
                    r = !1;
                  if ((!v && f >= n && f <= l) || v || !p(f)) r = !0;
                  d[v ? "zoomX" : "zoomY"] &&
                    r &&
                    ((b = k.zoom(a.min, a.max)), k.displayBtn && (g = !0));
                });
            var k = c.resetZoomButton;
            g && !k ? c.showResetZoom() : !g && ea(k) && (c.resetZoomButton = k.destroy());
            b && c.redraw(U(c.options.chart.animation, a && a.animation, 100 > c.pointCount));
          };
          e.prototype.pan = function (a, c) {
            var b = this,
              d = b.hoverPoints,
              g = b.options.chart,
              f = b.options.mapNavigation && b.options.mapNavigation.enabled,
              k;
            c = "object" === typeof c ? c : { enabled: c, type: "x" };
            g && g.panning && (g.panning = c);
            var n = c.type;
            L(this, "pan", { originalEvent: a }, function () {
              d &&
                d.forEach(function (a) {
                  a.setState();
                });
              var c = [1];
              "xy" === n ? (c = [1, 0]) : "y" === n && (c = [0]);
              c.forEach(function (c) {
                var d = b[c ? "xAxis" : "yAxis"][0],
                  g = d.horiz,
                  p = a[g ? "chartX" : "chartY"];
                g = g ? "mouseDownX" : "mouseDownY";
                var l = b[g],
                  v = (d.pointRange || 0) / 2,
                  r = (d.reversed && !b.inverted) || (!d.reversed && b.inverted) ? -1 : 1,
                  m = d.getExtremes(),
                  q = d.toValue(l - p, !0) + v * r;
                r = d.toValue(l + d.len - p, !0) - v * r;
                var w = r < q;
                l = w ? r : q;
                q = w ? q : r;
                r = d.hasVerticalPanning();
                var u = d.panningState;
                !r ||
                  c ||
                  (u && !u.isDirty) ||
                  d.series.forEach(function (a) {
                    var c = a.getProcessedData(!0);
                    c = a.getExtremes(c.yData, !0);
                    u || (u = { startMin: Number.MAX_VALUE, startMax: -Number.MAX_VALUE });
                    Z(c.dataMin) &&
                      Z(c.dataMax) &&
                      ((u.startMin = Math.min(
                        U(a.options.threshold, Infinity),
                        c.dataMin,
                        u.startMin
                      )),
                      (u.startMax = Math.max(
                        U(a.options.threshold, -Infinity),
                        c.dataMax,
                        u.startMax
                      )));
                  });
                c = Math.min(
                  U(u && u.startMin, m.dataMin),
                  v ? m.min : d.toValue(d.toPixels(m.min) - d.minPixelPadding)
                );
                v = Math.max(
                  U(u && u.startMax, m.dataMax),
                  v ? m.max : d.toValue(d.toPixels(m.max) + d.minPixelPadding)
                );
                d.panningState = u;
                d.isOrdinal ||
                  ((r = c - l),
                  0 < r && ((q += r), (l = c)),
                  (r = q - v),
                  0 < r && ((q = v), (l -= r)),
                  d.series.length &&
                    l !== m.min &&
                    q !== m.max &&
                    l >= c &&
                    q <= v &&
                    (d.setExtremes(l, q, !1, !1, { trigger: "pan" }),
                    b.resetZoomButton ||
                      f ||
                      l === c ||
                      q === v ||
                      !n.match("y") ||
                      (b.showResetZoom(), (d.displayBtn = !1)),
                    (k = !0)),
                  (b[g] = p));
              });
              k && b.redraw(!1);
              O(b.container, { cursor: "move" });
            });
          };
          return e;
        })();
      N(ca.prototype, {
        callbacks: [],
        collectionsWithInit: {
          xAxis: [ca.prototype.addAxis, [!0]],
          yAxis: [ca.prototype.addAxis, [!1]],
          series: [ca.prototype.addSeries],
        },
        collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
        propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
          " "
        ),
        propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(
          " "
        ),
        propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(
          " "
        ),
      });
      y.chart = function (a, c, b) {
        return new ca(a, c, b);
      };
      y.Chart = ca;
      ("");
      return ca;
    }
  );
  P(e, "Mixins/LegendSymbol.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, h) {
    var D = h.merge,
      y = h.pick;
    return (e.LegendSymbolMixin = {
      drawRectangle: function (h, e) {
        var C = h.symbolHeight,
          G = h.options.squareSymbol;
        e.legendSymbol = this.chart.renderer
          .rect(
            G ? (h.symbolWidth - C) / 2 : 0,
            h.baseline - C + 1,
            G ? C : h.symbolWidth,
            C,
            y(h.options.symbolRadius, C / 2)
          )
          .addClass("highcharts-point")
          .attr({ zIndex: 3 })
          .add(e.legendGroup);
      },
      drawLineMarker: function (h) {
        var e = this.options,
          C = e.marker,
          G = h.symbolWidth,
          t = h.symbolHeight,
          z = t / 2,
          m = this.chart.renderer,
          f = this.legendGroup;
        h = h.baseline - Math.round(0.3 * h.fontMetrics.b);
        var b = {};
        this.chart.styledMode ||
          ((b = { "stroke-width": e.lineWidth || 0 }), e.dashStyle && (b.dashstyle = e.dashStyle));
        this.legendLine = m
          .path([
            ["M", 0, h],
            ["L", G, h],
          ])
          .addClass("highcharts-graph")
          .attr(b)
          .add(f);
        C &&
          !1 !== C.enabled &&
          G &&
          ((e = Math.min(y(C.radius, z), z)),
          0 === this.symbol.indexOf("url") && ((C = D(C, { width: t, height: t })), (e = 0)),
          (this.legendSymbol = C = m
            .symbol(this.symbol, G / 2 - e, h - e, 2 * e, 2 * e, C)
            .addClass("highcharts-point")
            .add(f)),
          (C.isMarker = !0));
      },
    });
  });
  P(
    e,
    "Core/Series/Series.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Globals.js"],
      e["Mixins/LegendSymbol.js"],
      e["Core/Options.js"],
      e["Core/Color/Palette.js"],
      e["Core/Series/Point.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E, C, G, t) {
      var z = e.animObject,
        m = e.setAnimation,
        f = h.hasTouch,
        b = h.svg,
        A = h.win,
        u = y.defaultOptions,
        l = C.seriesTypes,
        I = t.addEvent,
        k = t.arrayMax,
        d = t.arrayMin,
        w = t.clamp,
        n = t.cleanRecursively,
        g = t.correctFloat,
        c = t.defined,
        q = t.erase,
        a = t.error,
        B = t.extend,
        J = t.find,
        O = t.fireEvent,
        p = t.getNestedProperty,
        r = t.isArray,
        M = t.isFunction,
        v = t.isNumber,
        N = t.isString,
        K = t.merge,
        L = t.objectEach,
        H = t.pick,
        x = t.removeEvent,
        Q = t.splat,
        Z = t.syncTimeout;
      e = (function () {
        function e() {
          this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0;
        }
        e.prototype.init = function (a, c) {
          O(this, "init", { options: c });
          var b = this,
            d = a.series,
            g;
          this.eventOptions = this.eventOptions || {};
          this.eventsToUnbind = [];
          b.chart = a;
          b.options = b.setOptions(c);
          var f = b.options;
          b.linkedSeries = [];
          b.bindAxes();
          B(b, { name: f.name, state: "", visible: !1 !== f.visible, selected: !0 === f.selected });
          c = f.events;
          L(c, function (a, c) {
            M(a) &&
              b.eventOptions[c] !== a &&
              (M(b.eventOptions[c]) && x(b, c, b.eventOptions[c]),
              (b.eventOptions[c] = a),
              I(b, c, a));
          });
          if (
            (c && c.click) ||
            (f.point && f.point.events && f.point.events.click) ||
            f.allowPointSelect
          )
            a.runTrackerClick = !0;
          b.getColor();
          b.getSymbol();
          b.parallelArrays.forEach(function (a) {
            b[a + "Data"] || (b[a + "Data"] = []);
          });
          b.isCartesian && (a.hasCartesianSeries = !0);
          d.length && (g = d[d.length - 1]);
          b._i = H(g && g._i, -1) + 1;
          b.opacity = b.options.opacity;
          a.orderSeries(this.insert(d));
          f.dataSorting && f.dataSorting.enabled
            ? b.setDataSortingOptions()
            : b.points || b.data || b.setData(f.data, !1);
          O(this, "afterInit");
        };
        e.prototype.is = function (a) {
          return l[a] && this instanceof l[a];
        };
        e.prototype.insert = function (a) {
          var c = this.options.index,
            b;
          if (v(c)) {
            for (b = a.length; b--; )
              if (c >= H(a[b].options.index, a[b]._i)) {
                a.splice(b + 1, 0, this);
                break;
              }
            -1 === b && a.unshift(this);
            b += 1;
          } else a.push(this);
          return H(b, a.length - 1);
        };
        e.prototype.bindAxes = function () {
          var c = this,
            b = c.options,
            d = c.chart,
            g;
          O(this, "bindAxes", null, function () {
            (c.axisTypes || []).forEach(function (f) {
              var k = 0;
              d[f].forEach(function (a) {
                g = a.options;
                if (
                  (b[f] === k && !g.isInternal) ||
                  ("undefined" !== typeof b[f] && b[f] === g.id) ||
                  ("undefined" === typeof b[f] && 0 === g.index)
                )
                  c.insert(a.series), (c[f] = a), (a.isDirty = !0);
                g.isInternal || k++;
              });
              c[f] || c.optionalAxis === f || a(18, !0, d);
            });
          });
          O(this, "afterBindAxes");
        };
        e.prototype.updateParallelArrays = function (a, c) {
          var b = a.series,
            d = arguments,
            g = v(c)
              ? function (d) {
                  var g = "y" === d && b.toYData ? b.toYData(a) : a[d];
                  b[d + "Data"][c] = g;
                }
              : function (a) {
                  Array.prototype[c].apply(b[a + "Data"], Array.prototype.slice.call(d, 2));
                };
          b.parallelArrays.forEach(g);
        };
        e.prototype.hasData = function () {
          return (
            (this.visible &&
              "undefined" !== typeof this.dataMax &&
              "undefined" !== typeof this.dataMin) ||
            (this.visible && this.yData && 0 < this.yData.length)
          );
        };
        e.prototype.autoIncrement = function () {
          var a = this.options,
            c = this.xIncrement,
            b,
            d = a.pointIntervalUnit,
            g = this.chart.time;
          c = H(c, a.pointStart, 0);
          this.pointInterval = b = H(this.pointInterval, a.pointInterval, 1);
          d &&
            ((a = new g.Date(c)),
            "day" === d
              ? g.set("Date", a, g.get("Date", a) + b)
              : "month" === d
              ? g.set("Month", a, g.get("Month", a) + b)
              : "year" === d && g.set("FullYear", a, g.get("FullYear", a) + b),
            (b = a.getTime() - c));
          this.xIncrement = c + b;
          return c;
        };
        e.prototype.setDataSortingOptions = function () {
          var a = this.options;
          B(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 });
          c(a.pointRange) || (a.pointRange = 1);
        };
        e.prototype.setOptions = function (a) {
          var b = this.chart,
            d = b.options,
            g = d.plotOptions,
            f = b.userOptions || {};
          a = K(a);
          b = b.styledMode;
          var k = { plotOptions: g, userOptions: a };
          O(this, "setOptions", k);
          var n = k.plotOptions[this.type],
            p = f.plotOptions || {};
          this.userOptions = k.userOptions;
          f = K(n, g.series, f.plotOptions && f.plotOptions[this.type], a);
          this.tooltipOptions = K(
            u.tooltip,
            u.plotOptions.series && u.plotOptions.series.tooltip,
            u.plotOptions[this.type].tooltip,
            d.tooltip.userOptions,
            g.series && g.series.tooltip,
            g[this.type].tooltip,
            a.tooltip
          );
          this.stickyTracking = H(
            a.stickyTracking,
            p[this.type] && p[this.type].stickyTracking,
            p.series && p.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : f.stickyTracking
          );
          null === n.marker && delete f.marker;
          this.zoneAxis = f.zoneAxis;
          d = this.zones = (f.zones || []).slice();
          (!f.negativeColor && !f.negativeFillColor) ||
            f.zones ||
            ((g = {
              value: f[this.zoneAxis + "Threshold"] || f.threshold || 0,
              className: "highcharts-negative",
            }),
            b || ((g.color = f.negativeColor), (g.fillColor = f.negativeFillColor)),
            d.push(g));
          d.length &&
            c(d[d.length - 1].value) &&
            d.push(b ? {} : { color: this.color, fillColor: this.fillColor });
          O(this, "afterSetOptions", { options: f });
          return f;
        };
        e.prototype.getName = function () {
          return H(this.options.name, "Series " + (this.index + 1));
        };
        e.prototype.getCyclic = function (a, b, d) {
          var g = this.chart,
            f = this.userOptions,
            k = a + "Index",
            n = a + "Counter",
            p = d ? d.length : H(g.options.chart[a + "Count"], g[a + "Count"]);
          if (!b) {
            var l = H(f[k], f["_" + k]);
            c(l) || (g.series.length || (g[n] = 0), (f["_" + k] = l = g[n] % p), (g[n] += 1));
            d && (b = d[l]);
          }
          "undefined" !== typeof l && (this[k] = l);
          this[a] = b;
        };
        e.prototype.getColor = function () {
          this.chart.styledMode
            ? this.getCyclic("color")
            : this.options.colorByPoint
            ? (this.color = F.neutralColor20)
            : this.getCyclic(
                "color",
                this.options.color || u.plotOptions[this.type].color,
                this.chart.options.colors
              );
        };
        e.prototype.getPointsCollection = function () {
          return (this.hasGroupedData ? this.points : this.data) || [];
        };
        e.prototype.getSymbol = function () {
          this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols);
        };
        e.prototype.findPointIndex = function (a, c) {
          var b = a.id,
            d = a.x,
            g = this.points,
            f,
            k = this.options.dataSorting;
          if (b) var n = this.chart.get(b);
          else if (this.linkedParent || this.enabledDataSorting) {
            var p = k && k.matchByName ? "name" : "index";
            n = J(g, function (c) {
              return !c.touched && c[p] === a[p];
            });
            if (!n) return;
          }
          if (n) {
            var l = n && n.index;
            "undefined" !== typeof l && (f = !0);
          }
          "undefined" === typeof l && v(d) && (l = this.xData.indexOf(d, c));
          -1 !== l &&
            "undefined" !== typeof l &&
            this.cropped &&
            (l = l >= this.cropStart ? l - this.cropStart : l);
          !f && g[l] && g[l].touched && (l = void 0);
          return l;
        };
        e.prototype.updateData = function (a, b) {
          var d = this.options,
            g = d.dataSorting,
            f = this.points,
            n = [],
            p,
            l,
            r,
            m = this.requireSorting,
            q = a.length === f.length,
            e = !0;
          this.xIncrement = null;
          a.forEach(function (a, b) {
            var k =
              (c(a) && this.pointClass.prototype.optionsToObject.call({ series: this }, a)) || {};
            var l = k.x;
            if (k.id || v(l)) {
              if (
                ((l = this.findPointIndex(k, r)),
                -1 === l || "undefined" === typeof l
                  ? n.push(a)
                  : f[l] && a !== d.data[l]
                  ? (f[l].update(a, !1, null, !1), (f[l].touched = !0), m && (r = l + 1))
                  : f[l] && (f[l].touched = !0),
                !q || b !== l || (g && g.enabled) || this.hasDerivedData)
              )
                p = !0;
            } else n.push(a);
          }, this);
          if (p) for (a = f.length; a--; ) (l = f[a]) && !l.touched && l.remove && l.remove(!1, b);
          else
            !q || (g && g.enabled)
              ? (e = !1)
              : (a.forEach(function (a, c) {
                  f[c].update && a !== f[c].y && f[c].update(a, !1, null, !1);
                }),
                (n.length = 0));
          f.forEach(function (a) {
            a && (a.touched = !1);
          });
          if (!e) return !1;
          n.forEach(function (a) {
            this.addPoint(a, !1, null, null, !1);
          }, this);
          null === this.xIncrement &&
            this.xData &&
            this.xData.length &&
            ((this.xIncrement = k(this.xData)), this.autoIncrement());
          return !0;
        };
        e.prototype.setData = function (c, b, d, g) {
          var f = this,
            k = f.points,
            n = (k && k.length) || 0,
            p,
            l = f.options,
            m = f.chart,
            q = l.dataSorting,
            e = null,
            w = f.xAxis;
          e = l.turboThreshold;
          var u = this.xData,
            h = this.yData,
            x = (p = f.pointArrayMap) && p.length,
            B = l.keys,
            M = 0,
            K = 1,
            A;
          c = c || [];
          p = c.length;
          b = H(b, !0);
          q && q.enabled && (c = this.sortData(c));
          !1 !== g &&
            p &&
            n &&
            !f.cropped &&
            !f.hasGroupedData &&
            f.visible &&
            !f.isSeriesBoosting &&
            (A = this.updateData(c, d));
          if (!A) {
            f.xIncrement = null;
            f.colorCounter = 0;
            this.parallelArrays.forEach(function (a) {
              f[a + "Data"].length = 0;
            });
            if (e && p > e)
              if (((e = f.getFirstValidPoint(c)), v(e)))
                for (d = 0; d < p; d++) (u[d] = this.autoIncrement()), (h[d] = c[d]);
              else if (r(e))
                if (x)
                  for (d = 0; d < p; d++) (g = c[d]), (u[d] = g[0]), (h[d] = g.slice(1, x + 1));
                else
                  for (
                    B &&
                      ((M = B.indexOf("x")),
                      (K = B.indexOf("y")),
                      (M = 0 <= M ? M : 0),
                      (K = 0 <= K ? K : 1)),
                      d = 0;
                    d < p;
                    d++
                  )
                    (g = c[d]), (u[d] = g[M]), (h[d] = g[K]);
              else a(12, !1, m);
            else
              for (d = 0; d < p; d++)
                "undefined" !== typeof c[d] &&
                  ((g = { series: f }),
                  f.pointClass.prototype.applyOptions.apply(g, [c[d]]),
                  f.updateParallelArrays(g, d));
            h && N(h[0]) && a(14, !0, m);
            f.data = [];
            f.options.data = f.userOptions.data = c;
            for (d = n; d--; ) k[d] && k[d].destroy && k[d].destroy();
            w && (w.minRange = w.userMinRange);
            f.isDirty = m.isDirtyBox = !0;
            f.isDirtyData = !!k;
            d = !1;
          }
          "point" === l.legendType && (this.processData(), this.generatePoints());
          b && m.redraw(d);
        };
        e.prototype.sortData = function (a) {
          var b = this,
            d = b.options.dataSorting.sortKey || "y",
            g = function (a, b) {
              return (c(b) && a.pointClass.prototype.optionsToObject.call({ series: a }, b)) || {};
            };
          a.forEach(function (c, d) {
            a[d] = g(b, c);
            a[d].index = d;
          }, this);
          a.concat()
            .sort(function (a, c) {
              a = p(d, a);
              c = p(d, c);
              return c < a ? -1 : c > a ? 1 : 0;
            })
            .forEach(function (a, c) {
              a.x = c;
            }, this);
          b.linkedSeries &&
            b.linkedSeries.forEach(function (c) {
              var b = c.options,
                d = b.data;
              (b.dataSorting && b.dataSorting.enabled) ||
                !d ||
                (d.forEach(function (b, f) {
                  d[f] = g(c, b);
                  a[f] && ((d[f].x = a[f].x), (d[f].index = f));
                }),
                c.setData(d, !1));
            });
          return a;
        };
        e.prototype.getProcessedData = function (c) {
          var b = this.xData,
            d = this.yData,
            g = b.length;
          var f = 0;
          var k = this.xAxis,
            n = this.options;
          var p = n.cropThreshold;
          var l = c || this.getExtremesFromAll || n.getExtremesFromAll,
            v = this.isCartesian;
          c = k && k.val2lin;
          n = !(!k || !k.logarithmic);
          var r = this.requireSorting;
          if (k) {
            k = k.getExtremes();
            var m = k.min;
            var e = k.max;
          }
          if (v && this.sorted && !l && (!p || g > p || this.forceCrop))
            if (b[g - 1] < m || b[0] > e) (b = []), (d = []);
            else if (this.yData && (b[0] < m || b[g - 1] > e)) {
              f = this.cropData(this.xData, this.yData, m, e);
              b = f.xData;
              d = f.yData;
              f = f.start;
              var q = !0;
            }
          for (p = b.length || 1; --p; )
            if (
              ((g = n ? c(b[p]) - c(b[p - 1]) : b[p] - b[p - 1]),
              0 < g && ("undefined" === typeof w || g < w))
            )
              var w = g;
            else 0 > g && r && (a(15, !1, this.chart), (r = !1));
          return { xData: b, yData: d, cropped: q, cropStart: f, closestPointRange: w };
        };
        e.prototype.processData = function (a) {
          var c = this.xAxis;
          if (this.isCartesian && !this.isDirty && !c.isDirty && !this.yAxis.isDirty && !a)
            return !1;
          a = this.getProcessedData();
          this.cropped = a.cropped;
          this.cropStart = a.cropStart;
          this.processedXData = a.xData;
          this.processedYData = a.yData;
          this.closestPointRange = this.basePointRange = a.closestPointRange;
        };
        e.prototype.cropData = function (a, c, b, d, g) {
          var f = a.length,
            k = 0,
            n = f,
            p;
          g = H(g, this.cropShoulder);
          for (p = 0; p < f; p++)
            if (a[p] >= b) {
              k = Math.max(0, p - g);
              break;
            }
          for (b = p; b < f; b++)
            if (a[b] > d) {
              n = b + g;
              break;
            }
          return { xData: a.slice(k, n), yData: c.slice(k, n), start: k, end: n };
        };
        e.prototype.generatePoints = function () {
          var a = this.options,
            c = a.data,
            b = this.data,
            d,
            g = this.processedXData,
            f = this.processedYData,
            k = this.pointClass,
            n = g.length,
            p = this.cropStart || 0,
            l = this.hasGroupedData,
            v = a.keys,
            r = [],
            m;
          a = a.dataGrouping && a.dataGrouping.groupAll ? p : 0;
          b || l || ((b = []), (b.length = c.length), (b = this.data = b));
          v && l && (this.options.keys = !1);
          for (m = 0; m < n; m++) {
            var e = p + m;
            if (l) {
              var q = new k().init(this, [g[m]].concat(Q(f[m])));
              q.dataGroup = this.groupMap[a + m];
              q.dataGroup.options &&
                ((q.options = q.dataGroup.options), B(q, q.dataGroup.options), delete q.dataLabels);
            } else
              (q = b[e]) ||
                "undefined" === typeof c[e] ||
                (b[e] = q = new k().init(this, c[e], g[m]));
            q && ((q.index = l ? a + m : e), (r[m] = q));
          }
          this.options.keys = v;
          if (b && (n !== (d = b.length) || l))
            for (m = 0; m < d; m++)
              m !== p || l || (m += n), b[m] && (b[m].destroyElements(), (b[m].plotX = void 0));
          this.data = b;
          this.points = r;
          O(this, "afterGeneratePoints");
        };
        e.prototype.getXExtremes = function (a) {
          return { min: d(a), max: k(a) };
        };
        e.prototype.getExtremes = function (a, c) {
          var b = this.xAxis,
            g = this.yAxis,
            f = this.processedXData || this.xData,
            n = [],
            p = 0,
            l = 0;
          var m = 0;
          var q = this.requireSorting ? this.cropShoulder : 0,
            e = g ? g.positiveValuesOnly : !1,
            w;
          a = a || this.stackedYData || this.processedYData || [];
          g = a.length;
          b && ((m = b.getExtremes()), (l = m.min), (m = m.max));
          for (w = 0; w < g; w++) {
            var u = f[w];
            var h = a[w];
            var N = (v(h) || r(h)) && (h.length || 0 < h || !e);
            u =
              c ||
              this.getExtremesFromAll ||
              this.options.getExtremesFromAll ||
              this.cropped ||
              !b ||
              ((f[w + q] || u) >= l && (f[w - q] || u) <= m);
            if (N && u)
              if ((N = h.length)) for (; N--; ) v(h[N]) && (n[p++] = h[N]);
              else n[p++] = h;
          }
          a = { dataMin: d(n), dataMax: k(n) };
          O(this, "afterGetExtremes", { dataExtremes: a });
          return a;
        };
        e.prototype.applyExtremes = function () {
          var a = this.getExtremes();
          this.dataMin = a.dataMin;
          this.dataMax = a.dataMax;
          return a;
        };
        e.prototype.getFirstValidPoint = function (a) {
          for (var c = null, b = a.length, d = 0; null === c && d < b; ) (c = a[d]), d++;
          return c;
        };
        e.prototype.translate = function () {
          this.processedXData || this.processData();
          this.generatePoints();
          var a = this.options,
            b = a.stacking,
            d = this.xAxis,
            f = d.categories,
            k = this.enabledDataSorting,
            n = this.yAxis,
            p = this.points,
            l = p.length,
            m = !!this.modifyValue,
            q,
            e = this.pointPlacementToXValue(),
            u = !!e,
            h = a.threshold,
            N = a.startFromThreshold ? h : 0,
            x,
            M = this.zoneAxis || "y",
            B = Number.MAX_VALUE;
          for (q = 0; q < l; q++) {
            var K = p[q],
              A = K.x,
              t = K.y,
              L = K.low,
              I =
                b &&
                n.stacking &&
                n.stacking.stacks[(this.negStacks && t < (N ? 0 : h) ? "-" : "") + this.stackKey],
              z = void 0,
              J = void 0;
            if (
              (n.positiveValuesOnly && !n.validatePositiveValue(t)) ||
              (d.positiveValuesOnly && !d.validatePositiveValue(A))
            )
              K.isNull = !0;
            K.plotX = x = g(w(d.translate(A, 0, 0, 0, 1, e, "flags" === this.type), -1e5, 1e5));
            if (b && this.visible && I && I[A]) {
              var C = this.getStackIndicator(C, A, this.index);
              K.isNull || ((z = I[A]), (J = z.points[C.key]));
            }
            r(J) &&
              ((L = J[0]),
              (t = J[1]),
              L === N && C.key === I[A].base && (L = H(v(h) && h, n.min)),
              n.positiveValuesOnly && 0 >= L && (L = null),
              (K.total = K.stackTotal = z.total),
              (K.percentage = z.total && (K.y / z.total) * 100),
              (K.stackY = t),
              this.irregularWidths || z.setOffset(this.pointXOffset || 0, this.barW || 0));
            K.yBottom = c(L) ? w(n.translate(L, 0, 1, 0, 1), -1e5, 1e5) : null;
            m && (t = this.modifyValue(t, K));
            K.plotY = void 0;
            v(t) &&
              ((t = n.translate(t, !1, !0, !1, !0)),
              "undefined" !== typeof t && (K.plotY = w(t, -1e5, 1e5)));
            K.isInside = this.isPointInside(K);
            K.clientX = u ? g(d.translate(A, 0, 0, 0, 1, e)) : x;
            K.negative = K[M] < (a[M + "Threshold"] || h || 0);
            K.category = f && "undefined" !== typeof f[K.x] ? f[K.x] : K.x;
            if (!K.isNull && !1 !== K.visible) {
              "undefined" !== typeof G && (B = Math.min(B, Math.abs(x - G)));
              var G = x;
            }
            K.zone = this.zones.length && K.getZone();
            !K.graphic && this.group && k && (K.isNew = !0);
          }
          this.closestPointRangePx = B;
          O(this, "afterTranslate");
        };
        e.prototype.getValidPoints = function (a, c, b) {
          var d = this.chart;
          return (a || this.points || []).filter(function (a) {
            return c && !d.isInsidePlot(a.plotX, a.plotY, { inverted: d.inverted })
              ? !1
              : !1 !== a.visible && (b || !a.isNull);
          });
        };
        e.prototype.getClipBox = function (a, c) {
          var b = this.options,
            d = this.chart,
            g = d.inverted,
            f = this.xAxis,
            k = f && this.yAxis,
            n = d.options.chart.scrollablePlotArea || {};
          a && !1 === b.clip && k
            ? (a = g
                ? {
                    y: -d.chartWidth + k.len + k.pos,
                    height: d.chartWidth,
                    width: d.chartHeight,
                    x: -d.chartHeight + f.len + f.pos,
                  }
                : { y: -k.pos, height: d.chartHeight, width: d.chartWidth, x: -f.pos })
            : ((a = this.clipBox || d.clipBox),
              c &&
                ((a.width = d.plotSizeX),
                (a.x = (d.scrollablePixelsX || 0) * (n.scrollPositionX || 0))));
          return c ? { width: a.width, x: a.x } : a;
        };
        e.prototype.getSharedClipKey = function (a) {
          if (this.sharedClipKey) return this.sharedClipKey;
          var c = [
            a && a.duration,
            a && a.easing,
            a && a.defer,
            this.getClipBox(a).height,
            this.options.xAxis,
            this.options.yAxis,
          ].join();
          if (!1 !== this.options.clip || a) this.sharedClipKey = c;
          return c;
        };
        e.prototype.setClip = function (a) {
          var c = this.chart,
            b = this.options,
            d = c.renderer,
            g = c.inverted,
            f = this.clipBox,
            k = this.getClipBox(a),
            n = this.getSharedClipKey(a),
            p = c.sharedClips[n],
            l = c.sharedClips[n + "m"];
          a && ((k.width = 0), g && (k.x = c.plotHeight + (!1 !== b.clip ? 0 : c.plotTop)));
          p
            ? c.hasLoaded || p.attr(k)
            : (a &&
                (c.sharedClips[n + "m"] = l = d.clipRect(
                  g ? (c.plotSizeX || 0) + 99 : -99,
                  g ? -c.plotLeft : -c.plotTop,
                  99,
                  g ? c.chartWidth : c.chartHeight
                )),
              (c.sharedClips[n] = p = d.clipRect(k)),
              (p.count = { length: 0 }));
          a && !p.count[this.index] && ((p.count[this.index] = !0), (p.count.length += 1));
          if (!1 !== b.clip || a)
            this.group.clip(a || f ? p : c.clipRect), this.markerGroup.clip(l);
          a ||
            (p.count[this.index] && (delete p.count[this.index], --p.count.length),
            0 === p.count.length &&
              (f || (c.sharedClips[n] = p.destroy()), l && (c.sharedClips[n + "m"] = l.destroy())));
        };
        e.prototype.animate = function (a) {
          var c = this.chart,
            b = z(this.options.animation),
            d = this.sharedClipKey;
          if (a) this.setClip(b);
          else if (d) {
            a = c.sharedClips[d];
            d = c.sharedClips[d + "m"];
            var g = this.getClipBox(b, !0);
            a && a.animate(g, b);
            d && d.animate({ width: g.width + 99, x: g.x - (c.inverted ? 0 : 99) }, b);
          }
        };
        e.prototype.afterAnimate = function () {
          this.setClip();
          O(this, "afterAnimate");
          this.finishedAnimating = !0;
        };
        e.prototype.drawPoints = function () {
          var a = this.points,
            c = this.chart,
            b,
            d,
            g = this.options.marker,
            f = this[this.specialGroup] || this.markerGroup,
            k = this.xAxis,
            n = H(
              g.enabled,
              !k || k.isRadial ? !0 : null,
              this.closestPointRangePx >= g.enabledThreshold * g.radius
            );
          if (!1 !== g.enabled || this._hasPointMarkers)
            for (b = 0; b < a.length; b++) {
              var p = a[b];
              var l = (d = p.graphic) ? "animate" : "attr";
              var v = p.marker || {};
              var r = !!p.marker;
              if (
                ((n && "undefined" === typeof v.enabled) || v.enabled) &&
                !p.isNull &&
                !1 !== p.visible
              ) {
                var m = H(v.symbol, this.symbol);
                var q = this.markerAttribs(p, p.selected && "select");
                this.enabledDataSorting && (p.startXPos = k.reversed ? -(q.width || 0) : k.width);
                var e = !1 !== p.isInside;
                d
                  ? d[e ? "show" : "hide"](e).animate(q)
                  : e &&
                    (0 < (q.width || 0) || p.hasImage) &&
                    ((p.graphic = d = c.renderer
                      .symbol(m, q.x, q.y, q.width, q.height, r ? v : g)
                      .add(f)),
                    this.enabledDataSorting &&
                      c.hasRendered &&
                      (d.attr({ x: p.startXPos }), (l = "animate")));
                d && "animate" === l && d[e ? "show" : "hide"](e).animate(q);
                if (d && !c.styledMode) d[l](this.pointAttribs(p, p.selected && "select"));
                d && d.addClass(p.getClassName(), !0);
              } else d && (p.graphic = d.destroy());
            }
        };
        e.prototype.markerAttribs = function (a, c) {
          var b = this.options,
            d = b.marker,
            g = a.marker || {},
            f = g.symbol || d.symbol,
            k = H(g.radius, d.radius);
          c &&
            ((d = d.states[c]),
            (c = g.states && g.states[c]),
            (k = H(c && c.radius, d && d.radius, k + ((d && d.radiusPlus) || 0))));
          a.hasImage = f && 0 === f.indexOf("url");
          a.hasImage && (k = 0);
          a = { x: b.crisp ? Math.floor(a.plotX - k) : a.plotX - k, y: a.plotY - k };
          k && (a.width = a.height = 2 * k);
          return a;
        };
        e.prototype.pointAttribs = function (a, c) {
          var b = this.options.marker,
            d = a && a.options,
            g = (d && d.marker) || {},
            f = this.color,
            k = d && d.color,
            n = a && a.color;
          d = H(g.lineWidth, b.lineWidth);
          var p = a && a.zone && a.zone.color;
          a = 1;
          f = k || p || n || f;
          k = g.fillColor || b.fillColor || f;
          f = g.lineColor || b.lineColor || f;
          c = c || "normal";
          b = b.states[c];
          c = (g.states && g.states[c]) || {};
          d = H(c.lineWidth, b.lineWidth, d + H(c.lineWidthPlus, b.lineWidthPlus, 0));
          k = c.fillColor || b.fillColor || k;
          f = c.lineColor || b.lineColor || f;
          a = H(c.opacity, b.opacity, a);
          return { stroke: f, "stroke-width": d, fill: k, opacity: a };
        };
        e.prototype.destroy = function (a) {
          var c = this,
            b = c.chart,
            d = /AppleWebKit\/533/.test(A.navigator.userAgent),
            g,
            f,
            k = c.data || [],
            n,
            p;
          O(c, "destroy");
          this.removeEvents(a);
          (c.axisTypes || []).forEach(function (a) {
            (p = c[a]) && p.series && (q(p.series, c), (p.isDirty = p.forceRedraw = !0));
          });
          c.legendItem && c.chart.legend.destroyItem(c);
          for (f = k.length; f--; ) (n = k[f]) && n.destroy && n.destroy();
          c.clips &&
            c.clips.forEach(function (a) {
              return a.destroy();
            });
          t.clearTimeout(c.animationTimeout);
          L(c, function (a, c) {
            a instanceof G && !a.survive && ((g = d && "group" === c ? "hide" : "destroy"), a[g]());
          });
          b.hoverSeries === c && (b.hoverSeries = void 0);
          q(b.series, c);
          b.orderSeries();
          L(c, function (b, d) {
            (a && "hcEvents" === d) || delete c[d];
          });
        };
        e.prototype.applyZones = function () {
          var a = this,
            c = this.chart,
            b = c.renderer,
            d = this.zones,
            g,
            f,
            k = this.clips || [],
            n,
            p = this.graph,
            l = this.area,
            v = Math.max(c.chartWidth, c.chartHeight),
            r = this[(this.zoneAxis || "y") + "Axis"],
            m = c.inverted,
            q,
            e,
            h,
            u = !1,
            N,
            K;
          if (d.length && (p || l) && r && "undefined" !== typeof r.min) {
            var x = r.reversed;
            var M = r.horiz;
            p && !this.showLine && p.hide();
            l && l.hide();
            var B = r.getExtremes();
            d.forEach(function (d, A) {
              g = x ? (M ? c.plotWidth : 0) : M ? 0 : r.toPixels(B.min) || 0;
              g = w(H(f, g), 0, v);
              f = w(Math.round(r.toPixels(H(d.value, B.max), !0) || 0), 0, v);
              u && (g = f = r.toPixels(B.max));
              q = Math.abs(g - f);
              e = Math.min(g, f);
              h = Math.max(g, f);
              r.isXAxis
                ? ((n = { x: m ? h : e, y: 0, width: q, height: v }),
                  M || (n.x = c.plotHeight - n.x))
                : ((n = { x: 0, y: m ? h : e, width: v, height: q }),
                  M && (n.y = c.plotWidth - n.y));
              m &&
                b.isVML &&
                (n = r.isXAxis
                  ? { x: 0, y: x ? e : h, height: n.width, width: c.chartWidth }
                  : {
                      x: n.y - c.plotLeft - c.spacingBox.x,
                      y: 0,
                      width: n.height,
                      height: c.chartHeight,
                    });
              k[A] ? k[A].animate(n) : (k[A] = b.clipRect(n));
              N = a["zone-area-" + A];
              K = a["zone-graph-" + A];
              p && K && K.clip(k[A]);
              l && N && N.clip(k[A]);
              u = d.value > B.max;
              a.resetZones && 0 === f && (f = void 0);
            });
            this.clips = k;
          } else a.visible && (p && p.show(!0), l && l.show(!0));
        };
        e.prototype.invertGroups = function (a) {
          function c() {
            ["group", "markerGroup"].forEach(function (c) {
              b[c] &&
                (d.renderer.isVML && b[c].attr({ width: b.yAxis.len, height: b.xAxis.len }),
                (b[c].width = b.yAxis.len),
                (b[c].height = b.xAxis.len),
                b[c].invert(b.isRadialSeries ? !1 : a));
            });
          }
          var b = this,
            d = b.chart;
          b.xAxis && (b.eventsToUnbind.push(I(d, "resize", c)), c(), (b.invertGroups = c));
        };
        e.prototype.plotGroup = function (a, b, d, g, f) {
          var k = this[a],
            n = !k;
          d = { visibility: d, zIndex: g || 0.1 };
          "undefined" === typeof this.opacity ||
            this.chart.styledMode ||
            "inactive" === this.state ||
            (d.opacity = this.opacity);
          n && (this[a] = k = this.chart.renderer.g().add(f));
          k.addClass(
            "highcharts-" +
              b +
              " highcharts-series-" +
              this.index +
              " highcharts-" +
              this.type +
              "-series " +
              (c(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") +
              (this.options.className || "") +
              (k.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""),
            !0
          );
          k.attr(d)[n ? "attr" : "animate"](this.getPlotBox());
          return k;
        };
        e.prototype.getPlotBox = function () {
          var a = this.chart,
            c = this.xAxis,
            b = this.yAxis;
          a.inverted && ((c = b), (b = this.xAxis));
          return {
            translateX: c ? c.left : a.plotLeft,
            translateY: b ? b.top : a.plotTop,
            scaleX: 1,
            scaleY: 1,
          };
        };
        e.prototype.removeEvents = function (a) {
          a || x(this);
          this.eventsToUnbind.length &&
            (this.eventsToUnbind.forEach(function (a) {
              a();
            }),
            (this.eventsToUnbind.length = 0));
        };
        e.prototype.render = function () {
          var a = this,
            c = a.chart,
            b = a.options,
            d = z(b.animation),
            g = !a.finishedAnimating && c.renderer.isSVG && d.duration,
            f = a.visible ? "inherit" : "hidden",
            k = b.zIndex,
            n = a.hasRendered,
            p = c.seriesGroup,
            l = c.inverted;
          O(this, "render");
          var r = a.plotGroup("group", "series", f, k, p);
          a.markerGroup = a.plotGroup("markerGroup", "markers", f, k, p);
          g && a.animate && a.animate(!0);
          r.inverted = H(a.invertible, a.isCartesian) ? l : !1;
          a.drawGraph && (a.drawGraph(), a.applyZones());
          a.visible && a.drawPoints();
          a.drawDataLabels && a.drawDataLabels();
          a.redrawPoints && a.redrawPoints();
          a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
          a.invertGroups(l);
          !1 === b.clip || a.sharedClipKey || n || r.clip(c.clipRect);
          g && a.animate && a.animate();
          n ||
            (g && d.defer && (g += d.defer),
            (a.animationTimeout = Z(function () {
              a.afterAnimate();
            }, g || 0)));
          a.isDirty = !1;
          a.hasRendered = !0;
          O(a, "afterRender");
        };
        e.prototype.redraw = function () {
          var a = this.chart,
            c = this.isDirty || this.isDirtyData,
            b = this.group,
            d = this.xAxis,
            g = this.yAxis;
          b &&
            (a.inverted && b.attr({ width: a.plotWidth, height: a.plotHeight }),
            b.animate({
              translateX: H(d && d.left, a.plotLeft),
              translateY: H(g && g.top, a.plotTop),
            }));
          this.translate();
          this.render();
          c && delete this.kdTree;
        };
        e.prototype.searchPoint = function (a, c) {
          var b = this.xAxis,
            d = this.yAxis,
            g = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: g ? b.len - a.chartY + b.pos : a.chartX - b.pos,
              plotY: g ? d.len - a.chartX + d.pos : a.chartY - d.pos,
            },
            c,
            a
          );
        };
        e.prototype.buildKDTree = function (a) {
          function c(a, d, g) {
            var f;
            if ((f = a && a.length)) {
              var k = b.kdAxisArray[d % g];
              a.sort(function (a, c) {
                return a[k] - c[k];
              });
              f = Math.floor(f / 2);
              return {
                point: a[f],
                left: c(a.slice(0, f), d + 1, g),
                right: c(a.slice(f + 1), d + 1, g),
              };
            }
          }
          this.buildingKdTree = !0;
          var b = this,
            d = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          delete b.kdTree;
          Z(
            function () {
              b.kdTree = c(b.getValidPoints(null, !b.directTouch), d, d);
              b.buildingKdTree = !1;
            },
            b.options.kdNow || (a && "touchstart" === a.type) ? 0 : 1
          );
        };
        e.prototype.searchKDTree = function (a, b, d) {
          function g(a, b, d, l) {
            var r = b.point,
              v = f.kdAxisArray[d % l],
              m = r;
            var q = c(a[k]) && c(r[k]) ? Math.pow(a[k] - r[k], 2) : null;
            var e = c(a[n]) && c(r[n]) ? Math.pow(a[n] - r[n], 2) : null;
            e = (q || 0) + (e || 0);
            r.dist = c(e) ? Math.sqrt(e) : Number.MAX_VALUE;
            r.distX = c(q) ? Math.sqrt(q) : Number.MAX_VALUE;
            v = a[v] - r[v];
            e = 0 > v ? "left" : "right";
            q = 0 > v ? "right" : "left";
            b[e] && ((e = g(a, b[e], d + 1, l)), (m = e[p] < m[p] ? e : r));
            b[q] &&
              Math.sqrt(v * v) < m[p] &&
              ((a = g(a, b[q], d + 1, l)), (m = a[p] < m[p] ? a : m));
            return m;
          }
          var f = this,
            k = this.kdAxisArray[0],
            n = this.kdAxisArray[1],
            p = b ? "distX" : "dist";
          b = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(d);
          if (this.kdTree) return g(a, this.kdTree, b, b);
        };
        e.prototype.pointPlacementToXValue = function () {
          var a = this.options,
            c = a.pointRange,
            b = this.xAxis;
          a = a.pointPlacement;
          "between" === a && (a = b.reversed ? -0.5 : 0.5);
          return v(a) ? a * (c || b.pointRange) : 0;
        };
        e.prototype.isPointInside = function (a) {
          return (
            "undefined" !== typeof a.plotY &&
            "undefined" !== typeof a.plotX &&
            0 <= a.plotY &&
            a.plotY <= this.yAxis.len &&
            0 <= a.plotX &&
            a.plotX <= this.xAxis.len
          );
        };
        e.prototype.drawTracker = function () {
          var a = this,
            c = a.options,
            d = c.trackByArea,
            g = [].concat(d ? a.areaPath : a.graphPath),
            k = a.chart,
            n = k.pointer,
            p = k.renderer,
            l = k.options.tooltip.snap,
            r = a.tracker,
            v = function (c) {
              if (k.hoverSeries !== a) a.onMouseOver();
            },
            m = "rgba(192,192,192," + (b ? 0.0001 : 0.002) + ")";
          r
            ? r.attr({ d: g })
            : a.graph &&
              ((a.tracker = p
                .path(g)
                .attr({ visibility: a.visible ? "visible" : "hidden", zIndex: 2 })
                .addClass(d ? "highcharts-tracker-area" : "highcharts-tracker-line")
                .add(a.group)),
              k.styledMode ||
                a.tracker.attr({
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  stroke: m,
                  fill: d ? m : "none",
                  "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * l),
                }),
              [a.tracker, a.markerGroup, a.dataLabelsGroup].forEach(function (a) {
                if (
                  a &&
                  (a
                    .addClass("highcharts-tracker")
                    .on("mouseover", v)
                    .on("mouseout", function (a) {
                      n.onTrackerMouseOut(a);
                    }),
                  c.cursor && !k.styledMode && a.css({ cursor: c.cursor }),
                  f)
                )
                  a.on("touchstart", v);
              }));
          O(this, "afterDrawTracker");
        };
        e.prototype.addPoint = function (a, c, b, d, g) {
          var f = this.options,
            k = this.data,
            n = this.chart,
            p = this.xAxis;
          p = p && p.hasNames && p.names;
          var l = f.data,
            r = this.xData,
            v;
          c = H(c, !0);
          var m = { series: this };
          this.pointClass.prototype.applyOptions.apply(m, [a]);
          var q = m.x;
          var e = r.length;
          if (this.requireSorting && q < r[e - 1]) for (v = !0; e && r[e - 1] > q; ) e--;
          this.updateParallelArrays(m, "splice", e, 0, 0);
          this.updateParallelArrays(m, e);
          p && m.name && (p[q] = m.name);
          l.splice(e, 0, a);
          v && (this.data.splice(e, 0, null), this.processData());
          "point" === f.legendType && this.generatePoints();
          b &&
            (k[0] && k[0].remove
              ? k[0].remove(!1)
              : (k.shift(), this.updateParallelArrays(m, "shift"), l.shift()));
          !1 !== g && O(this, "addPoint", { point: m });
          this.isDirtyData = this.isDirty = !0;
          c && n.redraw(d);
        };
        e.prototype.removePoint = function (a, c, b) {
          var d = this,
            g = d.data,
            f = g[a],
            k = d.points,
            n = d.chart,
            p = function () {
              k && k.length === g.length && k.splice(a, 1);
              g.splice(a, 1);
              d.options.data.splice(a, 1);
              d.updateParallelArrays(f || { series: d }, "splice", a, 1);
              f && f.destroy();
              d.isDirty = !0;
              d.isDirtyData = !0;
              c && n.redraw();
            };
          m(b, n);
          c = H(c, !0);
          f ? f.firePointEvent("remove", null, p) : p();
        };
        e.prototype.remove = function (a, c, b, d) {
          function g() {
            f.destroy(d);
            k.isDirtyLegend = k.isDirtyBox = !0;
            k.linkSeries();
            H(a, !0) && k.redraw(c);
          }
          var f = this,
            k = f.chart;
          !1 !== b ? O(f, "remove", null, g) : g();
        };
        e.prototype.update = function (c, b) {
          c = n(c, this.userOptions);
          O(this, "update", { options: c });
          var d = this,
            g = d.chart,
            f = d.userOptions,
            k = d.initialType || d.type,
            p = g.options.plotOptions,
            r = c.type || f.type || g.options.chart.type,
            v = !(
              this.hasDerivedData ||
              (r && r !== this.type) ||
              "undefined" !== typeof c.pointStart ||
              "undefined" !== typeof c.pointInterval ||
              d.hasOptionChanged("dataGrouping") ||
              d.hasOptionChanged("pointStart") ||
              d.hasOptionChanged("pointInterval") ||
              d.hasOptionChanged("pointIntervalUnit") ||
              d.hasOptionChanged("keys")
            ),
            m = l[k].prototype,
            e,
            q = ["eventOptions", "navigatorSeries", "baseSeries"],
            w = d.finishedAnimating && { animation: !1 },
            h = {};
          r = r || k;
          v &&
            (q.push(
              "data",
              "isDirtyData",
              "points",
              "processedXData",
              "processedYData",
              "xIncrement",
              "cropped",
              "_hasPointMarkers",
              "_hasPointLabels",
              "clips",
              "nodes",
              "layout",
              "mapMap",
              "mapData",
              "minY",
              "maxY",
              "minX",
              "maxX"
            ),
            !1 !== c.visible && q.push("area", "graph"),
            d.parallelArrays.forEach(function (a) {
              q.push(a + "Data");
            }),
            c.data &&
              (c.dataSorting && B(d.options.dataSorting, c.dataSorting), this.setData(c.data, !1)));
          c = K(
            f,
            w,
            {
              index: "undefined" === typeof f.index ? d.index : f.index,
              pointStart: H(p && p.series && p.series.pointStart, f.pointStart, d.xData[0]),
            },
            !v && { data: d.options.data },
            c
          );
          v && c.data && (c.data = d.options.data);
          q = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(q);
          q.forEach(function (a) {
            q[a] = d[a];
            delete d[a];
          });
          f = !1;
          if (l[r]) {
            if (((f = r !== d.type), d.remove(!1, !1, !1, !0), f))
              if (Object.setPrototypeOf) Object.setPrototypeOf(d, l[r].prototype);
              else {
                p = Object.hasOwnProperty.call(d, "hcEvents") && d.hcEvents;
                for (e in m) d[e] = void 0;
                B(d, l[r].prototype);
                p ? (d.hcEvents = p) : delete d.hcEvents;
              }
          } else a(17, !0, g, { missingModuleFor: r });
          q.forEach(function (a) {
            d[a] = q[a];
          });
          d.init(g, c);
          if (v && this.points) {
            var u = d.options;
            !1 === u.visible
              ? ((h.graphic = 1), (h.dataLabel = 1))
              : d._hasPointLabels ||
                ((c = u.marker),
                (r = u.dataLabels),
                c && (!1 === c.enabled || "symbol" in c) && (h.graphic = 1),
                r && !1 === r.enabled && (h.dataLabel = 1));
            this.points.forEach(function (a) {
              a &&
                a.series &&
                (a.resolveColor(),
                Object.keys(h).length && a.destroyElements(h),
                !1 === u.showInLegend && a.legendItem && g.legend.destroyItem(a));
            }, this);
          }
          d.initialType = k;
          g.linkSeries();
          f && d.linkedSeries.length && (d.isDirtyData = !0);
          O(this, "afterUpdate");
          H(b, !0) && g.redraw(v ? void 0 : !1);
        };
        e.prototype.setName = function (a) {
          this.name = this.options.name = this.userOptions.name = a;
          this.chart.isDirtyLegend = !0;
        };
        e.prototype.hasOptionChanged = function (a) {
          var c = this.options[a],
            b = this.chart.options.plotOptions,
            d = this.userOptions[a];
          return d
            ? c !== d
            : c !== H(b && b[this.type] && b[this.type][a], b && b.series && b.series[a], c);
        };
        e.prototype.onMouseOver = function () {
          var a = this.chart,
            c = a.hoverSeries;
          a.pointer.setHoverChartIndex();
          if (c && c !== this) c.onMouseOut();
          this.options.events.mouseOver && O(this, "mouseOver");
          this.setState("hover");
          a.hoverSeries = this;
        };
        e.prototype.onMouseOut = function () {
          var a = this.options,
            c = this.chart,
            b = c.tooltip,
            d = c.hoverPoint;
          c.hoverSeries = null;
          if (d) d.onMouseOut();
          this && a.events.mouseOut && O(this, "mouseOut");
          !b || this.stickyTracking || (b.shared && !this.noSharedTooltip) || b.hide();
          c.series.forEach(function (a) {
            a.setState("", !0);
          });
        };
        e.prototype.setState = function (a, c) {
          var b = this,
            d = b.options,
            g = b.graph,
            f = d.inactiveOtherPoints,
            k = d.states,
            n = d.lineWidth,
            p = d.opacity,
            l = H(k[a || "normal"] && k[a || "normal"].animation, b.chart.options.chart.animation);
          d = 0;
          a = a || "";
          if (
            b.state !== a &&
            ([b.group, b.markerGroup, b.dataLabelsGroup].forEach(function (c) {
              c &&
                (b.state && c.removeClass("highcharts-series-" + b.state),
                a && c.addClass("highcharts-series-" + a));
            }),
            (b.state = a),
            !b.chart.styledMode)
          ) {
            if (k[a] && !1 === k[a].enabled) return;
            a && ((n = k[a].lineWidth || n + (k[a].lineWidthPlus || 0)), (p = H(k[a].opacity, p)));
            if (g && !g.dashstyle)
              for (k = { "stroke-width": n }, g.animate(k, l); b["zone-graph-" + d]; )
                b["zone-graph-" + d].animate(k, l), (d += 1);
            f ||
              [b.group, b.markerGroup, b.dataLabelsGroup, b.labelBySeries].forEach(function (a) {
                a && a.animate({ opacity: p }, l);
              });
          }
          c && f && b.points && b.setAllPointsToState(a || void 0);
        };
        e.prototype.setAllPointsToState = function (a) {
          this.points.forEach(function (c) {
            c.setState && c.setState(a);
          });
        };
        e.prototype.setVisible = function (a, c) {
          var b = this,
            d = b.chart,
            g = b.legendItem,
            f = d.options.chart.ignoreHiddenSeries,
            k = b.visible;
          var n = (b.visible = a = b.options.visible = b.userOptions.visible =
            "undefined" === typeof a ? !k : a)
            ? "show"
            : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
            if (b[a]) b[a][n]();
          });
          if (d.hoverSeries === b || (d.hoverPoint && d.hoverPoint.series) === b) b.onMouseOut();
          g && d.legend.colorizeItem(b, a);
          b.isDirty = !0;
          b.options.stacking &&
            d.series.forEach(function (a) {
              a.options.stacking && a.visible && (a.isDirty = !0);
            });
          b.linkedSeries.forEach(function (c) {
            c.setVisible(a, !1);
          });
          f && (d.isDirtyBox = !0);
          O(b, n);
          !1 !== c && d.redraw();
        };
        e.prototype.show = function () {
          this.setVisible(!0);
        };
        e.prototype.hide = function () {
          this.setVisible(!1);
        };
        e.prototype.select = function (a) {
          this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
          this.checkbox && (this.checkbox.checked = a);
          O(this, a ? "select" : "unselect");
        };
        e.prototype.shouldShowTooltip = function (a, c, b) {
          void 0 === b && (b = {});
          b.series = this;
          b.visiblePlotOnly = !0;
          return this.chart.isInsidePlot(a, c, b);
        };
        e.defaultOptions = {
          lineWidth: 2,
          allowPointSelect: !1,
          crisp: !0,
          showCheckbox: !1,
          animation: { duration: 1e3 },
          events: {},
          marker: {
            enabledThreshold: 2,
            lineColor: F.backgroundColor,
            lineWidth: 0,
            radius: 4,
            states: {
              normal: { animation: !0 },
              hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 },
              select: { fillColor: F.neutralColor20, lineColor: F.neutralColor100, lineWidth: 2 },
            },
          },
          point: { events: {} },
          dataLabels: {
            animation: {},
            align: "center",
            defer: !0,
            formatter: function () {
              var a = this.series.chart.numberFormatter;
              return "number" !== typeof this.y ? "" : a(this.y, -1);
            },
            padding: 5,
            style: {
              fontSize: "11px",
              fontWeight: "bold",
              color: "contrast",
              textOutline: "1px contrast",
            },
            verticalAlign: "bottom",
            x: 0,
            y: 0,
          },
          cropThreshold: 300,
          opacity: 1,
          pointRange: 0,
          softThreshold: !0,
          states: {
            normal: { animation: !0 },
            hover: {
              animation: { duration: 50 },
              lineWidthPlus: 1,
              marker: {},
              halo: { size: 10, opacity: 0.25 },
            },
            select: { animation: { duration: 0 } },
            inactive: { animation: { duration: 50 }, opacity: 0.2 },
          },
          stickyTracking: !0,
          turboThreshold: 1e3,
          findNearestPointBy: "x",
        };
        return e;
      })();
      B(e.prototype, {
        axisTypes: ["xAxis", "yAxis"],
        coll: "series",
        colorCounter: 0,
        cropShoulder: 1,
        directTouch: !1,
        drawLegendSymbol: D.drawLineMarker,
        isCartesian: !0,
        kdAxisArray: ["clientX", "plotY"],
        parallelArrays: ["x", "y"],
        pointClass: E,
        requireSorting: !0,
        sorted: !0,
      });
      C.series = e;
      ("");
      ("");
      return e;
    }
  );
  P(
    e,
    "Extensions/ScrollablePlotArea.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Axis/Axis.js"],
      e["Core/Chart/Chart.js"],
      e["Core/Series/Series.js"],
      e["Core/Globals.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E) {
      var C = e.stop,
        G = E.addEvent,
        t = E.createElement,
        z = E.merge,
        m = E.pick;
      ("");
      G(D, "afterSetChartSize", function (f) {
        var b = this.options.chart.scrollablePlotArea,
          m = b && b.minWidth;
        b = b && b.minHeight;
        if (!this.renderer.forExport) {
          if (m) {
            if ((this.scrollablePixelsX = m = Math.max(0, m - this.chartWidth))) {
              this.scrollablePlotBox = this.renderer.scrollablePlotBox = z(this.plotBox);
              this.plotBox.width = this.plotWidth += m;
              this.inverted ? (this.clipBox.height += m) : (this.clipBox.width += m);
              var e = { 1: { name: "right", value: m } };
            }
          } else
            b &&
              (this.scrollablePixelsY = m = Math.max(0, b - this.chartHeight)) &&
              ((this.scrollablePlotBox = this.renderer.scrollablePlotBox = z(this.plotBox)),
              (this.plotBox.height = this.plotHeight += m),
              this.inverted ? (this.clipBox.width += m) : (this.clipBox.height += m),
              (e = { 2: { name: "bottom", value: m } }));
          e &&
            !f.skipAxes &&
            this.axes.forEach(function (b) {
              e[b.side]
                ? (b.getPlotLinePath = function () {
                    var f = e[b.side].name,
                      k = this[f];
                    this[f] = k - e[b.side].value;
                    var d = F.Axis.prototype.getPlotLinePath.apply(this, arguments);
                    this[f] = k;
                    return d;
                  })
                : (b.setAxisSize(), b.setAxisTranslation());
            });
        }
      });
      G(D, "render", function () {
        this.scrollablePixelsX || this.scrollablePixelsY
          ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
          : this.fixedDiv && this.applyFixed();
      });
      D.prototype.setUpScrolling = function () {
        var f = this,
          b = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
        this.scrollablePixelsX && (b.overflowX = "auto");
        this.scrollablePixelsY && (b.overflowY = "auto");
        this.scrollingParent = t(
          "div",
          { className: "highcharts-scrolling-parent" },
          { position: "relative" },
          this.renderTo
        );
        this.scrollingContainer = t(
          "div",
          { className: "highcharts-scrolling" },
          b,
          this.scrollingParent
        );
        G(this.scrollingContainer, "scroll", function () {
          f.pointer && delete f.pointer.chartPosition;
        });
        this.innerContainer = t(
          "div",
          { className: "highcharts-inner-container" },
          null,
          this.scrollingContainer
        );
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      D.prototype.moveFixedElements = function () {
        var f = this.container,
          b = this.fixedRenderer,
          m = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
            " "
          ),
          e;
        this.scrollablePixelsX && !this.inverted
          ? (e = ".highcharts-yaxis")
          : this.scrollablePixelsX && this.inverted
          ? (e = ".highcharts-xaxis")
          : this.scrollablePixelsY && !this.inverted
          ? (e = ".highcharts-xaxis")
          : this.scrollablePixelsY && this.inverted && (e = ".highcharts-yaxis");
        e &&
          m.push(
            e + ":not(.highcharts-radial-axis)",
            e + "-labels:not(.highcharts-radial-axis-labels)"
          );
        m.forEach(function (l) {
          [].forEach.call(f.querySelectorAll(l), function (f) {
            (f.namespaceURI === b.SVG_NS ? b.box : b.box.parentNode).appendChild(f);
            f.style.pointerEvents = "auto";
          });
        });
      };
      D.prototype.applyFixed = function () {
        var f = !this.fixedDiv;
        var b = this.options.chart;
        var e = b.scrollablePlotArea;
        f
          ? ((this.fixedDiv = t(
              "div",
              { className: "highcharts-fixed" },
              {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: ((b.style && b.style.zIndex) || 0) + 2,
                top: 0,
              },
              null,
              !0
            )),
            this.scrollingContainer &&
              this.scrollingContainer.parentNode.insertBefore(
                this.fixedDiv,
                this.scrollingContainer
              ),
            (this.renderTo.style.overflow = "visible"),
            (this.fixedRenderer = b = new F.Renderer(
              this.fixedDiv,
              this.chartWidth,
              this.chartHeight,
              this.options.chart.style
            )),
            (this.scrollableMask = b
              .path()
              .attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": m(e.opacity, 0.85),
                zIndex: -1,
              })
              .addClass("highcharts-scrollable-mask")
              .add()),
            G(this, "afterShowResetZoom", this.moveFixedElements),
            G(this, "afterDrilldown", this.moveFixedElements),
            G(this, "afterLayOutTitles", this.moveFixedElements))
          : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        if (this.scrollableDirty || f) (this.scrollableDirty = !1), this.moveFixedElements();
        b = this.chartWidth + (this.scrollablePixelsX || 0);
        var h = this.chartHeight + (this.scrollablePixelsY || 0);
        C(this.container);
        this.container.style.width = b + "px";
        this.container.style.height = h + "px";
        this.renderer.boxWrapper.attr({ width: b, height: h, viewBox: [0, 0, b, h].join(" ") });
        this.chartBackground.attr({ width: b, height: h });
        this.scrollingContainer.style.height = this.chartHeight + "px";
        f &&
          (e.scrollPositionX &&
            (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * e.scrollPositionX),
          e.scrollPositionY &&
            (this.scrollingContainer.scrollTop = this.scrollablePixelsY * e.scrollPositionY));
        h = this.axisOffset;
        f = this.plotTop - h[0] - 1;
        e = this.plotLeft - h[3] - 1;
        b = this.plotTop + this.plotHeight + h[2] + 1;
        h = this.plotLeft + this.plotWidth + h[1] + 1;
        var l = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
          I = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        f = this.scrollablePixelsX
          ? [
              ["M", 0, f],
              ["L", this.plotLeft - 1, f],
              ["L", this.plotLeft - 1, b],
              ["L", 0, b],
              ["Z"],
              ["M", l, f],
              ["L", this.chartWidth, f],
              ["L", this.chartWidth, b],
              ["L", l, b],
              ["Z"],
            ]
          : this.scrollablePixelsY
          ? [
              ["M", e, 0],
              ["L", e, this.plotTop - 1],
              ["L", h, this.plotTop - 1],
              ["L", h, 0],
              ["Z"],
              ["M", e, I],
              ["L", e, this.chartHeight],
              ["L", h, this.chartHeight],
              ["L", h, I],
              ["Z"],
            ]
          : [["M", 0, 0]];
        "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: f });
      };
      G(h, "afterInit", function () {
        this.chart.scrollableDirty = !0;
      });
      G(y, "show", function () {
        this.chart.scrollableDirty = !0;
      });
    }
  );
  P(
    e,
    "Core/Axis/StackingAxis.js",
    [e["Core/Animation/AnimationUtilities.js"], e["Core/Utilities.js"]],
    function (e, h) {
      var D = e.getDeferredAnimation,
        y = h.addEvent,
        F = h.destroyObjectProperties,
        E = h.fireEvent,
        C = h.isNumber,
        G = h.objectEach,
        t = (function () {
          function e(m) {
            this.oldStacks = {};
            this.stacks = {};
            this.stacksTouched = 0;
            this.axis = m;
          }
          e.prototype.buildStacks = function () {
            var m = this.axis,
              f = m.series,
              b = m.options.reversedStacks,
              e = f.length,
              h;
            if (!m.isXAxis) {
              this.usePercentage = !1;
              for (h = e; h--; ) {
                var l = f[b ? h : e - h - 1];
                l.setStackedPoints();
                l.setGroupedPoints();
              }
              for (h = 0; h < e; h++) f[h].modifyStacks();
              E(m, "afterBuildStacks");
            }
          };
          e.prototype.cleanStacks = function () {
            if (!this.axis.isXAxis) {
              if (this.oldStacks) var m = (this.stacks = this.oldStacks);
              G(m, function (f) {
                G(f, function (b) {
                  b.cumulative = b.total;
                });
              });
            }
          };
          e.prototype.resetStacks = function () {
            var m = this,
              f = this.stacks;
            this.axis.isXAxis ||
              G(f, function (b) {
                G(b, function (f, e) {
                  C(f.touched) && f.touched < m.stacksTouched
                    ? (f.destroy(), delete b[e])
                    : ((f.total = null), (f.cumulative = null));
                });
              });
          };
          e.prototype.renderStackTotals = function () {
            var m = this.axis,
              f = m.chart,
              b = f.renderer,
              e = this.stacks;
            m = D(f, (m.options.stackLabels && m.options.stackLabels.animation) || !1);
            var h = (this.stackTotalGroup =
              this.stackTotalGroup ||
              b.g("stack-labels").attr({ visibility: "visible", zIndex: 6, opacity: 0 }).add());
            h.translate(f.plotLeft, f.plotTop);
            G(e, function (b) {
              G(b, function (b) {
                b.render(h);
              });
            });
            h.animate({ opacity: 1 }, m);
          };
          return e;
        })();
      return (function () {
        function e() {}
        e.compose = function (m) {
          y(m, "init", e.onInit);
          y(m, "destroy", e.onDestroy);
        };
        e.onDestroy = function () {
          var m = this.stacking;
          if (m) {
            var f = m.stacks;
            G(f, function (b, m) {
              F(b);
              f[m] = null;
            });
            m && m.stackTotalGroup && m.stackTotalGroup.destroy();
          }
        };
        e.onInit = function () {
          this.stacking || (this.stacking = new t(this));
        };
        return e;
      })();
    }
  );
  P(
    e,
    "Extensions/Stacking.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Chart/Chart.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Series/Series.js"],
      e["Core/Axis/StackingAxis.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E, C) {
      var G = D.format,
        t = C.correctFloat,
        z = C.defined,
        m = C.destroyObjectProperties,
        f = C.isArray,
        b = C.isNumber,
        A = C.objectEach,
        u = C.pick;
      ("");
      var l = (function () {
        function f(b, d, f, n, g) {
          var c = b.chart.inverted;
          this.axis = b;
          this.isNegative = f;
          this.options = d = d || {};
          this.x = n;
          this.total = null;
          this.points = {};
          this.hasValidPoints = !1;
          this.stack = g;
          this.rightCliff = this.leftCliff = 0;
          this.alignOptions = {
            align: d.align || (c ? (f ? "left" : "right") : "center"),
            verticalAlign: d.verticalAlign || (c ? "middle" : f ? "bottom" : "top"),
            y: d.y,
            x: d.x,
          };
          this.textAlign = d.textAlign || (c ? (f ? "right" : "left") : "center");
        }
        f.prototype.destroy = function () {
          m(this, this.axis);
        };
        f.prototype.render = function (b) {
          var d = this.axis.chart,
            f = this.options,
            k = f.format;
          k = k ? G(k, this, d) : f.formatter.call(this);
          this.label
            ? this.label.attr({ text: k, visibility: "hidden" })
            : ((this.label = d.renderer.label(
                k,
                null,
                null,
                f.shape,
                null,
                null,
                f.useHTML,
                !1,
                "stack-labels"
              )),
              (k = {
                r: f.borderRadius || 0,
                text: k,
                rotation: f.rotation,
                padding: u(f.padding, 5),
                visibility: "hidden",
              }),
              d.styledMode ||
                ((k.fill = f.backgroundColor),
                (k.stroke = f.borderColor),
                (k["stroke-width"] = f.borderWidth),
                this.label.css(f.style)),
              this.label.attr(k),
              this.label.added || this.label.add(b));
          this.label.labelrank = d.plotSizeY;
        };
        f.prototype.setOffset = function (f, d, l, n, g) {
          var c = this.axis,
            k = c.chart;
          n = c.translate(c.stacking.usePercentage ? 100 : n ? n : this.total, 0, 0, 0, 1);
          l = c.translate(l ? l : 0);
          l = z(n) && Math.abs(n - l);
          f = u(g, k.xAxis[0].translate(this.x)) + f;
          c = z(n) && this.getStackBox(k, this, f, n, d, l, c);
          d = this.label;
          l = this.isNegative;
          f = "justify" === u(this.options.overflow, "justify");
          var a = this.textAlign;
          d &&
            c &&
            ((g = d.getBBox()),
            (n = d.padding),
            (a =
              "left" === a
                ? k.inverted
                  ? -n
                  : n
                : "right" === a
                ? g.width
                : k.inverted && "center" === a
                ? g.width / 2
                : k.inverted
                ? l
                  ? g.width + n
                  : -n
                : g.width / 2),
            (l = k.inverted ? g.height / 2 : l ? -n : g.height),
            (this.alignOptions.x = u(this.options.x, 0)),
            (this.alignOptions.y = u(this.options.y, 0)),
            (c.x -= a),
            (c.y -= l),
            d.align(this.alignOptions, null, c),
            k.isInsidePlot(
              d.alignAttr.x + a - this.alignOptions.x,
              d.alignAttr.y + l - this.alignOptions.y
            )
              ? d.show()
              : ((d.alignAttr.y = -9999), (f = !1)),
            f &&
              F.prototype.justifyDataLabel.call(this.axis, d, this.alignOptions, d.alignAttr, g, c),
            d.attr({ x: d.alignAttr.x, y: d.alignAttr.y }),
            u(!f && this.options.crop, !0) &&
              ((k =
                b(d.x) &&
                b(d.y) &&
                k.isInsidePlot(d.x - n + d.width, d.y) &&
                k.isInsidePlot(d.x + n, d.y)) ||
                d.hide()));
        };
        f.prototype.getStackBox = function (b, d, f, n, g, c, l) {
          var a = d.axis.reversed,
            k = b.inverted,
            m = l.height + l.pos - (k ? b.plotLeft : b.plotTop);
          d = (d.isNegative && !a) || (!d.isNegative && a);
          return {
            x: k
              ? d
                ? n - l.right
                : n - c + l.pos - b.plotLeft
              : f + b.xAxis[0].transB - b.plotLeft,
            y: k ? l.height - f - g : d ? m - n - c : m - n,
            width: k ? c : g,
            height: k ? g : c,
          };
        };
        return f;
      })();
      h.prototype.getStacks = function () {
        var b = this,
          f = b.inverted;
        b.yAxis.forEach(function (b) {
          b.stacking &&
            b.stacking.stacks &&
            b.hasVisibleSeries &&
            (b.stacking.oldStacks = b.stacking.stacks);
        });
        b.series.forEach(function (d) {
          var k = (d.xAxis && d.xAxis.options) || {};
          !d.options.stacking ||
            (!0 !== d.visible && !1 !== b.options.chart.ignoreHiddenSeries) ||
            (d.stackKey = [
              d.type,
              u(d.options.stack, ""),
              f ? k.top : k.left,
              f ? k.height : k.width,
            ].join());
        });
      };
      E.compose(e);
      F.prototype.setGroupedPoints = function () {
        var b = this.yAxis.stacking;
        this.options.centerInCategory &&
        (this.is("column") || this.is("columnrange")) &&
        !this.options.stacking &&
        1 < this.chart.series.length
          ? F.prototype.setStackedPoints.call(this, "group")
          : b &&
            A(b.stacks, function (f, d) {
              "group" === d.slice(-5) &&
                (A(f, function (b) {
                  return b.destroy();
                }),
                delete b.stacks[d]);
            });
      };
      F.prototype.setStackedPoints = function (b) {
        var k = b || this.options.stacking;
        if (k && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
          var d = this.processedXData,
            m = this.processedYData,
            n = [],
            g = m.length,
            c = this.options,
            e = c.threshold,
            a = u(c.startFromThreshold && e, 0);
          c = c.stack;
          b = b ? this.type + "," + k : this.stackKey;
          var h = "-" + b,
            A = this.negStacks,
            I = this.yAxis,
            p = I.stacking.stacks,
            r = I.stacking.oldStacks,
            M,
            v;
          I.stacking.stacksTouched += 1;
          for (v = 0; v < g; v++) {
            var N = d[v];
            var K = m[v];
            var L = this.getStackIndicator(L, N, this.index);
            var H = L.key;
            var x = (M = A && K < (a ? 0 : e)) ? h : b;
            p[x] || (p[x] = {});
            p[x][N] ||
              (r[x] && r[x][N]
                ? ((p[x][N] = r[x][N]), (p[x][N].total = null))
                : (p[x][N] = new l(I, I.options.stackLabels, M, N, c)));
            x = p[x][N];
            null !== K
              ? ((x.points[H] = x.points[this.index] = [u(x.cumulative, a)]),
                z(x.cumulative) || (x.base = H),
                (x.touched = I.stacking.stacksTouched),
                0 < L.index &&
                  !1 === this.singleStacks &&
                  (x.points[H][0] = x.points[this.index + "," + N + ",0"][0]))
              : (x.points[H] = x.points[this.index] = null);
            "percent" === k
              ? ((M = M ? b : h),
                A && p[M] && p[M][N]
                  ? ((M = p[M][N]),
                    (x.total = M.total = Math.max(M.total, x.total) + Math.abs(K) || 0))
                  : (x.total = t(x.total + (Math.abs(K) || 0))))
              : "group" === k
              ? (f(K) && (K = K[0]), null !== K && (x.total = (x.total || 0) + 1))
              : (x.total = t(x.total + (K || 0)));
            x.cumulative = "group" === k ? (x.total || 1) - 1 : u(x.cumulative, a) + (K || 0);
            null !== K &&
              (x.points[H].push(x.cumulative), (n[v] = x.cumulative), (x.hasValidPoints = !0));
          }
          "percent" === k && (I.stacking.usePercentage = !0);
          "group" !== k && (this.stackedYData = n);
          I.stacking.oldStacks = {};
        }
      };
      F.prototype.modifyStacks = function () {
        var b = this,
          f = b.stackKey,
          d = b.yAxis.stacking.stacks,
          l = b.processedXData,
          n,
          g = b.options.stacking;
        b[g + "Stacker"] &&
          [f, "-" + f].forEach(function (c) {
            for (var f = l.length, a, k; f--; )
              if (
                ((a = l[f]),
                (n = b.getStackIndicator(n, a, b.index, c)),
                (k = (a = d[c] && d[c][a]) && a.points[n.key]))
              )
                b[g + "Stacker"](k, a, f);
          });
      };
      F.prototype.percentStacker = function (b, f, d) {
        f = f.total ? 100 / f.total : 0;
        b[0] = t(b[0] * f);
        b[1] = t(b[1] * f);
        this.stackedYData[d] = b[1];
      };
      F.prototype.getStackIndicator = function (b, f, d, l) {
        !z(b) || b.x !== f || (l && b.key !== l) ? (b = { x: f, index: 0, key: l }) : b.index++;
        b.key = [d, f, b.index].join();
        return b;
      };
      y.StackItem = l;
      return y.StackItem;
    }
  );
  P(
    e,
    "Series/Line/LineSeries.js",
    [
      e["Core/Color/Palette.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y) {
      var F =
          (this && this.__extends) ||
          (function () {
            var e = function (h, z) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (m, f) {
                    m.__proto__ = f;
                  }) ||
                function (m, f) {
                  for (var b in f) f.hasOwnProperty(b) && (m[b] = f[b]);
                };
              return e(h, z);
            };
            return function (h, z) {
              function m() {
                this.constructor = h;
              }
              e(h, z);
              h.prototype = null === z ? Object.create(z) : ((m.prototype = z.prototype), new m());
            };
          })(),
        E = y.defined,
        C = y.merge;
      y = (function (G) {
        function t() {
          var e = (null !== G && G.apply(this, arguments)) || this;
          e.data = void 0;
          e.options = void 0;
          e.points = void 0;
          return e;
        }
        F(t, G);
        t.prototype.drawGraph = function () {
          var h = this,
            m = this.options,
            f = (this.gappedPath || this.getGraphPath).call(this),
            b = this.chart.styledMode,
            t = [["graph", "highcharts-graph"]];
          b || t[0].push(m.lineColor || this.color || e.neutralColor20, m.dashStyle);
          t = h.getZonesGraphs(t);
          t.forEach(function (e, l) {
            var u = e[0],
              k = h[u],
              d = k ? "animate" : "attr";
            k
              ? ((k.endX = h.preventGraphAnimation ? null : f.xMap), k.animate({ d: f }))
              : f.length &&
                (h[u] = k = h.chart.renderer
                  .path(f)
                  .addClass(e[1])
                  .attr({ zIndex: 1 })
                  .add(h.group));
            k &&
              !b &&
              ((u = {
                stroke: e[2],
                "stroke-width": m.lineWidth,
                fill: (h.fillGraph && h.color) || "none",
              }),
              e[3]
                ? (u.dashstyle = e[3])
                : "square" !== m.linecap && (u["stroke-linecap"] = u["stroke-linejoin"] = "round"),
              k[d](u).shadow(2 > l && m.shadow));
            k && ((k.startX = f.xMap), (k.isArea = f.isArea));
          });
        };
        t.prototype.getGraphPath = function (e, m, f) {
          var b = this,
            h = b.options,
            u = h.step,
            l,
            t = [],
            k = [],
            d;
          e = e || b.points;
          (l = e.reversed) && e.reverse();
          (u = { right: 1, center: 2 }[u] || (u && 3)) && l && (u = 4 - u);
          e = this.getValidPoints(e, !1, !(h.connectNulls && !m && !f));
          e.forEach(function (l, n) {
            var g = l.plotX,
              c = l.plotY,
              q = e[n - 1];
            (l.leftCliff || (q && q.rightCliff)) && !f && (d = !0);
            l.isNull && !E(m) && 0 < n
              ? (d = !h.connectNulls)
              : l.isNull && !m
              ? (d = !0)
              : (0 === n || d
                  ? (n = [["M", l.plotX, l.plotY]])
                  : b.getPointSpline
                  ? (n = [b.getPointSpline(e, l, n)])
                  : u
                  ? ((n =
                      1 === u
                        ? [["L", q.plotX, c]]
                        : 2 === u
                        ? [
                            ["L", (q.plotX + g) / 2, q.plotY],
                            ["L", (q.plotX + g) / 2, c],
                          ]
                        : [["L", g, q.plotY]]),
                    n.push(["L", g, c]))
                  : (n = [["L", g, c]]),
                k.push(l.x),
                u && (k.push(l.x), 2 === u && k.push(l.x)),
                t.push.apply(t, n),
                (d = !1));
          });
          t.xMap = k;
          return (b.graphPath = t);
        };
        t.prototype.getZonesGraphs = function (e) {
          this.zones.forEach(function (m, f) {
            f = [
              "zone-graph-" + f,
              "highcharts-graph highcharts-zone-graph-" + f + " " + (m.className || ""),
            ];
            this.chart.styledMode ||
              f.push(m.color || this.color, m.dashStyle || this.options.dashStyle);
            e.push(f);
          }, this);
          return e;
        };
        t.defaultOptions = C(h.defaultOptions, {});
        return t;
      })(h);
      D.registerSeriesType("line", y);
      ("");
      return y;
    }
  );
  P(
    e,
    "Series/Area/AreaSeries.js",
    [
      e["Core/Color/Color.js"],
      e["Mixins/LegendSymbol.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y) {
      var F =
          (this && this.__extends) ||
          (function () {
            var e = function (f, b) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, f) {
                    b.__proto__ = f;
                  }) ||
                function (b, f) {
                  for (var l in f) f.hasOwnProperty(l) && (b[l] = f[l]);
                };
              return e(f, b);
            };
            return function (f, b) {
              function m() {
                this.constructor = f;
              }
              e(f, b);
              f.prototype = null === b ? Object.create(b) : ((m.prototype = b.prototype), new m());
            };
          })(),
        E = e.parse,
        C = D.seriesTypes.line;
      e = y.extend;
      var G = y.merge,
        t = y.objectEach,
        z = y.pick;
      y = (function (e) {
        function f() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        F(f, e);
        f.prototype.drawGraph = function () {
          this.areaPath = [];
          e.prototype.drawGraph.apply(this);
          var b = this,
            f = this.areaPath,
            m = this.options,
            l = [["area", "highcharts-area", this.color, m.fillColor]];
          this.zones.forEach(function (f, k) {
            l.push([
              "zone-area-" + k,
              "highcharts-area highcharts-zone-area-" + k + " " + f.className,
              f.color || b.color,
              f.fillColor || m.fillColor,
            ]);
          });
          l.forEach(function (l) {
            var k = l[0],
              d = b[k],
              e = d ? "animate" : "attr",
              n = {};
            d
              ? ((d.endX = b.preventGraphAnimation ? null : f.xMap), d.animate({ d: f }))
              : ((n.zIndex = 0),
                (d = b[k] = b.chart.renderer.path(f).addClass(l[1]).add(b.group)),
                (d.isArea = !0));
            b.chart.styledMode ||
              (n.fill = z(l[3], E(l[2]).setOpacity(z(m.fillOpacity, 0.75)).get()));
            d[e](n);
            d.startX = f.xMap;
            d.shiftUnit = m.step ? 2 : 1;
          });
        };
        f.prototype.getGraphPath = function (b) {
          var f = C.prototype.getGraphPath,
            e = this.options,
            l = e.stacking,
            m = this.yAxis,
            k,
            d = [],
            h = [],
            n = this.index,
            g = m.stacking.stacks[this.stackKey],
            c = e.threshold,
            q = Math.round(m.getThreshold(e.threshold));
          e = z(e.connectNulls, "percent" === l);
          var a = function (a, f, k) {
            var p = b[a];
            a = l && g[p.x].points[n];
            var e = p[k + "Null"] || 0;
            k = p[k + "Cliff"] || 0;
            p = !0;
            if (k || e) {
              var r = (e ? a[0] : a[1]) + k;
              var w = a[0] + k;
              p = !!e;
            } else !l && b[f] && b[f].isNull && (r = w = c);
            "undefined" !== typeof r &&
              (h.push({
                plotX: t,
                plotY: null === r ? q : m.getThreshold(r),
                isNull: p,
                isCliff: !0,
              }),
              d.push({ plotX: t, plotY: null === w ? q : m.getThreshold(w), doCurve: !1 }));
          };
          b = b || this.points;
          l && (b = this.getStackPoints(b));
          for (k = 0; k < b.length; k++) {
            l || (b[k].leftCliff = b[k].rightCliff = b[k].leftNull = b[k].rightNull = void 0);
            var B = b[k].isNull;
            var t = z(b[k].rectPlotX, b[k].plotX);
            var G = l ? z(b[k].yBottom, q) : q;
            if (!B || e)
              e || a(k, k - 1, "left"),
                (B && !l && e) || (h.push(b[k]), d.push({ x: k, plotX: t, plotY: G })),
                e || a(k, k + 1, "right");
          }
          k = f.call(this, h, !0, !0);
          d.reversed = !0;
          B = f.call(this, d, !0, !0);
          (G = B[0]) && "M" === G[0] && (B[0] = ["L", G[1], G[2]]);
          B = k.concat(B);
          B.length && B.push(["Z"]);
          f = f.call(this, h, !1, e);
          B.xMap = k.xMap;
          this.areaPath = B;
          return f;
        };
        f.prototype.getStackPoints = function (b) {
          var f = this,
            e = [],
            l = [],
            m = this.xAxis,
            k = this.yAxis,
            d = k.stacking.stacks[this.stackKey],
            h = {},
            n = k.series,
            g = n.length,
            c = k.options.reversedStacks ? 1 : -1,
            q = n.indexOf(f);
          b = b || this.points;
          if (this.options.stacking) {
            for (var a = 0; a < b.length; a++)
              (b[a].leftNull = b[a].rightNull = void 0), (h[b[a].x] = b[a]);
            t(d, function (a, c) {
              null !== a.total && l.push(c);
            });
            l.sort(function (a, c) {
              return a - c;
            });
            var B = n.map(function (a) {
              return a.visible;
            });
            l.forEach(function (a, b) {
              var p = 0,
                r,
                w;
              if (h[a] && !h[a].isNull)
                e.push(h[a]),
                  [-1, 1].forEach(function (k) {
                    var p = 1 === k ? "rightNull" : "leftNull",
                      e = 0,
                      v = d[l[b + k]];
                    if (v)
                      for (var m = q; 0 <= m && m < g; ) {
                        var N = n[m].index;
                        r = v.points[N];
                        r ||
                          (N === f.index
                            ? (h[a][p] = !0)
                            : B[m] && (w = d[a].points[N]) && (e -= w[1] - w[0]));
                        m += c;
                      }
                    h[a][1 === k ? "rightCliff" : "leftCliff"] = e;
                  });
              else {
                for (var v = q; 0 <= v && v < g; ) {
                  if ((r = d[a].points[n[v].index])) {
                    p = r[1];
                    break;
                  }
                  v += c;
                }
                p = z(p, 0);
                p = k.translate(p, 0, 1, 0, 1);
                e.push({
                  isNull: !0,
                  plotX: m.translate(a, 0, 0, 0, 1),
                  x: a,
                  plotY: p,
                  yBottom: p,
                });
              }
            });
          }
          return e;
        };
        f.defaultOptions = G(C.defaultOptions, { threshold: 0 });
        return f;
      })(C);
      e(y.prototype, { singleStacks: !1, drawLegendSymbol: h.drawRectangle });
      D.registerSeriesType("area", y);
      ("");
      return y;
    }
  );
  P(
    e,
    "Series/Spline/SplineSeries.js",
    [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (e, h) {
      var D =
          (this && this.__extends) ||
          (function () {
            var e = function (h, t) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, m) {
                    e.__proto__ = m;
                  }) ||
                function (e, m) {
                  for (var f in m) m.hasOwnProperty(f) && (e[f] = m[f]);
                };
              return e(h, t);
            };
            return function (h, t) {
              function z() {
                this.constructor = h;
              }
              e(h, t);
              h.prototype = null === t ? Object.create(t) : ((z.prototype = t.prototype), new z());
            };
          })(),
        y = e.seriesTypes.line,
        F = h.merge,
        E = h.pick;
      h = (function (e) {
        function h() {
          var h = (null !== e && e.apply(this, arguments)) || this;
          h.data = void 0;
          h.options = void 0;
          h.points = void 0;
          return h;
        }
        D(h, e);
        h.prototype.getPointSpline = function (e, h, m) {
          var f = h.plotX || 0,
            b = h.plotY || 0,
            t = e[m - 1];
          m = e[m + 1];
          if (
            t &&
            !t.isNull &&
            !1 !== t.doCurve &&
            !h.isCliff &&
            m &&
            !m.isNull &&
            !1 !== m.doCurve &&
            !h.isCliff
          ) {
            e = t.plotY || 0;
            var u = m.plotX || 0;
            m = m.plotY || 0;
            var l = 0;
            var z = (1.5 * f + (t.plotX || 0)) / 2.5;
            var k = (1.5 * b + e) / 2.5;
            u = (1.5 * f + u) / 2.5;
            var d = (1.5 * b + m) / 2.5;
            u !== z && (l = ((d - k) * (u - f)) / (u - z) + b - d);
            k += l;
            d += l;
            k > e && k > b
              ? ((k = Math.max(e, b)), (d = 2 * b - k))
              : k < e && k < b && ((k = Math.min(e, b)), (d = 2 * b - k));
            d > m && d > b
              ? ((d = Math.max(m, b)), (k = 2 * b - d))
              : d < m && d < b && ((d = Math.min(m, b)), (k = 2 * b - d));
            h.rightContX = u;
            h.rightContY = d;
          }
          h = [
            "C",
            E(t.rightContX, t.plotX, 0),
            E(t.rightContY, t.plotY, 0),
            E(z, f, 0),
            E(k, b, 0),
            f,
            b,
          ];
          t.rightContX = t.rightContY = void 0;
          return h;
        };
        h.defaultOptions = F(y.defaultOptions);
        return h;
      })(y);
      e.registerSeriesType("spline", h);
      ("");
      return h;
    }
  );
  P(
    e,
    "Series/AreaSpline/AreaSplineSeries.js",
    [
      e["Series/Area/AreaSeries.js"],
      e["Series/Spline/SplineSeries.js"],
      e["Mixins/LegendSymbol.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F) {
      var E =
          (this && this.__extends) ||
          (function () {
            var e = function (m, f) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, f) {
                    b.__proto__ = f;
                  }) ||
                function (b, f) {
                  for (var e in f) f.hasOwnProperty(e) && (b[e] = f[e]);
                };
              return e(m, f);
            };
            return function (m, f) {
              function b() {
                this.constructor = m;
              }
              e(m, f);
              m.prototype = null === f ? Object.create(f) : ((b.prototype = f.prototype), new b());
            };
          })(),
        C = e.prototype,
        G = F.extend,
        t = F.merge;
      F = (function (z) {
        function m() {
          var f = (null !== z && z.apply(this, arguments)) || this;
          f.data = void 0;
          f.points = void 0;
          f.options = void 0;
          return f;
        }
        E(m, z);
        m.defaultOptions = t(h.defaultOptions, e.defaultOptions);
        return m;
      })(h);
      G(F.prototype, {
        getGraphPath: C.getGraphPath,
        getStackPoints: C.getStackPoints,
        drawGraph: C.drawGraph,
        drawLegendSymbol: D.drawRectangle,
      });
      y.registerSeriesType("areaspline", F);
      ("");
      return F;
    }
  );
  P(
    e,
    "Series/Column/ColumnSeries.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Mixins/LegendSymbol.js"],
      e["Core/Color/Palette.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E, C, G) {
      var t =
          (this && this.__extends) ||
          (function () {
            var c = function (b, a) {
              c =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
                };
              return c(b, a);
            };
            return function (b, a) {
              function d() {
                this.constructor = b;
              }
              c(b, a);
              b.prototype = null === a ? Object.create(a) : ((d.prototype = a.prototype), new d());
            };
          })(),
        z = e.animObject,
        m = h.parse,
        f = D.hasTouch;
      e = D.noop;
      var b = G.clamp,
        A = G.css,
        u = G.defined,
        l = G.extend,
        I = G.fireEvent,
        k = G.isArray,
        d = G.isNumber,
        w = G.merge,
        n = G.pick,
        g = G.objectEach;
      G = (function (c) {
        function e() {
          var a = (null !== c && c.apply(this, arguments)) || this;
          a.borderWidth = void 0;
          a.data = void 0;
          a.group = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        t(e, c);
        e.prototype.animate = function (a) {
          var c = this,
            d = this.yAxis,
            g = c.options,
            f = this.chart.inverted,
            k = {},
            n = f ? "translateX" : "translateY";
          if (a)
            (k.scaleY = 0.001),
              (a = b(d.toPixels(g.threshold), d.pos, d.pos + d.len)),
              f ? (k.translateX = a - d.len) : (k.translateY = a),
              c.clipBox && c.setClip(),
              c.group.attr(k);
          else {
            var e = Number(c.group.attr(n));
            c.group.animate(
              { scaleY: 1 },
              l(z(c.options.animation), {
                step: function (a, b) {
                  c.group && ((k[n] = e + b.pos * (d.pos - e)), c.group.attr(k));
                },
              })
            );
          }
        };
        e.prototype.init = function (a, b) {
          c.prototype.init.apply(this, arguments);
          var d = this;
          a = d.chart;
          a.hasRendered &&
            a.series.forEach(function (a) {
              a.type === d.type && (a.isDirty = !0);
            });
        };
        e.prototype.getColumnMetrics = function () {
          var a = this,
            c = a.options,
            b = a.xAxis,
            d = a.yAxis,
            g = b.options.reversedStacks;
          g = (b.reversed && !g) || (!b.reversed && g);
          var f,
            k = {},
            l = 0;
          !1 === c.grouping
            ? (l = 1)
            : a.chart.series.forEach(function (c) {
                var b = c.yAxis,
                  g = c.options;
                if (
                  c.type === a.type &&
                  (c.visible || !a.chart.options.chart.ignoreHiddenSeries) &&
                  d.len === b.len &&
                  d.pos === b.pos
                ) {
                  if (g.stacking && "group" !== g.stacking) {
                    f = c.stackKey;
                    "undefined" === typeof k[f] && (k[f] = l++);
                    var n = k[f];
                  } else !1 !== g.grouping && (n = l++);
                  c.columnIndex = n;
                }
              });
          var e = Math.min(
              Math.abs(b.transA) *
                ((b.ordinal && b.ordinal.slope) ||
                  c.pointRange ||
                  b.closestPointRange ||
                  b.tickInterval ||
                  1),
              b.len
            ),
            m = e * c.groupPadding,
            h = (e - 2 * m) / (l || 1);
          c = Math.min(c.maxPointWidth || b.len, n(c.pointWidth, h * (1 - 2 * c.pointPadding)));
          a.columnMetrics = {
            width: c,
            offset:
              (h - c) / 2 + (m + ((a.columnIndex || 0) + (g ? 1 : 0)) * h - e / 2) * (g ? -1 : 1),
            paddedWidth: h,
            columnCount: l,
          };
          return a.columnMetrics;
        };
        e.prototype.crispCol = function (a, c, b, d) {
          var g = this.chart,
            f = this.borderWidth,
            k = -(f % 2 ? 0.5 : 0);
          f = f % 2 ? 0.5 : 1;
          g.inverted && g.renderer.isVML && (f += 1);
          this.options.crisp && ((b = Math.round(a + b) + k), (a = Math.round(a) + k), (b -= a));
          d = Math.round(c + d) + f;
          k = 0.5 >= Math.abs(c) && 0.5 < d;
          c = Math.round(c) + f;
          d -= c;
          k && d && (--c, (d += 1));
          return { x: a, y: c, width: b, height: d };
        };
        e.prototype.adjustForMissingColumns = function (a, c, b, d) {
          var f = this,
            n = this.options.stacking;
          if (!b.isNull && 1 < d.columnCount) {
            var l = 0,
              e = 0;
            g(this.yAxis.stacking && this.yAxis.stacking.stacks, function (a) {
              if ("number" === typeof b.x && (a = a[b.x.toString()])) {
                var c = a.points[f.index],
                  d = a.total;
                n ? (c && (l = e), a.hasValidPoints && e++) : k(c) && ((l = c[1]), (e = d || 0));
              }
            });
            a = (b.plotX || 0) + ((e - 1) * d.paddedWidth + c) / 2 - c - l * d.paddedWidth;
          }
          return a;
        };
        e.prototype.translate = function () {
          var a = this,
            c = a.chart,
            g = a.options,
            f = (a.dense = 2 > a.closestPointRange * a.xAxis.transA);
          f = a.borderWidth = n(g.borderWidth, f ? 0 : 1);
          var k = a.xAxis,
            l = a.yAxis,
            e = g.threshold,
            m = (a.translatedThreshold = l.getThreshold(e)),
            h = n(g.minPointLength, 5),
            q = a.getColumnMetrics(),
            w = q.width,
            t = (a.barW = Math.max(w, 1 + 2 * f)),
            x = (a.pointXOffset = q.offset),
            A = a.dataMin,
            z = a.dataMax;
          c.inverted && (m -= 0.5);
          g.pointPadding && (t = Math.ceil(t));
          E.prototype.translate.apply(a);
          a.points.forEach(function (f) {
            var p = n(f.yBottom, m),
              r = 999 + Math.abs(p),
              v = w,
              N = f.plotX || 0;
            r = b(f.plotY, -r, l.len + r);
            N += x;
            var K = t,
              M = Math.min(r, p),
              B = Math.max(r, p) - M;
            if (h && Math.abs(B) < h) {
              B = h;
              var L = (!l.reversed && !f.negative) || (l.reversed && f.negative);
              d(e) &&
                d(z) &&
                f.y === e &&
                z <= e &&
                (l.min || 0) < e &&
                (A !== z || (l.max || 0) <= e) &&
                (L = !L);
              M = Math.abs(M - m) > h ? p - h : m - (L ? h : 0);
            }
            u(f.options.pointWidth) &&
              ((v = K = Math.ceil(f.options.pointWidth)), (N -= Math.round((v - w) / 2)));
            g.centerInCategory && (N = a.adjustForMissingColumns(N, v, f, q));
            f.barX = N;
            f.pointWidth = v;
            f.tooltipPos = c.inverted
              ? [
                  b(l.len + l.pos - c.plotLeft - r, l.pos - c.plotLeft, l.len + l.pos - c.plotLeft),
                  k.len + k.pos - c.plotTop - N - K / 2,
                  B,
                ]
              : [
                  k.left - c.plotLeft + N + K / 2,
                  b(r + l.pos - c.plotTop, l.pos - c.plotTop, l.len + l.pos - c.plotTop),
                  B,
                ];
            f.shapeType = a.pointClass.prototype.shapeType || "rect";
            f.shapeArgs = a.crispCol.apply(a, f.isNull ? [N, m, K, 0] : [N, M, K, B]);
          });
        };
        e.prototype.drawGraph = function () {
          this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
        };
        e.prototype.pointAttribs = function (a, c) {
          var b = this.options,
            d = this.pointAttrToOptions || {};
          var g = d.stroke || "borderColor";
          var f = d["stroke-width"] || "borderWidth",
            k = (a && a.color) || this.color,
            l = (a && a[g]) || b[g] || k,
            e = (a && a[f]) || b[f] || this[f] || 0;
          d = (a && a.options.dashStyle) || b.dashStyle;
          var h = n(a && a.opacity, b.opacity, 1);
          if (a && this.zones.length) {
            var q = a.getZone();
            k = a.options.color || (q && (q.color || a.nonZonedColor)) || this.color;
            q && ((l = q.borderColor || l), (d = q.dashStyle || d), (e = q.borderWidth || e));
          }
          c &&
            a &&
            ((a = w(b.states[c], (a.options.states && a.options.states[c]) || {})),
            (c = a.brightness),
            (k = a.color || ("undefined" !== typeof c && m(k).brighten(a.brightness).get()) || k),
            (l = a[g] || l),
            (e = a[f] || e),
            (d = a.dashStyle || d),
            (h = n(a.opacity, h)));
          g = { fill: k, stroke: l, "stroke-width": e, opacity: h };
          d && (g.dashstyle = d);
          return g;
        };
        e.prototype.drawPoints = function () {
          var a = this,
            c = this.chart,
            b = a.options,
            g = c.renderer,
            f = b.animationLimit || 250,
            k;
          a.points.forEach(function (n) {
            var p = n.graphic,
              l = !!p,
              e = p && c.pointCount < f ? "animate" : "attr";
            if (d(n.plotY) && null !== n.y) {
              k = n.shapeArgs;
              p && n.hasNewShapeType() && (p = p.destroy());
              a.enabledDataSorting &&
                (n.startXPos = a.xAxis.reversed ? -(k ? k.width || 0 : 0) : a.xAxis.width);
              p ||
                ((n.graphic = p = g[n.shapeType](k).add(n.group || a.group)) &&
                  a.enabledDataSorting &&
                  c.hasRendered &&
                  c.pointCount < f &&
                  (p.attr({ x: n.startXPos }), (l = !0), (e = "animate")));
              if (p && l) p[e](w(k));
              if (b.borderRadius) p[e]({ r: b.borderRadius });
              c.styledMode ||
                p[e](a.pointAttribs(n, n.selected && "select")).shadow(
                  !1 !== n.allowShadow && b.shadow,
                  null,
                  b.stacking && !b.borderRadius
                );
              p &&
                (p.addClass(n.getClassName(), !0),
                p.attr({ visibility: n.visible ? "inherit" : "hidden" }));
            } else p && (n.graphic = p.destroy());
          });
        };
        e.prototype.drawTracker = function () {
          var a = this,
            c = a.chart,
            b = c.pointer,
            d = function (a) {
              var c = b.getPointFromEvent(a);
              "undefined" !== typeof c && ((b.isDirectTouch = !0), c.onMouseOver(a));
            },
            g;
          a.points.forEach(function (a) {
            g = k(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
            a.graphic && (a.graphic.element.point = a);
            g.forEach(function (c) {
              c.div ? (c.div.point = a) : (c.element.point = a);
            });
          });
          a._hasTracking ||
            (a.trackerGroups.forEach(function (g) {
              if (a[g]) {
                a[g]
                  .addClass("highcharts-tracker")
                  .on("mouseover", d)
                  .on("mouseout", function (a) {
                    b.onTrackerMouseOut(a);
                  });
                if (f) a[g].on("touchstart", d);
                !c.styledMode && a.options.cursor && a[g].css(A).css({ cursor: a.options.cursor });
              }
            }),
            (a._hasTracking = !0));
          I(this, "afterDrawTracker");
        };
        e.prototype.remove = function () {
          var a = this,
            c = a.chart;
          c.hasRendered &&
            c.series.forEach(function (c) {
              c.type === a.type && (c.isDirty = !0);
            });
          E.prototype.remove.apply(a, arguments);
        };
        e.defaultOptions = w(E.defaultOptions, {
          borderRadius: 0,
          centerInCategory: !1,
          groupPadding: 0.2,
          marker: null,
          pointPadding: 0.1,
          minPointLength: 0,
          cropThreshold: 50,
          pointRange: null,
          states: {
            hover: { halo: !1, brightness: 0.1 },
            select: { color: F.neutralColor20, borderColor: F.neutralColor100 },
          },
          dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
          startFromThreshold: !0,
          stickyTracking: !1,
          tooltip: { distance: 6 },
          threshold: 0,
          borderColor: F.backgroundColor,
        });
        return e;
      })(E);
      l(G.prototype, {
        cropShoulder: 0,
        directTouch: !0,
        drawLegendSymbol: y.drawRectangle,
        getSymbol: e,
        negStacks: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      C.registerSeriesType("column", G);
      ("");
      ("");
      return G;
    }
  );
  P(
    e,
    "Series/Bar/BarSeries.js",
    [
      e["Series/Column/ColumnSeries.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D) {
      var y =
          (this && this.__extends) ||
          (function () {
            var e = function (h, t) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, m) {
                    e.__proto__ = m;
                  }) ||
                function (e, m) {
                  for (var f in m) m.hasOwnProperty(f) && (e[f] = m[f]);
                };
              return e(h, t);
            };
            return function (h, t) {
              function z() {
                this.constructor = h;
              }
              e(h, t);
              h.prototype = null === t ? Object.create(t) : ((z.prototype = t.prototype), new z());
            };
          })(),
        F = D.extend,
        E = D.merge;
      D = (function (h) {
        function C() {
          var e = (null !== h && h.apply(this, arguments)) || this;
          e.data = void 0;
          e.options = void 0;
          e.points = void 0;
          return e;
        }
        y(C, h);
        C.defaultOptions = E(e.defaultOptions, {});
        return C;
      })(e);
      F(D.prototype, { inverted: !0 });
      h.registerSeriesType("bar", D);
      ("");
      return D;
    }
  );
  P(
    e,
    "Series/Scatter/ScatterSeries.js",
    [
      e["Series/Column/ColumnSeries.js"],
      e["Series/Line/LineSeries.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y) {
      var F =
          (this && this.__extends) ||
          (function () {
            var e = function (h, m) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (f, b) {
                    f.__proto__ = b;
                  }) ||
                function (f, b) {
                  for (var e in b) b.hasOwnProperty(e) && (f[e] = b[e]);
                };
              return e(h, m);
            };
            return function (h, m) {
              function f() {
                this.constructor = h;
              }
              e(h, m);
              h.prototype = null === m ? Object.create(m) : ((f.prototype = m.prototype), new f());
            };
          })(),
        E = y.addEvent,
        C = y.extend,
        G = y.merge;
      y = (function (e) {
        function t() {
          var m = (null !== e && e.apply(this, arguments)) || this;
          m.data = void 0;
          m.options = void 0;
          m.points = void 0;
          return m;
        }
        F(t, e);
        t.prototype.applyJitter = function () {
          var e = this,
            f = this.options.jitter,
            b = this.points.length;
          f &&
            this.points.forEach(function (m, h) {
              ["x", "y"].forEach(function (l, u) {
                var k = "plot" + l.toUpperCase();
                if (f[l] && !m.isNull) {
                  var d = e[l + "Axis"];
                  var w = f[l] * d.transA;
                  if (d && !d.isLog) {
                    var n = Math.max(0, m[k] - w);
                    d = Math.min(d.len, m[k] + w);
                    u = 1e4 * Math.sin(h + u * b);
                    m[k] = n + (d - n) * (u - Math.floor(u));
                    "x" === l && (m.clientX = m.plotX);
                  }
                }
              });
            });
        };
        t.prototype.drawGraph = function () {
          (this.options.lineWidth ||
            (0 === this.options.lineWidth && this.graph && this.graph.strokeWidth())) &&
            e.prototype.drawGraph.call(this);
        };
        t.defaultOptions = G(h.defaultOptions, {
          lineWidth: 0,
          findNearestPointBy: "xy",
          jitter: { x: 0, y: 0 },
          marker: { enabled: !0 },
          tooltip: {
            headerFormat:
              '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
          },
        });
        return t;
      })(h);
      C(y.prototype, {
        drawTracker: e.prototype.drawTracker,
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
      });
      E(y, "afterTranslate", function () {
        this.applyJitter();
      });
      D.registerSeriesType("scatter", y);
      ("");
      return y;
    }
  );
  P(
    e,
    "Mixins/CenteredSeries.js",
    [e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      var y = D.isNumber,
        F = D.pick,
        E = D.relativeLength,
        C = e.deg2rad;
      return (e.CenteredSeriesMixin = {
        getCenter: function () {
          var e = this.options,
            t = this.chart,
            z = 2 * (e.slicedOffset || 0),
            m = t.plotWidth - 2 * z,
            f = t.plotHeight - 2 * z,
            b = e.center,
            A = Math.min(m, f),
            u = e.size,
            l = e.innerSize || 0;
          "string" === typeof u && (u = parseFloat(u));
          "string" === typeof l && (l = parseFloat(l));
          e = [
            F(b[0], "50%"),
            F(b[1], "50%"),
            F(u && 0 > u ? void 0 : e.size, "100%"),
            F(l && 0 > l ? void 0 : e.innerSize || 0, "0%"),
          ];
          !t.angular || this instanceof h || (e[3] = 0);
          for (b = 0; 4 > b; ++b)
            (u = e[b]),
              (t = 2 > b || (2 === b && /%$/.test(u))),
              (e[b] = E(u, [m, f, A, e[2]][b]) + (t ? z : 0));
          e[3] > e[2] && (e[3] = e[2]);
          return e;
        },
        getStartAndEndRadians: function (e, h) {
          e = y(e) ? e : 0;
          h = y(h) && h > e && 360 > h - e ? h : e + 360;
          return { start: C * (e + -90), end: C * (h + -90) };
        },
      });
    }
  );
  P(
    e,
    "Series/Pie/PiePoint.js",
    [e["Core/Animation/AnimationUtilities.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      var y =
          (this && this.__extends) ||
          (function () {
            var e = function (f, b) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, f) {
                    b.__proto__ = f;
                  }) ||
                function (b, f) {
                  for (var e in f) f.hasOwnProperty(e) && (b[e] = f[e]);
                };
              return e(f, b);
            };
            return function (f, b) {
              function m() {
                this.constructor = f;
              }
              e(f, b);
              f.prototype = null === b ? Object.create(b) : ((m.prototype = b.prototype), new m());
            };
          })(),
        F = e.setAnimation,
        E = D.addEvent,
        C = D.defined;
      e = D.extend;
      var G = D.isNumber,
        t = D.pick,
        z = D.relativeLength;
      D = (function (e) {
        function f() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.labelDistance = void 0;
          b.options = void 0;
          b.series = void 0;
          return b;
        }
        y(f, e);
        f.prototype.getConnectorPath = function () {
          var b = this.labelPosition,
            f = this.series.options.dataLabels,
            e = f.connectorShape,
            l = this.connectorShapes;
          l[e] && (e = l[e]);
          return e.call(
            this,
            { x: b.final.x, y: b.final.y, alignment: b.alignment },
            b.connectorPosition,
            f
          );
        };
        f.prototype.getTranslate = function () {
          return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 };
        };
        f.prototype.haloPath = function (b) {
          var f = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(f.x, f.y, f.r + b, f.r + b, {
                innerR: f.r - 1,
                start: f.start,
                end: f.end,
              });
        };
        f.prototype.init = function () {
          h.prototype.init.apply(this, arguments);
          var b = this;
          b.name = t(b.name, "Slice");
          var f = function (f) {
            b.slice("select" === f.type);
          };
          E(b, "select", f);
          E(b, "unselect", f);
          return b;
        };
        f.prototype.isValid = function () {
          return G(this.y) && 0 <= this.y;
        };
        f.prototype.setVisible = function (b, f) {
          var e = this,
            l = e.series,
            m = l.chart,
            k = l.options.ignoreHiddenPoint;
          f = t(f, k);
          b !== e.visible &&
            ((e.visible = e.options.visible = b = "undefined" === typeof b ? !e.visible : b),
            (l.options.data[l.data.indexOf(e)] = e.options),
            ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (d) {
              if (e[d]) e[d][b ? "show" : "hide"](b);
            }),
            e.legendItem && m.legend.colorizeItem(e, b),
            b || "hover" !== e.state || e.setState(""),
            k && (l.isDirty = !0),
            f && m.redraw());
        };
        f.prototype.slice = function (b, f, e) {
          var l = this.series;
          F(e, l.chart);
          t(f, !0);
          this.sliced = this.options.sliced = C(b) ? b : !this.sliced;
          l.options.data[l.data.indexOf(this)] = this.options;
          this.graphic && this.graphic.animate(this.getTranslate());
          this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        };
        return f;
      })(h);
      e(D.prototype, {
        connectorShapes: {
          fixedOffset: function (e, f, b) {
            var m = f.breakAt;
            f = f.touchingSliceAt;
            return [
              ["M", e.x, e.y],
              b.softConnector
                ? [
                    "C",
                    e.x + ("left" === e.alignment ? -5 : 5),
                    e.y,
                    2 * m.x - f.x,
                    2 * m.y - f.y,
                    m.x,
                    m.y,
                  ]
                : ["L", m.x, m.y],
              ["L", f.x, f.y],
            ];
          },
          straight: function (e, f) {
            f = f.touchingSliceAt;
            return [
              ["M", e.x, e.y],
              ["L", f.x, f.y],
            ];
          },
          crookedLine: function (e, f, b) {
            f = f.touchingSliceAt;
            var m = this.series,
              h = m.center[0],
              l = m.chart.plotWidth,
              t = m.chart.plotLeft;
            m = e.alignment;
            var k = this.shapeArgs.r;
            b = z(b.crookDistance, 1);
            l = "left" === m ? h + k + (l + t - h - k) * (1 - b) : t + (h - k) * b;
            b = ["L", l, e.y];
            h = !0;
            if ("left" === m ? l > e.x || l < f.x : l < e.x || l > f.x) h = !1;
            e = [["M", e.x, e.y]];
            h && e.push(b);
            e.push(["L", f.x, f.y]);
            return e;
          },
        },
      });
      return D;
    }
  );
  P(
    e,
    "Series/Pie/PieSeries.js",
    [
      e["Mixins/CenteredSeries.js"],
      e["Series/Column/ColumnSeries.js"],
      e["Core/Globals.js"],
      e["Mixins/LegendSymbol.js"],
      e["Core/Color/Palette.js"],
      e["Series/Pie/PiePoint.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Renderer/SVG/SVGRenderer.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E, C, G, t, z) {
      var m =
          (this && this.__extends) ||
          (function () {
            var b = function (d, f) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, c) {
                    b.__proto__ = c;
                  }) ||
                function (b, c) {
                  for (var d in c) c.hasOwnProperty(d) && (b[d] = c[d]);
                };
              return b(d, f);
            };
            return function (d, f) {
              function g() {
                this.constructor = d;
              }
              b(d, f);
              d.prototype = null === f ? Object.create(f) : ((g.prototype = f.prototype), new g());
            };
          })(),
        f = e.getStartAndEndRadians;
      D = D.noop;
      var b = z.clamp,
        A = z.extend,
        u = z.fireEvent,
        l = z.merge,
        I = z.pick,
        k = z.relativeLength;
      z = (function (d) {
        function e() {
          var b = (null !== d && d.apply(this, arguments)) || this;
          b.center = void 0;
          b.data = void 0;
          b.maxLabelDistance = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        m(e, d);
        e.prototype.animate = function (b) {
          var d = this,
            c = d.points,
            f = d.startAngleRad;
          b ||
            c.forEach(function (a) {
              var c = a.graphic,
                b = a.shapeArgs;
              c &&
                b &&
                (c.attr({ r: I(a.startR, d.center && d.center[3] / 2), start: f, end: f }),
                c.animate({ r: b.r, start: b.start, end: b.end }, d.options.animation));
            });
        };
        e.prototype.drawEmpty = function () {
          var b = this.startAngleRad,
            d = this.endAngleRad,
            c = this.options;
          if (0 === this.total && this.center) {
            var f = this.center[0];
            var a = this.center[1];
            this.graph ||
              (this.graph = this.chart.renderer
                .arc(f, a, this.center[1] / 2, 0, b, d)
                .addClass("highcharts-empty-series")
                .add(this.group));
            this.graph.attr({
              d: t.prototype.symbols.arc(f, a, this.center[2] / 2, 0, {
                start: b,
                end: d,
                innerR: this.center[3] / 2,
              }),
            });
            this.chart.styledMode ||
              this.graph.attr({
                "stroke-width": c.borderWidth,
                fill: c.fillColor || "none",
                stroke: c.color || F.neutralColor20,
              });
          } else this.graph && (this.graph = this.graph.destroy());
        };
        e.prototype.drawPoints = function () {
          var b = this.chart.renderer;
          this.points.forEach(function (d) {
            d.graphic && d.hasNewShapeType() && (d.graphic = d.graphic.destroy());
            d.graphic ||
              ((d.graphic = b[d.shapeType](d.shapeArgs).add(d.series.group)),
              (d.delayedRendering = !0));
          });
        };
        e.prototype.generatePoints = function () {
          d.prototype.generatePoints.call(this);
          this.updateTotals();
        };
        e.prototype.getX = function (d, g, c) {
          var f = this.center,
            a = this.radii ? this.radii[c.index] || 0 : f[2] / 2;
          d = Math.asin(b((d - f[1]) / (a + c.labelDistance), -1, 1));
          return (
            f[0] +
            (g ? -1 : 1) * Math.cos(d) * (a + c.labelDistance) +
            (0 < c.labelDistance ? (g ? -1 : 1) * this.options.dataLabels.padding : 0)
          );
        };
        e.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        e.prototype.redrawPoints = function () {
          var b = this,
            d = b.chart,
            c = d.renderer,
            f,
            a,
            k,
            e,
            m = b.options.shadow;
          this.drawEmpty();
          !m ||
            b.shadowGroup ||
            d.styledMode ||
            (b.shadowGroup = c.g("shadow").attr({ zIndex: -1 }).add(b.group));
          b.points.forEach(function (g) {
            var n = {};
            a = g.graphic;
            if (!g.isNull && a) {
              var p = void 0;
              e = g.shapeArgs;
              f = g.getTranslate();
              d.styledMode ||
                ((p = g.shadowGroup),
                m && !p && (p = g.shadowGroup = c.g("shadow").add(b.shadowGroup)),
                p && p.attr(f),
                (k = b.pointAttribs(g, g.selected && "select")));
              g.delayedRendering
                ? (a.setRadialReference(b.center).attr(e).attr(f),
                  d.styledMode || a.attr(k).attr({ "stroke-linejoin": "round" }).shadow(m, p),
                  (g.delayedRendering = !1))
                : (a.setRadialReference(b.center),
                  d.styledMode || l(!0, n, k),
                  l(!0, n, e, f),
                  a.animate(n));
              a.attr({ visibility: g.visible ? "inherit" : "hidden" });
              a.addClass(g.getClassName(), !0);
            } else a && (g.graphic = a.destroy());
          });
        };
        e.prototype.sortByAngle = function (b, d) {
          b.sort(function (c, b) {
            return "undefined" !== typeof c.angle && (b.angle - c.angle) * d;
          });
        };
        e.prototype.translate = function (b) {
          this.generatePoints();
          var d = 0,
            c = this.options,
            e = c.slicedOffset,
            a = e + (c.borderWidth || 0),
            n = f(c.startAngle, c.endAngle),
            l = (this.startAngleRad = n.start);
          n = (this.endAngleRad = n.end) - l;
          var m = this.points,
            p = c.dataLabels.distance;
          c = c.ignoreHiddenPoint;
          var r,
            h = m.length;
          b || (this.center = b = this.getCenter());
          for (r = 0; r < h; r++) {
            var v = m[r];
            var w = l + d * n;
            !v.isValid() || (c && !v.visible) || (d += v.percentage / 100);
            var K = l + d * n;
            var t = {
              x: b[0],
              y: b[1],
              r: b[2] / 2,
              innerR: b[3] / 2,
              start: Math.round(1e3 * w) / 1e3,
              end: Math.round(1e3 * K) / 1e3,
            };
            v.shapeType = "arc";
            v.shapeArgs = t;
            v.labelDistance = I(v.options.dataLabels && v.options.dataLabels.distance, p);
            v.labelDistance = k(v.labelDistance, t.r);
            this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, v.labelDistance);
            K = (K + w) / 2;
            K > 1.5 * Math.PI ? (K -= 2 * Math.PI) : K < -Math.PI / 2 && (K += 2 * Math.PI);
            v.slicedTranslation = {
              translateX: Math.round(Math.cos(K) * e),
              translateY: Math.round(Math.sin(K) * e),
            };
            t = (Math.cos(K) * b[2]) / 2;
            var H = (Math.sin(K) * b[2]) / 2;
            v.tooltipPos = [b[0] + 0.7 * t, b[1] + 0.7 * H];
            v.half = K < -Math.PI / 2 || K > Math.PI / 2 ? 1 : 0;
            v.angle = K;
            w = Math.min(a, v.labelDistance / 5);
            v.labelPosition = {
              natural: {
                x: b[0] + t + Math.cos(K) * v.labelDistance,
                y: b[1] + H + Math.sin(K) * v.labelDistance,
              },
              final: {},
              alignment: 0 > v.labelDistance ? "center" : v.half ? "right" : "left",
              connectorPosition: {
                breakAt: { x: b[0] + t + Math.cos(K) * w, y: b[1] + H + Math.sin(K) * w },
                touchingSliceAt: { x: b[0] + t, y: b[1] + H },
              },
            };
          }
          u(this, "afterTranslate");
        };
        e.prototype.updateTotals = function () {
          var b,
            d = 0,
            c = this.points,
            f = c.length,
            a = this.options.ignoreHiddenPoint;
          for (b = 0; b < f; b++) {
            var k = c[b];
            !k.isValid() || (a && !k.visible) || (d += k.y);
          }
          this.total = d;
          for (b = 0; b < f; b++)
            (k = c[b]),
              (k.percentage = 0 < d && (k.visible || !a) ? (k.y / d) * 100 : 0),
              (k.total = d);
        };
        e.defaultOptions = l(C.defaultOptions, {
          center: [null, null],
          clip: !1,
          colorByPoint: !0,
          dataLabels: {
            allowOverlap: !0,
            connectorPadding: 5,
            connectorShape: "fixedOffset",
            crookDistance: "70%",
            distance: 30,
            enabled: !0,
            formatter: function () {
              return this.point.isNull ? void 0 : this.point.name;
            },
            softConnector: !0,
            x: 0,
          },
          fillColor: void 0,
          ignoreHiddenPoint: !0,
          inactiveOtherPoints: !0,
          legendType: "point",
          marker: null,
          size: null,
          showInLegend: !1,
          slicedOffset: 10,
          stickyTracking: !1,
          tooltip: { followPointer: !0 },
          borderColor: F.backgroundColor,
          borderWidth: 1,
          lineWidth: void 0,
          states: { hover: { brightness: 0.1 } },
        });
        return e;
      })(C);
      A(z.prototype, {
        axisTypes: [],
        directTouch: !0,
        drawGraph: void 0,
        drawLegendSymbol: y.drawRectangle,
        drawTracker: h.prototype.drawTracker,
        getCenter: e.getCenter,
        getSymbol: D,
        isCartesian: !1,
        noSharedTooltip: !0,
        pointAttribs: h.prototype.pointAttribs,
        pointClass: E,
        requireSorting: !1,
        searchPoint: D,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      G.registerSeriesType("pie", z);
      ("");
      return z;
    }
  );
  P(
    e,
    "Core/Series/DataLabels.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Color/Palette.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E, C) {
      var G = e.getDeferredAnimation,
        t = h.format;
      e = D.noop;
      E = E.seriesTypes;
      var z = C.arrayMax,
        m = C.clamp,
        f = C.defined,
        b = C.extend,
        A = C.fireEvent,
        u = C.isArray,
        l = C.merge,
        I = C.objectEach,
        k = C.pick,
        d = C.relativeLength,
        w = C.splat,
        n = C.stableSort;
      ("");
      D.distribute = function (b, c, d) {
        function a(a, c) {
          return a.target - c.target;
        }
        var g,
          f = !0,
          e = b,
          p = [];
        var l = 0;
        var h = e.reducedLen || c;
        for (g = b.length; g--; ) l += b[g].size;
        if (l > h) {
          n(b, function (a, c) {
            return (c.rank || 0) - (a.rank || 0);
          });
          for (l = g = 0; l <= h; ) (l += b[g].size), g++;
          p = b.splice(g - 1, b.length);
        }
        n(b, a);
        for (
          b = b.map(function (a) {
            return { size: a.size, targets: [a.target], align: k(a.align, 0.5) };
          });
          f;

        ) {
          for (g = b.length; g--; )
            (f = b[g]),
              (l = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2),
              (f.pos = m(l - f.size * f.align, 0, c - f.size));
          g = b.length;
          for (f = !1; g--; )
            0 < g &&
              b[g - 1].pos + b[g - 1].size > b[g].pos &&
              ((b[g - 1].size += b[g].size),
              (b[g - 1].targets = b[g - 1].targets.concat(b[g].targets)),
              (b[g - 1].align = 0.5),
              b[g - 1].pos + b[g - 1].size > c && (b[g - 1].pos = c - b[g - 1].size),
              b.splice(g, 1),
              (f = !0));
        }
        e.push.apply(e, p);
        g = 0;
        b.some(function (a) {
          var b = 0;
          if (
            a.targets.some(function () {
              e[g].pos = a.pos + b;
              if ("undefined" !== typeof d && Math.abs(e[g].pos - e[g].target) > d)
                return (
                  e.slice(0, g + 1).forEach(function (a) {
                    delete a.pos;
                  }),
                  (e.reducedLen = (e.reducedLen || c) - 0.1 * c),
                  e.reducedLen > 0.1 * c && D.distribute(e, c, d),
                  !0
                );
              b += e[g].size;
              g++;
            })
          )
            return !0;
        });
        n(e, a);
      };
      F.prototype.drawDataLabels = function () {
        function b(a, c) {
          var b = c.filter;
          return b
            ? ((c = b.operator),
              (a = a[b.property]),
              (b = b.value),
              (">" === c && a > b) ||
              ("<" === c && a < b) ||
              (">=" === c && a >= b) ||
              ("<=" === c && a <= b) ||
              ("==" === c && a == b) ||
              ("===" === c && a === b)
                ? !0
                : !1)
            : !0;
        }
        function c(a, c) {
          var b = [],
            d;
          if (u(a) && !u(c))
            b = a.map(function (a) {
              return l(a, c);
            });
          else if (u(c) && !u(a))
            b = c.map(function (c) {
              return l(a, c);
            });
          else if (u(a) || u(c)) for (d = Math.max(a.length, c.length); d--; ) b[d] = l(a[d], c[d]);
          else b = l(a, c);
          return b;
        }
        var d = this,
          a = d.chart,
          e = d.options,
          n = e.dataLabels,
          m = d.points,
          p,
          r = d.hasRendered || 0,
          h = n.animation;
        h = n.defer ? G(a, h, d) : { defer: 0, duration: 0 };
        var v = a.renderer;
        n = c(
          c(
            a.options.plotOptions &&
              a.options.plotOptions.series &&
              a.options.plotOptions.series.dataLabels,
            a.options.plotOptions &&
              a.options.plotOptions[d.type] &&
              a.options.plotOptions[d.type].dataLabels
          ),
          n
        );
        A(this, "drawDataLabels");
        if (u(n) || n.enabled || d._hasPointLabels) {
          var N = d.plotGroup(
            "dataLabelsGroup",
            "data-labels",
            r ? "inherit" : "hidden",
            n.zIndex || 6
          );
          N.attr({ opacity: +r });
          !r &&
            (r = d.dataLabelsGroup) &&
            (d.visible && N.show(!0), r[e.animation ? "animate" : "attr"]({ opacity: 1 }, h));
          m.forEach(function (g) {
            p = w(c(n, g.dlOptions || (g.options && g.options.dataLabels)));
            p.forEach(function (c, n) {
              var p = c.enabled && (!g.isNull || g.dataLabelOnNull) && b(g, c),
                l = g.dataLabels ? g.dataLabels[n] : g.dataLabel,
                m = g.connectors ? g.connectors[n] : g.connector,
                h = k(c.distance, g.labelDistance),
                r = !l;
              if (p) {
                var q = g.getLabelConfig();
                var w = k(c[g.formatPrefix + "Format"], c.format);
                q = f(w) ? t(w, q, a) : (c[g.formatPrefix + "Formatter"] || c.formatter).call(q, c);
                w = c.style;
                var u = c.rotation;
                a.styledMode ||
                  ((w.color = k(c.color, w.color, d.color, y.neutralColor100)),
                  "contrast" === w.color
                    ? ((g.contrastColor = v.getContrast(g.color || d.color)),
                      (w.color =
                        (!f(h) && c.inside) || 0 > h || e.stacking
                          ? g.contrastColor
                          : y.neutralColor100))
                    : delete g.contrastColor,
                  e.cursor && (w.cursor = e.cursor));
                var M = { r: c.borderRadius || 0, rotation: u, padding: c.padding, zIndex: 1 };
                a.styledMode ||
                  ((M.fill = c.backgroundColor),
                  (M.stroke = c.borderColor),
                  (M["stroke-width"] = c.borderWidth));
                I(M, function (a, c) {
                  "undefined" === typeof a && delete M[c];
                });
              }
              !l || (p && f(q))
                ? p &&
                  f(q) &&
                  (l
                    ? (M.text = q)
                    : ((g.dataLabels = g.dataLabels || []),
                      (l = g.dataLabels[n] = u
                        ? v.text(q, 0, -9999, c.useHTML).addClass("highcharts-data-label")
                        : v.label(q, 0, -9999, c.shape, null, null, c.useHTML, null, "data-label")),
                      n || (g.dataLabel = l),
                      l.addClass(
                        " highcharts-data-label-color-" +
                          g.colorIndex +
                          " " +
                          (c.className || "") +
                          (c.useHTML ? " highcharts-tracker" : "")
                      )),
                  (l.options = c),
                  l.attr(M),
                  a.styledMode || l.css(w).shadow(c.shadow),
                  l.added || l.add(N),
                  c.textPath &&
                    !c.useHTML &&
                    (l.setTextPath(
                      (g.getDataLabelPath && g.getDataLabelPath(l)) || g.graphic,
                      c.textPath
                    ),
                    g.dataLabelPath &&
                      !c.textPath.enabled &&
                      (g.dataLabelPath = g.dataLabelPath.destroy())),
                  d.alignDataLabel(g, l, c, null, r))
                : ((g.dataLabel = g.dataLabel && g.dataLabel.destroy()),
                  g.dataLabels &&
                    (1 === g.dataLabels.length ? delete g.dataLabels : delete g.dataLabels[n]),
                  n || delete g.dataLabel,
                  m &&
                    ((g.connector = g.connector.destroy()),
                    g.connectors &&
                      (1 === g.connectors.length ? delete g.connectors : delete g.connectors[n])));
            });
          });
        }
        A(this, "afterDrawDataLabels");
      };
      F.prototype.alignDataLabel = function (d, c, f, a, e) {
        var g = this,
          n = this.chart,
          l = this.isCartesian && n.inverted,
          m = this.enabledDataSorting,
          h = k(d.dlBox && d.dlBox.centerX, d.plotX, -9999),
          v = k(d.plotY, -9999),
          q = c.getBBox(),
          w = f.rotation,
          u = f.align,
          t = n.isInsidePlot(h, Math.round(v), { inverted: l, paneCoordinates: !0, series: g }),
          x = "justify" === k(f.overflow, m ? "none" : "justify"),
          B =
            this.visible &&
            !1 !== d.visible &&
            (d.series.forceDL ||
              (m && !x) ||
              t ||
              (k(f.inside, !!this.options.stacking) &&
                a &&
                n.isInsidePlot(h, l ? a.x + 1 : a.y + a.height - 1, {
                  inverted: l,
                  paneCoordinates: !0,
                  series: g,
                })));
        var A = function (a) {
          m && g.xAxis && !x && g.setDataLabelStartPos(d, c, e, t, a);
        };
        if (B) {
          var z = n.renderer.fontMetrics(n.styledMode ? void 0 : f.style.fontSize, c).b;
          a = b(
            {
              x: l ? this.yAxis.len - v : h,
              y: Math.round(l ? this.xAxis.len - h : v),
              width: 0,
              height: 0,
            },
            a
          );
          b(f, { width: q.width, height: q.height });
          w
            ? ((x = !1),
              (h = n.renderer.rotCorr(z, w)),
              (h = {
                x: a.x + (f.x || 0) + a.width / 2 + h.x,
                y:
                  a.y + (f.y || 0) + { top: 0, middle: 0.5, bottom: 1 }[f.verticalAlign] * a.height,
              }),
              A(h),
              c[e ? "attr" : "animate"](h).attr({ align: u }),
              (A = (w + 720) % 360),
              (A = 180 < A && 360 > A),
              "left" === u
                ? (h.y -= A ? q.height : 0)
                : "center" === u
                ? ((h.x -= q.width / 2), (h.y -= q.height / 2))
                : "right" === u && ((h.x -= q.width), (h.y -= A ? 0 : q.height)),
              (c.placed = !0),
              (c.alignAttr = h))
            : (A(a), c.align(f, void 0, a), (h = c.alignAttr));
          x && 0 <= a.height
            ? this.justifyDataLabel(c, f, h, q, a, e)
            : k(f.crop, !0) &&
              (B =
                n.isInsidePlot(h.x, h.y, { paneCoordinates: !0, series: g }) &&
                n.isInsidePlot(h.x + q.width, h.y + q.height, { paneCoordinates: !0, series: g }));
          if (f.shape && !w)
            c[e ? "attr" : "animate"]({
              anchorX: l ? n.plotWidth - d.plotY : d.plotX,
              anchorY: l ? n.plotHeight - d.plotX : d.plotY,
            });
        }
        e && m && (c.placed = !1);
        B || (m && !x) || (c.hide(!0), (c.placed = !1));
      };
      F.prototype.setDataLabelStartPos = function (b, c, d, a, f) {
        var g = this.chart,
          k = g.inverted,
          e = this.xAxis,
          n = e.reversed,
          l = k ? c.height / 2 : c.width / 2;
        b = (b = b.pointWidth) ? b / 2 : 0;
        e = k ? f.x : n ? -l - b : e.width - l + b;
        f = k ? (n ? this.yAxis.height - l + b : -l - b) : f.y;
        c.startXPos = e;
        c.startYPos = f;
        a
          ? "hidden" === c.visibility && (c.show(), c.attr({ opacity: 0 }).animate({ opacity: 1 }))
          : c.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, c.hide);
        g.hasRendered && (d && c.attr({ x: c.startXPos, y: c.startYPos }), (c.placed = !0));
      };
      F.prototype.justifyDataLabel = function (b, c, d, a, f, k) {
        var g = this.chart,
          e = c.align,
          n = c.verticalAlign,
          l = b.box ? 0 : b.padding || 0,
          m = c.x;
        m = void 0 === m ? 0 : m;
        var h = c.y;
        var q = void 0 === h ? 0 : h;
        h = (d.x || 0) + l;
        if (0 > h) {
          "right" === e && 0 <= m ? ((c.align = "left"), (c.inside = !0)) : (m -= h);
          var w = !0;
        }
        h = (d.x || 0) + a.width - l;
        h > g.plotWidth &&
          ("left" === e && 0 >= m ? ((c.align = "right"), (c.inside = !0)) : (m += g.plotWidth - h),
          (w = !0));
        h = d.y + l;
        0 > h &&
          ("bottom" === n && 0 <= q ? ((c.verticalAlign = "top"), (c.inside = !0)) : (q -= h),
          (w = !0));
        h = (d.y || 0) + a.height - l;
        h > g.plotHeight &&
          ("top" === n && 0 >= q
            ? ((c.verticalAlign = "bottom"), (c.inside = !0))
            : (q += g.plotHeight - h),
          (w = !0));
        w && ((c.x = m), (c.y = q), (b.placed = !k), b.align(c, void 0, f));
        return w;
      };
      E.pie &&
        ((E.pie.prototype.dataLabelPositioners = {
          radialDistributionY: function (b) {
            return b.top + b.distributeBox.pos;
          },
          radialDistributionX: function (b, c, d, a) {
            return b.getX(d < c.top + 2 || d > c.bottom - 2 ? a : d, c.half, c);
          },
          justify: function (b, c, d) {
            return d[0] + (b.half ? -1 : 1) * (c + b.labelDistance);
          },
          alignToPlotEdges: function (b, c, d, a) {
            b = b.getBBox().width;
            return c ? b + a : d - b - a;
          },
          alignToConnectors: function (b, c, d, a) {
            var g = 0,
              f;
            b.forEach(function (a) {
              f = a.dataLabel.getBBox().width;
              f > g && (g = f);
            });
            return c ? g + a : d - g - a;
          },
        }),
        (E.pie.prototype.drawDataLabels = function () {
          var b = this,
            c = b.data,
            d,
            a = b.chart,
            e = b.options.dataLabels || {},
            n = e.connectorPadding,
            m,
            p = a.plotWidth,
            h = a.plotHeight,
            w = a.plotLeft,
            v = Math.round(a.chartWidth / 3),
            u,
            t = b.center,
            A = t[2] / 2,
            H = t[1],
            x,
            I,
            C,
            G,
            E = [[], []],
            Q,
            T,
            P,
            W,
            V = [0, 0, 0, 0],
            aa = b.dataLabelPositioners,
            X;
          b.visible &&
            (e.enabled || b._hasPointLabels) &&
            (c.forEach(function (a) {
              a.dataLabel &&
                a.visible &&
                a.dataLabel.shortened &&
                (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }),
                (a.dataLabel.shortened = !1));
            }),
            F.prototype.drawDataLabels.apply(b),
            c.forEach(function (a) {
              a.dataLabel &&
                (a.visible
                  ? (E[a.half].push(a),
                    (a.dataLabel._pos = null),
                    !f(e.style.width) &&
                      !f(
                        a.options.dataLabels &&
                          a.options.dataLabels.style &&
                          a.options.dataLabels.style.width
                      ) &&
                      a.dataLabel.getBBox().width > v &&
                      (a.dataLabel.css({ width: Math.round(0.7 * v) + "px" }),
                      (a.dataLabel.shortened = !0)))
                  : ((a.dataLabel = a.dataLabel.destroy()),
                    a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels));
            }),
            E.forEach(function (c, g) {
              var l = c.length,
                m = [],
                v;
              if (l) {
                b.sortByAngle(c, g - 0.5);
                if (0 < b.maxLabelDistance) {
                  var r = Math.max(0, H - A - b.maxLabelDistance);
                  var q = Math.min(H + A + b.maxLabelDistance, a.plotHeight);
                  c.forEach(function (c) {
                    0 < c.labelDistance &&
                      c.dataLabel &&
                      ((c.top = Math.max(0, H - A - c.labelDistance)),
                      (c.bottom = Math.min(H + A + c.labelDistance, a.plotHeight)),
                      (v = c.dataLabel.getBBox().height || 21),
                      (c.distributeBox = {
                        target: c.labelPosition.natural.y - c.top + v / 2,
                        size: v,
                        rank: c.y,
                      }),
                      m.push(c.distributeBox));
                  });
                  r = q + v - r;
                  D.distribute(m, r, r / 5);
                }
                for (W = 0; W < l; W++) {
                  d = c[W];
                  C = d.labelPosition;
                  x = d.dataLabel;
                  P = !1 === d.visible ? "hidden" : "inherit";
                  T = r = C.natural.y;
                  m &&
                    f(d.distributeBox) &&
                    ("undefined" === typeof d.distributeBox.pos
                      ? (P = "hidden")
                      : ((G = d.distributeBox.size), (T = aa.radialDistributionY(d))));
                  delete d.positionIndex;
                  if (e.justify) Q = aa.justify(d, A, t);
                  else
                    switch (e.alignTo) {
                      case "connectors":
                        Q = aa.alignToConnectors(c, g, p, w);
                        break;
                      case "plotEdges":
                        Q = aa.alignToPlotEdges(x, g, p, w);
                        break;
                      default:
                        Q = aa.radialDistributionX(b, d, T, r);
                    }
                  x._attr = { visibility: P, align: C.alignment };
                  X = d.options.dataLabels || {};
                  x._pos = {
                    x: Q + k(X.x, e.x) + ({ left: n, right: -n }[C.alignment] || 0),
                    y: T + k(X.y, e.y) - 10,
                  };
                  C.final.x = Q;
                  C.final.y = T;
                  k(e.crop, !0) &&
                    ((I = x.getBBox().width),
                    (r = null),
                    Q - I < n && 1 === g
                      ? ((r = Math.round(I - Q + n)), (V[3] = Math.max(r, V[3])))
                      : Q + I > p - n &&
                        0 === g &&
                        ((r = Math.round(Q + I - p + n)), (V[1] = Math.max(r, V[1]))),
                    0 > T - G / 2
                      ? (V[0] = Math.max(Math.round(-T + G / 2), V[0]))
                      : T + G / 2 > h && (V[2] = Math.max(Math.round(T + G / 2 - h), V[2])),
                    (x.sideOverflow = r));
                }
              }
            }),
            0 === z(V) || this.verifyDataLabelOverflow(V)) &&
            (this.placeDataLabels(),
            this.points.forEach(function (c) {
              X = l(e, c.options.dataLabels);
              if ((m = k(X.connectorWidth, 1))) {
                var d;
                u = c.connector;
                if ((x = c.dataLabel) && x._pos && c.visible && 0 < c.labelDistance) {
                  P = x._attr.visibility;
                  if ((d = !u))
                    (c.connector = u = a.renderer
                      .path()
                      .addClass(
                        "highcharts-data-label-connector  highcharts-color-" +
                          c.colorIndex +
                          (c.className ? " " + c.className : "")
                      )
                      .add(b.dataLabelsGroup)),
                      a.styledMode ||
                        u.attr({
                          "stroke-width": m,
                          stroke: X.connectorColor || c.color || y.neutralColor60,
                        });
                  u[d ? "attr" : "animate"]({ d: c.getConnectorPath() });
                  u.attr("visibility", P);
                } else u && (c.connector = u.destroy());
              }
            }));
        }),
        (E.pie.prototype.placeDataLabels = function () {
          this.points.forEach(function (b) {
            var c = b.dataLabel,
              d;
            c &&
              b.visible &&
              ((d = c._pos)
                ? (c.sideOverflow &&
                    ((c._attr.width = Math.max(c.getBBox().width - c.sideOverflow, 0)),
                    c.css({
                      width: c._attr.width + "px",
                      textOverflow:
                        (this.options.dataLabels.style || {}).textOverflow || "ellipsis",
                    }),
                    (c.shortened = !0)),
                  c.attr(c._attr),
                  c[c.moved ? "animate" : "attr"](d),
                  (c.moved = !0))
                : c && c.attr({ y: -9999 }));
            delete b.distributeBox;
          }, this);
        }),
        (E.pie.prototype.alignDataLabel = e),
        (E.pie.prototype.verifyDataLabelOverflow = function (b) {
          var c = this.center,
            g = this.options,
            a = g.center,
            f = g.minSize || 80,
            k = null !== g.size;
          if (!k) {
            if (null !== a[0]) var e = Math.max(c[2] - Math.max(b[1], b[3]), f);
            else (e = Math.max(c[2] - b[1] - b[3], f)), (c[0] += (b[3] - b[1]) / 2);
            null !== a[1]
              ? (e = m(e, f, c[2] - Math.max(b[0], b[2])))
              : ((e = m(e, f, c[2] - b[0] - b[2])), (c[1] += (b[0] - b[2]) / 2));
            e < c[2]
              ? ((c[2] = e),
                (c[3] = Math.min(d(g.innerSize || 0, e), e)),
                this.translate(c),
                this.drawDataLabels && this.drawDataLabels())
              : (k = !0);
          }
          return k;
        }));
      E.column &&
        (E.column.prototype.alignDataLabel = function (b, c, d, a, f) {
          var g = this.chart.inverted,
            e = b.series,
            n = b.dlBox || b.shapeArgs,
            m = k(b.below, b.plotY > k(this.translatedThreshold, e.yAxis.len)),
            h = k(d.inside, !!this.options.stacking);
          n &&
            ((a = l(n)),
            0 > a.y && ((a.height += a.y), (a.y = 0)),
            (n = a.y + a.height - e.yAxis.len),
            0 < n && n < a.height && (a.height -= n),
            g &&
              (a = {
                x: e.yAxis.len - a.y - a.height,
                y: e.xAxis.len - a.x - a.width,
                width: a.height,
                height: a.width,
              }),
            h ||
              (g
                ? ((a.x += m ? 0 : a.width), (a.width = 0))
                : ((a.y += m ? a.height : 0), (a.height = 0))));
          d.align = k(d.align, !g || h ? "center" : m ? "right" : "left");
          d.verticalAlign = k(d.verticalAlign, g || h ? "middle" : m ? "top" : "bottom");
          F.prototype.alignDataLabel.call(this, b, c, d, a, f);
          d.inside && b.contrastColor && c.css({ color: b.contrastColor });
        });
    }
  );
  P(
    e,
    "Extensions/OverlappingDataLabels.js",
    [e["Core/Chart/Chart.js"], e["Core/Utilities.js"]],
    function (e, h) {
      function D(e, m) {
        var f = !1;
        if (e) {
          var b = e.newOpacity;
          e.oldOpacity !== b &&
            (e.alignAttr && e.placed
              ? (e[b ? "removeClass" : "addClass"]("highcharts-data-label-hidden"),
                (f = !0),
                (e.alignAttr.opacity = b),
                e[e.isOld ? "animate" : "attr"](e.alignAttr, null, function () {
                  m.styledMode || e.css({ pointerEvents: b ? "auto" : "none" });
                  e.visibility = b ? "inherit" : "hidden";
                }),
                F(m, "afterHideOverlappingLabel"))
              : e.attr({ opacity: b }));
          e.isOld = !0;
        }
        return f;
      }
      var y = h.addEvent,
        F = h.fireEvent,
        E = h.isArray,
        C = h.isNumber,
        G = h.objectEach,
        t = h.pick;
      y(e, "render", function () {
        var e = this,
          m = [];
        (this.labelCollectors || []).forEach(function (f) {
          m = m.concat(f());
        });
        (this.yAxis || []).forEach(function (f) {
          f.stacking &&
            f.options.stackLabels &&
            !f.options.stackLabels.allowOverlap &&
            G(f.stacking.stacks, function (b) {
              G(b, function (b) {
                m.push(b.label);
              });
            });
        });
        (this.series || []).forEach(function (f) {
          var b = f.options.dataLabels;
          f.visible &&
            (!1 !== b.enabled || f._hasPointLabels) &&
            ((b = function (b) {
              return b.forEach(function (b) {
                b.visible &&
                  (E(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : []).forEach(
                    function (f) {
                      var l = f.options;
                      f.labelrank = t(l.labelrank, b.labelrank, b.shapeArgs && b.shapeArgs.height);
                      l.allowOverlap
                        ? ((f.oldOpacity = f.opacity), (f.newOpacity = 1), D(f, e))
                        : m.push(f);
                    }
                  );
              });
            }),
            b(f.nodes || []),
            b(f.points));
        });
        this.hideOverlappingLabels(m);
      });
      e.prototype.hideOverlappingLabels = function (e) {
        var m = this,
          f = e.length,
          b = m.renderer,
          h,
          u,
          l,
          t = !1;
        var k = function (d) {
          var g,
            c = d.box ? 0 : d.padding || 0,
            f = (g = 0),
            a;
          if (d && (!d.alignAttr || d.placed)) {
            var k = d.alignAttr || { x: d.attr("x"), y: d.attr("y") };
            var e = d.parentGroup;
            d.width ||
              ((g = d.getBBox()),
              (d.width = g.width),
              (d.height = g.height),
              (g = b.fontMetrics(null, d.element).h));
            var n = d.width - 2 * c;
            (a = { left: "0", center: "0.5", right: "1" }[d.alignValue])
              ? (f = +a * n)
              : C(d.x) && Math.round(d.x) !== d.translateX && (f = d.x - d.translateX);
            return {
              x: k.x + (e.translateX || 0) + c - (f || 0),
              y: k.y + (e.translateY || 0) + c - g,
              width: d.width - 2 * c,
              height: d.height - 2 * c,
            };
          }
        };
        for (u = 0; u < f; u++)
          if ((h = e[u])) (h.oldOpacity = h.opacity), (h.newOpacity = 1), (h.absoluteBox = k(h));
        e.sort(function (b, d) {
          return (d.labelrank || 0) - (b.labelrank || 0);
        });
        for (u = 0; u < f; u++) {
          var d = (k = e[u]) && k.absoluteBox;
          for (h = u + 1; h < f; ++h) {
            var w = (l = e[h]) && l.absoluteBox;
            !d ||
              !w ||
              k === l ||
              0 === k.newOpacity ||
              0 === l.newOpacity ||
              w.x >= d.x + d.width ||
              w.x + w.width <= d.x ||
              w.y >= d.y + d.height ||
              w.y + w.height <= d.y ||
              ((k.labelrank < l.labelrank ? k : l).newOpacity = 0);
          }
        }
        e.forEach(function (b) {
          D(b, m) && (t = !0);
        });
        t && F(m, "afterHideAllOverlappingLabels");
      };
    }
  );
  P(e, "Core/Responsive.js", [e["Core/Chart/Chart.js"], e["Core/Utilities.js"]], function (e, h) {
    var D = h.find,
      y = h.isArray,
      F = h.isObject,
      E = h.merge,
      C = h.objectEach,
      G = h.pick,
      t = h.splat,
      z = h.uniqueKey;
    e.prototype.setResponsive = function (e, f) {
      var b = this.options.responsive,
        m = [],
        h = this.currentResponsive;
      !f &&
        b &&
        b.rules &&
        b.rules.forEach(function (b) {
          "undefined" === typeof b._id && (b._id = z());
          this.matchResponsiveRule(b, m);
        }, this);
      f = E.apply(
        0,
        m.map(function (f) {
          return D(b.rules, function (b) {
            return b._id === f;
          }).chartOptions;
        })
      );
      f.isResponsiveOptions = !0;
      m = m.toString() || void 0;
      m !== (h && h.ruleIds) &&
        (h && this.update(h.undoOptions, e, !0),
        m
          ? ((h = this.currentOptions(f)),
            (h.isResponsiveOptions = !0),
            (this.currentResponsive = { ruleIds: m, mergedOptions: f, undoOptions: h }),
            this.update(f, e, !0))
          : (this.currentResponsive = void 0));
    };
    e.prototype.matchResponsiveRule = function (e, f) {
      var b = e.condition;
      (
        b.callback ||
        function () {
          return (
            this.chartWidth <= G(b.maxWidth, Number.MAX_VALUE) &&
            this.chartHeight <= G(b.maxHeight, Number.MAX_VALUE) &&
            this.chartWidth >= G(b.minWidth, 0) &&
            this.chartHeight >= G(b.minHeight, 0)
          );
        }
      ).call(this) && f.push(e._id);
    };
    e.prototype.currentOptions = function (e) {
      function f(e, l, m, k) {
        var d;
        C(e, function (e, n) {
          if (!k && -1 < b.collectionsWithUpdate.indexOf(n) && l[n])
            for (e = t(e), m[n] = [], d = 0; d < Math.max(e.length, l[n].length); d++)
              l[n][d] &&
                (void 0 === e[d]
                  ? (m[n][d] = l[n][d])
                  : ((m[n][d] = {}), f(e[d], l[n][d], m[n][d], k + 1)));
          else
            F(e)
              ? ((m[n] = y(e) ? [] : {}), f(e, l[n] || {}, m[n], k + 1))
              : (m[n] = "undefined" === typeof l[n] ? null : l[n]);
        });
      }
      var b = this,
        m = {};
      f(e, this.options, m, 0);
      return m;
    };
  });
  P(
    e,
    "masters/highcharts.src.js",
    [
      e["Core/Globals.js"],
      e["Core/Utilities.js"],
      e["Core/Options.js"],
      e["Core/Animation/Fx.js"],
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Renderer/HTML/AST.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Series/Series.js"],
    ],
    function (e, h, D, y, F, E, C, G, t) {
      e.animate = F.animate;
      e.animObject = F.animObject;
      e.getDeferredAnimation = F.getDeferredAnimation;
      e.setAnimation = F.setAnimation;
      e.stop = F.stop;
      e.timers = y.timers;
      e.AST = E;
      e.Fx = y;
      e.Series = t;
      e.SVGElement = G;
      e.dateFormat = C.dateFormat;
      e.format = C.format;
      e.numberFormat = C.numberFormat;
      e.defaultOptions = D.defaultOptions;
      e.getOptions = D.getOptions;
      e.time = D.defaultTime;
      e.setOptions = D.setOptions;
      e.addEvent = h.addEvent;
      e.arrayMax = h.arrayMax;
      e.arrayMin = h.arrayMin;
      e.attr = h.attr;
      e.clearTimeout = h.clearTimeout;
      e.correctFloat = h.correctFloat;
      e.createElement = h.createElement;
      e.css = h.css;
      e.defined = h.defined;
      e.destroyObjectProperties = h.destroyObjectProperties;
      e.discardElement = h.discardElement;
      e.erase = h.erase;
      e.error = h.error;
      e.extend = h.extend;
      e.extendClass = h.extendClass;
      e.find = h.find;
      e.fireEvent = h.fireEvent;
      e.getMagnitude = h.getMagnitude;
      e.getStyle = h.getStyle;
      e.inArray = h.inArray;
      e.isArray = h.isArray;
      e.isClass = h.isClass;
      e.isDOMElement = h.isDOMElement;
      e.isFunction = h.isFunction;
      e.isNumber = h.isNumber;
      e.isObject = h.isObject;
      e.isString = h.isString;
      e.keys = h.keys;
      e.merge = h.merge;
      e.normalizeTickInterval = h.normalizeTickInterval;
      e.objectEach = h.objectEach;
      e.offset = h.offset;
      e.pad = h.pad;
      e.pick = h.pick;
      e.pInt = h.pInt;
      e.relativeLength = h.relativeLength;
      e.removeEvent = h.removeEvent;
      e.splat = h.splat;
      e.stableSort = h.stableSort;
      e.syncTimeout = h.syncTimeout;
      e.timeUnits = h.timeUnits;
      e.uniqueKey = h.uniqueKey;
      e.useSerialIds = h.useSerialIds;
      e.wrap = h.wrap;
      return e;
    }
  );
  P(
    e,
    "Series/XRange/XRangePoint.js",
    [e["Core/Series/Point.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      var y =
        (this && this.__extends) ||
        (function () {
          var e = function (h, C) {
            e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, h) {
                  e.__proto__ = h;
                }) ||
              function (e, h) {
                for (var t in h) h.hasOwnProperty(t) && (e[t] = h[t]);
              };
            return e(h, C);
          };
          return function (h, C) {
            function y() {
              this.constructor = h;
            }
            e(h, C);
            h.prototype = null === C ? Object.create(C) : ((y.prototype = C.prototype), new y());
          };
        })();
      D = D.extend;
      h = (function (h) {
        function E() {
          var e = (null !== h && h.apply(this, arguments)) || this;
          e.options = void 0;
          e.series = void 0;
          return e;
        }
        y(E, h);
        E.getColorByCategory = function (e, h) {
          var t = e.options.colors || e.chart.options.colors;
          e = h.y % (t ? t.length : e.chart.options.chart.colorCount);
          return { colorIndex: e, color: t && t[e] };
        };
        E.prototype.resolveColor = function () {
          var e = this.series;
          if (e.options.colorByPoint && !this.options.color) {
            var h = E.getColorByCategory(e, this);
            e.chart.styledMode || (this.color = h.color);
            this.options.colorIndex || (this.colorIndex = h.colorIndex);
          } else this.color || (this.color = e.color);
        };
        E.prototype.init = function () {
          e.prototype.init.apply(this, arguments);
          this.y || (this.y = 0);
          return this;
        };
        E.prototype.setState = function () {
          e.prototype.setState.apply(this, arguments);
          this.series.drawPoint(this, this.series.getAnimationVerb());
        };
        E.prototype.getLabelConfig = function () {
          var h = e.prototype.getLabelConfig.call(this),
            y = this.series.yAxis.categories;
          h.x2 = this.x2;
          h.yCategory = this.yCategory = y && y[this.y];
          return h;
        };
        E.prototype.isValid = function () {
          return "number" === typeof this.x && "number" === typeof this.x2;
        };
        return E;
      })(h.seriesTypes.column.prototype.pointClass);
      D(h.prototype, { tooltipDateKeys: ["x", "x2"] });
      return h;
    }
  );
  P(
    e,
    "Series/XRange/XRangeComposition.js",
    [e["Core/Axis/Axis.js"], e["Core/Utilities.js"]],
    function (e, h) {
      var D = h.addEvent,
        y = h.pick;
      D(e, "afterGetSeriesExtremes", function () {
        var e = this.series,
          h;
        if (this.isXAxis) {
          var C = y(this.dataMax, -Number.MAX_VALUE);
          e.forEach(function (e) {
            e.x2Data &&
              e.x2Data.forEach(function (e) {
                e > C && ((C = e), (h = !0));
              });
          });
          h && (this.dataMax = C);
        }
      });
    }
  );
  P(
    e,
    "Series/XRange/XRangeSeries.js",
    [
      e["Core/Globals.js"],
      e["Core/Color/Color.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
      e["Series/XRange/XRangePoint.js"],
    ],
    function (e, h, D, y, F) {
      var E =
          (this && this.__extends) ||
          (function () {
            var b = function (d, f) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, c) {
                    b.__proto__ = c;
                  }) ||
                function (b, c) {
                  for (var d in c) c.hasOwnProperty(d) && (b[d] = c[d]);
                };
              return b(d, f);
            };
            return function (d, f) {
              function g() {
                this.constructor = d;
              }
              b(d, f);
              d.prototype = null === f ? Object.create(f) : ((g.prototype = f.prototype), new g());
            };
          })(),
        C = h.parse,
        G = D.series,
        t = D.seriesTypes.column,
        z = t.prototype,
        m = y.clamp,
        f = y.correctFloat,
        b = y.defined;
      h = y.extend;
      var A = y.find,
        u = y.isNumber,
        l = y.isObject,
        I = y.merge,
        k = y.pick;
      y = (function (d) {
        function e() {
          var b = (null !== d && d.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        E(e, d);
        e.prototype.init = function () {
          t.prototype.init.apply(this, arguments);
          this.options.stacking = void 0;
        };
        e.prototype.getColumnMetrics = function () {
          function b() {
            d.series.forEach(function (c) {
              var a = c.xAxis;
              c.xAxis = c.yAxis;
              c.yAxis = a;
            });
          }
          var d = this.chart;
          b();
          var c = z.getColumnMetrics.call(this);
          b();
          return c;
        };
        e.prototype.cropData = function (b, d, c, f) {
          d = G.prototype.cropData.call(this, this.x2Data, d, c, f);
          d.xData = b.slice(d.start, d.end);
          return d;
        };
        e.prototype.findPointIndex = function (b) {
          var d = this.cropped,
            c = this.cropStart,
            f = this.points,
            a = b.id;
          if (a)
            var e = (e = A(f, function (c) {
              return c.id === a;
            }))
              ? e.index
              : void 0;
          "undefined" === typeof e &&
            (e = (e = A(f, function (a) {
              return a.x === b.x && a.x2 === b.x2 && !a.touched;
            }))
              ? e.index
              : void 0);
          d && u(e) && u(c) && e >= c && (e -= c);
          return e;
        };
        e.prototype.translatePoint = function (d) {
          var g = this.xAxis,
            c = this.yAxis,
            f = this.columnMetrics,
            a = this.options,
            e = a.minPointLength || 0,
            n = ((d.shapeArgs && d.shapeArgs.width) || 0) / 2,
            h = (this.pointXOffset = f.offset),
            p = d.plotX,
            r = k(d.x2, d.x + (d.len || 0)),
            w = g.translate(r, 0, 0, 0, 1);
          r = Math.abs(w - p);
          var v = this.chart.inverted,
            N = (k(a.borderWidth, 1) % 2) / 2,
            t = f.offset,
            A = Math.round(f.width);
          e && ((e -= r), 0 > e && (e = 0), (p -= e / 2), (w += e / 2));
          p = Math.max(p, -10);
          w = m(w, -10, g.len + 10);
          b(d.options.pointWidth) &&
            ((t -= (Math.ceil(d.options.pointWidth) - A) / 2),
            (A = Math.ceil(d.options.pointWidth)));
          a.pointPlacement &&
            u(d.plotY) &&
            c.categories &&
            (d.plotY = c.translate(d.y, 0, 1, 0, 1, a.pointPlacement));
          a = {
            x: Math.floor(Math.min(p, w)) + N,
            y: Math.floor(d.plotY + t) + N,
            width: Math.round(Math.abs(w - p)),
            height: A,
            r: this.options.borderRadius,
          };
          d.shapeArgs = a;
          v ? (d.tooltipPos[1] += h + n) : (d.tooltipPos[0] -= n + h - a.width / 2);
          n = a.x;
          h = n + a.width;
          0 > n || h > g.len
            ? ((n = m(n, 0, g.len)),
              (h = m(h, 0, g.len)),
              (e = h - n),
              (d.dlBox = I(a, { x: n, width: h - n, centerX: e ? e / 2 : null })))
            : (d.dlBox = null);
          n = d.tooltipPos;
          h = v ? 1 : 0;
          e = v ? 0 : 1;
          f = this.columnMetrics ? this.columnMetrics.offset : -f.width / 2;
          n[h] = v ? n[h] + a.width / 2 : n[h] + (g.reversed ? -1 : 0) * a.width;
          n[e] = m(n[e] + (v ? -1 : 1) * f, 0, c.len - 1);
          if ((c = d.partialFill))
            l(c) && (c = c.amount),
              u(c) || (c = 0),
              (d.partShapeArgs = I(a, { r: this.options.borderRadius })),
              (p = Math.max(Math.round(r * c + d.plotX - p), 0)),
              (d.clipRectArgs = {
                x: g.reversed ? a.x + r - p : a.x,
                y: a.y,
                width: p,
                height: a.height,
              });
        };
        e.prototype.translate = function () {
          z.translate.apply(this, arguments);
          this.points.forEach(function (b) {
            this.translatePoint(b);
          }, this);
        };
        e.prototype.drawPoint = function (b, d) {
          var c = this.options,
            g = this.chart.renderer,
            a = b.graphic,
            f = b.shapeType,
            e = b.shapeArgs,
            n = b.partShapeArgs,
            p = b.clipRectArgs,
            h = b.partialFill,
            m = c.stacking && !c.borderRadius,
            v = b.state,
            w = c.states[v || "normal"] || {},
            u = "undefined" === typeof v ? "attr" : d;
          v = this.pointAttribs(b, v);
          w = k(this.chart.options.chart.animation, w.animation);
          if (b.isNull || !1 === b.visible) a && (b.graphic = a.destroy());
          else {
            if (a) a.rect[d](e);
            else
              (b.graphic = a = g
                .g("point")
                .addClass(b.getClassName())
                .add(b.group || this.group)),
                (a.rect = g[f](I(e))
                  .addClass(b.getClassName())
                  .addClass("highcharts-partfill-original")
                  .add(a));
            n &&
              (a.partRect
                ? (a.partRect[d](I(n)), a.partialClipRect[d](I(p)))
                : ((a.partialClipRect = g.clipRect(p.x, p.y, p.width, p.height)),
                  (a.partRect = g[f](n)
                    .addClass("highcharts-partfill-overlay")
                    .add(a)
                    .clip(a.partialClipRect))));
            this.chart.styledMode ||
              (a.rect[d](v, w).shadow(c.shadow, null, m),
              n &&
                (l(h) || (h = {}),
                l(c.partialFill) && (h = I(c.partialFill, h)),
                (b =
                  h.fill ||
                  C(v.fill).brighten(-0.3).get() ||
                  C(b.color || this.color)
                    .brighten(-0.3)
                    .get()),
                (v.fill = b),
                a.partRect[u](v, w).shadow(c.shadow, null, m)));
          }
        };
        e.prototype.drawPoints = function () {
          var b = this,
            d = b.getAnimationVerb();
          b.points.forEach(function (c) {
            b.drawPoint(c, d);
          });
        };
        e.prototype.getAnimationVerb = function () {
          return this.chart.pointCount < (this.options.animationLimit || 250) ? "animate" : "attr";
        };
        e.prototype.isPointInside = function (b) {
          var g = b.shapeArgs,
            c = b.plotX,
            f = b.plotY;
          return g
            ? "undefined" !== typeof c &&
                "undefined" !== typeof f &&
                0 <= f &&
                f <= this.yAxis.len &&
                0 <= (g.x || 0) + (g.width || 0) &&
                c <= this.xAxis.len
            : d.prototype.isPointInside.apply(this, arguments);
        };
        e.defaultOptions = I(t.defaultOptions, {
          colorByPoint: !0,
          dataLabels: {
            formatter: function () {
              var b = this.point.partialFill;
              l(b) && (b = b.amount);
              if (u(b) && 0 < b) return f(100 * b) + "%";
            },
            inside: !0,
            verticalAlign: "middle",
          },
          tooltip: {
            headerFormat: '<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>',
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.yCategory}</b><br/>',
          },
          borderRadius: 3,
          pointRange: 0,
        });
        return e;
      })(t);
      h(y.prototype, {
        type: "xrange",
        parallelArrays: ["x", "x2", "y"],
        requireSorting: !1,
        animate: G.prototype.animate,
        cropShoulder: 1,
        getExtremesFromAll: !0,
        autoIncrement: e.noop,
        buildKDTree: e.noop,
        pointClass: F,
      });
      D.registerSeriesType("xrange", y);
      ("");
      return y;
    }
  );
  P(
    e,
    "Series/Gantt/GanttPoint.js",
    [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (e, h) {
      var D =
          (this && this.__extends) ||
          (function () {
            var e = function (h, y) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, h) {
                    e.__proto__ = h;
                  }) ||
                function (e, h) {
                  for (var t in h) h.hasOwnProperty(t) && (e[t] = h[t]);
                };
              return e(h, y);
            };
            return function (h, y) {
              function C() {
                this.constructor = h;
              }
              e(h, y);
              h.prototype = null === y ? Object.create(y) : ((C.prototype = y.prototype), new C());
            };
          })(),
        y = h.pick;
      return (function (e) {
        function h() {
          var h = (null !== e && e.apply(this, arguments)) || this;
          h.options = void 0;
          h.series = void 0;
          return h;
        }
        D(h, e);
        h.setGanttPointAliases = function (e) {
          function h(h, z) {
            "undefined" !== typeof z && (e[h] = z);
          }
          h("x", y(e.start, e.x));
          h("x2", y(e.end, e.x2));
          h("partialFill", y(e.completed, e.partialFill));
        };
        h.prototype.applyOptions = function (y, D) {
          y = e.prototype.applyOptions.call(this, y, D);
          h.setGanttPointAliases(y);
          return y;
        };
        h.prototype.isValid = function () {
          return (
            ("number" === typeof this.start || "number" === typeof this.x) &&
            ("number" === typeof this.end || "number" === typeof this.x2 || this.milestone)
          );
        };
        return h;
      })(e.seriesTypes.xrange.prototype.pointClass);
    }
  );
  P(e, "Gantt/Tree.js", [e["Core/Utilities.js"]], function (e) {
    var h = e.extend,
      D = e.isNumber,
      y = e.pick,
      F = function (e, h) {
        var t = e.reduce(function (e, h) {
          var f = y(h.parent, "");
          "undefined" === typeof e[f] && (e[f] = []);
          e[f].push(h);
          return e;
        }, {});
        Object.keys(t).forEach(function (e, m) {
          var f = t[e];
          "" !== e &&
            -1 === h.indexOf(e) &&
            (f.forEach(function (b) {
              m[""].push(b);
            }),
            delete m[e]);
        });
        return t;
      },
      E = function (e, G, t, z, m, f) {
        var b = 0,
          A = 0,
          u = f && f.after,
          l = f && f.before;
        G = { data: z, depth: t - 1, id: e, level: t, parent: G };
        var I, k;
        "function" === typeof l && l(G, f);
        l = (m[e] || []).map(function (d) {
          var l = E(d.id, e, t + 1, d, m, f),
            n = d.start;
          d = !0 === d.milestone ? n : d.end;
          I = !D(I) || n < I ? n : I;
          k = !D(k) || d > k ? d : k;
          b = b + 1 + l.descendants;
          A = Math.max(l.height + 1, A);
          return l;
        });
        z && ((z.start = y(z.start, I)), (z.end = y(z.end, k)));
        h(G, { children: l, descendants: b, height: A });
        "function" === typeof u && u(G, f);
        return G;
      };
    return {
      getListOfParents: F,
      getNode: E,
      getTree: function (e, h) {
        var t = e.map(function (e) {
          return e.id;
        });
        e = F(e, t);
        return E("", null, 1, null, e, h);
      },
    };
  });
  P(
    e,
    "Core/Axis/TreeGridTick.js",
    [e["Core/Color/Palette.js"], e["Core/Utilities.js"]],
    function (e, h) {
      var D = h.addEvent,
        y = h.isObject,
        F = h.isNumber,
        E = h.pick,
        C = h.wrap,
        G;
      (function (h) {
        function t() {
          this.treeGrid || (this.treeGrid = new u(this));
        }
        function m(b, f) {
          b = b.treeGrid;
          var k = !b.labelIcon,
            d = f.renderer,
            l = f.xy,
            n = f.options,
            g = n.width || 0,
            c = n.height || 0,
            h = l.x - g / 2 - (n.padding || 0);
          l = l.y - c / 2;
          var a = f.collapsed ? 90 : 180,
            m = f.show && F(l),
            u = b.labelIcon;
          u ||
            (b.labelIcon = u = d
              .path(d.symbols[n.type](n.x || 0, n.y || 0, g, c))
              .addClass("highcharts-label-icon")
              .add(f.group));
          u.attr({ y: m ? 0 : -9999 });
          d.styledMode ||
            u.attr({
              cursor: "pointer",
              fill: E(f.color, e.neutralColor60),
              "stroke-width": 1,
              stroke: n.lineColor,
              strokeWidth: n.lineWidth || 0,
            });
          u[k ? "attr" : "animate"]({ translateX: h, translateY: l, rotation: a });
        }
        function f(b, f, e, d, h, n, g, c, m) {
          var a = E(this.options && this.options.labels, n);
          n = this.pos;
          var k = this.axis,
            l = "treegrid" === k.options.type;
          b = b.apply(this, [f, e, d, h, a, g, c, m]);
          l &&
            ((f = a && y(a.symbol, !0) ? a.symbol : {}),
            (a = a && F(a.indentation) ? a.indentation : 0),
            (n = ((n = (k = k.treeGrid.mapOfPosToGridNode) && k[n]) && n.depth) || 1),
            (b.x += (f.width || 0) + 2 * (f.padding || 0) + (n - 1) * a));
          return b;
        }
        function b(b) {
          var f = this,
            e = f.pos,
            d = f.axis,
            l = f.label,
            n = d.treeGrid.mapOfPosToGridNode,
            g = d.options,
            c = E(f.options && f.options.labels, g && g.labels),
            h = c && y(c.symbol, !0) ? c.symbol : {},
            a = (n = n && n[e]) && n.depth;
          g = "treegrid" === g.type;
          var u = -1 < d.tickPositions.indexOf(e);
          e = d.chart.styledMode;
          g && n && l && l.element && l.addClass("highcharts-treegrid-node-level-" + a);
          b.apply(f, Array.prototype.slice.call(arguments, 1));
          g &&
            l &&
            l.element &&
            n &&
            n.descendants &&
            0 < n.descendants &&
            ((d = d.treeGrid.isCollapsed(n)),
            m(f, {
              color: (!e && l.styles && l.styles.color) || "",
              collapsed: d,
              group: l.parentGroup,
              options: h,
              renderer: l.renderer,
              show: u,
              xy: l.xy,
            }),
            (h = "highcharts-treegrid-node-" + (d ? "expanded" : "collapsed")),
            l.addClass("highcharts-treegrid-node-" + (d ? "collapsed" : "expanded")).removeClass(h),
            e || l.css({ cursor: "pointer" }),
            [l, f.treeGrid.labelIcon].forEach(function (a) {
              a &&
                !a.attachedTreeGridEvents &&
                (D(a.element, "mouseover", function () {
                  l.addClass("highcharts-treegrid-node-active");
                  l.renderer.styledMode || l.css({ textDecoration: "underline" });
                }),
                D(a.element, "mouseout", function () {
                  var a = y(c.style) ? c.style : {};
                  l.removeClass("highcharts-treegrid-node-active");
                  l.renderer.styledMode || l.css({ textDecoration: a.textDecoration });
                }),
                D(a.element, "click", function () {
                  f.treeGrid.toggleCollapse();
                }),
                (a.attachedTreeGridEvents = !0));
            }));
        }
        var A = !1;
        h.compose = function (e) {
          A ||
            (D(e, "init", t),
            C(e.prototype, "getLabelPosition", f),
            C(e.prototype, "renderLabel", b),
            (e.prototype.collapse = function (b) {
              this.treeGrid.collapse(b);
            }),
            (e.prototype.expand = function (b) {
              this.treeGrid.expand(b);
            }),
            (e.prototype.toggleCollapse = function (b) {
              this.treeGrid.toggleCollapse(b);
            }),
            (A = !0));
        };
        var u = (function () {
          function b(b) {
            this.tick = b;
          }
          b.prototype.collapse = function (b) {
            var f = this.tick,
              d = f.axis,
              e = d.brokenAxis;
            e &&
              d.treeGrid.mapOfPosToGridNode &&
              ((f = d.treeGrid.collapse(d.treeGrid.mapOfPosToGridNode[f.pos])),
              e.setBreaks(f, E(b, !0)));
          };
          b.prototype.expand = function (b) {
            var f = this.tick,
              d = f.axis,
              e = d.brokenAxis;
            e &&
              d.treeGrid.mapOfPosToGridNode &&
              ((f = d.treeGrid.expand(d.treeGrid.mapOfPosToGridNode[f.pos])),
              e.setBreaks(f, E(b, !0)));
          };
          b.prototype.toggleCollapse = function (b) {
            var f = this.tick,
              d = f.axis,
              e = d.brokenAxis;
            e &&
              d.treeGrid.mapOfPosToGridNode &&
              ((f = d.treeGrid.toggleCollapse(d.treeGrid.mapOfPosToGridNode[f.pos])),
              e.setBreaks(f, E(b, !0)));
          };
          return b;
        })();
        h.Additions = u;
      })(G || (G = {}));
      return G;
    }
  );
  P(e, "Mixins/TreeSeries.js", [e["Core/Color/Color.js"], e["Core/Utilities.js"]], function (e, h) {
    var D = h.extend,
      y = h.isArray,
      F = h.isNumber,
      E = h.isObject,
      C = h.merge,
      G = h.pick;
    return {
      getColor: function (h, z) {
        var m = z.index,
          f = z.mapOptionsToLevel,
          b = z.parentColor,
          t = z.parentColorIndex,
          u = z.series,
          l = z.colors,
          I = z.siblings,
          k = u.points,
          d = u.chart.options.chart,
          w;
        if (h) {
          k = k[h.i];
          h = f[h.level] || {};
          if ((f = k && h.colorByPoint)) {
            var n = k.index % (l ? l.length : d.colorCount);
            var g = l && l[n];
          }
          if (!u.chart.styledMode) {
            l = k && k.options.color;
            d = h && h.color;
            if ((w = b))
              w =
                (w = h && h.colorVariation) && "brightness" === w.key
                  ? e
                      .parse(b)
                      .brighten((m / I) * w.to)
                      .get()
                  : b;
            w = G(l, d, g, w, u.color);
          }
          var c = G(k && k.options.colorIndex, h && h.colorIndex, n, t, z.colorIndex);
        }
        return { color: w, colorIndex: c };
      },
      getLevelOptions: function (e) {
        var h = null;
        if (E(e)) {
          h = {};
          var m = F(e.from) ? e.from : 1;
          var f = e.levels;
          var b = {};
          var t = E(e.defaults) ? e.defaults : {};
          y(f) &&
            (b = f.reduce(function (b, f) {
              if (E(f) && F(f.level)) {
                var e = C({}, f);
                var k =
                  "boolean" === typeof e.levelIsConstant ? e.levelIsConstant : t.levelIsConstant;
                delete e.levelIsConstant;
                delete e.level;
                f = f.level + (k ? 0 : m - 1);
                E(b[f]) ? D(b[f], e) : (b[f] = e);
              }
              return b;
            }, {}));
          f = F(e.to) ? e.to : 1;
          for (e = 0; e <= f; e++) h[e] = C({}, t, E(b[e]) ? b[e] : {});
        }
        return h;
      },
      setTreeValues: function f(e, h) {
        var b = h.before,
          m = h.idRoot,
          u = h.mapIdToNode[m],
          l = h.points[e.i],
          I = (l && l.options) || {},
          k = 0,
          d = [];
        e.levelDynamic =
          e.level -
          (("boolean" === typeof h.levelIsConstant ? h.levelIsConstant : 1) ? 0 : u.level);
        e.name = G(l && l.name, "");
        e.visible = m === e.id || ("boolean" === typeof h.visible ? h.visible : !1);
        "function" === typeof b && (e = b(e, h));
        e.children.forEach(function (b, l) {
          var g = D({}, h);
          D(g, { index: l, siblings: e.children.length, visible: e.visible });
          b = f(b, g);
          d.push(b);
          b.visible && (k += b.val);
        });
        e.visible = 0 < k || e.visible;
        b = G(I.value, k);
        e.children = d;
        e.childrenTotal = k;
        e.isLeaf = e.visible && !k;
        e.val = b;
        return e;
      },
      updateRootId: function (e) {
        if (E(e)) {
          var h = E(e.options) ? e.options : {};
          h = G(e.rootNode, h.rootId, "");
          E(e.userOptions) && (e.userOptions.rootId = h);
          e.rootNode = h;
        }
        return h;
      },
    };
  });
  P(
    e,
    "Core/Axis/GridAxis.js",
    [e["Core/Axis/Axis.js"], e["Core/Globals.js"], e["Core/Axis/Tick.js"], e["Core/Utilities.js"]],
    function (e, h, D, y) {
      var F = y.addEvent,
        E = y.defined,
        C = y.erase,
        G = y.find,
        t = y.isArray,
        z = y.isNumber,
        m = y.merge,
        f = y.pick,
        b = y.timeUnits,
        A = y.wrap,
        u = h.Chart;
      ("");
      e.prototype.getMaxLabelDimensions = function (b, d) {
        var f = { width: 0, height: 0 };
        d.forEach(function (d) {
          d = b[d];
          if (y.isObject(d, !0)) {
            var g = y.isObject(d.label, !0) ? d.label : {};
            d = g.getBBox ? g.getBBox().height : 0;
            g.textStr && !z(g.textPxLength) && (g.textPxLength = g.getBBox().width);
            var c = z(g.textPxLength) ? Math.round(g.textPxLength) : 0;
            g.textStr && (c = Math.round(g.getBBox().width));
            f.height = Math.max(d, f.height);
            f.width = Math.max(c, f.width);
          }
        });
        return f;
      };
      h.dateFormats.W = function (b) {
        b = new this.Date(b);
        var d = (this.get("Day", b) + 6) % 7,
          f = new this.Date(b.valueOf());
        this.set("Date", f, this.get("Date", b) - d + 3);
        d = new this.Date(this.get("FullYear", f), 0, 1);
        4 !== this.get("Day", d) &&
          (this.set("Month", b, 0), this.set("Date", b, 1 + ((11 - this.get("Day", d)) % 7)));
        return (1 + Math.floor((f.valueOf() - d.valueOf()) / 6048e5)).toString();
      };
      h.dateFormats.E = function (b) {
        return this.dateFormat("%a", b, !0).charAt(0);
      };
      F(u, "afterSetChartSize", function () {
        this.axes.forEach(function (b) {
          ((b.grid && b.grid.columns) || []).forEach(function (b) {
            b.setAxisSize();
            b.setAxisTranslation();
          });
        });
      });
      F(D, "afterGetLabelPosition", function (b) {
        var d = this.label,
          f = this.axis,
          e = f.reversed,
          g = f.chart,
          c = f.options.grid || {},
          k = f.options.labels,
          a = k.align,
          l = I.Side[f.side],
          h = b.tickmarkOffset,
          m = f.tickPositions,
          p = this.pos - h;
        m = z(m[b.index + 1]) ? m[b.index + 1] - h : f.max + h;
        var r = f.tickSize("tick");
        h = r ? r[0] : 0;
        r = r ? r[1] / 2 : 0;
        if (!0 === c.enabled) {
          if ("top" === l) {
            c = f.top + f.offset;
            var u = c - h;
          } else
            "bottom" === l
              ? ((u = g.chartHeight - f.bottom + f.offset), (c = u + h))
              : ((c = f.top + f.len - f.translate(e ? m : p)),
                (u = f.top + f.len - f.translate(e ? p : m)));
          "right" === l
            ? ((l = g.chartWidth - f.right + f.offset), (e = l + h))
            : "left" === l
            ? ((e = f.left + f.offset), (l = e - h))
            : ((l = Math.round(f.left + f.translate(e ? m : p)) - r),
              (e = Math.round(f.left + f.translate(e ? p : m)) - r));
          this.slotWidth = e - l;
          b.pos.x = "left" === a ? l : "right" === a ? e : l + (e - l) / 2;
          b.pos.y = u + (c - u) / 2;
          g = g.renderer.fontMetrics(k.style.fontSize, d.element);
          d = d.getBBox().height;
          k.useHTML
            ? (b.pos.y += g.b + -(d / 2))
            : ((d = Math.round(d / g.h)),
              (b.pos.y += (g.b - (g.h - g.f)) / 2 + -(((d - 1) * g.h) / 2)));
          b.pos.x += (f.horiz && k.x) || 0;
        }
      });
      F(D, "labelFormat", function (b) {
        var d = b.axis,
          f = b.value;
        if (d.options.grid && d.options.grid.enabled) {
          var e = d.tickPositions,
            g = (d.linkedParent || d).series[0],
            c = f === e[0];
          e = f === e[e.length - 1];
          var k =
              g &&
              G(g.options.data, function (a) {
                return a[d.isXAxis ? "x" : "y"] === f;
              }),
            a = void 0;
          k &&
            g.is("gantt") &&
            ((a = m(k)), h.seriesTypes.gantt.prototype.pointClass.setGanttPointAliases(a));
          b.isFirst = c;
          b.isLast = e;
          b.point = a;
        }
      });
      var l = (function () {
          function b(b) {
            this.axis = b;
          }
          b.prototype.isOuterAxis = function () {
            var b = this.axis,
              f = b.grid.columnIndex,
              e = (b.linkedParent && b.linkedParent.grid.columns) || b.grid.columns,
              g = f ? b.linkedParent : b,
              c = -1,
              k = 0;
            b.chart[b.coll].forEach(function (a, d) {
              a.side !== b.side || a.options.isInternal || ((k = d), a === g && (c = d));
            });
            return k === c && (z(f) ? e.length === f : !0);
          };
          b.prototype.renderBorder = function (b) {
            var d = this.axis,
              f = d.chart.renderer,
              g = d.options;
            b = f.path(b).addClass("highcharts-axis-line").add(d.axisBorder);
            f.styledMode || b.attr({ stroke: g.lineColor, "stroke-width": g.lineWidth, zIndex: 7 });
            return b;
          };
          return b;
        })(),
        I = (function () {
          function k() {}
          k.compose = function (b) {
            e.keepProps.push("grid");
            A(b.prototype, "unsquish", k.wrapUnsquish);
            F(b, "init", k.onInit);
            F(b, "afterGetOffset", k.onAfterGetOffset);
            F(b, "afterGetTitlePosition", k.onAfterGetTitlePosition);
            F(b, "afterInit", k.onAfterInit);
            F(b, "afterRender", k.onAfterRender);
            F(b, "afterSetAxisTranslation", k.onAfterSetAxisTranslation);
            F(b, "afterSetOptions", k.onAfterSetOptions);
            F(b, "afterSetOptions", k.onAfterSetOptions2);
            F(b, "afterSetScale", k.onAfterSetScale);
            F(b, "afterTickSize", k.onAfterTickSize);
            F(b, "trimTicks", k.onTrimTicks);
            F(b, "destroy", k.onDestroy);
          };
          k.onAfterGetOffset = function () {
            var b = this.grid;
            ((b && b.columns) || []).forEach(function (b) {
              b.getOffset();
            });
          };
          k.onAfterGetTitlePosition = function (b) {
            if (!0 === (this.options.grid || {}).enabled) {
              var d = this.axisTitle,
                e = this.height,
                g = this.horiz,
                c = this.left,
                l = this.offset,
                a = this.opposite,
                h = this.options,
                m = this.top,
                u = this.width,
                p = this.tickSize(),
                r = d && d.getBBox().width,
                t = h.title.x,
                v = h.title.y,
                N = f(h.title.margin, g ? 5 : 10);
              d = this.chart.renderer.fontMetrics(h.title.style.fontSize, d).f;
              p =
                (g ? m + e : c) +
                (g ? 1 : -1) * (a ? -1 : 1) * (p ? p[0] / 2 : 0) +
                (this.side === k.Side.bottom ? d : 0);
              b.titlePosition.x = g ? c - (r || 0) / 2 - N + t : p + (a ? u : 0) + l + t;
              b.titlePosition.y = g ? p - (a ? e : 0) + (a ? d : -d) / 2 + l + v : m - N + v;
            }
          };
          k.onAfterInit = function () {
            var b = this.chart,
              k = this.options.grid;
            k = void 0 === k ? {} : k;
            var l = this.userOptions;
            if (k.enabled) {
              var g = this.options;
              g.labels.align = f(g.labels.align, "center");
              this.categories || (g.showLastLabel = !1);
              this.labelRotation = 0;
              g.labels.rotation = 0;
            }
            if (k.columns) {
              g = this.grid.columns = [];
              for (var c = (this.grid.columnIndex = 0); ++c < k.columns.length; ) {
                var h = m(l, k.columns[k.columns.length - c - 1], {
                  linkedTo: 0,
                  type: "category",
                  scrollbar: { enabled: !1 },
                });
                delete h.grid.columns;
                h = new e(this.chart, h);
                h.grid.isColumn = !0;
                h.grid.columnIndex = c;
                C(b.axes, h);
                C(b[this.coll], h);
                g.push(h);
              }
            }
          };
          k.onAfterRender = function () {
            var b = this.grid,
              f = this.options;
            if (!0 === (f.grid || {}).enabled) {
              this.maxLabelDimensions = this.getMaxLabelDimensions(this.ticks, this.tickPositions);
              this.rightWall && this.rightWall.destroy();
              if (this.grid && this.grid.isOuterAxis() && this.axisLine && (f = f.lineWidth)) {
                f = this.getLinePath(f);
                var e = f[0],
                  g = f[1],
                  c =
                    ((this.tickSize("tick") || [1])[0] - 1) *
                    (this.side === k.Side.top || this.side === k.Side.left ? -1 : 1);
                "M" === e[0] &&
                  "L" === g[0] &&
                  (this.horiz ? ((e[2] += c), (g[2] += c)) : ((e[1] += c), (g[1] += c)));
                !this.horiz &&
                  this.chart.marginRight &&
                  ((e = [e, ["L", this.left, e[2]]]),
                  (c = [
                    "L",
                    this.chart.chartWidth - this.chart.marginRight,
                    this.toPixels(this.max + this.tickmarkOffset),
                  ]),
                  (g = [["M", g[1], this.toPixels(this.max + this.tickmarkOffset)], c]),
                  this.grid.upperBorder ||
                    0 === this.min % 1 ||
                    (this.grid.upperBorder = this.grid.renderBorder(e)),
                  this.grid.upperBorder && this.grid.upperBorder.animate({ d: e }),
                  this.grid.lowerBorder ||
                    0 === this.max % 1 ||
                    (this.grid.lowerBorder = this.grid.renderBorder(g)),
                  this.grid.lowerBorder && this.grid.lowerBorder.animate({ d: g }));
                this.grid.axisLineExtra
                  ? this.grid.axisLineExtra.animate({ d: f })
                  : (this.grid.axisLineExtra = this.grid.renderBorder(f));
                this.axisLine[this.showAxis ? "show" : "hide"](!0);
              }
              ((b && b.columns) || []).forEach(function (c) {
                c.render();
              });
              !this.horiz &&
                this.chart.hasRendered &&
                (this.scrollbar || (this.linkedParent && this.linkedParent.scrollbar)) &&
                ((b = this.max),
                (f = this.tickmarkOffset),
                (g = this.tickPositions[this.tickPositions.length - 1]),
                (e = this.tickPositions[0]),
                this.min - e > f ? this.ticks[e].label.hide() : this.ticks[e].label.show(),
                g - b > f ? this.ticks[g].label.hide() : this.ticks[g].label.show(),
                g - b < f && 0 < g - b && this.ticks[g].isLast
                  ? this.ticks[g].mark.hide()
                  : this.ticks[g - 1] && this.ticks[g - 1].mark.show());
            }
          };
          k.onAfterSetAxisTranslation = function () {
            var b = this.tickPositions && this.tickPositions.info,
              f = this.options,
              e = this.userOptions.labels || {};
            (f.grid || {}).enabled &&
              (this.horiz
                ? (this.series.forEach(function (b) {
                    b.options.pointRange = 0;
                  }),
                  b &&
                    f.dateTimeLabelFormats &&
                    f.labels &&
                    !E(e.align) &&
                    (!1 === f.dateTimeLabelFormats[b.unitName].range || 1 < b.count) &&
                    ((f.labels.align = "left"), E(e.x) || (f.labels.x = 3)))
                : "treegrid" !== this.options.type &&
                  this.grid &&
                  this.grid.columns &&
                  (this.minPointOffset = this.tickInterval));
          };
          k.onAfterSetOptions = function (d) {
            var e = this.options;
            d = d.userOptions;
            var k = e && y.isObject(e.grid, !0) ? e.grid : {};
            if (!0 === k.enabled) {
              var g = m(
                !0,
                {
                  className: "highcharts-grid-axis " + (d.className || ""),
                  dateTimeLabelFormats: {
                    hour: { list: ["%H:%M", "%H"] },
                    day: { list: ["%A, %e. %B", "%a, %e. %b", "%E"] },
                    week: { list: ["Week %W", "W%W"] },
                    month: { list: ["%B", "%b", "%o"] },
                  },
                  grid: { borderWidth: 1 },
                  labels: { padding: 2, style: { fontSize: "13px" } },
                  margin: 0,
                  title: { text: null, reserveSpace: !1, rotation: 0 },
                  units: [
                    ["millisecond", [1, 10, 100]],
                    ["second", [1, 10]],
                    ["minute", [1, 5, 15]],
                    ["hour", [1, 6]],
                    ["day", [1]],
                    ["week", [1]],
                    ["month", [1]],
                    ["year", null],
                  ],
                },
                d
              );
              "xAxis" === this.coll &&
                (E(d.linkedTo) && !E(d.tickPixelInterval) && (g.tickPixelInterval = 350),
                E(d.tickPixelInterval) ||
                  !E(d.linkedTo) ||
                  E(d.tickPositioner) ||
                  E(d.tickInterval) ||
                  (g.tickPositioner = function (c, d) {
                    var a =
                      this.linkedParent &&
                      this.linkedParent.tickPositions &&
                      this.linkedParent.tickPositions.info;
                    if (a) {
                      var f = void 0,
                        e = void 0,
                        k = void 0,
                        l,
                        h = g.units;
                      for (l = 0; l < h.length; l++)
                        if (h[l][0] === a.unitName) {
                          f = l;
                          break;
                        }
                      h[f + 1]
                        ? ((k = h[f + 1][0]), (e = (h[f + 1][1] || [1])[0]))
                        : "year" === a.unitName && ((k = "year"), (e = 10 * a.count));
                      a = b[k];
                      this.tickInterval = a * e;
                      return this.getTimeTicks(
                        { unitRange: a, count: e, unitName: k },
                        c,
                        d,
                        this.options.startOfWeek
                      );
                    }
                  }));
              m(!0, this.options, g);
              this.horiz &&
                ((e.minPadding = f(d.minPadding, 0)), (e.maxPadding = f(d.maxPadding, 0)));
              z(e.grid.borderWidth) && (e.tickWidth = e.lineWidth = k.borderWidth);
            }
          };
          k.onAfterSetOptions2 = function (b) {
            b = ((b = b.userOptions) && b.grid) || {};
            var d = b.columns;
            b.enabled && d && m(!0, this.options, d[d.length - 1]);
          };
          k.onAfterSetScale = function () {
            (this.grid.columns || []).forEach(function (b) {
              b.setScale();
            });
          };
          k.onAfterTickSize = function (b) {
            var d = e.defaultLeftAxisOptions,
              f = this.horiz,
              g = this.maxLabelDimensions,
              c = this.options.grid;
            c = void 0 === c ? {} : c;
            c.enabled &&
              g &&
              ((d = 2 * Math.abs(d.labels.x)),
              (f = f ? c.cellHeight || d + g.height : d + g.width),
              t(b.tickSize) ? (b.tickSize[0] = f) : (b.tickSize = [f, 0]));
          };
          k.onDestroy = function (b) {
            var d = this.grid;
            (d.columns || []).forEach(function (d) {
              d.destroy(b.keepEvents);
            });
            d.columns = void 0;
          };
          k.onInit = function (b) {
            b = b.userOptions || {};
            var d = b.grid || {};
            d.enabled && E(d.borderColor) && (b.tickColor = b.lineColor = d.borderColor);
            this.grid || (this.grid = new l(this));
          };
          k.onTrimTicks = function () {
            var b = this.options,
              f = this.categories,
              e = this.tickPositions,
              g = e[0],
              c = e[e.length - 1],
              k = (this.linkedParent && this.linkedParent.min) || this.min,
              a = (this.linkedParent && this.linkedParent.max) || this.max,
              l = this.tickInterval;
            !0 !== (b.grid || {}).enabled ||
              f ||
              (!this.horiz && !this.isLinked) ||
              (g < k && g + l > k && !b.startOnTick && (e[0] = k),
              c > a && c - l < a && !b.endOnTick && (e[e.length - 1] = a));
          };
          k.wrapUnsquish = function (b) {
            var d = this.options.grid;
            return !0 === (void 0 === d ? {} : d).enabled && this.categories
              ? this.tickInterval
              : b.apply(this, Array.prototype.slice.call(arguments, 1));
          };
          return k;
        })();
      (function (b) {
        b = b.Side || (b.Side = {});
        b[(b.top = 0)] = "top";
        b[(b.right = 1)] = "right";
        b[(b.bottom = 2)] = "bottom";
        b[(b.left = 3)] = "left";
      })(I || (I = {}));
      I.compose(e);
      return I;
    }
  );
  P(
    e,
    "Core/Axis/BrokenAxis.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Series/Series.js"],
      e["Extensions/Stacking.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y) {
      var F = y.addEvent,
        E = y.find,
        C = y.fireEvent,
        G = y.isArray,
        t = y.isNumber,
        z = y.pick,
        m = (function () {
          function f(b) {
            this.hasBreaks = !1;
            this.axis = b;
          }
          f.isInBreak = function (b, f) {
            var e = b.repeat || Infinity,
              l = b.from,
              h = b.to - b.from;
            f = f >= l ? (f - l) % e : e - ((l - f) % e);
            return b.inclusive ? f <= h : f < h && 0 !== f;
          };
          f.lin2Val = function (b) {
            var e = this.brokenAxis;
            e = e && e.breakArray;
            if (!e || !t(b)) return b;
            var h;
            for (h = 0; h < e.length; h++) {
              var l = e[h];
              if (l.from >= b) break;
              else l.to < b ? (b += l.len) : f.isInBreak(l, b) && (b += l.len);
            }
            return b;
          };
          f.val2Lin = function (b) {
            var e = this.brokenAxis;
            e = e && e.breakArray;
            if (!e || !t(b)) return b;
            var h = b,
              l;
            for (l = 0; l < e.length; l++) {
              var m = e[l];
              if (m.to <= b) h -= m.len;
              else if (m.from >= b) break;
              else if (f.isInBreak(m, b)) {
                h -= b - m.from;
                break;
              }
            }
            return h;
          };
          f.prototype.findBreakAt = function (b, f) {
            return E(f, function (f) {
              return f.from < b && b < f.to;
            });
          };
          f.prototype.isInAnyBreak = function (b, e) {
            var h = this.axis,
              l = h.options.breaks || [],
              m = l.length,
              k;
            if (m && t(b)) {
              for (; m--; )
                if (f.isInBreak(l[m], b)) {
                  var d = !0;
                  k || (k = z(l[m].showPoints, !h.isXAxis));
                }
              var w = d && e ? d && !k : d;
            }
            return w;
          };
          f.prototype.setBreaks = function (b, h) {
            var m = this,
              l = m.axis,
              A = G(b) && !!b.length;
            l.isDirty = m.hasBreaks !== A;
            m.hasBreaks = A;
            l.options.breaks = l.userOptions.breaks = b;
            l.forceRedraw = !0;
            l.series.forEach(function (b) {
              b.isDirty = !0;
            });
            A || l.val2lin !== f.val2Lin || (delete l.val2lin, delete l.lin2val);
            A &&
              ((l.userOptions.ordinal = !1),
              (l.lin2val = f.lin2Val),
              (l.val2lin = f.val2Lin),
              (l.setExtremes = function (b, d, f, l, g) {
                if (m.hasBreaks) {
                  for (var c, k = this.options.breaks; (c = m.findBreakAt(b, k)); ) b = c.to;
                  for (; (c = m.findBreakAt(d, k)); ) d = c.from;
                  d < b && (d = b);
                }
                e.prototype.setExtremes.call(this, b, d, f, l, g);
              }),
              (l.setAxisTranslation = function () {
                e.prototype.setAxisTranslation.call(this);
                m.unitLength = void 0;
                if (m.hasBreaks) {
                  var b = l.options.breaks || [],
                    d = [],
                    h = [],
                    n = 0,
                    g,
                    c = l.userMin || l.min,
                    q = l.userMax || l.max,
                    a = z(l.pointRangePadding, 0),
                    u;
                  b.forEach(function (a) {
                    g = a.repeat || Infinity;
                    t(c) &&
                      t(q) &&
                      (f.isInBreak(a, c) && (c += (a.to % g) - (c % g)),
                      f.isInBreak(a, q) && (q -= (q % g) - (a.from % g)));
                  });
                  b.forEach(function (a) {
                    I = a.from;
                    g = a.repeat || Infinity;
                    if (t(c) && t(q)) {
                      for (; I - g > c; ) I -= g;
                      for (; I < c; ) I += g;
                      for (u = I; u < q; u += g)
                        d.push({ value: u, move: "in" }),
                          d.push({ value: u + a.to - a.from, move: "out", size: a.breakSize });
                    }
                  });
                  d.sort(function (a, b) {
                    return a.value === b.value
                      ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1)
                      : a.value - b.value;
                  });
                  var A = 0;
                  var I = c;
                  d.forEach(function (a) {
                    A += "in" === a.move ? 1 : -1;
                    1 === A && "in" === a.move && (I = a.value);
                    0 === A &&
                      t(I) &&
                      (h.push({ from: I, to: a.value, len: a.value - I - (a.size || 0) }),
                      (n += a.value - I - (a.size || 0)));
                  });
                  m.breakArray = h;
                  t(c) &&
                    t(q) &&
                    t(l.min) &&
                    ((m.unitLength = q - c - n + a),
                    C(l, "afterBreaks"),
                    l.staticScale
                      ? (l.transA = l.staticScale)
                      : m.unitLength && (l.transA *= (q - l.min + a) / m.unitLength),
                    a && (l.minPixelPadding = l.transA * (l.minPointOffset || 0)),
                    (l.min = c),
                    (l.max = q));
                }
              }));
            z(h, !0) && l.chart.redraw();
          };
          return f;
        })();
      y = (function () {
        function f() {}
        f.compose = function (b, f) {
          b.keepProps.push("brokenAxis");
          var e = h.prototype;
          e.drawBreaks = function (b, f) {
            var e = this,
              d = e.points,
              h,
              l,
              g,
              c;
            if (b && b.brokenAxis && b.brokenAxis.hasBreaks) {
              var m = b.brokenAxis;
              f.forEach(function (a) {
                h = (m && m.breakArray) || [];
                l = b.isXAxis ? b.min : z(e.options.threshold, b.min);
                d.forEach(function (d) {
                  c = z(d["stack" + a.toUpperCase()], d[a]);
                  h.forEach(function (a) {
                    if (t(l) && t(c)) {
                      g = !1;
                      if ((l < a.from && c > a.to) || (l > a.from && c < a.from)) g = "pointBreak";
                      else if (
                        (l < a.from && c > a.from && c < a.to) ||
                        (l > a.from && c > a.to && c < a.from)
                      )
                        g = "pointInBreak";
                      g && C(b, g, { point: d, brk: a });
                    }
                  });
                });
              });
            }
          };
          e.gappedPath = function () {
            var b = this.currentDataGrouping,
              f = b && b.gapSize;
            b = this.options.gapSize;
            var e = this.points.slice(),
              d = e.length - 1,
              h = this.yAxis,
              m;
            if (b && 0 < d)
              for (
                "value" !== this.options.gapUnit && (b *= this.basePointRange),
                  f && f > b && f >= this.basePointRange && (b = f),
                  m = void 0;
                d--;

              )
                (m && !1 !== m.visible) || (m = e[d + 1]),
                  (f = e[d]),
                  !1 !== m.visible &&
                    !1 !== f.visible &&
                    (m.x - f.x > b &&
                      ((m = (f.x + m.x) / 2),
                      e.splice(d + 1, 0, { isNull: !0, x: m }),
                      h.stacking &&
                        this.options.stacking &&
                        ((m = h.stacking.stacks[this.stackKey][m] = new D(
                          h,
                          h.options.stackLabels,
                          !1,
                          m,
                          this.stack
                        )),
                        (m.total = 0))),
                    (m = f));
            return this.getGraphPath(e);
          };
          F(b, "init", function () {
            this.brokenAxis || (this.brokenAxis = new m(this));
          });
          F(b, "afterInit", function () {
            "undefined" !== typeof this.brokenAxis &&
              this.brokenAxis.setBreaks(this.options.breaks, !1);
          });
          F(b, "afterSetTickPositions", function () {
            var b = this.brokenAxis;
            if (b && b.hasBreaks) {
              var f = this.tickPositions,
                e = this.tickPositions.info,
                d = [],
                h;
              for (h = 0; h < f.length; h++) b.isInAnyBreak(f[h]) || d.push(f[h]);
              this.tickPositions = d;
              this.tickPositions.info = e;
            }
          });
          F(b, "afterSetOptions", function () {
            this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1);
          });
          F(f, "afterGeneratePoints", function () {
            var b = this.options.connectNulls,
              f = this.points,
              e = this.xAxis,
              d = this.yAxis;
            if (this.isDirty)
              for (var h = f.length; h--; ) {
                var m = f[h],
                  g =
                    !(null === m.y && !1 === b) &&
                    ((e && e.brokenAxis && e.brokenAxis.isInAnyBreak(m.x, !0)) ||
                      (d && d.brokenAxis && d.brokenAxis.isInAnyBreak(m.y, !0)));
                m.visible = g ? !1 : !1 !== m.options.visible;
              }
          });
          F(f, "afterRender", function () {
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, z(this.pointArrayMap, ["y"]));
          });
        };
        return f;
      })();
      y.compose(e, h);
      return y;
    }
  );
  P(
    e,
    "Core/Axis/TreeGridAxis.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Axis/Tick.js"],
      e["Gantt/Tree.js"],
      e["Core/Axis/TreeGridTick.js"],
      e["Mixins/TreeSeries.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E) {
      var C = F.getLevelOptions,
        G = E.addEvent,
        t = E.find,
        z = E.fireEvent,
        m = E.isArray,
        f = E.isObject,
        b = E.isString,
        A = E.merge,
        u = E.pick,
        l = E.wrap,
        I;
      (function (e) {
        function d(a, b) {
          var c = a.collapseStart || 0;
          a = a.collapseEnd || 0;
          a >= b && (c -= 0.5);
          return { from: c, to: a, showPoints: !1 };
        }
        function k(a, c, d) {
          var g = [],
            e = [],
            k = {},
            h = {},
            l = -1,
            m = "boolean" === typeof c ? c : !1;
          a = D.getTree(a, {
            after: function (a) {
              a = h[a.pos];
              var b = 0,
                c = 0;
              a.children.forEach(function (a) {
                c += (a.descendants || 0) + 1;
                b = Math.max((a.height || 0) + 1, b);
              });
              a.descendants = c;
              a.height = b;
              a.collapsed && e.push(a);
            },
            before: function (a) {
              var c = f(a.data, !0) ? a.data : {},
                d = b(c.name) ? c.name : "",
                e = k[a.parent];
              e = f(e, !0) ? h[e.pos] : null;
              var p = function (a) {
                  return a.name === d;
                },
                n;
              m && f(e, !0) && (n = t(e.children, p)) ? ((p = n.pos), n.nodes.push(a)) : (p = l++);
              h[p] ||
                ((h[p] = n = {
                  depth: e ? e.depth + 1 : 0,
                  name: d,
                  id: c.id,
                  nodes: [a],
                  children: [],
                  pos: p,
                }),
                -1 !== p && g.push(d),
                f(e, !0) && e.children.push(n));
              b(a.id) && (k[a.id] = a);
              n && !0 === c.collapsed && (n.collapsed = !0);
              a.pos = p;
            },
          });
          h = (function (a, b) {
            var c = function (a, d, g) {
              var e = d + (-1 === d ? 0 : b - 1),
                k = (e - d) / 2,
                h = d + k;
              a.nodes.forEach(function (a) {
                var b = a.data;
                f(b, !0) && ((b.y = d + (b.seriesIndex || 0)), delete b.seriesIndex);
                a.pos = h;
              });
              g[h] = a;
              a.pos = h;
              a.tickmarkOffset = k + 0.5;
              a.collapseStart = e + 0.5;
              a.children.forEach(function (a) {
                c(a, e + 1, g);
                e = (a.collapseEnd || 0) - 0.5;
              });
              a.collapseEnd = e + 0.5;
              return g;
            };
            return c(a["-1"], -1, {});
          })(h, d);
          return {
            categories: g,
            mapOfIdToNode: k,
            mapOfPosToGridNode: h,
            collapsedNodes: e,
            tree: a,
          };
        }
        function n(a) {
          a.target.axes
            .filter(function (a) {
              return "treegrid" === a.options.type;
            })
            .forEach(function (b) {
              var c = b.options || {},
                d = c.labels,
                g = c.uniqueNames,
                e = 0;
              c = c.max;
              if (
                !b.treeGrid.mapOfPosToGridNode ||
                b.series.some(function (a) {
                  return !a.hasRendered || a.isDirtyData || a.isDirty;
                })
              ) {
                var h = b.series.reduce(function (a, b) {
                  b.visible &&
                    ((b.options.data || []).forEach(function (c) {
                      b.options.keys &&
                        b.options.keys.length &&
                        ((c = b.pointClass.prototype.optionsToObject.call({ series: b }, c)),
                        b.pointClass.setGanttPointAliases(c));
                      f(c, !0) && ((c.seriesIndex = e), a.push(c));
                    }),
                    !0 === g && e++);
                  return a;
                }, []);
                if (c && h.length < c)
                  for (var l = h.length; l <= c; l++) h.push({ name: l + "\u200b" });
                c = k(h, g || !1, !0 === g ? e : 1);
                b.categories = c.categories;
                b.treeGrid.mapOfPosToGridNode = c.mapOfPosToGridNode;
                b.hasNames = !0;
                b.treeGrid.tree = c.tree;
                b.series.forEach(function (a) {
                  var b = (a.options.data || []).map(function (b) {
                    m(b) &&
                      a.options.keys &&
                      a.options.keys.length &&
                      h.forEach(function (a) {
                        0 <= b.indexOf(a.x) && 0 <= b.indexOf(a.x2) && (b = a);
                      });
                    return f(b, !0) ? A(b) : b;
                  });
                  a.visible && a.setData(b, !1);
                });
                b.treeGrid.mapOptionsToLevel = C({
                  defaults: d,
                  from: 1,
                  levels: d && d.levels,
                  to: b.treeGrid.tree && b.treeGrid.tree.height,
                });
                "beforeRender" === a.type && (b.treeGrid.collapsedNodes = c.collapsedNodes);
              }
            });
        }
        function g(a, b) {
          var c = this.treeGrid.mapOptionsToLevel || {},
            d = this.ticks,
            f = d[b],
            g;
          if ("treegrid" === this.options.type && this.treeGrid.mapOfPosToGridNode) {
            var e = this.treeGrid.mapOfPosToGridNode[b];
            (c = c[e.depth]) && (g = { labels: c });
            f
              ? ((f.parameters.category = e.name), (f.options = g), f.addLabel())
              : (d[b] = new h(this, b, void 0, void 0, {
                  category: e.name,
                  tickmarkOffset: e.tickmarkOffset,
                  options: g,
                }));
          } else a.apply(this, Array.prototype.slice.call(arguments, 1));
        }
        function c(a) {
          var b = this.options,
            c = a.apply(this, Array.prototype.slice.call(arguments, 1));
          if ("treegrid" === b.type && this.treeGrid.mapOfPosToGridNode) {
            var d = this.treeGrid.mapOfPosToGridNode[-1].height || 0;
            c.width += b.labels.indentation * (d - 1);
          }
          return c;
        }
        function q(a, b, c) {
          var d = this,
            f = "treegrid" === c.type;
          d.treeGrid || (d.treeGrid = new I(d));
          f &&
            (G(b, "beforeRender", n),
            G(b, "beforeRedraw", n),
            G(b, "addSeries", function (a) {
              a.options.data &&
                ((a = k(a.options.data, c.uniqueNames || !1, 1)),
                (d.treeGrid.collapsedNodes = (d.treeGrid.collapsedNodes || []).concat(
                  a.collapsedNodes
                )));
            }),
            G(d, "foundExtremes", function () {
              d.treeGrid.collapsedNodes &&
                d.treeGrid.collapsedNodes.forEach(function (a) {
                  var b = d.treeGrid.collapse(a);
                  d.brokenAxis &&
                    (d.brokenAxis.setBreaks(b, !1),
                    d.treeGrid.collapsedNodes &&
                      (d.treeGrid.collapsedNodes = d.treeGrid.collapsedNodes.filter(function (b) {
                        return (
                          a.collapseStart !== b.collapseStart || a.collapseEnd !== b.collapseEnd
                        );
                      })));
                });
            }),
            G(d, "afterBreaks", function () {
              "yAxis" === d.coll &&
                !d.staticScale &&
                d.chart.options.chart.height &&
                (d.isDirty = !0);
            }),
            (c = A(
              {
                grid: { enabled: !0 },
                labels: {
                  align: "left",
                  levels: [{ level: void 0 }, { level: 1, style: { fontWeight: "bold" } }],
                  symbol: { type: "triangle", x: -5, y: -5, height: 10, width: 10, padding: 5 },
                },
                uniqueNames: !1,
              },
              c,
              { reversed: !0, grid: { columns: void 0 } }
            )));
          a.apply(d, [b, c]);
          f && ((d.hasNames = !0), (d.options.showLastLabel = !0));
        }
        function a(a) {
          var b = this.options;
          "treegrid" === b.type
            ? ((this.min = u(this.userMin, b.min, this.dataMin)),
              (this.max = u(this.userMax, b.max, this.dataMax)),
              z(this, "foundExtremes"),
              this.setAxisTranslation(),
              (this.tickmarkOffset = 0.5),
              (this.tickInterval = 1),
              (this.tickPositions = this.treeGrid.mapOfPosToGridNode
                ? this.treeGrid.getTickPositions()
                : []))
            : a.apply(this, Array.prototype.slice.call(arguments, 1));
        }
        var B = !1;
        e.compose = function (b) {
          B ||
            (l(b.prototype, "generateTick", g),
            l(b.prototype, "getMaxLabelDimensions", c),
            l(b.prototype, "init", q),
            l(b.prototype, "setTickInterval", a),
            y.compose(h),
            (B = !0));
        };
        var I = (function () {
          function a(a) {
            this.axis = a;
          }
          a.prototype.setCollapsedStatus = function (a) {
            var b = this.axis,
              c = b.chart;
            b.series.forEach(function (b) {
              var d = b.options.data;
              if (a.id && d) {
                var f = c.get(a.id);
                b = d[b.data.indexOf(f)];
                f && b && ((f.collapsed = a.collapsed), (b.collapsed = a.collapsed));
              }
            });
          };
          a.prototype.collapse = function (a) {
            var b = this.axis,
              c = b.options.breaks || [],
              f = d(a, b.max);
            c.push(f);
            a.collapsed = !0;
            b.treeGrid.setCollapsedStatus(a);
            return c;
          };
          a.prototype.expand = function (a) {
            var b = this.axis,
              c = b.options.breaks || [],
              f = d(a, b.max);
            a.collapsed = !1;
            b.treeGrid.setCollapsedStatus(a);
            return c.reduce(function (a, b) {
              (b.to === f.to && b.from === f.from) || a.push(b);
              return a;
            }, []);
          };
          a.prototype.getTickPositions = function () {
            var a = this.axis,
              b = Math.floor(a.min / a.tickInterval) * a.tickInterval,
              c = Math.ceil(a.max / a.tickInterval) * a.tickInterval;
            return Object.keys(a.treeGrid.mapOfPosToGridNode || {}).reduce(function (d, f) {
              f = +f;
              !(f >= b && f <= c) || (a.brokenAxis && a.brokenAxis.isInAnyBreak(f)) || d.push(f);
              return d;
            }, []);
          };
          a.prototype.isCollapsed = function (a) {
            var b = this.axis,
              c = b.options.breaks || [],
              f = d(a, b.max);
            return c.some(function (a) {
              return a.from === f.from && a.to === f.to;
            });
          };
          a.prototype.toggleCollapse = function (a) {
            return this.isCollapsed(a) ? this.expand(a) : this.collapse(a);
          };
          return a;
        })();
        e.Additions = I;
      })(I || (I = {}));
      e.prototype.utils = { getNode: D.getNode };
      I.compose(e);
      return I;
    }
  );
  P(
    e,
    "Extensions/CurrentDateIndication.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Color/Palette.js"],
      e["Core/Utilities.js"],
      e["Core/Axis/PlotLineOrBand.js"],
    ],
    function (e, h, D, y) {
      var F = D.addEvent,
        E = D.merge;
      D = D.wrap;
      var C = {
        color: h.highlightColor20,
        width: 2,
        label: {
          format: "%a, %b %d %Y, %H:%M",
          formatter: function (e, h) {
            return this.axis.chart.time.dateFormat(h || "", e);
          },
          rotation: 0,
          style: { fontSize: "10px" },
        },
      };
      F(e, "afterSetOptions", function () {
        var e = this.options,
          h = e.currentDateIndicator;
        h &&
          ((h = "object" === typeof h ? E(C, h) : E(C)),
          (h.value = Date.now()),
          (h.className = "highcharts-current-date-indicator"),
          e.plotLines || (e.plotLines = []),
          e.plotLines.push(h));
      });
      F(y, "render", function () {
        this.label && this.label.attr({ text: this.getLabelText(this.options.label) });
      });
      D(y.prototype, "getLabelText", function (e, h) {
        var t = this.options;
        return t &&
          t.className &&
          -1 !== t.className.indexOf("highcharts-current-date-indicator") &&
          t.label &&
          "function" === typeof t.label.formatter
          ? ((t.value = Date.now()), t.label.formatter.call(this, t.value, t.label.format))
          : e.call(this, h);
      });
    }
  );
  P(
    e,
    "Extensions/StaticScale.js",
    [e["Core/Axis/Axis.js"], e["Core/Chart/Chart.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      var y = D.addEvent,
        F = D.defined,
        E = D.isNumber,
        C = D.pick;
      y(e, "afterSetOptions", function () {
        var e = this.chart.options.chart;
        !this.horiz &&
          E(this.options.staticScale) &&
          (!e.height || (e.scrollablePlotArea && e.scrollablePlotArea.minHeight)) &&
          (this.staticScale = this.options.staticScale);
      });
      h.prototype.adjustHeight = function () {
        "adjustHeight" !== this.redrawTrigger &&
          ((this.axes || []).forEach(function (e) {
            var h = e.chart,
              z = !!h.initiatedScale && h.options.animation,
              m = e.options.staticScale;
            if (e.staticScale && F(e.min)) {
              var f =
                C(e.brokenAxis && e.brokenAxis.unitLength, e.max + e.tickInterval - e.min) * m;
              f = Math.max(f, m);
              m = f - h.plotHeight;
              !h.scrollablePixelsY &&
                1 <= Math.abs(m) &&
                ((h.plotHeight = f),
                (h.redrawTrigger = "adjustHeight"),
                h.setSize(void 0, h.chartHeight + m, z));
              e.series.forEach(function (b) {
                (b = b.sharedClipKey && h.sharedClips[b.sharedClipKey]) &&
                  b.attr(h.inverted ? { width: h.plotHeight } : { height: h.plotHeight });
              });
            }
          }),
          (this.initiatedScale = !0));
        this.redrawTrigger = null;
      };
      y(h, "render", h.prototype.adjustHeight);
    }
  );
  P(e, "Extensions/ArrowSymbols.js", [e["Core/Renderer/SVG/SVGRenderer.js"]], function (e) {
    e.prototype.symbols.arrow = function (e, D, y, F) {
      return [
        ["M", e, D + F / 2],
        ["L", e + y, D],
        ["L", e, D + F / 2],
        ["L", e + y, D + F],
      ];
    };
    e.prototype.symbols["arrow-half"] = function (h, D, y, F) {
      return e.prototype.symbols.arrow(h, D, y / 2, F);
    };
    e.prototype.symbols["triangle-left"] = function (e, D, y, F) {
      return [["M", e + y, D], ["L", e, D + F / 2], ["L", e + y, D + F], ["Z"]];
    };
    e.prototype.symbols["arrow-filled"] = e.prototype.symbols["triangle-left"];
    e.prototype.symbols["triangle-left-half"] = function (h, D, y, F) {
      return e.prototype.symbols["triangle-left"](h, D, y / 2, F);
    };
    e.prototype.symbols["arrow-filled-half"] = e.prototype.symbols["triangle-left-half"];
  });
  P(
    e,
    "Gantt/Connection.js",
    [e["Core/Globals.js"], e["Core/Options.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]],
    function (e, h, D, y) {
      function F(b) {
        var f = b.shapeArgs;
        return f
          ? {
              xMin: f.x || 0,
              xMax: (f.x || 0) + (f.width || 0),
              yMin: f.y || 0,
              yMax: (f.y || 0) + (f.height || 0),
            }
          : (f = b.graphic && b.graphic.getBBox())
          ? {
              xMin: b.plotX - f.width / 2,
              xMax: b.plotX + f.width / 2,
              yMin: b.plotY - f.height / 2,
              yMax: b.plotY + f.height / 2,
            }
          : null;
      }
      ("");
      var E = y.defined,
        C = y.error,
        G = y.extend,
        t = y.merge,
        z = y.objectEach,
        m = e.deg2rad,
        f = Math.max,
        b = Math.min;
      G(h.defaultOptions, {
        connectors: {
          type: "straight",
          lineWidth: 1,
          marker: {
            enabled: !1,
            align: "center",
            verticalAlign: "middle",
            inside: !1,
            lineWidth: 1,
          },
          startMarker: { symbol: "diamond" },
          endMarker: { symbol: "arrow-filled" },
        },
      });
      h = (function () {
        function e(b, f, e) {
          this.toPoint = this.pathfinder = this.graphics = this.fromPoint = this.chart = void 0;
          this.init(b, f, e);
        }
        e.prototype.init = function (b, f, e) {
          this.fromPoint = b;
          this.toPoint = f;
          this.options = e;
          this.chart = b.series.chart;
          this.pathfinder = this.chart.pathfinder;
        };
        e.prototype.renderPath = function (b, f, e) {
          var k = this.chart,
            d = k.styledMode,
            h = k.pathfinder,
            l = !k.options.chart.forExport && !1 !== e,
            g = this.graphics && this.graphics.path;
          h.group ||
            (h.group = k.renderer
              .g()
              .addClass("highcharts-pathfinder-group")
              .attr({ zIndex: -1 })
              .add(k.seriesGroup));
          h.group.translate(k.plotLeft, k.plotTop);
          (g && g.renderer) || ((g = k.renderer.path().add(h.group)), d || g.attr({ opacity: 0 }));
          g.attr(f);
          b = { d: b };
          d || (b.opacity = 1);
          g[l ? "animate" : "attr"](b, e);
          this.graphics = this.graphics || {};
          this.graphics.path = g;
        };
        e.prototype.addMarker = function (b, f, e) {
          var k = this.fromPoint.series.chart,
            d = k.pathfinder;
          k = k.renderer;
          var h = "start" === b ? this.fromPoint : this.toPoint,
            l = h.getPathfinderAnchorPoint(f);
          if (
            f.enabled &&
            (((e = "start" === b ? e[1] : e[e.length - 2]) && "M" === e[0]) || "L" === e[0])
          ) {
            e = { x: e[1], y: e[2] };
            e = h.getRadiansToVector(e, l);
            l = h.getMarkerVector(e, f.radius, l);
            e = -e / m;
            if (f.width && f.height) {
              var g = f.width;
              var c = f.height;
            } else g = c = 2 * f.radius;
            this.graphics = this.graphics || {};
            l = {
              x: l.x - g / 2,
              y: l.y - c / 2,
              width: g,
              height: c,
              rotation: e,
              rotationOriginX: l.x,
              rotationOriginY: l.y,
            };
            this.graphics[b]
              ? this.graphics[b].animate(l)
              : ((this.graphics[b] = k
                  .symbol(f.symbol)
                  .addClass("highcharts-point-connecting-path-" + b + "-marker")
                  .attr(l)
                  .add(d.group)),
                k.styledMode ||
                  this.graphics[b]
                    .attr({
                      fill: f.color || this.fromPoint.color,
                      stroke: f.lineColor,
                      "stroke-width": f.lineWidth,
                      opacity: 0,
                    })
                    .animate({ opacity: 1 }, h.series.options.animation));
          }
        };
        e.prototype.getPath = function (b) {
          var f = this.pathfinder,
            e = this.chart,
            k = f.algorithms[b.type],
            d = f.chartObstacles;
          if ("function" !== typeof k)
            return (
              C('"' + b.type + '" is not a Pathfinder algorithm.'), { path: [], obstacles: [] }
            );
          k.requiresObstacles &&
            !d &&
            ((d = f.chartObstacles = f.getChartObstacles(b)),
            (e.options.connectors.algorithmMargin = b.algorithmMargin),
            (f.chartObstacleMetrics = f.getObstacleMetrics(d)));
          return k(
            this.fromPoint.getPathfinderAnchorPoint(b.startMarker),
            this.toPoint.getPathfinderAnchorPoint(b.endMarker),
            t(
              {
                chartObstacles: d,
                lineObstacles: f.lineObstacles || [],
                obstacleMetrics: f.chartObstacleMetrics,
                hardBounds: { xMin: 0, xMax: e.plotWidth, yMin: 0, yMax: e.plotHeight },
                obstacleOptions: { margin: b.algorithmMargin },
                startDirectionX: f.getAlgorithmStartDirection(b.startMarker),
              },
              b
            )
          );
        };
        e.prototype.render = function () {
          var e = this.fromPoint,
            h = e.series,
            m = h.chart,
            k = m.pathfinder,
            d = t(m.options.connectors, h.options.connectors, e.options.connectors, this.options),
            w = {};
          m.styledMode ||
            ((w.stroke = d.lineColor || e.color),
            (w["stroke-width"] = d.lineWidth),
            d.dashStyle && (w.dashstyle = d.dashStyle));
          w["class"] = "highcharts-point-connecting-path highcharts-color-" + e.colorIndex;
          d = t(w, d);
          E(d.marker.radius) ||
            (d.marker.radius = b(f(Math.ceil((d.algorithmMargin || 8) / 2) - 1, 1), 5));
          e = this.getPath(d);
          m = e.path;
          e.obstacles &&
            ((k.lineObstacles = k.lineObstacles || []),
            (k.lineObstacles = k.lineObstacles.concat(e.obstacles)));
          this.renderPath(m, w, h.options.animation);
          this.addMarker("start", t(d.marker, d.startMarker), m);
          this.addMarker("end", t(d.marker, d.endMarker), m);
        };
        e.prototype.destroy = function () {
          this.graphics &&
            (z(this.graphics, function (b) {
              b.destroy();
            }),
            delete this.graphics);
        };
        return e;
      })();
      e.Connection = h;
      G(D.prototype, {
        getPathfinderAnchorPoint: function (b) {
          var f = F(this);
          switch (b.align) {
            case "right":
              var e = "xMax";
              break;
            case "left":
              e = "xMin";
          }
          switch (b.verticalAlign) {
            case "top":
              var h = "yMin";
              break;
            case "bottom":
              h = "yMax";
          }
          return { x: e ? f[e] : (f.xMin + f.xMax) / 2, y: h ? f[h] : (f.yMin + f.yMax) / 2 };
        },
        getRadiansToVector: function (b, f) {
          var e;
          E(f) || ((e = F(this)) && (f = { x: (e.xMin + e.xMax) / 2, y: (e.yMin + e.yMax) / 2 }));
          return Math.atan2(f.y - b.y, b.x - f.x);
        },
        getMarkerVector: function (b, f, e) {
          var h = 2 * Math.PI,
            k = F(this),
            d = k.xMax - k.xMin,
            l = k.yMax - k.yMin,
            m = Math.atan2(l, d),
            g = !1;
          d /= 2;
          var c = l / 2,
            q = k.xMin + d;
          k = k.yMin + c;
          for (var a = q, t = k, u = 1, A = 1; b < -Math.PI; ) b += h;
          for (; b > Math.PI; ) b -= h;
          h = Math.tan(b);
          b > -m && b <= m
            ? ((A = -1), (g = !0))
            : b > m && b <= Math.PI - m
            ? (A = -1)
            : b > Math.PI - m || b <= -(Math.PI - m)
            ? ((u = -1), (g = !0))
            : (u = -1);
          g ? ((a += u * d), (t += A * d * h)) : ((a += (l / (2 * h)) * u), (t += A * c));
          e.x !== q && (a = e.x);
          e.y !== k && (t = e.y);
          return { x: a + f * Math.cos(b), y: t - f * Math.sin(b) };
        },
      });
      return h;
    }
  );
  P(e, "Gantt/PathfinderAlgorithms.js", [e["Core/Utilities.js"]], function (e) {
    function h(e, f, b) {
      b = b || 0;
      var h = e.length - 1;
      f -= 1e-7;
      for (var m, l; b <= h; )
        if (((m = (h + b) >> 1), (l = f - e[m].xMin), 0 < l)) b = m + 1;
        else if (0 > l) h = m - 1;
        else return m;
      return 0 < b ? b - 1 : 0;
    }
    function D(e, f) {
      for (var b = h(e, f.x + 1) + 1; b--; ) {
        var m;
        if ((m = e[b].xMax >= f.x))
          (m = e[b]), (m = f.x <= m.xMax && f.x >= m.xMin && f.y <= m.yMax && f.y >= m.yMin);
        if (m) return b;
      }
      return -1;
    }
    function y(e) {
      var f = [];
      if (e.length) {
        f.push(["M", e[0].start.x, e[0].start.y]);
        for (var b = 0; b < e.length; ++b) f.push(["L", e[b].end.x, e[b].end.y]);
      }
      return f;
    }
    function F(e, f) {
      e.yMin = G(e.yMin, f.yMin);
      e.yMax = C(e.yMax, f.yMax);
      e.xMin = G(e.xMin, f.xMin);
      e.xMax = C(e.xMax, f.xMax);
    }
    var E = e.pick,
      C = Math.min,
      G = Math.max,
      t = Math.abs;
    e = function (e, f, b) {
      function h(b, c, d, a, f) {
        b = { x: b.x, y: b.y };
        b[c] = d[a || c] + (f || 0);
        return b;
      }
      function m(b, c, d) {
        var a = t(c[d] - b[d + "Min"]) > t(c[d] - b[d + "Max"]);
        return h(c, d, b, d + (a ? "Max" : "Min"), a ? 1 : -1);
      }
      var l = [],
        z = E(b.startDirectionX, t(f.x - e.x) > t(f.y - e.y)) ? "x" : "y",
        k = b.chartObstacles,
        d = D(k, e);
      b = D(k, f);
      if (-1 < b) {
        var w = k[b];
        b = m(w, f, z);
        w = { start: b, end: f };
        var n = b;
      } else n = f;
      -1 < d &&
        ((k = k[d]),
        (b = m(k, e, z)),
        l.push({ start: e, end: b }),
        b[z] >= e[z] === b[z] >= n[z] &&
          ((z = "y" === z ? "x" : "y"),
          (f = e[z] < f[z]),
          l.push({ start: b, end: h(b, z, k, z + (f ? "Max" : "Min"), f ? 1 : -1) }),
          (z = "y" === z ? "x" : "y")));
      e = l.length ? l[l.length - 1].end : e;
      b = h(e, z, n);
      l.push({ start: e, end: b });
      z = h(b, "y" === z ? "x" : "y", n);
      l.push({ start: b, end: z });
      l.push(w);
      return { path: y(l), obstacles: l };
    };
    e.requiresObstacles = !0;
    var z = function (e, f, b) {
      function m(a, b, c) {
        var d,
          f = a.x < b.x ? 1 : -1;
        if (a.x < b.x) {
          var e = a;
          var g = b;
        } else (e = b), (g = a);
        if (a.y < b.y) {
          var k = a;
          var l = b;
        } else (k = b), (l = a);
        for (
          d = 0 > f ? C(h(J, g.x), J.length - 1) : 0;
          J[d] && ((0 < f && J[d].xMin <= g.x) || (0 > f && J[d].xMax >= e.x));

        ) {
          if (J[d].xMin <= g.x && J[d].xMax >= e.x && J[d].yMin <= l.y && J[d].yMax >= k.y)
            return c
              ? { y: a.y, x: a.x < b.x ? J[d].xMin - 1 : J[d].xMax + 1, obstacle: J[d] }
              : { x: a.x, y: a.y < b.y ? J[d].yMin - 1 : J[d].yMax + 1, obstacle: J[d] };
          d += f;
        }
        return b;
      }
      function u(a, b, c, d, f) {
        var e = f.soft,
          g = f.hard,
          k = d ? "x" : "y",
          h = { x: b.x, y: b.y },
          l = { x: b.x, y: b.y };
        f = a[k + "Max"] >= e[k + "Max"];
        e = a[k + "Min"] <= e[k + "Min"];
        var p = a[k + "Max"] >= g[k + "Max"];
        g = a[k + "Min"] <= g[k + "Min"];
        var n = t(a[k + "Min"] - b[k]),
          v = t(a[k + "Max"] - b[k]);
        c = 10 > t(n - v) ? b[k] < c[k] : v < n;
        l[k] = a[k + "Min"];
        h[k] = a[k + "Max"];
        a = m(b, l, d)[k] !== l[k];
        b = m(b, h, d)[k] !== h[k];
        c = a ? (b ? c : !0) : b ? !1 : c;
        c = e ? (f ? c : !0) : f ? !1 : c;
        return g ? (p ? c : !0) : p ? !1 : c;
      }
      function l(d, f, e) {
        if (d.x === f.x && d.y === f.y) return [];
        var g = e ? "x" : "y",
          k = b.obstacleOptions.margin;
        var h = { soft: { xMin: c, xMax: q, yMin: a, yMax: B }, hard: b.hardBounds };
        var p = D(J, d);
        if (-1 < p) {
          p = J[p];
          h = u(p, d, f, e, h);
          F(p, b.hardBounds);
          var v = e
            ? { y: d.y, x: p[h ? "xMax" : "xMin"] + (h ? 1 : -1) }
            : { x: d.x, y: p[h ? "yMax" : "yMin"] + (h ? 1 : -1) };
          var r = D(J, v);
          -1 < r &&
            ((r = J[r]),
            F(r, b.hardBounds),
            (v[g] = h
              ? G(p[g + "Max"] - k + 1, (r[g + "Min"] + p[g + "Max"]) / 2)
              : C(p[g + "Min"] + k - 1, (r[g + "Max"] + p[g + "Min"]) / 2)),
            d.x === v.x && d.y === v.y
              ? (n &&
                  (v[g] = h
                    ? G(p[g + "Max"], r[g + "Max"]) + 1
                    : C(p[g + "Min"], r[g + "Min"]) - 1),
                (n = !n))
              : (n = !1));
          d = [{ start: d, end: v }];
        } else
          (g = m(d, { x: e ? f.x : d.x, y: e ? d.y : f.y }, e)),
            (d = [{ start: d, end: { x: g.x, y: g.y } }]),
            g[e ? "x" : "y"] !== f[e ? "x" : "y"] &&
              ((h = u(g.obstacle, g, f, !e, h)),
              F(g.obstacle, b.hardBounds),
              (h = {
                x: e ? g.x : g.obstacle[h ? "xMax" : "xMin"] + (h ? 1 : -1),
                y: e ? g.obstacle[h ? "yMax" : "yMin"] + (h ? 1 : -1) : g.y,
              }),
              (e = !e),
              (d = d.concat(l({ x: g.x, y: g.y }, h, e))));
        return (d = d.concat(l(d[d.length - 1].end, f, !e)));
      }
      function z(a, c, d) {
        var f = C(a.xMax - c.x, c.x - a.xMin) < C(a.yMax - c.y, c.y - a.yMin);
        d = u(a, c, d, f, { soft: b.hardBounds, hard: b.hardBounds });
        return f
          ? { y: c.y, x: a[d ? "xMax" : "xMin"] + (d ? 1 : -1) }
          : { x: c.x, y: a[d ? "yMax" : "yMin"] + (d ? 1 : -1) };
      }
      var k = E(b.startDirectionX, t(f.x - e.x) > t(f.y - e.y)),
        d = k ? "x" : "y",
        w = [],
        n = !1,
        g = b.obstacleMetrics,
        c = C(e.x, f.x) - g.maxWidth - 10,
        q = G(e.x, f.x) + g.maxWidth + 10,
        a = C(e.y, f.y) - g.maxHeight - 10,
        B = G(e.y, f.y) + g.maxHeight + 10,
        J = b.chartObstacles;
      var O = h(J, c);
      g = h(J, q);
      J = J.slice(O, g + 1);
      if (-1 < (g = D(J, f))) {
        var p = z(J[g], f, e);
        w.push({ end: f, start: p });
        f = p;
      }
      for (; -1 < (g = D(J, f)); )
        (O = 0 > f[d] - e[d]),
          (p = { x: f.x, y: f.y }),
          (p[d] = J[g][O ? d + "Max" : d + "Min"] + (O ? 1 : -1)),
          w.push({ end: f, start: p }),
          (f = p);
      e = l(e, f, k);
      e = e.concat(w.reverse());
      return { path: y(e), obstacles: e };
    };
    z.requiresObstacles = !0;
    return {
      fastAvoid: z,
      straight: function (e, f) {
        return {
          path: [
            ["M", e.x, e.y],
            ["L", f.x, f.y],
          ],
          obstacles: [{ start: e, end: f }],
        };
      },
      simpleConnect: e,
    };
  });
  P(
    e,
    "Gantt/Pathfinder.js",
    [
      e["Gantt/Connection.js"],
      e["Core/Chart/Chart.js"],
      e["Core/Globals.js"],
      e["Core/Options.js"],
      e["Core/Series/Point.js"],
      e["Core/Utilities.js"],
      e["Gantt/PathfinderAlgorithms.js"],
    ],
    function (e, h, D, y, F, E, C) {
      function G(b) {
        var d = b.shapeArgs;
        return d
          ? {
              xMin: d.x || 0,
              xMax: (d.x || 0) + (d.width || 0),
              yMin: d.y || 0,
              yMax: (d.y || 0) + (d.height || 0),
            }
          : (d = b.graphic && b.graphic.getBBox())
          ? {
              xMin: b.plotX - d.width / 2,
              xMax: b.plotX + d.width / 2,
              yMin: b.plotY - d.height / 2,
              yMax: b.plotY + d.height / 2,
            }
          : null;
      }
      function t(b) {
        for (
          var f = b.length,
            c = 0,
            e,
            a,
            h = [],
            m = function (a, b, c) {
              c = l(c, 10);
              var f = a.yMax + c > b.yMin - c && a.yMin - c < b.yMax + c,
                e = a.xMax + c > b.xMin - c && a.xMin - c < b.xMax + c,
                g = f ? (a.xMin > b.xMax ? a.xMin - b.xMax : b.xMin - a.xMax) : Infinity,
                k = e ? (a.yMin > b.yMax ? a.yMin - b.yMax : b.yMin - a.yMax) : Infinity;
              return e && f ? (c ? m(a, b, Math.floor(c / 2)) : Infinity) : d(g, k);
            };
          c < f;
          ++c
        )
          for (e = c + 1; e < f; ++e) (a = m(b[c], b[e])), 80 > a && h.push(a);
        h.push(80);
        return k(
          Math.floor(
            h.sort(function (a, b) {
              return a - b;
            })[Math.floor(h.length / 10)] /
              2 -
              1
          ),
          1
        );
      }
      function z(d) {
        if (
          d.options.pathfinder ||
          d.series.reduce(function (b, c) {
            c.options &&
              u(!0, (c.options.connectors = c.options.connectors || {}), c.options.pathfinder);
            return b || (c.options && c.options.pathfinder);
          }, !1)
        )
          u(!0, (d.options.connectors = d.options.connectors || {}), d.options.pathfinder),
            b(
              'WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.'
            );
      }
      ("");
      var m = E.addEvent,
        f = E.defined,
        b = E.error,
        A = E.extend,
        u = E.merge,
        l = E.pick,
        I = E.splat,
        k = Math.max,
        d = Math.min;
      A(y.defaultOptions, {
        connectors: {
          type: "straight",
          lineWidth: 1,
          marker: {
            enabled: !1,
            align: "center",
            verticalAlign: "middle",
            inside: !1,
            lineWidth: 1,
          },
          startMarker: { symbol: "diamond" },
          endMarker: { symbol: "arrow-filled" },
        },
      });
      var w = (function () {
        function b(b) {
          this.lineObstacles = this.group = this.connections = this.chartObstacleMetrics = this.chartObstacles = this.chart = void 0;
          this.init(b);
        }
        b.prototype.init = function (b) {
          this.chart = b;
          this.connections = [];
          m(b, "redraw", function () {
            this.pathfinder.update();
          });
        };
        b.prototype.update = function (b) {
          var c = this.chart,
            d = this,
            a = d.connections;
          d.connections = [];
          c.series.forEach(function (a) {
            a.visible &&
              !a.options.isInternal &&
              a.points.forEach(function (a) {
                var b = a.options;
                b && b.dependency && (b.connect = b.dependency);
                var f;
                b = a.options && a.options.connect && I(a.options.connect);
                a.visible &&
                  !1 !== a.isInside &&
                  b &&
                  b.forEach(function (b) {
                    f = c.get("string" === typeof b ? b : b.to);
                    f instanceof F &&
                      f.series.visible &&
                      f.visible &&
                      !1 !== f.isInside &&
                      d.connections.push(new e(a, f, "string" === typeof b ? {} : b));
                  });
              });
          });
          for (
            var f = 0, g = void 0, k = void 0, h = a.length, l = d.connections.length;
            f < h;
            ++f
          ) {
            k = !1;
            for (g = 0; g < l; ++g)
              if (
                a[f].fromPoint === d.connections[g].fromPoint &&
                a[f].toPoint === d.connections[g].toPoint
              ) {
                d.connections[g].graphics = a[f].graphics;
                k = !0;
                break;
              }
            k || a[f].destroy();
          }
          delete this.chartObstacles;
          delete this.lineObstacles;
          d.renderConnections(b);
        };
        b.prototype.renderConnections = function (b) {
          b
            ? this.chart.series.forEach(function (b) {
                var c = function () {
                  var a = b.chart.pathfinder;
                  ((a && a.connections) || []).forEach(function (a) {
                    a.fromPoint && a.fromPoint.series === b && a.render();
                  });
                  b.pathfinderRemoveRenderEvent &&
                    (b.pathfinderRemoveRenderEvent(), delete b.pathfinderRemoveRenderEvent);
                };
                !1 === b.options.animation
                  ? c()
                  : (b.pathfinderRemoveRenderEvent = m(b, "afterAnimate", c));
              })
            : this.connections.forEach(function (b) {
                b.render();
              });
        };
        b.prototype.getChartObstacles = function (b) {
          for (
            var c = [], d = this.chart.series, a = l(b.algorithmMargin, 0), e, g = 0, k = d.length;
            g < k;
            ++g
          )
            if (d[g].visible && !d[g].options.isInternal) {
              var h = 0,
                m = d[g].points.length,
                n = void 0;
              for (n = void 0; h < m; ++h)
                (n = d[g].points[h]),
                  n.visible &&
                    (n = G(n)) &&
                    c.push({
                      xMin: n.xMin - a,
                      xMax: n.xMax + a,
                      yMin: n.yMin - a,
                      yMax: n.yMax + a,
                    });
            }
          c = c.sort(function (a, b) {
            return a.xMin - b.xMin;
          });
          f(b.algorithmMargin) ||
            ((e = b.algorithmMargin = t(c)),
            c.forEach(function (a) {
              a.xMin -= e;
              a.xMax += e;
              a.yMin -= e;
              a.yMax += e;
            }));
          return c;
        };
        b.prototype.getObstacleMetrics = function (b) {
          for (var c = 0, d = 0, a, f, e = b.length; e--; )
            (a = b[e].xMax - b[e].xMin),
              (f = b[e].yMax - b[e].yMin),
              c < a && (c = a),
              d < f && (d = f);
          return { maxHeight: d, maxWidth: c };
        };
        b.prototype.getAlgorithmStartDirection = function (b) {
          var c = "top" !== b.verticalAlign && "bottom" !== b.verticalAlign;
          return "left" !== b.align && "right" !== b.align ? (c ? void 0 : !1) : c ? !0 : void 0;
        };
        return b;
      })();
      w.prototype.algorithms = C;
      D.Pathfinder = w;
      A(F.prototype, {
        getPathfinderAnchorPoint: function (b) {
          var d = G(this);
          switch (b.align) {
            case "right":
              var c = "xMax";
              break;
            case "left":
              c = "xMin";
          }
          switch (b.verticalAlign) {
            case "top":
              var f = "yMin";
              break;
            case "bottom":
              f = "yMax";
          }
          return { x: c ? d[c] : (d.xMin + d.xMax) / 2, y: f ? d[f] : (d.yMin + d.yMax) / 2 };
        },
        getRadiansToVector: function (b, d) {
          var c;
          f(d) || ((c = G(this)) && (d = { x: (c.xMin + c.xMax) / 2, y: (c.yMin + c.yMax) / 2 }));
          return Math.atan2(d.y - b.y, b.x - d.x);
        },
        getMarkerVector: function (b, d, c) {
          var f = 2 * Math.PI,
            a = G(this),
            e = a.xMax - a.xMin,
            g = a.yMax - a.yMin,
            k = Math.atan2(g, e),
            h = !1;
          e /= 2;
          var l = g / 2,
            m = a.xMin + e;
          a = a.yMin + l;
          for (var n = m, t = a, u = 1, w = 1; b < -Math.PI; ) b += f;
          for (; b > Math.PI; ) b -= f;
          f = Math.tan(b);
          b > -k && b <= k
            ? ((w = -1), (h = !0))
            : b > k && b <= Math.PI - k
            ? (w = -1)
            : b > Math.PI - k || b <= -(Math.PI - k)
            ? ((u = -1), (h = !0))
            : (u = -1);
          h ? ((n += u * e), (t += w * e * f)) : ((n += (g / (2 * f)) * u), (t += w * l));
          c.x !== m && (n = c.x);
          c.y !== a && (t = c.y);
          return { x: n + d * Math.cos(b), y: t - d * Math.sin(b) };
        },
      });
      h.prototype.callbacks.push(function (b) {
        !1 !== b.options.connectors.enabled &&
          (z(b), (this.pathfinder = new w(this)), this.pathfinder.update(!0));
      });
      return w;
    }
  );
  P(
    e,
    "Series/Gantt/GanttSeries.js",
    [e["Series/Gantt/GanttPoint.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      var y =
          (this && this.__extends) ||
          (function () {
            var e = function (f, b) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, f) {
                    b.__proto__ = f;
                  }) ||
                function (b, f) {
                  for (var e in f) f.hasOwnProperty(e) && (b[e] = f[e]);
                };
              return e(f, b);
            };
            return function (f, b) {
              function h() {
                this.constructor = f;
              }
              e(f, b);
              f.prototype = null === b ? Object.create(b) : ((h.prototype = b.prototype), new h());
            };
          })(),
        F = h.series,
        E = h.seriesTypes.xrange,
        C = D.extend,
        G = D.isNumber,
        t = D.merge,
        z = D.splat;
      D = (function (e) {
        function f() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        y(f, e);
        f.prototype.drawPoint = function (b, f) {
          var e = this.options,
            h = this.chart.renderer,
            m = b.shapeArgs,
            k = b.plotY,
            d = b.graphic,
            t = b.selected && "select",
            n = e.stacking && !e.borderRadius;
          if (b.options.milestone)
            if (G(k) && null !== b.y && !1 !== b.visible) {
              m = h.symbols.diamond(m.x || 0, m.y || 0, m.width || 0, m.height || 0);
              if (d) d[f]({ d: m });
              else
                b.graphic = h
                  .path(m)
                  .addClass(b.getClassName(), !0)
                  .add(b.group || this.group);
              this.chart.styledMode ||
                b.graphic.attr(this.pointAttribs(b, t)).shadow(e.shadow, null, n);
            } else d && (b.graphic = d.destroy());
          else E.prototype.drawPoint.call(this, b, f);
        };
        f.prototype.translatePoint = function (b) {
          E.prototype.translatePoint.call(this, b);
          if (b.options.milestone) {
            var f = b.shapeArgs;
            var e = f.height || 0;
            b.shapeArgs = { x: (f.x || 0) - e / 2, y: f.y, width: e, height: e };
          }
        };
        f.defaultOptions = t(E.defaultOptions, {
          grouping: !1,
          dataLabels: { enabled: !0 },
          tooltip: {
            headerFormat: '<span style="font-size: 10px">{series.name}</span><br/>',
            pointFormat: null,
            pointFormatter: function () {
              var b = this.series,
                f = b.chart.tooltip,
                e = b.xAxis,
                h = b.tooltipOptions.dateTimeLabelFormats,
                m = e.options.startOfWeek,
                k = b.tooltipOptions,
                d = k.xDateFormat,
                t = this.options.milestone,
                n = "<b>" + (this.name || this.yCategory) + "</b>";
              if (k.pointFormat) return this.tooltipFormatter(k.pointFormat);
              d || (d = z(f.getDateFormat(e.closestPointRange, this.start, m, h))[0]);
              f = b.chart.time.dateFormat(d, this.start);
              b = b.chart.time.dateFormat(d, this.end);
              n += "<br/>";
              return t ? n + (f + "<br/>") : n + ("Start: " + f + "<br/>End: ") + (b + "<br/>");
            },
          },
          connectors: {
            type: "simpleConnect",
            animation: { reversed: !0 },
            startMarker: {
              enabled: !0,
              symbol: "arrow-filled",
              radius: 4,
              fill: "#fa0",
              align: "left",
            },
            endMarker: { enabled: !1, align: "right" },
          },
        });
        return f;
      })(E);
      C(D.prototype, {
        keyboardMoveVertical: !1,
        pointArrayMap: ["start", "end", "y"],
        pointClass: e,
        setData: F.prototype.setData,
      });
      h.registerSeriesType("gantt", D);
      ("");
      return D;
    }
  );
  P(
    e,
    "Core/Chart/GanttChart.js",
    [e["Core/Chart/Chart.js"], e["Core/Options.js"], e["Core/Utilities.js"]],
    function (e, h, D) {
      var y =
          (this && this.__extends) ||
          (function () {
            var e = function (h, m) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (f, b) {
                    f.__proto__ = b;
                  }) ||
                function (f, b) {
                  for (var e in b) b.hasOwnProperty(e) && (f[e] = b[e]);
                };
              return e(h, m);
            };
            return function (h, m) {
              function f() {
                this.constructor = h;
              }
              e(h, m);
              h.prototype = null === m ? Object.create(m) : ((f.prototype = m.prototype), new f());
            };
          })(),
        F = h.getOptions,
        E = D.isArray,
        C = D.merge,
        G = D.splat;
      e = (function (e) {
        function h() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        y(h, e);
        h.prototype.init = function (h, f) {
          var b = h.series,
            m = F(),
            t;
          E(h.xAxis) || (h.xAxis = [h.xAxis || {}, {}]);
          h.xAxis = h.xAxis.map(function (b, f) {
            1 === f && (t = 0);
            return C(m.xAxis, { grid: { enabled: !0 }, opposite: !0, linkedTo: t }, b, {
              type: "datetime",
            });
          });
          h.yAxis = G(h.yAxis || {}).map(function (b) {
            return C(
              m.yAxis,
              {
                grid: { enabled: !0 },
                staticScale: 50,
                reversed: !0,
                type: b.categories ? b.type : "treegrid",
              },
              b
            );
          });
          delete h.series;
          h = C(
            !0,
            {
              chart: { type: "gantt" },
              title: { text: null },
              legend: { enabled: !1 },
              navigator: { series: { type: "gantt" }, yAxis: { type: "category" } },
            },
            h,
            { isGantt: !0 }
          );
          h.series = b;
          e.prototype.init.call(this, h, f);
        };
        return h;
      })(e);
      (function (e) {
        e.ganttChart = function (h, m, f) {
          return new e(h, m, f);
        };
      })(e || (e = {}));
      return e;
    }
  );
  P(e, "Core/Axis/ScrollbarAxis.js", [e["Core/Utilities.js"]], function (e) {
    var h = e.addEvent,
      D = e.defined,
      y = e.pick;
    return (function () {
      function e() {}
      e.compose = function (e, C) {
        var E = function (e) {
          var h = y(e.options && e.options.min, e.min),
            m = y(e.options && e.options.max, e.max);
          return {
            axisMin: h,
            axisMax: m,
            scrollMin: D(e.dataMin) ? Math.min(h, e.min, e.dataMin, y(e.threshold, Infinity)) : h,
            scrollMax: D(e.dataMax) ? Math.max(m, e.max, e.dataMax, y(e.threshold, -Infinity)) : m,
          };
        };
        h(e, "afterInit", function () {
          var e = this;
          e.options &&
            e.options.scrollbar &&
            e.options.scrollbar.enabled &&
            ((e.options.scrollbar.vertical = !e.horiz),
            (e.options.startOnTick = e.options.endOnTick = !1),
            (e.scrollbar = new C(e.chart.renderer, e.options.scrollbar, e.chart)),
            h(e.scrollbar, "changed", function (h) {
              var m = E(e),
                f = m.axisMax,
                b = m.scrollMin,
                t = m.scrollMax - b;
              D(m.axisMin) &&
                D(f) &&
                ((e.horiz && !e.reversed) || (!e.horiz && e.reversed)
                  ? ((m = b + t * this.to), (b += t * this.from))
                  : ((m = b + t * (1 - this.from)), (b += t * (1 - this.to))),
                this.shouldUpdateExtremes(h.DOMType)
                  ? e.setExtremes(
                      b,
                      m,
                      !0,
                      "mousemove" !== h.DOMType && "touchmove" !== h.DOMType,
                      h
                    )
                  : this.setRange(this.from, this.to));
            }));
        });
        h(e, "afterRender", function () {
          var e = E(this),
            h = e.scrollMin,
            m = e.scrollMax;
          e = this.scrollbar;
          var f = this.axisTitleMargin + (this.titleOffset || 0),
            b = this.chart.scrollbarsOffsets,
            y = this.options.margin || 0;
          e &&
            (this.horiz
              ? (this.opposite || (b[1] += f),
                e.position(
                  this.left,
                  this.top + this.height + 2 + b[1] - (this.opposite ? y : 0),
                  this.width,
                  this.height
                ),
                this.opposite || (b[1] += y),
                (f = 1))
              : (this.opposite && (b[0] += f),
                e.position(
                  this.left + this.width + 2 + b[0] - (this.opposite ? 0 : y),
                  this.top,
                  this.width,
                  this.height
                ),
                this.opposite && (b[0] += y),
                (f = 0)),
            (b[f] += e.size + e.options.margin),
            isNaN(h) || isNaN(m) || !D(this.min) || !D(this.max) || this.min === this.max
              ? e.setRange(0, 1)
              : ((b = (this.min - h) / (m - h)),
                (h = (this.max - h) / (m - h)),
                (this.horiz && !this.reversed) || (!this.horiz && this.reversed)
                  ? e.setRange(b, h)
                  : e.setRange(1 - h, 1 - b)));
        });
        h(e, "afterGetOffset", function () {
          var e = this.horiz ? 2 : 1,
            h = this.scrollbar;
          h &&
            ((this.chart.scrollbarsOffsets = [0, 0]),
            (this.chart.axisOffset[e] += h.size + h.options.margin));
        });
      };
      return e;
    })();
  });
  P(
    e,
    "Core/Scrollbar.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Globals.js"],
      e["Core/Color/Palette.js"],
      e["Core/Axis/ScrollbarAxis.js"],
      e["Core/Utilities.js"],
      e["Core/Options.js"],
    ],
    function (e, h, D, y, F, E) {
      var C = F.addEvent,
        G = F.correctFloat,
        t = F.defined,
        z = F.destroyObjectProperties,
        m = F.fireEvent,
        f = F.merge,
        b = F.pick,
        A = F.removeEvent;
      F = E.defaultOptions;
      var u = h.isTouchDevice,
        l = (h.swapXY = function (b, e) {
          e &&
            b.forEach(function (b) {
              for (var d = b.length, e, f = 0; f < d; f += 2)
                (e = b[f + 1]), "number" === typeof e && ((b[f + 1] = b[f + 2]), (b[f + 2] = e));
            });
          return b;
        });
      E = (function () {
        function e(b, d, e) {
          this._events = [];
          this.from = this.chartY = this.chartX = 0;
          this.scrollbar = this.group = void 0;
          this.scrollbarButtons = [];
          this.scrollbarGroup = void 0;
          this.scrollbarLeft = 0;
          this.scrollbarRifles = void 0;
          this.scrollbarStrokeWidth = 1;
          this.to = this.size = this.scrollbarTop = 0;
          this.track = void 0;
          this.trackBorderWidth = 1;
          this.userOptions = {};
          this.y = this.x = 0;
          this.chart = e;
          this.options = d;
          this.renderer = e.renderer;
          this.init(b, d, e);
        }
        e.prototype.addEvents = function () {
          var b = this.options.inverted ? [1, 0] : [0, 1],
            d = this.scrollbarButtons,
            e = this.scrollbarGroup.element,
            f = this.track.element,
            g = this.mouseDownHandler.bind(this),
            c = this.mouseMoveHandler.bind(this),
            l = this.mouseUpHandler.bind(this);
          b = [
            [d[b[0]].element, "click", this.buttonToMinClick.bind(this)],
            [d[b[1]].element, "click", this.buttonToMaxClick.bind(this)],
            [f, "click", this.trackClick.bind(this)],
            [e, "mousedown", g],
            [e.ownerDocument, "mousemove", c],
            [e.ownerDocument, "mouseup", l],
          ];
          h.hasTouch &&
            b.push(
              [e, "touchstart", g],
              [e.ownerDocument, "touchmove", c],
              [e.ownerDocument, "touchend", l]
            );
          b.forEach(function (a) {
            C.apply(null, a);
          });
          this._events = b;
        };
        e.prototype.buttonToMaxClick = function (e) {
          var d = (this.to - this.from) * b(this.options.step, 0.2);
          this.updatePosition(this.from + d, this.to + d);
          m(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: e });
        };
        e.prototype.buttonToMinClick = function (e) {
          var d = G(this.to - this.from) * b(this.options.step, 0.2);
          this.updatePosition(G(this.from - d), G(this.to - d));
          m(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: e });
        };
        e.prototype.cursorToScrollbarPosition = function (b) {
          var d = this.options;
          d = d.minWidth > this.calculatedWidth ? d.minWidth : 0;
          return {
            chartX: (b.chartX - this.x - this.xOffset) / (this.barWidth - d),
            chartY: (b.chartY - this.y - this.yOffset) / (this.barWidth - d),
          };
        };
        e.prototype.destroy = function () {
          var b = this.chart.scroller;
          this.removeEvents();
          ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function (
            b
          ) {
            this[b] && this[b].destroy && (this[b] = this[b].destroy());
          },
          this);
          b && this === b.scrollbar && ((b.scrollbar = null), z(b.scrollbarButtons));
        };
        e.prototype.drawScrollbarButton = function (b) {
          var d = this.renderer,
            e = this.scrollbarButtons,
            f = this.options,
            g = this.size;
          var c = d.g().add(this.group);
          e.push(c);
          c = d.rect().addClass("highcharts-scrollbar-button").add(c);
          this.chart.styledMode ||
            c.attr({
              stroke: f.buttonBorderColor,
              "stroke-width": f.buttonBorderWidth,
              fill: f.buttonBackgroundColor,
            });
          c.attr(
            c.crisp(
              { x: -0.5, y: -0.5, width: g + 1, height: g + 1, r: f.buttonBorderRadius },
              c.strokeWidth()
            )
          );
          c = d
            .path(
              l(
                [
                  ["M", g / 2 + (b ? -1 : 1), g / 2 - 3],
                  ["L", g / 2 + (b ? -1 : 1), g / 2 + 3],
                  ["L", g / 2 + (b ? 2 : -2), g / 2],
                ],
                f.vertical
              )
            )
            .addClass("highcharts-scrollbar-arrow")
            .add(e[b]);
          this.chart.styledMode || c.attr({ fill: f.buttonArrowColor });
        };
        e.prototype.init = function (h, d, l) {
          this.scrollbarButtons = [];
          this.renderer = h;
          this.userOptions = d;
          this.options = f(e.defaultOptions, d);
          this.chart = l;
          this.size = b(this.options.size, this.options.height);
          d.enabled && (this.render(), this.addEvents());
        };
        e.prototype.mouseDownHandler = function (b) {
          b = this.chart.pointer.normalize(b);
          b = this.cursorToScrollbarPosition(b);
          this.chartX = b.chartX;
          this.chartY = b.chartY;
          this.initPositions = [this.from, this.to];
          this.grabbedCenter = !0;
        };
        e.prototype.mouseMoveHandler = function (b) {
          var d = this.chart.pointer.normalize(b),
            e = this.options.vertical ? "chartY" : "chartX",
            f = this.initPositions || [];
          !this.grabbedCenter ||
            (b.touches && 0 === b.touches[0][e]) ||
            ((d = this.cursorToScrollbarPosition(d)[e]),
            (e = this[e]),
            (e = d - e),
            (this.hasDragged = !0),
            this.updatePosition(f[0] + e, f[1] + e),
            this.hasDragged &&
              m(this, "changed", {
                from: this.from,
                to: this.to,
                trigger: "scrollbar",
                DOMType: b.type,
                DOMEvent: b,
              }));
        };
        e.prototype.mouseUpHandler = function (b) {
          this.hasDragged &&
            m(this, "changed", {
              from: this.from,
              to: this.to,
              trigger: "scrollbar",
              DOMType: b.type,
              DOMEvent: b,
            });
          this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null;
        };
        e.prototype.position = function (b, d, e, f) {
          var g = this.options.vertical,
            c = 0,
            h = this.rendered ? "animate" : "attr";
          this.x = b;
          this.y = d + this.trackBorderWidth;
          this.width = e;
          this.xOffset = this.height = f;
          this.yOffset = c;
          g
            ? ((this.width = this.yOffset = e = c = this.size),
              (this.xOffset = d = 0),
              (this.barWidth = f - 2 * e),
              (this.x = b += this.options.margin))
            : ((this.height = this.xOffset = f = d = this.size),
              (this.barWidth = e - 2 * f),
              (this.y += this.options.margin));
          this.group[h]({ translateX: b, translateY: this.y });
          this.track[h]({ width: e, height: f });
          this.scrollbarButtons[1][h]({ translateX: g ? 0 : e - d, translateY: g ? f - c : 0 });
        };
        e.prototype.removeEvents = function () {
          this._events.forEach(function (b) {
            A.apply(null, b);
          });
          this._events.length = 0;
        };
        e.prototype.render = function () {
          var b = this.renderer,
            d = this.options,
            e = this.size,
            f = this.chart.styledMode,
            g;
          this.group = g = b.g("scrollbar").attr({ zIndex: d.zIndex, translateY: -99999 }).add();
          this.track = b
            .rect()
            .addClass("highcharts-scrollbar-track")
            .attr({ x: 0, r: d.trackBorderRadius || 0, height: e, width: e })
            .add(g);
          f ||
            this.track.attr({
              fill: d.trackBackgroundColor,
              stroke: d.trackBorderColor,
              "stroke-width": d.trackBorderWidth,
            });
          this.trackBorderWidth = this.track.strokeWidth();
          this.track.attr({ y: (-this.trackBorderWidth % 2) / 2 });
          this.scrollbarGroup = b.g().add(g);
          this.scrollbar = b
            .rect()
            .addClass("highcharts-scrollbar-thumb")
            .attr({ height: e, width: e, r: d.barBorderRadius || 0 })
            .add(this.scrollbarGroup);
          this.scrollbarRifles = b
            .path(
              l(
                [
                  ["M", -3, e / 4],
                  ["L", -3, (2 * e) / 3],
                  ["M", 0, e / 4],
                  ["L", 0, (2 * e) / 3],
                  ["M", 3, e / 4],
                  ["L", 3, (2 * e) / 3],
                ],
                d.vertical
              )
            )
            .addClass("highcharts-scrollbar-rifles")
            .add(this.scrollbarGroup);
          f ||
            (this.scrollbar.attr({
              fill: d.barBackgroundColor,
              stroke: d.barBorderColor,
              "stroke-width": d.barBorderWidth,
            }),
            this.scrollbarRifles.attr({ stroke: d.rifleColor, "stroke-width": 1 }));
          this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
          this.scrollbarGroup.translate(
            (-this.scrollbarStrokeWidth % 2) / 2,
            (-this.scrollbarStrokeWidth % 2) / 2
          );
          this.drawScrollbarButton(0);
          this.drawScrollbarButton(1);
        };
        e.prototype.setRange = function (b, d) {
          var e = this.options,
            f = e.vertical,
            g = e.minWidth,
            c = this.barWidth,
            h,
            a =
              !this.rendered ||
              this.hasDragged ||
              (this.chart.navigator && this.chart.navigator.hasDragged)
                ? "attr"
                : "animate";
          if (t(c)) {
            b = Math.max(b, 0);
            var k = Math.ceil(c * b);
            this.calculatedWidth = h = G(c * Math.min(d, 1) - k);
            h < g && ((k = (c - g + h) * b), (h = g));
            g = Math.floor(k + this.xOffset + this.yOffset);
            c = h / 2 - 0.5;
            this.from = b;
            this.to = d;
            f
              ? (this.scrollbarGroup[a]({ translateY: g }),
                this.scrollbar[a]({ height: h }),
                this.scrollbarRifles[a]({ translateY: c }),
                (this.scrollbarTop = g),
                (this.scrollbarLeft = 0))
              : (this.scrollbarGroup[a]({ translateX: g }),
                this.scrollbar[a]({ width: h }),
                this.scrollbarRifles[a]({ translateX: c }),
                (this.scrollbarLeft = g),
                (this.scrollbarTop = 0));
            12 >= h ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0);
            !1 === e.showFull && (0 >= b && 1 <= d ? this.group.hide() : this.group.show());
            this.rendered = !0;
          }
        };
        e.prototype.shouldUpdateExtremes = function (e) {
          return (
            b(this.options.liveRedraw, h.svg && !h.isTouchDevice && !this.chart.isBoosting) ||
            "mouseup" === e ||
            "touchend" === e ||
            !t(e)
          );
        };
        e.prototype.trackClick = function (b) {
          var d = this.chart.pointer.normalize(b),
            e = this.to - this.from,
            f = this.y + this.scrollbarTop,
            g = this.x + this.scrollbarLeft;
          (this.options.vertical && d.chartY > f) || (!this.options.vertical && d.chartX > g)
            ? this.updatePosition(this.from + e, this.to + e)
            : this.updatePosition(this.from - e, this.to - e);
          m(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: b });
        };
        e.prototype.update = function (b) {
          this.destroy();
          this.init(this.chart.renderer, f(!0, this.options, b), this.chart);
        };
        e.prototype.updatePosition = function (b, d) {
          1 < d && ((b = G(1 - G(d - b))), (d = 1));
          0 > b && ((d = G(d - b)), (b = 0));
          this.from = b;
          this.to = d;
        };
        e.defaultOptions = {
          height: u ? 20 : 14,
          barBorderRadius: 0,
          buttonBorderRadius: 0,
          liveRedraw: void 0,
          margin: 10,
          minWidth: 6,
          step: 0.2,
          zIndex: 3,
          barBackgroundColor: D.neutralColor20,
          barBorderWidth: 1,
          barBorderColor: D.neutralColor20,
          buttonArrowColor: D.neutralColor80,
          buttonBackgroundColor: D.neutralColor10,
          buttonBorderColor: D.neutralColor20,
          buttonBorderWidth: 1,
          rifleColor: D.neutralColor80,
          trackBackgroundColor: D.neutralColor5,
          trackBorderColor: D.neutralColor5,
          trackBorderWidth: 1,
        };
        return e;
      })();
      h.Scrollbar ||
        ((F.scrollbar = f(!0, E.defaultOptions, F.scrollbar)), (h.Scrollbar = E), y.compose(e, E));
      return h.Scrollbar;
    }
  );
  P(
    e,
    "Extensions/RangeSelector.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Chart/Chart.js"],
      e["Core/Globals.js"],
      e["Core/Options.js"],
      e["Core/Color/Palette.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E, C) {
      function G(a) {
        if (-1 !== a.indexOf("%L")) return "text";
        var b = "aAdewbBmoyY".split("").some(function (b) {
            return -1 !== a.indexOf("%" + b);
          }),
          c = "HkIlMS".split("").some(function (b) {
            return -1 !== a.indexOf("%" + b);
          });
        return b && c ? "datetime-local" : b ? "date" : c ? "time" : "text";
      }
      var t = y.defaultOptions,
        z = C.addEvent,
        m = C.createElement,
        f = C.css,
        b = C.defined,
        A = C.destroyObjectProperties,
        u = C.discardElement,
        l = C.extend,
        I = C.find,
        k = C.fireEvent,
        d = C.isNumber,
        w = C.merge,
        n = C.objectEach,
        g = C.pad,
        c = C.pick,
        q = C.pInt,
        a = C.splat;
      l(t, {
        rangeSelector: {
          allButtonsEnabled: !1,
          buttons: void 0,
          buttonSpacing: 5,
          dropdown: "responsive",
          enabled: void 0,
          verticalAlign: "top",
          buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
          floating: !1,
          x: 0,
          y: 0,
          height: void 0,
          inputBoxBorderColor: "none",
          inputBoxHeight: 17,
          inputBoxWidth: void 0,
          inputDateFormat: "%b %e, %Y",
          inputDateParser: void 0,
          inputEditDateFormat: "%Y-%m-%d",
          inputEnabled: !0,
          inputPosition: { align: "right", x: 0, y: 0 },
          inputSpacing: 5,
          selected: void 0,
          buttonPosition: { align: "left", x: 0, y: 0 },
          inputStyle: { color: F.highlightColor80, cursor: "pointer" },
          labelStyle: { color: F.neutralColor60 },
        },
      });
      l(t.lang, { rangeSelectorZoom: "Zoom", rangeSelectorFrom: "", rangeSelectorTo: "\u2192" });
      var B = (function () {
        function h(a) {
          this.buttons = void 0;
          this.buttonOptions = h.prototype.defaultButtons;
          this.initialButtonGroupWidth = 0;
          this.options = void 0;
          this.chart = a;
          this.init(a);
        }
        h.prototype.clickButton = function (f, g) {
          var h = this.chart,
            l = this.buttonOptions[f],
            m = h.xAxis[0],
            p = (h.scroller && h.scroller.getUnionExtremes()) || m || {},
            n = p.dataMin,
            r = p.dataMax,
            q = m && Math.round(Math.min(m.max, c(r, m.max))),
            t = l.type;
          p = l._range;
          var u,
            w = l.dataGrouping;
          if (null !== n && null !== r) {
            h.fixedRange = p;
            this.setSelected(f);
            w &&
              ((this.forcedDataGrouping = !0),
              e.prototype.setDataGrouping.call(m || { chart: this.chart }, w, !1),
              (this.frozenStates = l.preserveDataGrouping));
            if ("month" === t || "year" === t)
              if (m) {
                t = { range: l, max: q, chart: h, dataMin: n, dataMax: r };
                var M = m.minFromRange.call(t);
                d(t.newMax) && (q = t.newMax);
              } else p = l;
            else if (p) (M = Math.max(q - p, n)), (q = Math.min(M + p, r));
            else if ("ytd" === t)
              if (m)
                "undefined" === typeof r &&
                  ((n = Number.MAX_VALUE),
                  (r = Number.MIN_VALUE),
                  h.series.forEach(function (a) {
                    a = a.xData;
                    n = Math.min(a[0], n);
                    r = Math.max(a[a.length - 1], r);
                  }),
                  (g = !1)),
                  (q = this.getYTDExtremes(r, n, h.time.useUTC)),
                  (M = u = q.min),
                  (q = q.max);
              else {
                this.deferredYTDClick = f;
                return;
              }
            else "all" === t && m && ((M = n), (q = r));
            b(M) && (M += l._offsetMin);
            b(q) && (q += l._offsetMax);
            this.dropdown && (this.dropdown.selectedIndex = f + 1);
            if (m)
              m.setExtremes(M, q, c(g, !0), void 0, {
                trigger: "rangeSelectorButton",
                rangeSelectorButton: l,
              });
            else {
              var y = a(h.options.xAxis)[0];
              var A = y.range;
              y.range = p;
              var B = y.min;
              y.min = u;
              z(h, "load", function () {
                y.range = A;
                y.min = B;
              });
            }
            k(this, "afterBtnClick");
          }
        };
        h.prototype.setSelected = function (a) {
          this.selected = this.options.selected = a;
        };
        h.prototype.init = function (a) {
          var b = this,
            c = a.options.rangeSelector,
            d = c.buttons || b.defaultButtons.slice(),
            e = c.selected,
            f = function () {
              var a = b.minInput,
                c = b.maxInput;
              a && a.blur && k(a, "blur");
              c && c.blur && k(c, "blur");
            };
          b.chart = a;
          b.options = c;
          b.buttons = [];
          b.buttonOptions = d;
          this.eventsToUnbind = [];
          this.eventsToUnbind.push(z(a.container, "mousedown", f));
          this.eventsToUnbind.push(z(a, "resize", f));
          d.forEach(b.computeButtonRange);
          "undefined" !== typeof e && d[e] && this.clickButton(e, !1);
          this.eventsToUnbind.push(
            z(a, "load", function () {
              a.xAxis &&
                a.xAxis[0] &&
                z(a.xAxis[0], "setExtremes", function (c) {
                  this.max - this.min !== a.fixedRange &&
                    "rangeSelectorButton" !== c.trigger &&
                    "updatedData" !== c.trigger &&
                    b.forcedDataGrouping &&
                    !b.frozenStates &&
                    this.setDataGrouping(!1, !1);
                });
            })
          );
        };
        h.prototype.updateButtonStates = function () {
          var a = this,
            b = this.chart,
            c = this.dropdown,
            e = b.xAxis[0],
            f = Math.round(e.max - e.min),
            g = !e.hasVisibleSeries,
            h = (b.scroller && b.scroller.getUnionExtremes()) || e,
            k = h.dataMin,
            l = h.dataMax;
          b = a.getYTDExtremes(l, k, b.time.useUTC);
          var m = b.min,
            p = b.max,
            n = a.selected,
            q = d(n),
            t = a.options.allButtonsEnabled,
            u = a.buttons;
          a.buttonOptions.forEach(function (b, d) {
            var h = b._range,
              v = b.type,
              r = b.count || 1,
              x = u[d],
              N = 0,
              K = b._offsetMax - b._offsetMin;
            b = d === n;
            var w = h > l - k,
              H = h < e.minRange,
              L = !1,
              y = !1;
            h = h === f;
            ("month" === v || "year" === v) &&
            f + 36e5 >= 864e5 * { month: 28, year: 365 }[v] * r - K &&
            f - 36e5 <= 864e5 * { month: 31, year: 366 }[v] * r + K
              ? (h = !0)
              : "ytd" === v
              ? ((h = p - m + K === f), (L = !b))
              : "all" === v && ((h = e.max - e.min >= l - k), (y = !b && q && h));
            v = !t && (w || H || y || g);
            r = (b && h) || (h && !q && !L) || (b && a.frozenStates);
            v ? (N = 3) : r && ((q = !0), (N = 2));
            x.state !== N &&
              (x.setState(N),
              c && ((c.options[d + 1].disabled = v), 2 === N && (c.selectedIndex = d + 1)),
              0 === N && n === d && a.setSelected());
          });
        };
        h.prototype.computeButtonRange = function (a) {
          var b = a.type,
            d = a.count || 1,
            e = { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5 };
          if (e[b]) a._range = e[b] * d;
          else if ("month" === b || "year" === b)
            a._range = 864e5 * { month: 30, year: 365 }[b] * d;
          a._offsetMin = c(a.offsetMin, 0);
          a._offsetMax = c(a.offsetMax, 0);
          a._range += a._offsetMax - a._offsetMin;
        };
        h.prototype.getInputValue = function (a) {
          a = "min" === a ? this.minInput : this.maxInput;
          var b = this.chart.options.rangeSelector,
            c = this.chart.time;
          return a
            ? (("text" === a.type && b.inputDateParser) || this.defaultInputDateParser)(
                a.value,
                c.useUTC,
                c
              )
            : 0;
        };
        h.prototype.setInputValue = function (a, c) {
          var d = this.options,
            e = this.chart.time,
            f = "min" === a ? this.minInput : this.maxInput;
          a = "min" === a ? this.minDateBox : this.maxDateBox;
          if (f) {
            var g = f.getAttribute("data-hc-time");
            g = b(g) ? Number(g) : void 0;
            b(c) &&
              (b(g) && f.setAttribute("data-hc-time-previous", g),
              f.setAttribute("data-hc-time", c),
              (g = c));
            f.value = e.dateFormat(this.inputTypeFormats[f.type] || d.inputEditDateFormat, g);
            a && a.attr({ text: e.dateFormat(d.inputDateFormat, g) });
          }
        };
        h.prototype.setInputExtremes = function (a, b, c) {
          if ((a = "min" === a ? this.minInput : this.maxInput)) {
            var d = this.inputTypeFormats[a.type],
              e = this.chart.time;
            d &&
              ((b = e.dateFormat(d, b)),
              a.min !== b && (a.min = b),
              (c = e.dateFormat(d, c)),
              a.max !== c && (a.max = c));
          }
        };
        h.prototype.showInput = function (a) {
          var b = "min" === a ? this.minDateBox : this.maxDateBox;
          if ((a = "min" === a ? this.minInput : this.maxInput) && b && this.inputGroup) {
            var c = "text" === a.type,
              d = this.inputGroup,
              e = d.translateX;
            d = d.translateY;
            var g = this.options.inputBoxWidth;
            f(a, {
              width: c ? b.width + (g ? -2 : 20) + "px" : "auto",
              height: c ? b.height - 2 + "px" : "auto",
              border: "2px solid silver",
            });
            c && g
              ? f(a, { left: e + b.x + "px", top: d + "px" })
              : f(a, {
                  left:
                    Math.min(
                      Math.round(b.x + e - (a.offsetWidth - b.width) / 2),
                      this.chart.chartWidth - a.offsetWidth
                    ) + "px",
                  top: d - 1 - (a.offsetHeight - b.height) / 2 + "px",
                });
          }
        };
        h.prototype.hideInput = function (a) {
          (a = "min" === a ? this.minInput : this.maxInput) &&
            f(a, { top: "-9999em", border: 0, width: "1px", height: "1px" });
        };
        h.prototype.defaultInputDateParser = function (a, b, c) {
          var e = a.split("/").join("-").split(" ").join("T");
          -1 === e.indexOf("T") && (e += "T00:00");
          if (b) e += "Z";
          else {
            var f;
            if ((f = D.isSafari))
              (f = e),
                (f = !(
                  6 < f.length &&
                  (f.lastIndexOf("-") === f.length - 6 || f.lastIndexOf("+") === f.length - 6)
                ));
            f &&
              ((f = new Date(e).getTimezoneOffset() / 60),
              (e += 0 >= f ? "+" + g(-f) + ":00" : "-" + g(f) + ":00"));
          }
          e = Date.parse(e);
          d(e) || ((a = a.split("-")), (e = Date.UTC(q(a[0]), q(a[1]) - 1, q(a[2]))));
          c && b && d(e) && (e += c.getTimezoneOffset(e));
          return e;
        };
        h.prototype.drawInput = function (a) {
          function b() {
            var b = h.getInputValue(a),
              e = c.xAxis[0],
              f = c.scroller && c.scroller.xAxis ? c.scroller.xAxis : e,
              g = f.dataMin;
            f = f.dataMax;
            var k = h.maxInput,
              l = h.minInput;
            b !== Number(u.getAttribute("data-hc-time-previous")) &&
              d(b) &&
              (u.setAttribute("data-hc-time-previous", b),
              r && k && d(g)
                ? b > Number(k.getAttribute("data-hc-time"))
                  ? (b = void 0)
                  : b < g && (b = g)
                : l &&
                  d(f) &&
                  (b < Number(l.getAttribute("data-hc-time")) ? (b = void 0) : b > f && (b = f)),
              "undefined" !== typeof b &&
                e.setExtremes(r ? b : e.min, r ? e.max : b, void 0, void 0, {
                  trigger: "rangeSelectorInput",
                }));
          }
          var c = this.chart,
            e = this.div,
            g = this.inputGroup,
            h = this,
            k = c.renderer.style || {},
            p = c.renderer,
            n = c.options.rangeSelector,
            r = "min" === a,
            q = t.lang[r ? "rangeSelectorFrom" : "rangeSelectorTo"];
          q = p
            .label(q, 0)
            .addClass("highcharts-range-label")
            .attr({ padding: q ? 2 : 0 })
            .add(g);
          p = p
            .label("", 0)
            .addClass("highcharts-range-input")
            .attr({
              padding: 2,
              width: n.inputBoxWidth,
              height: n.inputBoxHeight,
              "text-align": "center",
            })
            .on("click", function () {
              h.showInput(a);
              h[a + "Input"].focus();
            });
          c.styledMode || p.attr({ stroke: n.inputBoxBorderColor, "stroke-width": 1 });
          p.add(g);
          var u = m("input", { name: a, className: "highcharts-range-selector" }, void 0, e);
          u.setAttribute("type", G(n.inputDateFormat || "%b %e, %Y"));
          c.styledMode ||
            (q.css(w(k, n.labelStyle)),
            p.css(w({ color: F.neutralColor80 }, k, n.inputStyle)),
            f(
              u,
              l(
                {
                  position: "absolute",
                  border: 0,
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  textAlign: "center",
                  fontSize: k.fontSize,
                  fontFamily: k.fontFamily,
                  top: "-9999em",
                },
                n.inputStyle
              )
            ));
          u.onfocus = function () {
            h.showInput(a);
          };
          u.onblur = function () {
            u === D.doc.activeElement && b();
            h.hideInput(a);
            h.setInputValue(a);
            u.blur();
          };
          var y = !1;
          u.onchange = function () {
            y || (b(), h.hideInput(a), u.blur());
          };
          u.onkeypress = function (a) {
            13 === a.keyCode && b();
          };
          u.onkeydown = function (a) {
            y = !0;
            (38 !== a.keyCode && 40 !== a.keyCode) || b();
          };
          u.onkeyup = function () {
            y = !1;
          };
          return { dateBox: p, input: u, label: q };
        };
        h.prototype.getPosition = function () {
          var a = this.chart,
            b = a.options.rangeSelector;
          a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
          return { buttonTop: a + b.buttonPosition.y, inputTop: a + b.inputPosition.y - 10 };
        };
        h.prototype.getYTDExtremes = function (a, b, c) {
          var d = this.chart.time,
            e = new d.Date(a),
            f = d.get("FullYear", e);
          c = c ? d.Date.UTC(f, 0, 1) : +new d.Date(f, 0, 1);
          b = Math.max(b, c);
          e = e.getTime();
          return { max: Math.min(a || e, e), min: b };
        };
        h.prototype.render = function (a, d) {
          var e = this.chart,
            f = e.renderer,
            g = e.container,
            h = e.options,
            k = h.rangeSelector,
            l = c(h.chart.style && h.chart.style.zIndex, 0) + 1;
          h = k.inputEnabled;
          if (!1 !== k.enabled) {
            this.rendered ||
              ((this.group = f.g("range-selector-group").attr({ zIndex: 7 }).add()),
              (this.div = m("div", void 0, { position: "relative", height: 0, zIndex: l })),
              this.buttonOptions.length && this.renderButtons(),
              g.parentNode && g.parentNode.insertBefore(this.div, g),
              h &&
                ((this.inputGroup = f.g("input-group").add(this.group)),
                (f = this.drawInput("min")),
                (this.minDateBox = f.dateBox),
                (this.minLabel = f.label),
                (this.minInput = f.input),
                (f = this.drawInput("max")),
                (this.maxDateBox = f.dateBox),
                (this.maxLabel = f.label),
                (this.maxInput = f.input)));
            if (
              h &&
              (this.setInputValue("min", a),
              this.setInputValue("max", d),
              (a = (e.scroller && e.scroller.getUnionExtremes()) || e.xAxis[0] || {}),
              b(a.dataMin) &&
                b(a.dataMax) &&
                ((e = e.xAxis[0].minRange || 0),
                this.setInputExtremes(
                  "min",
                  a.dataMin,
                  Math.min(a.dataMax, this.getInputValue("max")) - e
                ),
                this.setInputExtremes(
                  "max",
                  Math.max(a.dataMin, this.getInputValue("min")) + e,
                  a.dataMax
                )),
              this.inputGroup)
            ) {
              var p = 0;
              [this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(function (
                a
              ) {
                if (a) {
                  var b = a.getBBox().width;
                  b && (a.attr({ x: p }), (p += b + k.inputSpacing));
                }
              });
            }
            this.alignElements();
            this.rendered = !0;
          }
        };
        h.prototype.renderButtons = function () {
          var a = this,
            b = this.buttons,
            d = this.options,
            e = t.lang,
            f = this.chart.renderer,
            g = w(d.buttonTheme),
            h = g && g.states,
            l = g.width || 28;
          delete g.width;
          delete g.states;
          this.buttonGroup = f.g("range-selector-buttons").add(this.group);
          var p = (this.dropdown = m(
            "select",
            void 0,
            {
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              border: 0,
              top: "-9999em",
              cursor: "pointer",
              opacity: 0.0001,
            },
            this.div
          ));
          z(p, "touchstart", function () {
            p.style.fontSize = "16px";
          });
          [
            [D.isMS ? "mouseover" : "mouseenter"],
            [D.isMS ? "mouseout" : "mouseleave"],
            ["change", "click"],
          ].forEach(function (c) {
            var d = c[0],
              e = c[1];
            z(p, d, function () {
              var c = b[a.currentButtonIndex()];
              c && k(c.element, e || d);
            });
          });
          this.zoomText = f.text(e.rangeSelectorZoom, 0, 15).add(this.buttonGroup);
          this.chart.styledMode ||
            (this.zoomText.css(d.labelStyle), (g["stroke-width"] = c(g["stroke-width"], 0)));
          m("option", { textContent: this.zoomText.textStr, disabled: !0 }, void 0, p);
          this.buttonOptions.forEach(function (c, d) {
            m("option", { textContent: c.title || c.text }, void 0, p);
            b[d] = f
              .button(
                c.text,
                0,
                0,
                function (b) {
                  var e = c.events && c.events.click,
                    f;
                  e && (f = e.call(c, b));
                  !1 !== f && a.clickButton(d);
                  a.isActive = !0;
                },
                g,
                h && h.hover,
                h && h.select,
                h && h.disabled
              )
              .attr({ "text-align": "center", width: l })
              .add(a.buttonGroup);
            c.title && b[d].attr("title", c.title);
          });
        };
        h.prototype.alignElements = function () {
          var a = this,
            b = this.buttonGroup,
            d = this.buttons,
            e = this.chart,
            f = this.group,
            g = this.inputGroup,
            h = this.options,
            k = this.zoomText,
            l = e.options,
            m =
              l.exporting &&
              !1 !== l.exporting.enabled &&
              l.navigation &&
              l.navigation.buttonOptions;
          l = h.buttonPosition;
          var p = h.inputPosition,
            n = h.verticalAlign,
            q = function (b, c) {
              return m &&
                a.titleCollision(e) &&
                "top" === n &&
                "right" === c.align &&
                c.y - b.getBBox().height - 12 < (m.y || 0) + (m.height || 0) + e.spacing[0]
                ? -40
                : 0;
            },
            u = e.plotLeft;
          if (f && l && p) {
            var t = l.x - e.spacing[3];
            if (b) {
              this.positionButtons();
              if (!this.initialButtonGroupWidth) {
                var w = 0;
                k && (w += k.getBBox().width + 5);
                d.forEach(function (a, b) {
                  w += a.width;
                  b !== d.length - 1 && (w += h.buttonSpacing);
                });
                this.initialButtonGroupWidth = w;
              }
              u -= e.spacing[3];
              this.updateButtonStates();
              k = q(b, l);
              this.alignButtonGroup(k);
              f.placed = b.placed = e.hasLoaded;
            }
            b = 0;
            g &&
              ((b = q(g, p)),
              "left" === p.align
                ? (t = u)
                : "right" === p.align && (t = -Math.max(e.axisOffset[1], -b)),
              g.align(
                { y: p.y, width: g.getBBox().width, align: p.align, x: p.x + t - 2 },
                !0,
                e.spacingBox
              ),
              (g.placed = e.hasLoaded));
            this.handleCollision(b);
            f.align({ verticalAlign: n }, !0, e.spacingBox);
            g = f.alignAttr.translateY;
            b = f.getBBox().height + 20;
            q = 0;
            "bottom" === n &&
              ((q =
                (q = e.legend && e.legend.options) &&
                "bottom" === q.verticalAlign &&
                q.enabled &&
                !q.floating
                  ? e.legend.legendHeight + c(q.margin, 10)
                  : 0),
              (b = b + q - 20),
              (q = g - b - (h.floating ? 0 : h.y) - (e.titleOffset ? e.titleOffset[2] : 0) - 10));
            if ("top" === n)
              h.floating && (q = 0),
                e.titleOffset && e.titleOffset[0] && (q = e.titleOffset[0]),
                (q += e.margin[0] - e.spacing[0] || 0);
            else if ("middle" === n)
              if (p.y === l.y) q = g;
              else if (p.y || l.y) q = 0 > p.y || 0 > l.y ? q - Math.min(p.y, l.y) : g - b;
            f.translate(h.x, h.y + Math.floor(q));
            l = this.minInput;
            p = this.maxInput;
            g = this.dropdown;
            h.inputEnabled &&
              l &&
              p &&
              ((l.style.marginTop = f.translateY + "px"),
              (p.style.marginTop = f.translateY + "px"));
            g && (g.style.marginTop = f.translateY + "px");
          }
        };
        h.prototype.alignButtonGroup = function (a, b) {
          var d = this.chart,
            e = this.buttonGroup,
            f = this.options.buttonPosition,
            g = d.plotLeft - d.spacing[3],
            h = f.x - d.spacing[3];
          "right" === f.align ? (h += a - g) : "center" === f.align && (h -= g / 2);
          e &&
            e.align(
              { y: f.y, width: c(b, this.initialButtonGroupWidth), align: f.align, x: h },
              !0,
              d.spacingBox
            );
        };
        h.prototype.positionButtons = function () {
          var a = this.buttons,
            b = this.chart,
            d = this.options,
            e = this.zoomText,
            f = b.hasLoaded ? "animate" : "attr",
            g = d.buttonPosition,
            h = b.plotLeft,
            k = h;
          e &&
            "hidden" !== e.visibility &&
            (e[f]({ x: c(h + g.x, h) }), (k += g.x + e.getBBox().width + 5));
          this.buttonOptions.forEach(function (b, c) {
            if ("hidden" !== a[c].visibility)
              a[c][f]({ x: k }), (k += a[c].width + d.buttonSpacing);
            else a[c][f]({ x: h });
          });
        };
        h.prototype.handleCollision = function (a) {
          var b = this,
            c = this.chart,
            d = this.buttonGroup,
            e = this.inputGroup,
            f = this.options,
            g = f.buttonPosition,
            h = f.dropdown,
            k = f.inputPosition;
          f = function () {
            var a = 0;
            b.buttons.forEach(function (b) {
              b = b.getBBox();
              b.width > a && (a = b.width);
            });
            return a;
          };
          var l = function (b) {
              if (e && d) {
                var c = e.alignAttr.translateX + e.alignOptions.x - a + e.getBBox().x + 2,
                  f = e.alignOptions.width,
                  h = d.alignAttr.translateX + d.getBBox().x;
                return h + b > c && c + f > h && g.y < k.y + e.getBBox().height;
              }
              return !1;
            },
            m = function () {
              e &&
                d &&
                e.attr({
                  translateX: e.alignAttr.translateX + (c.axisOffset[1] >= -a ? 0 : -a),
                  translateY: e.alignAttr.translateY + d.getBBox().height + 10,
                });
            };
          if (d) {
            if ("always" === h) {
              this.collapseButtons(a);
              l(f()) && m();
              return;
            }
            "never" === h && this.expandButtons();
          }
          e && d
            ? k.align === g.align || l(this.initialButtonGroupWidth + 20)
              ? "responsive" === h
                ? (this.collapseButtons(a), l(f()) && m())
                : m()
              : "responsive" === h && this.expandButtons()
            : d &&
              "responsive" === h &&
              (this.initialButtonGroupWidth > c.plotWidth
                ? this.collapseButtons(a)
                : this.expandButtons());
        };
        h.prototype.collapseButtons = function (a) {
          var b = this.buttons,
            c = this.buttonOptions,
            d = this.dropdown,
            e = this.options,
            f = this.zoomText,
            g = function (a) {
              return {
                text: a ? a + " \u25be" : "\u25be",
                width: "auto",
                paddingLeft: 8,
                paddingRight: 8,
              };
            };
          f && f.hide();
          var h = !1;
          c.forEach(function (a, c) {
            c = b[c];
            2 !== c.state ? c.hide() : (c.show(), c.attr(g(a.text)), (h = !0));
          });
          h ||
            (d && (d.selectedIndex = 0),
            b[0].show(),
            b[0].attr(g(this.zoomText && this.zoomText.textStr)));
          c = e.buttonPosition.align;
          this.positionButtons();
          ("right" !== c && "center" !== c) ||
            this.alignButtonGroup(a, b[this.currentButtonIndex()].getBBox().width);
          this.showDropdown();
        };
        h.prototype.expandButtons = function () {
          var a = this.buttons,
            b = this.buttonOptions,
            c = this.options,
            d = this.zoomText;
          this.hideDropdown();
          d && d.show();
          b.forEach(function (b, d) {
            d = a[d];
            d.show();
            d.attr({
              text: b.text,
              width: c.buttonTheme.width || 28,
              paddingLeft: "unset",
              paddingRight: "unset",
            });
            2 > d.state && d.setState(0);
          });
          this.positionButtons();
        };
        h.prototype.currentButtonIndex = function () {
          var a = this.dropdown;
          return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0;
        };
        h.prototype.showDropdown = function () {
          var a = this.buttonGroup,
            b = this.buttons,
            c = this.chart,
            d = this.dropdown;
          if (a && d) {
            var e = a.translateX;
            a = a.translateY;
            b = b[this.currentButtonIndex()].getBBox();
            f(d, {
              left: c.plotLeft + e + "px",
              top: a + 0.5 + "px",
              width: b.width + "px",
              height: b.height + "px",
            });
            this.hasVisibleDropdown = !0;
          }
        };
        h.prototype.hideDropdown = function () {
          var a = this.dropdown;
          a &&
            (f(a, { top: "-9999em", width: "1px", height: "1px" }), (this.hasVisibleDropdown = !1));
        };
        h.prototype.getHeight = function () {
          var a = this.options,
            b = this.group,
            c = a.y,
            d = a.buttonPosition.y,
            e = a.inputPosition.y;
          if (a.height) return a.height;
          this.alignElements();
          a = b ? b.getBBox(!0).height + 13 + c : 0;
          b = Math.min(e, d);
          if ((0 > e && 0 > d) || (0 < e && 0 < d)) a += Math.abs(b);
          return a;
        };
        h.prototype.titleCollision = function (a) {
          return !(a.options.title.text || a.options.subtitle.text);
        };
        h.prototype.update = function (a) {
          var b = this.chart;
          w(!0, b.options.rangeSelector, a);
          this.destroy();
          this.init(b);
          this.render();
        };
        h.prototype.destroy = function () {
          var a = this,
            b = a.minInput,
            c = a.maxInput;
          a.eventsToUnbind &&
            (a.eventsToUnbind.forEach(function (a) {
              return a();
            }),
            (a.eventsToUnbind = void 0));
          A(a.buttons);
          b && (b.onfocus = b.onblur = b.onchange = null);
          c && (c.onfocus = c.onblur = c.onchange = null);
          n(
            a,
            function (b, c) {
              b &&
                "chart" !== c &&
                (b instanceof E ? b.destroy() : b instanceof window.HTMLElement && u(b));
              b !== h.prototype[c] && (a[c] = null);
            },
            this
          );
        };
        return h;
      })();
      B.prototype.defaultButtons = [
        { type: "month", count: 1, text: "1m", title: "View 1 month" },
        { type: "month", count: 3, text: "3m", title: "View 3 months" },
        { type: "month", count: 6, text: "6m", title: "View 6 months" },
        { type: "ytd", text: "YTD", title: "View year to date" },
        { type: "year", count: 1, text: "1y", title: "View 1 year" },
        { type: "all", text: "All", title: "View all" },
      ];
      B.prototype.inputTypeFormats = {
        "datetime-local": "%Y-%m-%dT%H:%M:%S",
        date: "%Y-%m-%d",
        time: "%H:%M:%S",
      };
      e.prototype.minFromRange = function () {
        var a = this.range,
          b = a.type,
          e = this.max,
          f = this.chart.time,
          g = function (a, c) {
            var d = "year" === b ? "FullYear" : "Month",
              e = new f.Date(a),
              g = f.get(d, e);
            f.set(d, e, g + c);
            g === f.get(d, e) && f.set("Date", e, 0);
            return e.getTime() - a;
          };
        if (d(a)) {
          var h = e - a;
          var k = a;
        } else (h = e + g(e, -a.count)), this.chart && (this.chart.fixedRange = e - h);
        var l = c(this.dataMin, Number.MIN_VALUE);
        d(h) || (h = l);
        h <= l &&
          ((h = l),
          "undefined" === typeof k && (k = g(h, a.count)),
          (this.newMax = Math.min(h + k, this.dataMax)));
        d(e) || (h = void 0);
        return h;
      };
      if (!D.RangeSelector) {
        var J = [],
          O = function (a) {
            function b() {
              e &&
                ((c = a.xAxis[0].getExtremes()),
                (f = a.legend),
                (h = e && e.options.verticalAlign),
                d(c.min) && e.render(c.min, c.max),
                f.display &&
                  "top" === h &&
                  h === f.options.verticalAlign &&
                  ((g = w(a.spacingBox)),
                  (g.y = "vertical" === f.options.layout ? a.plotTop : g.y + e.getHeight()),
                  (f.group.placed = !1),
                  f.align(g)));
            }
            var c,
              e = a.rangeSelector,
              f,
              g,
              h;
            e &&
              (I(J, function (b) {
                return b[0] === a;
              }) ||
                J.push([
                  a,
                  [
                    z(a.xAxis[0], "afterSetExtremes", function (a) {
                      e && e.render(a.min, a.max);
                    }),
                    z(a, "redraw", b),
                  ],
                ]),
              b());
          };
        z(h, "afterGetContainer", function () {
          this.options.rangeSelector &&
            this.options.rangeSelector.enabled &&
            (this.rangeSelector = new B(this));
        });
        z(h, "beforeRender", function () {
          var a = this.axes,
            b = this.rangeSelector;
          b &&
            (d(b.deferredYTDClick) &&
              (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick),
            a.forEach(function (a) {
              a.updateNames();
              a.setScale();
            }),
            this.getAxisMargins(),
            b.render(),
            (a = b.options.verticalAlign),
            b.options.floating ||
              ("bottom" === a
                ? (this.extraBottomMargin = !0)
                : "middle" !== a && (this.extraTopMargin = !0)));
        });
        z(h, "update", function (a) {
          var c = a.options.rangeSelector;
          a = this.rangeSelector;
          var d = this.extraBottomMargin,
            e = this.extraTopMargin;
          c &&
            c.enabled &&
            !b(a) &&
            this.options.rangeSelector &&
            ((this.options.rangeSelector.enabled = !0), (this.rangeSelector = a = new B(this)));
          this.extraTopMargin = this.extraBottomMargin = !1;
          a &&
            (O(this),
            (c = (c && c.verticalAlign) || (a.options && a.options.verticalAlign)),
            a.options.floating ||
              ("bottom" === c
                ? (this.extraBottomMargin = !0)
                : "middle" !== c && (this.extraTopMargin = !0)),
            this.extraBottomMargin !== d || this.extraTopMargin !== e) &&
            (this.isDirtyBox = !0);
        });
        z(h, "render", function () {
          var a = this.rangeSelector;
          a &&
            !a.options.floating &&
            (a.render(),
            (a = a.options.verticalAlign),
            "bottom" === a
              ? (this.extraBottomMargin = !0)
              : "middle" !== a && (this.extraTopMargin = !0));
        });
        z(h, "getMargins", function () {
          var a = this.rangeSelector;
          a &&
            ((a = a.getHeight()),
            this.extraTopMargin && (this.plotTop += a),
            this.extraBottomMargin && (this.marginBottom += a));
        });
        h.prototype.callbacks.push(O);
        z(h, "destroy", function () {
          for (var a = 0; a < J.length; a++) {
            var b = J[a];
            if (b[0] === this) {
              b[1].forEach(function (a) {
                return a();
              });
              J.splice(a, 1);
              break;
            }
          }
        });
        D.RangeSelector = B;
      }
      return D.RangeSelector;
    }
  );
  P(
    e,
    "Core/Axis/NavigatorAxis.js",
    [e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (e, h) {
      var D = e.isTouchDevice,
        y = h.addEvent,
        F = h.correctFloat,
        E = h.defined,
        C = h.isNumber,
        G = h.pick,
        t = (function () {
          function e(e) {
            this.axis = e;
          }
          e.prototype.destroy = function () {
            this.axis = void 0;
          };
          e.prototype.toFixedRange = function (e, f, b, h) {
            var m = this.axis,
              l = m.chart;
            l = l && l.fixedRange;
            var t = (m.pointRange || 0) / 2;
            e = G(b, m.translate(e, !0, !m.horiz));
            f = G(h, m.translate(f, !0, !m.horiz));
            m = l && (f - e) / l;
            E(b) || (e = F(e + t));
            E(h) || (f = F(f - t));
            0.7 < m && 1.3 > m && (h ? (e = f - l) : (f = e + l));
            (C(e) && C(f)) || (e = f = void 0);
            return { min: e, max: f };
          };
          return e;
        })();
      return (function () {
        function e() {}
        e.compose = function (e) {
          e.keepProps.push("navigatorAxis");
          y(e, "init", function () {
            this.navigatorAxis || (this.navigatorAxis = new t(this));
          });
          y(e, "zoom", function (e) {
            var b = this.chart.options,
              f = b.navigator,
              h = this.navigatorAxis,
              l = b.chart.pinchType,
              m = b.rangeSelector;
            b = b.chart.zoomType;
            this.isXAxis &&
              ((f && f.enabled) || (m && m.enabled)) &&
              ("y" === b
                ? (e.zoomed = !1)
                : ((!D && "xy" === b) || (D && "xy" === l)) &&
                  this.options.range &&
                  ((f = h.previousZoom),
                  E(e.newMin)
                    ? (h.previousZoom = [this.min, this.max])
                    : f && ((e.newMin = f[0]), (e.newMax = f[1]), (h.previousZoom = void 0))));
            "undefined" !== typeof e.zoomed && e.preventDefault();
          });
        };
        e.AdditionsClass = t;
        return e;
      })();
    }
  );
  P(
    e,
    "Core/Navigator.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Chart/Chart.js"],
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Axis/NavigatorAxis.js"],
      e["Core/Options.js"],
      e["Core/Color/Palette.js"],
      e["Core/Scrollbar.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, h, D, y, F, E, C, G, t, z, m) {
      D = D.parse;
      var f = y.hasTouch,
        b = y.isTouchDevice,
        A = E.defaultOptions,
        u = m.addEvent,
        l = m.clamp,
        I = m.correctFloat,
        k = m.defined,
        d = m.destroyObjectProperties,
        w = m.erase,
        n = m.extend,
        g = m.find,
        c = m.isArray,
        q = m.isNumber,
        a = m.merge,
        B = m.pick,
        J = m.removeEvent,
        O = m.splat,
        p = function (a) {
          for (var b = [], c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
          b = [].filter.call(b, q);
          if (b.length) return Math[a].apply(0, b);
        };
      E = "undefined" === typeof z.seriesTypes.areaspline ? "line" : "areaspline";
      n(A, {
        navigator: {
          height: 40,
          margin: 25,
          maskInside: !0,
          handles: {
            width: 7,
            height: 15,
            symbols: ["navigator-handle", "navigator-handle"],
            enabled: !0,
            lineWidth: 1,
            backgroundColor: C.neutralColor5,
            borderColor: C.neutralColor40,
          },
          maskFill: D(C.highlightColor60).setOpacity(0.3).get(),
          outlineColor: C.neutralColor20,
          outlineWidth: 1,
          series: {
            type: E,
            fillOpacity: 0.05,
            lineWidth: 1,
            compare: null,
            dataGrouping: {
              approximation: "average",
              enabled: !0,
              groupPixelWidth: 2,
              firstAnchor: "firstPoint",
              anchor: "middle",
              lastAnchor: "lastPoint",
              units: [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2, 3, 4]],
                ["week", [1, 2, 3]],
                ["month", [1, 3, 6]],
                ["year", null],
              ],
            },
            dataLabels: { enabled: !1, zIndex: 2 },
            id: "highcharts-navigator-series",
            className: "highcharts-navigator-series",
            lineColor: null,
            marker: { enabled: !1 },
            threshold: null,
          },
          xAxis: {
            overscroll: 0,
            className: "highcharts-navigator-xaxis",
            tickLength: 0,
            lineWidth: 0,
            gridLineColor: C.neutralColor10,
            gridLineWidth: 1,
            tickPixelInterval: 200,
            labels: { align: "left", style: { color: C.neutralColor40 }, x: 3, y: -4 },
            crosshair: !1,
          },
          yAxis: {
            className: "highcharts-navigator-yaxis",
            gridLineWidth: 0,
            startOnTick: !1,
            endOnTick: !1,
            minPadding: 0.1,
            maxPadding: 0.1,
            labels: { enabled: !1 },
            crosshair: !1,
            title: { text: null },
            tickLength: 0,
            tickWidth: 0,
          },
        },
      });
      y.Renderer.prototype.symbols["navigator-handle"] = function (a, b, c, d, e) {
        a = ((e && e.width) || 0) / 2;
        b = Math.round(a / 3) + 0.5;
        e = (e && e.height) || 0;
        return [
          ["M", -a - 1, 0.5],
          ["L", a, 0.5],
          ["L", a, e + 0.5],
          ["L", -a - 1, e + 0.5],
          ["L", -a - 1, 0.5],
          ["M", -b, 4],
          ["L", -b, e - 3],
          ["M", b - 1, 4],
          ["L", b - 1, e - 3],
        ];
      };
      var r = (function () {
        function h(a) {
          this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.rendered = this.range = this.outlineHeight = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles = this.chart = this.baseSeries = void 0;
          this.init(a);
        }
        h.prototype.drawHandle = function (a, b, c, d) {
          var e = this.navigatorOptions.handles.height;
          this.handles[b][d](
            c
              ? {
                  translateX: Math.round(this.left + this.height / 2),
                  translateY: Math.round(this.top + parseInt(a, 10) + 0.5 - e),
                }
              : {
                  translateX: Math.round(this.left + parseInt(a, 10)),
                  translateY: Math.round(this.top + this.height / 2 - e / 2 - 1),
                }
          );
        };
        h.prototype.drawOutline = function (a, b, c, d) {
          var e = this.navigatorOptions.maskInside,
            f = this.outline.strokeWidth(),
            g = f / 2,
            h = (f % 2) / 2;
          f = this.outlineHeight;
          var k = this.scrollbarHeight || 0,
            l = this.size,
            m = this.left - k,
            n = this.top;
          c
            ? ((m -= g),
              (c = n + b + h),
              (b = n + a + h),
              (h = [
                ["M", m + f, n - k - h],
                ["L", m + f, c],
                ["L", m, c],
                ["L", m, b],
                ["L", m + f, b],
                ["L", m + f, n + l + k],
              ]),
              e && h.push(["M", m + f, c - g], ["L", m + f, b + g]))
            : ((a += m + k - h),
              (b += m + k - h),
              (n += g),
              (h = [
                ["M", m, n],
                ["L", a, n],
                ["L", a, n + f],
                ["L", b, n + f],
                ["L", b, n],
                ["L", m + l + 2 * k, n],
              ]),
              e && h.push(["M", a - g, n], ["L", b + g, n]));
          this.outline[d]({ d: h });
        };
        h.prototype.drawMasks = function (a, b, c, d) {
          var e = this.left,
            f = this.top,
            g = this.height;
          if (c) {
            var h = [e, e, e];
            var k = [f, f + a, f + b];
            var l = [g, g, g];
            var m = [a, b - a, this.size - b];
          } else
            (h = [e, e + a, e + b]),
              (k = [f, f, f]),
              (l = [a, b - a, this.size - b]),
              (m = [g, g, g]);
          this.shades.forEach(function (a, b) {
            a[d]({ x: h[b], y: k[b], width: l[b], height: m[b] });
          });
        };
        h.prototype.renderElements = function () {
          var a = this,
            b = a.navigatorOptions,
            c = b.maskInside,
            d = a.chart,
            e = d.renderer,
            f,
            g = { cursor: d.inverted ? "ns-resize" : "ew-resize" };
          a.navigatorGroup = f = e.g("navigator").attr({ zIndex: 8, visibility: "hidden" }).add();
          [!c, c, !c].forEach(function (c, h) {
            a.shades[h] = e
              .rect()
              .addClass("highcharts-navigator-mask" + (1 === h ? "-inside" : "-outside"))
              .add(f);
            d.styledMode ||
              a.shades[h].attr({ fill: c ? b.maskFill : "rgba(0,0,0,0)" }).css(1 === h && g);
          });
          a.outline = e.path().addClass("highcharts-navigator-outline").add(f);
          d.styledMode ||
            a.outline.attr({ "stroke-width": b.outlineWidth, stroke: b.outlineColor });
          b.handles.enabled &&
            [0, 1].forEach(function (c) {
              b.handles.inverted = d.inverted;
              a.handles[c] = e.symbol(
                b.handles.symbols[c],
                -b.handles.width / 2 - 1,
                0,
                b.handles.width,
                b.handles.height,
                b.handles
              );
              a.handles[c]
                .attr({ zIndex: 7 - c })
                .addClass(
                  "highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][c]
                )
                .add(f);
              if (!d.styledMode) {
                var h = b.handles;
                a.handles[c]
                  .attr({
                    fill: h.backgroundColor,
                    stroke: h.borderColor,
                    "stroke-width": h.lineWidth,
                  })
                  .css(g);
              }
            });
        };
        h.prototype.update = function (b) {
          (this.series || []).forEach(function (a) {
            a.baseSeries && delete a.baseSeries.navigatorSeries;
          });
          this.destroy();
          a(!0, this.chart.options.navigator, this.options, b);
          this.init(this.chart);
        };
        h.prototype.render = function (a, b, c, d) {
          var e = this.chart,
            f = this.scrollbarHeight,
            g,
            h = this.xAxis,
            m = h.pointRange || 0;
          var n = h.navigatorAxis.fake ? e.xAxis[0] : h;
          var p = this.navigatorEnabled,
            v,
            r = this.rendered;
          var t = e.inverted;
          var u = e.xAxis[0].minRange,
            w = e.xAxis[0].options.maxRange;
          if (!this.hasDragged || k(c)) {
            a = I(a - m / 2);
            b = I(b + m / 2);
            if (!q(a) || !q(b))
              if (r) (c = 0), (d = B(h.width, n.width));
              else return;
            this.left = B(h.left, e.plotLeft + f + (t ? e.plotWidth : 0));
            this.size = v = g = B(h.len, (t ? e.plotHeight : e.plotWidth) - 2 * f);
            e = t ? f : g + 2 * f;
            c = B(c, h.toPixels(a, !0));
            d = B(d, h.toPixels(b, !0));
            (q(c) && Infinity !== Math.abs(c)) || ((c = 0), (d = e));
            a = h.toValue(c, !0);
            b = h.toValue(d, !0);
            var y = Math.abs(I(b - a));
            y < u
              ? this.grabbedLeft
                ? (c = h.toPixels(b - u - m, !0))
                : this.grabbedRight && (d = h.toPixels(a + u + m, !0))
              : k(w) &&
                I(y - m) > w &&
                (this.grabbedLeft
                  ? (c = h.toPixels(b - w - m, !0))
                  : this.grabbedRight && (d = h.toPixels(a + w + m, !0)));
            this.zoomedMax = l(Math.max(c, d), 0, v);
            this.zoomedMin = l(
              this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(c, d),
              0,
              v
            );
            this.range = this.zoomedMax - this.zoomedMin;
            v = Math.round(this.zoomedMax);
            c = Math.round(this.zoomedMin);
            p &&
              (this.navigatorGroup.attr({ visibility: "visible" }),
              (r = r && !this.hasDragged ? "animate" : "attr"),
              this.drawMasks(c, v, t, r),
              this.drawOutline(c, v, t, r),
              this.navigatorOptions.handles.enabled &&
                (this.drawHandle(c, 0, t, r), this.drawHandle(v, 1, t, r)));
            this.scrollbar &&
              (t
                ? ((t = this.top - f),
                  (n =
                    this.left -
                    f +
                    (p || !n.opposite ? 0 : (n.titleOffset || 0) + n.axisTitleMargin)),
                  (f = g + 2 * f))
                : ((t = this.top + (p ? this.height : -f)), (n = this.left - f)),
              this.scrollbar.position(n, t, e, f),
              this.scrollbar.setRange(this.zoomedMin / (g || 1), this.zoomedMax / (g || 1)));
            this.rendered = !0;
          }
        };
        h.prototype.addMouseEvents = function () {
          var a = this,
            b = a.chart,
            c = b.container,
            d = [],
            e,
            g;
          a.mouseMoveHandler = e = function (b) {
            a.onMouseMove(b);
          };
          a.mouseUpHandler = g = function (b) {
            a.onMouseUp(b);
          };
          d = a.getPartsEvents("mousedown");
          d.push(u(b.renderTo, "mousemove", e), u(c.ownerDocument, "mouseup", g));
          f &&
            (d.push(u(b.renderTo, "touchmove", e), u(c.ownerDocument, "touchend", g)),
            d.concat(a.getPartsEvents("touchstart")));
          a.eventsToUnbind = d;
          a.series &&
            a.series[0] &&
            d.push(
              u(a.series[0].xAxis, "foundExtremes", function () {
                b.navigator.modifyNavigatorAxisExtremes();
              })
            );
        };
        h.prototype.getPartsEvents = function (a) {
          var b = this,
            c = [];
          ["shades", "handles"].forEach(function (d) {
            b[d].forEach(function (e, f) {
              c.push(
                u(e.element, a, function (a) {
                  b[d + "Mousedown"](a, f);
                })
              );
            });
          });
          return c;
        };
        h.prototype.shadesMousedown = function (a, b) {
          a = this.chart.pointer.normalize(a);
          var c = this.chart,
            d = this.xAxis,
            e = this.zoomedMin,
            f = this.left,
            g = this.size,
            h = this.range,
            l = a.chartX;
          c.inverted && ((l = a.chartY), (f = this.top));
          if (1 === b) (this.grabbedCenter = l), (this.fixedWidth = h), (this.dragOffset = l - e);
          else {
            a = l - f - h / 2;
            if (0 === b) a = Math.max(0, a);
            else if (2 === b && a + h >= g)
              if (((a = g - h), this.reversedExtremes)) {
                a -= h;
                var m = this.getUnionExtremes().dataMin;
              } else var n = this.getUnionExtremes().dataMax;
            a !== e &&
              ((this.fixedWidth = h),
              (b = d.navigatorAxis.toFixedRange(a, a + h, m, n)),
              k(b.min) &&
                c.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
                  trigger: "navigator",
                }));
          }
        };
        h.prototype.handlesMousedown = function (a, b) {
          this.chart.pointer.normalize(a);
          a = this.chart;
          var c = a.xAxis[0],
            d = this.reversedExtremes;
          0 === b
            ? ((this.grabbedLeft = !0),
              (this.otherHandlePos = this.zoomedMax),
              (this.fixedExtreme = d ? c.min : c.max))
            : ((this.grabbedRight = !0),
              (this.otherHandlePos = this.zoomedMin),
              (this.fixedExtreme = d ? c.max : c.min));
          a.fixedRange = null;
        };
        h.prototype.onMouseMove = function (a) {
          var c = this,
            d = c.chart,
            e = c.left,
            f = c.navigatorSize,
            g = c.range,
            h = c.dragOffset,
            k = d.inverted;
          (a.touches && 0 === a.touches[0].pageX) ||
            ((a = d.pointer.normalize(a)),
            (d = a.chartX),
            k && ((e = c.top), (d = a.chartY)),
            c.grabbedLeft
              ? ((c.hasDragged = !0), c.render(0, 0, d - e, c.otherHandlePos))
              : c.grabbedRight
              ? ((c.hasDragged = !0), c.render(0, 0, c.otherHandlePos, d - e))
              : c.grabbedCenter &&
                ((c.hasDragged = !0),
                d < h ? (d = h) : d > f + h - g && (d = f + h - g),
                c.render(0, 0, d - h, d - h + g)),
            c.hasDragged &&
              c.scrollbar &&
              B(c.scrollbar.options.liveRedraw, y.svg && !b && !this.chart.isBoosting) &&
              ((a.DOMType = a.type),
              setTimeout(function () {
                c.onMouseUp(a);
              }, 0)));
        };
        h.prototype.onMouseUp = function (a) {
          var b = this.chart,
            c = this.xAxis,
            d = this.scrollbar,
            e = a.DOMEvent || a,
            f = b.inverted,
            g = this.rendered && !this.hasDragged ? "animate" : "attr";
          if ((this.hasDragged && (!d || !d.hasDragged)) || "scrollbar" === a.trigger) {
            d = this.getUnionExtremes();
            if (this.zoomedMin === this.otherHandlePos) var h = this.fixedExtreme;
            else if (this.zoomedMax === this.otherHandlePos) var l = this.fixedExtreme;
            this.zoomedMax === this.size && (l = this.reversedExtremes ? d.dataMin : d.dataMax);
            0 === this.zoomedMin && (h = this.reversedExtremes ? d.dataMax : d.dataMin);
            c = c.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, h, l);
            k(c.min) &&
              b.xAxis[0].setExtremes(
                Math.min(c.min, c.max),
                Math.max(c.min, c.max),
                !0,
                this.hasDragged ? !1 : null,
                { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: e }
              );
          }
          "mousemove" !== a.DOMType &&
            "touchmove" !== a.DOMType &&
            (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null);
          this.navigatorEnabled &&
            q(this.zoomedMin) &&
            q(this.zoomedMax) &&
            ((b = Math.round(this.zoomedMin)),
            (a = Math.round(this.zoomedMax)),
            this.shades && this.drawMasks(b, a, f, g),
            this.outline && this.drawOutline(b, a, f, g),
            this.navigatorOptions.handles.enabled &&
              Object.keys(this.handles).length === this.handles.length &&
              (this.drawHandle(b, 0, f, g), this.drawHandle(a, 1, f, g)));
        };
        h.prototype.removeEvents = function () {
          this.eventsToUnbind &&
            (this.eventsToUnbind.forEach(function (a) {
              a();
            }),
            (this.eventsToUnbind = void 0));
          this.removeBaseSeriesEvents();
        };
        h.prototype.removeBaseSeriesEvents = function () {
          var a = this.baseSeries || [];
          this.navigatorEnabled &&
            a[0] &&
            (!1 !== this.navigatorOptions.adaptToUpdatedData &&
              a.forEach(function (a) {
                J(a, "updatedData", this.updatedDataHandler);
              }, this),
            a[0].xAxis && J(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
        };
        h.prototype.init = function (b) {
          var c = b.options,
            d = c.navigator,
            f = d.enabled,
            g = c.scrollbar,
            h = g.enabled;
          c = f ? d.height : 0;
          var k = h ? g.height : 0;
          this.handles = [];
          this.shades = [];
          this.chart = b;
          this.setBaseSeries();
          this.height = c;
          this.scrollbarHeight = k;
          this.scrollbarEnabled = h;
          this.navigatorEnabled = f;
          this.navigatorOptions = d;
          this.scrollbarOptions = g;
          this.outlineHeight = c + k;
          this.opposite = B(d.opposite, !(f || !b.inverted));
          var l = this;
          f = l.baseSeries;
          g = b.xAxis.length;
          h = b.yAxis.length;
          var m = (f && f[0] && f[0].xAxis) || b.xAxis[0] || { options: {} };
          b.isDirtyBox = !0;
          l.navigatorEnabled
            ? ((l.xAxis = new e(
                b,
                a(
                  { breaks: m.options.breaks, ordinal: m.options.ordinal },
                  d.xAxis,
                  {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: g,
                    isInternal: !0,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1,
                  },
                  b.inverted
                    ? { offsets: [k, 0, -k, 0], width: c }
                    : { offsets: [0, -k, 0, k], height: c }
                )
              )),
              (l.yAxis = new e(
                b,
                a(
                  d.yAxis,
                  {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: h,
                    isInternal: !0,
                    reversed: B(d.yAxis && d.yAxis.reversed, b.yAxis[0] && b.yAxis[0].reversed, !1),
                    zoomEnabled: !1,
                  },
                  b.inverted ? { width: c } : { height: c }
                )
              )),
              f || d.series.data
                ? l.updateNavigatorSeries(!1)
                : 0 === b.series.length &&
                  (l.unbindRedraw = u(b, "beforeRedraw", function () {
                    0 < b.series.length && !l.series && (l.setBaseSeries(), l.unbindRedraw());
                  })),
              (l.reversedExtremes =
                (b.inverted && !l.xAxis.reversed) || (!b.inverted && l.xAxis.reversed)),
              l.renderElements(),
              l.addMouseEvents())
            : ((l.xAxis = {
                chart: b,
                navigatorAxis: { fake: !0 },
                translate: function (a, c) {
                  var d = b.xAxis[0],
                    e = d.getExtremes(),
                    f = d.len - 2 * k,
                    g = p("min", d.options.min, e.dataMin);
                  d = p("max", d.options.max, e.dataMax) - g;
                  return c ? (a * d) / f + g : (f * (a - g)) / d;
                },
                toPixels: function (a) {
                  return this.translate(a);
                },
                toValue: function (a) {
                  return this.translate(a, !0);
                },
              }),
              (l.xAxis.navigatorAxis.axis = l.xAxis),
              (l.xAxis.navigatorAxis.toFixedRange = F.AdditionsClass.prototype.toFixedRange.bind(
                l.xAxis.navigatorAxis
              )));
          b.options.scrollbar.enabled &&
            ((b.scrollbar = l.scrollbar = new G(
              b.renderer,
              a(b.options.scrollbar, { margin: l.navigatorEnabled ? 0 : 10, vertical: b.inverted }),
              b
            )),
            u(l.scrollbar, "changed", function (a) {
              var b = l.size,
                c = b * this.to;
              b *= this.from;
              l.hasDragged = l.scrollbar.hasDragged;
              l.render(0, 0, b, c);
              this.shouldUpdateExtremes(a.DOMType) &&
                setTimeout(function () {
                  l.onMouseUp(a);
                });
            }));
          l.addBaseSeriesEvents();
          l.addChartEvents();
        };
        h.prototype.getUnionExtremes = function (a) {
          var b = this.chart.xAxis[0],
            c = this.xAxis,
            d = c.options,
            e = b.options,
            f;
          (a && null === b.dataMin) ||
            (f = {
              dataMin: B(d && d.min, p("min", e.min, b.dataMin, c.dataMin, c.min)),
              dataMax: B(d && d.max, p("max", e.max, b.dataMax, c.dataMax, c.max)),
            });
          return f;
        };
        h.prototype.setBaseSeries = function (a, b) {
          var c = this.chart,
            d = (this.baseSeries = []);
          a =
            a ||
            (c.options && c.options.navigator.baseSeries) ||
            (c.series.length
              ? g(c.series, function (a) {
                  return !a.options.isInternal;
                }).index
              : 0);
          (c.series || []).forEach(function (b, c) {
            b.options.isInternal ||
              (!b.options.showInNavigator &&
                ((c !== a && b.options.id !== a) || !1 === b.options.showInNavigator)) ||
              d.push(b);
          });
          this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0, b);
        };
        h.prototype.updateNavigatorSeries = function (b, d) {
          var e = this,
            f = e.chart,
            g = e.baseSeries,
            h,
            k,
            l = e.navigatorOptions.series,
            m,
            p = {
              enableMouseTracking: !1,
              index: null,
              linkedTo: null,
              group: "nav",
              padXAxis: !1,
              xAxis: "navigator-x-axis",
              yAxis: "navigator-y-axis",
              showInLegend: !1,
              stacking: void 0,
              isInternal: !0,
              states: { inactive: { opacity: 1 } },
            },
            q = (e.series = (e.series || []).filter(function (a) {
              var b = a.baseSeries;
              return 0 > g.indexOf(b)
                ? (b && (J(b, "updatedData", e.updatedDataHandler), delete b.navigatorSeries),
                  a.chart && a.destroy(),
                  !1)
                : !0;
            }));
          g &&
            g.length &&
            g.forEach(function (b) {
              var r = b.navigatorSeries,
                t = n({ color: b.color, visible: b.visible }, c(l) ? A.navigator.series : l);
              (r && !1 === e.navigatorOptions.adaptToUpdatedData) ||
                ((p.name = "Navigator " + g.length),
                (h = b.options || {}),
                (m = h.navigatorOptions || {}),
                (t.dataLabels = O(t.dataLabels)),
                (k = a(h, p, t, m)),
                (k.pointRange = B(
                  t.pointRange,
                  m.pointRange,
                  A.plotOptions[k.type || "line"].pointRange
                )),
                (t = m.data || t.data),
                (e.hasNavigatorData = e.hasNavigatorData || !!t),
                (k.data = t || (h.data && h.data.slice(0))),
                r && r.options
                  ? r.update(k, d)
                  : ((b.navigatorSeries = f.initSeries(k)),
                    (b.navigatorSeries.baseSeries = b),
                    q.push(b.navigatorSeries)));
            });
          if ((l.data && (!g || !g.length)) || c(l))
            (e.hasNavigatorData = !1),
              (l = O(l)),
              l.forEach(function (b, c) {
                p.name = "Navigator " + (q.length + 1);
                k = a(
                  A.navigator.series,
                  {
                    color:
                      (f.series[c] && !f.series[c].options.isInternal && f.series[c].color) ||
                      f.options.colors[c] ||
                      f.options.colors[0],
                  },
                  p,
                  b
                );
                k.data = b.data;
                k.data && ((e.hasNavigatorData = !0), q.push(f.initSeries(k)));
              });
          b && this.addBaseSeriesEvents();
        };
        h.prototype.addBaseSeriesEvents = function () {
          var a = this,
            b = a.baseSeries || [];
          b[0] &&
            b[0].xAxis &&
            b[0].eventsToUnbind.push(u(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
          b.forEach(function (b) {
            b.eventsToUnbind.push(
              u(b, "show", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1);
              })
            );
            b.eventsToUnbind.push(
              u(b, "hide", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1);
              })
            );
            !1 !== this.navigatorOptions.adaptToUpdatedData &&
              b.xAxis &&
              b.eventsToUnbind.push(u(b, "updatedData", this.updatedDataHandler));
            b.eventsToUnbind.push(
              u(b, "remove", function () {
                this.navigatorSeries &&
                  (w(a.series, this.navigatorSeries),
                  k(this.navigatorSeries.options) && this.navigatorSeries.remove(!1),
                  delete this.navigatorSeries);
              })
            );
          }, this);
        };
        h.prototype.getBaseSeriesMin = function (a) {
          return this.baseSeries.reduce(function (a, b) {
            return Math.min(a, b.xData ? b.xData[0] : a);
          }, a);
        };
        h.prototype.modifyNavigatorAxisExtremes = function () {
          var a = this.xAxis,
            b;
          "undefined" !== typeof a.getExtremes &&
            (!(b = this.getUnionExtremes(!0)) ||
              (b.dataMin === a.min && b.dataMax === a.max) ||
              ((a.min = b.dataMin), (a.max = b.dataMax)));
        };
        h.prototype.modifyBaseAxisExtremes = function () {
          var a = this.chart.navigator,
            b = this.getExtremes(),
            c = b.dataMin,
            d = b.dataMax;
          b = b.max - b.min;
          var e = a.stickToMin,
            f = a.stickToMax,
            g = B(this.options.overscroll, 0),
            h = a.series && a.series[0],
            k = !!this.setExtremes;
          if (!this.eventArgs || "rangeSelectorButton" !== this.eventArgs.trigger) {
            if (e) {
              var l = c;
              var m = l + b;
            }
            f &&
              ((m = d + g),
              e ||
                (l = Math.max(
                  c,
                  m - b,
                  a.getBaseSeriesMin(h && h.xData ? h.xData[0] : -Number.MAX_VALUE)
                )));
            k && (e || f) && q(l) && ((this.min = this.userMin = l), (this.max = this.userMax = m));
          }
          a.stickToMin = a.stickToMax = null;
        };
        h.prototype.updatedDataHandler = function () {
          var a = this.chart.navigator,
            b = this.navigatorSeries,
            c = a.getBaseSeriesMin(this.xData[0]);
          a.stickToMax = a.reversedExtremes
            ? 0 === Math.round(a.zoomedMin)
            : Math.round(a.zoomedMax) >= Math.round(a.size);
          a.stickToMin =
            q(this.xAxis.min) && this.xAxis.min <= c && (!this.chart.fixedRange || !a.stickToMax);
          b &&
            !a.hasNavigatorData &&
            ((b.options.pointStart = this.xData[0]), b.setData(this.options.data, !1, null, !1));
        };
        h.prototype.addChartEvents = function () {
          this.eventsToUnbind || (this.eventsToUnbind = []);
          this.eventsToUnbind.push(
            u(this.chart, "redraw", function () {
              var a = this.navigator,
                b =
                  a &&
                  ((a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis) || this.xAxis[0]);
              b && a.render(b.min, b.max);
            }),
            u(this.chart, "getMargins", function () {
              var a = this.navigator,
                b = a.opposite ? "plotTop" : "marginBottom";
              this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
              this[b] =
                (this[b] || 0) +
                (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) +
                a.navigatorOptions.margin;
            })
          );
        };
        h.prototype.destroy = function () {
          this.removeEvents();
          this.xAxis && (w(this.chart.xAxis, this.xAxis), w(this.chart.axes, this.xAxis));
          this.yAxis && (w(this.chart.yAxis, this.yAxis), w(this.chart.axes, this.yAxis));
          (this.series || []).forEach(function (a) {
            a.destroy && a.destroy();
          });
          "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered"
            .split(" ")
            .forEach(function (a) {
              this[a] && this[a].destroy && this[a].destroy();
              this[a] = null;
            }, this);
          [this.handles].forEach(function (a) {
            d(a);
          }, this);
        };
        return h;
      })();
      y.Navigator ||
        ((y.Navigator = r),
        F.compose(e),
        u(h, "beforeShowResetZoom", function () {
          var a = this.options,
            c = a.navigator,
            d = a.rangeSelector;
          if (
            ((c && c.enabled) || (d && d.enabled)) &&
            ((!b && "x" === a.chart.zoomType) || (b && "x" === a.chart.pinchType))
          )
            return !1;
        }),
        u(h, "beforeRender", function () {
          var a = this.options;
          if (a.navigator.enabled || a.scrollbar.enabled)
            this.scroller = this.navigator = new r(this);
        }),
        u(h, "afterSetChartSize", function () {
          var a = this.legend,
            b = this.navigator;
          if (b) {
            var c = a && a.options;
            var d = b.xAxis;
            var e = b.yAxis;
            var f = b.scrollbarHeight;
            this.inverted
              ? ((b.left = b.opposite ? this.chartWidth - f - b.height : this.spacing[3] + f),
                (b.top = this.plotTop + f))
              : ((b.left = this.plotLeft + f),
                (b.top =
                  b.navigatorOptions.top ||
                  this.chartHeight -
                    b.height -
                    f -
                    this.spacing[2] -
                    (this.rangeSelector && this.extraBottomMargin
                      ? this.rangeSelector.getHeight()
                      : 0) -
                    (c &&
                    "bottom" === c.verticalAlign &&
                    "proximate" !== c.layout &&
                    c.enabled &&
                    !c.floating
                      ? a.legendHeight + B(c.margin, 10)
                      : 0) -
                    (this.titleOffset ? this.titleOffset[2] : 0)));
            d &&
              e &&
              (this.inverted
                ? (d.options.left = e.options.left = b.left)
                : (d.options.top = e.options.top = b.top),
              d.setAxisSize(),
              e.setAxisSize());
          }
        }),
        u(h, "update", function (b) {
          var c = b.options.navigator || {},
            d = b.options.scrollbar || {};
          this.navigator ||
            this.scroller ||
            (!c.enabled && !d.enabled) ||
            (a(!0, this.options.navigator, c),
            a(!0, this.options.scrollbar, d),
            delete b.options.navigator,
            delete b.options.scrollbar);
        }),
        u(h, "afterUpdate", function (a) {
          this.navigator ||
            this.scroller ||
            (!this.options.navigator.enabled && !this.options.scrollbar.enabled) ||
            ((this.scroller = this.navigator = new r(this)),
            B(a.redraw, !0) && this.redraw(a.animation));
        }),
        u(h, "afterAddSeries", function () {
          this.navigator && this.navigator.setBaseSeries(null, !1);
        }),
        u(t, "afterUpdate", function () {
          this.chart.navigator &&
            !this.options.isInternal &&
            this.chart.navigator.setBaseSeries(null, !1);
        }),
        h.prototype.callbacks.push(function (a) {
          var b = a.navigator;
          b && a.xAxis[0] && ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max));
        }));
      y.Navigator = r;
      return y.Navigator;
    }
  );
  P(
    e,
    "masters/modules/gantt.src.js",
    [e["Core/Globals.js"], e["Core/Chart/GanttChart.js"]],
    function (e, h) {
      e.GanttChart = h;
      e.ganttChart = h.ganttChart;
    }
  );
  P(e, "masters/highcharts-gantt.src.js", [e["masters/highcharts.src.js"]], function (e) {
    e.product = "Highcharts Gantt";
    return e;
  });
  e["masters/highcharts-gantt.src.js"]._modules = e;
  return e["masters/highcharts-gantt.src.js"];
});
//# sourceMappingURL=highcharts-gantt.js.map
