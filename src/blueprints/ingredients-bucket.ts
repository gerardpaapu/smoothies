import * as Entities from '../entities/index.js';
import IngredientsBucket from '../components/ingredients-bucket.js';
import Position from '../components/position.js';
import type { Position as TPosition } from '../utils/location.js';
import type { IngredientName } from '../utils/recipes.js';
import SpriteName from '../components/sprite-name.js';

export function create(ingredient: IngredientName, position: TPosition) {
  const entity = Entities.create();

  IngredientsBucket.add(entity, {
    ingredient,
    amount: Infinity,
    usedBy: -1,
  });

  SpriteName.add(entity, { spritename: 'bucket' });

  Position.add(entity, position);
}
