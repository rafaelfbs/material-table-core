var l = Object.assign;
import o, { useState as D, useEffect as b } from 'react';
import n from 'prop-types';
import {
  TableCell as y,
  CircularProgress as w,
  withTheme as g
} from '@material-ui/core';
function c(e) {
  const [t, a] = D(() => ({
    isLoading: !1,
    value: e.rowData[e.columnDef.field]
  }));
  b(() => {
    e.cellEditable
      .onCellEditApproved(
        t.value,
        e.rowData[e.columnDef.field],
        e.rowData,
        e.columnDef
      )
      .then(() => {
        a(l(l({}, t), { isLoading: !1 })),
          e.onCellEditFinished(e.rowData, e.columnDef);
      })
      .catch(() => {
        a(l(l({}, t), { isLoading: !1 }));
      });
  }, []);
  const u = () => {
      let i = {
        boxShadow: '2px 0px 15px rgba(125,147,178,.25)',
        color: 'inherit',
        width: e.columnDef.tableData.width,
        boxSizing: 'border-box',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        padding: '0 16px'
      };
      return (
        typeof e.columnDef.cellStyle == 'function'
          ? (i = l(l({}, i), e.columnDef.cellStyle(t.value, e.rowData)))
          : (i = l(l({}, i), e.columnDef.cellStyle)),
        typeof e.cellEditable.cellStyle == 'function'
          ? (i = l(
              l({}, i),
              e.cellEditable.cellStyle(t.value, e.rowData, e.columnDef)
            ))
          : (i = l(l({}, i), e.cellEditable.cellStyle)),
        i
      );
    },
    r = (i) => {
      i.keyCode === 13 ? d() : i.keyCode === 27 && f();
    },
    d = () => {
      a(l(l({}, t), { isLoading: !0 }));
    },
    f = () => {
      e.onCellEditFinished(e.rowData, e.columnDef);
    };
  function s() {
    if (t.isLoading)
      return o.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', width: 60 } },
        o.createElement(w, { size: 20 })
      );
    const i = [
      {
        icon: e.icons.Check,
        tooltip: e.localization && e.localization.saveTooltip,
        onClick: d,
        disabled: t.isLoading
      },
      {
        icon: e.icons.Clear,
        tooltip: e.localization && e.localization.cancelTooltip,
        onClick: f,
        disabled: t.isLoading
      }
    ];
    return o.createElement(e.components.Actions, {
      actions: i,
      components: e.components,
      size: 'small'
    });
  }
  return o.createElement(
    y,
    { size: e.size, style: u(), padding: 'none', ref: e.forwardedRef },
    o.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center' } },
      o.createElement(
        'div',
        { style: { flex: 1, marginRight: 4 } },
        o.createElement(e.components.EditField, {
          columnDef: e.columnDef,
          value: t.value,
          onChange: (i, m) => a(l(l({}, i), { value: m })),
          onKeyDown: r,
          disabled: t.isLoading,
          rowData: e.rowData,
          autoFocus: !0
        })
      ),
      s()
    )
  );
}
(c.defaultProps = {
  columnDef: {},
  localization: { saveTooltip: 'Save', cancelTooltip: 'Cancel' }
}),
  (c.propTypes = {
    cellEditable: n.object.isRequired,
    columnDef: n.object.isRequired,
    components: n.object.isRequired,
    errorState: n.oneOfType([n.object, n.bool]),
    icons: n.object.isRequired,
    localization: n.object.isRequired,
    onCellEditFinished: n.func.isRequired,
    rowData: n.object.isRequired,
    size: n.string,
    forwardedRef: n.element
  });
export default o.forwardRef(function (t, a) {
  return g(o.createElement(c, l(l({}, t), { forwardedRef: a })));
});
