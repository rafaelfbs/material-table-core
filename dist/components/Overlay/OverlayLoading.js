var t = Object.assign;
import e from 'react';
import d from 'prop-types';
import { CircularProgress as l } from '@material-ui/core';
function i(r) {
  return e.createElement(
    'div',
    {
      ref: r.forwardedRef,
      style: {
        display: 'table',
        width: '100%',
        height: '100%',
        backgroundColor: r.theme.palette.background.paper,
        opacity: 0.7
      }
    },
    e.createElement(
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
      e.createElement(l, null)
    )
  );
}
i.propTypes = { theme: d.any };
export default e.forwardRef(function (o, a) {
  return e.createElement(i, t(t({}, o), { forwardedRef: a }));
});
