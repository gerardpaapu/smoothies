import ingredients from './ingredients.js';

export type IngredientName = keyof typeof ingredients;
export type Ingredients = Partial<Record<IngredientName, number>>;

export type Recipe = {
  name: string;
  price: number;
  ingredients: Ingredients;
};

export function lemonade(): Recipe {
  return {
    name: 'lemonade',
    price: 4,
    ingredients: {
      lemon: 50,
      'simple syrup': 50,
      ice: 10,
    },
  };
}

export function tropicalSmoothie(): Recipe {
  return {
    name: 'tropical smoothie',
    price: 6,
    ingredients: {
      pineapple: 40,
      mango: 40,
      banana: 30,
      'coconut milk': 60,
      ice: 20,
    },
  };
}

export function greenSmoothie(): Recipe {
  return {
    name: 'green smoothie',
    price: 5,
    ingredients: {
      spinach: 30,
      banana: 50,
      mint: 10,
      'oat milk': 70,
      honey: 15,
    },
  };
}

export function strawberryYogurtBlend(): Recipe {
  return {
    name: 'strawberry yogurt blend',
    price: 5,
    ingredients: {
      strawberry: 60,
      banana: 30,
      yogurt: 50,
      'simple syrup': 20,
    },
  };
}

const neededIngredients: IngredientName[] = [
  'banana',
  'coconut milk',
  'honey',
  'ice',
  'lemon',
  'mango',
  'mint',
  'oat milk',
  'simple syrup',
  'spinach',
  'yogurt',
  'pineapple',
  'coconut milk',
];
