import { Entity } from '../entities';
import * as Component from '../lib/component';

export type T = {
  usedBy: Entity;
};

const Blender = Component.create<T>('Blender');
export default Blender;
