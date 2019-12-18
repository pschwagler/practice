function getParentIndex(ind) {
  return Math.floor((ind - 1) / 2);
}

function getChildrenIndex(ind) {
  return [2 * ind + 1, 2 * ind + 2];
}

function swap(contents, ind1, ind2) {
  [contents[ind1], contents[ind2]] = [contents[ind2], contents[ind1]];
}

function MinHeap(arr = []) {
  this._contents = [...arr].sort((a, b) => a - b);
}

MinHeap.prototype.insert = function(val) {
  this._contents.push(val);
  let i = this._contents.length - 1;
  let parentIndex = getParentIndex(i);
  while (this._contents[i] < this._contents[parentIndex] && i !== 0) {
    swap(this._contents, i, parentIndex);
    i = parentIndex;
    parentIndex = getParentIndex(i);
  }
};

MinHeap.prototype.pop = function() {
  swap(this._contents, 0, this._contents.length - 1);
  let ret = this._contents.pop();
  let i = 0;
  let [left, right] = getChildrenIndex(i);
  while (
    this._contents[left] < this._contents[i] ||
    this._contents[right] < this._contents[i]
  ) {
    if (
      right > this._contents.length - 1 ||
      this._contents[right] > this._contents[left]
    ) {
      swap(this._contents, i, left);
      i = left;
      [left, right] = getChildrenIndex(i);
    } else {
      swap(this._contents, i, right);
      i = right;
      [left, right] = getChildrenIndex(i);
    }
  }
  return ret;
};

let mh = new MinHeap([2, 3, 4]);

mh.insert(5);
mh.insert(1);
console.log(mh.pop(), "// 1");
console.log(mh.pop(), "// 2");
mh.insert(7);
console.log(mh.pop(), "// 3");
console.log(mh.pop(), "// 4");
console.log(mh.pop(), "// 5");
console.log(mh.pop(), "// 7");
