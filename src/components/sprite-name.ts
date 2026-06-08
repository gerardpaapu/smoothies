import * as Component from '../lib/component.js';

export type T = {
  spritename: string;
};
const SpriteName = Component.create<T>('SpriteName');
export default SpriteName;
