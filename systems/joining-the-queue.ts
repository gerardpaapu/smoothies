import JoiningTheQueue from '../components/joining-the-queue';
import buildIndex from '../lib/build-index';
import Queue from '../components/queue';

import { NUMBER_OF_CUSTOMERS } from '../utils/config';
import createCustomer from '../blueprints/customer';

const joiningQuery = buildIndex([JoiningTheQueue]);
const waitingQuery = buildIndex([Queue]);

export function initialise() {
  for (let i = 0; i < NUMBER_OF_CUSTOMERS; i++) {
    const entity = createCustomer();
    JoiningTheQueue.add(entity, {});
  }
}

export function update() {
  let i = waitingQuery.getEntities().length;
  for (const entity of joiningQuery.getEntities()) {
    Queue.add(entity, { position: i++ });
    JoiningTheQueue.remove(entity);
  }
}
