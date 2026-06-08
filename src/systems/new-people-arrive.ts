import JoiningTheQueue from '../components/joining-the-queue.js';
import createCustomer from '../blueprints/customer.js';
import PersonalDetails from '../components/personal-details.js';
import { NEW_PEOPLE_ARRIVE_RATE } from '../utils/config.js';

export function defineQueries() {}

export function initialise() {}

export function update() {
  if (Math.random() < NEW_PEOPLE_ARRIVE_RATE) {
    const entity = createCustomer();
    JoiningTheQueue.add(entity, {});
    const details = PersonalDetails.get(entity);
    if (details) {
      console.log(`${details.name} just arrived!`);
    }
  }
}
