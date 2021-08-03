var a = Object.assign;
import './utils/polyfill';
import t from 'react';
import { defaultProps as l } from './defaults';
import { propTypes as i } from './prop-types';
import o from './material-table';
import { withStyles as r } from '@material-ui/core';
(o.defaultProps = l), (o.propTypes = i);
const p = (e) => ({
  paginationRoot: { width: '100%' },
  paginationToolbar: { padding: 0, width: '100%' },
  paginationCaption: { display: 'none' },
  paginationSelectRoot: { margin: 0 }
});
export default r(p, { withTheme: !0 })((e) =>
  t.createElement(o, a(a({}, e), { ref: e.tableRef }))
);
export {
  MTableAction,
  MTableActions,
  MTableBody,
  MTableBodyRow,
  MTableCell,
  MTableEditCell,
  MTableEditField,
  MTableEditRow,
  MTableFilterRow,
  MTableGroupRow,
  MTableGroupbar,
  MTableHeader,
  MTablePagination,
  MTableSteppedPagination,
  MTableToolbar
} from './components';
