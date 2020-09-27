function Vertex(name) {
 this.name = name
 this.visited = false
 this.predecesssor = null
 this.adjacencyList = []
 this.minDistance = Infinity
}

function Edge(weight, startVertex, targetVertex) {
 this.weight = weight
 this.startVertex = startVertex
 this.targetVertex = targetVertex
}

function Djikstra() {}

Djikstra.prototype.calculateShortestPath = function (vertexList, startVertex) {
 startVertex.minDistance = 0
 let queue = [startVertex]
 while (queue.length > 0) {
  let actualVertex = queue.shift()

  actualVertex.adjacencyList.filter((edge) => {
   let u = edge.startVertex
   let v = edge.targetVertex

   let newDistance = u.minDistance + edge.weight

   if (newDistance < v.minDistance) {
    v.predecesssor = u
    v.minDistance = newDistance
    queue = queue.concat(v)
   }

   return true
  })
 }
}

Djikstra.prototype.getShortestPathTo = function (targetVertex) {
 console.log(`the min Distance to ${targetVertex.name} is  ${targetVertex.minDistance}`)

 let node = targetVertex

 while (node !== null) {
  console.log(`weight from ${node.name} to ${node.predecessor} is ${node.minDistance}`)
  node = node.predecessor
 }
}

let v = new Vertex('A')
