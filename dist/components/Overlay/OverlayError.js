var o = Object.assign;
import r from 'react';
import t from 'prop-types';
function i(e) {
  return r.createElement(
    'div',
    {
      ref: e.forwardedRef,
      style: {
        display: 'table',
        width: '100%',
        height: '100%',
        backgroundColor: e.theme.palette.background.paper,
        opacity: 0.7
      }
    },
    r.createElement(
      'div',
      {
        style: {
          display: 'table-cell',
          width: '100%',
          height: '100%',
          verticalAlign: 'middle',
          textAlign: 'center'
        }
      },
      r.createElement('span', null, e.error.message),
      ' ',
      r.createElement(e.icon, {
        onClick: e.retry,
        style: { cursor: 'pointer', position: 'relative', top: 5 }
      })
    )
  );
}
i.propTypes = {
  error: t.oneOfType([t.object, t.string]),
  retry: t.func,
  theme: t.any,
  icon: t.any
};
export default r.forwardRef(function (n, l) {
  return r.createElement(i, o(o({}, n), { forwardedRef: l }));
});
