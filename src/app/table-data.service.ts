import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface TableData {
  Class: string;
  Group: string;
  Reason: string;
  Location: string;
  Period: string;
  "Sub Equipment": string;
  Duration: number;
  "Total Time": number;
}

@Injectable({
  providedIn: "root"
})
export class TableDataService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<TableData[]>("./assets/sample1.json");
  }
}
