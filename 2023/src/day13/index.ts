import run from 'aocrunner';

enum Terrain {
  ASH = 0,
  ROCK = 1
}
enum Orientation {
  Horizontal = 0,
  Vertical = 1
}

const charToNumber: { [char: string]: Terrain; } = {
  '.': Terrain.ASH,
  '#': Terrain.ROCK,
};

const parseInput = (rawInput: string) => {
  return rawInput.split(/\n{2}/g).map((pattern) => {
    return pattern.split('\n').map((line) => {
      return line.split('').map((char) => {
        return charToNumber[char];
      });
    });
  });
};

const areArrsEqual = (arr1: number[], arr2: number[]) => {
  return arr1.every(
    (element, index) => element === arr2[index]
  );
};

const transpose = <T>(matrix: T[][]): T[][] => {
  return matrix[0]?.map((col, i) => matrix.map(row => row[i]));
};

const getColumn = (matrix: number[][], index: number) => { 
  return matrix.map((row) => row[index])
 }

// PROBLEM: not adapted for vertical use
const horizontalReflectionIsCorrect = (matrix: number[][], reflectionIndex: number) => {
  const linesBeforeRefl = reflectionIndex + 1;
  const mirrorLength = Math.min(
    linesBeforeRefl, matrix.length - linesBeforeRefl
  );
  for (let j = 1; j < mirrorLength; j++) {
    if (!areArrsEqual(
      matrix[reflectionIndex - j],
      matrix[reflectionIndex + j + 1])) {
      return false;
    }
  }
  return true;
};
// TODO: adapt to vertical
const verticalReflectionIsCorrect = (matrix: number[][], reflectionIndex: number) => {
  const linesBeforeRefl = reflectionIndex + 1;
  const mirrorLength = Math.min(
    linesBeforeRefl, matrix.length - linesBeforeRefl
  );
  for (let j = 1; j < mirrorLength; j++) {
    if (!areArrsEqual(
      getColumn(matrix, reflectionIndex - j),
      getColumn(matrix, reflectionIndex + j + 1))) {
      return false;
    }
  }
  return true;
};

const searchHorizontal = (matrix: number[][]) => {
  for (let i = 0; i < matrix.length - 1; i++) {
    const currentRow = matrix[i];
    const nextRow = matrix[i + 1];
    const areEqual = areArrsEqual(currentRow, nextRow);
    if (areEqual && horizontalReflectionIsCorrect(matrix, i)) {
      console.log(`Horizontal found! Index: ${i}`);
      return i;
    }
  }
  console.log(`No horizontal found`);
  return null;
};

const searchVertical = (matrix: number[][]) => { 
  const transMatrix = transpose(matrix)
  const result =  searchHorizontal(transMatrix)
  console.log(result !== null ? 'Vertical found!' : 'No vertical found!')
  return result
 }

// const searchVertical = (matrix: number[][]) => {
//   for (let i = 0; i < matrix[0].length - 1; i++) {
//     const currentCol = getColumn(matrix, i)
//     const nextCol = getColumn(matrix, i + 1)
//     const areEqual = areArrsEqual(currentCol, nextCol);
//     if (areEqual && verticalReflectionIsCorrect(matrix, i)) {
//       console.log(`Vertical found! Index: ${i}`);
//       return i;
//     }
//   }
//   console.log(`No vertical found!`);
//   return null;
// };

const part1 = (rawInput: string) => {
  const matrixArr = parseInput(rawInput);

  let horizontalNums: number = 0;
  let verticalNums: number = 0;
  let horizCounter = 0
  let vertCounter = 0
  let failedSearches: number[] = []
  matrixArr.forEach((matrix, index) => {
    const rowsAboveMinusOne = searchHorizontal(matrix);
    if (rowsAboveMinusOne !== null) {
      horizontalNums += rowsAboveMinusOne + 1;
      horizCounter++
      console.log(rowsAboveMinusOne + 1);
    } else {
      const colsToLeftMinusOne = searchVertical(matrix);
      if (colsToLeftMinusOne !== null) {
        verticalNums += colsToLeftMinusOne + 1;
        vertCounter++
        console.log(colsToLeftMinusOne + 1);
      } else {
        failedSearches.push(index)
      }
    }
  });
  // console.log(horizontalNums);
  // console.log(verticalNums);

  console.log(`Horiz + vert: ${horizCounter+vertCounter}`)
  console.log('Number of matrices: ' + matrixArr.length)
  console.log(failedSearches)

  return verticalNums + 100 * horizontalNums;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input:
          `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`,
        expected: 405,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: '',
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
