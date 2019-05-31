import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './data.service';
import { ori_data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  treeData = ori_data;
  count = 0;
  keys = [0, 1, 2, 3, 4, 5]

  constructor(private treeService: DataService) {
  }

  ngOnInit() {
    this.seedTree();
  }
  seedTree() {
    if (!!this.treeData) {
      this.treeService.createChart(this.chartContainer, this.treeData);
    }
  }

  show(type) {
    this.treeService.update(this.count)
  }
  next() {
    this.treeService.update(this.count);
  }
  clear() {
    this.count = 0;
    this.treeService.update(0);
  }

}
