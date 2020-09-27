function TrieNode(value){
  
  this.val = value || undefined
  this.children = Array(26).fill(null)
  this.endOfWord = false
  this.currentSize = 0
  
}

function Trie(){
  this.root = new TrieNode()
}


Trie.prototype.getCharIndex = (key) => {
  
 
  const convertCode = (x) => x.charCodeAt(0)
  return convertCode(key) - convertCode('a')
}

Trie.prototype.insert = function(key){
  
  let pcrawl = this.root
  let level = key.length
  console.log(level, 'level')
  
  for(let i=0; i< level; i++)
    {
      
      let index = this.getCharIndex(key[i])
      if(!pcrawl.children[index])
        {
          if(!pcrawl.val)
            pcrawl.val = key[i]
          pcrawl.children[index] = new TrieNode(key[i]) 
        }
      pcrawl.currentSize++
      pcrawl = pcrawl.children[index]
    }
  pcrawl.endOfWord = true
}


Trie.prototype.search = function(key){
  
  let preCrawl = this.root
  let n = key.length
  
  for(let i = 0; i < n ;i ++ )
    {
     
    let index = this.getCharIndex(key[i])
    if(preCrawl.children[index] === null)
      return false
    preCrawl = preCrawl.children[index]
      
    }
  
  
  return (preCrawl !== null && preCrawl.endOfWord) 
  

  
}

Trie.prototype.searchPrefix = function(prefix){ //Start Pre fix searching 
  
  let n = prefix.length
  let preCrawl = this.root
  
  for(let i=0;i <n ; i++)
   {
     let index = this.getCharIndex(prefix[i])
     if(preCrawl.children[index] === null)
       return 0
     preCrawl = preCrawl.children[index]
   }
  
  return preCrawl.currentSize
  
  
//   Base case empty string or index not found
  
}

let a = new Trie()
a.insert('tatat') 

a.insert('tanveer')

a.search('tanveer')

a.searchPrefix('tanveer')



