// Screen Space is 256x224 like a super nintendo
// top left is 0,0 and bottom right in 255, 223

import { type Position, Direction } from './location';

// this should be slightly off screen
export const Entrance: Position = {
  x: -16,
  y: 168,
  d: Direction.RIGHT,
};

// slightly off screen
export const Exit: Position = {
  x: 350,
  y: 168,
  d: Direction.RIGHT,
};

export const QueueHead: Position = {
  x: 96,
  y: 192,
  d: Direction.RIGHT,
};

export const GivingOrder: Position = {
  x: 112,
  y: 224,
  d: Direction.UP,
};

export const OrdersCounter: Position = {
  x: 112,
  y: 160,
  d: Direction.DOWN,
};

export const WaitingArea: Position = {
  x: 200,
  y: 212,
  d: Direction.UP,
};
