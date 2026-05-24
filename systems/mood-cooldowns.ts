// Moods are away from neutral, so they all fade over time
// at roughly the same rate.
//
// e.g. instead of boredom going up, excitement goes down
// unless something happens to make them excited
import personalDetails from '../components/personal-details';

import buildIndex from '../lib/build-index';

const index = buildIndex([personalDetails]);

export function initialise() {}

export function update() {
  for (const entity of index.getEntities()) {
    const { mood } = personalDetails.get(entity)!;
    for (const k in mood) {
      mood[k as keyof typeof mood] *= 0.99;
    }
  }
}
