import { Entity } from '../entities';
import * as Component from '../lib/component';
import type { Order } from '../utils/order';
import { Ingredients } from '../utils/recipes';

export type T = {
  order: Order;
  collected: Ingredients;
  using: Entity;
  mixed: number;
};

export default {
  ...Component.create<T>('MakingAnOrder'),

  server: (order: Order): T => ({
    order,
    collected: Object.create(null),
    using: -1,
    mixed: 0,
  }),
};
