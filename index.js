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

    _insertNode(newNode, parent) {
        let r = parent;
        let value = newNode.getValue();

        while (true) {
            if (value === r.getValue()) return;
            else if (value < r.getValue()){
                if (r.getLeftChild() === null) {
                    r.setLeftChild(newNode);
                    return;
                }
                r = r.getLeftChild();
            } else {
                if (r.getRightChild() === null) {
                    r.setRightChild(newNode);
                    return;
                }
                r = r.getRightChild();
            }
        }
    }

    insert(value) { this._insertNode(new Node(value), this._root); }

    _deleteNode(node) {
        let parent = null;
        let rChild = node.getRightChild();
        let lChild = node.getLeftChild();

        if (rChild === null && lChild === null) return parent;
        else if (rChild === null) parent = lChild;
        else if (lChild === null) parent = rChild;
        else {
            parent = rChild;
            let displacedChild = rChild.getLeftChild();
            rChild.setLeftChild(lChild);
            if (displacedChild) this._insertNode(displacedChild, parent);
        }
        return parent;
    }

    delete(value) {
        let parent = this._root;
        let rChild = parent.getRightChild();
        let lChild = parent.getLeftChild();

        if (parent.getValue() === value) { // root
            this._root = this._deleteNode(parent);
            return;
        }
    
        while (parent !== null) {
            if (rChild === null && lChild === null) return; // Value not in tree
            if (value > parent.getValue()) {
                if (rChild === null) return; // Value not in tree
                if (rChild.getValue() === value) {
                    parent.setRightChild(this._deleteNode(rChild));
                }
                parent = rChild;
            } else {
                if (lChild === null) return; // Value not in tree
                if (lChild.getValue() === value) {
                    parent.setLeftChild(this._deleteNode(lChild));
                }
                parent = lChild;
            }

            rChild = parent.getRightChild();
            lChild = parent.getLeftChild();
        }
    }

    find(value) {
        let parent = this._root;
        while (parent !== null) {
            if (value === parent.getValue()) return parent;
            else if (value < parent.getValue()) parent = parent.getLeftChild();
            else parent = parent.getRightChild();
        }
        return parent;
    }

    levelOrder(func) {
        let queue = [this._root];

        while (queue.length) {
            let visited = queue.shift();
            if (visited) {
                func(visited);
                queue.push(visited.getLeftChild());
                queue.push(visited.getRightChild());
            }
        }
    }

    _inorderRecur(func, node) {
        if (node.getLeftChild()) this._inorderRecur(func, node.getLeftChild());
        func(node);
        if (node.getRightChild()) this._inorderRecur(func, node.getRightChild());
    }

    inorder(func) { this._inorderRecur(func, this._root); }

    _preorderRecur(func, node) {
        func(node);
        if (node.getLeftChild()) this._preorderRecur(func, node.getLeftChild());
        if (node.getRightChild()) this._preorderRecur(func, node.getRightChild());
    }

    preorder(func) { this._preorderRecur(func, this._root); }

    _postorderRecur(func, node) {
        if (node.getLeftChild()) this._postorderRecur(func, node.getLeftChild());
        if (node.getRightChild()) this._postorderRecur(func, node.getRightChild());
        func(node);
    }

    postorder(func) { this._postorderRecur(func, this._root); }

    height(node) { return (node ? 1 + Math.max(this.height(node.getLeftChild()), this.height(node.getRightChild())) : 0); } // Nasty one line

    depth(node) {
        
        let parent = this._root;
        let nodes = 0;
        while (true) {
            if (node.getValue() === parent.getValue()) return nodes;
            else if (node.getValue() < parent.getValue()) parent = parent.getLeftChild();
            else parent = parent.getRightChild();
            nodes++;
        }
    }

    isBalanced() {
        let heightDiffs = [];
        this.postorder(node => {
            heightDiffs.push(Math.abs(this.height(node.getLeftChild()) - this.height(node.getRightChild())));
        });
        
        return ((heightDiffs.filter(height => height > 1)).length === 0);
    }

    rebalance() {
        let arr = [];
        this.inorder(node => arr.push(node.getValue()));
        this._root = (this.buildTree(arr));
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

  function make() { return new Tree([4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90]); }