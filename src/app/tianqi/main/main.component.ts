import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TianqiService } from '../tianqi.service';
import { MultiLine } from '../draw/multiline.component';
import vegaEmbed from 'vega-embed';
import { specInit, test } from '../draw/spec';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ViewMultiline: MultiLine;
  @ViewChild('viewMultiline') viewMultiline;

  data;
  lines;
  start = '2013/1/1';
  end = '2013/12/31';
  step = 7; // 聚合天数
  keys;
  options;
  leftKeys;

  constructor(private tqSer: TianqiService,
    private el: ElementRef) {
  }
  ngOnInit() {
    const t = 'all';
    this.tqSer.getData(t).subscribe(res => {
      // console.log(res);
      this.data = this.norm2data(t, res);
      console.log(this.data);
      this.keys = Object.keys(this.data['1356969600000']);
      this.options = this.keys.map((v, i) => {
        return {
          'checked': i < 6,
          'value': v,
          'name': v
        };
      });
      this.leftKeys = this.getLeftKeys();
      console.log(this.leftKeys);
      this.lines = this.getLines(this.data);
      console.log(this.lines);
      this.draw(this.lines, [0, 1000]);

      this.scatterPlot(this.getJson(this.data));
    });
  }

  norm2data(type, res) {
    if (type === 'norm') {
      const new_res = {};
      res.norm.map((v, i) => {
        const temp = {};
        res.keys.forEach((u, j) => {
          temp[u] = v[j];
        });
        new_res[Date.parse('2013/1/1') + 60 * 60 * 24 * i] = temp;
      });
      return new_res;
    } else {
      return res;
    }
  }

  // 根据options checkbox 获取keys
  getLeftKeys() {
    return this.options.filter(v => {
      return v.checked;
    }).map(v => {
      return v.name;
    });
  }

  // 根据日期索引对象得到快速可视化数组
  getJson(res) {
    const keys = this.keys;
    const data = [];
    for (const item in res) {
      if (res.hasOwnProperty(item)) {
        data.push(Object.assign({ 'date': item }, res[item]));
      }
    }
    return data;
  }

  // 根据时间索引数据获取多维折线图输入
  getLines(res) {
    const keys = this.keys;
    const leftKeys = ['首要污染物', '质量描述'];
    const lines = [];
    keys.forEach(v => {
      if (leftKeys.indexOf(v) < 0) {
        lines.push({
          name: v,
          values: []
        });
      }
    });
    for (const resKey in res) {
      if (res.hasOwnProperty(resKey)) {
        lines.map((v, i) => {
          if (!!res[resKey][v.name]) {
            lines[i].values.push(
              {
                date: resKey,
                value: res[resKey][v.name]
              });
          }
        });
      }
    }
    return lines.filter(v => {
      return this.leftKeys.indexOf(v.name) !== -1;
    });
  }

  // 绘制多维折线图
  draw(data, range) {
    this.ViewMultiline = new MultiLine(this.viewMultiline.nativeElement, data, range);
    this.ViewMultiline.render();
  }

  // 图刷新
  select(start: any, end: any, res?: any) {
    this.leftKeys = this.getLeftKeys();
    const data = !!res ? res : this.data;
    const newData = {};
    for (const day in data) {
      if (data.hasOwnProperty(day)) {
        // @ts-ignore
        if (day > Date.parse(start) && day < Date.parse(end)) {
          newData[day] = data[day];
        }
      }
    }
    // console.log(newData);
    const newLines = this.getLines(newData);
    this.ViewMultiline.clear();
    this.draw(newLines, [0, 1000]);
    this.el.nativeElement.querySelector('#embed-view').outerHTML = ' <div id="embed-view" style="text-align: center"></div>';
    this.scatterPlot(this.getJson(newData));
  }

  // 归一化结果
  normData(start: any, end: any) {
    const t = 'norm';
    this.tqSer.getData(t).subscribe(res => {
      // console.log(res);
      this.data = this.norm2data(t, res);
      console.log(this.data);
      this.keys = Object.keys(this.data['1356969600000']);
      // this.options = this.keys.map((v, i) => {
      //   return {
      //     'checked': i < 6,
      //     'value': v,
      //     'name': v
      //   };
      // });
      this.leftKeys = this.getLeftKeys();
      console.log(this.leftKeys);
      this.lines = this.getLines(this.data);
      console.log(this.lines);
      this.draw(this.lines, [0, 1]);

      this.scatterPlot(this.getJson(this.data));
    });
  }

// 获取vega配置文件
spec(data) {
  console.log(data);
  const spec = specInit;
  // @ts-ignore
  spec.spec.data = { 'values': data };
  spec.repeat.column = this.leftKeys;
  spec.repeat.row = this.leftKeys;
  console.log(spec);
  return spec;
}

// vega-lite 绘图
scatterPlot(data) {
  const spec = this.spec(data);
  vegaEmbed('#embed-view', spec, { actions: false });
}
}
