import MakingAnOrder from '../components/making-an-order.js';
import PersonalDetails from '../components/personal-details.js';
import Location from '../components/position.js';
import IngredientsBucket from '../components/ingredients-bucket.js';
import Blender from '../components/blender.js';
import Goal from '../components/goal.js';
import deliveringAnOrder from '../components/delivering-an-order.js';
import type { QueryResults } from '../lib/system.js';
import ingredients from '../utils/ingredients.js';
import { Direction } from '../utils/location.js';
import Position from '../components/position.js';
import type { IngredientName } from '../utils/recipes.js';
import * as BucketBlueprint from '../blueprints/ingredients-bucket.js';
import * as BlenderBlueprint from '../blueprints/blender.js';

export function defineQueries() {
  return {
    workers: [Location, PersonalDetails, MakingAnOrder],
    buckets: [Location, IngredientsBucket],
    blenders: [Location, Blender],
  };
}

export function initialise() {
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
  const start = 100;
  const width = 16;

  // we need an ingredients bucket for each of these guys
  for (let i = 0; i < neededIngredients.length; i++) {
    const ingredient = neededIngredients[i]!;
    const x = start + width * i;
    const y = 100;
    const d = Direction.DOWN;
    BucketBlueprint.create(ingredient, { x, y, d });
  }

  BlenderBlueprint.create();
}

// TODO: add cartons of ingredients at locations
// TODO: add location and goal
// TODO: servers who have collected all the ingredients should
//       monopolise a blender to blend their drink, then move to delivery
// TODO: servers who are missing an ingredient should collect ingredients from cartons
// TODO: to collect ingredients servers should be standing in front of the cartons
// TODO: to collect ingredients a server must monopolise the carton while collecting
// TODO: if there is a carton of a needed ingredient but it's monopolised, the server should wait
//       while waiting, they should wander nearby
// TODO: if there is no carton of the needed ingredient, the server should take a refund to the customer
//       (the customer will be upset).
// TODO: to monopolise a utility (i.e. a blender or a carton), the server should be in front of it, facing it
//       beingUsedBy should be -1, and we set beingUsedBy to the server's entity
// TODO: the time spent collecting an ingredient should be proportional to the amount of the ingredient
//       (and the efficiency of the server?)

