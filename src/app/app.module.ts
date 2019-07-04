import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from "@angular/material/table";
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableComponent } from "./table/table.component";
import { TreeComponent } from "./tree/tree.component";
import { FlatTreeComponent } from "./flat-tree/flat-tree.component";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TreeComponent,
    FlatTreeComponent
  ],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatTreeModule,
    MatIconModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
