// Customers are waiting for their order to be delivered and servers
// are delivering drinks to the right customer
//
// If the server failed to make the drink (e.g. no ingredients)
// then the customer will leave angry.
//
// If the customer the order is for is not there, the drink has
// to be thrown out.
//
// If a customer is waiting too long (measured by their mood),
// they'll just leave. They will probably post negative feedback
//
// After *close* you can still deliver orders for N-minutes, after
// that timeout, the customers will leave angry.
//
// When a drink is successfully delivered, we'll generate a review
// for the drink based on the customer receiving it and they may post
// feedback
import WaitingForAnOrder from '../components/waiting-for-an-order';
import Queue from '../components/queue';
import PersonalDetails from '../components/personal-details';

import buildIndex from '../lib/build-index';
import { prepare } from '../utils/prepare';
import { getReview } from '../utils/preferences';

const index = buildIndex([WaitingForAnOrder, PersonalDetails]);

export function initialise() {}

export function update() {
  const servers = [];
  const customers = [];

  for (const entity of index.getEntities()) {
    const waiting = WaitingForAnOrder.get(entity)!;
    switch (waiting.role) {
      case 'CUSTOMER':
        customers.push([entity, waiting] as const);
        break;
      case 'SERVER':
        servers.push([entity, waiting] as const);
        break;
    }
  }

  for (const [server, waiting] of servers) {
    // look for the customer
    const customer = waiting.order.customer;
    if (WaitingForAnOrder.get(customer) == null) {
      // they've left
      continue;
    }

    let customerDetails = PersonalDetails.get(customer)!;
    let serverDetails = PersonalDetails.get(server)!;
    WaitingForAnOrder.remove(customer);

    console.log(`order delivered to ${customerDetails.name}`);

    console.log(`${serverDetails.name} going back to take more orders`);
    WaitingForAnOrder.remove(server);
    Queue.add(server, { role: 'SERVER' });

    const review = getReview(customerDetails.taster, prepare(waiting.order));

    const customerName = customerDetails.name;
    if (review > 0.5) {
      console.log(`${customerName} enjoyed their ${waiting.order.name}`);
    } else if (review < -0.5) {
      console.log(`${customerName} didn't like their ${waiting.order.name}`);
    } else {
      console.log(
        `${customerName} thought their ${waiting.order.name} was just okay`,
      );
    }
  }
}
