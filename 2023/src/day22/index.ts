import run from 'aocrunner';
type Position = {
  x: number,
  y: number,
  z: number
}

type Brick = {
  front: Position,
  back: Position,
}

enum Axes {
  X = 0,
  Y,
  Z
}

enum End {
  Front = 0,
  Back
}

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((line) => {
    return line.split('~').map((end) => {
      return end.split(',').map((char) => Number(char));
    });
  });
};

const getSafeBricks = (input: number[][][]) => {

};

const isBrickSafe = () => {

};

const getSurface = () => {}

const finalPosition = (sortedBricks: number[][][], landedBricks: number[][][], index : number) => {
  const brick = sortedBricks[index]

  const revLandedBricks = landedBricks.reverse()
  for (let i = 0; i < revLandedBricks.length; i++) {
    const topBrick = revLandedBricks[i];

    
  }
  
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  const sortedBricks = input.toSorted((a, b) => a[End.Front][Axes.Z] - b[End.Front][Axes.Z]);
  
  const landedBricks = []
  // let bricks fall
  for (let i = 0; i < sortedBricks.length; i++) {
    const brick = sortedBricks[i];
    if (landedBricks.length === 0) {
      
    }
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
          `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9
`,
        expected: 5,
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
