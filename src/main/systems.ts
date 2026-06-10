import type { System } from '../lib/system.js';
import * as GlobalStats from '../systems/global-stats.js';
import * as GettingBoredAndLeavingTheQueue from '../systems/getting-bored-and-leaving-the-queue.js';
import * as JoiningTheQueue from '../systems/joining-the-queue.js';
import * as Leaving from '../systems/leaving.js';
import * as MakingAnOrder from '../systems/making-an-order.js';
import * as MoodCooldown from '../systems/mood-cooldowns.js';
import * as MovingToYourGoal from '../systems/moving-to-your-goal.js';
import * as NewPeopleArrive from '../systems/new-people-arrive.js';
import * as TakingOrders from '../systems/taking-orders.js';
import * as WaitingForAnOrder from '../systems/waiting-for-an-order.js';
import * as WaitingInTheQueue from '../systems/waiting-in-the-queue.js';

export default [
  GlobalStats,
  GettingBoredAndLeavingTheQueue,
  JoiningTheQueue,
  Leaving,
  MakingAnOrder,
  MoodCooldown,
  MovingToYourGoal,
  NewPeopleArrive,
  TakingOrders,
  WaitingForAnOrder,
  WaitingInTheQueue,
] as Array<System<any>>;
