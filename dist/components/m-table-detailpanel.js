import t from 'react';
import {
  TableCell as d,
  Collapse as r,
  TableRow as s
} from '@material-ui/core';
function c(e) {
  const [i, o] = t.useState(!1),
    [, f] = t.useReducer((a) => a + 1, 0),
    l = t.useRef();
  t.useEffect(() => {
    const a = Boolean(e.data.tableData && e.data.tableData.showDetailPanel);
    setTimeout(() => {
      o(a);
    }, 5);
  }, [e.data.tableData.showDetailPanel]);
  let n;
  if (e.detailPanel)
    typeof e.detailPanel == 'function'
      ? (n = e.detailPanel)
      : ((n = e.detailPanel
          ? e.detailPanel.find(
              (a) =>
                a.render.toString() ===
                (e.data.tableData.showDetailPanel || '').toString()
            )
          : void 0),
        (n = n ? n.render : null));
  else return t.createElement(t.Fragment, null);
  if (
    (t.useEffect(() => {
      n && i && (l.current = n);
    }),
    !l.current && !e.data.tableData.showDetailPanel)
  )
    return null;
  const u = n || l.current;
  return t.createElement(
    s,
    null,
    e.options.detailPanelOffset.left > 0 &&
      t.createElement(d, { colSpan: e.options.detailPanelOffset.left }),
    t.createElement(
      d,
      {
        size: e.size,
        colSpan:
          e.renderColumns.length -
          e.options.detailPanelOffset.left -
          e.options.detailPanelOffset.right,
        padding: 'none'
      },
      t.createElement(
        r,
        {
          in: i,
          timeout: 'auto',
          unmountOnExit: !0,
          mountOnEnter: !0,
          onExited: () => {
            (l.current = void 0), f();
          }
        },
        t.createElement(u, { rowData: e.data })
      )
    )
  );
}
export { c as MTableDetailPanel };
