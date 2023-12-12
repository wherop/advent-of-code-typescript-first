import run from 'aocrunner';
enum Spring {
  GOOD = 0,
  BAD = 1,
  UNKNOWN = 2
}

const charToNumber: { [char: string]: Spring; } = {
  '.': Spring.GOOD,
  '#': Spring.BAD,
  '?': Spring.UNKNOWN
};

// const binaryToChar: {[number: Spring]: string} = {
//   Spring.GOOD: '.',
//   Spring.BAD: '#'
// }

type Ledger = {
  series: number[][];
  groups: number[][];
};

const generateAllBinariesOfLength = (length: number) => {
  const possibleBinaries: number[][] = [];
  const recursiveGenerator = (binaryArr: number[]) => {
    if (binaryArr.length === length) {
      possibleBinaries.push([...binaryArr]);
      return;
    }
    for (let i = 0; i < 2; i++) {
      recursiveGenerator([...binaryArr, i]);
    }
  };
  recursiveGenerator([]);
  return possibleBinaries;
};

const parseInput = (rawInput: string): Ledger => {
  let serialRecords: number[][] = [];
  let groupRecords: number[][] = [];
  let ledger = {
    series: serialRecords,
    groups: groupRecords
  };
  rawInput.split('\n').map((line) => {
    const splitLine = line.split(' ');
    ledger.series.push(splitLine[0].split('').map((char) => charToNumber[char]));
    ledger.groups.push(splitLine[1].split(',').map((num) => Number(num)));
  });
  return ledger;
};

const getNumericRecord = (strRecord: number[]) => {
  let numbers: number[] = [];
  let counter = 0;
  for (let i = 0; i < strRecord.length; i++) {
    const char = strRecord[i];
    if (char === Spring.BAD) {
      counter++;
    } else if (char === Spring.GOOD) {
      if (counter > 0) {
        numbers.push(counter);
        counter = 0;
      }
    } else {
      throw new Error(`'${char}' character encountered. This Array should only consist of '0's and '1's.`);
    }
  }
  if (counter > 0) {
    numbers.push(counter);
  }
  return numbers;
};

const fillInUnknowns = (
  record: number[],
  unknowns: number[],
  combination: number[]) => {
  let recCopy = record.slice();
  for (let k = 0; k < unknowns.length; k++) {
    const unkIndex = unknowns[k];
    recCopy[unkIndex] = combination[k];
  }
  return recCopy;
};

const sumUp = (arr: number[]) => {
  if (arr.length === 0) {
    return 0;
  }
  return arr.reduce((total, current) => total += current);
};

const part1 = (rawInput: string) => {
  const ledger = parseInput(rawInput);
  let combiCountList = [];
  for (let i = 0; i < ledger.series.length; i++) {
    const record = ledger.series[i];
    const damaged = ledger.groups[i];
    const unknowns: number[] = [];

    for (let j = 0; j < record.length; j++) {
      if (record[j] === Spring.UNKNOWN) {
        unknowns.push(j);
      }
    }

    const allCombinations = generateAllBinariesOfLength(unknowns.length);
    const possibleCombinations: number[][] = allCombinations.filter((combination) => {
      const restoredRecord = fillInUnknowns(record, unknowns, combination);
      const combiDamaged = getNumericRecord(restoredRecord);
      if (sumUp(combiDamaged) !== sumUp(damaged)) {
        return false;
      }
      const areEqual = combiDamaged.every(
        (element, index) => element === damaged[index]);
      if (areEqual) {
        return true;
      }
      return false;
    });

    combiCountList.push(possibleCombinations.length);
  }

  const sum = sumUp(combiCountList);

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
          `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`,
        expected: 21,
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
