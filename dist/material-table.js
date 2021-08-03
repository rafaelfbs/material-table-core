var w = Object.defineProperty;
var o = Object.assign;
var r = (g, t, e) => (
  typeof t != 'symbol' && (t += ''),
  t in g
    ? w(g, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (g[t] = e)
);
import f from '@material-ui/core/Table';
import D from '@material-ui/core/TableFooter';
import y from '@material-ui/core/TableRow';
import R from '@material-ui/core/LinearProgress';
import M from 'react-double-scrollbar';
import * as s from 'react';
import {
  MTablePagination as P,
  MTableSteppedPagination as E
} from './components';
import { DragDropContext as x, Droppable as v } from 'react-beautiful-dnd';
import k from './utils/data-manager';
import { debounce as m } from 'debounce';
import u from 'fast-deep-equal/react';
import { withStyles as F } from '@material-ui/core';
import * as C from './utils/common-values';
export default class d extends s.Component {
  constructor(t) {
    super(t);
    r(this, 'dataManager', new k());
    r(this, 'checkedForFunctions', !1);
    r(this, 'isRemoteData', (t) => !Array.isArray((t || this.props).data));
    r(
      this,
      'isOutsidePageNumbers',
      (t) => t.page !== void 0 && t.totalCount !== void 0
    );
    r(this, 'onAllSelected', (t) => {
      this.dataManager.changeAllSelected(t, this.props.options.selectionProps),
        this.setState(this.dataManager.getRenderState(), () =>
          this.onSelectionChange()
        );
    });
    r(this, 'onChangeColumnHidden', (t, e) => {
      this.dataManager.changeColumnHidden(t, e),
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onChangeColumnHidden &&
            this.props.onChangeColumnHidden(t, e);
        });
    });
    r(this, 'onChangeGroupOrder', (t) => {
      this.dataManager.changeGroupOrder(t.tableData.id),
        this.setState(this.dataManager.getRenderState());
    });
    r(this, 'onChangeOrder', (t, e) => {
      const a = e === '' ? -1 : t;
      if ((this.dataManager.changeOrder(a, e), this.isRemoteData())) {
        const n = o({}, this.state.query);
        (n.page = 0),
          (n.orderBy = this.state.columns.find((i) => i.tableData.id === a)),
          (n.orderDirection = e),
          this.onQueryChange(n, () => {
            this.props.onOrderChange && this.props.onOrderChange(a, e);
          });
      } else
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onOrderChange && this.props.onOrderChange(a, e);
        });
    });
    r(this, 'onPageChange', (t, e) => {
      if (this.isRemoteData()) {
        const a = o({}, this.state.query);
        (a.page = e),
          this.onQueryChange(a, () => {
            this.props.onPageChange && this.props.onPageChange(e, a.pageSize);
          });
      } else
        this.isOutsidePageNumbers(this.props) ||
          this.dataManager.changeCurrentPage(e),
          this.setState(this.dataManager.getRenderState(), () => {
            this.props.onPageChange &&
              this.props.onPageChange(e, this.state.pageSize);
          });
    });
    r(this, 'onRowsPerPageChange', (t) => {
      const e = t.target.value;
      if (
        (this.dataManager.changePageSize(e),
        this.props.onPageChange && this.props.onPageChange(0, e),
        this.isRemoteData())
      ) {
        const a = o({}, this.state.query);
        (a.pageSize = t.target.value),
          (a.page = 0),
          this.onQueryChange(a, () => {
            this.props.onRowsPerPageChange && this.props.onRowsPerPageChange(e);
          });
      } else
        this.dataManager.changeCurrentPage(0),
          this.setState(this.dataManager.getRenderState(), () => {
            this.props.onRowsPerPageChange && this.props.onRowsPerPageChange(e);
          });
    });
    r(this, 'onDragEnd', (t) => {
      !t ||
        !t.source ||
        !t.destination ||
        (this.dataManager.changeByDrag(t),
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onColumnDragged &&
            t.destination.droppableId === 'headers' &&
            t.source.droppableId === 'headers' &&
            this.props.onColumnDragged(t.source.index, t.destination.index);
        }));
    });
    r(this, 'onGroupExpandChanged', (t) => {
      this.dataManager.changeGroupExpand(t),
        this.setState(this.dataManager.getRenderState());
    });
    r(this, 'onGroupRemoved', (t, e) => {
      const a = {
        combine: null,
        destination: { droppableId: 'headers', index: 0 },
        draggableId: t.tableData.id,
        mode: 'FLUID',
        reason: 'DROP',
        source: { index: e, droppableId: 'groups' },
        type: 'DEFAULT'
      };
      this.dataManager.changeByDrag(a),
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onGroupRemoved && this.props.onGroupRemoved(t, e);
        });
    });
    r(this, 'onEditingApproved', (t, e, a) => {
      t === 'add' && this.props.editable && this.props.editable.onRowAdd
        ? this.setState({ isLoading: !0 }, () => {
            this.props.editable
              .onRowAdd(e)
              .then((n) => {
                this.setState({ isLoading: !1, showAddRow: !1 }, () => {
                  this.isRemoteData() && this.onQueryChange(this.state.query);
                });
              })
              .catch((n) => {
                const i = { message: n, errorCause: 'add' };
                this.setState({ isLoading: !1, errorState: i });
              });
          })
        : t === 'update' &&
          this.props.editable &&
          this.props.editable.onRowUpdate
        ? this.setState({ isLoading: !0 }, () => {
            this.props.editable
              .onRowUpdate(e, a)
              .then((n) => {
                this.dataManager.changeRowEditing(a),
                  this.setState(
                    o({ isLoading: !1 }, this.dataManager.getRenderState()),
                    () => {
                      this.isRemoteData() &&
                        this.onQueryChange(this.state.query);
                    }
                  );
              })
              .catch((n) => {
                const i = { message: n, errorCause: 'update' };
                this.setState({ isLoading: !1, errorState: i });
              });
          })
        : t === 'delete' &&
          this.props.editable &&
          this.props.editable.onRowDelete
        ? this.setState({ isLoading: !0 }, () => {
            this.props.editable
              .onRowDelete(a)
              .then((n) => {
                this.dataManager.changeRowEditing(a),
                  this.setState(
                    o({ isLoading: !1 }, this.dataManager.getRenderState()),
                    () => {
                      this.isRemoteData() &&
                        this.onQueryChange(this.state.query);
                    }
                  );
              })
              .catch((n) => {
                const i = { message: n, errorCause: 'delete' };
                this.setState({ isLoading: !1, errorState: i });
              });
          })
        : t === 'bulk' &&
          this.props.editable &&
          this.props.editable.onBulkUpdate &&
          this.setState({ isLoading: !0 }, () => {
            this.props.editable
              .onBulkUpdate(this.dataManager.bulkEditChangedRows)
              .then((n) => {
                this.dataManager.changeBulkEditOpen(!1),
                  this.props.onBulkEditOpen && this.props.onBulkEditOpen(!1),
                  this.dataManager.clearBulkEditChangedRows(),
                  this.setState(
                    o({ isLoading: !1 }, this.dataManager.getRenderState()),
                    () => {
                      this.isRemoteData() &&
                        this.onQueryChange(this.state.query);
                    }
                  );
              })
              .catch((n) => {
                const i = { message: n, errorCause: 'bulk edit' };
                this.setState({ isLoading: !1, errorState: i });
              });
          });
    });
    r(this, 'onEditingCanceled', (t, e) => {
      t === 'add'
        ? (this.props.editable.onRowAddCancelled &&
            this.props.editable.onRowAddCancelled(),
          this.setState({ showAddRow: !1 }))
        : t === 'update'
        ? (this.props.editable.onRowUpdateCancelled &&
            this.props.editable.onRowUpdateCancelled(),
          this.dataManager.changeRowEditing(e),
          this.setState(this.dataManager.getRenderState()))
        : t === 'delete' &&
          (this.dataManager.changeRowEditing(e),
          this.setState(this.dataManager.getRenderState()));
    });
    r(this, 'retry', () => {
      this.onQueryChange(this.state.query);
    });
    r(this, 'onQueryChange', (t, e) => {
      (t = o(o(o({}, this.state.query), t), { error: this.state.errorState })),
        this.setState({ isLoading: !0, errorState: void 0 }, () => {
          this.props
            .data(t)
            .then((a) => {
              (t.totalCount = a.totalCount),
                (t.page = a.page),
                this.dataManager.setData(a.data),
                this.setState(
                  o(
                    o(
                      { isLoading: !1, errorState: !1 },
                      this.dataManager.getRenderState()
                    ),
                    { query: t }
                  ),
                  () => {
                    e && e();
                  }
                );
            })
            .catch((a) => {
              const n = o(
                  o({}, d.defaultProps.localization),
                  this.props.localization
                ),
                i = {
                  message:
                    typeof a == 'object'
                      ? a.message
                      : a !== void 0
                      ? a
                      : n.error,
                  errorCause: 'query'
                };
              this.setState(
                o(
                  { isLoading: !1, errorState: i },
                  this.dataManager.getRenderState()
                )
              );
            });
        });
    });
    r(this, 'onRowSelected', (t, e, a) => {
      this.dataManager.changeRowSelected(t.target.checked, e),
        this.setState(this.dataManager.getRenderState(), () =>
          this.onSelectionChange(a)
        );
    });
    r(this, 'onSelectionChange', (t) => {
      if (this.props.onSelectionChange) {
        const e = [];
        ((n) => {
          n.forEach((i) => {
            i.tableData.checked && e.push(i);
          });
        })(this.state.originalData),
          this.props.onSelectionChange(e, t);
      }
    });
    r(
      this,
      'onSearchChangeDebounce',
      m((t) => {
        if (this.isRemoteData()) {
          const e = o({}, this.state.query);
          (e.page = 0), (e.search = t), this.onQueryChange(e);
        } else
          this.setState(this.dataManager.getRenderState(), () => {
            this.props.onSearchChange && this.props.onSearchChange(t);
          });
      }, this.props.options.debounceInterval)
    );
    r(this, 'onFilterChange', (t, e) => {
      this.dataManager.changeFilterValue(t, e),
        this.setState({}, this.onFilterChangeDebounce);
    });
    r(
      this,
      'onFilterChangeDebounce',
      m(() => {
        if (this.isRemoteData()) {
          const t = o({}, this.state.query);
          (t.page = 0),
            (t.filters = this.state.columns
              .filter((e) => e.tableData.filterValue)
              .map((e) => ({
                column: e,
                operator: '=',
                value: e.tableData.filterValue
              }))),
            this.onQueryChange(t);
        } else
          this.setState(this.dataManager.getRenderState(), () => {
            if (this.props.onFilterChange) {
              const t = this.state.columns
                .filter((e) => e.tableData.filterValue)
                .map((e) => ({
                  column: e,
                  operator: '=',
                  value: e.tableData.filterValue
                }));
              this.props.onFilterChange(t);
            }
          });
      }, this.props.options.debounceInterval)
    );
    r(this, 'onTreeExpandChanged', (t, e) => {
      this.dataManager.changeTreeExpand(t),
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onTreeExpandChange &&
            this.props.onTreeExpandChange(e, e.tableData.isTreeExpanded);
        });
    });
    r(this, 'onToggleDetailPanel', (t, e) => {
      this.dataManager.changeDetailPanelVisibility(t, e),
        this.setState(this.dataManager.getRenderState());
    });
    r(this, 'onCellEditStarted', (t, e) => {
      this.dataManager.startCellEditable(t, e),
        this.setState(this.dataManager.getRenderState());
    });
    r(this, 'onCellEditFinished', (t, e) => {
      this.dataManager.finishCellEditable(t, e),
        this.setState(this.dataManager.getRenderState());
    });
    r(this, 'onEditRowDataChanged', (t, e) => {
      this.dataManager.setEditRowData(t, e),
        this.setState(this.dataManager.getRenderState());
    });
    r(this, 'onColumnResized', (t, e) => {
      this.dataManager.onColumnResized(t, e),
        this.setState(this.dataManager.getRenderState());
    });
    r(this, 'renderTable', (t) =>
      s.createElement(
        f,
        {
          style: {
            tableLayout:
              t.options.fixedColumns &&
              (t.options.fixedColumns.left || t.options.fixedColumns.right)
                ? 'fixed'
                : t.options.tableLayout
          }
        },
        t.options.header &&
          s.createElement(t.components.Header, {
            actions: t.actions,
            localization: o(
              o({}, d.defaultProps.localization.header),
              this.props.localization.header
            ),
            columns: this.state.columns,
            hasSelection: t.options.selection,
            headerStyle: t.options.headerStyle,
            icons: t.icons,
            selectedCount: this.state.selectedCount,
            dataCount: t.parentChildData
              ? this.state.treefiedDataLength
              : this.state.columns.filter((e) => e.tableData.groupOrder > -1)
                  .length > 0
              ? this.state.groupedDataLength
              : this.state.data.length,
            hasDetailPanel: !!t.detailPanel,
            detailPanelColumnAlignment: t.options.detailPanelColumnAlignment,
            showActionsColumn:
              !this.dataManager.bulkEditOpen &&
              t.actions &&
              t.actions.filter(
                (e) => e.position === 'row' || typeof e == 'function'
              ).length > 0,
            showSelectAllCheckbox: t.options.showSelectAllCheckbox,
            orderBy: this.state.orderBy,
            orderDirection: this.state.orderDirection,
            onAllSelected: this.onAllSelected,
            onOrderChange: this.onChangeOrder,
            actionsHeaderIndex: t.options.actionsColumnIndex,
            sorting: t.options.sorting,
            keepSortDirectionOnColumnSwitch:
              t.options.keepSortDirectionOnColumnSwitch,
            grouping: t.options.grouping,
            isTreeData: this.props.parentChildData !== void 0,
            draggable: t.options.draggable,
            thirdSortClick: t.options.thirdSortClick,
            treeDataMaxLevel: this.state.treeDataMaxLevel,
            options: t.options,
            onColumnResized: this.onColumnResized,
            scrollWidth: this.state.width
          }),
        s.createElement(t.components.Body, {
          actions: t.actions,
          components: t.components,
          icons: t.icons,
          renderData: this.state.renderData,
          data: this.state.data,
          renderSummaryRow: this.props.renderSummaryRow,
          currentPage: this.state.currentPage,
          initialFormData: t.initialFormData,
          pageSize: this.state.pageSize,
          columns: this.state.columns,
          errorState: this.state.errorState,
          detailPanel: t.detailPanel,
          options: t.options,
          getFieldValue: this.dataManager.getFieldValue,
          isTreeData: this.props.parentChildData !== void 0,
          onFilterChanged: this.onFilterChange,
          onRowSelected: this.onRowSelected,
          onToggleDetailPanel: this.onToggleDetailPanel,
          onGroupExpandChanged: this.onGroupExpandChanged,
          onTreeExpandChanged: this.onTreeExpandChanged,
          onEditingCanceled: this.onEditingCanceled,
          onEditingApproved: this.onEditingApproved,
          localization: o(
            o({}, d.defaultProps.localization.body),
            this.props.localization.body
          ),
          onRowClick: this.props.onRowClick,
          onDoubleRowClick: this.props.onDoubleRowClick,
          showAddRow: this.state.showAddRow,
          hasAnyEditingRow: !!(
            this.state.lastEditingRow || this.state.showAddRow
          ),
          hasDetailPanel: !!t.detailPanel,
          treeDataMaxLevel: this.state.treeDataMaxLevel,
          cellEditable: t.cellEditable,
          onCellEditStarted: this.onCellEditStarted,
          onCellEditFinished: this.onCellEditFinished,
          bulkEditOpen: this.dataManager.bulkEditOpen,
          bulkEditChangedRows: this.dataManager.bulkEditChangedRows,
          onBulkEditRowChanged: this.dataManager.onBulkEditRowChanged,
          scrollWidth: this.state.width
        })
      )
    );
    r(this, 'getColumnsWidth', (t, e) => {
      const a = [],
        n = C.actionsColumnWidth(t);
      if (
        (n > 0 &&
          ((e > 0 &&
            t.options.actionsColumnIndex >= 0 &&
            t.options.actionsColumnIndex < e) ||
            (e < 0 &&
              t.options.actionsColumnIndex < 0 &&
              t.options.actionsColumnIndex >= e)) &&
          a.push(n + 'px'),
        t.options.selection && e > 0)
      ) {
        const i = C.selectionMaxWidth(t, this.state.treeDataMaxLevel);
        a.push(i + 'px');
      }
      for (let i = 0; i < Math.abs(e) && i < t.columns.length; i++) {
        const l = t.columns[e >= 0 ? i : t.columns.length - 1 - i];
        l.tableData &&
          (typeof l.tableData.width == 'number'
            ? a.push(l.tableData.width + 'px')
            : a.push(l.tableData.width));
      }
      return 'calc(' + a.join(' + ') + ')';
    });
    const e = this.getProps(t);
    this.setDataManagerFields(e, !0);
    const a = this.dataManager.getRenderState();
    (this.state = o(o({ data: [], errorState: void 0 }, a), {
      query: {
        filters: a.columns
          .filter((n) => n.tableData.filterValue)
          .map((n) => ({
            column: n,
            operator: '=',
            value: n.tableData.filterValue
          })),
        orderBy: a.columns.find((n) => n.tableData.id === a.orderBy),
        orderDirection: a.orderDirection,
        page: 0,
        pageSize: e.options.pageSize,
        search: a.searchText,
        totalCount: 0
      },
      showAddRow: !1,
      bulkEditOpen: !1,
      width: 0
    })),
      (this.tableContainerDiv = s.createRef());
  }
  componentDidMount() {
    this.setState(
      o(o({}, this.dataManager.getRenderState()), {
        width: this.tableContainerDiv.current.scrollWidth
      }),
      () => {
        this.isRemoteData() && this.onQueryChange(this.state.query);
      }
    );
  }
  setDataManagerFields(t, e, a) {
    let n = -1,
      i = '';
    t &&
      t.options.sorting !== !1 &&
      ((n = t.columns.findIndex((h) => h.defaultSort && h.sorting !== !1)),
      (i = n > -1 ? t.columns[n].defaultSort : '')),
      this.dataManager.setColumns(t.columns, a),
      this.dataManager.setDefaultExpanded(t.options.defaultExpanded),
      this.dataManager.changeRowEditing(),
      this.isRemoteData(t)
        ? (this.dataManager.changeApplySearch(!1),
          this.dataManager.changeApplyFilters(!1),
          this.dataManager.changeApplySort(!1))
        : (this.dataManager.changeApplySearch(!0),
          this.dataManager.changeApplyFilters(!0),
          this.dataManager.changeApplySort(!0),
          this.dataManager.setData(t.data)),
      (e ||
        (n !== this.dataManager.orderBy && !this.isRemoteData() && i
          ? i !== this.dataManager.orderDirection
          : !1)) &&
        this.dataManager.changeOrder(n, i),
      e && this.dataManager.changeSearchText(t.options.searchText || ''),
      e &&
        this.dataManager.changeCurrentPage(
          t.options.initialPage ? t.options.initialPage : 0
        ),
      e && this.dataManager.changePageSize(t.options.pageSize),
      this.dataManager.changePaging(t.options.paging),
      e && this.dataManager.changeParentFunc(t.parentChildData),
      this.dataManager.changeDetailPanelType(t.options.detailPanelType);
  }
  cleanColumns(t) {
    return t.map((e) => {
      const a = o({}, e);
      return delete a.tableData, a;
    });
  }
  componentDidUpdate(t) {
    const e = this.cleanColumns(t.columns),
      a = this.cleanColumns(this.props.columns);
    let n = !u(e, a);
    if (
      ((n = n || !u(t.options, this.props.options)),
      this.isRemoteData() || (n = n || !u(t.data, this.props.data)),
      n)
    ) {
      const S = this.getProps(this.props);
      if (
        (this.setDataManagerFields(S, !1, this.props.columns),
        this.setState(this.dataManager.getRenderState()),
        process.env.NODE_ENV === 'development' &&
          !this.checkedForFunctions &&
          t.columns.length !== 0 &&
          a.some((p) => Object.values(p).some((c) => typeof c == 'function')) &&
          e.some((p) => Object.values(p).some((c) => typeof c == 'function')))
      ) {
        this.checkedForFunctions = !0;
        const p = b(a),
          c = b(e);
        u(p, c) &&
          console.warn(
            'The columns provided to material table are static, but contain functions which update on every render, resetting the table state. Provide a stable function or column reference or an row id to prevent state loss.'
          );
      }
    }
    const i = this.isRemoteData()
        ? this.state.query.totalCount
        : this.state.data.length,
      l = this.isRemoteData() ? this.state.query.page : this.state.currentPage,
      h = this.isRemoteData() ? this.state.query.pageSize : this.state.pageSize;
    i <= h * l &&
      l !== 0 &&
      this.onPageChange(null, Math.max(0, Math.ceil(i / h) - 1));
  }
  getProps(t, e) {
    const a = o({}, t || this.props);
    (a.components = o(o({}, d.defaultProps.components), a.components)),
      (a.icons = o(o({}, d.defaultProps.icons), a.icons)),
      (a.options = o(o({}, d.defaultProps.options), a.options));
    const n = o(o({}, d.defaultProps.localization.body), a.localization.body);
    return (
      (a.actions = [...(a.actions || [])]),
      a.options.selection
        ? (a.actions = a.actions
            .filter((i) => i)
            .map((i) =>
              i.position === 'auto' ||
              i.isFreeAction === !1 ||
              (i.position === void 0 && i.isFreeAction === void 0)
                ? typeof i == 'function'
                  ? { action: i, position: 'toolbarOnSelect' }
                  : o(o({}, i), { position: 'toolbarOnSelect' })
                : i.isFreeAction
                ? typeof i == 'function'
                  ? { action: i, position: 'toolbar' }
                  : o(o({}, i), { position: 'toolbar' })
                : i
            ))
        : (a.actions = a.actions
            .filter((i) => i)
            .map((i) =>
              i.position === 'auto' ||
              i.isFreeAction === !1 ||
              (i.position === void 0 && i.isFreeAction === void 0)
                ? typeof i == 'function'
                  ? { action: i, position: 'row' }
                  : o(o({}, i), { position: 'row' })
                : i.isFreeAction
                ? typeof i == 'function'
                  ? { action: i, position: 'toolbar' }
                  : o(o({}, i), { position: 'toolbar' })
                : i
            )),
      a.editable &&
        (a.editable.onRowAdd &&
          a.actions.push({
            icon: a.icons.Add,
            tooltip: n.addTooltip,
            position: 'toolbar',
            disabled: !!this.dataManager.lastEditingRow,
            onClick: () => {
              this.dataManager.changeRowEditing(),
                this.setState(
                  o(o({}, this.dataManager.getRenderState()), {
                    showAddRow: !this.state.showAddRow
                  })
                );
            }
          }),
        a.editable.onRowUpdate &&
          a.actions.push((i) => ({
            icon: a.icons.Edit,
            tooltip: a.editable.editTooltip
              ? a.editable.editTooltip(i)
              : n.editTooltip,
            disabled: a.editable.isEditable && !a.editable.isEditable(i),
            hidden: a.editable.isEditHidden && a.editable.isEditHidden(i),
            onClick: (l, h) => {
              this.dataManager.changeRowEditing(h, 'update'),
                this.setState(
                  o(o({}, this.dataManager.getRenderState()), {
                    showAddRow: !1
                  })
                );
            }
          })),
        a.editable.onRowDelete &&
          a.actions.push((i) => ({
            icon: a.icons.Delete,
            tooltip: a.editable.deleteTooltip
              ? a.editable.deleteTooltip(i)
              : n.deleteTooltip,
            disabled: a.editable.isDeletable && !a.editable.isDeletable(i),
            hidden: a.editable.isDeleteHidden && a.editable.isDeleteHidden(i),
            onClick: (l, h) => {
              this.dataManager.changeRowEditing(h, 'delete'),
                this.setState(
                  o(o({}, this.dataManager.getRenderState()), {
                    showAddRow: !1
                  })
                );
            }
          })),
        a.editable.onBulkUpdate &&
          (a.actions.push({
            icon: a.icons.Edit,
            tooltip: n.bulkEditTooltip,
            position: 'toolbar',
            hidden: this.dataManager.bulkEditOpen,
            onClick: () => {
              this.dataManager.changeBulkEditOpen(!0),
                this.props.onBulkEditOpen && this.props.onBulkEditOpen(!0),
                this.setState(this.dataManager.getRenderState());
            }
          }),
          a.actions.push({
            icon: a.icons.Check,
            tooltip: n.bulkEditApprove,
            position: 'toolbar',
            hidden: !this.dataManager.bulkEditOpen,
            onClick: () => this.onEditingApproved('bulk')
          }),
          a.actions.push({
            icon: a.icons.Clear,
            tooltip: n.bulkEditCancel,
            position: 'toolbar',
            hidden: !this.dataManager.bulkEditOpen,
            onClick: () => {
              this.dataManager.changeBulkEditOpen(!1),
                this.props.onBulkEditOpen && this.props.onBulkEditOpen(!1),
                this.dataManager.clearBulkEditChangedRows(),
                this.setState(this.dataManager.getRenderState());
            }
          }))),
      a
    );
  }
  renderFooter() {
    const t = this.getProps();
    if (t.options.paging) {
      const e = o(
          o({}, d.defaultProps.localization.pagination),
          this.props.localization.pagination
        ),
        a = this.isOutsidePageNumbers(t),
        n = a
          ? Math.min(t.page, Math.floor(t.totalCount / this.state.pageSize))
          : this.state.currentPage,
        i = a ? t.totalCount : this.state.data.length;
      return s.createElement(
        f,
        null,
        s.createElement(
          D,
          { style: { display: 'grid' } },
          s.createElement(
            y,
            null,
            s.createElement(t.components.Pagination, {
              classes: {
                root: t.classes.paginationRoot,
                toolbar: t.classes.paginationToolbar,
                caption: t.classes.paginationCaption,
                selectRoot: t.classes.paginationSelectRoot
              },
              style: {
                float: t.theme.direction === 'rtl' ? '' : 'right',
                overflowX: 'auto'
              },
              colSpan: 3,
              count: this.isRemoteData() ? this.state.query.totalCount : i,
              icons: t.icons,
              rowsPerPage: this.state.pageSize,
              rowsPerPageOptions: t.options.pageSizeOptions,
              SelectProps: {
                renderValue: (l) =>
                  s.createElement(
                    'div',
                    { style: { padding: '0px 5px' } },
                    l + ' ' + e.labelRowsSelect + ' '
                  )
              },
              page: this.isRemoteData() ? this.state.query.page : n,
              onPageChange: this.onPageChange,
              onRowsPerPageChange: this.onRowsPerPageChange,
              ActionsComponent: (l) =>
                t.options.paginationType === 'normal'
                  ? s.createElement(
                      P,
                      o(o({}, l), {
                        icons: t.icons,
                        localization: e,
                        showFirstLastPageButtons:
                          t.options.showFirstLastPageButtons
                      })
                    )
                  : s.createElement(
                      E,
                      o(o({}, l), {
                        icons: t.icons,
                        localization: e,
                        showFirstLastPageButtons:
                          t.options.showFirstLastPageButtons
                      })
                    ),
              labelDisplayedRows: (l) =>
                e.labelDisplayedRows
                  .replace('{from}', l.from)
                  .replace('{to}', l.to)
                  .replace('{count}', l.count),
              labelRowsPerPage: e.labelRowsPerPage
            })
          )
        )
      );
    }
  }
  render() {
    const t = this.getProps();
    return s.createElement(
      x,
      { onDragEnd: this.onDragEnd, nonce: t.options.cspNonce },
      s.createElement(
        t.components.Container,
        { style: o({ position: 'relative' }, t.style) },
        t.options.paginationPosition === 'top' ||
          t.options.paginationPosition === 'both'
          ? this.renderFooter()
          : null,
        t.options.toolbar &&
          s.createElement(t.components.Toolbar, {
            actions: t.actions,
            components: t.components,
            selectedRows:
              this.state.selectedCount > 0
                ? this.state.originalData.filter((e) => e.tableData.checked)
                : [],
            columns: this.state.columns,
            columnsButton: t.options.columnsButton,
            icons: t.icons,
            exportAllData: t.options.exportAllData,
            exportMenu: t.options.exportMenu,
            getFieldValue: this.dataManager.getFieldValue,
            data: this.state.data,
            renderData: this.state.renderData,
            search: t.options.search,
            showTitle: t.options.showTitle,
            showTextRowsSelected: t.options.showTextRowsSelected,
            toolbarButtonAlignment: t.options.toolbarButtonAlignment,
            searchFieldAlignment: t.options.searchFieldAlignment,
            searchAutoFocus: t.options.searchAutoFocus,
            searchFieldStyle: t.options.searchFieldStyle,
            searchFieldVariant: t.options.searchFieldVariant,
            title: t.title,
            searchText: this.dataManager.searchText,
            onSearchChanged: this.onSearchChangeDebounce,
            dataManager: this.dataManager,
            onColumnsChanged: this.onChangeColumnHidden,
            localization: o(
              o({}, d.defaultProps.localization.toolbar),
              this.props.localization.toolbar
            )
          }),
        t.options.grouping &&
          s.createElement(t.components.Groupbar, {
            icons: t.icons,
            localization: o(
              o({}, d.defaultProps.localization.grouping),
              t.localization.grouping
            ),
            groupColumns: this.state.columns
              .filter((e) => e.tableData.groupOrder > -1)
              .sort((e, a) => e.tableData.groupOrder - a.tableData.groupOrder),
            onSortChanged: this.onChangeGroupOrder,
            onGroupRemoved: this.onGroupRemoved
          }),
        s.createElement(
          z,
          { double: t.options.doubleHorizontalScroll },
          s.createElement(
            v,
            { droppableId: 'headers', direction: 'horizontal' },
            (e, a) => {
              const n = this.renderTable(t);
              return s.createElement(
                'div',
                { ref: e.innerRef },
                s.createElement(
                  'div',
                  {
                    ref: this.tableContainerDiv,
                    style: {
                      maxHeight: t.options.maxBodyHeight,
                      minHeight: t.options.minBodyHeight,
                      overflowY: t.options.overflowY
                    }
                  },
                  this.state.width &&
                    t.options.fixedColumns &&
                    t.options.fixedColumns.right
                    ? s.createElement(
                        'div',
                        {
                          style: {
                            width: this.getColumnsWidth(
                              t,
                              -1 * t.options.fixedColumns.right
                            ),
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            boxShadow: '-2px 0px 15px rgba(125,147,178,.25)',
                            overflowX: 'clip',
                            zIndex: 11
                          }
                        },
                        s.createElement(
                          'div',
                          {
                            style: {
                              width: this.state.width,
                              background: 'white',
                              transform: `translateX(calc(${this.getColumnsWidth(
                                t,
                                -1 * t.options.fixedColumns.right
                              )} - 100%))`
                            }
                          },
                          n
                        )
                      )
                    : null,
                  s.createElement('div', null, n),
                  this.state.width &&
                    t.options.fixedColumns &&
                    t.options.fixedColumns.left
                    ? s.createElement(
                        'div',
                        {
                          style: {
                            width: this.getColumnsWidth(
                              t,
                              t.options.fixedColumns.left
                            ),
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            boxShadow: '2px 0px 15px rgba(125,147,178,.25)',
                            overflowX: 'hidden',
                            zIndex: 11
                          }
                        },
                        s.createElement(
                          'div',
                          {
                            style: {
                              width: this.state.width,
                              background: 'white'
                            },
                            onKeyDown: (i) => {
                              i.key === 'Tab' && i.preventDefault();
                            }
                          },
                          n
                        )
                      )
                    : null
                ),
                e.placeholder
              );
            }
          )
        ),
        (this.state.isLoading || t.isLoading) &&
          t.options.loadingType === 'linear' &&
          s.createElement(
            'div',
            { style: { position: 'relative', width: '100%' } },
            s.createElement(
              'div',
              {
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%'
                }
              },
              s.createElement(R, null)
            )
          ),
        t.options.paginationPosition === 'bottom' ||
          t.options.paginationPosition === 'both'
          ? this.renderFooter()
          : null,
        (this.state.isLoading || t.isLoading) &&
          t.options.loadingType === 'overlay' &&
          s.createElement(
            'div',
            {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 11
              }
            },
            s.createElement(t.components.OverlayLoading, { theme: t.theme })
          ),
        this.state.errorState &&
          this.state.errorState.errorCause === 'query' &&
          s.createElement(
            'div',
            {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 11
              }
            },
            s.createElement(t.components.OverlayError, {
              error: this.state.errorState,
              retry: this.retry,
              theme: t.theme,
              icon: t.icons.Retry
            })
          )
      )
    );
  }
}
const A = () => ({
    horizontalScrollContainer: {
      '& ::-webkit-scrollbar': { '-webkit-appearance': 'none' },
      '& ::-webkit-scrollbar:horizontal': { height: 8 },
      '& ::-webkit-scrollbar-thumb': {
        borderRadius: 4,
        border: '2px solid white',
        backgroundColor: 'rgba(0, 0, 0, .3)'
      }
    }
  }),
  z = F(A)(({ double: g, children: t, classes: e }) =>
    g
      ? s.createElement(M, null, t)
      : s.createElement(
          'div',
          {
            className: e.horizontalScrollContainer,
            style: { overflowX: 'auto', position: 'relative' }
          },
          t
        )
  );
function b(g) {
  return g.map((t) =>
    Object.entries(t).reduce(
      (e, [a, n]) => (typeof n != 'function' && (e[a] = n), e),
      {}
    )
  );
}
