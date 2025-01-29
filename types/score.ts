import { Player } from './player';

// Surely not the best choice
export type Point = number;

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export const points = (
  playerOnePoints: Point,
  playerTwoPoints: Point
): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});

// Exerice 0: Write all type constructors of Points, Deuce, Forty and Advantage types.

export type Game = {
  kind: 'GAME';
  player: Player; // Player has won
};

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});


// Constructeur de Deuce
export type Deuce = {
  kind: 'DEUCE';
};

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});


// Constructeur de Forty 
export type Forty = {
  kind: 'FORTY';
  player: Player; // Qui a 40 points
  opponentPoints: Point; // Points de l'autre joueur (30 max)
};

export const forty = (player: Player, opponentPoints: Point): Forty => {
  if (opponentPoints > 30) {
    throw new Error("Invalid score: opponent cannot have more than 30 points in a 'FORTY' state.");
  }
  return {
    kind: 'FORTY',
    player,
    opponentPoints,
  };
};



// Constructeur de Advantage 
export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player; // Qui a l'avantage
};

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});


export type Score = Points | Game | Deuce | Forty | Advantage;
