var e = Object.assign;
import i from 'react';
import d from '@date-io/date-fns';
import { getLocalizedFilterPlaceHolder as u } from './utils';
import {
  DatePicker as f,
  DateTimePicker as c,
  MuiPickersUtilsProvider as m,
  TimePicker as P
} from '@material-ui/pickers';
function k({
  columnDef: t,
  onFilterChanged: a,
  localization: l,
  forwardedRef: o
}) {
  const s = (p) => a(t.tableData.id, p),
    n = {
      value: t.tableData.filterValue || null,
      onChange: s,
      placeholder: u(t),
      clearable: !0
    };
  let r = null;
  return (
    t.type === 'date'
      ? (r = i.createElement(f, e(e({}, n), { ref: o })))
      : t.type === 'datetime'
      ? (r = i.createElement(c, e(e({}, n), { ref: o })))
      : t.type === 'time' && (r = i.createElement(P, e(e({}, n), { ref: o }))),
    i.createElement(m, { utils: d, locale: l.dateTimePickerLocalization }, r)
  );
}
export default i.forwardRef(function (a, l) {
  return i.createElement(k, e(e({}, a), { forwardedRef: l }));
});
