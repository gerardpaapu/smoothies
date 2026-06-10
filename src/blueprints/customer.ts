import PersonalDetails from '../components/personal-details.js';
import { getName } from '../utils/names.js';
import { randomTaster } from '../utils/profiles.js';
import * as Entities from '../entities/index.js';
import { Entrance } from '../utils/special-locations.js';
import Position from '../components/position.js';
import Goal from '../components/goal.js';
import SpriteName from '../components/sprite-name.js';

export default function createCustomer() {
  const entity = Entities.create();
  Position.add(entity, {
    x: Entrance.x,
    y: Entrance.y,
    d: Entrance.d,
  });
  SpriteName.add(entity, { spritename: 'customer' });
  PersonalDetails.add(entity, {
    name: getName(entity),
    cash: 100,
    mood: { angry: 0, sad: 0, excited: 1_000_000 },
    taster: randomTaster(),
  });

  return entity;
}

export function deleteCustomer(entity: Entities.Entity) {
  PersonalDetails.remove(entity);
  Position.remove(entity);
  Goal.remove(entity);
  SpriteName.remove(entity);
}
