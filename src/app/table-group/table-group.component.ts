import { Component, Input } from "@angular/core";

export interface agregation {
  operation: string;
  property: string;
}

@Component({
  selector: "app-table-group",
  templateUrl: "./table-group.component.html",
  styleUrls: ["./table-group.component.scss"]
})
export class TableGroupComponent {
  @Input() columns: string[] = [];
  @Input() agragations: agregation[] = [];
  @Input() indentationSize: number = 20;
  @Input() allExpanded: boolean = true;
  @Input() groupByColumns: string[] = [];

  private _alldata: any[];
  private _grouppedData: any[];
  public dataSource = [];

  @Input()
  set data(value: any[]) {
    if (!value) return;
    this._alldata = value;
    this.updateGroup();
  }

  get displayedColumns(): string[] {
    return [
      "groupHeaderColumn",
      ...this.columns.filter(c => !this.groupByColumns.includes(c))
    ];
  }

  get groupColumns(): string[] {
    return [
      "groupHeader",
      ...this.columns.filter(c => !this.groupByColumns.includes(c))
    ];
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
    this.groupByColumns.push(column);
    this.updateGroup();
  }

  unGroupBy(column) {
    this.groupByColumns.splice(this.groupByColumns.indexOf(column), 1);
    this.updateGroup();
  }

  updateGroup() {
    this._grouppedData = convertToGrouppedData(
      this.groupByColumns,
      this._alldata,
      this.allExpanded,
      this.agragations
    );
    this.dataSource = this._grouppedData.filter(d => d.$$visible);
  }

  groupHeaderClick(group) {
    group.$$expanded = !group.$$expanded;
    let index = this._grouppedData.indexOf(group);
    let row = this._grouppedData[++index];
    const expansionTracking = [];
    expansionTracking[group.$$level] = group.$$expanded;
    while (row && row.$$level > group.$$level) {
      row.$$visible = group.$$expanded
        ? expansionTracking[row.$$level - 1]
        : false;
      expansionTracking[row.$$level] = !!row.$$expanded && !!row.$$visible;
      row = this._grouppedData[++index];
    }
    this.dataSource = this._grouppedData.filter(d => d.$$visible);
  }

  isGroup(index, item): boolean {
    return item.$$isGroup;
  }

  getBackgroundGroup(level: number) {
    const min = 220;
    const max = 255;
    const step = (max - min) / this.groupByColumns.length;
    const color = Math.floor(min + step * level);
    return `rgb(${color},${color},${color})`;
  }
}

const convertToGrouppedData = (
  groupBy: string[] = [],
  tableData: any[],
  allExpanded = true,
  agragations: agregation[] = []
): any[] => {
  if (!groupBy.length) return tableData;

  const groups = {};

  for (const data of tableData) {
    let tempGroup: any = groups;
    for (const group of groupBy) {
      tempGroup[data[group]] = tempGroup[data[group]] || {};
      tempGroup = tempGroup[data[group]];
    }
    tempGroup._values = tempGroup._values || [];
    tempGroup.$$count = tempGroup.$$count || 0;
    tempGroup.$$count++;
    tempGroup._values.push(data);
    for (const agregation of agragations) {
      switch (agregation.operation) {
        case "sum":
          tempGroup[agregation.property] =
            (tempGroup[agregation.property] || 0) + data[agregation.property];
          break;
      }
    }
  }

  const grouppedData = [];
  const recursion = (group, level = 0) => {
    if (group._values) {
      grouppedData.push(
        ...group._values.map(v => {
          v.$$visible = allExpanded;
          v.$$level = level;
          return v;
        })
      );
      return group;
    }

    const agregation = { $$count: 0 };
    for (const a of agragations) {
      switch (a.operation) {
        case "sum":
          agregation[a.property] = 0;
          break;
      }
    }

    for (const prop in group) {
      const groupRow: any = {};
      grouppedData.push(groupRow);
      groupRow[groupBy[level]] = prop;
      groupRow.$$isGroup = true;
      groupRow.$$level = level;
      groupRow.$$expanded = allExpanded;
      groupRow.$$visible = allExpanded || level === 0;
      const _agregation = recursion(group[prop], level + 1);
      for (const prop in agregation) {
        groupRow[prop] = _agregation[prop];
        agregation[prop] += _agregation[prop];
      }
    }

    return agregation;
  };

  recursion(groups);

  return grouppedData;
};
