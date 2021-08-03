var m = Object.prototype.hasOwnProperty;
var s = Object.getOwnPropertySymbols,
  P = Object.prototype.propertyIsEnumerable;
var i = Object.assign;
var d = (t, a) => {
  var r = {};
  for (var e in t) m.call(t, e) && a.indexOf(e) < 0 && (r[e] = t[e]);
  if (t != null && s)
    for (var e of s(t)) a.indexOf(e) < 0 && P.call(t, e) && (r[e] = t[e]);
  return r;
};
import o from 'react';
import g from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider as k,
  DatePicker as w
} from '@material-ui/pickers';
function y(l) {
  var { columnDef: t, value: a, onChange: r, locale: e, forwardedRef: f } = l,
    n = d(l, ['columnDef', 'value', 'onChange', 'locale', 'forwardedRef']);
  const p = () => {
      const {
        columnDef: S,
        rowData: h,
        onRowDataChange: D,
        errorState: F,
        onBulkEditRowChanged: M,
        scrollWidth: v
      } = n;
      return d(n, [
        'columnDef',
        'rowData',
        'onRowDataChange',
        'errorState',
        'onBulkEditRowChanged',
        'scrollWidth'
      ]);
    },
    u =
      t.dateSetting && t.dateSetting.format
        ? t.dateSetting.format
        : 'dd.MM.yyyy',
    c = p();
  return o.createElement(
    k,
    { utils: g, locale: e },
    o.createElement(
      w,
      i(i({}, c), {
        ref: f,
        format: u,
        value: a || null,
        onChange: r,
        clearable: !0,
        InputProps: { style: { fontSize: 13 } },
        inputProps: { 'aria-label': `${t.title}: press space to edit` }
      })
    )
  );
}
export default o.forwardRef(function (a, r) {
  return o.createElement(y, i(i({}, a), { forwardedRef: r }));
});
