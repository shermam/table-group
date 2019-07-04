import { Component } from "@angular/core";
import { TableDataService, TableData } from "./table-data.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  columns: Array<string>;
  data$: Observable<TableData>;

  constructor(dataService: TableDataService) {
    this.columns = ["vin", "brand", "year", "color"];
    this.data$ = dataService.get();
  }
}
