import MakingAnOrder from '../components/making-an-order';
import PersonalDetails from '../components/personal-details';
import WaitingForAnOrder from '../components/waiting-for-an-order';
import buildIndex from '../lib/build-index';

const index = buildIndex([PersonalDetails, MakingAnOrder]);

export function initialise() {}

export function update() {
  for (const entity of index.getEntities()) {
    const server = MakingAnOrder.get(entity)!;
    const name = PersonalDetails.get(entity)?.name;
    switch (server.role) {
      case 'SERVER':
        {
          if (server.workLeft === 9) {
            console.log(
              `${name} started making ${server.order.name} for ${PersonalDetails.get(server.forCustomer)?.name}`,
            );
          }
          if (server.workLeft === 1) {
            console.log(
              `${name} is about to finish making ${server.order.name}`,
            );
          }

          if (server.workLeft === 0) {
            console.log(
              `${name} delivers ${server.order.name} to ${PersonalDetails.get(server.forCustomer)?.name}`,
            );

            // TODO: make a constructor for this
            WaitingForAnOrder.add(entity, {
              role: 'SERVER',
              order: server.order,
              forCustomer: server.forCustomer,
            });
            MakingAnOrder.remove(entity);
          }
          server.workLeft--;
        }
        break;
      case 'CUSTOMER': {
        // console.log(`${name} is waiting for their order`);
      }
    }
  }
}
