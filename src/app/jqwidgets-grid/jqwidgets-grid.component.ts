import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";

@Component({
  selector: "app-jqwidgets-grid",
  templateUrl: "./jqwidgets-grid.component.html",
  styleUrls: ["./jqwidgets-grid.component.scss"]
})
export class JqwidgetsGridComponent implements OnInit {
  dataAdapter;
  _columns;

  @Input()
  set data(value) {
    if (!value) return;

    const source = {
      localdata: value.map(Object.values),
      datafields: Object.keys(value[0]).map((k, i) => ({
        name: k,
        type: "string",
        map: `${i}`
      })),
      datatype: "array",
      id: "vin"
    };
    this.dataAdapter = new jqx.dataAdapter(source);
  }

  @Input()
  set columns(value) {
    this._columns = value.map(v => ({ text: v, datafield: v }));
  }

  constructor() {}

  ngOnInit() {}
}
