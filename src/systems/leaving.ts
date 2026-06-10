// After customers get their drinks they walk to the exit and then get deleted
import Goal from '../components/goal.js';
import Position from '../components/position.js';
import Leaving from '../components/leaving.js';

import type { QueryResults } from '../lib/system.js';

import { Exit } from '../utils/special-locations.js';
import { deleteCustomer } from '../blueprints/customer.js';
import PersonalDetails from '../components/personal-details.js';

export function defineQueries() {
  return { leavers: [Position, Leaving, PersonalDetails] };
}

export function initialise() {}

export function update({ leavers }: QueryResults<typeof defineQueries>) {
  for (const entity of leavers) {
    // should we just add this when we add them to the system
    Goal.add(entity, { ...Exit });
    const position = Position.get(entity)!;
    if (position.x === Exit.x && position.y === Exit.y) {
      const details = PersonalDetails.get(entity)!;
      console.log(`${details.name}[${entity}] just left`);
      deleteCustomer(entity);
    }
  }
}
