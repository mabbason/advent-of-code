const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join("./", 'input-d1.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => parseInt(num, 10));

input.reduce((acc, currVal, idx) => {
  currVal = currVal + input[idx + 1] + input[idx + 2];
  let nextVal = input[idx + 1] + input[idx + 2] + input[idx + 3];
  if ((currVal && nextVal) && (currVal < nextVal)) acc += 1
  return acc;
}, 0);