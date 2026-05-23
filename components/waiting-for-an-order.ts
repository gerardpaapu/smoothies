import { Entity } from '../entities';
import * as Component from '../lib/component';
import type { Recipe } from '../utils/recipes';

type CUSTOMER = 'CUSTOMER';
type SERVER = 'SERVER';

export type Role = CUSTOMER | SERVER;
export type T =
  | {
      role: CUSTOMER;
      // should we have a timestamp here for when they started waiting?
      order: Recipe;
    }
  | {
      role: SERVER;
      order: Recipe;
      forCustomer: Entity;
    };

export default {
  ...Component.create<T>('Waiting for an order'),
  server: (order: Recipe, forCustomer: Entity) => ({
    role: 'SERVER' as const,
    order,
    forCustomer,
  }),
};
