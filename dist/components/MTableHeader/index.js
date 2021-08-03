var L = Object.prototype.hasOwnProperty;
var w = Object.getOwnPropertySymbols,
  M = Object.prototype.propertyIsEnumerable;
var n = Object.assign;
var T = (d, e) => {
  var u = {};
  for (var r in d) L.call(d, r) && e.indexOf(r) < 0 && (u[r] = d[r]);
  if (d != null && w)
    for (var r of w(d)) e.indexOf(r) < 0 && M.call(d, r) && (u[r] = d[r]);
  return u;
};
import l, { useEffect as N } from 'react';
import o from 'prop-types';
import E from '@material-ui/core/TableHead';
import X from '@material-ui/core/TableRow';
import b from '@material-ui/core/TableCell';
import z from '@material-ui/core/TableSortLabel';
import B from '@material-ui/core/Checkbox';
import { Draggable as j } from 'react-beautiful-dnd';
import { Tooltip as q, withStyles as U } from '@material-ui/core';
import * as C from '../../utils/common-values';
export function MTableHeader(u) {
  var { onColumnResized: d } = u,
    e = T(u, ['onColumnResized']);
  const [
      { resizingColumnDef: r, lastX: m, lastAdditionalWidth: g },
      S
    ] = l.useState({ lastX: 0, resizingColumnDef: void 0 }),
    A = (a, i) => {
      let t = a.clientX;
      S((c) =>
        n(n({}, c), {
          lastAdditionalWidth: i.tableData.additionalWidth,
          lastX: t,
          resizingColumnDef: i
        })
      );
    },
    f = l.useCallback(
      (a) => {
        if (!r) return;
        let i = g + a.clientX - m;
        i = Math.min(r.maxWidth || i, i);
        let t = a.target.closest('th'),
          c = t && +window.getComputedStyle(t).width.slice(0, -2),
          s = c - r.tableData.additionalWidth + g - m + a.clientX;
        (s <= r.minWidth && s < c) ||
          (r.tableData.additionalWidth !== i && d(r.tableData.id, i));
      },
      [d, r, m, g]
    ),
    y = l.useCallback((a) => {
      S((i) => n(n({}, i), { resizingColumnDef: void 0 }));
    }, []);
  N(
    () => (
      document.addEventListener('mousemove', f),
      document.addEventListener('mouseup', y),
      () => {
        document.removeEventListener('mousemove', f),
          document.removeEventListener('mouseup', y);
      }
    ),
    [f, y]
  );
  const k = () => {
      const a = n(
          n({}, MTableHeader.defaultProps.localization),
          e.localization
        ),
        i = C.actionsColumnWidth(e);
      return l.createElement(
        b,
        {
          key: 'key-actions-column',
          padding: 'checkbox',
          className: e.classes.header,
          style: n(n({}, e.headerStyle), {
            width: i,
            textAlign: 'center',
            boxSizing: 'border-box'
          })
        },
        l.createElement(z, { hideSortIcon: !0, disabled: !0 }, a.actions)
      );
    },
    v = (a) => {
      const i = e.options.columnResizable
          ? C.reducePercentsInCalc(a.tableData.width, e.scrollWidth)
          : a.tableData.width,
        t = n(n(n({}, e.headerStyle), a.headerStyle), {
          boxSizing: 'border-box',
          width: i,
          maxWidth: a.maxWidth,
          minWidth: a.minWidth
        });
      return (
        e.options.tableLayout === 'fixed' &&
          e.options.columnResizable &&
          a.resizable !== !1 &&
          (t.paddingRight = 2),
        t
      );
    },
    D = (a, i, t, c, s) =>
      t.tableData.id !== a
        ? (s && i) || 'asc'
        : i === 'asc'
        ? 'desc'
        : i === 'desc' && c
        ? ''
        : 'asc';
  function W() {
    const a = e.options.padding === 'default' ? 'medium' : 'small';
    return e.columns
      .filter((t) => !t.hidden && !(t.tableData.groupOrder > -1))
      .sort((t, c) => t.tableData.columnOrder - c.tableData.columnOrder)
      .map((t, c) => {
        let s = t.title;
        e.draggable &&
          (s = l.createElement(
            j,
            {
              key: t.tableData.id,
              draggableId: t.tableData.id.toString(),
              index: c
            },
            (h, O) =>
              l.createElement(
                'div',
                n(
                  n(
                    n({ ref: h.innerRef }, h.draggableProps),
                    h.dragHandleProps
                  ),
                  { style: O.isDragging ? h.draggableProps.style : {} }
                ),
                t.title
              )
          )),
          t.sorting !== !1 &&
            e.sorting &&
            (s = l.createElement(
              z,
              {
                IconComponent: e.icons.SortArrow,
                active: e.orderBy === t.tableData.id,
                direction:
                  ((t.tableData.id === e.orderBy ||
                    e.keepSortDirectionOnColumnSwitch) &&
                    e.orderDirection) ||
                  'asc',
                onClick: () => {
                  const h = D(
                    e.orderBy,
                    e.orderDirection,
                    t,
                    e.thirdSortClick,
                    e.keepSortDirectionOnColumnSwitch
                  );
                  e.onOrderChange(t.tableData.id, h);
                }
              },
              s
            )),
          t.tooltip &&
            (s = l.createElement(
              q,
              { title: t.tooltip, placement: 'bottom' },
              l.createElement('span', null, s)
            )),
          e.options.tableLayout === 'fixed' &&
            e.options.columnResizable &&
            t.resizable !== !1 &&
            (s = l.createElement(
              'div',
              { style: { display: 'flex', alignItems: 'center' } },
              l.createElement('div', { style: { flex: 1 } }, s),
              l.createElement('div', null),
              l.createElement(e.icons.Resize, {
                style: {
                  cursor: 'col-resize',
                  color:
                    r && r.tableData.id === t.tableData.id
                      ? e.theme.palette.primary.main
                      : 'inherit'
                },
                onMouseDown: (h) => A(h, t)
              })
            ));
        const I =
          t.align !== void 0
            ? t.align
            : ['numeric', 'currency'].indexOf(t.type) !== -1
            ? 'right'
            : 'left';
        return l.createElement(
          b,
          {
            key: t.tableData.id,
            align: I,
            className: e.classes.header,
            style: v(t),
            size: a
          },
          s
        );
      });
  }
  function P() {
    const a = C.selectionMaxWidth(e, e.treeDataMaxLevel);
    return l.createElement(
      b,
      {
        padding: 'none',
        key: 'key-selection-column',
        className: e.classes.header,
        style: n(n({}, e.headerStyle), { width: a })
      },
      e.showSelectAllCheckbox &&
        l.createElement(
          B,
          n(
            {
              indeterminate:
                e.selectedCount > 0 && e.selectedCount < e.dataCount,
              checked: e.dataCount > 0 && e.selectedCount === e.dataCount,
              onChange: (i, t) => e.onAllSelected && e.onAllSelected(t)
            },
            e.options.headerSelectionProps
          )
        )
    );
  }
  function x() {
    return l.createElement(b, {
      padding: 'none',
      key: 'key-detail-panel-column',
      className: e.classes.header,
      style: n({}, e.headerStyle)
    });
  }
  function H() {
    const a = W();
    if ((e.hasSelection && a.splice(0, 0, P()), e.showActionsColumn))
      if (e.actionsHeaderIndex >= 0) {
        let i = 0;
        e.hasSelection && (i = 1), a.splice(e.actionsHeaderIndex + i, 0, k());
      } else e.actionsHeaderIndex === -1 && a.push(k());
    return (
      e.hasDetailPanel &&
        e.options.showDetailPanelIcon &&
        (e.detailPanelColumnAlignment === 'right'
          ? a.push(x())
          : a.splice(0, 0, x())),
      e.isTreeData > 0 &&
        a.splice(
          0,
          0,
          l.createElement(b, {
            padding: 'none',
            key: 'key-tree-data-header',
            className: e.classes.header,
            style: n({}, e.headerStyle)
          })
        ),
      e.columns
        .filter((i) => i.tableData.groupOrder > -1)
        .forEach((i) => {
          a.splice(
            0,
            0,
            l.createElement(b, {
              padding: 'checkbox',
              key: 'key-group-header' + i.tableData.id,
              className: e.classes.header,
              style: n({}, e.headerStyle)
            })
          );
        }),
      l.createElement(E, { ref: e.forwardedRef }, l.createElement(X, null, a))
    );
  }
  return H();
}
(MTableHeader.defaultProps = {
  dataCount: 0,
  hasSelection: !1,
  headerStyle: {},
  selectedCount: 0,
  sorting: !0,
  keepSortDirectionOnColumnSwitch: !0,
  localization: { actions: 'Actions' },
  orderBy: void 0,
  orderDirection: 'asc',
  actionsHeaderIndex: 0,
  detailPanelColumnAlignment: 'left',
  draggable: !0,
  thirdSortClick: !0
}),
  (MTableHeader.propTypes = {
    columns: o.array.isRequired,
    dataCount: o.number,
    hasDetailPanel: o.bool.isRequired,
    detailPanelColumnAlignment: o.string,
    hasSelection: o.bool,
    headerStyle: o.object,
    localization: o.object,
    selectedCount: o.number,
    sorting: o.bool,
    keepSortDirectionOnColumnSwitch: o.bool,
    onAllSelected: o.func,
    onOrderChange: o.func,
    orderBy: o.number,
    orderDirection: o.string,
    actionsHeaderIndex: o.number,
    showActionsColumn: o.bool,
    showSelectAllCheckbox: o.bool,
    draggable: o.bool,
    thirdSortClick: o.bool,
    tooltip: o.string
  });
export const styles = (d) => ({
  header: { top: 0, zIndex: 10, backgroundColor: d.palette.background.paper }
});
const V = l.forwardRef(function (e, u) {
  return l.createElement(MTableHeader, n(n({}, e), { forwardedRef: u }));
});
export default U(styles, { withTheme: !0 })(V);
