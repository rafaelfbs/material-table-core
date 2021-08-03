var s = Object.assign;
import g from '@material-ui/core/IconButton';
import { withStyles as C } from '@material-ui/core';
import c from '@material-ui/core/Tooltip';
import k from '@material-ui/core/Hidden';
import v from '@material-ui/core/Button';
import l from 'prop-types';
import e from 'react';
function d(t) {
  const P = (a) => {
      t.onPageChange(a, 0);
    },
    m = (a) => {
      t.onPageChange(a, t.page - 1);
    },
    p = (a) => {
      t.onPageChange(a, t.page + 1);
    },
    h = (a) => (r) => {
      t.onPageChange(r, a);
    },
    x = (a) => {
      t.onPageChange(a, Math.max(0, Math.ceil(t.count / t.rowsPerPage) - 1));
    };
  function T(a, r) {
    const n = [];
    for (let o = a; o <= r; o++) {
      const u = o === t.page ? 'contained' : 'text';
      n.push(
        e.createElement(
          v,
          {
            size: 'small',
            style: {
              boxShadow: 'none',
              maxWidth: '30px',
              maxHeight: '30px',
              minWidth: '30px',
              minHeight: '30px'
            },
            disabled: o === t.page,
            variant: u,
            onClick: h(o),
            key: o
          },
          o + 1
        )
      );
    }
    return e.createElement('span', null, n);
  }
  function B() {
    const {
        classes: a,
        count: r,
        page: n,
        rowsPerPage: o,
        theme: u,
        showFirstLastPageButtons: b
      } = t,
      i = s(s({}, d.defaultProps.localization), t.localization),
      f = Math.ceil(r / o) - 1,
      L = Math.max(n - 1, 0),
      w = Math.min(f, n + 1);
    return e.createElement(
      'div',
      { className: a.root, ref: t.forwardedRef },
      b &&
        e.createElement(
          c,
          { title: i.firstTooltip },
          e.createElement(
            'span',
            null,
            e.createElement(
              g,
              { onClick: P, disabled: n === 0, 'aria-label': i.firstAriaLabel },
              u.direction === 'rtl'
                ? e.createElement(t.icons.LastPage, null)
                : e.createElement(t.icons.FirstPage, null)
            )
          )
        ),
      e.createElement(
        c,
        { title: i.previousTooltip },
        e.createElement(
          'span',
          null,
          e.createElement(
            g,
            {
              onClick: m,
              disabled: n === 0,
              'aria-label': i.previousAriaLabel
            },
            e.createElement(t.icons.PreviousPage, null)
          )
        )
      ),
      e.createElement(k, { smDown: !0 }, T(L, w)),
      e.createElement(
        c,
        { title: i.nextTooltip },
        e.createElement(
          'span',
          null,
          e.createElement(
            g,
            { onClick: p, disabled: n >= f, 'aria-label': i.nextAriaLabel },
            e.createElement(t.icons.NextPage, null)
          )
        )
      ),
      b &&
        e.createElement(
          c,
          { title: i.lastTooltip },
          e.createElement(
            'span',
            null,
            e.createElement(
              g,
              {
                onClick: x,
                disabled: n >= Math.ceil(r / o) - 1,
                'aria-label': i.lastAriaLabel
              },
              u.direction === 'rtl'
                ? e.createElement(t.icons.FirstPage, null)
                : e.createElement(t.icons.LastPage, null)
            )
          )
        )
    );
  }
  return B();
}
const y = (t) => ({
  root: {
    flexShrink: 0,
    color: t.palette.text.secondary,
    marginLeft: t.spacing(2.5)
  }
});
(d.propTypes = {
  onPageChange: l.func,
  page: l.number,
  count: l.number,
  rowsPerPage: l.number,
  classes: l.object,
  localization: l.object,
  theme: l.any,
  showFirstLastPageButtons: l.bool
}),
  (d.defaultProps = {
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
const M = e.forwardRef(function (P, m) {
    return e.createElement(d, s(s({}, P), { forwardedRef: m }));
  }),
  A = C(y, { withTheme: !0 })(M);
export default A;
