import * as m from 'react';
import {
  TableRow as b,
  TableCell as g,
  withStyles as x
} from '@material-ui/core';
import { getStyle as T } from '../MTableCell/utils';
import * as p from '../../utils/common-values';
import s from 'prop-types';
export function MTableSummaryRow({
  data: f,
  columns: d,
  currentData: C,
  rowProps: t,
  renderSummaryRow: h
}) {
  if (!h) return null;
  function n(e, a = 1) {
    const l = p.elementSize(t),
      r = a * p.baseIconSize(t);
    return m.createElement(g, {
      key: `placeholder.${e}`,
      size: l,
      padding: 'none',
      style: { width: r, padding: '0px 5px', boxSizing: 'border-box' }
    });
  }
  const o = [],
    u = [];
  let i = 0;
  if (
    (t.options.selection && o.push(n(i++)),
    t.actions &&
      t.actions.filter((e) => e.position === 'row' || typeof e == 'function')
        .length > 0)
  ) {
    const e = p.rowActions(t).length;
    t.options.actionsColumnIndex === -1
      ? u.push(n(i++, e))
      : t.options.actionsColumnIndex >= 0 && o.push(n(i++, e));
  }
  return (
    t.detailPanel &&
      t.options.showDetailPanelIcon &&
      (t.options.detailPanelColumnAlignment === 'right'
        ? u.push(n(i++))
        : o.push(n(i++))),
    t.isTreeData && o.push(n(i++)),
    m.createElement(
      b,
      null,
      o,
      d.map((e, a) => {
        const l = h({
            index: a,
            column: e,
            data: f,
            currentData: C,
            columns: d
          }),
          r =
            e.align !== void 0
              ? e.align
              : ['numeric', 'currency'].indexOf(e.type) !== -1
              ? 'right'
              : 'left';
        let c = '',
          y = T({ columnDef: e, scrollWidth: 0 });
        return (
          l && l.value ? ((c = l.value), (y = l.style)) : (c = l),
          m.createElement(g, { key: a, style: y, align: r }, c)
        );
      }),
      u
    )
  );
}
MTableSummaryRow.propTypes = {
  data: s.array,
  currentData: s.array,
  columns: s.array,
  renderSummaryRow: s.func
};
export const styles = (f) => ({});
export default x(styles)(MTableSummaryRow);
