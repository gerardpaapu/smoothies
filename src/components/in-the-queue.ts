import * as Component from '../lib/component.js';

export type T = {
  position: number;
};
const InTheQueue = Component.create<T>('Queue');
export default InTheQueue;
