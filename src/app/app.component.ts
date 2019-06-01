import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from './chart.service';
import { NodeTree } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  count = 0; // 遍历计数位

  bTree; // 实例
  node; // 节点
  tree; // tree结构数据，用于可视化
  keys; // 遍历顺序

  constructor(private treeService: ChartService) {
    this.bTree = new NodeTree();
    this.node = this.bTree.Nodes;
    this.tree = this.bTree.generateTree();
    this.keys = this.bTree.keys;
  }

  ngOnInit() {
    this.treeService.createChart(this.chartContainer, this.tree);
  }
  // 遍历次序，请求bTree方法，更新keys数组
  show(type) {
    this.keys = this.bTree.getArray(type);
    this.count = 0;
    this.next();
  }
  // 遍历函数，进行绘图和数据更新
  next() {
    this.treeService.update(this.keys[this.count]);
    this.count =  (this.count + 1) % 6;
  }
  // 重置函数，将遍历计数重置，图重置
  clear() {
    this.count = 0;
    this.treeService.update(0);
  }

}
