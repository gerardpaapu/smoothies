import type { Component } from './component.js';

export type QueryTemplate = Array<Component<any>>;

export type QueryResults_<T extends Record<string, QueryTemplate>> = {
  [K in keyof T]: Array<number>;
};

export type QueryResults<T extends () => any> = T extends () => infer U
  ? U extends Record<string, QueryTemplate>
    ? QueryResults_<U>
    : never
  : never;

export type System<T extends Record<string, QueryTemplate>> = {
  defineQueries(): Record<string, QueryTemplate>;
  initialise?(): void;
  update(queries: QueryResults_<T>): void;
};
