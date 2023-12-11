import run from 'aocrunner';

const GALAXY = '#';

const transpose = <T>(matrix: T[][]): T[][] => {
  return matrix[0]?.map((col, i) => matrix.map(row => row[i]));
};

const getMatrixStr = <T>(matrix: T[][]): string => {
  return matrix.map((row) => row.join('')).join('\n');
};

const indexOfEmptyCols = (matrix: string[][]): number[] => {
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

const indexOfEmptyRows = (matrix: string[][]): number[] => {
  let rowsToExpand = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let row = [];
    for (let j = 0; j < matrix.length; j++) {
      row.push(matrix[i][j]);
    }
    // console.log('---')
    // console.log(i)
    if (!row.includes('#')) {
      // console.log(col)
      rowsToExpand.push(i);
    }
  }
  return rowsToExpand;
};

const expandColumns = <T>(matrix: T[][], colsToExpand: number[], times: number = 1): T[][] => {
  for (let i = colsToExpand.length - 1; i >= 0; i--) {
    const colIndex = colsToExpand[i];
    for (let j = 0; j < times; j++) {
      matrix.forEach((row) => {
        row.splice(colIndex, 0, row[colIndex]);
      });
    }
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

const parseInput2000 = (rawInput: string,) => {
  const arr2d = rawInput.split('\n').map((row) => row.split(''));
  // const numberedMatrix = numberGalaxies(arr2d);
  // return numberedMatrix;
  return arr2d
};

const parseInput = (rawInput: string, expand: number = 1) => {
  const arr2d = rawInput.split('\n').map((row) => row.split(''));
  // expand universe
  const colsToExpand = indexOfEmptyCols(arr2d);
  const colsExpandedMatrix = expandColumns(arr2d, colsToExpand, expand);

  const transMatrix = transpose(colsExpandedMatrix);
  const transRowsToExpand = indexOfEmptyCols(transMatrix);
  const transRowsExpandedMatrix = expandColumns(transMatrix, transRowsToExpand, expand);

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

const listDistances = (coordList: number[][]): number[][] => {
  let distances = [];
  for (let i = 0; i < coordList.length; i++) {
    const currGalaxy = coordList[i];
    let distsFromCurr = [];
    for (let j = i + 1; j < coordList.length; j++) {
      const target = coordList[j];
      distsFromCurr.push(getDistance(currGalaxy, target));
    }
    distances.push(distsFromCurr);
  }
  return distances;
};

const getCoordinates = (matrix: string[][]) => {
  let galaxyCoordList: number[][] = [];
  matrix.forEach((row, i) => {
    row.forEach((element, j) => {
      if (element != '.') {
        galaxyCoordList.push([i, j]);
      }
    });
  });
  return galaxyCoordList;
};

const convertToNew = (coords: number[], emptyRowsCols: number[][], expansion: number) => { 
  const newCoords = coords.map((coord, i) => {
    const expansionsBeforeCoord = emptyRowsCols[i].filter((index) => index < coord)
    return coord + (expansion * expansionsBeforeCoord.length)
   })
   return newCoords
 }

const part1 = (rawInput: string) => {
  const matrix = parseInput(rawInput);

  const galaxyCoordList = getCoordinates(matrix);

  const distances = listDistances(galaxyCoordList);

  let sum = 0;
  for (let row of distances) {
    for (let dist of row) {
      sum += dist;
    }
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const EXPANSION = 10;
  const matrix = parseInput2000(rawInput);

  const emptyRowsCols = [
    indexOfEmptyRows(matrix),
    indexOfEmptyCols(matrix)
  ];
  // console.log(emptyRowsCols)
  const baseCoordList = getCoordinates(matrix)
  const newCoordList:number[][] = []
  baseCoordList.forEach((galaxy) => {
    newCoordList.push(convertToNew(galaxy, emptyRowsCols, EXPANSION))
   })
  // console.log(baseCoordList)
  // console.log(newCoordList)
  
   const distances = listDistances(newCoordList);
  // console.log(distances)
   let sum = 0;
   for (let row of distances) {
     for (let dist of row) {
       sum += dist;
     }
   }
 
   return sum;
  


  // const matrix = parseInput(rawInput, EXPANSION);
  // const galaxyCoordList = getCoordinates(matrix);
  // const distances = listDistances(galaxyCoordList);
  // let sum = 0;
  // let nrOfPairs = 0;
  // for (let row of distances) {
  //   for (let dist of row) {
  //     sum += dist;
  //     nrOfPairs++
  //   }
  // }
  // return sum;
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
        expected: 1030,
      },
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
        expected: 8410,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
