import run from 'aocrunner';

enum Tiles {
  Garden = 0,
  Rock = 1,
  Start = 2
}

const charToNumber: { [char: string]: Tiles; } = {
  '.': Tiles.Garden,
  '#': Tiles.Rock,
  'S': Tiles.Start,
};

enum Step {
  North = 0,
  South,
  East,
  West,
}

const stepVector = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const addVectors = (v1: number[], v2: number[]) => {
  return [v1[0] + v2[0], v1[1] + v2[1]];
};

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((line) => {
    return line.split('').map((char) => charToNumber[char]);
  });
};

const findStart = (input: Tiles[][]) => {
  const i = input.findIndex((row) => row.includes(2));
  if (i != -1) {
    const j = input[i].findIndex((char) => char === 2);
    if (j !== -1) {
      return [i, j];
    }
    return null;
  }
  return null;
};

const getNextStepsFromPosition = (input: Tiles[][], position: number[]) => {
  let possible = [];
  for (let i = 0; i < stepVector.length; i++) {
    const coord = addVectors(position, stepVector[i]);
    console.log('Inspecting: ' + coord)
    
    if ((![...input.keys()].includes(coord[0])) || 
    (![...input[0].keys()].includes(coord[1]))) {
      continue
    }
    const currentTile = input[coord[0]][coord[1]];
    console.log(currentTile)
    if (currentTile === Tiles.Garden) {
      possible.push(coord);
    }
  }
  return possible;
};

const getAllNextSteps = (input: Tiles[][], stepsList: number[][]) => {
  return stepsList.flatMap((coord) => { 
    console.log('calling gNSFP() with ' + coord)
    return getNextStepsFromPosition(input, coord)
   })
};

const part1 = (rawInput: string) => {
  const STEPS = 16;
  const input = parseInput(rawInput);
  const startCoord = findStart(input) ?? [66, 66];

  input[startCoord[0]][startCoord[1]] = Tiles.Garden;
  // const firstPossibleSteps = getNextStepsFromPosition(input, startCoord);
  let possibleStepsTable: number[][][] = [];
  let adjacencyList: number[][][] = []
  for (let index = 0; index < STEPS; index++) {
    const previousSteps = index > 0 ? possibleStepsTable[possibleStepsTable.length - 1] : [startCoord]
    // const nextSteps = getAllNextSteps(input, previousSteps);
    // possibleStepsTable.push(nextSteps)
  }


  
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
          `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`,
        expected: 16,
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
