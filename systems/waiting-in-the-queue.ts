import PersonalDetails from '../components/personal-details';
import GlobalStats from '../components/global-stats.js';
import Queue from '../components/queue';
import MakingAnOrder from '../components/making-an-order.js';
import WaitingForAnOrder from '../components/waiting-for-an-order.js';

import buildIndex from '../lib/build-index.js';
import * as Entities from '../entities/index.js';
import { getName } from '../utils/names.js';
import { randomTaster } from '../utils/profiles.js';

const index = buildIndex([PersonalDetails, Queue]);

const NUMBER_OF_CUSTOMERS = 12;
const NUMBER_OF_SERVERS = 3;

export function initialise() {
  for (let i = 0; i < NUMBER_OF_CUSTOMERS; i++) {
    let entity = Entities.create();
    // I don't think this is the right place for this
    PersonalDetails.add(entity, {
      name: getName(entity),
      cash: 100,
      mood: { angry: 0, sad: 0, excited: 100 },
      taster: randomTaster(),
    });
    Queue.add(entity, { role: 'CUSTOMER', position: undefined });
  }

  for (let i = 0; i < NUMBER_OF_SERVERS; i++) {
    let entity = Entities.create();
    PersonalDetails.add(entity, {
      name: getName(entity),
      cash: 0,
      mood: { angry: 0, sad: 0, excited: 100 },
      taster: randomTaster(),
    });
    Queue.add(entity, { role: 'SERVER' });
  }
}

export function update() {
  const customers = [];
  const servers = [];
  for (const entity of index.getEntities()) {
    switch (Queue.get(entity)?.role) {
      // TODO: should we export these constants
      case 'CUSTOMER':
        customers.push(entity);
        break;
      case 'SERVER':
        servers.push(entity);
        break;
      default:
        // undefined?
        break;
    }
  }

  console.log(`There are ${customers.length} customers in the queue`);
  console.log(`There are ${servers.length} servers ready to help them`);
  const menu = GlobalStats.get(1)!.menu;

  // take customers from the front of the queue (0) and
  // move them to MakingAnOrder
  let i = 0;
  for (const server of servers) {
    if (i < customers.length) {
      const customer = customers[i++];
      const customerDetails = PersonalDetails.get(customer)!;
      const serverDetails = PersonalDetails.get(server)!;
      Queue.remove(customer);
      Queue.remove(server);

      // TODO: generate the customer's order based on preference
      // maybe this should hand off to a different system?
      if (!menu || !menu.length) {
        console.log(
          `There was nothing on the menu so ${customerDetails.name} just left`,
        );
        continue;
      }

      const order = menu[Math.floor(Math.random() * menu.length)];
      if (order.price > customerDetails.cash) {
        console.log(
          `${customerDetails.name} couldn't afford $${order.price} for ${order.name} so they left`,
        );
        continue;
      }

      customerDetails.cash -= order.price;
      GlobalStats.get(1)!.cash += order.price;

      console.log(
        `${customerDetails.name} ordered a ${order.name} for $${order.price}`,
      );
      console.log(`${serverDetails.name} is making their order`);
      console.log(`Your cash-on-hand is now $${GlobalStats.get(1)?.cash}`);
      // add the component for processing the order
      // TODO: the component module can export constructors
      WaitingForAnOrder.add(customer, { role: 'CUSTOMER', order });
      MakingAnOrder.add(server, {
        role: 'SERVER',
        order,
        forCustomer: customer,
        workLeft: 10,
      });
    }
  }
}
