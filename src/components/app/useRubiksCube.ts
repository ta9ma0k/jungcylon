import { useCallback, useState } from 'react';

export type CornerPermutation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type CornerOrientation = 0 | 1 | 2;
export type EdgePermutation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type EdgeOrientation = 0 | 1;

export type RubiksCube = {
  cornerPermutation: CornerPermutation[];
  cornerOrientation: CornerOrientation[];
  edgePermutation: EdgePermutation[];
  edgeOrientation: EdgeOrientation[];
}

export const SOLVED = {
  cornerPermutation: [0, 1, 2, 3, 4, 5, 6, 7],
  cornerOrientation: [0, 0, 0, 0, 0, 0, 0, 0],
  edgePermutation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  edgeOrientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
} as RubiksCube;

export const moveCube = (current: RubiksCube, move: RubiksCube): RubiksCube => {
  return {
    cornerPermutation: move.cornerPermutation.map(cp => current.cornerPermutation[cp]),
    cornerOrientation: move.cornerPermutation.map((cp, index) => (current.cornerOrientation[cp] + move.cornerOrientation[index]) % 3),
    edgePermutation: move.edgePermutation.map(ep => current.edgePermutation[ep]),
    edgeOrientation: move.edgePermutation.map((ep, index) => (current.edgeOrientation[ep] + move.edgeOrientation[index]) % 2),
  } as RubiksCube;
};

const moveByMoveName = (current: RubiksCube, moveName: MoveName): RubiksCube => {
  if (moveName.match(/[UDLRFB]'/)) {
    return moveCube(moveCube(moveCube(current, MOVES[moveName[0]]), MOVES[moveName[0]]), MOVES[moveName[0]]);
  } else {
    return moveCube(current, MOVES[moveName]);
  }
};

type Move = Readonly<RubiksCube>;

export const MOVES = {
  'U': {
    cornerPermutation: [3, 0, 1, 2, 4, 5, 6, 7],
    cornerOrientation: [0, 0, 0, 0, 0, 0, 0, 0],
    edgePermutation: [0, 1, 2, 3, 7, 4, 5, 6, 8, 9, 10, 11],
    edgeOrientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  'D': {
    cornerPermutation: [0, 1, 2, 3, 5, 6, 7, 4],
    cornerOrientation: [0, 0, 0, 0, 0, 0, 0, 0],
    edgePermutation: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 8],
    edgeOrientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  'L': {
    cornerPermutation: [4, 1, 2, 0, 7, 5, 6, 3],
    cornerOrientation: [2, 0, 0, 1, 1, 0, 0, 2],
    edgePermutation: [11, 1, 2, 7, 4, 5, 6, 0, 8, 9, 10, 3],
    edgeOrientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  'R': {
    cornerPermutation: [0, 2, 6, 3, 4, 1, 5, 7],
    cornerOrientation: [0, 1, 2, 0, 0, 2, 1, 0],
    edgePermutation: [0, 5, 9, 3, 4, 2, 6, 7, 8, 1, 10, 11],
    edgeOrientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  'F': {
    cornerPermutation: [0, 1, 3, 7, 4, 5, 2, 6],
    cornerOrientation: [0, 0, 1, 2, 0, 0, 2, 1],
    edgePermutation: [0, 1, 6, 10, 4, 5, 3, 7, 8, 9, 2, 11],
    edgeOrientation: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
  },
  'B': {
    cornerPermutation: [1, 5, 2, 3, 0, 4, 6, 7],
    cornerOrientation: [1, 2, 0, 0, 2, 1, 0, 0],
    edgePermutation: [4, 8, 2, 3, 1, 5, 6, 7, 0, 9, 10, 11],
    edgeOrientation: [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  },
} as { [key: string]: Move };

export type MoveName = 'U' | 'U\'' | 'D' | 'D\'' | 'L' | 'L\'' | 'R' | 'R\'' | 'F' | 'F\'' | 'B' | 'B\''

export const MOVE_NAMES = ['U', 'U\'', 'D', 'D\'', 'L', 'L\'', 'R', 'R\'', 'F', 'F\'', 'B', 'B\''] as MoveName[];

export type MoveArea = {
  corner: boolean[];
  edge: boolean[];
}

export const getMoveArea = (moveName: MoveName): MoveArea => {
  const move = MOVES[moveName[0]];
  return {
    corner: SOLVED.cornerPermutation.map((c, i) => c !== move.cornerPermutation[i]),
    edge: SOLVED.edgePermutation.map((e, i) => e !== move.edgePermutation[i]),
  };
};

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const useRubiksCube = (initialState = SOLVED) => {
  const [state, setState] = useState(initialState);
  const [progress, setProgress] = useState<number>(100);

  const scramble = useCallback(() => {
    setState({
      cornerPermutation: shuffle(SOLVED.cornerPermutation),
      cornerOrientation: shuffle(SOLVED.cornerOrientation),
      edgePermutation: shuffle(SOLVED.edgePermutation),
      edgeOrientation: shuffle(SOLVED.edgeOrientation),
    });
  }, []);

  const moveByCommand = useCallback((command: string) => {
    const results = command.toUpperCase().match(/[UDLRFB]'|[UDLRFB]/g);
    results?.forEach((c, i) => {
      setTimeout(() => {
        setState(s => moveByMoveName(s, c as MoveName));
        setProgress((i + 1) / results.length * 100);
      }, 500 * i);
    });
  }, []);

  return { cube: state, progress, scramble, moveByCommand };
};
