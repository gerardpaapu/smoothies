import PersonalDetails from '../components/personal-details';
import Queue from '../components/queue';
import MakingAnOrder, { lemonade } from '../components/making-an-order.js';
import buildIndex from '../lib/build-index.js';
import * as Entities from '../entities/index.js';
import { getName } from '../utils/names.js';

const index = buildIndex([PersonalDetails, Queue]);

const NUMBER_OF_CUSTOMERS = 12;
const NUMBER_OF_SERVERS = 2;

export function initialise() {
  for (let i = 0; i < NUMBER_OF_CUSTOMERS; i++) {
    let entity = Entities.create();
    PersonalDetails.add(entity, {
      name: getName(entity),
    });
    Queue.add(entity, { role: 'CUSTOMER', position: undefined });
  }

  for (let i = 0; i < NUMBER_OF_SERVERS; i++) {
    let entity = Entities.create();
    PersonalDetails.add(entity, { name: getName(entity) });
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

  // take customers from the front of the queue (0) and
  // move them to MakingAnOrder
  let i = 0;
  for (const server of servers) {
    if (i < customers.length) {
      const customer = customers[i++];
      Queue.remove(customer);
      Queue.remove(server);
      // TODO: generate the customer's order based on preference
      // maybe this should hand off to a different system?
      const order = lemonade();

      console.log(
        `${PersonalDetails.get(customer)?.name} ordered a ${order.name}`,
      );

      console.log(`${PersonalDetails.get(server)?.name} is making their order`);

      // add the component for processing the order
      // TODO: the component module can export constructors
      MakingAnOrder.add(customer, { role: 'CUSTOMER', order });
      MakingAnOrder.add(server, {
        role: 'SERVER',
        order,
        forCustomer: customer,
        workLeft: 10,
      });
    }
  }
}
