var u = Object.prototype.hasOwnProperty;
var a = Object.getOwnPropertySymbols,
  m = Object.prototype.propertyIsEnumerable;
var f = Object.assign;
var i = (r, t) => {
  var o = {};
  for (var e in r) u.call(r, e) && t.indexOf(e) < 0 && (o[e] = r[e]);
  if (r != null && a)
    for (var e of a(r)) t.indexOf(e) < 0 && m.call(r, e) && (o[e] = r[e]);
  return o;
};
import n from 'react';
import { Paper as d } from '@material-ui/core';
function p(o) {
  var { forwardedRef: r } = o,
    t = i(o, ['forwardedRef']);
  return n.createElement(d, f(f({ elevation: 2 }, t), { ref: r }));
}
export default n.forwardRef(function (t, o) {
  return n.createElement(p, f(f({}, t), { forwardedRef: o }));
});
