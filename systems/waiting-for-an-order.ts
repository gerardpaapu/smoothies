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
import DeliveringAnOrder from '../components/delivering-an-order';
import Queue from '../components/queue';
import PersonalDetails from '../components/personal-details';
import Location from '../components/position';
import Goal from '../components/goal';

import buildIndex from '../lib/build-index';
import { prepare } from '../utils/prepare';
import { getReview } from '../utils/preferences';
import TakingOrders from '../components/taking-orders';

const customers = buildIndex([WaitingForAnOrder, Location, PersonalDetails]);
const servers = buildIndex([
  DeliveringAnOrder,
  Location,
  Goal,
  PersonalDetails,
]);

export function initialise() {}
// TODO: When a customer's order is ready, the server should take it to them
//       i.e. they should set that customer's location as their goal
// TODO: When a customer has their drink, it should affect their mood
// TODO: When a customer has their drink we should hand off to a system
//       where they go home or post a review on social media
// TODO: ... when two people interact, should we move both of their moods
//       closer to the mean? that could be fun
export function update() {
  for (const customer of customers.getEntities()) {
    const personalDetails = PersonalDetails.get(customer)!;
    console.log(`${personalDetails.name} is waiting for their drink`);
  }

  for (const server of servers.getEntities()) {
    const delivering = DeliveringAnOrder.get(server)!;
    // look for the customer
    const customer = delivering.order.customer;
    if (WaitingForAnOrder.get(customer) == null) {
      // they've left
      continue;
    }

    // check if they're close enough to the customer
    // update the goal to the customer's location
    //
    let customerDetails = PersonalDetails.get(customer)!;
    let serverDetails = PersonalDetails.get(server)!;

    WaitingForAnOrder.remove(customer);

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
