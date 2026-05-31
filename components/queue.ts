import * as Component from '../lib/component';

export type T = {
  position: number;
};
const Queue = Component.create<T>('Queue');
export default Queue;
