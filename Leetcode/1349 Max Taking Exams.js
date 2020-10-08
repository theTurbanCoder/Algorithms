var maxStudents = function (seats) {
 console.log(seats)

 let m = seats.length
 let n = seats[0].length

 let s = m * n
 let t = m * n + 1

 let g = new Array(m * n + 2).fill(m * n + 2).map(() => new Array(m * n + 2).fill(0))

 let dir = [
  [0, -1],
  [-1, -1],
  [1, -1],
  [0, 1],
  [-1, 1],
  [1, 1],
 ]
 let seatcnt = 0
 let flow = 0
 for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
   if (seats[i][j] === '#') continue
   else {
    seatcnt++
    if (j % 2 === 0) {
     g[s][i * n + j] = 1
     for (let d of dir) {
      let ni = i + d[0]
      let nj = j + d[1]

      if (ni < 0 || ni >= m || nj < 0 || nj >= n || seats[ni][nj] === '#') continue

      g[i * n + j][ni * n + nj] = 1
     }
    } else {
     g[i * n + j][t] = 1
    }
   }
  }
 }

 console.log(g)
 flow = EK(m, n, g, s, t, flow)
}

const EK = (m, n, g, s, t, flow) => {
 while (true) {
  let pre = new Array(m * n + 2).fill(-1)
  bfs(pre, g, s, m * n + 2)

  if (pre[t] === -1) return flow
  let v = t

  while (true) {
   let u = pre[v]
   g[u][v]--
   g[v][u]++
   v = u
   if (v === s) break
  }
  flow++
 }
}

const bfs = (pre, g, s, tot) => {
 let q = [s]
 let visted = new Array(tot).fill(0)
 visted[s] = 1
 while (q.length > 0) {
  let cur = q.shift()
  for (let i = 0; i < tot; i++) {
   if (visted[i] === 0 && g[cur][i] === 1) {
    visted[i] = 1
    q.push(i)
    pre[i] = cur
   }
  }
 }
}
let seats = [
 ['#', '.', '#', '#', '.', '#'],
 ['.', '#', '#', '#', '#', '.'],
 ['#', '.', '#', '#', '.', '#'],
]

maxStudents(seats)
