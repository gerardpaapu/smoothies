import * as Component from '../lib/component';

export type Mood = {
  angry: number;
  sad: number;
  excited: number;
};

export type T = {
  name: string;
  cash: number;
  mood: Mood;
};

export default Component.create<T>('PersonalDetails');
