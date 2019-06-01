# TreeVis
本应用主要解决二叉树进行可视化，并提供多种遍历方式展示

服务端返回数据:
 nodes = [{id: 1, value: 'one', color: 'red', left: 2, right: 3 }
,{id: 5, value: 'five', color: 'red', left: null, right: null }
,{id: 2, value: 'two', color: 'blue', left: 4, right: null }
,{id: 4, value: 'four', color: 'red', left: null, right: null }
,{id: 3, value: 'three', color: 'green', left: 5, right: 6 }
,{id: 6, value: 'six', color: 'red', left: null, right: null }]


要求：
1. 实现函数 前序遍历/中序遍历/后序遍历， 打印出每个节点的value和color （ES6实现）
2. 实现以上过程的可视化展现
  a. 树的静态展现, 同节点要根据color展现颜色，并用文字展现value，
  b. 可以让用户选择查看哪种算法（前序遍历/中序遍历/后序遍历），算法的动态展示，比如前序遍历，通过高亮node节点，告知该算法的遍历顺序

实现结果：
![结果截图](/src/assets/res.png)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
