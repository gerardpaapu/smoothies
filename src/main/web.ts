import components from './components.js';
import systems from './systems.js';
import { render } from './render.js';
import type { System } from '../lib/system.js';
import type { Query } from '../lib/query.js';
import type { Component } from '../lib/component.js';

import createQuery from '../lib/query.js';

let tick = 0;
const queries = new Map<System<any>, Record<string, Query>>();
const __queries = new Map<string, Query>();

function update() {
  tick++;
  for (const query of __queries.values()) {
    query.refresh(tick);
  }

  for (const system of systems) {
    const queryResults = Object.create(null);
    for (const [name, query] of Object.entries(queries.get(system) ?? {})) {
      queryResults[name] = query.getEntities();
    }
    system.update(queryResults);
  }

  for (const component of components) {
    component.update(tick);
  }

  render();
}

function initialise() {
  for (const system of systems) {
    const _queries = {} as Record<string, Query>;
    queries.set(system, _queries);

    for (const [name, template] of Object.entries(
      system.defineQueries() ?? {},
    )) {
      const key = template
        .toSorted((a: Component<unknown>, b: Component<unknown>) =>
          a.name >= b.name ? -1 : 1,
        )
        .map((_: Component<unknown>) => _.name)
        .join('##');

      let query = __queries.get(key);
      if (query == undefined) {
        query = createQuery(template);
        __queries.set(key, query);
      }

      _queries[name] = query;
    }

    system.initialise?.();
  }
  for (const component of components) {
    component.update(tick);
  }
}

initialise();
setInterval(update, 1000 / 30);
