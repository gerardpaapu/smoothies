import * as Component from '../lib/component.js';
import type { Recipe } from '../utils/recipes.js';

export type T = {
  order: Recipe;
};

const WaitingForAnOrder = Component.create<T>('Waiting for an order');
export default WaitingForAnOrder;
