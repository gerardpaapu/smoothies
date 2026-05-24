import Location from '../components/location';
import Goal from '../components/goal';

import buildIndex from '../lib/build-index';
import { Direction } from '../utils/location';

const index = buildIndex([Location, Goal]);

export function initialise() {}

export function update() {
  for (const entity of index.getEntities()) {
    const location = Location.get(entity);
    const goal = Goal.get(entity);

    if (!(location && goal)) {
      continue;
    }

    if (goal.x > location.x) {
      location.d = Direction.RIGHT;
      location.x++;
      continue;
    }

    if (goal.y > location.y) {
      location.d = Direction.DOWN;
      location.y++;
      continue;
    }

    if (goal.x < location.x) {
      location.d = Direction.LEFT;
      location.x--;
      continue;
    }

    if (goal.y < location.y) {
      location.d = Direction.UP;
      location.y--;
      continue;
    }

    // we're at the goal
    location.d = goal.d;
  }
}
