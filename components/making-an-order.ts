import { Entity } from '../entities';
import * as Component from '../lib/component';
import type { Recipe } from '../utils/recipes';

export type T = {
  order: Recipe & { customer: Entity };
  workLeft: number;
};

export default Component.create<T>('MakingAnOrder');
