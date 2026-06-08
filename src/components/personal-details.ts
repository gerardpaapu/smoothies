import * as Component from '../lib/component.js';
import type { Taster } from '../utils/preferences.js';

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

const PersonalDetails = Component.create<T>('PersonalDetails');
export default PersonalDetails;
