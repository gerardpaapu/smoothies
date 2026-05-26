import { Entity } from '../entities';
import * as Component from '../lib/component';

export type T = {
  usedBy: Entity;
};

export default Component.create<T>('Blender');
