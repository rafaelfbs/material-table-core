var f = Object.prototype.hasOwnProperty;
var u = Object.getOwnPropertySymbols,
  m = Object.prototype.propertyIsEnumerable;
var n = Object.assign;
var a = (l, o) => {
  var r = {};
  for (var e in l) f.call(l, e) && o.indexOf(e) < 0 && (r[e] = l[e]);
  if (l != null && u)
    for (var e of u(l)) o.indexOf(e) < 0 && m.call(l, e) && (r[e] = l[e]);
  return r;
};
import t from 'react';
import {
  FormControl as i,
  Select as d,
  MenuItem as c,
  FormHelperText as F
} from '@material-ui/core';
function v(r) {
  var { forwardedRef: l } = r,
    o = a(r, ['forwardedRef']);
  return t.createElement(
    i,
    { ref: l, error: Boolean(o.error) },
    t.createElement(
      d,
      n(n({}, o), {
        value: o.value === void 0 ? '' : o.value,
        onChange: (e) => o.onChange(e.target.value),
        style: { fontSize: 13 },
        SelectDisplayProps: { 'aria-label': o.columnDef.title }
      }),
      Object.keys(o.columnDef.lookup).map((e) =>
        t.createElement(c, { key: e, value: e }, o.columnDef.lookup[e])
      )
    ),
    Boolean(helperText) && t.createElement(F, null, helperText)
  );
}
export default t.forwardRef(function (o, r) {
  return t.createElement(v, n(n({}, o), { forwardedRef: r }));
});
