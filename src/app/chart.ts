import * as d3 from 'd3';

export class Chart {
    svg; // svg元素
    root; // 转换数据
    treeLayout; // 可视化布局
    links; // 连接线
    nodes; // 节点
    constructor() { }
    /*
    * ele：dom元素
    * data：输入数据
    */
    draw(ele, data) {
        this.svg = d3.select(ele).append('svg')
            .attr('width', 600)
            .attr('height', 800)
            .attr('class', 'svgContainer');
        // 数据转换
        this.root = d3.hierarchy(data);
        this.treeLayout = d3.tree().size([600, 600]);
        this.treeLayout(this.root);
        // 设置连线
        this.links = this.svg.selectAll('.link')
            .data(this.root.links())
            .enter()
            .append('path')
            .style('z-index', '-10')
            .attr('class', '.link')
            .attr('stroke', '#ADAD')
            .attr('fill', 'none')
            .attr('d', d3.linkHorizontal()
                .x(d => d['x'])
                .y(d => d['y'] + 10));
        // 设置节点
        this.nodes = this.svg.selectAll('.node')
            .data(this.root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x}, ${d.y + 10})`);
        // 添加文字
        this.nodes.append('text')
            .text(d => d.data.value)
            .attr('x', '.5em')
            .attr('y', '.5em');
        // 添加圆
        this.nodes.append('circle')
            .attr('r', 6)
            .attr('stroke',  'blue')
            .attr('fill', d => d.data.color ? d.data.color : 'white');
    }
    /*
    * 更新遍历节点颜色和大小
    */
    update(node) {
        this.nodes.select('circle')
            .attr('r', d => d.data.id === node ? 10 : 6)
            .attr('fill',  d => d.data.id === node ? 'white' : d.data.color);
    }

}
