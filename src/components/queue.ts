import * as Component from '../lib/component.js';

export type T = {
  position: number;
};
const Queue = Component.create<T>('Queue');
export default Queue;
