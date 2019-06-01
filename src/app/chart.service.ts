import { Injectable } from '@angular/core';
import { Chart } from './chart';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    chart: Chart = new Chart();

    constructor() { }

    // 画图
    createChart(chartContainer: any, treeData: any): void {
        const element = chartContainer.nativeElement;
        this.chart.draw(element, treeData);

    }
    // 更新数据
    update(node) {
        this.chart.update(node);
    }

}
