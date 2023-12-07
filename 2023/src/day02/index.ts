import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

type GameDraw = {
  red: number,
  green: number,
  blue: number;
};

function parseDraw(drawStr: string): GameDraw {
  let draw: GameDraw = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const setListStr = drawStr
    .split(',')
    .forEach((setStr) => {
      if (setStr.includes('red')) {
        draw.red = Number(setStr.match(/\d{1,2}/));
      }
      if (setStr.includes('green')) {
        draw.green = Number(setStr.match(/\d{1,2}/));
      }
      if (setStr.includes('blue')) {
        draw.blue = Number(setStr.match(/\d{1,2}/));
      }
    });

  return draw;
}

function parseGameContent(drawStrList: string): GameDraw[] {
  const gameContent = drawStrList
    .split(';')
    .map((drawStr) => {
      const draw = parseDraw(drawStr);
      return draw;
    });

  return gameContent;
}

function parseInputToGameArr(input: string): GameDraw[][] {
  const gameArr = input.split('\n').map((lineStr) => {
    const game = parseGameContent(lineStr.split(':')[1]);
    return game;
  });

  return gameArr;
}

function isPossible(game: GameDraw[], limit: GameDraw): boolean {
  for (let draw of game) {
    if (
      draw.red > limit.red ||
      draw.green > limit.green ||
      draw.blue > limit.blue
    ) {
      return false;
    }
  }
  return true;
}

function getPossibleIndices(games: GameDraw[][], limit: GameDraw) {
  let possibleIndices: number[] = [];
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    if (isPossible(game, limit)) {
      possibleIndices.push(i + 1);
    }
  }
  return possibleIndices;
}



const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const drawLimit: GameDraw = {
    red: 12,
    green: 13,
    blue: 14
  };

  const games: GameDraw[][] = parseInputToGameArr(input);
  const possibleGames = getPossibleIndices(games, drawLimit);

  return possibleGames.reduce(
    (partialSum: number, currentValue: number) => partialSum + currentValue
  );
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
  onlyTests: false,
});
