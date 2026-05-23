import * as F from './flavours';
import * as C from './colours';
import * as A from './allergens';
import * as T from './textures';
import { HOT } from './temperature';

type Values<T> = T[keyof T];
export type Trait =
  | Values<typeof F>
  | Values<typeof C>
  | Values<typeof A>
  | Values<typeof T>
  | typeof HOT;

export type Traits = Partial<Record<Trait, number>>;
