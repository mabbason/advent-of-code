const path = require('path');
const fs = require('fs');

let input = fs
  .readFileSync(path.join("./", 'input-d4.txt'), 'utf8')
  .toString()
  .trim()
  .split('\n')

const numbersCalled = input.splice(0, 1)[0].split(',');

const referenceBoards = (() => {
  let boards = [];

  input.forEach(row => {
    if (row === '') {
      boards.push([]);
    } else {
      boards[ boards.length - 1 ].push(row);
    }
  });

  return boards.map(board => board.map(row => rowToArray(row)));
})();

let boardsToMark = referenceBoards;

function rowToArray(row) {
  return row.split(' ').filter(num => num !== '');
}

function isWinningBoard(board) {
  let hasWinningRow = board.some(row => isWinningRow(row))
  return ( hasWinningRow || hasWinningColumn(board) );
}

function isWinningRow(row) {
  return row.every(num => num === 'X')
}

function hasWinningColumn(board) {
  for (let idx = 0; idx < 5; idx += 1) {
    let column = board.map(row => row[idx]);
    if (column.every(num => num === 'X')) return true;
  }

  return false;
}

function markBoardsWith(numCalled) {
  boardsToMark = boardsToMark.map(board => {
    return board.map(row => {
      return row.map(existNum => existNum === numCalled ? 'X': existNum)
    })
  })
}

function getSumOfBoard(board) {
  return board.reduce((acc, currRow) => acc += getSumOfRow(currRow), 0);
}

function getSumOfRow(row) {
  let sum = row.map(num => {
      return num === 'X' ? 0: Number(num);
    })
    .reduce((acc, cv) => acc += cv, 0);
  return sum;
}

function playBingo() {
  let winningBoard;
  let lastCalledNum;

  do {
    lastCalledNum = numbersCalled.shift();
    markBoardsWith(lastCalledNum)
    winningBoard = boardsToMark.find(board => isWinningBoard(board));
  } while (!winningBoard);
  
  let winningSum = getSumOfBoard(winningBoard);

  console.log(winningSum * lastCalledNum)
}

playBingo();