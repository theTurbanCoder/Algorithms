const isValid = (cellP) => {
 let rid = cellP.length - 1

 for (let i = 0; i < rid; i++) {
  let diff = Math.abs(cellP[i] - cellP[rid])
  if (diff === 0 || diff === rid - i) return false
 }

 return true
}
const solveNQ = (n, row, cellP, res) => {
 if (row === n) res.push(cellP.slice())
 else {
  for (let col = 0; col < n; col++) {
   cellP.push(col)
   if (isValid(cellP)) solveNQ(n, row + 1, cellP, res)

   cellP.pop()
  }
 }
}

let results = []

solveNQ(11, 0, [], results)

console.log(results)

return results
