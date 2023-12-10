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
  connect: Directions[];
};



const ANIMAL = 'S';
const ORIGIN: Coordinates = { y: 0, x: 0 };
const MOVE = [ // use with Diretions enum
  { y: -1, x: 0 },
  { y: 0, x: 1 },
  { y: 1, x: 0 },
  { y: 0, x: -1 },
];

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
const VECTOR = new Vector;

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((line) => line.split(''));
};

const part1 = (rawInput: string) => {
  const field = parseInput(rawInput);

  const getCharByCoord = (coord: Coordinates): string | null => {
    console.log(coord)
    const char = field[coord.y][coord.x]
    if (char != null) {
      return char
    }
    return null;
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
    const char = getCharByCoord(coord) ?? '';
    let n, e, s, w;
    let connections: Directions[];
    switch (char) {
      case TileChar.NS:
        connections = [Directions.N, Directions.S];
        break;

      case TileChar.EW:
        connections = [Directions.E, Directions.W];
        break;

      case TileChar.NE:
        connections = [Directions.N, Directions.E];
        break;

      case TileChar.NW:
        connections = [Directions.N, Directions.W];
        break;

      case TileChar.SW:
        connections = [Directions.S, Directions.W];
        break;

      case TileChar.SE:
        connections = [Directions.S, Directions.E];
        break;

      case TileChar.ANIMAL:
        connections = [Directions.N, Directions.E, Directions.S, Directions.W];
        break;

      default:
        connections = [];
        break;
    }

    const tile: Pipe = {
      tileChar: char,
      coord: coord,
      connect: connections
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

    if ((coord1.y - 1 === coord2.y) &&
      pipe1.includes(Directions.N) &&
      pipe2.includes(Directions.S)) {
      return true;
    }
    if ((coord1.x + 1 === coord2.x) &&
      pipe1.includes(Directions.E) &&
      pipe2.includes(Directions.W)) {
      return true;
    }
    if ((coord1.y + 1 === coord2.y) &&
      pipe1.includes(Directions.S) &&
      pipe2.includes(Directions.N)) {
      return true;
    }
    if ((coord1.x - 1 === coord2.x) &&
      pipe1.includes(Directions.W) &&
      pipe2.includes(Directions.E)) {
      return true;
    }
    return false;
  };

  const findNextInLoop = (currPipe: Pipe, visited: Pipe[]): Pipe | null => {
    let neighbors = [];

    for (const dir of currPipe.connect) {
      const neighborRelativeCoord = MOVE[dir];
      const neighborCoord = VECTOR.add(currPipe.coord, neighborRelativeCoord);
      if (neighborCoord.y < 0 || neighborCoord.x < 0) {
        throw new Error('Coordinate out of bounds')
      }
      const neighborPipe = parseTileAt(neighborCoord);
      neighbors.push(neighborPipe);
      if (!visited.includes(neighborPipe)) {
        return neighborPipe;
      }
    }
    return null;
  };


  const sCoord = getCoordOf(ANIMAL) ?? { y: 0, x: 0 };
  const allNeighbors = scanStartNeighbors(sCoord);

  const connectingNeighbours = allNeighbors.filter((neighbor) => doTheyConnect(sCoord, neighbor.coord));

  let head = [connectingNeighbours[0],connectingNeighbours[1]];
  let visited = [[parseTileAt(sCoord)],[parseTileAt(sCoord)]]; 

try {
  
  while (head[1] != head[0]) {
    for (let i = 0; i < head.length; i++) {
        visited[i].push(head[i])
        head[i]=findNextInLoop(head[i],visited[i])
    }
  }
} catch (error) {
  console.error(error)
}

  console.log(visited[0].slice(0,-1))
  console.log(visited[1].slice(0,-1))




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
  onlyTests: true,
});
