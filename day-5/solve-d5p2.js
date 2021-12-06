const path = require('path');
const fs = require('fs');

let input = fs
  .readFileSync(path.join("./", 'input-d4.txt'), 'utf8')
  .toString()
  .trim()
  .split('\n')

