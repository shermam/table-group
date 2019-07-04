import { Component, Input } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

export interface ItemNode {
  name: string;
  children?: ItemNode[];
}

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.scss"]
})
export class TreeComponent {
  treeControl = new NestedTreeControl<ItemNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ItemNode>();

  @Input()
  set data(value: Array<ItemNode>) {
    this.dataSource.data = value;
  }

  hasChild = (_: number, node: ItemNode) =>
    !!node.children && node.children.length > 0;
}
