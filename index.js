class Node {
    constructor(value) {
        this._data = value;
        this._leftChild = null;
        this._rightChild = null;
    }

    getValue() { return this._data; }
    getLeftChild() { return this._leftChild; }
    getRightChild() { return this._rightChild; }
    setLeftChild(child) { this._leftChild = child; }
    setRightChild(child) { this._rightChild = child; }
}

class Tree {
    constructor(arr) {
        this._root = this.buildTree(arr);
    }

    getRoot() { return this._root; }

    buildTree(arr) {
        let treeArr = [...new Set(arr)];
        treeArr.sort((a, b) => a - b);

        if (treeArr.length === 0) return null;
        
        let mid = Math.floor((treeArr.length - 1) / 2);
        let root = new Node(treeArr[mid]);
        
        root.setLeftChild(this.buildTree(treeArr.slice(0, mid)));
        root.setRightChild(this.buildTree(treeArr.slice(mid+1)));
        
        return root;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.getRightChild() !== null) {
      prettyPrint(node.getRightChild(), `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.getValue()}`);
    if (node.getLeftChild() !== null) {
      prettyPrint(node.getLeftChild(), `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }