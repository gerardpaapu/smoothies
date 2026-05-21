import * as Component from '../lib/component';
export type Role = 'CUSTOMER' | 'SERVER';

export type T =
  | {
      role: 'CUSTOMER';
      position?: number;
    }
  | { role: 'SERVER' };

export default Component.create<T>('Queue');
