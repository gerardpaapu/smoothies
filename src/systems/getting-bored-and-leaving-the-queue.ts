import PersonalDetails from '../components/personal-details.js';
import InTheQueue from '../components/in-the-queue.js';
import Leaving from '../components/leaving.js';

import type { QueryResults } from '../lib/system.js';

export function defineQueries() {
  return {
    customers: [PersonalDetails, InTheQueue],
  };
}

export function update({ customers }: QueryResults<typeof defineQueries>) {
  for (const entity of customers) {
    const details = PersonalDetails.get(entity);
    if (!details) continue;

    details.mood.excited *= 0.9999999999;

    if (details.mood.excited < 10) {
      InTheQueue.remove(entity);
      Leaving.add(entity, {});
    }
  }
}
