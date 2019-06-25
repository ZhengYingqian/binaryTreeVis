import * as d3 from 'd3';
export class MultiLine {
  target: HTMLElement;
  data;
  year;
  width = 1700;
  height = 800;
  margin = 80;
  textW = 200;
  duration = 250;
  range = [0, 1000]

  constructor(target: HTMLElement, data, range?) {
    this.target = target;
    this.data = data;
    if (!!range) {
      this.range = range;
    }
  }

  render() {
    /* Format Data */
    const parseDate = d3.timeParse('%Y');
    // this.data.forEach(function(d) {
    //   d.values.forEach( ele => {
    //     ele.date = parseDate(ele.date);
    //     ele.price = +ele.price;
    //   });
    // });
    console.log(this.data);

    /* Scale */
    // @ts-ignore
    const xScale = d3.scaleTime()
      .domain(d3.extent(this.data[0].values, d => d.date))
      // .domain([-1, 1])
      .range([0, this.width - this.textW]);

    const yScale = d3.scaleLinear()
      .domain(this.range)
      .range([this.height - this.margin, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    const svg = d3.select(this.target).append('svg')
      .attr('width', (this.width + this.textW) + 'px')
      .attr('height', (this.height + this.margin) + 'px')
      .append('g')
      .attr('transform', `translate(${this.margin}, ${this.margin})`);

    /* Add line into SVG */
    const line = d3.line()
      .x(d => {
        // @ts-ignore
        return xScale(d.date);
      })
      // @ts-ignore
      .y(d => yScale(d.value));
    //       console.log(line);

    const lines = svg.append('g')
      .attr('class', 'lines');

    lines.selectAll('.line-group')
      .data(this.data).enter()
      .append('g')
      .attr('class', 'line-group')
      .append('path')
      .attr('class', 'line')
      .attr('d', (d: any) => line(d.values))
      .style('stroke', (d, i) => color(i))
      .style('opacity', 0.25)
      .on('mouseover', function (d, i) {
        // console.log(d);
        d3.selectAll('.line')
          .style('opacity', 0.1);
        d3.selectAll('.circle')
          .style('opacity', 0.25);
        d3.selectAll('.title-text')
          .style('opacity', 0.1);
        d3.selectAll('.title' + i)
          .style('opacity', 0.85);
        d3.select(this)
          .style('opacity', 0.85)
          .style('stroke-width', 2.5)
          .style('cursor', 'pointer');
      })
      .on('mouseout', function (d) {
        d3.selectAll('.line')
          .style('opacity', 0.25);
        d3.selectAll('.circle')
          .style('opacity', 0.85);
        d3.selectAll('.title-text')
          .style('opacity', 0.85);
        d3.select(this)
          .style('stroke-width', 1.5)
          .style('cursor', 'none');
      });

    // legend
    lines.selectAll('.line-group2')
      .data(this.data).enter()
      .append('g')
      .append('text')
      .attr('class', function (d, i) {
        return 'title-text title' + i;
      })
      .style('fill', function (d, i) {
        return color(i);
      })
      .text(function (d: any) {
        return d.name;
      })
      .attr('text-anchor', 'middle')
      .attr('x', this.width - this.textW / 2)
      .attr('y', function (d, i) {
        // console.log(d, i);
        return 5 + 20 * i;
      })
      .on('click', function (d: any) {
        d3.selectAll('.line')
          .style('opacity', function (di: any) {
            if (di.name === d.name) {
              return 0.8;
            } else {
              return 0.1;
            }
          })
          .style('stroke-width', function (di: any) {
            if (di.name === d.name) {
              return 2.5;
            } else {
              return 1.5;
            }
          })
          .style('cursor', 'none');
        d3.selectAll('.circle')
          .style('opacity', function (di) {
            return select(d, di);
          });
        d3.selectAll('.title-text')
          .style('opacity', function (di) {
            return select(d, di);
          });
      });

    /* Add circles in the line */
    lines.selectAll('circle-group')
      .data(this.data).enter()
      .append('g')
      .style('fill', (d, i) => color(i))
      .selectAll('circle')
      // @ts-ignore
      .data(d => d.values).enter()
      .append('g')
      .attr('class', 'circle')
      .on('mouseover', function (d) {
        d3.select(this)
          .style('cursor', 'pointer')
          .append('text')
          .attr('class', 'text')
          .text(`${d.value}`)
          .attr('x', ele => xScale(ele.date) + 5)
          .attr('y', ele => yScale(ele.value) - 10);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .style('cursor', 'none')
          .transition()
          .duration(this.duration)
          .selectAll('.text').remove();
      })
      .append('circle')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.value))
      .attr('r', 3)
      .style('opacity', 0.85)
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(this.duration)
          .attr('r', 6);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(this.duration)
          .attr('r', 3);
      });

    /* Add Axis into SVG */
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append('g')
      .attr('class', 'xaxis1')
      .attr('transform', `translate(0, ${this.height - this.margin})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'yaxis1')
      .call(yAxis)
      .append('text')
      .attr('y', 15)
      .attr('transform', 'rotate(-90)')
      .attr('fill', '#000')
      .text('数量');
  }

  clear() {
    d3.select('svg').remove();
  }
}


function select(a, b) {
  if (a.name === b.name) {
    return 0.85;
  } else {
    return 0.2;
  }
}
