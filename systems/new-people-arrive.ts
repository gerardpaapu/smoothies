import JoiningTheQueue from '../components/joining-the-queue';
import createCustomer from '../blueprints/customer';

export function initialise() {}

export function update() {
  if (Math.random() < 0.02) {
    const entity = createCustomer();
    JoiningTheQueue.add(entity, {});
  }
}
