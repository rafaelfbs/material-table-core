var q = Object.prototype.hasOwnProperty;
var O = Object.getOwnPropertySymbols,
  K = Object.prototype.propertyIsEnumerable;
var n = Object.assign;
var x = (e, l) => {
  var f = {};
  for (var d in e) q.call(e, d) && l.indexOf(d) < 0 && (f[d] = e[d]);
  if (e != null && O)
    for (var d of O(e)) l.indexOf(d) < 0 && K.call(e, d) && (f[d] = e[d]);
  return f;
};
import o, { useState as J } from 'react';
import b from '@material-ui/core/TableCell';
import L from '@material-ui/core/TableRow';
import M from '@material-ui/core/Typography';
import a from 'prop-types';
import { byString as N, setByString as W } from '../../utils';
import * as R from '../../utils/common-values';
import { validateInput as A } from '../../utils/validate';
function k(e) {
  const [l, f] = J(() => {
    function i() {
      return e.columns
        .filter((t) => 'initialEditValue' in t && t.field)
        .reduce((t, c) => ((t[c.field] = c.initialEditValue), t), {});
    }
    let r = e.data ? JSON.parse(JSON.stringify(e.data)) : i();
    return (
      e.mode === 'bulk' &&
        e.bulkEditChangedRows[r.tableData.id] &&
        (r = e.bulkEditChangedRows[r.tableData.id].newData),
      { data: r }
    );
  });
  function d() {
    const i = R.elementSize(e);
    return e.columns
      .filter((t) => !t.hidden && !(t.tableData.groupOrder > -1))
      .sort((t, c) => t.tableData.columnOrder - c.tableData.columnOrder)
      .map((t, c) => {
        const C =
            typeof l.data[t.field] != 'undefined'
              ? l.data[t.field]
              : N(l.data, t.field),
          h = (u, w) => {
            let y = { color: 'inherit' };
            return (
              typeof u.cellStyle == 'function'
                ? (y = n(n({}, y), u.cellStyle(w, e.data)))
                : (y = n(n({}, y), u.cellStyle)),
              u.disableClick && (y.cursor = 'default'),
              n({}, y)
            );
          },
          P = {};
        c === 0 && (P.paddingLeft = 24 + e.level * 20);
        let g = !1;
        if (
          (t.editable === void 0 && (g = !0),
          t.editable === 'always' && (g = !0),
          t.editable === 'onAdd' && e.mode === 'add' && (g = !0),
          t.editable === 'onUpdate' && e.mode === 'update' && (g = !0),
          typeof t.editable == 'function' && (g = t.editable(t, e.data)),
          !t.field || !g)
        ) {
          const u = e.getFieldValue(l.data, t);
          return o.createElement(e.components.Cell, {
            size: i,
            icons: e.icons,
            columnDef: t,
            value: u,
            key: t.tableData.id,
            rowData: e.data,
            style: h(t, C)
          });
        } else {
          const { editComponent: u } = t,
            w = x(t, ['editComponent']),
            y = u || e.components.EditField,
            z = A(t, l.data);
          return o.createElement(
            b,
            {
              size: i,
              key: t.tableData.id,
              align: ['numeric'].indexOf(t.type) !== -1 ? 'right' : 'left',
              style: h(t, C)
            },
            o.createElement(y, {
              key: t.tableData.id,
              columnDef: w,
              value: C,
              error: !z.isValid,
              helperText: z.helperText,
              locale: e.localization.dateTimePickerLocalization,
              rowData: l.data,
              onChange: (m) => {
                const T = n({}, l.data);
                W(T, t.field, m),
                  f({ data: T }),
                  e.onBulkEditRowChanged && e.onBulkEditRowChanged(e.data, T);
              },
              onRowDataChange: (m) => {
                f({ data: m }),
                  e.onBulkEditRowChanged && e.onBulkEditRowChanged(e.data, m);
              }
            })
          );
        }
      });
  }
  const S = () => {
    const i = l.data;
    delete i.tableData, e.onEditingApproved(e.mode, l.data, e.data);
  };
  function v() {
    if (e.mode === 'bulk') return;
    const i = R.elementSize(e),
      r = n(n({}, k.defaultProps.localization), e.localization),
      t = e.columns.every((C) => A(C, l.data).isValid),
      c = [
        {
          icon: e.icons.Check,
          tooltip: r.saveTooltip,
          disabled: !t,
          onClick: S
        },
        {
          icon: e.icons.Clear,
          tooltip: r.cancelTooltip,
          onClick: () => {
            e.onEditingCanceled(e.mode, e.data);
          }
        }
      ];
    return o.createElement(
      b,
      {
        size: i,
        padding: 'none',
        key: 'key-actions-column',
        style: n(
          { width: 42 * c.length, padding: '0px 5px' },
          e.options.editCellStyle
        )
      },
      o.createElement(e.components.Actions, {
        data: e.data,
        actions: c,
        components: e.components,
        size: i
      })
    );
  }
  function V() {
    return { borderBottom: '1px solid red' };
  }
  const B = (i) => {
    (i.keyCode === 13 &&
      i.target.type !== 'textarea' &&
      i.target.type !== 'button') ||
    (i.keyCode === 13 && i.target.type === 'textarea' && i.shiftKey)
      ? S()
      : i.keyCode === 27 && e.onEditingCanceled(e.mode, e.data);
  };
  function j() {
    const i = R.elementSize(e),
      r = n(n({}, k.defaultProps.localization), e.localization);
    let t;
    if (e.mode === 'add' || e.mode === 'update' || e.mode === 'bulk') t = d();
    else {
      const s = e.columns.filter(
        (E) => !E.hidden && !(E.tableData.groupOrder > -1)
      ).length;
      t = [
        o.createElement(
          b,
          {
            size: i,
            padding: e.options.actionsColumnIndex === 0 ? 'none' : void 0,
            key: 'key-edit-cell',
            colSpan: s
          },
          o.createElement(M, { variant: 'h6' }, r.deleteText)
        )
      ];
    }
    if (
      (e.options.selection &&
        t.splice(
          0,
          0,
          o.createElement(b, { padding: 'none', key: 'key-selection-cell' })
        ),
      e.isTreeData &&
        t.splice(
          0,
          0,
          o.createElement(b, { padding: 'none', key: 'key-tree-data-cell' })
        ),
      e.options.actionsColumnIndex === -1)
    )
      t.push(v());
    else if (e.options.actionsColumnIndex >= 0) {
      let s = 0;
      e.options.selection && (s = 1),
        e.isTreeData && ((s = 1), e.options.selection && t.splice(1, 1)),
        t.splice(e.options.actionsColumnIndex + s, 0, v());
    }
    if (e.detailPanel && e.mode !== 'bulk') {
      const E = e.options.detailPanelColumnAlignment === 'left' ? 0 : t.length;
      t.splice(
        E,
        0,
        o.createElement(b, { padding: 'none', key: 'key-detail-panel-cell' })
      );
    }
    e.columns
      .filter((s) => s.tableData.groupOrder > -1)
      .forEach((s) => {
        t.splice(
          0,
          0,
          o.createElement(b, {
            padding: 'none',
            key: 'key-group-cell' + s.tableData.id
          })
        );
      });
    const {
        detailPanel: c,
        isTreeData: C,
        onRowClick: h,
        onRowSelected: P,
        onTreeExpandChanged: g,
        onToggleDetailPanel: u,
        onEditingApproved: w,
        onEditingCanceled: y,
        getFieldValue: z,
        components: m,
        icons: T,
        columns: U,
        localization: G,
        options: H,
        actions: Q,
        errorState: X,
        onBulkEditRowChanged: Y,
        bulkEditChangedRows: Z,
        scrollWidth: _,
        forwardedRef: I
      } = e,
      F = x(e, [
        'detailPanel',
        'isTreeData',
        'onRowClick',
        'onRowSelected',
        'onTreeExpandChanged',
        'onToggleDetailPanel',
        'onEditingApproved',
        'onEditingCanceled',
        'getFieldValue',
        'components',
        'icons',
        'columns',
        'localization',
        'options',
        'actions',
        'errorState',
        'onBulkEditRowChanged',
        'bulkEditChangedRows',
        'scrollWidth',
        'forwardedRef'
      ]);
    return o.createElement(
      L,
      n(n({ onKeyDown: B }, F), { ref: I, style: V() }),
      t
    );
  }
  return j();
}
(k.defaultProps = {
  actions: [],
  index: 0,
  options: {},
  path: [],
  localization: {
    saveTooltip: 'Save',
    cancelTooltip: 'Cancel',
    deleteText: 'Are you sure you want to delete this row?'
  },
  onBulkEditRowChanged: () => {}
}),
  (k.propTypes = {
    actions: a.array,
    icons: a.any.isRequired,
    index: a.number.isRequired,
    data: a.object,
    detailPanel: a.oneOfType([
      a.func,
      a.arrayOf(a.oneOfType([a.object, a.func]))
    ]),
    options: a.object.isRequired,
    onRowSelected: a.func,
    path: a.arrayOf(a.number),
    columns: a.array,
    onRowClick: a.func,
    onEditingApproved: a.func,
    onEditingCanceled: a.func,
    localization: a.object,
    getFieldValue: a.func,
    errorState: a.oneOfType([a.object, a.bool]),
    onBulkEditRowChanged: a.func
  });
export default o.forwardRef(function (l, f) {
  return o.createElement(k, n(n({}, l), { forwardedRef: f }));
});