export function update(results: QueryResults<typeof defineQueries>) {
  // put the buckets in the map according to their ingredients
  for (const entity of results.workers) {
    const making = MakingAnOrder.get(entity)!;

    const serverDetails = PersonalDetails.get(entity)!;
    const customerDetails = PersonalDetails.get(making.order.customer)!;
    console.log(
      `${serverDetails.name} is working on a ${making.order.name} for ${customerDetails.name}`,
    );
    // We're done

    if (making.mixed >= 10) {
      console.log(
        `${serverDetails?.name} is delivering a drink for ${customerDetails.name}`,
      );

      deliveringAnOrder.add(entity, { order: making.order });
      MakingAnOrder.remove(entity);
      continue;
    }

    // I think it's kind of clear that this should be a separate component right?

    // if we're using a bucket, keep using it until we have enough of the ingredient
    let bucket;
    // IDK yet if it's bad to do this
    if (making.using !== -1 && (bucket = IngredientsBucket.get(making.using))) {
      const ingredient = bucket.ingredient;
      if (
        making.collected[ingredient]! >= making.order.ingredients[ingredient]!
      ) {
        console.log(`${serverDetails!.name} finished collecting ${ingredient}`);
        making.using = -1;
        bucket.usedBy = -1;
        continue;
      }
      console.log(`${serverDetails!.name} is collecting ${ingredient}`);
      making.collected[ingredient] ??= 0;
      making.collected[ingredient] += 4;
      continue;
    }

    // if we're using a blender, keep using it until the drink is mixed
    let blender;
    if (making.using !== -1 && (blender = Blender.get(making.using))) {
      if (making.mixed < 10) {
        console.log(`${serverDetails!.name} is using the blender`);
        making.mixed += 2;
        // this is wonky as
        if (making.mixed >= 10) {
          blender.usedBy = -1;
        }
        continue;
      }

      making.using = -1;
      continue;
    }

    // what's the next ingredient we should collect
    let seeking = nextNeededIngredient(making);

    // if all the ingredients are collected set the blender as your goal
    if (seeking == null) {
      findClosestBlender(entity, results.blenders);
      continue;
    }

    findClosestBucketOf(entity, results.buckets, seeking);

    // find all the buckets of this ingredient that are not empty
    // if there's one or more that isn't being used, choose the closest
    // otherwise if there's one or more choose the closest, and stand behind the
    // person using it
    // otherwise we can't make the drink, go to deliver the bad news

    // if we're already standing at our goal, start using the machine
  }
}
function findClosestBucketOf(
  entity: number,
  buckets: Array<number>,
  ingredient: IngredientName,
) {
  let closest = null;
  let bucket = null;
  let distance = Infinity;

  const position = Position.get(entity)!;

  // TODO: these queries should be memoized
  for (const entity of buckets) {
    const bucketData = IngredientsBucket.get(entity)!;
    if (bucketData.ingredient !== ingredient) {
      continue;
    }

    const bucketPosition = Position.get(entity)!;
    let dx = position.x - bucketPosition.x;
    let dy = position.y - bucketPosition.y;
    let d2 = dx * dx + dy * dy;

    if (d2 < distance) {
      closest = bucketPosition;
      bucket = entity;
      distance = d2;
    }
  }

  if (!closest || !bucket) {
    // give up
    console.log(`couldn't find a ${ingredients} bucket`);
    return;
  }

  const b = IngredientsBucket.get(bucket)!;
  if (closest.x == position.x && closest.y + 8 == position.y) {
    // we're here, we can start using it
    Goal.remove(entity);
    position.d = Direction.UP;
    if (b.usedBy === -1) {
      const server = MakingAnOrder.get(entity)!;
      b.usedBy = entity;
      server.using = bucket;
      return;
    }
    // else I guess we just wait here?
    console.log(`The ${ingredient} bucket is being used, we have to wait`);
  } else {
    console.log(`Walking to the ${ingredient} bucket`);

    Goal.add(entity, { ...closest, y: closest.y + 8, d: Direction.UP });
  }
}

function findClosestBlender(entity: number, blenders: Array<number>) {
  let closest = null;
  let blender = null;
  let distance = Infinity;

  const position = Position.get(entity)!;

  for (const entity of blenders) {
    const blenderPosition = Position.get(entity)!;
    let dx = position.x - blenderPosition.x;
    let dy = position.y - blenderPosition.y;
    let d2 = dx * dx + dy * dy;

    if (d2 < distance) {
      closest = blenderPosition;
      blender = entity;
      distance = d2;
    }
  }
  if (!closest || !blender) {
    // give up
    console.log(`couldn't find a blender :(`);
    return;
  }

  const b = Blender.get(blender)!;
  if (closest.x == position.x && closest.y + 8 == position.y) {
    // we're here, we can start using it

    if (b.usedBy === -1) {
      const server = MakingAnOrder.get(entity)!;
      b.usedBy = entity;
      server.using = blender;
      Goal.remove(entity);
      position.d = Direction.DOWN;
      return;
    }
    // else I guess we just wait here?
    console.log(`The blender is being used, we have to wait`);
  } else {
    console.log(`Walking to the blender`);
    Goal.add(entity, { ...closest, y: closest.y + 8, d: Direction.UP });
  }
}

import type { T as TMakingAnOrder } from '../components/making-an-order.js';

function nextNeededIngredient(making: TMakingAnOrder) {
  let seeking: IngredientName | null = null;
  for (let k in making.order.ingredients) {
    if (!(k in making.collected)) {
      seeking = k as IngredientName;
      break;
    }
  }
  return seeking;
}
