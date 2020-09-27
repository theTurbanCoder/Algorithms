// knapsack 0-1

let val = [7, 5, 6, 10, 9];
let w = [3, 6, 9, 3, 6];

let W = 12;

let memo = {};

let topDown = new Array(val.length + 1)
  .fill(val.length + 1)
  .map(() => new Array(W + 1).fill());

// const knapsack = (vals, weights, index, updatedWeight) => {
//   if (memo[`${index}${updatedWeight}`]) {
//     return memo[`${index}${updatedWeight}`];
//   }

//   if (index === 0 || updatedWeight === 0) return 0;

//   if (weights[index - 1] <= updatedWeight)
//     return (memo[`${index}${updatedWeight}`] = Math.max(
//       vals[index - 1] +
//         knapsack(vals, weights, index - 1, updatedWeight - weights[index - 1]),
//       knapsack(vals, weights, index - 1, updatedWeight)
//     ));
//   else if (weights[index - 1] > updatedWeight)
//     return (memo[`${index}${updatedWeight}`] = knapsack(
//       vals,
//       weights,
//       index - 1,
//       updatedWeight
//     ));
// };

// knapsack(val, w, val.length, W);

const knapSackDP = () => {
  for (let i = 0; i < val.length + 1; i++)
    for (let j = 0; j < W + 1; j++) {
      if (i === 0 || j == 0) topDown[i][j] = 0;
    }
  //Inwlse itialization done above

  for (let i = 1; i < val.length + 1; i++)
    for (let j = 1; j < W + 1; j++) {
      if (w[i - 1] <= j) {
        //         console.log(
        //           i,
        //           j,
        //           val[i - 1] + topDown[i - 1][j - w[i - 1]],
        //           topDown[i - 1][j]
        //         );
        //         console.log(
        //           Math.max(val[i - 1] + topDown[i - 1][j - w[i - 1]], topDown[i - 1][j])
        //         );
        topDown[i][j] = Math.max(
          val[i - 1] + topDown[i - 1][j - w[i - 1]],
          topDown[i - 1][j]
        );
      } else {
        topDown[i][j] = topDown[i - 1][j];
      }
    }
};

knapSackDP();
topDown[val.length][W];
