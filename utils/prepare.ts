import { Recipe, IngredientName } from './recipes';
import { Experience } from './preferences';
import { type Trait, type Traits } from './traits';
import Ingredients from './ingredients';
import { HOT } from './temperature';

export function prepare(recipe: Recipe): Experience {
  const result = Object.create(null) as Traits;
  for (const [_ingredient, amount] of Object.entries(recipe.ingredients)) {
    // break each ingredients into their traits
    // and then add them to the result
    const ingredient = _ingredient as IngredientName;
    const traits = Ingredients[ingredient];
    for (const [_trait, traitPerAmount] of Object.entries(traits)) {
      const trait = _trait as Trait;
      // scale the addition by how much of the ingredient we included
      result[trait] = (result[trait] ?? 0) + traitPerAmount * amount;
    }
  }

  if (!(HOT in result)) {
    result[HOT] = 0;
  }

  return { name: recipe.name, traits: result };
}
