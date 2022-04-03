import { moveCube, MOVES, SOLVED } from './useRubiksCube';

describe('move test', () => {
  test('R', () => {
    const actual = moveCube(SOLVED, MOVES['R']);
    expect(actual.cornerPermutation).toEqual(MOVES['R'].cornerPermutation);
    expect(actual.cornerOrientation).toEqual(MOVES['R'].cornerOrientation);
    expect(actual.edgePermutation).toEqual(MOVES['R'].edgePermutation);
    expect(actual.edgeOrientation).toEqual(MOVES['R'].edgeOrientation);
  });
  test('R2', () => {
    const actual = moveCube(moveCube(SOLVED, MOVES['R']), MOVES['R']);
    expect(actual.cornerPermutation).toEqual([0, 6, 5, 3, 4, 2, 1, 7]);
    expect(actual.cornerOrientation).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(actual.edgePermutation).toEqual([0, 2, 1, 3, 4, 9, 6, 7, 8, 5, 10, 11]);
    expect(actual.edgeOrientation).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});