class Node {
 constructor(data, parent) {
  this.data = data
  this.parent = parent
  this.leftChild = null
  this.rightChild = null
  this.balance = 0
 }

 insert = (data, parentNode) => {
  if (data < this.data) {
   if (this.leftChild === null) {
    this.leftChild = new Node(data, parentNode)
   } else this.leftChild.insert(data, parentNode)
  } else {
   if (this.rightChild === null) {
    this.rightChild = new Node(data, parentNode)
   } else this.rightChild.insert(data, parentNode)
  }

  return parentNode
 }

 traverseInorder = () => {
  if (this.leftChild) this.leftChild.traverseInorder()

  console.log(this.data)

  if (this.rightChild) this.rightChild.traverseInorder()
 }

 getMax = () => {
  if (this.rightChild) return this.rightChild.getMax()

  return this.data
 }

 getMin = () => {
  if (this.leftChild) return this.leftChild.getMin()

  return this.data
 }
}

// const n1 = new Node(10, null)
// n1.insert(5, n1)
// n1.insert(12, n1)

// console.log(n1.traverseInorder())

class BalancedTree {
 constructor() {
  this.rootNode = null
 }

 insert = (data) => {
  let parentNode = null

  if (this.rootNode === null) {
   parentNode = new Node(data, null)
   this.rootNode = parentNode
  } else {
   parentNode = this.rootNode.insert(data, this.rootNode)
  }

  this.reBalanceTree(parentNode)
 }

 /**
  *
  * @param {Node} node
  */
 setBalance = (node) => {
  node.balance = this.height(node.rightChild) - this.height(node.leftChild)
 }

 /**
  *
  * @param {Node} parentNode
  */
 height = (parentNode) => {
  if (parentNode === null) return -1

  return (
   1 + Math.max(this.height(parentNode.leftChild), this.height(parentNode.rightChild))
  )
 }

 /**
  *
  * @param {Node} node
  */

 rightRotate = (node) => {
  console.log('rotating right')

  const temp = node.leftChild

  temp.parent = node.parent

  node.leftChild = temp.rightChild

  if (node.leftChild !== null) {
   node.leftChild.parent = node
  }

  temp.rightChild = node
  node.parent = temp

  if (temp.parent !== null) {
   if (temp.parent.rightChild == node) {
    temp.parent.rightChild = temp
   } else temp.parent.leftChild = temp
  }

  this.setBalance(node)
  this.setBalance(temp)

  return temp
 }

 /**
  *
  * @param {Node} node
  */

 leftRotate = (node) => {
  console.log('rotating left')

  const temp = node.rightChild

  temp.parent = node.parent

  node.rightChild = temp.leftChild

  if (node.rightChild !== null) node.rightChild.parent = node

  temp.leftChild = node
  node.parent = temp

  if (temp.parent !== null) {
   if (temp.parent.rightChild == node) temp.parent.rightChild = temp
   else temp.parent.leftChild = temp
  }

  this.setBalance(node)
  this.setBalance(temp)

  return temp
 }

 /**
  *
  * @param {Node} node
  */

 leftRightRotate = (node) => {
  console.log('rotate left right ...')

  node.leftChild = this.leftRotate(node.leftChild)

  return this.rightRotate(node)
 }

 /**
  *
  * @param {Node} node
  */

 rightLeftRotate = (node) => {
  console.log('rotate right left ...')
  node.rightChild = this.rightRotate(node.rightChild)

  return this.leftRotate(node)
 }

 /**
  *
  * @param {Node} parentNode
  */

 inorder = () => {
  this.rootNode.traverseInorder()
 }

 reBalanceTree = (parentNode) => {
  this.setBalance(parentNode)

  if (parentNode.balance < -1) {
   // this means we are left heavy so we rotate right
   if (
    this.height(parentNode.leftChild.leftChild) >=
    this.height(parentNode.leftChild.rightChild)
   ) {
    parentNode = this.rightRotate(parentNode)
   } else {
    parentNode = this.leftRightRotate(parentNode)
   }
  } else if (parentNode.balance > 1) {
   if (
    this.height(parentNode.rightChild.rightChild) >=
    this.height(parentNode.rightChild.leftChild)
   ) {
    parentNode = this.leftRotate(parentNode)
   } else parentNode = this.rightLeftRotate(parentNode)
  }

  if (parentNode.parent !== null) this.reBalanceTree(parentNode.parent)
  else this.rootNode = parentNode
 }
}

const bl = new BalancedTree()

bl.insert(40)
bl.insert(20)
bl.insert(10)
bl.insert(25)
bl.insert(30)
bl.insert(22)
bl.insert(50)

bl.inorder()
console.log(bl.rootNode)
