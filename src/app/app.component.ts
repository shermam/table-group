import { Component } from "@angular/core";
import { TableDataService, TableData } from "./table-data.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ItemNode } from "./tree/tree.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  columns: Array<string> = ["vin", "brand", "year", "color"];
  data$: Observable<TableData[]> = this.dataService.get();
  dataTree$: Observable<ItemNode[]> = this.data$.pipe(
    map(convertDataToTree(["brand", "color"]))
  );

  constructor(private dataService: TableDataService) {}
}

const convertDataToTree = (groupBy: string[] = []) => (
  tableData: TableData[]
): ItemNode[] => {
  let groups = {};

  for (const data of tableData) {
    let tempGroup: any = groups;
    for (const group of groupBy) {
      tempGroup[data[group]] = tempGroup[data[group]] || {};
      tempGroup = tempGroup[data[group]];
    }
    tempGroup._values = tempGroup._values || [];
    tempGroup._values.push(data);
  }

  const mapTonode = map => {
    if (map._values)
      return map._values.map(v => ({
        name: JSON.stringify(v)
      }));

    const _value: ItemNode[] = [];
    for (const key in map) {
      _value.push({
        name: key,
        children: mapTonode(map[key])
      });
    }

    return _value;
  };

  return mapTonode(groups);
};
