import makingAnOrder from '../components/making-an-order';
import personalDetails from '../components/personal-details';
import queue from '../components/queue';
import buildIndex from '../lib/build-index';
import { getReview } from '../utils/preferences';
import { prepare } from '../utils/prepare';

const index = buildIndex([personalDetails, makingAnOrder]);

export function initialise() {}

export function update() {
  for (const entity of index.getEntities()) {
    const dude = makingAnOrder.get(entity)!;
    const name = personalDetails.get(entity)?.name;
    switch (dude.role) {
      case 'SERVER':
        {
          if (dude.workLeft === 9) {
            console.log(
              `${name} started making ${dude.order.name} for ${personalDetails.get(dude.forCustomer)?.name}`,
            );
          }
          if (dude.workLeft === 1) {
            console.log(`${name} is about to finish making ${dude.order.name}`);
          }
          if (dude.workLeft === 0) {
            console.log(
              `${name} delivers ${dude.order.name} to ${personalDetails.get(dude.forCustomer)?.name}`,
            );
            makingAnOrder.remove(dude.forCustomer);
            makingAnOrder.remove(entity);

            const taster = personalDetails.get(dude.forCustomer)!.taster;
            const review = getReview(taster, {
              name: dude.order.name,
              traits: prepare(dude.order),
            });
            const customerName = personalDetails.get(dude.forCustomer)?.name;

            console.log(`review = ${review}`);
            if (review > 0.5) {
              console.log(`${customerName} enjoyed their ${dude.order.name}`);
            } else if (review < -0.5) {
              console.log(
                `${customerName} didn't like their ${dude.order.name}`,
              );
            } else {
              console.log(
                `${customerName} thought their ${dude.order.name} was just okay`,
              );
            }

            console.log(`${name} is ready to serve another customer`);
            queue.add(entity, { role: 'SERVER' });
          }
          dude.workLeft--;
        }
        break;
      case 'CUSTOMER': {
        console.log(`${name} is waiting for their order`);
      }
    }
  }
}
