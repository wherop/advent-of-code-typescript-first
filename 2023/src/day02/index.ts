import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

// type GameDraw = {
//   red: number,
//   green: number,
//   blue: number;
// };

type GameDraw = {
  [color: string]: number,
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



function maxOfDraws(maxValues: GameDraw, draw: GameDraw): GameDraw {
  for (const color in maxValues) {
    if (maxValues[color] < draw[color]) {
      maxValues[color] = draw[color];
    }
  }
  return maxValues;
}

function getMinSet(game: GameDraw[]): GameDraw {
  let maxValues: GameDraw = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (let draw of game) {
    maxValues = maxOfDraws(maxValues, draw);
  }
  return maxValues
}

function getPowerOfSet(set: GameDraw): number {
  let power: number = 1
  for (const color in set) {
    power = power * set[color]
  }
  return power
}

function getPowers(games: GameDraw[][]): number[] {
  return games.map((game) => {
    const minSet = getMinSet(game);
    const power = getPowerOfSet(minSet);
    return power;
  });
}



const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const games: GameDraw[][] = parseInputToGameArr(input);

  const powers = getPowers(games)
  return powers.reduce((sum, current) => sum + current);
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
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
