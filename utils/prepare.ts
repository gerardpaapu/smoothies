import * as F from './flavours';
import * as C from './colours';
import * as A from './allergens';
import * as T from './textures';
import { HOT } from './temperature';
import { Recipe, IngredientName } from './recipes';
import { Experience } from './preferences';

import Ingredients from './ingredients';

type Values<T> = T[keyof T];
type Trait =
  | Values<typeof F>
  | Values<typeof C>
  | Values<typeof A>
  | Values<typeof T>
  | typeof HOT;

type Traits = Record<Trait, number>;

export function prepare(recipe: Recipe): Experience {
  const result = Object.create(null) as Traits;
  for (const [_ingredient, amount] of Object.entries(recipe.ingredients)) {
    // break each ingredients into their traits
    // and then add them to the result
    const ingredient = _ingredient as IngredientName;
    const traits = Ingredients[ingredient];
    for (const [_trait, traitPerAmount] of Object.entries(traits)) {
      const trait = _trait as Trait;
      if (!(trait in result)) {
        result[trait] = 0;
      }

      // scale the addition by how much of the ingredient we included
      result[trait] += traitPerAmount * amount;
    }
  }

  return { name: recipe.name, traits: result };
}
