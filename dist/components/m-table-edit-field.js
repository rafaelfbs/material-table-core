var y = Object.prototype.hasOwnProperty;
var d = Object.getOwnPropertySymbols,
  F = Object.prototype.propertyIsEnumerable;
var o = Object.assign;
var n = (l, e) => {
  var i = {};
  for (var t in l) y.call(l, t) && e.indexOf(t) < 0 && (i[t] = l[t]);
  if (l != null && d)
    for (var t of d(l)) e.indexOf(t) < 0 && F.call(l, t) && (i[t] = l[t]);
  return i;
};
import r from 'react';
import c from '@material-ui/core/TextField';
import P from '@material-ui/core/Checkbox';
import C from '@material-ui/core/Select';
import v from '@material-ui/core/MenuItem';
import f from '@material-ui/core/FormControl';
import g from '@material-ui/core/FormHelperText';
import b from '@material-ui/core/FormGroup';
import k from '@material-ui/core/FormControlLabel';
import u from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider as m,
  TimePicker as T,
  DatePicker as x,
  DateTimePicker as S
} from '@material-ui/pickers';
import a from 'prop-types';
class D extends r.Component {
  getProps() {
    const h = this.props,
      {
        columnDef: e,
        rowData: i,
        onRowDataChange: t,
        errorState: p,
        onBulkEditRowChanged: s,
        scrollWidth: M
      } = h;
    return n(h, [
      'columnDef',
      'rowData',
      'onRowDataChange',
      'errorState',
      'onBulkEditRowChanged',
      'scrollWidth'
    ]);
  }
  renderLookupField() {
    const p = this.getProps(),
      { helperText: e, error: i } = p,
      t = n(p, ['helperText', 'error']);
    return r.createElement(
      f,
      { error: Boolean(i) },
      r.createElement(
        C,
        o(o({}, t), {
          value: this.props.value === void 0 ? '' : this.props.value,
          onChange: (s) => this.props.onChange(s.target.value),
          style: { fontSize: 13 },
          SelectDisplayProps: { 'aria-label': this.props.columnDef.title }
        }),
        Object.keys(this.props.columnDef.lookup).map((s) =>
          r.createElement(
            v,
            { key: s, value: s },
            this.props.columnDef.lookup[s]
          )
        )
      ),
      Boolean(e) && r.createElement(g, null, e)
    );
  }
  renderBooleanField() {
    const p = this.getProps(),
      { helperText: e, error: i } = p,
      t = n(p, ['helperText', 'error']);
    return r.createElement(
      f,
      { error: Boolean(i), component: 'fieldset' },
      r.createElement(
        b,
        null,
        r.createElement(k, {
          label: '',
          control: r.createElement(
            P,
            o(o({}, t), {
              value: String(this.props.value),
              checked: Boolean(this.props.value),
              onChange: (s) => this.props.onChange(s.target.checked),
              style: { padding: 0, width: 24, marginLeft: 9 },
              inputProps: { 'aria-label': this.props.columnDef.title }
            })
          )
        })
      ),
      r.createElement(g, null, e)
    );
  }
  renderDateField() {
    const e =
      this.props.columnDef.dateSetting &&
      this.props.columnDef.dateSetting.format
        ? this.props.columnDef.dateSetting.format
        : 'dd.MM.yyyy';
    return r.createElement(
      m,
      { utils: u, locale: this.props.locale },
      r.createElement(
        x,
        o(o({}, this.getProps()), {
          format: e,
          value: this.props.value || null,
          onChange: this.props.onChange,
          clearable: !0,
          InputProps: { style: { fontSize: 13 } },
          inputProps: {
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }
        })
      )
    );
  }
  renderTimeField() {
    return r.createElement(
      m,
      { utils: u, locale: this.props.locale },
      r.createElement(
        T,
        o(o({}, this.getProps()), {
          format: 'HH:mm:ss',
          value: this.props.value || null,
          onChange: this.props.onChange,
          clearable: !0,
          InputProps: { style: { fontSize: 13 } },
          inputProps: {
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }
        })
      )
    );
  }
  renderDateTimeField() {
    return r.createElement(
      m,
      { utils: u, locale: this.props.locale },
      r.createElement(
        S,
        o(o({}, this.getProps()), {
          format: 'dd.MM.yyyy HH:mm:ss',
          value: this.props.value || null,
          onChange: this.props.onChange,
          clearable: !0,
          InputProps: { style: { fontSize: 13 } },
          inputProps: {
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }
        })
      )
    );
  }
  renderTextField() {
    return r.createElement(
      c,
      o(o({}, this.getProps()), {
        fullWidth: !0,
        type: this.props.columnDef.type === 'numeric' ? 'number' : 'text',
        placeholder:
          this.props.columnDef.editPlaceholder || this.props.columnDef.title,
        value: this.props.value === void 0 ? '' : this.props.value,
        onChange: (e) =>
          this.props.onChange(
            this.props.columnDef.type === 'numeric'
              ? e.target.valueAsNumber
              : e.target.value
          ),
        InputProps: { style: { minWidth: 50, fontSize: 13 } },
        inputProps: {
          'aria-label': this.props.columnDef.title,
          style:
            this.props.columnDef.type === 'numeric'
              ? { textAlign: 'right' }
              : {}
        }
      })
    );
  }
  renderCurrencyField() {
    return r.createElement(
      c,
      o(o({}, this.getProps()), {
        placeholder:
          this.props.columnDef.editPlaceholder || this.props.columnDef.title,
        type: 'number',
        value: this.props.value === void 0 ? '' : this.props.value,
        onChange: (e) => {
          let i = e.target.valueAsNumber;
          return !i && i !== 0 && (i = void 0), this.props.onChange(i);
        },
        InputProps: { style: { fontSize: 13, textAlign: 'right' } },
        inputProps: {
          'aria-label': this.props.columnDef.title,
          style: { textAlign: 'right' }
        },
        onKeyDown: this.props.onKeyDown,
        autoFocus: this.props.autoFocus
      })
    );
  }
  render() {
    let e = 'ok';
    return (
      this.props.columnDef.editComponent
        ? (e = this.props.columnDef.editComponent(this.props))
        : this.props.columnDef.lookup
        ? (e = this.renderLookupField())
        : this.props.columnDef.type === 'boolean'
        ? (e = this.renderBooleanField())
        : this.props.columnDef.type === 'date'
        ? (e = this.renderDateField())
        : this.props.columnDef.type === 'time'
        ? (e = this.renderTimeField())
        : this.props.columnDef.type === 'datetime'
        ? (e = this.renderDateTimeField())
        : this.props.columnDef.type === 'currency'
        ? (e = this.renderCurrencyField())
        : (e = this.renderTextField()),
      e
    );
  }
}
D.propTypes = {
  value: a.any,
  onChange: a.func.isRequired,
  columnDef: a.object.isRequired,
  locale: a.object
};
export default D;
