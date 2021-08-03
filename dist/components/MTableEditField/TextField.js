var a = Object.prototype.hasOwnProperty;
var r = Object.getOwnPropertySymbols,
  m = Object.prototype.propertyIsEnumerable;
var u = Object.assign;
var f = (l, e) => {
  var n = {};
  for (var t in l) a.call(l, t) && e.indexOf(t) < 0 && (n[t] = l[t]);
  if (l != null && r)
    for (var t of r(l)) e.indexOf(t) < 0 && m.call(l, t) && (n[t] = l[t]);
  return n;
};
import i from 'react';
import { TextField as c } from '@material-ui/core';
function d(n) {
  var { forwardedRef: l } = n,
    e = f(n, ['forwardedRef']);
  return i.createElement(
    c,
    u(u({}, e), {
      ref: l,
      fullWidth: !0,
      type: e.columnDef.type === 'numeric' ? 'number' : 'text',
      placeholder: e.columnDef.editPlaceholder || e.columnDef.title,
      value: e.value === void 0 ? '' : e.value,
      onChange: (t) =>
        e.onChange(
          e.columnDef.type === 'numeric'
            ? t.target.valueAsNumber
            : t.target.value
        ),
      InputProps: { style: { minWidth: 50, fontSize: 13 } },
      inputProps: {
        'aria-label': e.columnDef.title,
        style: e.columnDef.type === 'numeric' ? { textAlign: 'right' } : {}
      }
    })
  );
}
export default i.forwardRef(function (e, n) {
  return i.createElement(d, u(u({}, e), { forwardedRef: n }));
});
