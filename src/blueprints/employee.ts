import PersonalDetails from '../components/personal-details';
import { getName } from '../utils/names';
import { randomTaster } from '../utils/profiles';
import * as Entities from '../entities/index.js';
import position from '../components/position.js';
import * as L from '../utils/special-locations.js';
import SpriteName from '../components/sprite-name.js';
export default function createEmployee() {
  const entity = Entities.create();

  position.add(entity, {
    x: L.OrdersCounter.x,
    y: L.OrdersCounter.y,
    d: L.OrdersCounter.d,
  });

  PersonalDetails.add(entity, {
    name: getName(entity),
    cash: 100,
    mood: { angry: 0, sad: 0, excited: 100 },
    taster: randomTaster(),
  });

  SpriteName.add(entity, { spritename: 'employee' });

  return entity;
}
