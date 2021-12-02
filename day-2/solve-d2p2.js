const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join("./", 'input-d2.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')

let aim = 0;
let horizPosition = 0;
let depth = 0; 

function positionChange(instruction) {
  let [instrucType, distance] = instruction.split(' ');
  distance = Number(distance);

  if (instrucType === 'forward') {
    horizPosition += distance;
    depth += (aim * distance);
  } else if (instrucType === 'down') {
    aim += distance;
  } else {
    aim -= distance;
  }
}

input.forEach(instruction => positionChange(instruction));

let finalPosition = horizPosition * depth;
console.log(finalPosition);