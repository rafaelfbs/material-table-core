var i = Object.assign;
import r from 'react';
import e from 'prop-types';
function d({
  actions: o,
  components: t,
  data: a,
  size: n,
  disabled: f,
  forwardedRef: s
}) {
  return o
    ? r.createElement(
        'div',
        { style: { display: 'flex' }, ref: s },
        o.map((p, l) =>
          r.createElement(t.Action, {
            action: p,
            key: 'action-' + l,
            data: a,
            size: n,
            disabled: f
          })
        )
      )
    : null;
}
(d.defaultProps = { actions: [], data: {} }),
  (d.propTypes = {
    components: e.object.isRequired,
    actions: e.array.isRequired,
    data: e.oneOfType([e.object, e.arrayOf(e.object)]),
    disabled: e.bool,
    size: e.string,
    forwardedRef: e.element
  });
export default r.forwardRef(function (t, a) {
  return r.createElement(d, i(i({}, t), { forwardedRef: a }));
});
