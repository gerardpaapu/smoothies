import { Entity } from '../entities';
import * as Component from '../lib/component';
import { IngredientName } from '../utils/recipes';

type T = {
  ingredient: IngredientName;
  amount: number;
  usedBy: Entity;
};

export default Component.create<T>('Ingredients bucket');
