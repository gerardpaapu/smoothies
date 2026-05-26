import * as Component from '../lib/component';
import type { Recipe } from '../utils/recipes';

export type T = {
  order: Recipe;
};

export default Component.create<T>('Waiting for an order');
