var r = Object.assign;
import p from 'react';
import i from 'prop-types';
import { Icon as m } from '@material-ui/core';
export default function t({ icon: e, iconProps: o }) {
  if (!!e)
    return typeof e == 'string'
      ? p.createElement(m, r({}, o), e)
      : p.createElement(e, r({}, o));
}
(t.defaultProps = { iconProps: {} }),
  (t.propTypes = { icon: i.element.isRequired, iconProps: i.object });
