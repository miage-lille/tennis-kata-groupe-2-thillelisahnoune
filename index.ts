import { Player } from './types/player';
import { advantage, deuce, Forty, forty, game, love, Point, PointsData, pointToNumber, Score, thirty } from './types/score';
// import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
// import { pipe } from 'fp-ts/lib/function';

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};
// Exercice 1 :
export const pointToString = (point: Point): string =>{
  switch (point.kind) {
    case 'LOVE':
      return "Love";
    case 'FIFTEEN':
      return "Fifteen";
    case 'THIRTY':
      return "Thirty";
    default:
      throw new Error("Invalid point value");
  }
};
  

export const scoreToString = (score: Score): string =>
  {
    if (!('kind' in score)) {
      throw new Error("Invalid score type");
    }
    switch (score.kind) {
      case 'POINTS':
        return `${pointToString(score.pointsData.PLAYER_ONE)} - ${pointToString(score.pointsData.PLAYER_TWO)}`;
      case 'GAME':
        return `Game ${playerToString(score.player)}`;
      case 'DEUCE':
        return "Deuce";
      case 'FORTY':
        return `Forty ${playerToString(score.player)} - ${pointToString(score.opponentPoints)}`;
      case 'ADVANTAGE':
        return `Advantage ${playerToString(score.player)}`;
      default:
        throw new Error("Invalid score state");
    }
  };

export const scoreWhenDeuce = (winner: Player): Score => {
  return advantage(winner);
};

export const scoreWhenAdvantage = (
  advantagedPlayer: Player,
  winner: Player
): Score => {
  if (advantagedPlayer === winner) {
    return game(winner); 
  }
  return deuce();
};

export const scoreWhenForty = (
  currentForty: Forty, // TO UPDATE WHEN WE KNOW HOW TO REPRESENT FORTY
  winner: Player
): Score => {
  if (currentForty.player === winner) {
    return game(winner); 
  }

  if (pointToNumber(currentForty.opponentPoints) === 30) {
    return deuce(); 
  }

  return forty(currentForty.player, thirty());
};

export const scoreWhenGame = (winner: Player): Score => {
  throw new Error('not implemented');
};

// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  throw new Error('not implemented');
};

export const score = (currentScore: Score, winner: Player): Score => {
  throw new Error('not implemented');
};
