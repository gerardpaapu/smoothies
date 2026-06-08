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

// a lot of other people love textures in drinks;
export const textureLover: Taster = [
  love({ [T.CHEWY]: 100 }),
  love({ [T.FIRM_JELLY]: 100 }),
  love({ [T.SOFT_JELLY]: 100 }),
];

// they love cronch
export const croncher: Taster = [love({ [T.CRUNCHY]: 100 })];

// this guy fukin loves ice-cold lemonade
export const sweetSourCold: Taster = [
  love({ [F.SWEET]: 50, [F.SOUR]: 40, [HOT]: -100 }),
];

// just likes "normal" fruity smoothies
export const fruity: Taster = [
  love({
    [F.FLORAL]: 20,
    [F.SWEET]: 50,
    [F.SOUR]: 14,
    [F.ASTRINGENT]: 10,
    [F.VANILLA]: 10,
  }),
];

// I can't drink that
export const peanutAllergy: Taster = [hate({ [A.PEANUTS]: 1 }, 100)];

// girly in a non-gender specific sense
export const pumpkinSpiceGirly: Taster = [
  love(
    {
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
      [HOT]: 10,
    },
    2,
  ),
];

export function randomTaster(): Taster {
  const result = [] as Taster;
  const texture = Math.random();
  if (texture < 0.2) {
    result.push(...textureHater);
  }
  if (texture > 0.8) {
    result.push(...textureLover);
  }

  if (Math.random() < 0.3) {
    result.push(...pumpkinSpiceGirly);
  }

  if (Math.random() < 0.3) {
    result.push(...sweetSourCold);
  }

  if (Math.random() < 0.5) {
    result.push(...fruity);
  }

  if (Math.random() < 0.1) {
    result.push(...croncher);
  }

  if (Math.random() < 0.05) {
    result.push(...peanutAllergy);
  }

  if (result.length === 0) {
    result.push(...fruity);
  }

  return result;
}
