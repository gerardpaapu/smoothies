import PersonalDetails from '../components/personal-details.js';
import InTheQueue from '../components/in-the-queue.js';
import Position from '../components/position.js';
import Goal from '../components/goal.js';

import buildIndex from '../lib/build-index.js';
import TakingOrders from '../components/taking-orders.js';
import { QueueHead } from '../utils/special-locations.js';
import { Direction } from '../utils/location.js';
import type { QueryResults } from '../lib/system.js';

export function defineQueries() {
  return {
    customers: [PersonalDetails, InTheQueue, Position],
    servers: [PersonalDetails, TakingOrders],
  };
}

// TODO: The order can only be taken if the 0th customer is standing at their goal and
//       the 0th server is standing at their goal
// TODO: If the day ends while a customer is waiting, they will get angry
export function initialise() {}

export function update({
  customers,
  servers,
}: QueryResults<typeof defineQueries>) {
  const sorted = Array.from({ length: customers.length }, () => 0);
  // radix sort the customers by position in queue
  for (const customer of customers) {
    const queued = InTheQueue.get(customer)!;
    sorted[queued.position] = customer;
  }

  {
    if (sorted.length) {
      let entity = sorted[0]!;
      if (entity !== 0) {
        const goal = {
          ...QueueHead,
        };
        // the first customer goes to the head of the queue
        Goal.add(sorted[0]!, goal);
      }
    }

    for (let i = 1; i < sorted.length; i++) {
      const p = Position.get(sorted[i - 1]!);
      if (!p) {
        continue;
      }
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
          goal.x -= 32;
          break;
      }

      Goal.add(sorted[i]!, goal);
    }
  }

  console.log(`There are ${customers.length} customers in the queue`);

  // If there's at least one server in position and one
  // customer standing at the front of the line, and they're in the 0th position
  // pair a customer with a server and move them to the next step
  // then renumber the rest of the queue
  if (servers.length === 0) {
    console.log(`No servers waiting to take orders`);

    // if you're waiting and there's nobody taking orders you get angry
    for (const customer of customers) {
      const details = PersonalDetails.get(customer)!;
      details.mood.angry += 0.001;
    }

    return;
  }
  console.log(`There are ${servers.length} servers ready to help them`);
}
