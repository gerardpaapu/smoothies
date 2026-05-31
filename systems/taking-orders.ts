import Queue from '../components/queue';
import Position from '../components/position';
import MakingAnOrder from '../components/making-an-order.js';
import WaitingForAnOrder from '../components/waiting-for-an-order.js';
import PersonalDetails from '../components/personal-details.js';
import GlobalStats from '../components/global-stats.js';

import { QueueHead, OrdersCounter } from '../utils/special-locations';
import buildIndex from '../lib/build-index';
import TakingOrders from '../components/taking-orders';
import { Entity } from '../entities/index.js';

import { NUMBER_OF_SERVERS } from '../utils/config.js';
import createEmployee from '../blueprints/employee.js';
import goal from '../components/goal.js';

const customersQuery = buildIndex([Queue, Position]);
const serversQuery = buildIndex([TakingOrders, Position]);
export function initialise() {
  for (let i = 0; i < NUMBER_OF_SERVERS; i++) {
    const entity = createEmployee();
    TakingOrders.add(entity, {});
  }
}

export function update() {
  let customer: Entity | undefined;
  const customers = customersQuery.getEntities();
  for (const entity of customers) {
    const waiting = Queue.get(entity)!;
    if (waiting.position === 0) {
      const position = Position.get(entity)!;
      if (position.x === QueueHead.x && position.y === QueueHead.y) {
        customer = entity;
      }
      break;
    }
  }

  if (customer == null) {
    return;
  }

  let server = null;
  for (const entity of serversQuery.getEntities()) {
    const position = Position.get(entity)!;
    if (position.x === OrdersCounter.x && position.y === OrdersCounter.y) {
      server = entity;
    } else {
      goal.add(entity, { ...OrdersCounter });
    }
  }

  if (!server) {
    return;
  }

  const customerDetails = PersonalDetails.get(customer)!;
  const serverDetails = PersonalDetails.get(server)!;

  Queue.remove(customer);

  const menu = GlobalStats.get(1)!.menu;

  // TODO: generate the customer's order based on preference
  // maybe this should hand off to a different system?
  if (!menu || !menu.length) {
    console.log(
      `There was nothing on the menu so ${customerDetails.name} just left`,
    );
    return;
  }

  const order = menu[Math.floor(Math.random() * menu.length)];
  if (order.price > customerDetails.cash) {
    console.log(
      `${customerDetails.name} couldn't afford $${order.price} for ${order.name} so they left`,
    );
    return;
  }

  customerDetails.cash -= order.price;
  GlobalStats.get(1)!.cash += order.price;

  console.log(
    `${customerDetails.name} ordered a ${order.name} for $${order.price}`,
  );
  console.log(`${serverDetails.name} is making their order`);
  console.log(`Your cash-on-hand is now $${GlobalStats.get(1)?.cash}`);
  // add the component for processing the order

  WaitingForAnOrder.add(customer, { order });
  TakingOrders.remove(server);
  MakingAnOrder.add(server, MakingAnOrder.server({ ...order, customer }));

  // now we need to re-number all but i of the customers
  for (let i = 1; i < customers.length; i++) {
    const q = Queue.get(customers[i])!;
    if (q && q.position != null) {
      q.position--;
    }
  }
}
