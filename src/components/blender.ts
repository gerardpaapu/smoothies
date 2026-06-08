import type { Entity } from '../entities/index.js';
import * as Component from '../lib/component.js';

export type T = {
  usedBy: Entity;
};

const Blender = Component.create<T>('Blender');
export default Blender;
