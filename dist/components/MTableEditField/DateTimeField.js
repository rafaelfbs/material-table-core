var f = Object.prototype.hasOwnProperty;
var o = Object.getOwnPropertySymbols,
  u = Object.prototype.propertyIsEnumerable;
var a = Object.assign;
var n = (e, i) => {
  var t = {};
  for (var r in e) f.call(e, r) && i.indexOf(r) < 0 && (t[r] = e[r]);
  if (e != null && o)
    for (var r of o(e)) i.indexOf(r) < 0 && u.call(e, r) && (t[r] = e[r]);
  return t;
};
import l from 'react';
import m from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider as d,
  DateTimePicker as s
} from '@material-ui/pickers';
function c(t) {
  var { forwardedRef: e } = t,
    i = n(t, ['forwardedRef']);
  return l.createElement(
    d,
    { utils: m, locale: i.locale },
    l.createElement(
      s,
      a(a({}, i), {
        ref: e,
        format: 'dd.MM.yyyy HH:mm:ss',
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
export default l.forwardRef(function (i, t) {
  return l.createElement(c, a(a({}, i), { forwardedRef: t }));
});
