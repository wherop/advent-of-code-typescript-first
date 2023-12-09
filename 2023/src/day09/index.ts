import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  return rawInput
    .split('\n')
    .map((record) => record.split(' ').map((entry) => Number(entry)));
};

const element = (e: number | number[]): number | number[] => e;

function isAllZeroes(arr: number[]): boolean {
  for (const element of arr) {
    if (element != 0) {
      return false
    }
  }

  return true

  // return !arr.find((element) => element != 0)
}

function getDiff(num1: number, num2: number) {
  return num2 - num1;
}

function makePrediction(predictTable: number[][]) {

}

function getDiffSeq(seq: number[]): number[] {
  let diffSeq: number[] = [];
  for (let i = 0; i < seq.length - 1; i++) {
    const num1 = seq[i];
    const num2 = seq[i + 1];
    diffSeq.push(num2 - num1);
  }
  return diffSeq;
}

function getPredictions(input: number[][]) {
  const predictions = input.map((record) => {
    let predictTable = [record];

    do {
      predictTable.push(
        getDiffSeq(predictTable.findLast(element) as number[])
      );
      console.log(predictTable);
    } while (isAllZeroes(predictTable.findLast(element) as number[]));

    const prediction = makePrediction(predictTable);

  });
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);
  const predictions = getPredictions(input)

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
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 114,
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
