import GlobalStats from '../components/global-stats';
import { lemonade, tropicalSmoothie, greenSmoothie } from '../utils/recipes';

export function initialise() {
  console.log(`Initialise`);
  GlobalStats.add(1, {
    cash: 1_000,
    day: 1,
    time: 9,
    menu: [lemonade(), tropicalSmoothie(), greenSmoothie()],
  });
}

export function update() {
  GlobalStats.get(1)!.time++;
}
