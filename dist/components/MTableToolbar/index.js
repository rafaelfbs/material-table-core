var a = Object.assign;
import F from '@material-ui/core/Checkbox';
import b from '@material-ui/core/InputAdornment';
import u from '@material-ui/core/IconButton';
import T from '@material-ui/core/Menu';
import d from '@material-ui/core/MenuItem';
import v from '@material-ui/core/TextField';
import M from '@material-ui/core/Toolbar';
import h from '@material-ui/core/Tooltip';
import p from '@material-ui/core/Typography';
import { lighten as E, withStyles as I } from '@material-ui/core';
import z from 'classnames';
import n from 'prop-types';
import t from 'react';
export function MTableToolbar(e) {
  const [r, s] = t.useState(() => ({
      columnsButtonAnchorEl: null,
      exportButtonAnchorEl: null,
      searchText: e.searchText
    })),
    m = (l) => {
      e.dataManager.changeSearchText(l),
        s(a(a({}, r), { searchText: l }), e.onSearchChanged(l));
    },
    x = () => {
      const l = e.columns
          .filter(
            (o) => (!o.hidden || o.export === !0) && o.field && o.export !== !1
          )
          .sort((o, c) =>
            o.tableData.columnOrder > c.tableData.columnOrder ? 1 : -1
          ),
        i = (e.exportAllData ? e.data : e.renderData).map((o) =>
          l.map((c) =>
            typeof c.customExport == 'function'
              ? c.customExport(o)
              : e.getFieldValue(o, c)
          )
        );
      return [l, i];
    };
  function f() {
    const l = a(a({}, MTableToolbar.defaultProps.localization), e.localization);
    return e.search
      ? t.createElement(v, {
          autoFocus: e.searchAutoFocus,
          className:
            e.searchFieldAlignment === 'left' && e.showTitle === !1
              ? null
              : e.classes.searchField,
          value: r.searchText,
          onChange: (i) => m(i.target.value),
          placeholder: l.searchPlaceholder,
          variant: e.searchFieldVariant,
          InputProps: {
            startAdornment: t.createElement(
              b,
              { position: 'start' },
              t.createElement(
                h,
                { title: l.searchTooltip },
                t.createElement(e.icons.Search, { fontSize: 'small' })
              )
            ),
            endAdornment: t.createElement(
              b,
              { position: 'end' },
              t.createElement(
                u,
                {
                  disabled: !r.searchText,
                  onClick: () => m(''),
                  'aria-label': l.clearSearchAriaLabel
                },
                t.createElement(e.icons.ResetSearch, {
                  fontSize: 'small',
                  'aria-label': 'clear'
                })
              )
            ),
            style: e.searchFieldStyle,
            inputProps: { 'aria-label': l.searchAriaLabel }
          }
        })
      : null;
  }
  function A() {
    const l = a(a({}, MTableToolbar.defaultProps.localization), e.localization),
      { classes: i } = e;
    return t.createElement(
      'div',
      { style: { display: 'flex' } },
      e.columnsButton &&
        t.createElement(
          'span',
          null,
          t.createElement(
            h,
            { title: l.showColumnsTitle },
            t.createElement(
              u,
              {
                color: 'inherit',
                onClick: (o) =>
                  s(a(a({}, r), { columnsButtonAnchorEl: o.currentTarget })),
                'aria-label': l.showColumnsAriaLabel
              },
              t.createElement(e.icons.ViewColumn, null)
            )
          ),
          t.createElement(
            T,
            {
              anchorEl: r.columnsButtonAnchorEl,
              open: Boolean(r.columnsButtonAnchorEl),
              onClose: () => s(a(a({}, r), { columnsButtonAnchorEl: null }))
            },
            t.createElement(
              d,
              {
                key: 'text',
                disabled: !0,
                style: { opacity: 1, fontWeight: 600, fontSize: 12 }
              },
              l.addRemoveColumns
            ),
            e.columns.map((o) =>
              (
                o.hiddenByColumnsButton !== void 0
                  ? o.hiddenByColumnsButton
                  : e.columnsHiddenInColumnsButton
              )
                ? null
                : t.createElement(
                    'li',
                    { key: o.tableData.id },
                    t.createElement(
                      d,
                      {
                        className: i.formControlLabel,
                        component: 'label',
                        htmlFor: `column-toggle-${o.tableData.id}`,
                        disabled: o.removable === !1
                      },
                      t.createElement(F, {
                        checked: !o.hidden,
                        id: `column-toggle-${o.tableData.id}`,
                        onChange: () => e.onColumnsChanged(o, !o.hidden)
                      }),
                      t.createElement('span', null, o.title)
                    )
                  )
            )
          )
        ),
      e.exportMenu.length > 0 &&
        t.createElement(
          'span',
          null,
          t.createElement(
            h,
            { title: l.exportTitle },
            t.createElement(
              u,
              {
                color: 'inherit',
                onClick: (o) =>
                  s(a(a({}, r), { exportButtonAnchorEl: o.currentTarget })),
                'aria-label': l.exportAriaLabel
              },
              t.createElement(e.icons.Export, null)
            )
          ),
          t.createElement(
            T,
            {
              anchorEl: r.exportButtonAnchorEl,
              open: Boolean(r.exportButtonAnchorEl),
              onClose: () => s(a(a({}, r), { exportButtonAnchorEl: null }))
            },
            e.exportMenu.map((o, c) => {
              const [B, S] = x();
              return t.createElement(
                d,
                {
                  key: `${o.label}${c}`,
                  onClick: () => {
                    o.exportFunc(B, S), s({ exportButtonAnchorEl: null });
                  }
                },
                o.label
              );
            })
          )
        ),
      t.createElement(
        'span',
        null,
        t.createElement(e.components.Actions, {
          actions:
            e.actions && e.actions.filter((o) => o.position === 'toolbar'),
          components: e.components
        })
      )
    );
  }
  function w() {
    return t.createElement(
      t.Fragment,
      null,
      t.createElement(e.components.Actions, {
        actions: e.actions.filter((l) => l.position === 'toolbarOnSelect'),
        data: e.selectedRows,
        components: e.components
      })
    );
  }
  function g() {
    const { classes: l } = e;
    return t.createElement(
      'div',
      { className: l.actions },
      t.createElement(
        'div',
        null,
        e.selectedRows && e.selectedRows.length > 0 ? w() : A()
      )
    );
  }
  function y(l) {
    const { classes: i } = e,
      o =
        typeof l == 'string'
          ? t.createElement(
              p,
              {
                variant: 'h6',
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }
              },
              l
            )
          : l;
    return t.createElement('div', { className: i.title }, o);
  }
  function C() {
    const { classes: l } = e,
      i = a(a({}, MTableToolbar.defaultProps.localization), e.localization),
      o =
        e.showTextRowsSelected && e.selectedRows && e.selectedRows.length > 0
          ? typeof i.nRowsSelected == 'function'
            ? i.nRowsSelected(e.selectedRows.length)
            : i.nRowsSelected.replace('{0}', e.selectedRows.length)
          : e.showTitle
          ? e.title
          : null;
    return t.createElement(
      M,
      {
        ref: e.forwardedRef,
        className: z(l.root, {
          [l.highlight]:
            e.showTextRowsSelected &&
            e.selectedRows &&
            e.selectedRows.length > 0
        })
      },
      o && y(o),
      e.searchFieldAlignment === 'left' && f(),
      e.toolbarButtonAlignment === 'left' && g(),
      t.createElement('div', { className: l.spacer }),
      e.searchFieldAlignment === 'right' && f(),
      e.toolbarButtonAlignment === 'right' && g()
    );
  }
  return C();
}
(MTableToolbar.defaultProps = {
  actions: [],
  columns: [],
  columnsHiddenInColumnsButton: !1,
  columnsButton: !1,
  localization: {
    addRemoveColumns: 'Add or remove columns',
    nRowsSelected: '{0} row(s) selected',
    showColumnsTitle: 'Show Columns',
    showColumnsAriaLabel: 'Show Columns',
    exportTitle: 'Export',
    exportAriaLabel: 'Export',
    searchTooltip: 'Search',
    searchPlaceholder: 'Search',
    searchAriaLabel: 'Search',
    clearSearchAriaLabel: 'Clear Search'
  },
  search: !0,
  showTitle: !0,
  searchText: '',
  showTextRowsSelected: !0,
  toolbarButtonAlignment: 'right',
  searchAutoFocus: !1,
  searchFieldAlignment: 'right',
  searchFieldVariant: 'standard',
  selectedRows: [],
  title: 'No Title!'
}),
  (MTableToolbar.propTypes = {
    actions: n.array,
    columns: n.array,
    columnsButton: n.bool,
    components: n.object.isRequired,
    getFieldValue: n.func.isRequired,
    localization: n.object.isRequired,
    onColumnsChanged: n.func.isRequired,
    dataManager: n.object.isRequired,
    searchText: n.string,
    onSearchChanged: n.func.isRequired,
    search: n.bool.isRequired,
    searchFieldStyle: n.object,
    searchFieldVariant: n.string,
    selectedRows: n.array,
    title: n.oneOfType([n.element, n.string]),
    showTitle: n.bool.isRequired,
    showTextRowsSelected: n.bool.isRequired,
    toolbarButtonAlignment: n.string.isRequired,
    searchFieldAlignment: n.string.isRequired,
    renderData: n.array,
    data: n.array,
    exportAllData: n.bool,
    exportMenu: n.arrayOf(n.shape({ name: n.string, handler: n.func })),
    classes: n.object,
    searchAutoFocus: n.bool
  });
export const styles = (e) => ({
  root: { paddingRight: e.spacing(1), paddingLeft: e.spacing(2) },
  highlight:
    e.palette.type === 'light'
      ? {
          color: e.palette.secondary.main,
          backgroundColor: E(e.palette.secondary.light, 0.85)
        }
      : {
          color: e.palette.text.primary,
          backgroundColor: e.palette.secondary.dark
        },
  spacer: { flex: '1 1 10%' },
  actions: { color: e.palette.text.secondary },
  title: { overflow: 'hidden' },
  searchField: { minWidth: 150, paddingLeft: e.spacing(2) },
  formControlLabel: { paddingLeft: e.spacing(1), paddingRight: e.spacing(1) }
});
const k = t.forwardRef(function (r, s) {
  return t.createElement(MTableToolbar, a(a({}, r), { forwardedRef: s }));
});
export default I(styles)(k);
