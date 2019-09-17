import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { RadarChart } from '../draw/radarchart';
import { corr1, corr2, cols, Dic } from '../node-link/correlation';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements OnInit {
  corr = [corr1, corr2];
  pearson = this.corr.map(v => v.map(u => u[0]));
  radar = new RadarChart();
  constructor() { }

  ngOnInit() {
    const w = 400,
      h = 400;

    const colorscale = d3.scaleOrdinal(d3.schemeCategory10);

    // Legend titles
    const LegendOptions = ['dis1'];

    const data = this.corr.map( v=> {
      return v.map((u, i) => { return { 'axis': Dic[cols[i]], 'value': Math.abs(u[0].toFixed(2)) } })
    });
    console.log(data);
    /*
    const data = [
        [
            { axis: 'Email', value: 0.59 },
            { axis: 'Social Networks', value: 0.56 },
            { axis: 'Internet Banking', value: 0.42 },
            { axis: 'News Sportsites', value: 0.34 },
            { axis: 'Search Engine', value: 0.48 },
            { axis: 'View Shopping sites', value: 0.14 },
            { axis: 'Paying Online', value: 0.11 },
            { axis: 'Buy Online', value: 0.05 },
            { axis: 'Stream Music', value: 0.07 },
            { axis: 'Online Gaming', value: 0.12 },
            { axis: 'Navigation', value: 0.27 },
            { axis: 'App connected to TV program', value: 0.03 },
            { axis: 'Offline Gaming', value: 0.12 },
            { axis: 'Photo Video', value: 0.4 },
            { axis: 'Reading', value: 0.03 },
            { axis: 'Listen Music', value: 0.22 },
            { axis: 'Watch TV', value: 0.03 },
            { axis: 'TV Movies Streaming', value: 0.03 },
            { axis: 'Listen Radio', value: 0.07 },
            { axis: 'Sending Money', value: 0.18 },
            { axis: 'Other', value: 0.07 },
            { axis: 'Use less Once week', value: 0.08 }
        ],
        [
            { axis: 'Email', value: 0.48 },
            { axis: 'Social Networks', value: 0.41 },
            { axis: 'Internet Banking', value: 0.27 },
            { axis: 'News Sportsites', value: 0.28 },
            { axis: 'Search Engine', value: 0.46 },
            { axis: 'View Shopping sites', value: 0.29 },
            { axis: 'Paying Online', value: 0.11 },
            { axis: 'Buy Online', value: 0.14 },
            { axis: 'Stream Music', value: 0.05 },
            { axis: 'Online Gaming', value: 0.19 },
            { axis: 'Navigation', value: 0.14 },
            { axis: 'App connected to TV program', value: 0.06 },
            { axis: 'Offline Gaming', value: 0.24 },
            { axis: 'Photo Video', value: 0.17 },
            { axis: 'Reading', value: 0.15 },
            { axis: 'Listen Music', value: 0.12 },
            { axis: 'Watch TV', value: 0.1 },
            { axis: 'TV Movies Streaming', value: 0.14 },
            { axis: 'Listen Radio', value: 0.06 },
            { axis: 'Sending Money', value: 0.16 },
            { axis: 'Other', value: 0.07 },
            { axis: 'Use less Once week', value: 0.17 }
        ]
    ];
    */
    // Options for the Radar chart, other than default
    const mycfg = {
      w: w,
      h: h,
      maxValue: 0.3,
      levels: 6,
      ExtraWidthX: 300
    }

    // Call function to draw the Radar chart
    // Will expect that data is in %'s
    this.radar.draw('#chart', data, mycfg);

    ////////////////////////////////////////////
    /////////// Initiate legend ////////////////
    ////////////////////////////////////////////

    const svg = d3.select('#draw')
      .selectAll('svg')
      .append('svg')
      .attr('width', w + 300)
      .attr('height', h)

    // Create the title for the legend
    const text = svg.append('text')
      .attr('class', 'title')
      .attr('transform', 'translate(90,0)')
      .attr('x', w - 70)
      .attr('y', 10)
      .attr('font-size', '12px')
      .attr('fill', '#404040')
      .text('correlation');

    // Initiate Legend	
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('height', 100)
      .attr('width', 200)
      .attr('transform', 'translate(90,20)');
    // Create colour squares
    legend.selectAll('rect')
      .data(LegendOptions)
      .enter()
      .append('rect')
      .attr('x', w - 65)
      .attr('y', function (d, i) { return i * 20; })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function (d, i) { return colorscale(i); });
    // Create text next to squares
    legend.selectAll('text')
      .data(LegendOptions)
      .enter()
      .append('text')
      .attr('x', w - 52)
      .attr('y', function (d, i) { return i * 20 + 9; })
      .attr('font-size', '11px')
      .attr('fill', '#737373')
      .text(function (d) { return d; });
  }

}
