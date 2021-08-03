var o = Object.assign;
import r, { useEffect as s, useState as d } from 'react';
import { getLocalizedFilterPlaceHolder as n } from './utils';
import {
  Checkbox as b,
  FormControl as m,
  Input as I,
  InputLabel as f,
  ListItemText as c,
  MenuItem as h,
  Select as k
} from '@material-ui/core';
const g = 48,
  x = 8,
  F = { PaperProps: { style: { maxHeight: g * 4.5 + x, width: 250 } } };
function P({ columnDef: t, onFilterChanged: l, forwardedRef: a }) {
  const [i, p] = d(t.tableData.filterValue || []);
  return (
    s(() => {
      p(t.tableData.filterValue || []);
    }, [t.tableData.filterValue]),
    r.createElement(
      m,
      { style: { width: '100%' }, ref: a },
      r.createElement(
        f,
        {
          htmlFor: 'select-multiple-checkbox' + t.tableData.id,
          style: { marginTop: -16 }
        },
        n(t)
      ),
      r.createElement(
        k,
        {
          multiple: !0,
          value: i,
          onClose: () => {
            t.filterOnItemSelect !== !0 && l(t.tableData.id, i);
          },
          onChange: (e) => {
            p(e.target.value),
              t.filterOnItemSelect === !0 && l(t.tableData.id, e.target.value);
          },
          input: r.createElement(I, {
            id: 'select-multiple-checkbox' + t.tableData.id
          }),
          renderValue: (e) => e.map((u) => t.lookup[u]).join(', '),
          MenuProps: F,
          style: { marginTop: 0 }
        },
        Object.keys(t.lookup).map((e) =>
          r.createElement(
            h,
            { key: e, value: e },
            r.createElement(b, { checked: i.indexOf(e.toString()) > -1 }),
            r.createElement(c, { primary: t.lookup[e] })
          )
        )
      )
    )
  );
}
export default r.forwardRef(function (l, a) {
  return r.createElement(P, o(o({}, l), { forwardedRef: a }));
});
