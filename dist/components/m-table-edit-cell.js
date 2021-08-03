var p = Object.defineProperty;
var i = Object.assign;
var l = (r, e, s) => (
  typeof e != 'symbol' && (e += ''),
  e in r
    ? p(r, e, { enumerable: !0, configurable: !0, writable: !0, value: s })
    : (r[e] = s)
);
import o from 'react';
import t from 'prop-types';
import h from '@material-ui/core/TableCell';
import c from '@material-ui/core/CircularProgress';
import { withTheme as d } from '@material-ui/core';
import { validateInput as n } from '../utils/validate';
class a extends o.Component {
  constructor(e) {
    super(e);
    l(this, 'getStyle', () => {
      let e = {
        boxShadow: '2px 0px 15px rgba(125,147,178,.25)',
        color: 'inherit',
        width: this.props.columnDef.tableData.width,
        boxSizing: 'border-box',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        padding: '0 16px'
      };
      return (
        typeof this.props.columnDef.cellStyle == 'function'
          ? (e = i(
              i({}, e),
              this.props.columnDef.cellStyle(
                this.state.value,
                this.props.rowData
              )
            ))
          : (e = i(i({}, e), this.props.columnDef.cellStyle)),
        typeof this.props.cellEditable.cellStyle == 'function'
          ? (e = i(
              i({}, e),
              this.props.cellEditable.cellStyle(
                this.state.value,
                this.props.rowData,
                this.props.columnDef
              )
            ))
          : (e = i(i({}, e), this.props.cellEditable.cellStyle)),
        e
      );
    });
    l(this, 'handleKeyDown', (e) => {
      e.keyCode === 13 ? this.onApprove() : e.keyCode === 27 && this.onCancel();
    });
    l(this, 'onApprove', () => {
      !n(this.props.columnDef, this.state.value).isValid ||
        this.setState({ isLoading: !0 }, () => {
          this.props.cellEditable
            .onCellEditApproved(
              this.state.value,
              this.props.rowData[this.props.columnDef.field],
              this.props.rowData,
              this.props.columnDef
            )
            .then(() => {
              this.setState({ isLoading: !1 }),
                this.props.onCellEditFinished(
                  this.props.rowData,
                  this.props.columnDef
                );
            })
            .catch((s) => {
              this.setState({ isLoading: !1 });
            });
        });
    });
    l(this, 'onCancel', () => {
      this.props.onCellEditFinished(this.props.rowData, this.props.columnDef);
    });
    this.state = {
      errorState: { isValid: !0, helperText: '' },
      isLoading: !1,
      value: this.props.rowData[this.props.columnDef.field]
    };
  }
  renderActions() {
    if (this.state.isLoading)
      return o.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', width: 60 } },
        o.createElement(c, { size: 20 })
      );
    const e = [
      {
        icon: this.props.icons.Check,
        tooltip: this.props.localization.saveTooltip,
        onClick: this.onApprove,
        disabled: this.state.isLoading || !this.state.errorState.isValid
      },
      {
        icon: this.props.icons.Clear,
        tooltip: this.props.localization.cancelTooltip,
        onClick: this.onCancel,
        disabled: this.state.isLoading
      }
    ];
    return o.createElement(this.props.components.Actions, {
      actions: e,
      components: this.props.components,
      size: 'small'
    });
  }
  handleChange(e) {
    const s = n(this.props.columnDef, e);
    this.setState({ errorState: s, value: e });
  }
  render() {
    return o.createElement(
      h,
      { size: this.props.size, style: this.getStyle(), padding: 'none' },
      o.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center' } },
        o.createElement(
          'div',
          { style: { flex: 1, marginRight: 4 } },
          o.createElement(this.props.components.EditField, {
            columnDef: this.props.columnDef,
            value: this.state.value,
            error: !this.state.errorState.isValid,
            helperText: this.state.errorState.helperText,
            onChange: (e) => this.handleChange(e),
            onKeyDown: this.handleKeyDown,
            disabled: this.state.isLoading,
            rowData: this.props.rowData,
            autoFocus: !0
          })
        ),
        this.renderActions()
      )
    );
  }
}
(a.defaultProps = {
  columnDef: {},
  localization: { saveTooltip: 'Save', cancelTooltip: 'Cancel' }
}),
  (a.propTypes = {
    cellEditable: t.object.isRequired,
    columnDef: t.object.isRequired,
    components: t.object.isRequired,
    errorState: t.oneOfType([t.object, t.bool]),
    icons: t.object.isRequired,
    localization: t.object.isRequired,
    onCellEditFinished: t.func.isRequired,
    rowData: t.object.isRequired,
    size: t.string
  });
export default d(a);
