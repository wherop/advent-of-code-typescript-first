import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const strToArr = (input: string) => {
    return input.split("\n");
  };

  const getCalibrationValue = (word: string) => {
    const digitsOnly: string = word.replace(/\D/g, "");

    const firstDigit: string = digitsOnly[0];
    const lastDigit: string = digitsOnly.substring(digitsOnly.length - 1);

    return Number(firstDigit + lastDigit);
  };

  const inputArr = strToArr(input);
  const calibrationValues = inputArr.map((word: string) =>
    getCalibrationValue(word)
  );

  return calibrationValues.reduce(
    (partialSum: number, currentValue: number) => partialSum + currentValue,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const getCalibrationValueOf = (word: string) => {
    const regex = 
   }

  const words = input.split("\n");
  
  const calibrationValues = words.map((word: string) => getCalibrationValueOf(word))


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
