import { type Component } from './component.js';
import { type Entity } from '../entities/index.js';

type Cursor = { idx: number; items: Entity[] };

export interface Query {
  refresh(tick: Entity): void;
  getEntities(): Entity[];
}

export default function createQuery(components: Component<any>[]): Query {
  const cursors = components.map((c) => {
    const items = c.entities;
    const idx = 0;
    return { idx, items, name: c.name } as Cursor;
  });

  let entities = [] as Entity[];
  let lastUpdated = -1;

  function buildJoin() {
    if (cursors.length === 0) {
      return [];
    }

    for (const cursor of cursors) {
      cursor.idx = 0;
    }

    const [first, ...rest] = cursors;
    const join = [];
    outer: for (let i = 0; i < first!.items.length; i++) {
      let candidate = first!.items[i]!;
      for (const cursor of rest) {
        // move each cursor until the entity at idx is
        // >= candidate, if it's greater than candidate, then
        // it's missing at least one
        while (
          cursor.idx < cursor.items.length &&
          cursor.items[cursor.idx]! < candidate
        ) {
          cursor.idx++;
        }
        // there are no more entities from this component
        // therefore there are no more entities in this join
        if (cursor.idx >= cursor.items.length) {
          break outer;
        }

        if (cursor.items[cursor.idx]! > candidate) {
          // candidate is not in this component, therefore candidate
          // is not in the join
          continue outer;
        }
      }

      join.push(candidate);
    }

    return join;
  }

  function isStale() {
    for (const c of components) {
      if (lastUpdated === -1 || c.lastUpdate >= lastUpdated) {
        return true;
      }
    }

    return false;
  }

  function refresh(tick: number) {
    if (isStale()) {
      entities = buildJoin();
      lastUpdated = tick;
    }
  }

  function getEntities() {
    return entities!;
  }

  return { getEntities, refresh };
}
