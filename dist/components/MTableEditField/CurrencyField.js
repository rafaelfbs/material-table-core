var f = Object.prototype.hasOwnProperty;
var a = Object.getOwnPropertySymbols,
  d = Object.prototype.propertyIsEnumerable;
var l = Object.assign;
var o = (n, e) => {
  var u = {};
  for (var t in n) f.call(n, t) && e.indexOf(t) < 0 && (u[t] = n[t]);
  if (n != null && a)
    for (var t of a(n)) e.indexOf(t) < 0 && d.call(n, t) && (u[t] = n[t]);
  return u;
};
import i from 'react';
import { TextField as c } from '@material-ui/core';
function m(u) {
  var { forwardedRef: n } = u,
    e = o(u, ['forwardedRef']);
  return i.createElement(
    c,
    l(l({}, e), {
      ref: n,
      placeholder: e.columnDef.editPlaceholder || e.columnDef.title,
      type: 'number',
      value: e.value === void 0 ? '' : e.value,
      onChange: (t) => {
        let r = t.target.valueAsNumber;
        return !r && r !== 0 && (r = void 0), e.onChange(r);
      },
      InputProps: { style: { fontSize: 13, textAlign: 'right' } },
      inputProps: {
        'aria-label': e.columnDef.title,
        style: { textAlign: 'right' }
      },
      onKeyDown: e.onKeyDown,
      autoFocus: e.autoFocus
    })
  );
}
export default i.forwardRef(function (e, u) {
  return i.createElement(m, l(l({}, e), { forwardedRef: u }));
});
