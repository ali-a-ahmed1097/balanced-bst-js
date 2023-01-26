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
        this._treeArr = arr;
    }

    buildTree() {
        
    }
}