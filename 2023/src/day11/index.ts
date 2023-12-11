import run from 'aocrunner';

const GALAXY = '#';

const transpose = <T>(matrix: T[][]): T[][] => {
  return matrix[0]?.map((col, i) => matrix.map(row => row[i]));
};

const getMatrixStr = <T>(matrix: T[][]): string => {
  return matrix.map((row) => row.join('')).join('\n');
};

const indexOfEmptyCol = (matrix: string[][]): number[] => {
  let colsToExpand = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let col = [];
    for (let j = 0; j < matrix.length; j++) {
      col.push(matrix[j][i]);
    }
    // console.log('---')
    // console.log(i)
    if (!col.includes('#')) {
      // console.log(col)
      colsToExpand.push(i);
    }
  }
  return colsToExpand;
};

const expandColumns = <T>(matrix: T[][], colsToExpand: number[]): T[][] => {
  for (let i = colsToExpand.length - 1; i >= 0; i--) {
    const colIndex = colsToExpand[i];
    matrix.forEach((row) => {
      row.splice(colIndex, 0, row[colIndex]);
    });
  }
  return matrix;
};

const numberGalaxies = (matrix: string[][]): string[][] => {
  let galaxyCount: number = 0;
  matrix.map((row, i) => {
    row.map((element, j) => {
      if (element === GALAXY) {
        matrix[i][j] = String(galaxyCount);
        galaxyCount++;
      }
    });
  });
  return matrix;
};

const parseInput = (rawInput: string) => {
  const arr2d = rawInput.split('\n').map((row) => row.split(''));
  // expand universe
  const colsToExpand = indexOfEmptyCol(arr2d);
  const colsExpandedMatrix = expandColumns(arr2d, colsToExpand);

  const transMatrix = transpose(colsExpandedMatrix);
  const transRowsToExpand = indexOfEmptyCol(transMatrix);
  const transRowsExpandedMatrix = expandColumns(transMatrix, transRowsToExpand);

  const expandedMatrix = transpose(transRowsExpandedMatrix);

  // number galaxies
  const nrOfGalaxies = getMatrixStr(expandedMatrix).match(/#/gm)?.length;
  // console.log(nrOfGalaxies);

  const numberedMatrix = numberGalaxies(expandedMatrix);

  return numberedMatrix;


};

const getDistance = (currGalaxy: number[], target: number[]): number => {
  const dY = Math.abs(target[0] - currGalaxy[0]);
  const dX = Math.abs(target[1] - currGalaxy[1]);
  return dY + dX;
};

const part1 = (rawInput: string) => {
  const matrix = parseInput(rawInput);
  // console.log(getMatrixStr(matrix));

  let galaxyCoordList: number[][] = [];
  matrix.forEach((row, i) => {
    row.forEach((element, j) => {
      if (element != '.') {
        galaxyCoordList.push([i, j]);
      }
    });
  });

  // console.log(galaxyCoordList);

  // get distance
  let distances = []
  for (let i = 0; i < galaxyCoordList.length; i++) {
    const currGalaxy = galaxyCoordList[i];
    let distsFromCurr = []
    for (let j = i + 1; j < galaxyCoordList.length; j++) {
      const target = galaxyCoordList[j];
      distsFromCurr.push(getDistance(currGalaxy, target))
    }
    distances.push(distsFromCurr)
  }

  // console.log(distances)

  let sum = 0
  for (let row of distances) {
    for (let dist of row) {
      sum += dist
    }
  }

  return sum;
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
          `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 374,
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
