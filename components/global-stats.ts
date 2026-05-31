import * as Component from '../lib/component';
import { type Recipe } from '../utils/recipes';

export type T = {
  time: number;
  day: number;
  cash: number;
  menu: Recipe[];
};
const GlobalStats = Component.create<T>('GlobalStats');
export default GlobalStats;
