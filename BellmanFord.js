function Vertex(name){
  
  this.name = name
  this.visited = false
  this.predecesssor = null
  this.adjacencyList = []
  this.minDistance = Infinity
  
}

function Edge(weight, startVertex, targetVertex){
  
  this.weight = weight
  this.startVertex = startVertex
  this.targetVertex = targetVertex
  
}


function Djikstra() {}

Djikstra.prototype.calculateShortestPath = function(vertexList, startVertex){
  
  startVertex.minDistance = 0
  let queue = [startVertex]
  while(queue.length > 0)
   {
     let actualVertex = queue.shift()
     
    actualVertex.adjacencyList.filter((edge) => {
       
       let u = edge.startVertex
       let v = edge.targetVertex
       
       let newDistance = u.minDistance + edge.weight
       
       if(newDistance < v.minDistance)
         {
           v.predecesssor = u
           v.minDistance = newDistance
           queue = queue.concat(v)
         }
       
      return true
     })
     
   }
} 

Djikstra.prototype.getShortestPathTo = function(targetVertex){
  
  console.log(`the min Distance to ${targetVertex.name} is  ${targetVertex.minDistance}` )
  
  let node = targetVertex
  console.log(node)
  
  while(node !== null)
    {
      if(node.name && node.predecesssor)
        console.log(`weight from ${node.name} to ${node.predecesssor.name}  is ${node.minDistance}`)
      node = node.predecesssor
    }
  
}


function BellmanFordAlgorithm(){
  this.hasNegCycle = false
}

BellmanFordAlgorithm.prototype.calculateShortestPath = function(vertexList, edgeList, startVertex) {
  

  startVertex.minDistance = 0
  
  for(let i =0 ; i < vertexList.length-1; i++)
    {
      
      edgeList.filter((edge) => {
//         console.log(edge)
         let u = edge.startVertex
        let v = edge.targetVertex
        let newDistance = u.minDistance + edge.weight
        if(newDistance < v.minDistance)
         {
           v.predecesssor = u
           v.minDistance = newDistance
         }
        
        return true
      })
      
    }
  
  
  edgeList.filter((edge) => {
    
    if(this.hasCycle(edge))
     {
       this.hasNegCycle = true
       return
     }
  })
  
}

BellmanFordAlgorithm.prototype.hasCycle = function(edge){
  
  if((edge.weight + edge.startVertex.minDistance) < edge.targetVertex.minDistance)
    return true
  return false
}

BellmanFordAlgorithm.prototype.getShortestPath = function(targetVertex) {
  
  if(!this.hasNegCycle)
    {
      
      console.log('min ditance is ', targetVertex.minDistance)
      
      let node = targetVertex
      while(node!==null)
        {
          if (node.name && node.predecesssor)
            console.log(`${node.name} to ${node.predecesssor.name} is ${node.minDistance}`)
          node = node.predecesssor
        }
      
      return 'Done'
      
    }
  return 'Negative Cycle Detected'
} 



let node1 = new Vertex('A')
let node2 = new Vertex('B')
let node3 = new Vertex('C')
let node4 = new Vertex('D')
let node5 = new Vertex('E')




let edge1 = new Edge(-1, node1, node2)
let edge2 = new Edge(4, node1, node3)
let edge3 = new Edge(3, node2, node3)
let edge4 = new Edge(2, node2, node4)
let edge5 = new Edge(1, node4, node2)
let edge6 = new Edge(2, node2, node5)
let edge7 = new Edge(-3, node5, node4)
let edge8 = new Edge(5, node4, node3)

node1.adjacencyList.push(edge1)
node1.adjacencyList.push(edge2)

node2.adjacencyList.push(edge3)
node2.adjacencyList.push(edge4)
node2.adjacencyList.push(edge6)

node4.adjacencyList.push(edge5)
node4.adjacencyList.push(edge8)

node5.adjacencyList.push(edge7)



let bellAlgo = new BellmanFordAlgorithm()
bellAlgo

let vertexList = [node1,node2,node3,node4,node5]
let edgeList = [edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8]

bellAlgo.calculateShortestPath(vertexList, edgeList, node1)
bellAlgo.getShortestPath(node4)

//  Unbcomment for Djikstra
// let node1 = new Vertex('A')
// let node2 = new Vertex('B')
// let node3 = new Vertex('C')

// let edge1 = new Edge(1, node1, node2)
// let edge2 = new Edge(1,node2, node3)
// let edge3 = new Edge(10, node1, node3)

// node1.adjacencyList.push(edge1)
// node1.adjacencyList.push(edge2)
// node2.adjacencyList.push(edge3)

// let vertexList = [node1, node2, node3]

// let algo = new Djikstra()

// algo.calculateShortestPath(null, node1)
// algo.getShortestPathTo(node3)