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
import WaitingForAnOrder from '../components/waiting-for-an-order.js';
import DeliveringAnOrder from '../components/delivering-an-order.js';
import PersonalDetails from '../components/personal-details.js';
import Position from '../components/position.js';
import Goal from '../components/goal.js';
import Leaving from '../components/leaving.js';
import { WaitingArea } from '../utils/special-locations.js';

import buildIndex from '../lib/build-index.js';
import { prepare } from '../utils/prepare.js';
import { getReview } from '../utils/preferences.js';
import TakingOrders from '../components/taking-orders.js';
import type { QueryResults } from '../lib/system.js';

export function defineQueries() {
  return {
    customers: [WaitingForAnOrder, Position, PersonalDetails],
    servers: [
      DeliveringAnOrder,
      Position,
      // Goal,
      PersonalDetails,
    ],
  };
}

export function initialise() {}
// TODO: When a customer's order is ready, the server should take it to them
//       i.e. they should set that customer's location as their goal
// TODO: When a customer has their drink, it should affect their mood
// TODO: When a customer has their drink we should hand off to a system
//       where they go home or post a review on social media
// TODO: ... when two people interact, should we move both of their moods
//       closer to the mean? that could be fun
export function update({
  customers,
  servers,
}: QueryResults<typeof defineQueries>) {
  for (const customer of customers) {
    const personalDetails = PersonalDetails.get(customer)!;
    Goal.add(customer, { ...WaitingArea });
    console.log(`${personalDetails.name} is waiting for their drink`);
  }

  for (const server of servers) {
    const delivering = DeliveringAnOrder.get(server)!;
    // look for the customer
    const customer = delivering.order.customer;
    if (WaitingForAnOrder.get(customer) == null) {
      // they've left
      continue;
    }

    // check if they're close enough to the customer
    // update the goal to the customer's location
    let customerDetails = PersonalDetails.get(customer)!;
    let serverDetails = PersonalDetails.get(server)!;
    let customerLocation = Position.get(customer)!;
    let serverLocation = Position.get(server)!;

    Goal.add(server, { ...customerLocation });
    let dx = serverLocation.x - customerLocation.x;
    let dy = serverLocation.y - customerLocation.y;

    if (dx * dx + dy * dy > 10) {
      continue;
    }

    WaitingForAnOrder.remove(customer);
    Leaving.add(customer, {});
    console.log(`order delivered to ${customerDetails.name}`);

    console.log(`${serverDetails.name} going back to take more orders`);
    WaitingForAnOrder.remove(server);
    TakingOrders.add(server, {});

    const review = getReview(customerDetails.taster, prepare(delivering.order));

    const customerName = customerDetails.name;
    if (review > 0.5) {
      console.log(`${customerName} enjoyed their ${delivering.order.name}`);
    } else if (review < -0.5) {
      console.log(`${customerName} didn't like their ${delivering.order.name}`);
    } else {
      console.log(
        `${customerName} thought their ${delivering.order.name} was just okay`,
      );
    }
  }
}
