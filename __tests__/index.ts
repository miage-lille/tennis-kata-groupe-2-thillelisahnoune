import { describe, expect, test } from '@jest/globals';
import { otherPlayer, playerToString } from '..';
import { pointToString, scoreToString } from '..';
import { Score, game, deuce, forty, advantage, points } from '../types/score';
// import * as fc from 'fast-check';

// import * as G from './generators';

describe('Tests for tooling functions', () => {
  test('Given playerOne when playerToString', () => {
    expect(playerToString('PLAYER_ONE')).toStrictEqual('Player 1');
  });

  test('Given playerOne when otherPlayer', () => {
    expect(otherPlayer('PLAYER_ONE')).toStrictEqual('PLAYER_TWO');
  });
});

describe('Tests for transition functions', () => {
  // test('Given deuce, score is advantage to winner', () => {
  //   console.log('To fill when we will know how represent Deuce');
  // });
  // test('Given advantage when advantagedPlayer wins, score is Game avantagedPlayer', () => {
  //   console.log('To fill when we will know how represent Advantage');
  // });
  // test('Given advantage when otherPlayer wins, score is Deuce', () => {
  //   console.log('To fill when we will know how represent Advantage');
  // });
  // test('Given a player at 40 when the same player wins, score is Game for this player', () => {
  //   console.log('To fill when we will know how represent Forty');
  // });
  // test('Given player at 40 and other at 30 when other wins, score is Deuce', () => {
  //   console.log('To fill when we will know how represent Forty');
  // });
  // test('Given player at 40 and other at 15 when other wins, score is 40 - 15', () => {
  //   console.log('To fill when we will know how represent Forty');
  // });
  // -------------------------TESTS POINTS-------------------------- //
  // test('Given players at 0 or 15 points score kind is still POINTS', () => {
  // fc.assert(
  //   fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
  //     throw new Error(
  //       'Your turn to code the preconditions, expected result and test.'
  //     );
  //   })
  // );
  // });
  // test('Given one player at 30 and win, score kind is forty', () => {
  // fc.assert(
  //   fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
  //     throw new Error(
  //       'Your turn to code the preconditions, expected result and test.'
  //     );
  //   })
  // );
  // });
});


describe('Tests fpour les deux fonctions de Exercice 1', () => {
  test('Convert points to string', () => {
    expect(pointToString(0)).toBe("Love");
    expect(pointToString(15)).toBe("Fifteen");
    expect(pointToString(30)).toBe("Thirty");
    expect(pointToString(40)).toBe("Forty");
  });
});

describe('Tests for scoreToString', () => {
  test('Convert Points to string', () => {
    const score: Score = points(15, 30);
    expect(scoreToString(score)).toBe("Fifteen - Thirty");
  });

  test('Convert Game to string', () => {
    const score: Score = game('PLAYER_ONE');
    expect(scoreToString(score)).toBe("Game Player 1");
  });

  test('Convert Deuce to string', () => {
    const score: Score = deuce();
    expect(scoreToString(score)).toBe("Deuce");
  });

  test('Convert Forty to string', () => {
    const score: Score = forty('PLAYER_ONE', 30);
    expect(scoreToString(score)).toBe("Forty Player 1 - Thirty");
  });

  test('Convert Advantage to string', () => {
    const score: Score = advantage('PLAYER_TWO');
    expect(scoreToString(score)).toBe("Advantage Player 2");
  });
});

