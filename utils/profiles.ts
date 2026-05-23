import { type Taster, hate, love } from './preferences';
import * as F from './flavours';
import * as C from './colours';
import { HOT } from './temperature';
import * as A from './allergens';
import * as T from './textures';

// a lot of western people hate textures in drinks;
export const textureHater: Taster = [
  hate({ [T.CHEWY]: 100 }),
  hate({ [T.FIRM_JELLY]: 100 }),
  hate({ [T.SOFT_JELLY]: 100 }),
];

// this guy fukin loves lemonade
export const sweetSourCold: Taster = [
  love({ [F.SWEET]: 50, [F.SOUR]: 40, [HOT]: -100 }),
];

// I can't drink that
export const peanutAllergy: Taster = [hate({ [A.PEANUTS]: 1 }, 100)];

// girly in a non-gender specific sense
export const pumpkinSpiceGirly: Taster = [
  love({
    [C.YELLOW]: 0.5,
    [C.RED]: 0.3,
    [C.BLACK]: 0.1,
    [C.SHINY]: 0.1,
    [F.SWEET]: 0.6,
    [F.CINNAMON]: 0.7,
    [F.EARTHY]: 0.4,
    [F.SPICY]: 0.2,
    [F.SMOKY]: 0.1,
    [F.VANILLA]: 0.3,
  }),
];

export const prefabs = [];
