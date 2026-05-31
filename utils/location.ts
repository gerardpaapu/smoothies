export type Location = {
  x: number;
  y: number;
};

export type Position = {
  x: number;
  y: number;
  d: Direction;
};

export const Direction = {
  RIGHT: 0,
  DOWN: 1,
  LEFT: 2,
  UP: 3,
} as const;

type Direction = (typeof Direction)[keyof typeof Direction];
