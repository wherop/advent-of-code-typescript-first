import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

type GameSet = {
  red?: number,
  green?: number,
  blue?: number
}

type Game = {
  id: number,
  setList: GameSet[]
}

function strToGameArr(input: string): Game[] {
  const strLines = input.split('\n')
  const idAndSets = strLines.map((line) => {
    const lineAsArray = line.split(':')
    const gameId = Number(lineAsArray[0].match(/[0-9]{1,3}/g))
    const setList = lineAsArray[1].split(';').map((set) => { set.split(',') })
   })
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const gamesData: Game[] = strToGameArr(input)
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
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8
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
