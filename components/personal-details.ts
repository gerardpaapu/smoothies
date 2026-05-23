import * as Component from '../lib/component';
import { Taster } from '../utils/preferences';

export type Mood = {
  angry: number;
  sad: number;
  excited: number;
};

export type T = {
  name: string;
  cash: number;
  mood: Mood;
  taster: Taster;
};

export default Component.create<T>('PersonalDetails');
