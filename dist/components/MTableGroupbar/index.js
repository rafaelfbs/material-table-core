var a = Object.assign;
import b from '@material-ui/core/Toolbar';
import u from '@material-ui/core/Chip';
import y from '@material-ui/core/Typography';
import i from 'prop-types';
import r from 'react';
import { Droppable as m, Draggable as h } from 'react-beautiful-dnd';
function p(e) {
  const n = (l, d) => a({ userSelect: 'none', margin: `0 ${8}px 0 0` }, d),
    g = (l) => ({
      background: '#0000000a',
      display: 'flex',
      width: '100%',
      padding: 8,
      overflow: 'auto',
      border: '1px solid #ccc',
      borderStyle: 'dashed'
    });
  return r.createElement(
    b,
    { style: { padding: 0, minHeight: 'unset' }, ref: e.forwardedRef },
    r.createElement(
      m,
      { droppableId: 'groups', direction: 'horizontal', placeholder: 'Deneme' },
      (l, d) =>
        r.createElement(
          'div',
          { ref: l.innerRef, style: g(d.isDraggingOver) },
          e.groupColumns.length > 0 &&
            r.createElement(
              y,
              { variant: 'caption', style: { padding: 8 } },
              e.localization.groupedBy
            ),
          e.groupColumns.map((o, s) =>
            r.createElement(
              h,
              {
                key: o.tableData.id,
                draggableId: o.tableData.id.toString(),
                index: s
              },
              (t, f) =>
                r.createElement(
                  'div',
                  a(
                    a(
                      a({ ref: t.innerRef }, t.draggableProps),
                      t.dragHandleProps
                    ),
                    { style: n(f.isDragging, t.draggableProps.style) }
                  ),
                  r.createElement(
                    u,
                    a(a({}, t.dragHandleProps), {
                      onClick: () => e.onSortChanged(o),
                      label: r.createElement(
                        'div',
                        { style: { display: 'flex', alignItems: 'center' } },
                        r.createElement(
                          'div',
                          { style: { float: 'left' } },
                          o.title
                        ),
                        o.tableData.groupSort &&
                          r.createElement(e.icons.SortArrow, {
                            style: {
                              transition: '300ms ease all',
                              transform:
                                o.tableData.groupSort === 'asc'
                                  ? 'rotate(-180deg)'
                                  : 'none',
                              fontSize: 18
                            }
                          })
                      ),
                      style: { boxShadow: 'none', textTransform: 'none' },
                      onDelete: () => e.onGroupRemoved(o, s)
                    })
                  )
                )
            )
          ),
          e.groupColumns.length === 0 &&
            r.createElement(
              y,
              { variant: 'caption', style: { padding: 8 } },
              e.localization.placeholder
            ),
          l.placeholder
        )
    )
  );
}
(p.defaultProps = {}),
  (p.propTypes = {
    localization: i.shape({ groupedBy: i.string, placeholder: i.string }),
    forwardedRef: i.element
  });
export default r.forwardRef(function (n, g) {
  return r.createElement(p, a(a({}, n), { forwardedRef: g }));
});
