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

    insert(value) {
        if (value === this._root.getValue()) return;
        let r = this._root;

        while (true) {
            if (value < r.getValue()){
                if (r.getLeftChild() === null) {
                    r.setLeftChild(new Node(value));
                    return;
                }
                r = r.getLeftChild();
            } else {
                if (r.getRightChild() === null) {
                    r.setRightChild(new Node(value));
                    return;
                }
                r = r.getRightChild();
            }
        }
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

  function make() { return new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]); }