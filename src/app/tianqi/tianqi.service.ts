import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TianqiService {

  datas = {
    'clinical': '/cdata', // 门诊数据
    'air': '/adata', // 获取空气质量数据
    'all': '/tdata', // 获取所有数据
    'weather': '/wdata', // 获取天气数据
    'norm': '/norm'
  };
  api = 'http://localhost:5000';
  constructor(private httpCli: HttpClient) { }

  getData(type) {
    return this.httpCli.get(this.api + this.datas[type]);
  }

  // post()
}
