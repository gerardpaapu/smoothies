import { describe, it, expect } from 'vitest';
import { prepare } from './prepare';
import { type Recipe } from './recipes';
import * as Ig from './ingredients';
import * as Profile from './profiles';
import { getReview } from './preferences';
import { HOT } from './temperature';

describe(`peanutAllergy`, () => {
  const peanutDelightRecipe: Recipe = {
    name: 'Peanut Delight',
    price: 420.69, // you pay with your life
    ingredients: {
      'peanut butter': 2,
      milk: 1,
    },
  };

  const drink = prepare(peanutDelightRecipe);

  it(`doesn't like peanut drink`, () => {
    expect(
      getReview(Profile.peanutAllergy, {
        name: 'Peanut Delight',
        traits: drink,
      }),
    ).toBe(-100); // they flippin hate it bro
  });
});

describe(`textureHater`, () => {
  it(`hates a drink with boba pearls`, () => {
    const recipe: Recipe = {
      name: 'Bubble Tea',
      price: 5,
      ingredients: {
        'boba pearls': 30,
        'oat milk': 100,
        'simple syrup': 20,
      },
    };
    const drink = prepare(recipe);
    expect(
      getReview(Profile.textureHater, { name: 'Bubble Tea', traits: drink }),
    ).toBeLessThan(0);
  });

  it(`is neutral on a texture-free smoothie`, () => {
    const recipe: Recipe = {
      name: 'Banana Smoothie',
      price: 4,
      ingredients: {
        banana: 50,
        'oat milk': 100,
        honey: 20,
      },
    };
    const drink = prepare(recipe);
    expect(
      getReview(Profile.textureHater, {
        name: 'Banana Smoothie',
        traits: drink,
      }),
    ).toBe(0);
  });
});

describe(`sweetSourCold`, () => {
  it(`likes a sweet, sour, cold lemonade`, () => {
    const recipe: Recipe = {
      name: 'Lemonade',
      price: 4,
      ingredients: {
        lemon: 50,
        'simple syrup': 50,
        ice: 10,
      },
    };
    const drink = prepare(recipe);
    expect(
      getReview(Profile.sweetSourCold, { name: 'Lemonade', traits: drink }),
    ).toBeGreaterThan(0);
  });
});

describe(`pumpkinSpiceGirly`, () => {
  it(`does not match a room-temperature pumpkin spice drink`, () => {
    // no HOT trait in the drink, so the preference never matches
    const recipe: Recipe = {
      name: 'Cold Brew Pumpkin Spice',
      price: 5,
      ingredients: {
        'pumpkin spice': 20,
        milk: 100,
      },
    };
    const drink = prepare(recipe);
    expect(
      getReview(Profile.pumpkinSpiceGirly, {
        name: 'Cold Brew Pumpkin Spice',
        traits: drink,
      }),
    ).toBe(0);
  });

  it(`loves a hot pumpkin spice drink`, () => {
    const recipe: Recipe = {
      name: 'Pumpkin Spice Latte',
      price: 6,
      ingredients: {
        'pumpkin spice': 20,
        milk: 100,
      },
    };
    // manually add HOT since no hot ingredient exists yet
    const drink = { ...prepare(recipe), [HOT]: 1 };
    expect(
      getReview(Profile.pumpkinSpiceGirly, {
        name: 'Pumpkin Spice Latte',
        traits: drink,
      }),
    ).toBeGreaterThan(1);
  });
});
