const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join("./", 'input-d3.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')


function calcGammaEpsilon(input) {
  let binaryCountsArr = [];
  let numLength = input[0].length; 

  for (let idx = 0; idx < numLength; idx += 1) {
    binaryCountsArr.push(
      input.reduce((acc, currBinary) => {
        let idxToIncr = Number(currBinary[idx]);
        acc[idxToIncr]++;
        return acc;
      }, [0, 0])
    );
  }

  let [ gamma, epsilon ] = [ '', '' ];

  binaryCountsArr.forEach(numOccurs => {
    if (numOccurs[0] >= numOccurs[1]) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  });

  return [ parseInt(gamma, 2), parseInt(epsilon, 2) ];
}

function calcPowerConsumption(gamma, epsilon) {
  return gamma * epsilon;
}

console.log(calcPowerConsumption(...calcGammaEpsilon(input)));