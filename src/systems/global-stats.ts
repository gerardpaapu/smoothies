import GlobalStats from '../components/global-stats.js';
import { lemonade, tropicalSmoothie, greenSmoothie } from '../utils/recipes.js';

export function defineQueries() {
  return {};
}

export function initialise() {
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
