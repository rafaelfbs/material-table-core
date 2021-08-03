var e = Object.assign;
import i from 'react';
import n from 'prop-types';
import I from '@material-ui/core/Icon';
import h from '@material-ui/core/IconButton';
import f from '@material-ui/core/Tooltip';
function d(t) {
  function a() {
    let o = t.action;
    if (
      (typeof o == 'function' && ((o = o(t.data)), !o)) ||
      (o.action && ((o = o.action(t.data)), !o)) ||
      o.hidden
    )
      return null;
    const c = o.disabled || t.disabled,
      u = (r) => {
        o.onClick && (o.onClick(r, t.data), r.stopPropagation());
      },
      s = o.handlers || {},
      p = Object.entries(s).reduce(
        (r, [m, T]) => ((r[m] = (y) => T(y, t.data)), r),
        {}
      ),
      b =
        typeof o.icon == 'string'
          ? i.createElement(I, e({}, o.iconProps), o.icon)
          : typeof o.icon == 'function'
          ? o.icon(e(e({}, o.iconProps), { disabled: c }))
          : i.createElement(o.icon, null),
      l = i.createElement(
        h,
        e(
          {
            ref: t.forwardedRef,
            size: t.size,
            color: 'inherit',
            disabled: c,
            onClick: u
          },
          p
        ),
        b
      );
    return o.tooltip
      ? c
        ? i.createElement(
            f,
            { title: o.tooltip },
            i.createElement('span', null, l)
          )
        : i.createElement(f, { title: o.tooltip }, l)
      : l;
  }
  return a();
}
(d.defaultProps = { action: {}, data: {} }),
  (d.propTypes = {
    action: n.oneOfType([n.func, n.object]).isRequired,
    data: n.oneOfType([n.object, n.arrayOf(n.object)]),
    disabled: n.bool,
    size: n.string
  });
export default i.forwardRef(function (a, o) {
  return i.createElement(d, e(e({}, a), { forwardedRef: o }));
});
