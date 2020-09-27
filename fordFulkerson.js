class Edge {
 constructor(from, to, capacity) {
  this.from = from
  this.to = to
  this.capacity = capacity
  this.flow = 0
  this.residual = {}
 }

 isResidual = () => this.capacity === 0

 remainingCapacity = () => this.capacity - this.flow

 /**
  *
  * @param {number} bottleneck
  */
 augment = (bottleneck) => {
  this.flow += bottleneck
  this.residual.flow -= bottleneck
 }

 /** @param {number} s - reprsents the start node */
 /** @param {number} t - represents the sink node */

 toString = (s, t) => {
  let u = this.from === s ? 's' : this.from === t ? 't' : `${this.from}`
  let v = this.to === s ? 's' : this.to === t ? 't' : `${this.to}`

  return `Edge ${u} -> ${v} | flow = ${this.flow} | capacity = ${
   this.capacity
  } | is residual: ${this.isResidual()} \n`
 }
}

class Graph {
 constructor(n, s, t) {
  this.visited = {}
  this.graph = {}
  this.n = n
  this.s = s
  this.t = t
  this.maxFlow = 0
  this.visitedToken = 1

  for (let i = 0; i < n; i++) this.graph[i] = []
 }

 addEdge = (from, to, cap) => {
  if (cap <= 0) throw new Error('capacity cannot be 0')

  let e1 = new Edge(from, to, cap)
  let e2 = new Edge(to, from, 0)

  e1.residual = e2
  e2.residual = e1

  this.graph[from].push(e1)
  this.graph[to].push(e2)
 }

 dfsSolver = () => {
  for (
   let f = this.dfs(this.s, Infinity);
   f !== 0 && f !== undefined;
   f = this.dfs(this.s, Infinity)
  ) {
   this.visitedToken++
   this.maxFlow += f
   console.log(this.maxFlow, 'max flow')
  }
 }

 dfs = (node, flow) => {
  if (node == this.t) return flow

  this.visited[node] = this.visitedToken

  let ed = this.graph[node]

  for (let edge of ed) {
   if (edge.remainingCapacity() > 0 && this.visited[edge.to] !== this.visitedToken) {
    let bottleneck = this.dfs(edge.to, Math.min(flow, edge.remainingCapacity()))

    if (bottleneck > 0) {
     edge.augment(bottleneck)
     return bottleneck
    }
   }
  }
 }

 printLog = () => {
  for (let i = 0; i < n; i++) {
   let e = this.graph[i]
   console.log(e.toString(e.from, e.to))
  }
 }
}

let n = 12
let s = n - 2
let t = n - 1

let g = new Graph(n, s, t)

// g.addEdge(s, 0, 10)
// g.addEdge(s, 1, 10)

// g.addEdge(0, 2, 10)

// g.addEdge(1, 3, 15)

// g.addEdge(2, t, 10)

// g.addEdge(3, 0, 6)
// g.addEdge(3, t, 10)

console.log(g)
// g.dfsSolver()
//

g.addEdge(s, 0, 10)
g.addEdge(s, 1, 5)
g.addEdge(s, 2, 10)

g.addEdge(0, 3, 10)
g.addEdge(1, 2, 10)
g.addEdge(2, 5, 15)
g.addEdge(3, 1, 2)
g.addEdge(3, 6, 15)
g.addEdge(4, 1, 15)
g.addEdge(4, 3, 3)
g.addEdge(5, 4, 4)
g.addEdge(5, 8, 10)
g.addEdge(6, 7, 10)
g.addEdge(7, 4, 10)
g.addEdge(7, 5, 7)

g.addEdge(6, t, 15)
g.addEdge(8, t, 10)

g.dfsSolver()

g.printLog()
