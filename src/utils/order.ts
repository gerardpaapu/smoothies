import { type Recipe } from './recipes';
import { type Entity } from '../entities';

export type Order = Recipe & { customer: Entity };
