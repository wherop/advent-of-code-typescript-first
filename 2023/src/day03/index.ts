import run from 'aocrunner';

const getSymbols = (rawInput: string) => {
  const regex = /[^\d.]/g;
  let symbolCoords: number[][] = [];
  let match;
  const lines = rawInput.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    while ((match = regex.exec(line)) !== null) {
      symbolCoords.push([i, match.index]);
    }
  }
  return symbolCoords
};

const getNumbers = (rawInput: string) => {
  const regex = /\d+/g;
  let numbers = [];
  let numberCoords: number[][] = [];
  let match;
  const lines = rawInput.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    while ((match = regex.exec(line)) !== null) {
      numbers.push(match[0]);
      numberCoords.push([i, match.index]);
    }
  }

  return { numbers: numbers, numberCoords: numberCoords };
};

const parseInput = (rawInput: string) => {
  return rawInput.split('\n');
};



const getDistance = (num: number[], symbol: number[]) => {
  const dY = Math.abs(num[0] - symbol[0]);
  const dx = Math.abs(num[1] - symbol[1]);
  return dY + dY;
};

const isCharAdjacent = (charCoord: number[], symbolCoord: number[]) => {
  const dY = Math.abs(charCoord[0] - symbolCoord[0]);
  const dX = Math.abs(charCoord[1] - symbolCoord[1]);
  return dY < 2 && dX < 2;
};

const isAdjToSymbol = (num: string, numCoord: number[], symbolCoords: number[][]): boolean => {
  return symbolCoords.some((symbolCoord) => {
    for (let i = 0; i < num.length; i++) {
      const charCoord = [numCoord[0], numCoord[1] + i];
      if (isCharAdjacent(charCoord, symbolCoord)) {
        return true;
      }
    }
    return false;
  });
};

const part1 = (rawInput: string) => {
  // const input = parseInput(rawInput);
  const numData = getNumbers(rawInput);
  const numbers = numData.numbers;
  const numberCoords = numData.numberCoords;
  const symbolCoords = getSymbols(rawInput);

  const parts = numbers.filter((num, i) => {
    return isAdjToSymbol(num, numberCoords[i], symbolCoords);
  });
  return parts.reduce((total, current) => {
    return total += Number(current);
  }, 0);
};

const getGears = (input: string[]) => { 
  
 }

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
      {
        input: 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`,
        expected: '467835',
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
