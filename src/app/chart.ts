import * as d3 from 'd3';

export class Chart {
    svg;
    root;
    treeLayout;
    links;
    nodes;
    constructor() { }
    draw(ele, data) {
        this.svg = d3.select(ele).append('svg')
            .attr('width', 1000)
            .attr('height', 800)
            .attr('class', 'svgContainer');

        this.root = d3.hierarchy(data);
        this.treeLayout = d3.tree().size([800, 800]);
        this.treeLayout(this.root);
        this.links = this.svg.selectAll('.link')
            .data(this.root.links())
            .enter()
            .append('path')
            .style('z-index', '-10')
            .attr('class', '.link')
            .attr('stroke', '#ADAD')
            .attr('fill', 'none')
            .attr('d', d3.linkHorizontal()
                .x(d => d.y + 10)
                .y(d => d.x));
        this.nodes = this.svg.selectAll('.node')
            .data(this.root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y + 10}, ${d.x})`);

        this.nodes.append('text')
            .text(d => d.data.name)
            .attr('x', '.5em')
            .attr('y', '.5em');

        this.nodes.append('circle')
            .attr('r', 6)
            .attr('stroke', 'red')
            .attr('fill', 'white')
    }
    update(node){
        // this.svg.
    }

}
