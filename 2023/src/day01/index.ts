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


const numeralDict: Map<string, string> = new Map<string, string>();
numeralDict
  .set('one', '1')
  .set('two', '2')
  .set('three', '3')
  .set('four', '4')
  .set('five', '5')
  .set('six', '6')
  .set('seven', '7')
  .set('eight', '8')
  .set('nine', '9')

function convertNumeralToDigit(oneMatch: string): string {
  if (isNaN(Number(oneMatch))) {
    return numeralDict.get(oneMatch) as string
  }
  return oneMatch
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const getCalibrationValueOf = (word: string) => {
    const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g
    const allMatches = Array.from(word.matchAll(regex), (x) => x[1])
    // console.log(word + ' -> ' + allMatches);

    const firstDigit = convertNumeralToDigit(allMatches[0])
    const lastDigit = convertNumeralToDigit(allMatches[allMatches.length - 1])

    return Number(firstDigit + lastDigit)
  }

  const words = input.split("\n");

  const calibrationValues = words.map((word: string) => getCalibrationValueOf(word))
  // console.log(calibrationValues)


  return calibrationValues.reduce(
    (partialSum: number, currentValue: number) => partialSum + currentValue,
  );
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
