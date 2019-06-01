export class NodeTree {
  Nodes = [{ id: 1, value: 'one', color: 'red', left: 2, right: 3 }
    , { id: 5, value: 'five', color: 'red', left: null, right: null }
    , { id: 2, value: 'two', color: 'blue', left: 4, right: null }
    , { id: 4, value: 'four', color: 'red', left: null, right: null }
    , { id: 3, value: 'three', color: 'green', left: 5, right: 6 }
    , { id: 6, value: 'six', color: 'red', left: null, right: null }];
    root = this.Nodes[0]
    keys = [1, 2, 3, 4, 5, 6];
    tree = this.insertNode(this.root);

  // 返回树
  generateTree() {
    return this.tree;
  }
  // 生成树
  insertNode(node) {
    const newNode = {
      id: node.id,
      value: node.value,
      color: node.color,
      children: []
    };
    if (!!node.left) {
      newNode.children.push(this.insertNode(this.Nodes.filter(v => v.id === node.left)[0]));
    }
    if (!!node.right) {
      newNode.children.push(this.insertNode(this.Nodes.filter(v => v.id === node.right)[0]));
    }
    return newNode;
  }
  // 根据类型切换遍历方式
  getArray(type) {
    this.keys = [];
    switch (type) {
      case 'dlr':
        this.preOrderNode(this.root);
        break;
      case 'ldr':
        this.inOrderNode(this.root);
        break;
      case 'lrd':
        this.postOrderNode(this.root);
        break;
    }
    console.log(this.keys);
    return this.keys;
  }
  // 前序遍历
  preOrderNode(node) {
    if (node !== null) {
      this.keys.push(node.id);
      if (!!node.left) {
        this.preOrderNode(this.Nodes.filter(v => v.id === node.left)[0]);
      }
      if (!!node.right) {
        this.preOrderNode(this.Nodes.filter(v => v.id === node.right)[0])
      }
    }
  }
  // 中序遍历
  inOrderNode(node) {
    if (node !== null) {
      if (!!node.left) {
        this.inOrderNode(this.Nodes.filter(v => v.id === node.left)[0]);
      }
      this.keys.push(node.id);
      if (!!node.right) {
        this.inOrderNode(this.Nodes.filter(v => v.id === node.right)[0])
      }
    }
  }
  // 后序遍历
  postOrderNode(node) {
    if (node !== null) {
      if (!!node.left) {
        this.postOrderNode(this.Nodes.filter(v => v.id === node.left)[0]);
      }
      if (!!node.right) {
        this.postOrderNode(this.Nodes.filter(v => v.id === node.right)[0])
      }
      this.keys.push(node.id);
    }
  }

}
