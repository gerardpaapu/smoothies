import JoiningTheQueue from '../components/joining-the-queue.js';
import InTheQueue from '../components/in-the-queue.js';
import type { QueryResults } from '../lib/system.js';
import { NUMBER_OF_CUSTOMERS } from '../utils/config.js';
import createCustomer from '../blueprints/customer.js';
import type { Entity } from '../entities/index.js';

export function defineQueries() {
  return {
    joiners: [JoiningTheQueue],
    inTheQueue: [InTheQueue],
  };
}

export function initialise() {
  for (let i = 0; i < NUMBER_OF_CUSTOMERS; i++) {
    const entity = createCustomer();
    JoiningTheQueue.add(entity, {});
  }
}

export function update({
  inTheQueue,
  joiners,
}: QueryResults<typeof defineQueries>) {
  let i = inTheQueue.length;
  for (const entity of joiners) {
    InTheQueue.add(entity, { position: i++ });
    JoiningTheQueue.remove(entity);
  }
}
