import run from 'aocrunner';

enum Terrain {
  ASH = 0,
  ROCK = 1
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

const searchVertical = (matrix: number[][]) => {
  for (let i = 0; i < matrix[0].length; i++) {

  }
};

const reflectionIsCorrect = (matrix: number[][], reflectionIndex: number) => {
  const linesBeforeRefl = reflectionIndex +1
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
  return true
};

const searchHorizontal = (matrix: number[][]) => {
  for (let i = 0; i < matrix.length; i++) {
    const currentRow = matrix[i];
    const nextRow = matrix[i + 1];
    const areEqual = areArrsEqual(currentRow, nextRow);
    if (areEqual && reflectionIsCorrect(matrix, i)) {
        return i
    }
    return null
  }
};

const part1 = (rawInput: string) => {
  const matrixArr = parseInput(rawInput);
  

  return;
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
  onlyTests: true,
});
