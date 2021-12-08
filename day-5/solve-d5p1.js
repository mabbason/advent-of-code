const path = require('path');
const fs = require('fs');

let input = fs
  .readFileSync(path.join("./", 'input-d5.txt'), 'utf8')
  .toString()
  .trim()
  .split('\n')

  /*
0,9 -> 5,9 mark this row since its only horizontal
8,0 -> 0,8 this is a diagonal line, don't mark
9,4 -> 3,4 mark this row since its only horizontal
2,2 -> 2,1 mark this row since its only vertical
7,0 -> 7,4 mark this row since its only vertical
6,4 -> 2,0 this is a diagonal line, don't mark, etc...
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2

.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....
*/
let coords = input.map(coord => coord.replace(' -> ', ',')
                                     .split(',')
                                     .map(str => Number(str)));

let buildGridStr = expandGrid(coords);
let thermalGrid = buildGridStr.map(str => str.split(''));

function expandGrid(coordsList) {
  let [ maxWidth, maxHeight ] = maxXYCoords(coordsList);
  return Array.from('.'.repeat(maxHeight)).map(dot => dot.repeat(maxWidth));
}

function maxXYCoords(coords) {
  return coords.reduce((acc, cv) => {
    let currXMax = Math.max( (cv[0] + 1), (cv[2] + 1), acc[0] );
    let currYMax = Math.max( (cv[1] + 1), (cv[3] + 1), acc[1] );;
    return [currXMax, currYMax];
  }, [0, 0]);
}

function markGrid(coords) {
  coords.forEach(coord => {
    if (coordSync(coord) === 'X') {
      markVerticalLine(coord); 
    } else if (coordSync(coord) === 'Y') {
      markHorizLine(coord);
    }
  });
}

function markSpot(currSpot) {
  spot = Number(currSpot);
  return spot ? String(spot + 1): '1'; 
}

function coordSync(coord) {
  if (coord[0] === coord[2]) return 'X'
  if (coord[1] === coord[3]) return 'Y'
  return false;
}

function markVerticalLine(coord) {
  let x = coord[0];
  let [ yStart, yEnd ] = [ coord[1], coord[3] ].sort((a, b) =>  a - b);
 
  for (let idx = yStart; idx <= yEnd; idx += 1) {
    let curr = thermalGrid[idx][x];
    thermalGrid[idx][x] = markSpot(curr);
  }
}

function markHorizLine(coord) {
  let y = coord[1];
  let [ xStart, xEnd ] = [ coord[0], coord[2] ].sort((a, b) =>  a - b);
  
  for (let idx = xStart; idx <= xEnd; idx += 1) {
    let curr = thermalGrid[y][idx];
    thermalGrid[y][idx] = markSpot(curr);
  }
}

function displayGrid() {
  thermalGrid.forEach(row => {
    console.log(row.join(''));
  });
}

function countIntersections(grid) {
  return grid.reduce((acc, curr) => {
    intersections = acc + curr.filter(num => num > 1).length;
    return intersections;
  }, 0);
}



markGrid(coords);
displayGrid();
console.log(countIntersections(thermalGrid));