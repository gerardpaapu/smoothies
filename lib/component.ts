import { type Entity } from '../entities';

type Addition<T> = { entity: Entity; component: T };
type Removal = { entity: Entity };

export interface Component<T> {
  name: string;
  add(entity: Entity, component: T): void;
  remove(entity: Entity): void;
  get(entity: Entity): T | undefined;
  map: Map<Entity, T>;
  additions: Addition<T>[];
  update(): void;
  removals: Removal[];
  entities: Entity[];
}

export function create<T>(name: string): Component<T> {
  const map = new Map<Entity, T>();
  const additions = [] as Addition<T>[];
  const removals = [] as Removal[];

  // let's keep this in sort order, that way
  // we can reassemble the index by iterating
  // through the entity lists of each component
  // in lockstep where componentA[i] <= componentB[j]
  const entities = [] as Entity[];

  return {
    name,
    additions,
    removals,
    map,
    entities,
    update: () => {
      for (const r of removals) {
        map.delete(r.entity);
      }
      removals.splice(0, removals.length);
      for (const a of additions) {
        map.set(a.entity, a.component);
      }
      additions.splice(0, additions.length);
      entities.splice(0, entities.length, ...map.keys());
    },

    add(entity: Entity, component: T) {
      additions.push({ entity, component });
    },

    remove(entity) {
      removals.push({ entity });
    },

    get(entity: Entity) {
      return map.get(entity);
    },
  };
}
