const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join("./", 'input-d1.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => parseInt(num, 10));

console.log(input.reduce((acc, currVal, idx) => {
  let nextVal = input[idx + 1];
  if (nextVal && (currVal < nextVal)) acc += 1
  return acc;
}, 0));
