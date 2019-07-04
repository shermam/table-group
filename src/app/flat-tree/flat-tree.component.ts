import { Component, OnInit, Input } from "@angular/core";
import { ItemNode } from "../tree/tree.component";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlattener,
  MatTreeFlatDataSource
} from "@angular/material/tree";

export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: "app-flat-tree",
  templateUrl: "./flat-tree.component.html",
  styleUrls: ["./flat-tree.component.scss"]
})
export class FlatTreeComponent {
  private _transformer = (node: ItemNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  @Input()
  set data(value: Array<ItemNode>) {
    this.dataSource.data = value || [];
  }
}
