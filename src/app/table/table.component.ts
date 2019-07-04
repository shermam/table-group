import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent {
  @Input() data$: Observable<any>;
  @Input() columns: Array<string>;
}
