import { type Component } from './component';
import { type Entity } from '../entities';

export default function buildIndex(components: Component<any>[]) {
  type Cursor = { idx: number; items: Entity[] };

  return {
    getEntities() {
      const cursors = components.map((c) => {
        // TODO: components should keep their own **sorted** list
        // of entities
        const items = c.entities;
        const idx = 0;
        return { idx, items, name: c.name } as Cursor;
      });
      //console.log(cursors);
      const [first, ...rest] = cursors;
      const join = [];
      outer: for (let i = 0; i < first.items.length; i++) {
        let candidate = first.items[i];
        for (const cursor of rest) {
          // move each cursor until the entity at idx is
          // >= candidate, if it's greater than candidate, then
          // it's missing at least one
          while (
            cursor.idx < cursor.items.length &&
            cursor.items[cursor.idx] < candidate
          ) {
            cursor.idx++;
          }
          // there are no more entities from this component
          // therefore there are no more entities in this join
          if (cursor.idx >= cursor.items.length) {
            break outer;
          }

          if (cursor.items[cursor.idx] > candidate) {
            // candidate is not in this component, therefore candidate
            // is not in the join
            continue outer;
          }
        }
        join.push(candidate);
      }

      return join;
    },
  };
}
