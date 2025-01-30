import { Player } from './types/player';
import { Advantage, advantage, deuce, fifteen, Forty, forty, Game, game, love, Point, Points, points, PointsData, pointToNumber, Score, thirty } from './types/score';
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
        return `Game ${playerToString((score as Game).player)}`;
      case 'DEUCE':
        return "Deuce";
      case 'FORTY':
        return `Forty ${playerToString((score as Forty).player)} - ${pointToString((score as Forty).opponentPoints)}`;
      case 'ADVANTAGE':
        return `Advantage ${playerToString((score as Advantage).player)}`;
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

export const scoreWhenGame = (winner: Player): Score => game(winner)

// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const winnerPoint = current[winner];
  const opponentPoint = current[otherPlayer(winner)];

  // Si le joueur gagne et qu'il était à 30, il passe à 40
  if (winnerPoint.kind === "THIRTY") {
    return forty(winner, opponentPoint); // ✅ Retourne `Forty` directement
  }

  // Sinon, on augmente normalement le score
  const nextPoint =
    winnerPoint.kind === "LOVE" ? fifteen() :
    winnerPoint.kind === "FIFTEEN" ? thirty() :
    winnerPoint; // Si déjà 30, on ne change pas (évite bug FORTY immédiat)

  return points(
    winner === "PLAYER_ONE" ? nextPoint : current.PLAYER_ONE,
    winner === "PLAYER_TWO" ? nextPoint : current.PLAYER_TWO
  );
};

export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint((currentScore as Points).pointsData, winner);    
    case 'FORTY':
      return scoreWhenForty(currentScore as Forty, winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage((currentScore as Advantage).player, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'GAME':
      return scoreWhenGame((currentScore as Game).player);
    default:
      throw new Error('Invalid game state');
  }
};
