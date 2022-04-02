import { useState } from 'react';

export type RubiksCubeState = {
  cornerPermutation: number[];
  cornerOrientation: number[];
  edgePermutation: number[];
  edgeOrientation: number[];
}

export const SOLVED = {
  cornerPermutation: [0, 1, 2, 3, 4, 5, 6, 7],
  cornerOrientation: [0, 0, 0, 0, 0, 0, 0, 0],
  edgePermutation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  edgeOrientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
} as RubiksCubeState;

export const move = (current: RubiksCubeState, move: RubiksCubeState): RubiksCubeState => {
  return {
    cornerPermutation: move.cornerPermutation.map(cp => current.cornerPermutation[cp]),
    cornerOrientation: move.cornerPermutation.map((cp, index) => (current.cornerOrientation[cp] + move.cornerOrientation[index]) % 3),
    edgePermutation: move.edgePermutation.map(ep => current.edgePermutation[ep]),
    edgeOrientation: move.edgePermutation.map((ep, index) => (current.edgeOrientation[ep] + move.edgeOrientation[index]) % 2),
  } as RubiksCubeState;
};

type Move = Readonly<RubiksCubeState>;

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

export const useRubiksCube = () => {
  const [state, setState] = useState(SOLVED);

};
