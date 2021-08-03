'use strict';
Array.prototype.find ||
  Object.defineProperty(Array.prototype, 'find', {
    value: function (n) {
      if (this == null) throw new TypeError('"this" is null or not defined');
      const e = Object(this),
        o = e.length >>> 0;
      if (typeof n != 'function')
        throw new TypeError('predicate must be a function');
      const i = arguments[1];
      let t = 0;
      for (; t < o; ) {
        const r = e[t];
        if (n.call(i, r, t, e)) return r;
        t++;
      }
    }
  });
