import Position from '../components/position';
import Goal from '../components/goal';

import buildIndex from '../lib/build-index';
import { Direction } from '../utils/location';

const index = buildIndex([Position, Goal]);

export function initialise() {}

const MOVE_SPEED = 20;

export function update() {
  for (const entity of index.getEntities()) {
    const location = Position.get(entity)!;
    const goal = Goal.get(entity);

    if (!(location && goal)) {
      continue;
    }

    // TODO: add some random elements to make
    // the walk look more natural
    if (goal.x > location.x) {
      location.d = Direction.RIGHT;
      location.x = Math.min(location.x + MOVE_SPEED, goal.x);
      continue;
    }

    if (goal.y > location.y) {
      location.d = Direction.DOWN;
      location.y = Math.min(location.y + MOVE_SPEED, goal.y);
      continue;
    }

    if (goal.x < location.x) {
      location.d = Direction.LEFT;
      location.x = Math.max(location.x - MOVE_SPEED, goal.x);
      continue;
    }

    if (goal.y < location.y) {
      location.d = Direction.UP;
      location.y = Math.max(location.y - MOVE_SPEED, goal.y);
      continue;
    }

    // we're at the goal
    location.d = goal.d;
  }
}
