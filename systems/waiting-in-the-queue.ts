import PersonalDetails from '../components/personal-details';
import Queue from '../components/queue';
import Position from '../components/position.js';
import Goal from '../components/goal.js';

import buildIndex from '../lib/build-index.js';
import createEmployee from '../blueprints/employee.js';
import TakingOrders from '../components/taking-orders.js';
import { QueueHead } from '../utils/special-locations.js';
import { Direction } from '../utils/location.js';

const customersQuery = buildIndex([PersonalDetails, Queue, Position]);
const serversQuery = buildIndex([PersonalDetails, TakingOrders]);

// TODO: The customers should be numbered as they join the queue
// TODO: The customers should leave if their excitement gets low enough (bored)
// TODO: The 0th Server should have the TakingAnOrder as their goal
// TODO: The n+1th server can stand anywhere I guess, they should just fart around
//       (they should be cleaning, or on their phone, or smoking if they're cool)
// TODO: The order can only be taken if the 0th customer is standing at their goal and
//       the 0th server is standing at their goal
// TODO: If there are no servers waiting to take an order, the customers in queue
//       all get angry
// TODO: If the day ends while a customer is waiting, they will get angry
const NUMBER_OF_SERVERS = 3;

export function initialise() {}

export function update() {
  const customers = customersQuery.getEntities();
  const servers = serversQuery.getEntities();
  const sorted = Array.from({ length: customers.length }, () => 0);
  // radix sort the customers by position in queue
  for (const customer of customers) {
    const queued = Queue.get(customer)!;
    sorted[queued.position] = customer;
  }

  {
    if (sorted.length) {
      let position = Position.get(sorted[0])!;
      let dx = QueueHead.x - position.x;
      let dy = QueueHead.y - position.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      console.log(
        `The customer is ${distance}m away from the front of the queue`,
      );

      const goal = {
        ...QueueHead,
      };
      // the first customer goes to the head of the queue
      Goal.add(sorted[0], goal);
    }

    for (let i = 1; i < sorted.length; i++) {
      const p = Position.get(sorted[i - 1])!;
      const goal = {
        ...p,
      };

      switch (goal.d) {
        case Direction.UP:
          goal.y += 32;
          break;
        case Direction.DOWN:
          goal.y -= 32;
          break;
        case Direction.LEFT:
          goal.x += 32;
          break;
        case Direction.RIGHT:
          goal.y -= 32;
          break;
      }

      Goal.add(sorted[i], goal);
    }
  }

  console.log(`There are ${customers.length} customers in the queue`);

  // If there's at least one server in position and one
  // customer standing at the front of the line, and they're in the 0th position
  // pair a customer with a server and move them to the next step
  // then renumber the rest of the queue
  if (servers.length === 0) {
    console.log(`No servers waiting to take orders`);
    return;
  }
  console.log(`There are ${servers.length} servers ready to help them`);
}
