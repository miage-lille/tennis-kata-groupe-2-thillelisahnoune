import { describe, expect, test } from '@jest/globals';
import { otherPlayer, playerToString, scoreWhenPoint } from '..';
import { pointToString, scoreToString } from '..';
import { Score, game, deuce, forty, advantage, points, love, fifteen, thirty } from '../types/score';
import * as fc from 'fast-check';
import { scoreWhenDeuce, scoreWhenAdvantage, scoreWhenForty } from '../index';
import * as G from './generators';
import { isSamePlayer } from '../types/player';

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
  test('Given deuce, score is advantage to winner', () => {
    fc.assert(
      fc.property(G.getPlayer(), winner => {
        const score = scoreWhenDeuce(winner);
        const scoreExpected = advantage(winner);
        expect(score).toStrictEqual(scoreExpected);
      })
    );
  });
  test('Given advantage when advantagedPlayer wins, score is Game avantagedPlayer', () => {
    fc.assert(
      fc.property(G.getPlayer(), G.getPlayer(), (advantagedPlayer, winner) => {
        const score = scoreWhenAdvantage(advantagedPlayer, winner);
        const scoreExpected = game(winner);
        fc.pre(isSamePlayer(advantagedPlayer, winner));
        expect(score).toStrictEqual(scoreExpected);
      })
    );
  });
  test('Given advantage when otherPlayer wins, score is Deuce', () => {
    fc.assert(
      fc.property(G.getPlayer(), G.getPlayer(), (advantagedPlayer, winner) => {
        fc.pre(!isSamePlayer(advantagedPlayer, winner));
        const score = scoreWhenAdvantage(advantagedPlayer, winner);
        const scoreExpected = deuce();
        expect(score).toStrictEqual(scoreExpected);
      })
    );
  });
  test('Given a player at 40 when the same player wins, score is Game for this player', () => {
    // fc.assert(
    //   fc.property(G.getForty(), G.getPlayer(), ({ fortyData }, winner) => {
    //     // Player who have forty points wins
    //     fc.pre(isSamePlayer(forty.playerData, winner));
    //     const score = scoreWhenForty(fortyData, winner);
    //     const scoreExpected = game(winner);
    //     expect(score).toStrictEqual(scoreExpected);
    //   })
    // );
    console.log('To fill when we will know how represent Forty');
  });
  test('Given player at 40 and other at 30 when other wins, score is Deuce', () => {
    fc.assert(
      fc.property(G.getForty(), G.getPlayer(), (forty, winner) => { 
        fc.pre(!isSamePlayer(forty.player, winner));
        fc.pre(forty.opponentPoints.kind === 'THIRTY');
        const score = scoreWhenForty(forty, winner);
        const scoreExpected = deuce();
        expect(score).toStrictEqual(scoreExpected);
      })
    );
    console.log('To fill when we will know how represent Forty');
  });
  test('Given player at 40 and other at 15 when other wins, score is 40 - 15', () => {
    fc.assert(
      fc.property(G.getForty(), G.getPlayer(), (forty, winner) => { 
        fc.pre(isSamePlayer(forty.player, winner));
        const score = scoreWhenForty(forty, winner);
        const scoreExpected = game(winner);
        expect(score).toStrictEqual(scoreExpected);
      })
    );
    console.log('To fill when we will know how represent Forty');
  });
  // -------------------------TESTS POINTS-------------------------- //
  test('Given players at 0 or 15 points score kind is still POINTS', () => {
    fc.assert(
      fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
        const newScore = scoreWhenPoint(pointsData, winner);
        expect(newScore.kind).toBe('POINTS');
      })
    );
  });
  test('Given one player at 30 and win, score kind is forty', () => {
    fc.assert(
      fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
        // Vérifier que si un joueur a 30 et gagne, il passe à 40
        if (pointsData[winner].kind === 'THIRTY') {
          const newScore = scoreWhenPoint(pointsData, winner);
          expect(newScore.kind).toBe('FORTY');
          // expect(newScore.player).toBe(winner);
        }
      })
    );
  });
});


describe('Tests fpour les deux fonctions de Exercice 1', () => {
  test('Convert points to string', () => {
    expect(pointToString(love())).toBe("Love");
  expect(pointToString(fifteen())).toBe("Fifteen");
  expect(pointToString(thirty())).toBe("Thirty");
  });
});

describe('Tests for scoreToString', () => {
  test('Convert Points to string', () => {
    const score: Score = points(fifteen(), thirty());
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
    const score: Score = forty('PLAYER_ONE', thirty());
    expect(scoreToString(score)).toBe("Forty Player 1 - Thirty");
  });

  test('Convert Advantage to string', () => {
    const score: Score = advantage('PLAYER_TWO');
    expect(scoreToString(score)).toBe("Advantage Player 2");
  });
});

