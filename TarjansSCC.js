function Graph(val) {
 ///Undirected Graph
 this._nodes = {}
 this.n = val
 this.ids = 0
 this.sccCount = 0
 for (let i = 0; i < val; i++) this.addNode(i)
}

Graph.prototype.addNode = function (value) {
 // implement me...
 this._nodes[value] = this._nodes[value] || []
}
// Time complexity:

Graph.prototype.addEdge = function ([value1, value2]) {
 // implement me...
 if (!value1 && !value2) return 'Invalid node'

 let value1Neighbours = this._nodes[value1]
 //   let value2Neighbours = this._nodes[value2];

 if (value1Neighbours.indexOf(value2) === -1) value1Neighbours.push(value2)

 //   if (value2Neighbours.indexOf(value1) === -1) value2Neighbours.push(value1);
}
// Time complexity:

Graph.prototype.removeEdge = function (value1, value2) {
 // implement me...
 if (!value1 && !value2) return 'Invalid node'

 let value1Neighbours = this._nodes[value1]
 let value2Neighbours = this._nodes[value2]

 value1Neighbours.splice(value1Neighbours.indexOf(value2), 1)
 value2Neighbours.splice(value2Neighbours.indexOf(value1), 1)
}
// Time complexity:
Graph.prototype.tarDFS = function (at, ids, low, onStack, stack) {
 stack.push(at)
 onStack[at] = true
 ids[at] = this.ids
 low[at] = this.ids
 //   console.log(stack)
 this.ids += 1

 for (let v of this._nodes[at]) {
  if (ids[v] === -1) {
   this.tarDFS(v, ids, low, onStack, stack)
   low[at] = Math.min(low[at], low[v])
  } else if (onStack[v]) {
   low[at] = Math.min(low[at], ids[v])
  }
 }

 if (ids[at] === low[at]) {
  while (stack.length > 0) {
   let node = stack.pop()
   onStack[node] = false
   low[node] = ids[at]
   if (node === at) break
  }
  this.sccCount += 1
 }
 return
}

Graph.prototype.tarjans = function () {
 let ids = Array(this.n).fill(-1)
 let low = Array(this.n).fill(-1)
 let onStack = Array(this.n).fill(false)
 let stack = []

 for (let i = 0; i < this.n; i++)
  if (ids[i] === -1) this.tarDFS(i, ids, low, onStack, stack)

 return low
}

let a = new Graph(8)

let edgeList = [
 [6, 0],
 [6, 2],
 [3, 4],
 [6, 4],
 [2, 0],
 [0, 1],
 [4, 5],
 [5, 6],
 [3, 7],
 [7, 5],
 [1, 2],
 [7, 3],
 [5, 0],
]

let t = edgeList.map((e) => a.addEdge(e))
console.log(a.tarjans())

let g1 = new Graph(5)
g1.addEdge([1, 0])
g1.addEdge([0, 2])
g1.addEdge([2, 1])
g1.addEdge([0, 3])
g1.addEdge([3, 4])

g1.tarjans()

let g4 = new Graph(11)
g4.addEdge([0, 1])
g4.addEdge([0, 3])
g4.addEdge([1, 2])
g4.addEdge([1, 4])
g4.addEdge([2, 0])
g4.addEdge([2, 6])
g4.addEdge([3, 2])
g4.addEdge([4, 5])
g4.addEdge([4, 6])
g4.addEdge([5, 6])
g4.addEdge([5, 7])
g4.addEdge([5, 8])
g4.addEdge([5, 9])
g4.addEdge([6, 4])
g4.addEdge([7, 9])
g4.addEdge([8, 9])
g4.addEdge([9, 8])

g4.tarjans()
// a.contains(1);
// a.removeEdge(0,1)
// a.traverseDepthFirstSearch(2);
// a.traverseBFS(2);
;('***** g5 *****')
let g5 = new Graph(5)
g5.addEdge([0, 1])
g5.addEdge([1, 2])
g5.addEdge([2, 3])
g5.addEdge([2, 4])
g5.addEdge([3, 0])
g5.addEdge([4, 2])

g5.tarjans()
