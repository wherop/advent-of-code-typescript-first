import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  return rawInput
    .split('\n')
    .map((record) => record.split(' ').map((entry) => Number(entry)));
};

const element = (e: number | number[]): number | number[] => e;

function isNotAllZeroes(arr: number[]): boolean {
  for (const element of arr) {
    if (element != 0) {
      return true
    }
  }

  return false
}

function getDiff(num1: number, num2: number) {
  return num2 - num1;
}

function makePrediction(diffSeqTable: number[][]): number {
  const revSeqTable = diffSeqTable.reverse()
  let extrapolation: number[] = [0]

  for (let i = 1; i < revSeqTable.length; i++) {
    const lastOfSeq = revSeqTable[i].findLast(element) as number
    const lastOfExt = extrapolation[extrapolation.length -1]

    extrapolation.push(lastOfSeq + lastOfExt)
  }
  return extrapolation[extrapolation.length -1]
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

function getPredictions(input: number[][]): number[] {
  const predictions = input.map((record) => {
    let diffSeqTable = [record];

    do {
      diffSeqTable.push(
        getDiffSeq(diffSeqTable.findLast(element) as number[])
      );
    } while (isNotAllZeroes(diffSeqTable.findLast(element) as number[]));
    

    const prediction = makePrediction(diffSeqTable);
    return prediction
  });

  return predictions
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const predictions = getPredictions(input)

  return predictions.reduce((sum, current) => sum + current);
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
  onlyTests: false,
});
