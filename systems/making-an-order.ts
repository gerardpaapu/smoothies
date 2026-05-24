import MakingAnOrder from '../components/making-an-order';
import PersonalDetails from '../components/personal-details';
import WaitingForAnOrder from '../components/waiting-for-an-order';
import buildIndex from '../lib/build-index';

const index = buildIndex([PersonalDetails, MakingAnOrder]);

export function initialise() {}

export function update() {
  for (const entity of index.getEntities()) {
    const making = MakingAnOrder.get(entity)!;
    const details = PersonalDetails.get(entity)!;
    const customerDetails = PersonalDetails.get(making.order.customer)!;

    if (making.workLeft === 9) {
      console.log(
        `${details.name} started making ${making.order.name} for ${customerDetails.name}`,
      );
    }

    if (making.workLeft === 1) {
      console.log(
        `${details.name} is about to finish making ${making.order.name}`,
      );
    }

    if (making.workLeft === 0) {
      console.log(
        `${details.name} delivers ${making.order.name} to ${customerDetails.name}`,
      );

      WaitingForAnOrder.add(entity, WaitingForAnOrder.server(making.order));
      MakingAnOrder.remove(entity);
    }

    making.workLeft--;
  }
}
