import * as Component from '../lib/component';

export type Role = 'CUSTOMER' | 'SERVER';

export type T = {
  role: Role;
  order: [];
};

export default Component.create<T>('Serving a customer');
