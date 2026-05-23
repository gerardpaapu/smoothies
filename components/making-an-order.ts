import { Entity } from '../entities';
import * as Component from '../lib/component';
import type { Recipe } from '../utils/recipes';

type CUSTOMER = 'CUSTOMER';
type SERVER = 'SERVER';

export type Role = CUSTOMER | SERVER;

export type T =
  | {
      role: CUSTOMER;
      order: Recipe;
    }
  | {
      role: SERVER;
      order: Recipe;
      forCustomer: Entity;
      workLeft: number;
    };

export default Component.create<T>('MakingAnOrder');
