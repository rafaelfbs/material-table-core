var a = Object.assign;
import e from 'react';
import {
  getLocalizedFilterPlaceHolder as f,
  getLocalizationData as s
} from './utils';
import {
  InputAdornment as m,
  TextField as F,
  Tooltip as c
} from '@material-ui/core';
function b({
  columnDef: t,
  icons: r,
  localization: i,
  hideFilterIcons: o,
  onFilterChanged: l,
  forwardedRef: n
}) {
  const p = s(i),
    d = r.Filter;
  return e.createElement(F, {
    ref: n,
    style: t.type === 'numeric' ? { float: 'right' } : {},
    type: t.type === 'numeric' ? 'number' : 'search',
    value: t.tableData.filterValue || '',
    placeholder: f(t),
    onChange: (u) => {
      l(t.tableData.id, u.target.value);
    },
    inputProps: { 'aria-label': `filter data by ${t.title}` },
    InputProps:
      o || t.hideFilterIcon
        ? void 0
        : {
            startAdornment: e.createElement(
              m,
              { position: 'start' },
              e.createElement(
                c,
                { title: p.filterTooltip },
                e.createElement(d, null)
              )
            )
          }
  });
}
export default e.forwardRef(function (r, i) {
  return e.createElement(b, a(a({}, r), { forwardedRef: i }));
});
