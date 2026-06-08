import * as Component from '../lib/component.js';

export type Role = 'CUSTOMER' | 'SERVER';

export type T = {
  role: Role;
  order: [];
};

const Serving = Component.create<T>('Serving a customer');
export default Serving;
