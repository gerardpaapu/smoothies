import type { Entity } from '../entities/index.js';
import * as Component from '../lib/component.js';
import type { Order } from '../utils/order.js';
import type { Ingredients } from '../utils/recipes.js';

export type T = {
  order: Order;
  collected: Ingredients;
  using: Entity;
  mixed: number;
};

const MakingAnOrder = {
  ...Component.create<T>('MakingAnOrder'),

  server: (order: Order): T => ({
    order,
    collected: Object.create(null),
    using: -1,
    mixed: 0,
  }),
};

export default MakingAnOrder;
