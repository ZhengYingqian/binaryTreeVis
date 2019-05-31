import { Injectable } from '@angular/core';
import { Chart } from './chart';
import { ori_data, Nodes } from './data';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    chart: Chart = new Chart();

    constructor() { }

    createChart(chartContainer: any, treeData: any): void {
        const element = chartContainer.nativeElement;
        this.chart.draw(element, ori_data);

    }

    update(node) {
        this.chart.update(node);
    }

    preOrderNode(node) {
        if (node !== null) {
            console.log(node.id);
            // this.ids.push(node);
            this.preOrderNode(node.left);
            this.preOrderNode(node.right);
        }
    }

    inOrderNode(node) {
        if (node !== null) {
            this.inOrderNode(node.left);
            console.log(node.key);
            this.inOrderNode(node.right);
        }
    }

    postOrderNode(node) {
        if (node !== null) {
            this.postOrderNode(node.left);
            this.postOrderNode(node.right);
            console.log(node.key);
        }
    }

}
