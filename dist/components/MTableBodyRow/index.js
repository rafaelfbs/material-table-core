var Q = Object.prototype.hasOwnProperty;
var I = Object.getOwnPropertySymbols,
  U = Object.prototype.propertyIsEnumerable;
var d = Object.assign;
var O = (e, h) => {
  var b = {};
  for (var s in e) Q.call(e, s) && h.indexOf(s) < 0 && (b[s] = e[s]);
  if (e != null && I)
    for (var s of I(e)) h.indexOf(s) < 0 && U.call(e, s) && (b[s] = e[s]);
  return b;
};
import l from 'react';
import a from 'prop-types';
import {
  Checkbox as X,
  TableCell as y,
  IconButton as w,
  Tooltip as Y,
  TableRow as Z
} from '@material-ui/core';
import { MTableDetailPanel as _ } from '../m-table-detailpanel';
import * as m from '../../utils/common-values';
import { useDoubleClick as p } from '../../utils/hooks/useDoubleClick';
import { MTableCustomIcon as P } from '../../components';
export default function k(e) {
  const {
      icons: h,
      data: b,
      columns: s,
      components: ee,
      detailPanel: L,
      getFieldValue: te,
      isTreeData: ie,
      onRowSelected: ne,
      onTreeExpandChanged: le,
      onToggleDetailPanel: F,
      onEditingCanceled: S,
      onEditingApproved: z,
      options: ae,
      hasAnyEditingRow: M,
      treeDataMaxLevel: W,
      path: q,
      localization: oe,
      actions: de,
      errorState: ce,
      cellEditable: B,
      onCellEditStarted: V,
      onCellEditFinished: j,
      persistEvents: R,
      scrollWidth: se,
      onRowClick: g,
      onDoubleRowClick: f
    } = e,
    $ = O(e, [
      'icons',
      'data',
      'columns',
      'components',
      'detailPanel',
      'getFieldValue',
      'isTreeData',
      'onRowSelected',
      'onTreeExpandChanged',
      'onToggleDetailPanel',
      'onEditingCanceled',
      'onEditingApproved',
      'options',
      'hasAnyEditingRow',
      'treeDataMaxLevel',
      'path',
      'localization',
      'actions',
      'errorState',
      'cellEditable',
      'onCellEditStarted',
      'onCellEditFinished',
      'persistEvents',
      'scrollWidth',
      'onRowClick',
      'onDoubleRowClick'
    ]),
    T = (t, i) =>
      i(t, b, (n) => {
        let o = L;
        Array.isArray(o) &&
          ((o = o[n || 0]),
          typeof o == 'function' && (o = o(b)),
          (o = o.render)),
          F(q, o);
      }),
    G = p(g ? (t) => T(t, g) : void 0, f ? (t) => T(t, f) : void 0),
    H = () => {
      const t = m.elementSize(e);
      return e.columns
        .filter((n) => !n.hidden && !(n.tableData.groupOrder > -1))
        .sort((n, o) => n.tableData.columnOrder - o.tableData.columnOrder)
        .map((n, o) => {
          const c = e.getFieldValue(e.data, n);
          if (
            e.data.tableData.editCellList &&
            e.data.tableData.editCellList.find(
              (u) => u.tableData.id === n.tableData.id
            )
          )
            return l.createElement(e.components.EditCell, {
              components: e.components,
              icons: e.icons,
              localization: e.localization,
              columnDef: n,
              size: t,
              key: 'cell-' + e.data.tableData.id + '-' + n.tableData.id,
              rowData: e.data,
              cellEditable: e.cellEditable,
              onCellEditFinished: e.onCellEditFinished,
              scrollWidth: e.scrollWidth
            });
          {
            let u = n.editable !== 'never' && !!e.cellEditable;
            u &&
              e.cellEditable.isCellEditable &&
              (u = e.cellEditable.isCellEditable(e.data, n));
            const E = `cell-${e.data.tableData.id}-${n.tableData.id}`;
            return l.createElement(e.components.Cell, {
              size: t,
              errorState: e.errorState,
              icons: e.icons,
              columnDef: d({ cellStyle: e.options.cellStyle }, n),
              value: c,
              key: E,
              rowData: e.data,
              cellEditable: u,
              onCellEditStarted: e.onCellEditStarted,
              scrollWidth: e.scrollWidth
            });
          }
        });
    },
    v = (t) => {
      const i = m.elementSize(e),
        n = t.length * m.baseIconSize(e);
      return l.createElement(
        y,
        {
          size: i,
          padding: 'none',
          key: 'key-actions-column',
          style: d(
            { width: n, padding: '0px 5px', boxSizing: 'border-box' },
            e.options.actionsCellStyle
          )
        },
        l.createElement(e.components.Actions, {
          data: e.data,
          actions: t,
          components: e.components,
          size: i,
          disabled: e.hasAnyEditingRow
        })
      );
    },
    J = () => {
      let t = e.options.selectionProps || {};
      typeof t == 'function' && (t = t(e.data));
      const i = m.elementSize(e),
        n = m.selectionMaxWidth(e, e.treeDataMaxLevel) || 0,
        o =
          i === 'medium'
            ? { marginLeft: e.level * 9 || 0 }
            : { padding: '4px', marginLeft: 5 + e.level * 9 || 0 };
      return l.createElement(
        y,
        {
          size: i,
          padding: 'none',
          key: 'key-selection-column',
          style: { width: n }
        },
        l.createElement(
          X,
          d(
            {
              size: i,
              checked: e.data.tableData.checked === !0,
              onClick: (c) => c.stopPropagation(),
              value: e.data.tableData.id.toString(),
              onChange: (c) => {
                e.onRowSelected(c, e.path, e.data);
              },
              style: o
            },
            t
          )
        )
      );
    },
    C = (t) => ({ transform: t ? 'rotate(90deg)' : 'none' }),
    x = () => {
      if (!e.options.showDetailPanelIcon) return null;
      const t = m.elementSize(e);
      return typeof e.detailPanel == 'function'
        ? l.createElement(
            y,
            {
              size: t,
              padding: 'none',
              key: 'key-detail-panel-column',
              style: d(
                { width: 42, textAlign: 'center' },
                e.options.detailPanelColumnStyle
              )
            },
            l.createElement(
              w,
              {
                'aria-label': 'Detail panel visiblity toggle',
                size: t,
                style: d(
                  { transition: 'all ease 200ms' },
                  C(e.data.tableData.showDetailPanel)
                ),
                onClick: (i) => {
                  e.onToggleDetailPanel(e.path, e.detailPanel),
                    i.stopPropagation();
                }
              },
              l.createElement(e.icons.DetailPanel, null)
            )
          )
        : l.createElement(
            y,
            { size: t, padding: 'none', key: 'key-detail-panel-column' },
            l.createElement(
              'div',
              {
                style: d(
                  {
                    width: 42 * e.detailPanel.length,
                    textAlign: 'center',
                    display: 'flex'
                  },
                  e.options.detailPanelColumnStyle
                )
              },
              e.detailPanel.map((i, n) => {
                typeof i == 'function' && (i = i(e.data));
                const o =
                  (e.data.tableData.showDetailPanel || '').toString() ===
                  i.render.toString();
                let c = l.createElement(e.icons.DetailPanel, null),
                  u = !0;
                return (
                  o
                    ? i.openIcon
                      ? ((c = l.createElement(P, {
                          icon: i.openIcon,
                          iconProps: i.iconProps
                        })),
                        (u = !1))
                      : i.icon &&
                        (c = l.createElement(P, {
                          icon: i.icon,
                          iconProps: i.iconProps
                        }))
                    : i.icon &&
                      ((c = l.createElement(P, {
                        icon: i.icon,
                        iconProps: i.iconProps
                      })),
                      (u = !1)),
                  (c = l.createElement(
                    w,
                    {
                      'aria-label': 'Detail panel visiblity toggle',
                      size: t,
                      key: 'key-detail-panel-' + n,
                      style: d({ transition: 'all ease 200ms' }, C(u && o)),
                      disabled: i.disabled,
                      onClick: (E) => {
                        e.onToggleDetailPanel(e.path, i.render),
                          E.stopPropagation();
                      }
                    },
                    c
                  )),
                  i.tooltip &&
                    (c = l.createElement(
                      Y,
                      { key: 'key-detail-panel-' + n, title: i.tooltip },
                      c
                    )),
                  c
                );
              })
            )
          );
    },
    K = () => {
      const t = m.elementSize(e);
      return e.data.tableData.childRows && e.data.tableData.childRows.length > 0
        ? l.createElement(
            y,
            {
              size: t,
              padding: 'none',
              key: 'key-tree-data-column',
              style: { width: 48 + 9 * (e.treeDataMaxLevel - 2) }
            },
            l.createElement(
              w,
              {
                'aria-label': 'Detail panel visiblity toggle',
                size: t,
                style: d(
                  { transition: 'all ease 200ms', marginLeft: e.level * 9 },
                  C(e.data.tableData.isTreeExpanded)
                ),
                onClick: (i) => {
                  e.onTreeExpandChanged(e.path, e.data), i.stopPropagation();
                }
              },
              l.createElement(e.icons.DetailPanel, null)
            )
          )
        : l.createElement(y, { padding: 'none', key: 'key-tree-data-column' });
    },
    N = (t, i) => {
      let n = {};
      return (
        typeof e.options.rowStyle == 'function'
          ? (n = d(
              d({}, n),
              e.options.rowStyle(e.data, t, i, e.hasAnyEditingRow)
            ))
          : e.options.rowStyle && (n = d(d({}, n), e.options.rowStyle)),
        (g || f) && (n.cursor = 'pointer'),
        e.hasAnyEditingRow && (n.opacity = n.opacity ? n.opacity : 0.2),
        n
      );
    },
    A = m.elementSize(e),
    r = H();
  e.options.selection && r.splice(0, 0, J());
  const D = m.rowActions(e);
  if (D.length > 0) {
    if (e.options.actionsColumnIndex === -1) r.push(v(D));
    else if (e.options.actionsColumnIndex >= 0) {
      let t = 0;
      e.options.selection && (t = 1),
        r.splice(e.options.actionsColumnIndex + t, 0, v(D));
    }
  }
  return (
    e.detailPanel &&
      (e.options.detailPanelColumnAlignment === 'right'
        ? r.push(x())
        : r.splice(0, 0, x())),
    e.isTreeData && r.splice(0, 0, K()),
    e.columns
      .filter((t) => t.tableData.groupOrder > -1)
      .forEach((t) => {
        r.splice(
          0,
          0,
          l.createElement(y, {
            size: A,
            padding: 'none',
            key: 'key-group-cell' + t.tableData.id
          })
        );
      }),
    l.createElement(
      l.Fragment,
      null,
      l.createElement(
        Z,
        d(d({ selected: M }, $), {
          onClick: (t) => {
            R && t.persist(), G(t);
          },
          hover: g !== null || f !== null,
          style: N(e.index, e.level)
        }),
        r
      ),
      l.createElement(_, {
        options: e.options,
        data: e.data,
        detailPanel: e.detailPanel,
        renderColumns: r,
        size: A
      }),
      e.data.tableData.childRows &&
        e.data.tableData.isTreeExpanded &&
        e.data.tableData.childRows.map((t, i) =>
          t.tableData.editing
            ? l.createElement(e.components.EditRow, {
                columns: e.columns.filter((n) => !n.hidden),
                components: e.components,
                data: t,
                icons: e.icons,
                localization: e.localization,
                getFieldValue: e.getFieldValue,
                key: i,
                mode: t.tableData.editing,
                options: e.options,
                isTreeData: e.isTreeData,
                detailPanel: e.detailPanel,
                onEditingCanceled: S,
                onEditingApproved: z,
                errorState: e.errorState
              })
            : l.createElement(
                e.components.Row,
                d(d({}, e), {
                  data: t,
                  index: i,
                  key: i,
                  level: e.level + 1,
                  path: [...e.path, i],
                  onEditingCanceled: S,
                  onEditingApproved: z,
                  hasAnyEditingRow: e.hasAnyEditingRow,
                  treeDataMaxLevel: W,
                  errorState: e.errorState,
                  cellEditable: B,
                  onCellEditStarted: V,
                  onCellEditFinished: j
                })
              )
        )
    )
  );
}
(k.defaultProps = {
  actions: [],
  index: 0,
  data: {},
  options: {},
  path: [],
  persistEvents: !1
}),
  (k.propTypes = {
    actions: a.array,
    icons: a.any.isRequired,
    index: a.number.isRequired,
    data: a.object.isRequired,
    detailPanel: a.oneOfType([
      a.func,
      a.arrayOf(a.oneOfType([a.object, a.func]))
    ]),
    hasAnyEditingRow: a.bool,
    options: a.object.isRequired,
    onRowSelected: a.func,
    path: a.arrayOf(a.number),
    persistEvents: a.bool,
    treeDataMaxLevel: a.number,
    getFieldValue: a.func.isRequired,
    columns: a.array,
    onToggleDetailPanel: a.func.isRequired,
    onRowClick: a.func,
    onDoubleRowClick: a.func,
    onEditingApproved: a.func,
    onEditingCanceled: a.func,
    errorState: a.oneOfType([a.object, a.bool])
  });
