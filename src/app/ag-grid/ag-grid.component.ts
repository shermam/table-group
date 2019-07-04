import { Component, OnInit, Input } from "@angular/core";
import { ItemNode } from "../tree/tree.component";

@Component({
  selector: "app-ag-grid",
  templateUrl: "./ag-grid.component.html",
  styleUrls: ["./ag-grid.component.scss"]
})
export class AgGridComponent implements OnInit {
  columnDefs = [];

  @Input() data;

  @Input()
  set columns(value: Array<string>) {
    this.columnDefs = value.map(v => ({
      headerName: v,
      field: v,
      enableRowGroup: true
    }));
  }

  constructor() {}

  ngOnInit() {}
}
