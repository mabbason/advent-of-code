const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join("./", 'input-d2.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')

let horizPosition = 0;
let depth = 0; 

function positionChange(instruction) {
  let [instrucType, distance] = instruction.split(' ');
  distance = Number(distance);

  if (instrucType === 'forward') {
    horizPosition += distance;
  } else if (instrucType === 'down') {
    depth += distance;
  } else {
    depth -= distance;
  }
}

input.forEach(instruction => positionChange(instruction));

let finalPosition = horizPosition * depth;
console.log(finalPosition);