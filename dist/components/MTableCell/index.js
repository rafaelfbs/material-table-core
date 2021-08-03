var T = Object.prototype.hasOwnProperty;
var u = Object.getOwnPropertySymbols,
  S = Object.prototype.propertyIsEnumerable;
var o = Object.assign;
var m = (e, n) => {
  var r = {};
  for (var t in e) T.call(e, t) && n.indexOf(t) < 0 && (r[t] = e[t]);
  if (e != null && u)
    for (var t of u(e)) n.indexOf(t) < 0 && S.call(e, t) && (r[t] = e[t]);
  return r;
};
import i from 'react';
import h from '@material-ui/core/TableCell';
import l from 'prop-types';
import { getRenderValue as w, getStyle as p } from './utils';
function f(e) {
  const {
      forwardedRef: n,
      scrollWidth: r,
      rowData: t,
      onCellEditStarted: b,
      cellEditable: s,
      columnDef: a,
      errorState: v
    } = e,
    y = m(e, [
      'forwardedRef',
      'scrollWidth',
      'rowData',
      'onCellEditStarted',
      'cellEditable',
      'columnDef',
      'errorState'
    ]),
    C = (c) => {
      e.columnDef.disableClick && c.stopPropagation();
    },
    g =
      a.align !== void 0
        ? a.align
        : ['numeric', 'currency'].indexOf(a.type) !== -1
        ? 'right'
        : 'left';
  let d = w(e);
  return (
    s &&
      (d = i.createElement(
        'div',
        {
          style: {
            borderBottom: '1px dashed grey',
            cursor: 'pointer',
            width: 'max-content'
          },
          onClick: (c) => {
            c.stopPropagation(), b(t, a);
          }
        },
        d
      )),
    i.createElement(
      h,
      o(o({}, y), {
        size: e.size,
        value: e.value,
        style: p(e),
        align: g,
        onClick: C,
        ref: n,
        colSpan: e.colSpan
      }),
      e.children,
      d
    )
  );
}
(f.defaultProps = { columnDef: {}, value: void 0 }),
  (f.propTypes = {
    columnDef: l.object.isRequired,
    value: l.any,
    rowData: l.object,
    errorState: l.oneOfType([l.object, l.bool]),
    forwardedRef: l.oneOfType([l.element, l.func]),
    size: l.string,
    colSpan: l.number,
    children: l.element,
    cellEditable: l.bool,
    onCellEditStarted: l.func
  });
export default i.forwardRef(function (n, r) {
  return i.createElement(f, o(o({}, n), { forwardedRef: r }));
});
