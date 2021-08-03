var n = Object.assign;
import s from '@material-ui/core/IconButton';
import { withStyles as w } from '@material-ui/core';
import c from '@material-ui/core/Tooltip';
import x from '@material-ui/core/Typography';
import i from 'prop-types';
import t from 'react';
function g(e) {
  const u = (a) => {
      e.onPageChange(a, 0);
    },
    P = (a) => {
      e.onPageChange(a, e.page - 1);
    },
    h = (a) => {
      e.onPageChange(a, e.page + 1);
    },
    m = (a) => {
      e.onPageChange(a, Math.max(0, Math.ceil(e.count / e.rowsPerPage) - 1));
    };
  function T() {
    const {
        classes: a,
        count: f,
        page: l,
        rowsPerPage: d,
        theme: r,
        showFirstLastPageButtons: b
      } = e,
      o = n(n({}, g.defaultProps.localization), e.localization);
    return t.createElement(
      'div',
      { className: a.root, ref: e.forwardedRef },
      b &&
        t.createElement(
          c,
          { title: o.firstTooltip },
          t.createElement(
            'span',
            null,
            t.createElement(
              s,
              { onClick: u, disabled: l === 0, 'aria-label': o.firstAriaLabel },
              r.direction === 'rtl'
                ? t.createElement(e.icons.LastPage, null)
                : t.createElement(e.icons.FirstPage, null)
            )
          )
        ),
      t.createElement(
        c,
        { title: o.previousTooltip },
        t.createElement(
          'span',
          null,
          t.createElement(
            s,
            {
              onClick: P,
              disabled: l === 0,
              'aria-label': o.previousAriaLabel
            },
            r.direction === 'rtl'
              ? t.createElement(e.icons.NextPage, null)
              : t.createElement(e.icons.PreviousPage, null)
          )
        )
      ),
      t.createElement(
        x,
        {
          variant: 'caption',
          style: {
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            flexBasis: 'inherit'
          }
        },
        o.labelDisplayedRows
          .replace('{from}', e.count === 0 ? 0 : e.page * e.rowsPerPage + 1)
          .replace('{to}', Math.min((e.page + 1) * e.rowsPerPage, e.count))
          .replace('{count}', e.count)
      ),
      t.createElement(
        c,
        { title: o.nextTooltip },
        t.createElement(
          'span',
          null,
          t.createElement(
            s,
            {
              onClick: h,
              disabled: l >= Math.ceil(f / d) - 1,
              'aria-label': o.nextAriaLabel
            },
            r.direction === 'rtl'
              ? t.createElement(e.icons.PreviousPage, null)
              : t.createElement(e.icons.NextPage, null)
          )
        )
      ),
      b &&
        t.createElement(
          c,
          { title: o.lastTooltip },
          t.createElement(
            'span',
            null,
            t.createElement(
              s,
              {
                onClick: m,
                disabled: l >= Math.ceil(f / d) - 1,
                'aria-label': o.lastAriaLabel
              },
              r.direction === 'rtl'
                ? t.createElement(e.icons.FirstPage, null)
                : t.createElement(e.icons.LastPage, null)
            )
          )
        )
    );
  }
  return T();
}
const y = (e) => ({
  root: { flexShrink: 0, color: e.palette.text.secondary, display: 'flex' }
});
(g.propTypes = {
  onPageChange: i.func,
  page: i.number,
  count: i.number,
  rowsPerPage: i.number,
  classes: i.object,
  localization: i.object,
  theme: i.any,
  showFirstLastPageButtons: i.bool
}),
  (g.defaultProps = {
    showFirstLastPageButtons: !0,
    localization: {
      firstAriaLabel: 'First Page',
      firstTooltip: 'First Page',
      previousAriaLabel: 'Previous Page',
      previousTooltip: 'Previous Page',
      nextAriaLabel: 'Next Page',
      nextTooltip: 'Next Page',
      lastAriaLabel: 'Last Page',
      lastTooltip: 'Last Page',
      labelDisplayedRows: '{from}-{to} of {count}',
      labelRowsPerPage: 'Rows per page:'
    }
  });
const p = t.forwardRef(function (u, P) {
    return t.createElement(g, n(n({}, u), { forwardedRef: P }));
  }),
  L = w(y, { withTheme: !0 })(p);
export default L;
