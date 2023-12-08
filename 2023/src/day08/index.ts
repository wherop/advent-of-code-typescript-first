import run from 'aocrunner';

enum Direction {
  Left = 'L',
  Right = 'R'
}

const START_NODE = 'AAA';
const EXIT_NODE = 'ZZZ';
const LOOP_LIMIT = 500;

let nodeDict = {}

function parseInput(rawInput: string) {
  const inputArr = rawInput.split('\n');
  const instructions = inputArr[0].split('');
  const nodesStr = inputArr.slice(2);
  const nodesArr = nodesStr.map((node) => {
    const arr = node.match(/[A-Z]{3}/g) as string[];

  });
  return [instructions, nodesArr];
};

function readDir(dirIndex: number, instructions: string[]) {
  return instructions[dirIndex];
}

function visitNode(nodeName: string, nodes: string[][]) {

}

function traverseGraph(instructions: string[], nodes: string[][]) {
  // while exit not found
  // repeat:
  // - reading instructions
  // - visit node -> return visble nodes (start with start node)
  // count node visits
  // count instruction loops
  let exitFound = false;
  let instructionLoops = 0;
  let nodeVisits = 0;
  let dirIndex = 0;
  let nextDir = '';
  let currentNodeName = START_NODE;
  let currentNodeIndex = 0;

  if (dirIndex >= instructions.length) {
    dirIndex = 0
    instructionLoops++
  }
  nextDir = readDir(dirIndex, instructions);
  dirIndex++
  

  while (!exitFound) {
    
  }
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input[0] as string[];
  const nodes = input[1] as string[][];



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
        input: `RL

        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
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
