function Graph() {
  ///Undirected Graph
  this._nodes = {}
}

Graph.prototype.addNode = function(value) {
  // implement me...
  this._nodes[value] = this._nodes[value] || []
};
// Time complexity:

Graph.prototype.removeNode = function(value) {
  // implement me...

};
// Time complexity:

Graph.prototype.contains = function(value) {
  
  if(!value)
    return false
  
  if (this._nodes[value])
    return true
  
  return false
  // implement me...
};
// Time complexity:

Graph.prototype.addEdge = function(value1, value2) {
  // implement me...
  if(!value1 && !value2)
    return 'Invalid node'
  
  let value1Neighbours = this._nodes[value1]
  let value2Neighbours = this._nodes[value2]
  
  if(value1Neighbours.indexOf(value2) === -1)
    value1Neighbours.push(value2)
  
  if(value2Neighbours.indexOf(value1) === -1)
    value2Neighbours.push(value1)
};
// Time complexity:

Graph.prototype.removeEdge = function(value1, value2) {
  // implement me...
  if(!value1 && !value2)
    return 'Invalid node'
  
   let value1Neighbours = this._nodes[value1]
  let value2Neighbours = this._nodes[value2]
  
  value1Neighbours.splice(value1Neighbours.indexOf(value2), 1)
  value2Neighbours.splice(value2Neighbours.indexOf(value1), 1)
  
     
};
// Time complexity:

Graph.prototype.hasEdge = function(value1, value2) {
  // implement me...
};

Graph.prototype.traverseDepthFirstSearch = function(value, visited, distance){
  
  if(!this._nodes[value])
    return 'this node doesnt exist'
  
  visited = visited || {}
  distance = distance || 0
  
  visited[value] = true
  
  console.log(value, distance, 'dfs nodes')
  
  this._nodes[value].forEach((neighbour) => {
    if(visited[neighbour]) return;
    this.traverseDepthFirstSearch(neighbour, visited, distance+1)
  }, this)
  
  
}

Graph.prototype.traverseBFS = function(value, visited){
  
  let queue=[value]
  visited = visited || {}
  visited[value] = 0
  
  while(queue.length > 0)
    {
      let nodeValue = queue.shift()
      visited[nodeValue] = 1
      console.log('node', nodeValue)
      
      let neighBours = this._nodes[nodeValue].filter((neighbour) => {
        if(visited[neighbour] === undefined)
          {
            visited[neighbour] = visited[nodeValue]+1
             return true
          }
         
      })
      
      queue = queue.concat(neighBours)

    }
  
  
  
}


let a = new Graph()
a.addNode(0)
a.addNode(1)
a.addNode(2)
a.addNode(4)
a.addNode(3)
a.addEdge(0,1)
a.addEdge(0,4)
a.addEdge(4,1)
a.addEdge(1,3)
a.addEdge(4,3)
a.addEdge(1,2)
a.addEdge(3,2)
a.contains(1)
// a.removeEdge(0,1)
a.traverseDepthFirstSearch(2)
a.traverseBFS(2)
