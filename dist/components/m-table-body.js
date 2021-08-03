var e = Object.assign;
import s from 'react';
import o from 'prop-types';
import {
  TableBody as c,
  TableCell as u,
  TableRow as d
} from '@material-ui/core';
class r extends s.Component {
  renderEmpty(t, n) {
    const p = this.props.options.padding === 'default' ? 49 : 36,
      a = e(e({}, r.defaultProps.localization), this.props.localization);
    if (this.props.options.showEmptyDataSourceMessage && n.length === 0) {
      let i = 0;
      return (
        this.props.options.selection && i++,
        this.props.actions &&
          this.props.actions.filter(
            (l) => l.position === 'row' || typeof l == 'function'
          ).length > 0 &&
          i++,
        this.props.hasDetailPanel && i++,
        this.props.isTreeData && i++,
        s.createElement(
          d,
          {
            style: {
              height:
                p *
                (this.props.options.paging &&
                this.props.options.emptyRowsWhenPaging
                  ? this.props.pageSize
                  : 1)
            },
            key: 'empty-' + 0
          },
          s.createElement(
            u,
            {
              style: { paddingTop: 0, paddingBottom: 0, textAlign: 'center' },
              colSpan: this.props.columns.reduce(
                (l, h) => (h.hidden ? l : l + 1),
                i
              ),
              key: 'empty-'
            },
            a.emptyDataSourceMessage
          )
        )
      );
    } else if (this.props.options.emptyRowsWhenPaging)
      return s.createElement(
        s.Fragment,
        null,
        [...Array(t)].map((i, l) =>
          s.createElement(d, { style: { height: p }, key: 'empty-' + l })
        ),
        t > 0 &&
          s.createElement(d, { style: { height: 1 }, key: 'empty-last1' })
      );
  }
  renderUngroupedRows(t) {
    return t.map((n, p) =>
      n.tableData.editing || this.props.bulkEditOpen
        ? s.createElement(this.props.components.EditRow, {
            columns: this.props.columns.filter((a) => !a.hidden),
            components: this.props.components,
            data: n,
            errorState: this.props.errorState,
            icons: this.props.icons,
            localization: e(
              e(
                e({}, r.defaultProps.localization.editRow),
                this.props.localization.editRow
              ),
              {
                dateTimePickerLocalization: this.props.localization
                  .dateTimePickerLocalization
              }
            ),
            key: 'row-' + n.tableData.uuid,
            mode: this.props.bulkEditOpen ? 'bulk' : n.tableData.editing,
            options: this.props.options,
            isTreeData: this.props.isTreeData,
            detailPanel: this.props.detailPanel,
            onEditingCanceled: this.props.onEditingCanceled,
            onEditingApproved: this.props.onEditingApproved,
            bulkEditChangedRows: this.props.bulkEditChangedRows,
            getFieldValue: this.props.getFieldValue,
            onBulkEditRowChanged: this.props.onBulkEditRowChanged,
            scrollWidth: this.props.scrollWidth
          })
        : s.createElement(this.props.components.Row, {
            components: this.props.components,
            icons: this.props.icons,
            data: n,
            index: p,
            errorState: this.props.errorState,
            key: 'row-' + n.tableData.uuid,
            level: 0,
            options: this.props.options,
            localization: e(
              e(
                e({}, r.defaultProps.localization.editRow),
                this.props.localization.editRow
              ),
              {
                dateTimePickerLocalization: this.props.localization
                  .dateTimePickerLocalization
              }
            ),
            onRowSelected: this.props.onRowSelected,
            actions: this.props.actions,
            columns: this.props.columns,
            getFieldValue: this.props.getFieldValue,
            detailPanel: this.props.detailPanel,
            path: [p + this.props.pageSize * this.props.currentPage],
            onToggleDetailPanel: this.props.onToggleDetailPanel,
            onRowClick: this.props.onRowClick,
            onDoubleRowClick: this.props.onDoubleRowClick,
            isTreeData: this.props.isTreeData,
            onTreeExpandChanged: this.props.onTreeExpandChanged,
            onEditingCanceled: this.props.onEditingCanceled,
            onEditingApproved: this.props.onEditingApproved,
            hasAnyEditingRow: this.props.hasAnyEditingRow,
            treeDataMaxLevel: this.props.treeDataMaxLevel,
            cellEditable: this.props.cellEditable,
            onCellEditStarted: this.props.onCellEditStarted,
            onCellEditFinished: this.props.onCellEditFinished,
            scrollWidth: this.props.scrollWidth
          })
    );
  }
  renderGroupedRows(t, n) {
    return n.map((p, a) =>
      s.createElement(this.props.components.GroupRow, {
        actions: this.props.actions,
        cellEditable: this.props.cellEditable,
        columns: this.props.columns,
        components: this.props.components,
        detailPanel: this.props.detailPanel,
        getFieldValue: this.props.getFieldValue,
        groupData: p,
        groups: t,
        hasAnyEditingRow: this.props.hasAnyEditingRow,
        icons: this.props.icons,
        isTreeData: this.props.isTreeData,
        key: p.value == null ? '' + a : p.value,
        level: 0,
        localization: e(
          e(
            e({}, r.defaultProps.localization.editRow),
            this.props.localization.editRow
          ),
          {
            dateTimePickerLocalization: this.props.localization
              .dateTimePickerLocalization
          }
        ),
        onBulkEditRowChanged: this.props.onBulkEditRowChanged,
        onCellEditFinished: this.props.onCellEditFinished,
        onCellEditStarted: this.props.onCellEditStarted,
        onEditingApproved: this.props.onEditingApproved,
        onEditingCanceled: this.props.onEditingCanceled,
        onGroupExpandChanged: this.props.onGroupExpandChanged,
        onRowClick: this.props.onRowClick,
        onRowSelected: this.props.onRowSelected,
        onToggleDetailPanel: this.props.onToggleDetailPanel,
        onTreeExpandChanged: this.props.onTreeExpandChanged,
        options: this.props.options,
        path: [a + this.props.pageSize * this.props.currentPage],
        scrollWidth: this.props.scrollWidth,
        treeDataMaxLevel: this.props.treeDataMaxLevel
      })
    );
  }
  renderAddRow() {
    return (
      this.props.showAddRow &&
      s.createElement(this.props.components.EditRow, {
        columns: this.props.columns.filter((t) => !t.hidden),
        components: this.props.components,
        data: this.props.initialFormData,
        detailPanel: this.props.detailPanel,
        errorState: this.props.errorState,
        getFieldValue: this.props.getFieldValue,
        icons: this.props.icons,
        isTreeData: this.props.isTreeData,
        key: 'key-add-row',
        localization: e(
          e(
            e({}, r.defaultProps.localization.editRow),
            this.props.localization.editRow
          ),
          {
            dateTimePickerLocalization: this.props.localization
              .dateTimePickerLocalization
          }
        ),
        mode: 'add',
        onEditingApproved: this.props.onEditingApproved,
        onEditingCanceled: this.props.onEditingCanceled,
        options: this.props.options,
        scrollWidth: this.props.scrollWidth
      })
    );
  }
  render() {
    const t = this.props.renderData,
      n = this.props.columns
        .filter((i) => i.tableData.groupOrder > -1)
        .sort((i, l) => i.tableData.groupOrder - l.tableData.groupOrder);
    let p = 0;
    this.props.options.paging && (p = this.props.pageSize - t.length);
    const a = this.props.columns.filter((i) => !i.hidden);
    return s.createElement(
      c,
      null,
      this.props.options.filtering &&
        s.createElement(this.props.components.FilterRow, {
          columns: a,
          icons: this.props.icons,
          hasActions:
            this.props.actions.filter(
              (i) => i.position === 'row' || typeof i == 'function'
            ).length > 0,
          actionsColumnIndex: this.props.options.actionsColumnIndex,
          onFilterChanged: this.props.onFilterChanged,
          selection: this.props.options.selection,
          localization: e(
            e(
              e({}, r.defaultProps.localization.filterRow),
              this.props.localization.filterRow
            ),
            {
              dateTimePickerLocalization: this.props.localization
                .dateTimePickerLocalization
            }
          ),
          hasDetailPanel: !!this.props.detailPanel,
          detailPanelColumnAlignment: this.props.options
            .detailPanelColumnAlignment,
          isTreeData: this.props.isTreeData,
          filterCellStyle: this.props.options.filterCellStyle,
          filterRowStyle: this.props.options.filterRowStyle,
          hideFilterIcons: this.props.options.hideFilterIcons,
          scrollWidth: this.props.scrollWidth
        }),
      this.props.options.addRowPosition === 'first' && this.renderAddRow(),
      n.length > 0 ? this.renderGroupedRows(n, t) : this.renderUngroupedRows(t),
      this.props.options.addRowPosition === 'last' && this.renderAddRow(),
      s.createElement(this.props.components.SummaryRow, {
        currentData: t,
        columns: a,
        data: this.props.data,
        renderSummaryRow: this.props.renderSummaryRow,
        rowProps: this.props
      }),
      this.renderEmpty(p, t)
    );
  }
}
(r.defaultProps = {
  actions: [],
  currentPage: 0,
  data: [],
  localization: {
    editRow: {},
    emptyDataSourceMessage: 'No records to display',
    filterRow: {}
  },
  pageSize: 5,
  renderData: [],
  selection: !1
}),
  (r.propTypes = {
    actions: o.array,
    bulkEditChangedRows: o.object,
    bulkEditOpen: o.bool,
    cellEditable: o.object,
    columns: o.array.isRequired,
    components: o.object.isRequired,
    currentPage: o.number,
    data: o.array,
    detailPanel: o.oneOfType([
      o.func,
      o.arrayOf(o.oneOfType([o.object, o.func]))
    ]),
    errorState: o.oneOfType([o.object, o.bool]),
    getFieldValue: o.func.isRequired,
    hasAnyEditingRow: o.bool,
    hasDetailPanel: o.bool.isRequired,
    icons: o.object.isRequired,
    initialFormData: o.object,
    isTreeData: o.bool.isRequired,
    localization: o.object,
    onBulkEditRowChanged: o.func,
    onCellEditFinished: o.func,
    onCellEditStarted: o.func,
    onEditingApproved: o.func,
    onEditingCanceled: o.func,
    onFilterChanged: o.func,
    onGroupExpandChanged: o.func,
    onRowClick: o.func,
    onRowSelected: o.func,
    onToggleDetailPanel: o.func.isRequired,
    onTreeExpandChanged: o.func.isRequired,
    options: o.object.isRequired,
    pageSize: o.number,
    renderData: o.array,
    renderSummaryRow: o.func,
    scrollWidth: o.number.isRequired,
    selection: o.bool.isRequired,
    showAddRow: o.bool,
    treeDataMaxLevel: o.number
  });
export default r;
