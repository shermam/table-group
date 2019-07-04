import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface TableData {
  vin: string;
  brand: string;
  year: number;
  color: string;
}

@Injectable({
  providedIn: "root"
})
export class TableDataService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<TableData>("./assets/sample.json");
  }
}
