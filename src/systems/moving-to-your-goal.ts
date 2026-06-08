import Position from '../components/position.js';
import Goal from '../components/goal.js';

import { Direction } from '../utils/location.js';
import { WALKING_SPEED } from '../utils/config.js';
import type { QueryResults } from '../lib/system.js';

export function defineQueries() {
  return { movers: [Position, Goal] };
}

// const index = buildIndex([Position, Goal]);

export function initialise() {}

export function update({ movers }: QueryResults<typeof defineQueries>) {
  for (const entity of movers) {
    const location = Position.get(entity)!;
    const goal = Goal.get(entity);

    if (!(location && goal)) {
      continue;
    }

    let towardGoal = [] as (typeof location)[];

    // TODO: add some random elements to make
    // the walk look more natural
    if (goal.x > location.x) {
      towardGoal.push({ x: WALKING_SPEED, y: 0, d: Direction.RIGHT });
    }

    if (goal.y > location.y) {
      towardGoal.push({ x: 0, y: WALKING_SPEED, d: Direction.DOWN });
    }

    if (goal.x < location.x) {
      towardGoal.push({ x: -WALKING_SPEED, y: 0, d: Direction.LEFT });
    }

    if (goal.y < location.y) {
      towardGoal.push({ x: 0, y: -WALKING_SPEED, d: Direction.UP });
    }

    if (towardGoal.length === 0) {
      // we're at the goal
      location.d = goal.d;
      continue;
    }

    let best = towardGoal.find((_) => _.d === location.d);
    if (best && Math.random() < 0.7) {
      location.d = best.d;
      location.x += best.x;
      location.y += best.y;
      continue;
    }

    const movement = towardGoal[(Math.random() * towardGoal.length) >>> 0]!;
    location.d = movement.d;
    location.x += movement.x;
    location.y += movement.y;
  }
}
