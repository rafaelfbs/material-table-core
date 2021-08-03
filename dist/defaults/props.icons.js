var r = Object.assign;
import n, { forwardRef as f } from 'react';
import { Icon as l } from '@material-ui/core';
export default {
  Add: f((e, o) => n.createElement(l, r(r({}, e), { ref: o }), 'add_box')),
  Check: f((e, o) => n.createElement(l, r(r({}, e), { ref: o }), 'check')),
  Clear: f((e, o) => n.createElement(l, r(r({}, e), { ref: o }), 'clear')),
  Delete: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'delete_outline')
  ),
  DetailPanel: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'chevron_right')
  ),
  Edit: f((e, o) => n.createElement(l, r(r({}, e), { ref: o }), 'edit')),
  Export: f((e, o) => n.createElement(l, r(r({}, e), { ref: o }), 'save_alt')),
  Filter: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'filter_list')
  ),
  FirstPage: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'first_page')
  ),
  LastPage: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'last_page')
  ),
  NextPage: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'chevron_right')
  ),
  PreviousPage: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'chevron_left')
  ),
  ResetSearch: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'clear')
  ),
  Resize: f((e, o) =>
    n.createElement(
      l,
      r(r({}, e), {
        ref: o,
        style: r(r({}, e.style), { transform: 'rotate(90deg)' })
      }),
      'drag_handle'
    )
  ),
  Search: f((e, o) => n.createElement(l, r(r({}, e), { ref: o }), 'search')),
  SortArrow: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'arrow_downward')
  ),
  ThirdStateCheck: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'remove')
  ),
  ViewColumn: f((e, o) =>
    n.createElement(l, r(r({}, e), { ref: o }), 'view_column')
  ),
  Retry: f((e, o) => n.createElement(l, r(r({}, e), { ref: o }), 'replay'))
};
