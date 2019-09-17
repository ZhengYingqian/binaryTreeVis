import { Component, OnInit } from '@angular/core';
import { corr, cols } from './correlation';
import * as d3 from 'd3';

@Component({
  selector: 'app-node-link',
  templateUrl: './node-link.component.html',
  styleUrls: ['./node-link.component.css']
})
export class NodeLinkComponent implements OnInit {

  pearson = corr.map(u => u[0]);

  constructor() { }

  ngOnInit() {
    console.log(this.pearson, cols);
    this.chart(this.data());
  }

  data = () => {
    const nodes = cols.map(u => {return {'id': u, 'group': 1}});
    const links = corr.map((u, i) => {return {'source': 'number', 'target': cols[i], 'value': u[0]}});
    return {nodes, links};
    }

  color = () => {
    const scale = d3.scaleOrdinal(d3.schemeCategory10);
    return d => scale(d.group);
  }

  drag = (simulation) => {
    function dragstarted(d) {
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) { simulation.alphaTarget(0); }
      d.fx = null;
      d.fy = null;
    }
    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  chart = (data) => {
    console.log(data);
    const width = 500;
    const height = 500;
    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance((d: any) => d.value*500))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3.select('#nodelink').append('svg')
    .attr('width', width + 100)
    .attr('height', height + 100)
      .attr('viewBox', [0, 0, width, height]);

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', this.color)
      .call(this.drag(simulation));

    node.append('title')
      .text(d => d.id);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
    // invalidation.then(() => simulation.stop());

    return svg.node();
  }
}
