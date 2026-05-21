import { Entity } from '../entities';
import * as Component from '../lib/component';

type CUSTOMER = 'CUSTOMER';
type SERVER = 'SERVER';

export type Role = CUSTOMER | SERVER;

// placeholder
export type Recipe = {
  name: string;
  ingredients: Record<string, number>;
};

export function lemonade() {
  return {
    name: 'lemonade',
    ingredients: {
      lemon: 50,
      sugar: 50,
      ice: 10,
    },
  };
}

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
