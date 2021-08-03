var o = Object.assign;
import i from 'react';
import n from 'prop-types';
import u from './DateFilter';
import s from './LookupFilter';
import m from './DefaultFilter';
import c from './BooleanFilter';
import y from './Filter';
import { TableCell as r, TableRow as b } from '@material-ui/core';
export function MTableFilterRow(l) {
  function a(e) {
    if (e.filtering === !1) return null;
    if (e.field || e.customFilterAndSearch)
      return e.filterComponent
        ? i.createElement(y, o({ columnDef: e }, l))
        : e.lookup
        ? i.createElement(s, o({ columnDef: e }, l))
        : e.type === 'boolean'
        ? i.createElement(c, o({ columnDef: e }, l))
        : ['date', 'datetime', 'time'].includes(e.type)
        ? i.createElement(u, o({ columnDef: e }, l))
        : i.createElement(m, o({ columnDef: e }, l));
  }
  function f() {
    const e = l.columns
      .filter((t) => !t.hidden && !(t.tableData.groupOrder > -1))
      .sort((t, d) => t.tableData.columnOrder - d.tableData.columnOrder)
      .map((t) =>
        i.createElement(
          r,
          {
            key: t.tableData.id,
            style: o(o({}, l.filterCellStyle), t.filterCellStyle)
          },
          a(t)
        )
      );
    if (
      (l.selection &&
        e.splice(
          0,
          0,
          i.createElement(r, { padding: 'none', key: 'key-selection-column' })
        ),
      l.hasActions)
    )
      if (l.actionsColumnIndex === -1)
        e.push(i.createElement(r, { key: 'key-action-column' }));
      else {
        let t = 0;
        l.selection && (t = 1),
          e.splice(
            l.actionsColumnIndex + t,
            0,
            i.createElement(r, { key: 'key-action-column' })
          );
      }
    if (l.hasDetailPanel) {
      const d = l.detailPanelColumnAlignment === 'left' ? 0 : e.length;
      e.splice(
        d,
        0,
        i.createElement(r, { padding: 'none', key: 'key-detail-panel-column' })
      );
    }
    return (
      l.isTreeData > 0 &&
        e.splice(
          0,
          0,
          i.createElement(r, { padding: 'none', key: 'key-tree-data-filter' })
        ),
      l.columns
        .filter((t) => t.tableData.groupOrder > -1)
        .forEach((t) => {
          e.splice(
            0,
            0,
            i.createElement(r, {
              padding: 'checkbox',
              key: 'key-group-filter' + t.tableData.id
            })
          );
        }),
      i.createElement(
        b,
        {
          id: 'm--table--filter--row',
          ref: l.forwardedRef,
          style: o({ height: 10 }, l.filterRowStyle)
        },
        e
      )
    );
  }
  return f();
}
(MTableFilterRow.defaultProps = {
  columns: [],
  detailPanelColumnAlignment: 'left',
  selection: !1,
  hasActions: !1,
  localization: { filterTooltip: 'Filter' },
  hideFilterIcons: !1
}),
  (MTableFilterRow.propTypes = {
    columns: n.array.isRequired,
    hasDetailPanel: n.bool.isRequired,
    detailPanelColumnAlignment: n.string,
    isTreeData: n.bool.isRequired,
    onFilterChanged: n.func.isRequired,
    filterCellStyle: n.object,
    filterRowStyle: n.object,
    selection: n.bool.isRequired,
    actionsColumnIndex: n.number,
    hasActions: n.bool,
    localization: n.object,
    hideFilterIcons: n.bool
  });
export default i.forwardRef(function (a, f) {
  return i.createElement(MTableFilterRow, o(o({}, a), { forwardedRef: f }));
});
