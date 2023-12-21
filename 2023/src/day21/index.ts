import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((line) => line.split(''));
};

const findStart = (input: string[][]) => {
  input.forEach((row, i) => {
    const j = row.findIndex((char) =>  char === 'S')
    if (j !== -1) {
      return [i, j]
    }
   })
}

const getPossibleSteps = (input: string[][], position: number[]) => { 
  
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const startCoord = findStart(input)

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: '',
      // },
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
