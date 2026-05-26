import MakingAnOrder from '../components/making-an-order';
import PersonalDetails from '../components/personal-details';
import Location from '../components/location';
import IngredientsBucket from '../components/ingredients-bucket';
import Blender from '../components/blender';
import Goal from '../components/goal';
import WaitingForAnOrder from '../components/waiting-for-an-order';
import deliveringAnOrder from '../components/delivering-an-order';
import buildIndex from '../lib/build-index';

const workersQ = buildIndex([Location, Goal, PersonalDetails, MakingAnOrder]);
const bucketsQ = buildIndex([Location, IngredientsBucket]);
const blendersQ = buildIndex([Location, Blender]);

export function initialise() {}

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

export function update() {
  // put the buckets in the map according to their ingredients
  let buckets = new Map();

  for (const entity of bucketsQ.getEntities()) {
    const bucket = IngredientsBucket.get(entity)!;
    const location = Location.get(entity)!;
    // could have multiple buckets with the same ingredients
    buckets.set(bucket.ingredient, { entity, bucket, location });
  }

  let blenders = [];
  for (const entity of blendersQ.getEntities()) {
    const location = Location.get(entity)!;
    blenders.push({ entity, location });
  }

  for (const entity of workersQ.getEntities()) {
    const making = MakingAnOrder.get(entity)!;

    const serverDetails = PersonalDetails.get(entity);
    const customerDetails = PersonalDetails.get(making.order.customer)!;

    // if we're using a bucket, keep using it until we have enough of the ingredient
    let bucket;
    // IDK yet if it's bad to do this
    if (making.using !== -1 && (bucket = IngredientsBucket.get(making.using))) {
      const ingredient = bucket.ingredient;
      if (
        making.collected[ingredient]! >= making.order.ingredients[ingredient]!
      ) {
        making.using = -1;
        continue;
      }
      console.log(`${serverDetails!.name} is collecting ${ingredient}`);
      making.collected[ingredient] ??= 0;
      making.collected[ingredient]++;
      continue;
    }

    // if we're using a blender, keep using it until the drink is mixed
    let blender;
    if (making.using !== -1 && (blender = Blender.get(making.using))) {
      if (making.mixed < 10) {
        console.log(`${serverDetails!.name} is using the blender`);
        making.mixed++;
        continue;
      }

      making.using = -1;
      continue;
    }

    // if all the ingredients are collected set the blender as your goal

    let seeking = null;
    // TODO: could just keep this on `making`
    for (let k in making.order.ingredients) {
      if (!(k in making.collected)) {
        seeking = k;
      }
    }

    // find all the buckets of this ingredient that are not empty
    // if there's one or more that isn't being used, choose the closest
    // otherwise if there's one or more choose the closest, and stand behind the
    // person using it
    // otherwise we can't make the drink, go to deliver the bad news

    // if we're already standing at our goal, start using the machine

    // if the order is done go deliver it
    deliveringAnOrder.add(entity, { order: making.order });
    MakingAnOrder.remove(entity);
  }
}
