import * as Component from '../lib/component';
import { Order } from '../utils/order';

export type T = {
  order: Order;
};

const DeliveringAnOrder = Component.create<T>('Delivering an order');

export default DeliveringAnOrder;
