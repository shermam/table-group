import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

export class Group {
  level = 0;
  parent: Group;
  expanded = false;
  totalCounts = 0;
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}

@Component({
  selector: "app-table-group",
  templateUrl: "./table-group.component.html",
  styleUrls: ["./table-group.component.scss"]
})
export class TableGroupComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data$;
  @Input() indentationSize: number = 20;

  _alldata: any[];
  groupByColumns: string[] = [];

  get displayedColumns(): string[] {
    return [
      "indentation",
      ...this.columns.filter(c => !this.groupByColumns.includes(c))
    ];
  }

  public dataSource = new MatTableDataSource<any | Group>([]);

  constructor() {}

  ngOnInit() {
    this.data$.subscribe(
      (data: any) => {
        this._alldata = data;
        this.dataSource.data = this.addGroups(
          this._alldata,
          this.groupByColumns
        );
        this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
        this.dataSource.filter = performance.now().toString();
      },
      (err: any) => console.log(err)
    );
  }

  getIndentation() {
    return this.indentationSize * this.groupByColumns.length + 1 + "px";
  }

  drop(event) {
    const column: string = event.dataTransfer.getData("column");
    this.groupBy(column);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev, col) {
    ev.dataTransfer.setData("column", col);
  }

  groupBy(column) {
    this.checkGroupByColumn(column, true);
    this.dataSource.data = this.addGroups(this._alldata, this.groupByColumns);
    this.dataSource.filter = performance.now().toString();
  }

  checkGroupByColumn(field, add) {
    let found = null;
    for (const column of this.groupByColumns) {
      if (column === field) {
        found = this.groupByColumns.indexOf(column, 0);
      }
    }
    if (found != null && found >= 0) {
      if (!add) {
        this.groupByColumns.splice(found, 1);
      }
    } else {
      if (add) {
        this.groupByColumns.push(field);
      }
    }
  }

  unGroupBy(column) {
    this.checkGroupByColumn(column, false);
    this.dataSource.data = this.addGroups(this._alldata, this.groupByColumns);
    this.dataSource.filter = performance.now().toString();
  }

  // below is for grid row grouping
  customFilterPredicate(data: any | Group, filter: string): boolean {
    return data instanceof Group ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: any): boolean {
    const groupRows = this.dataSource.data.filter(row => {
      if (!(row instanceof Group)) {
        return false;
      }
      let match = true;
      this.groupByColumns.forEach(column => {
        if (!row[column] || !data[column] || row[column] !== data[column]) {
          match = false;
        }
      });
      return match;
    });

    if (groupRows.length === 0) {
      return true;
    }
    const parent = groupRows[0] as Group;
    return parent.visible && parent.expanded;
  }

  groupHeaderClick(row) {
    row.expanded = !row.expanded;
    this.dataSource.filter = performance.now().toString(); // bug here need to fix
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(
    data: any[],
    level: number,
    groupByColumns: string[],
    parent: Group
  ): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map(row => {
        const result = new Group();
        result.level = level + 1;
        result.parent = parent;
        for (let i = 0; i <= level; i++) {
          result[groupByColumns[i]] = row[groupByColumns[i]];
        }
        return result;
      }),
      JSON.stringify
    );

    const currentColumn = groupByColumns[level];
    let subGroups = [];
    groups.forEach(group => {
      const rowsInGroup = data.filter(
        row => group[currentColumn] === row[currentColumn]
      );
      group.totalCounts = rowsInGroup.length;
      const subGroup = this.getSublevel(
        rowsInGroup,
        level + 1,
        groupByColumns,
        group
      );
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  uniqueBy(a, key) {
    const seen = {};
    return a.filter(item => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index, item): boolean {
    return item.level;
  }
}
