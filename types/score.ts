import { Player } from './player';

// Surely not the best choice
// export type Point = number;
export type Point =  Love | Fifteen | Thirty;


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

export const pointToNumber = (point: Point): number => {
  switch (point.kind) {
    case 'LOVE':
      return 0;
    case 'FIFTEEN':
      return 15;
    case 'THIRTY':
      return 30;
    default:
      throw new Error("Invalid Point type");
  }
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

// Autre definitions 
// ✅ Définition pour "Love" (0 point)
export type Love = {
  kind: 'LOVE';
};
export const love = (): Love => ({ kind: 'LOVE' });

// ✅ Définition pour "Fifteen" (15 points)
export type Fifteen = {
  kind: 'FIFTEEN';
};
export const fifteen = (): Fifteen => ({ kind: 'FIFTEEN' });

// ✅ Définition pour "Thirty" (30 points)
export type Thirty = {
  kind: 'THIRTY';
};
export const thirty = (): Thirty => ({ kind: 'THIRTY' });


export const forty = (player: Player, opponentPoints: Point): Forty => {
  if (pointToNumber(opponentPoints) > 30) {
    throw new Error("Invalid score: opponent cannot have more than 30 points in a 'FORTY' state.");
  }
  return {
    kind: 'FORTY',
    player,
    opponentPoints,
  };
};


// Représente un joueur ayant 40 points et le score de l'autre joueur.
export type FortyData = {
  player: Player; // Le joueur qui a 40 points
  otherPoint: Point; // Score de l'autre joueur (Love, Fifteen, Thirty)
};

export const fortyData = (player: Player, otherPoint: Point): FortyData => ({
  player,
  otherPoint,
});



export type Score = Points | Game | Deuce | Forty | Advantage  ;
