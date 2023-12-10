import run from 'aocrunner';

const getSymbols = (rawInput: string) => {
  let all: string[] = []

 }

const parseInput = (rawInput: string) => {
  const symbols = [...new Set(rawInput.match(/[^(\w\.\n)\s]/gm))]
  console.log(symbols)
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);


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
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
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
