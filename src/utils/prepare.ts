import type { Recipe, IngredientName } from './recipes.js';
import type { Experience } from './preferences.js';
import { type Trait, type Traits } from './traits.js';
import Ingredients from './ingredients.js';
import { HOT } from './temperature.js';

export function prepare(recipe: Recipe): Experience {
  const result = Object.create(null) as Traits;
  for (const [_ingredient, amount] of Object.entries(recipe.ingredients)) {
    // break each ingredients into their traits
    // and then add them to the result
    const ingredient = _ingredient as IngredientName;
    const traits = Ingredients[ingredient] as Traits;
    for (const [_trait, traitPerAmount] of Object.entries(traits)) {
      const trait = _trait as Trait;
      // scale the addition by how much of the ingredient we included
      result[trait] = (result[trait] ?? 0) + traitPerAmount! * amount;
    }
  }

  // Every drink should have a default temperature
  if (!(HOT in result)) {
    result[HOT] = 0;
  }

  return { name: recipe.name, traits: result as any };
}
