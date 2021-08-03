var f = Object.prototype.hasOwnProperty;
var o = Object.getOwnPropertySymbols,
  u = Object.prototype.propertyIsEnumerable;
var l = Object.assign;
var n = (e, i) => {
  var t = {};
  for (var r in e) f.call(e, r) && i.indexOf(r) < 0 && (t[r] = e[r]);
  if (e != null && o)
    for (var r of o(e)) i.indexOf(r) < 0 && u.call(e, r) && (t[r] = e[r]);
  return t;
};
import a from 'react';
import m from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider as s,
  TimePicker as d
} from '@material-ui/pickers';
function c(t) {
  var { forwardedRef: e } = t,
    i = n(t, ['forwardedRef']);
  return a.createElement(
    s,
    { utils: m, locale: i.locale },
    a.createElement(
      d,
      l(l({}, i), {
        ref: e,
        format: 'HH:mm:ss',
        value: i.value || null,
        onChange: i.onChange,
        clearable: !0,
        InputProps: { style: { fontSize: 13 } },
        inputProps: {
          'aria-label': `${i.columnDef.title}: press space to edit`
        }
      })
    )
  );
}
export default a.forwardRef(function (i, t) {
  return a.createElement(c, l(l({}, i), { forwardedRef: t }));
});
