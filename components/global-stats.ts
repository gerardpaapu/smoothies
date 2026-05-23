import * as Component from '../lib/component';
import { type Recipe } from '../utils/recipes';

export type T = {
  time: number;
  day: number;
  cash: number;
  menu: Recipe[];
};

export default Component.create<T>('GlobalStats');
