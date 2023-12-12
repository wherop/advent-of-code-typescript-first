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
  str: string[];
  nr: number[][];
};

const generateAllBinariesOfLength = (length: number) => {
  const possibleBinaries: string[] = [];
  const recursiveGenerator = (binaryStr: string) => {
    if (binaryStr.length === length) {
      possibleBinaries.push(binaryStr);
      return;
    }
    for (const number of Array(2).keys()) {
      recursiveGenerator(binaryStr + number);
    }
  };
  recursiveGenerator('');
  return possibleBinaries;
};

const parseInput = (rawInput: string) => {
  let recordsStr: number[][] = [];
  let recordsNr: number[][] = [];
  let ledger = {
    str: recordsStr,
    nr: recordsNr
  };
  rawInput.split('\n').map((line) => {
    const splitLine = line.split(' ');
    ledger.str.push(splitLine[0].split('').map((char) => charToNumber[char]));
    ledger.nr.push(splitLine[1].split(',').map((num) => Number(num)));
  });
  return ledger;
};

const getNumericRecord = (strRecord: string) => {
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
      throw new Error(`'${char}' character encountered. This string should only consist of '.' and '#'.`);
    }
  }
  return numbers;
};

const part1 = (rawInput: string) => {
  const ledger = parseInput(rawInput);

  for (let i = 0; i < ledger.str.length; i++) {
    const record = ledger.str[i];
    const damaged = ledger.nr[i];
    const unknown: number[] = [];
    for (let j = 0; j < record.length; j++) {
      if (record[j] === Spring.UNKNOWN) {
        unknown.push(j);
      }
    }
    const allCombinations = generateAllBinariesOfLength(unknown.length);
    const possibleCombinations = allCombinations.filter((combination) => {

    });
  }
  try {
    const arr= '111011100011'.split('').map((n) => Number(n))
    console.log(getNumericRecord(arr));
  } catch (error) {
    console.error(error);
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
  onlyTests: true,
});
