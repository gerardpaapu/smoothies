import { Entity } from '../entities';
import * as Component from '../lib/component';
import { IngredientName } from '../utils/recipes';

type T = {
  ingredient: IngredientName;
  amount: number;
  usedBy: Entity;
};

const IngredientsBucket = Component.create<T>('Ingredients bucket');
export default IngredientsBucket;
