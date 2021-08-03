var c = Object.assign;
import C from '@material-ui/core/TableCell';
import b from '@material-ui/core/TableRow';
import T from '@material-ui/core/IconButton';
import n from 'prop-types';
import l from 'react';
function m(e) {
  const u = (i) => ({ transform: i ? 'rotate(90deg)' : 'none' });
  function g() {
    let i = e.columns.filter((t) => !t.hidden).length;
    e.options.selection && i++,
      e.detailPanel && i++,
      e.actions && e.actions.length > 0 && i++;
    const d = e.groups[e.level];
    let f;
    e.groupData.isExpanded &&
      (e.groups.length > e.level + 1
        ? (f = e.groupData.groups.map((t, a) =>
            l.createElement(e.components.GroupRow, {
              actions: e.actions,
              key: t.value || '' + a,
              columns: e.columns,
              components: e.components,
              detailPanel: e.detailPanel,
              getFieldValue: e.getFieldValue,
              groupData: t,
              groups: e.groups,
              icons: e.icons,
              level: e.level + 1,
              path: [...e.path, a],
              onGroupExpandChanged: e.onGroupExpandChanged,
              onRowSelected: e.onRowSelected,
              onRowClick: e.onRowClick,
              onToggleDetailPanel: e.onToggleDetailPanel,
              onTreeExpandChanged: e.onTreeExpandChanged,
              onEditingCanceled: e.onEditingCanceled,
              onEditingApproved: e.onEditingApproved,
              options: e.options,
              hasAnyEditingRow: e.hasAnyEditingRow,
              isTreeData: e.isTreeData,
              cellEditable: e.cellEditable,
              onCellEditStarted: e.onCellEditStarted,
              onCellEditFinished: e.onCellEditFinished,
              scrollWidth: e.scrollWidth,
              treeDataMaxLevel: e.treeDataMaxLevel
            })
          ))
        : (f = e.groupData.data.map((t, a) =>
            t.tableData.editing
              ? l.createElement(e.components.EditRow, {
                  columns: e.columns,
                  components: e.components,
                  data: t,
                  icons: e.icons,
                  path: [...e.path, a],
                  localization: e.localization,
                  key: a,
                  mode: t.tableData.editing,
                  options: e.options,
                  isTreeData: e.isTreeData,
                  detailPanel: e.detailPanel,
                  onEditingCanceled: e.onEditingCanceled,
                  onEditingApproved: e.onEditingApproved,
                  getFieldValue: e.getFieldValue,
                  onBulkEditRowChanged: e.onBulkEditRowChanged,
                  scrollWidth: e.scrollWidth
                })
              : l.createElement(e.components.Row, {
                  actions: e.actions,
                  key: a,
                  columns: e.columns,
                  components: e.components,
                  data: t,
                  detailPanel: e.detailPanel,
                  level: (e.level || 0) + 1,
                  getFieldValue: e.getFieldValue,
                  icons: e.icons,
                  path: [...e.path, a],
                  onRowSelected: e.onRowSelected,
                  onRowClick: e.onRowClick,
                  onToggleDetailPanel: e.onToggleDetailPanel,
                  options: e.options,
                  isTreeData: e.isTreeData,
                  onTreeExpandChanged: e.onTreeExpandChanged,
                  onEditingCanceled: e.onEditingCanceled,
                  onEditingApproved: e.onEditingApproved,
                  hasAnyEditingRow: e.hasAnyEditingRow,
                  cellEditable: e.cellEditable,
                  onCellEditStarted: e.onCellEditStarted,
                  onCellEditFinished: e.onCellEditFinished,
                  scrollWidth: e.scrollWidth,
                  treeDataMaxLevel: e.treeDataMaxLevel
                })
          )));
    const r = [];
    for (let t = 0; t < e.level; t++)
      r.push(l.createElement(C, { padding: 'checkbox', key: t }));
    let E = e.groupData.value;
    d.lookup && (E = d.lookup[E]);
    let o = d.title;
    typeof e.options.groupTitle == 'function'
      ? (o = e.options.groupTitle(e.groupData))
      : typeof o != 'string' && (o = l.cloneElement(o));
    const h = e.options.groupRowSeparator || ': ';
    return l.createElement(
      l.Fragment,
      null,
      l.createElement(
        b,
        { ref: e.forwardedRef },
        r,
        l.createElement(
          e.components.Cell,
          {
            colSpan: i,
            padding: 'none',
            columnDef: d,
            value: E,
            icons: e.icons
          },
          l.createElement(
            l.Fragment,
            null,
            l.createElement(
              T,
              {
                style: c(
                  { transition: 'all ease 200ms' },
                  u(e.groupData.isExpanded)
                ),
                onClick: (t) => {
                  e.onGroupExpandChanged(e.path);
                }
              },
              l.createElement(e.icons.DetailPanel, null)
            ),
            l.createElement('b', null, o, h)
          )
        )
      ),
      f
    );
  }
  return g();
}
(m.defaultProps = { columns: [], groups: [], level: 0, options: {} }),
  (m.propTypes = {
    actions: n.array,
    columns: n.arrayOf(n.object),
    components: n.object,
    cellEditable: n.object,
    detailPanel: n.oneOfType([n.func, n.arrayOf(n.object)]),
    forwardedRef: n.element,
    getFieldValue: n.func,
    groupData: n.object,
    groups: n.arrayOf(n.object),
    hasAnyEditingRow: n.bool,
    icons: n.object,
    isTreeData: n.bool.isRequired,
    level: n.number,
    localization: n.object,
    onBulkEditRowChanged: n.func,
    onCellEditFinished: n.func,
    onCellEditStarted: n.func,
    onEditingApproved: n.func,
    onEditingCanceled: n.func,
    onGroupExpandChanged: n.func,
    onRowClick: n.func,
    onRowSelected: n.func,
    onToggleDetailPanel: n.func.isRequired,
    onTreeExpandChanged: n.func.isRequired,
    options: n.object,
    path: n.arrayOf(n.number),
    scrollWidth: n.number.isRequired,
    treeDataMaxLevel: n.number
  });
export default l.forwardRef(function (u, g) {
  return l.createElement(m, c(c({}, u), { forwardedRef: g }));
});
