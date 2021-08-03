var b = Object.defineProperty;
var f = Object.assign;
var l = (p, e, a) => (
  typeof e != 'symbol' && (e += ''),
  e in p
    ? b(p, e, { enumerable: !0, configurable: !0, writable: !0, value: a })
    : (p[e] = a)
);
import c from 'date-fns/format';
import x from 'uuid';
import { byString as D } from './';
export default class y {
  constructor() {
    l(this, 'checkForId', !1);
    l(this, 'applyFilters', !1);
    l(this, 'applySearch', !1);
    l(this, 'applySort', !1);
    l(this, 'currentPage', 0);
    l(this, 'detailPanelType', 'multiple');
    l(this, 'lastDetailPanelRow');
    l(this, 'lastEditingRow');
    l(this, 'orderBy', -1);
    l(this, 'orderDirection', '');
    l(this, 'pageSize', 5);
    l(this, 'paging', !0);
    l(this, 'parentFunc', null);
    l(this, 'searchText', '');
    l(this, 'selectedCount', 0);
    l(this, 'treefiedDataLength', 0);
    l(this, 'treeDataMaxLevel', 0);
    l(this, 'groupedDataLength', 0);
    l(this, 'defaultExpanded', !1);
    l(this, 'bulkEditOpen', !1);
    l(this, 'bulkEditChangedRows', {});
    l(this, 'data', []);
    l(this, 'columns', []);
    l(this, 'filteredData', []);
    l(this, 'searchedData', []);
    l(this, 'groupedData', []);
    l(this, 'treefiedData', []);
    l(this, 'sortedData', []);
    l(this, 'pagedData', []);
    l(this, 'renderData', []);
    l(this, 'filtered', !1);
    l(this, 'searched', !1);
    l(this, 'grouped', !1);
    l(this, 'treefied', !1);
    l(this, 'sorted', !1);
    l(this, 'paged', !1);
    l(this, 'rootGroupsIndex', {});
    l(this, 'startCellEditable', (e, a) => {
      e.tableData.editCellList = [...(e.tableData.editCellList || []), a];
    });
    l(this, 'finishCellEditable', (e, a) => {
      if (e.tableData.editCellList) {
        const i = e.tableData.editCellList.findIndex(
          (s) => s.tableData.id === a.tableData.id
        );
        i !== -1 && e.tableData.editCellList.splice(i, 1);
      }
    });
    l(this, 'clearBulkEditChangedRows', () => {
      this.bulkEditChangedRows = {};
    });
    l(this, 'onBulkEditRowChanged', (e, a) => {
      this.bulkEditChangedRows[e.tableData.id] = { oldData: e, newData: a };
    });
    l(this, 'expandTreeForNodes', (e) => {
      e.forEach((a) => {
        let i = a;
        for (; this.parentFunc(i, this.data); ) {
          const s = this.parentFunc(i, this.data);
          s && (s.tableData.isTreeExpanded = !0), (i = s);
        }
      });
    });
    l(this, 'findDataByPath', (e, a) => {
      if (this.isDataType('tree'))
        return a.reduce(
          (s, t) =>
            s &&
            s.tableData &&
            s.tableData.childRows &&
            s.tableData.childRows[t],
          { tableData: { childRows: e } }
        );
      {
        const i = { groups: e };
        return a.reduce(
          (t, r) =>
            t.groups.length > 0 ? t.groups[r] : t.data ? t.data[r] : void 0,
          i
        );
      }
    });
    l(this, 'getFieldValue', (e, a, i = !0) => {
      let s = typeof e[a.field] != 'undefined' ? e[a.field] : D(e, a.field);
      return a.lookup && i && (s = a.lookup[s]), s;
    });
    l(
      this,
      'getRenderState',
      () => (
        this.filtered === !1 && this.filterData(),
        this.searched === !1 && this.searchData(),
        this.grouped === !1 && this.isDataType('group') && this.groupData(),
        this.treefied === !1 && this.isDataType('tree') && this.treefyData(),
        this.sorted === !1 && this.sortData(),
        this.paged === !1 && this.pageData(),
        {
          columns: this.columns,
          currentPage: this.currentPage,
          data: this.sortedData,
          lastEditingRow: this.lastEditingRow,
          orderBy: this.orderBy,
          orderDirection: this.orderDirection,
          originalData: this.data,
          pageSize: this.pageSize,
          renderData: this.pagedData,
          searchText: this.searchText,
          selectedCount: this.selectedCount,
          treefiedDataLength: this.treefiedDataLength,
          treeDataMaxLevel: this.treeDataMaxLevel,
          groupedDataLength: this.groupedDataLength
        }
      )
    );
    l(this, 'filterData', () => {
      (this.searched = this.grouped = this.treefied = this.sorted = this.paged = !1),
        (this.filteredData = [...this.data]),
        this.applyFilters &&
          this.columns
            .filter((e) => e.tableData.filterValue)
            .forEach((e) => {
              const { lookup: a, type: i, tableData: s } = e;
              e.customFilterAndSearch
                ? (this.filteredData = this.filteredData.filter(
                    (t) => !!e.customFilterAndSearch(s.filterValue, t, e)
                  ))
                : a
                ? (this.filteredData = this.filteredData.filter((t) => {
                    const r = this.getFieldValue(t, e, !1);
                    return (
                      !s.filterValue ||
                      s.filterValue.length === 0 ||
                      s.filterValue.indexOf(r != null && r.toString()) > -1
                    );
                  }))
                : i === 'numeric'
                ? (this.filteredData = this.filteredData.filter(
                    (t) => this.getFieldValue(t, e) + '' === s.filterValue
                  ))
                : i === 'boolean' && s.filterValue
                ? (this.filteredData = this.filteredData.filter((t) => {
                    const r = this.getFieldValue(t, e);
                    return (
                      (r && s.filterValue === 'checked') ||
                      (!r && s.filterValue === 'unchecked')
                    );
                  }))
                : ['date', 'datetime'].includes(i)
                ? (this.filteredData = this.filteredData.filter((t) => {
                    const r = this.getFieldValue(t, e),
                      d = r ? new Date(r) : null;
                    if (d && d.toString() !== 'Invalid Date') {
                      const n = s.filterValue;
                      let o = '',
                        u = '';
                      return (
                        i === 'date'
                          ? ((o = c(d, 'MM/dd/yyyy')), (u = c(n, 'MM/dd/yyyy')))
                          : i === 'datetime' &&
                            ((o = c(d, 'MM/dd/yyyy - HH:mm')),
                            (u = c(n, 'MM/dd/yyyy - HH:mm'))),
                        o === u
                      );
                    }
                    return !0;
                  }))
                : i === 'time'
                ? (this.filteredData = this.filteredData.filter((t) => {
                    const d = this.getFieldValue(t, e) || null;
                    if (d) {
                      const n = s.filterValue,
                        o = c(n, 'HH:mm');
                      return d === o;
                    }
                    return !0;
                  }))
                : (this.filteredData = this.filteredData.filter((t) => {
                    const r = this.getFieldValue(t, e);
                    return (
                      r &&
                      r
                        .toString()
                        .toUpperCase()
                        .includes(s.filterValue.toUpperCase())
                    );
                  }));
            }),
        (this.filtered = !0);
    });
    l(this, 'searchData', () => {
      if (
        ((this.grouped = this.treefied = this.sorted = this.paged = !1),
        (this.searchedData = [...this.filteredData]),
        this.searchText && this.applySearch)
      ) {
        const e = this.searchText.trim();
        this.searchedData = this.searchedData.filter((a) =>
          this.columns
            .filter((i) => (i.searchable === void 0 ? !i.hidden : i.searchable))
            .some((i) => {
              if (i.customFilterAndSearch)
                return !!i.customFilterAndSearch(e, a, i);
              if (i.field) {
                const s = this.getFieldValue(a, i);
                if (s)
                  return s.toString().toUpperCase().includes(e.toUpperCase());
              }
            })
        );
      }
      this.searched = !0;
    });
  }
  getTableData(e) {
    return e.tableData;
  }
  setTableData(e, a) {
    e.tableData = a;
  }
  setData(e) {
    this.selectedCount = 0;
    let a = {};
    this.data.length !== 0 &&
      this.data[0].id !== void 0 &&
      (a = this.data.reduce((i, s) => {
        const t = this.getTableData(s);
        return (i[t.id] = t), i;
      }, {})),
      process.env.NODE_ENV === 'development' &&
        !this.checkForId &&
        ((this.checkForId = !0),
        e.some((i) => i.id === void 0) &&
          console.warn(
            'The table requires all rows to have an unique id property. A row was provided without id in the rows prop. To prevent the loss of state between renders, please provide an unique id for each row.'
          )),
      (this.data = e.map((i, s) => {
        const t = a[i.id] || {},
          r = f(
            f({ id: i.id || s, uuid: i.uuid || x.v4() }, t),
            this.getTableData(i)
          );
        return r.checked && this.selectedCount++, this.setTableData(i, r), i;
      })),
      (this.filtered = !1);
  }
  setColumns(e, a = []) {
    let i = ['0px'];
    this.columns = e.map((t, r) => {
      const d = typeof t.width == 'number' ? t.width + 'px' : t.width;
      d && t.tableData && t.tableData.width !== void 0 && i.push(d);
      const n = a.find(({ id: u }) => u === r),
        o = f(
          f(
            f(
              {
                columnOrder: r,
                filterValue: t.defaultFilter,
                groupOrder: t.defaultGroupOrder,
                groupSort: t.defaultGroupSort || 'asc',
                width: d,
                initialWidth: d,
                additionalWidth: 0
              },
              n ? n.tableData : {}
            ),
            t.tableData
          ),
          { id: r }
        );
      return (t.tableData = o), t;
    });
    const s = this.columns.filter((t) =>
      t.hidden ||
      (t.columnDef && t.columnDef.tableData && t.columnDef.tableData.width)
        ? !1
        : t.width === void 0
    );
    (i = '(' + i.join(' + ') + ')'),
      s.forEach((t) => {
        t.tableData.width = t.tableData.initialWidth = `calc((100% - ${i}) / ${s.length})`;
      });
  }
  setDefaultExpanded(e) {
    this.defaultExpanded = e;
  }
  changeApplySearch(e) {
    (this.applySearch = e), (this.searched = !1);
  }
  changeApplyFilters(e) {
    (this.applyFilters = e), (this.filtered = !1);
  }
  changeApplySort(e) {
    (this.applySort = e), (this.sorted = !1);
  }
  changePaging(e) {
    (this.paging = e), (this.paged = !1);
  }
  changeCurrentPage(e) {
    (this.currentPage = e), (this.paged = !1);
  }
  changePageSize(e) {
    (this.pageSize = e), (this.paged = !1);
  }
  changeParentFunc(e) {
    this.parentFunc = e;
  }
  changeFilterValue(e, a) {
    (this.columns[e].tableData.filterValue = a), (this.filtered = !1);
  }
  changeRowSelected(e, a) {
    const i = this.findDataByPath(this.sortedData, a);
    (i.tableData.checked = e),
      (this.selectedCount = this.selectedCount + (e ? 1 : -1));
    const s = (t) => {
      t.tableData.childRows &&
        t.tableData.childRows.forEach((r) => {
          r.tableData.checked !== e &&
            ((r.tableData.checked = e),
            (this.selectedCount = this.selectedCount + (e ? 1 : -1))),
            s(r);
        });
    };
    s(i), (this.filtered = !1);
  }
  changeDetailPanelVisibility(e, a) {
    const i = this.findDataByPath(this.sortedData, e);
    (i.tableData.showDetailPanel || '').toString() === a.toString()
      ? (i.tableData.showDetailPanel = void 0)
      : (i.tableData.showDetailPanel = a),
      this.detailPanelType === 'single' &&
        this.lastDetailPanelRow &&
        this.lastDetailPanelRow != i &&
        (this.lastDetailPanelRow.tableData.showDetailPanel = void 0),
      (this.lastDetailPanelRow = i);
  }
  changeGroupExpand(e) {
    const a = this.findDataByPath(this.sortedData, e);
    a.isExpanded = !a.isExpanded;
  }
  changeSearchText(e) {
    (this.searchText = e), (this.searched = !1), (this.currentPage = 0);
  }
  changeRowEditing(e, a) {
    e
      ? ((e.tableData.editing = a),
        this.lastEditingRow &&
          this.lastEditingRow != e &&
          (this.lastEditingRow.tableData.editing = void 0),
        a ? (this.lastEditingRow = e) : (this.lastEditingRow = void 0))
      : this.lastEditingRow &&
        ((this.lastEditingRow.tableData.editing = void 0),
        (this.lastEditingRow = void 0));
  }
  changeBulkEditOpen(e) {
    this.bulkEditOpen = e;
  }
  changeAllSelected(e, a) {
    let i = 0;
    const s = (t) => {
      const r = a ? a(t) : { disabled: !1 };
      return t.tableData.disabled || r.disabled ? !1 : e;
    };
    if (this.isDataType('group')) {
      const t = (r) => {
        r.forEach((d) => {
          d.groups.length > 0
            ? t(d.groups)
            : d.data.forEach((n) => {
                (n.tableData.checked = s(n)), i++;
              });
        });
      };
      t(this.groupedData);
    } else
      this.searchedData.forEach((t) => {
        t.tableData.checked = s(t);
      }),
        (i = this.searchedData.length);
    this.selectedCount = e ? i : 0;
  }
  changeOrder(e, a) {
    (this.orderBy = e),
      (this.orderDirection = a),
      (this.currentPage = 0),
      (this.sorted = !1);
  }
  changeGroupOrder(e) {
    const a = this.columns.find((i) => i.tableData.id === e);
    a.tableData.groupSort === 'asc'
      ? (a.tableData.groupSort = 'desc')
      : (a.tableData.groupSort = 'asc'),
      (this.sorted = !1);
  }
  changeColumnHidden(e, a) {
    (e.hidden = a), this.setColumns(this.columns);
  }
  changeTreeExpand(e) {
    const a = this.findDataByPath(this.sortedData, e);
    a.tableData.isTreeExpanded = !a.tableData.isTreeExpanded;
  }
  changeDetailPanelType(e) {
    this.detailPanelType = e;
  }
  changeByDrag(e) {
    let a = 0,
      i = this.columns
        .filter((s) => s.tableData.groupOrder > -1)
        .sort((s, t) => s.tableData.groupOrder - t.tableData.groupOrder);
    if (
      e.destination.droppableId === 'groups' &&
      e.source.droppableId === 'groups'
    ) {
      a = Math.min(e.destination.index, e.source.index);
      const s = Math.max(e.destination.index, e.source.index);
      if (((i = i.slice(a, s + 1)), e.destination.index < e.source.index)) {
        const t = i.pop();
        i.unshift(t);
      } else {
        const t = i.shift();
        i.push(t);
      }
    } else if (
      e.destination.droppableId === 'groups' &&
      e.source.droppableId === 'headers'
    ) {
      const s = this.columns.find((t) => t.tableData.id == e.draggableId);
      if (s.grouping === !1 || !s.field) return;
      i.splice(e.destination.index, 0, s);
    } else if (
      e.destination.droppableId === 'headers' &&
      e.source.droppableId === 'groups'
    ) {
      const s = this.columns.find((t) => t.tableData.id == e.draggableId);
      (s.tableData.groupOrder = void 0), i.splice(e.source.index, 1);
    } else if (
      e.destination.droppableId === 'headers' &&
      e.source.droppableId === 'headers'
    ) {
      a = Math.min(e.destination.index, e.source.index);
      const s = Math.max(e.destination.index, e.source.index),
        t = this.columns
          .sort((h, g) => h.tableData.columnOrder - g.tableData.columnOrder)
          .filter((h) => h.tableData.groupOrder === void 0);
      let r = 0,
        d = 0;
      for (let h = 0; h < t.length && d <= a; h++) t[h].hidden ? r++ : d++;
      const n = a + r;
      let o = n;
      for (let h = 0; h < s - a && o < t.length; o++) t[o].hidden || h++;
      const u = t.slice(n, o + 1);
      if (e.destination.index < e.source.index) {
        const h = u.pop();
        u.unshift(h);
      } else {
        const h = u.shift();
        u.push(h);
      }
      for (let h = 0; h < u.length; h++) u[h].tableData.columnOrder = n + h;
      return;
    } else return;
    for (let s = 0; s < i.length; s++) i[s].tableData.groupOrder = a + s;
    this.sorted = this.grouped = !1;
  }
  onColumnResized(e, a) {
    const i = this.columns.find((t) => t.tableData.id === e);
    !i ||
      !this.columns.find((t) => t.tableData.id === e + 1) ||
      ((i.tableData.additionalWidth = a),
      (i.tableData.width = `calc(${i.tableData.initialWidth} + ${i.tableData.additionalWidth}px)`));
  }
  findGroupByGroupPath(e, a) {
    const i = { groups: e, groupsIndex: this.rootGroupsIndex };
    return a.reduce((t, r) => {
      if (!!t && t.groupsIndex[r] !== void 0) return t.groups[t.groupsIndex[r]];
    }, i);
  }
  isDataType(e) {
    let a = 'normal';
    return (
      this.parentFunc
        ? (a = 'tree')
        : this.columns.find((i) => i.tableData.groupOrder > -1) &&
          (a = 'group'),
      e === a
    );
  }
  sort(e, a, i) {
    if (i === 'numeric') return e - a;
    if (e !== a) {
      if (!e) return -1;
      if (!a) return 1;
    }
    return e < a ? -1 : e > a ? 1 : 0;
  }
  sortList(e) {
    let a = this.columns.find((s) => s.tableData.id === this.orderBy);
    a || (a = this.columns[0]);
    let i = e;
    return (
      a.customSort
        ? this.orderDirection === 'desc'
          ? (i = e.sort((s, t) => a.customSort(t, s, 'row', 'desc')))
          : (i = e.sort((s, t) => a.customSort(s, t, 'row')))
        : (i = e.sort(
            this.orderDirection === 'desc'
              ? (s, t) =>
                  this.sort(
                    this.getFieldValue(t, a),
                    this.getFieldValue(s, a),
                    a.type
                  )
              : (s, t) =>
                  this.sort(
                    this.getFieldValue(s, a),
                    this.getFieldValue(t, a),
                    a.type
                  )
          )),
      i
    );
  }
  groupData() {
    (this.sorted = this.paged = !1), (this.groupedDataLength = 0);
    const e = [...this.searchedData],
      a = this.columns
        .filter((s) => s.tableData.groupOrder > -1)
        .sort((s, t) => s.tableData.groupOrder - t.tableData.groupOrder),
      i = e.reduce(
        (s, t) => {
          let r = s;
          return (
            (r = a.reduce((d, n) => {
              const o = t[n.field] || D(t, n.field);
              let u;
              if (
                (d.groupsIndex[o] !== void 0 &&
                  (u = d.groups[d.groupsIndex[o]]),
                !u)
              ) {
                const h = [...(d.path || []), o],
                  g = this.findGroupByGroupPath(this.groupedData, h) || {
                    isExpanded:
                      typeof this.defaultExpanded == 'boolean'
                        ? this.defaultExpanded
                        : !1
                  };
                (u = {
                  value: o,
                  groups: [],
                  groupsIndex: {},
                  data: [],
                  isExpanded: g.isExpanded,
                  path: h
                }),
                  d.groups.push(u),
                  (d.groupsIndex[o] = d.groups.length - 1);
              }
              return u;
            }, r)),
            r.data.push(t),
            this.groupedDataLength++,
            s
          );
        },
        { groups: [], groupsIndex: {} }
      );
    (this.groupedData = i.groups),
      (this.grouped = !0),
      (this.rootGroupsIndex = i.groupsIndex);
  }
  treefyData() {
    (this.sorted = this.paged = !1),
      this.data.forEach((t) => (t.tableData.childRows = null)),
      (this.treefiedData = []),
      (this.treefiedDataLength = 0),
      (this.treeDataMaxLevel = 0),
      (this.searchText || this.columns.some((t) => t.tableData.filterValue)) &&
        (this.data.forEach((t) => {
          t.tableData.isTreeExpanded = !1;
        }),
        this.expandTreeForNodes(this.searchedData));
    const e = (t) => {
      t.tableData.markedForTreeRemove = !1;
      const r = this.parentFunc(t, this.data);
      r
        ? ((r.tableData.childRows = r.tableData.childRows || []),
          r.tableData.childRows.includes(t) ||
            (r.tableData.childRows.push(t), this.treefiedDataLength++),
          e(r),
          (t.tableData.path = [
            ...r.tableData.path,
            r.tableData.childRows.length - 1
          ]),
          (this.treeDataMaxLevel = Math.max(
            this.treeDataMaxLevel,
            t.tableData.path.length
          )))
        : this.treefiedData.includes(t) ||
          (this.treefiedData.push(t),
          this.treefiedDataLength++,
          (t.tableData.path = [this.treefiedData.length - 1]));
    };
    this.data.forEach((t) => {
      e(t);
    });
    const a = (t) => {
        let r = this.treefiedData;
        t.tableData.path.forEach((d) => {
          r.tableData && r.tableData.childRows && (r = r.tableData.childRows),
            (r = r[d]);
        }),
          (r.tableData.markedForTreeRemove = !0);
      },
      i = (t) => {
        t.tableData.childRows &&
          t.tableData.childRows.forEach((r) => {
            i(r);
          }),
          (t.tableData.markedForTreeRemove = !1);
      };
    this.data.forEach((t) => {
      if (
        !this.searchText &&
        !this.columns.some((d) => d.tableData.filterValue) &&
        t.tableData.isTreeExpanded === void 0
      ) {
        const d =
          typeof this.defaultExpanded == 'boolean'
            ? this.defaultExpanded
            : this.defaultExpanded(t);
        t.tableData.isTreeExpanded = d;
      }
      !t.tableData.isTreeExpanded && this.searchedData.indexOf(t) < 0 && a(t);
    }),
      this.data.forEach((t) => {
        this.searchedData.indexOf(t) > -1 && i(t);
      });
    const s = (t) => {
      for (let r = t.length - 1; r >= 0; r--) {
        const d = t[r];
        d.tableData.childRows && s(d.tableData.childRows),
          d.tableData.markedForTreeRemove && t.splice(r, 1);
      }
    };
    s(this.treefiedData), (this.treefied = !0);
  }
  sortData() {
    if (((this.paged = !1), this.isDataType('group'))) {
      this.sortedData = [...this.groupedData];
      const e = this.columns
          .filter((t) => t.tableData.groupOrder > -1)
          .sort((t, r) => t.tableData.groupOrder - r.tableData.groupOrder),
        a = (t, r) =>
          r.customSort
            ? t.sort(
                r.tableData.groupSort === 'desc'
                  ? (d, n) => r.customSort(n.value, d.value, 'group')
                  : (d, n) => r.customSort(d.value, n.value, 'group')
              )
            : t.sort(
                r.tableData.groupSort === 'desc'
                  ? (d, n) => this.sort(n.value, d.value, r.type)
                  : (d, n) => this.sort(d.value, n.value, r.type)
              );
      this.sortedData = a(this.sortedData, e[0]);
      const i = (t) =>
          t.reduce(
            (r, d) => (
              (r[d.value] = t.findIndex((n) => n.value === d.value)), r
            ),
            {}
          ),
        s = (t, r) => {
          t.forEach((d) => {
            if (d.groups.length > 0) {
              const n = e[r];
              (d.groups = a(d.groups, n)),
                (d.groupsIndex = i(d.groups)),
                s(d.groups, r + 1);
            } else
              this.orderBy >= 0 &&
                this.orderDirection &&
                (d.data = this.sortList(d.data));
          });
        };
      s(this.sortedData, 1);
    } else if (this.isDataType('tree')) {
      if (((this.sortedData = [...this.treefiedData]), this.orderBy != -1)) {
        this.sortedData = this.sortList(this.sortedData);
        const e = (a) => {
          a.forEach((i) => {
            i.tableData.childRows &&
              ((i.tableData.childRows = this.sortList(i.tableData.childRows)),
              e(i.tableData.childRows));
          });
        };
        e(this.sortedData);
      }
    } else
      this.isDataType('normal') &&
        ((this.sortedData = [...this.searchedData]),
        this.orderBy != -1 &&
          this.applySort &&
          (this.sortedData = this.sortList(this.sortedData)));
    this.sorted = !0;
  }
  pageData() {
    if (((this.pagedData = [...this.sortedData]), this.paging)) {
      const e = this.currentPage * this.pageSize,
        a = e + this.pageSize;
      this.pagedData = this.pagedData.slice(e, a);
    }
    this.paged = !0;
  }
}
