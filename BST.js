// Setup
//==============

import  R  from 'ramda';
import { QUnit } from "qunit";
import { accounting } from "accounting";




function BST(value) {
  this.val = value
  this.left = null
  this.right = null 
}

BST.prototype.insert = function(value) {
  
  if (value < this.val)
    {
      if (this.left)
        this.left.insert(value)
      else{
        this.left = new BST(value)
      }
    }
  
  else{
    if (this.right)
      this.right.insert(value)
    
    else{
      this.right = new BST(value)
    }
    
  }
  

  
}


BST.prototype.inorderTraversal = function() {
  
  
  if(!!this.left)
   {
    
     this.left.inorderTraversal()
   }
  
  
  console.log(this.val)
  
  if(!!this.right)
    {
     
      this.right.inorderTraversal()
    }
  
  return undefined  
  
}

BST.prototype.preOrderTraversal = function() {
  
//   SELF , LEFT , RIGHT
  
  console.log(this.val)

  
  if(!!this.left)
    this.left.preOrderTraversal()
  
  if(!!this.right)
    this.right.preOrderTraversal()
  
  return undefined
}

BST.prototype.postOrderTraversal = function() {
  
   
  if(this.left)
    this.left.postOrderTraversal()
  
  if(this.right)
    this.right.postOrderTraversal()
  
  console.log(this.val)
  
  return undefined

  
}

BST.prototype.deleteMin = function(parent) {

  if(!this.left && !this.right)
    {
    if(parent)
      {
        parent.left = null
      }
    
    else this.val= null
    }
  
  if (!this.left && this.right)
   {
     if(parent)
      {
        parent.left = this.right
      }
     else{
       this.val = this.right.val
       this.right = this.right.right
     }
   }
  
  if(this.left)
    this.left.deleteMin(this)
  
}

BST.prototype.getDepth = function(){
  
//   Base case is root is null, leaf node , or empty tree 
  
  if(!this.left && !this.right)
    return 0
  
  let leftDepth = this.left.getDepth()
  let rightDepth = this.right.getDepth()
  
  return Math.max(leftDepth+1, rightDepth+1)
}

  

let a = new BST(11)
let x = [7,15,5,9,13,20,3,6,8,10,12,14,18,25]
let f = x.map((val,idx) => a.insert(val))

console.log('inoredr traversal')



a.inorderTraversal()

console.log(' Depth ')

a.getDepth()

// console.log('post order')

// a.postOrderTraversal()

// console.log('pre order')

// a.preOrderTraversal()