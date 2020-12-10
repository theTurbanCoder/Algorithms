/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @param {string[][]} pairs
 * @return {boolean}
 */
var areSentencesSimilarTwo = function (words1, words2, pairs) {
 if (words1.length !== words2.length) return false

 const graph = {}

 let count = 0

 for (let i = 0; i < pairs.length; i++) {
  graph[pairs[i][0]] = count++
  graph[pairs[i][1]] = count++
 }

 // console.log(graph)
 const ds = new DSU(count)

 for (let [u, v] of pairs) {
  ds.union(graph[u], graph[v])
 }

 for (let i = 0; i < words1.length; i++) {
  let r1 = ds.find(graph[words1[i]])
  let r2 = ds.find(graph[words2[i]])
  if (!(r1 === r2)) return false
 }

 return true
}

class DSU {
 constructor(n) {
  this.parent = []
  this.numOfcomponents = n
  for (let i = 0; i < n; i++) {
   this.parent[i] = i
  }
 }

 find = (p) => {
  let root = p

  while (root !== this.parent[root]) root = this.parent[root]

  while (p !== root) {
   let next = this.parent[p]
   this.parent[p] = root
   p = next
  }

  return root
 }

 union = (p, q) => {
  let r1 = this.find(p)
  let r2 = this.find(q)

  if (r1 === r2) return false

  this.parent[r1] = r2
  this.numOfcomponents--
  return true
 }
}
