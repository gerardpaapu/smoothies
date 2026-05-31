import PersonalDetails from '../components/personal-details';
import { getName } from '../utils/names';
import { randomTaster } from '../utils/profiles';
import * as Entities from '../entities/index.js';
import { Entrance } from '../utils/special-locations.js';
import { Position } from '../utils/location.js';
import position from '../components/position.js';

export default function createCustomer() {
  const entity = Entities.create();
  // I don't think this is the right place for this
  position.add(entity, {
    x: Entrance.x,
    y: Entrance.y,
    d: Entrance.d,
  });

  PersonalDetails.add(entity, {
    name: getName(entity),
    cash: 100,
    mood: { angry: 0, sad: 0, excited: 100 },
    taster: randomTaster(),
  });

  return entity;
}
