const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join("./", 'input-d3.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')

function countTypeDigitAtIndex(input, index, typeCount) {
  let countOfNums = input.map(code => code[index])
       .reduce((acc, currNum) => {
          let idxToIncr = +currNum;
          acc[idxToIncr]++;
          return acc;
        }, [0, 0]);
  
  if (countOfNums[0] === countOfNums[1]) {
    return typeCount === 'most' ? '1': '0';
  }

  let num = typeCount === 'most' ? 
    Math.max(...countOfNums): Math.min(...countOfNums);
  return String(countOfNums.indexOf(num));
}

function calcGammaEpsilon(input) {
  let numLength = input[0].length; 
  let [ gamma, epsilon ] = [ '', '' ];

  for (let idx = 0; idx < numLength; idx += 1) {
    gamma += countTypeDigitAtIndex(input, idx, 'most');
    epsilon += countTypeDigitAtIndex(input, idx, 'least');
  }

  return [ parseInt(gamma, 2), parseInt(epsilon, 2) ];
}

function calcRating(type, input) {
  type = type === 'oxygen' ? 'most': 'least';
  idx = 0;

  while (input.length > 1) {
    input = input.filter(code => {
      return code[idx] === countTypeDigitAtIndex(input, idx, type)
    });
    idx += 1;
  }

  return parseInt(input[0], 2)
}

function calcPowerConsumption(gamma, epsilon) {
  return gamma * epsilon;
}

function calcLifeSupportRating(oxyRating, CO2Rating) {
  return oxyRating * CO2Rating;
}

let [ gamma, epsilon ] = [ ...calcGammaEpsilon(input) ];

let oxygenRating = calcRating('oxygen', input);
let CO2Rating = calcRating('CO2', input);

console.log(calcPowerConsumption(gamma, epsilon));
console.log(calcLifeSupportRating(oxygenRating, CO2Rating));