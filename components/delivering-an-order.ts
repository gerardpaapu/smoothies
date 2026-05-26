import * as Component from '../lib/component';
import { Order } from '../utils/order';

export type T = {
  order: Order;
};

export default Component.create<T>('Delivering an order');
