import * as Component from '../lib/component.js';
import type { Order } from '../utils/order.js';

export type T = {
  order: Order;
};

const DeliveringAnOrder = Component.create<T>('Delivering an order');
export default DeliveringAnOrder;
