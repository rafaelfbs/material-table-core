var l = Object.assign;
import u from 'react';
import i from 'date-fns/parseISO';
import * as a from '../../utils/common-values';
export const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3])\:[0-5]\d|24\:00)(\:[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3])\:?([0-5]\d)?)?)?$/;
export function getEmptyValue(e = '', t = {}) {
  return typeof e == 'function' ? t.columnDef.emptyValue(t.rowData) : e;
}
export function getCurrencyValue(e, t) {
  return e !== void 0
    ? new Intl.NumberFormat(e.locale !== void 0 ? e.locale : 'en-US', {
        style: 'currency',
        currency: e.currencyCode !== void 0 ? e.currencyCode : 'USD',
        minimumFractionDigits:
          e.minimumFractionDigits !== void 0 ? e.minimumFractionDigits : 2,
        maximumFractionDigits:
          e.maximumFractionDigits !== void 0 ? e.maximumFractionDigits : 2
      }).format(t !== void 0 ? t : 0)
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(t !== void 0 ? t : 0);
}
export function getStyle(e) {
  const t = a.reducePercentsInCalc(e.columnDef.tableData.width, e.scrollWidth);
  let n = {
    color: 'inherit',
    width: t,
    maxWidth: e.columnDef.maxWidth,
    minWidth: e.columnDef.minWidth,
    boxSizing: 'border-box',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit'
  };
  return (
    typeof e.columnDef.cellStyle == 'function'
      ? (n = l(l({}, n), e.columnDef.cellStyle(e.value, e.rowData)))
      : (n = l(l({}, n), e.columnDef.cellStyle)),
    e.columnDef.disableClick && (n.cursor = 'default'),
    l(l({}, e.style), n)
  );
}
export function getRenderValue(e) {
  const t =
    e.columnDef.dateSetting && e.columnDef.dateSetting.locale
      ? e.columnDef.dateSetting.locale
      : void 0;
  if (
    e.columnDef.emptyValue !== void 0 &&
    (e.value === void 0 || e.value === null)
  )
    return getEmptyValue(e.columnDef.emptyValue, e);
  if (e.columnDef.render) {
    if (e.rowData) return e.columnDef.render(e.rowData, 'row');
    if (e.value) return e.columnDef.render(e.value, 'group');
  } else if (e.columnDef.type === 'boolean') {
    const n = { textAlign: 'left', verticalAlign: 'middle', width: 48 };
    return e.value
      ? u.createElement(e.icons.Check, { style: n })
      : u.createElement(e.icons.ThirdStateCheck, { style: n });
  } else {
    if (e.columnDef.type === 'date')
      return e.value instanceof Date
        ? e.value.toLocaleDateString(t)
        : isoDateRegex.exec(e.value)
        ? i(e.value).toLocaleDateString(t)
        : e.value;
    if (e.columnDef.type === 'time')
      return e.value instanceof Date
        ? e.value.toLocaleTimeString()
        : isoDateRegex.exec(e.value)
        ? i(e.value).toLocaleTimeString(t)
        : e.value;
    if (e.columnDef.type === 'datetime')
      return e.value instanceof Date
        ? e.value.toLocaleString()
        : isoDateRegex.exec(e.value)
        ? i(e.value).toLocaleString(t)
        : e.value;
    if (e.columnDef.type === 'currency')
      return getCurrencyValue(e.columnDef.currencySetting, e.value);
    if (typeof e.value == 'boolean') return e.value.toString();
  }
  return e.value;
}
