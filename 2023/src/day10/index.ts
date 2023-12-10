import run from 'aocrunner';
import { Console } from 'console';

type Coordinates = {
  y: number,
  x: number,
};

enum Directions {
  N = 0,
  E,
  S,
  W,
}

enum TileChar {
  NS = '|',
  EW = '-',
  NE = 'L',
  NW = 'J',
  SW = '7',
  SE = 'F',
  ANIMAL = 'S'
}

type Pipe = {
  tileChar: TileChar | string;
  coord: Coordinates;
  connect: {
    N: boolean;
    E: boolean;
    S: boolean;
    W: boolean;
  };
};



const ANIMAL = 'S';
const ORIGIN: Coordinates = { y: 0, x: 0 };
const MOVE = {
  N: { y: -1, x: 0 },
  E: { y: 0, x: 1 },
  S: { y: 1, x: 0 },
  W: { y: 0, x: -1 },
};

class Vector {
  add(coord1: Coordinates, coord2: Coordinates = ORIGIN): Coordinates {
    return {
      y: coord2.y + coord1.y,
      x: coord2.x + coord1.x,
    };
  }
  subtract(coord1: Coordinates, coord2: Coordinates = ORIGIN): Coordinates {
    return {
      y: coord2.y - coord1.y,
      x: coord2.x - coord1.x,
    };
  }
  scalarMultiply(coord: Coordinates, scalar: number): Coordinates {
    return {
      y: coord.y * scalar,
      x: coord.x * scalar,
    };
  }
}

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((line) => line.split(''));
};

const part1 = (rawInput: string) => {
  const field = parseInput(rawInput);

  const getCharByCoord = (coord: Coordinates): string => {
    return field[coord.y][coord.x];
  };

  // [y, x]
  const getCoordOf = (char: string): Coordinates | null => {
    for (let y = 0; y < field.length; y++) {
      const row = field[y];
      let x: number;
      if (row.includes(char)) {
        x = row.indexOf(char);
        return { y, x };
      }
    }
    return null;
  };

  const parseTileAt = (coord: Coordinates): Pipe => {
    const char = getCharByCoord(coord);
    let n, e, s, w;
    switch (char) {
      case TileChar.NS:
        n = 1;
        e = 0;
        s = 1;
        w = 0;
        break;

      case TileChar.EW:
        n = 0;
        e = 1;
        s = 0;
        w = 1;
        break;

      case TileChar.NE:
        n = 1;
        e = 1;
        s = 0;
        w = 0;
        break;

      case TileChar.NW:
        n = 1;
        e = 0;
        s = 0;
        w = 1;
        break;

      case TileChar.SW:
        n = 0;
        e = 0;
        s = 1;
        w = 1;
        break;

      case TileChar.SE:
        n = 0;
        e = 1;
        s = 1;
        w = 0;
        break;

      case TileChar.ANIMAL:
        n = 1;
        e = 1;
        s = 1;
        w = 1;
        break;

      default:
        n = 0;
        s = 0;
        e = 0;
        w = 0;
        break;
    }

    const tile: Pipe = {
      tileChar: char,
      coord: coord,
      connect: {
        S: !!s,
        E: !!e,
        N: !!n,
        W: !!w,
      }
    };
    return tile;
  };

  const getTileToDir = (dir: Directions, coord: Coordinates): Pipe => {
    let newCoord: Coordinates = coord;
    switch (dir) {
      case Directions.N:
        newCoord.y -= 1;
        break;
      case Directions.E:
        newCoord.x += 1;
        break;
      case Directions.S:
        newCoord.y += 1;
        break;
      case Directions.W:
        newCoord.x -= 1;
        break;
      default:
        break;
    }
    return parseTileAt(newCoord);
  };

  const scanStartNeighbors = (coord: Coordinates): Pipe[] => {
    const allNeighbors = [];

    const yArr = [-1, 0, 1, 0];
    const xArr = [0, 1, 0, -1];
    // cycle through neighbors
    for (let i = 0; i < yArr.length; i++) {
      let nCoord = {
        y: coord.y + yArr[i],
        x: coord.x + xArr[i]
      };
      // const elementChar = field[elementCoord.y][elementCoord.x];
      // todo
      allNeighbors.push(parseTileAt(nCoord));
    }
    return allNeighbors;
  };

  const doTheyConnect = (coord1: Coordinates, coord2: Coordinates): boolean => {
    const pipe1 = parseTileAt(coord1).connect;
    const pipe2 = parseTileAt(coord2).connect;

    if ((coord1.y - 1 === coord2.y) && pipe1.N && pipe2.S) {
      return true;
    }
    if ((coord1.x + 1 === coord2.x) && pipe1.E && pipe2.W) {
      return true;
    }
    if ((coord1.y + 1 === coord2.y) && pipe1.S && pipe2.N) {
      return true;
    }
    if ((coord1.x - 1 === coord2.x) && pipe1.W && pipe2.E) {
      return true;
    }
    return false;
  };

  const findNextInLoop = (currPipe: Pipe, visited: Pipe[]) => {

  };


  const sCoord = getCoordOf(ANIMAL) ?? { y: 0, x: 0 };
  const allNeighbors = scanStartNeighbors(sCoord);

  const connectingNeighbours = allNeighbors.filter((neighbor) => doTheyConnect(sCoord, neighbor.coord));



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
          `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`,
        expected: 4,
      },
      {
        input:
          `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
        expected: 8,
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
