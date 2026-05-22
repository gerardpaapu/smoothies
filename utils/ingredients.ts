import * as F from './flavours';
import * as C from './colours';
import * as A from './allergens';

export default {
  // TODO: Taro/Ube
  // TODO: Caramel
  // TODO: Salt
  pineapple: {
    // colour
    [C.YELLOW]: 0.7,
    [C.WHITE]: 0.1,
    [C.SHINY]: 0.2,
    // tag
    [F.PINEAPPLE]: 1,
    // flavour profile
    [F.ACETICACID]: 0.1,
    [F.GRASSY]: 0.1,
    [F.SWEET]: 0.5,
    [F.SOUR]: 0.3,
    [F.ASTRINGENT]: 0.1,
  },

  lemon: {
    [C.YELLOW]: 0.8,
    [C.WHITE]: 0.1,
    [C.SHINY]: 0.1,
    [F.CITRUS]: 0.5,
    [F.SOUR]: 0.4,
    [F.SWEET]: 0.1,
  },

  'simple syrup': {
    [C.SHINY]: 0.8,
    [C.WHITE]: 0.2,
    [F.SWEET]: 1,
  },

  strawberry: {
    [C.RED]: 0.8,
    [C.WHITE]: 0.1,
    [C.SHINY]: 0.1,
    [F.FLORAL]: 0.2,
    [F.SWEET]: 0.6,
    [F.SOUR]: 0.4,
    [A.BERRIES]: 1,
  },

  yogurt: {
    [C.WHITE]: 0.8,
    [C.SHINY]: 0.2,
    [F.SWEET]: 0.2,
    [F.FAT]: 0.7,
    [F.CALCIUM]: 0.1,
  },

  mango: {
    [C.YELLOW]: 0.6,
    [C.RED]: 0.3,
    [C.WHITE]: 0.1,
    [F.SWEET]: 0.8,
    [F.SOUR]: 0.2,
    [F.FLORAL]: 0.3,
  },

  banana: {
    [C.YELLOW]: 0.8,
    [C.WHITE]: 0.2,
    [F.SWEET]: 0.9,
    [F.FAT]: 0.1,
    [F.ASTRINGENT]: 0.1,
  },

  blueberry: {
    [C.BLUE]: 0.6,
    [C.RED]: 0.2,
    [C.BLACK]: 0.1,
    [C.SHINY]: 0.1,
    [F.SWEET]: 0.5,
    [F.SOUR]: 0.3,
    [F.ASTRINGENT]: 0.3,
    [F.FLORAL]: 0.1,
    [A.BERRIES]: 1,
  },

  spinach: {
    [C.BLUE]: 0.5,
    [C.YELLOW]: 0.4,
    [C.BLACK]: 0.1,
    [F.BITTER]: 0.3,
    [F.ASTRINGENT]: 0.2,
    [F.SALTY]: 0.1,
  },

  ginger: {
    [C.YELLOW]: 0.6,
    [C.WHITE]: 0.3,
    [C.RED]: 0.1,
    [F.SPICY]: 0.7,
    [F.BITTER]: 0.2,
    [F.SOUR]: 0.1,
  },

  coconut: {
    [C.WHITE]: 0.7,
    [C.SHINY]: 0.3,
    [F.SWEET]: 0.4,
    [F.FAT]: 0.8,
    [F.VANILLA]: 0.2,
  },

  mint: {
    [C.YELLOW]: 0.5,
    [C.BLUE]: 0.4,
    [C.BLACK]: 0.1,
    [F.COOL]: 0.9,
    [F.BITTER]: 0.1,
    [F.FLORAL]: 0.1,
  },

  honey: {
    [C.YELLOW]: 0.6,
    [C.RED]: 0.1,
    [C.SHINY]: 0.3,
    [F.SWEET]: 1,
    [F.FLORAL]: 0.3,
  },

  'iced tea': {
    [C.YELLOW]: 0.3,
    [C.RED]: 0.4,
    [C.BLACK]: 0.1,
    [C.SHINY]: 0.2,
    [F.BITTER]: 0.3,
    [F.ASTRINGENT]: 0.4,
    [F.SWEET]: 0.1,
  },

  'green tea': {
    [C.YELLOW]: 0.5,
    [C.BLUE]: 0.3,
    [C.SHINY]: 0.2,
    [F.BITTER]: 0.4,
    [F.ASTRINGENT]: 0.3,
    [F.GRASSY]: 0.3,
    [F.FLORAL]: 0.2,
    [F.SWEET]: 0.1,
  },

  'iced coffee': {
    [C.BLACK]: 0.6,
    [C.WHITE]: 0.1,
    [C.SHINY]: 0.3,
    [F.BITTER]: 0.7,
    [F.SWEET]: 0.1,
    [F.SMOKY]: 0.2,
  },

  // by milk simplicitor I mean cow milk, from a cow
  milk: {
    [C.WHITE]: 0.8,
    [C.SHINY]: 0.2,
    [F.FAT]: 0.5,
    [F.SWEET]: 0.2,
    [F.CALCIUM]: 0.2,
    [F.UMAMI]: 0.1,
    [A.DAIRY]: 1,
  },

  'oat milk': {
    [C.WHITE]: 0.6,
    [C.YELLOW]: 0.3,
    [C.SHINY]: 0.1,
    [F.SWEET]: 0.4,
    [F.GRASSY]: 0.3,
    [F.FAT]: 0.2,
    [F.UMAMI]: 0.1,
  },

  'soy milk': {
    [C.WHITE]: 0.6,
    [C.YELLOW]: 0.3,
    [C.SHINY]: 0.1,
    [F.SWEET]: 0.4,
    [F.GRASSY]: 0.3,
    [F.FAT]: 0.2,
    [F.UMAMI]: 0.1,
    [A.SOY]: 1,
  },

  'coconut milk': {
    [C.WHITE]: 0.7,
    [C.SHINY]: 0.3,
    [F.FAT]: 0.7,
    [F.SWEET]: 0.3,
    [F.VANILLA]: 0.2,
  },

  'almond milk': {
    [C.WHITE]: 0.7,
    [C.YELLOW]: 0.2,
    [C.SHINY]: 0.1,
    [F.SWEET]: 0.3,
    [F.FAT]: 0.3,
    [F.BITTER]: 0.2,
    [F.UMAMI]: 0.1,
    [F.ASTRINGENT]: 0.1,
  },
};
