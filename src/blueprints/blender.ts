import * as Entities from '../entities/index.js';

import Blender from '../components/blender.js';
import Position from '../components/position.js';
import { Direction } from '../utils/location.js';
import SpriteName from '../components/sprite-name.js';

export function create() {
  const entity = Entities.create();
  Blender.add(entity, { usedBy: -1 });

  SpriteName.add(entity, { spritename: 'blender' });

  Position.add(entity, {
    x: 70 - 30,
    y: 100,
    d: Direction.DOWN,
  });
}
