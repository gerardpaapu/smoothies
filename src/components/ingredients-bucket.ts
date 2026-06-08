import type { Entity } from '../entities/index.js';
import type { IngredientName } from '../utils/recipes.js';

import * as Component from '../lib/component.js';

type T = {
  ingredient: IngredientName;
  amount: number;
  usedBy: Entity;
};

const IngredientsBucket = Component.create<T>('Ingredients bucket');
export default IngredientsBucket;
