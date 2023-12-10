import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((line) => line.split(''));
};


const part1 = (rawInput: string) => {
  const field = parseInput(rawInput);
  
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
          `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`,
        expected: 4,
      },
      {
        input:
          `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
        expected: 8,
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
