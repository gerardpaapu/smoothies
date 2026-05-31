import * as GlobalStats from '../systems/global-stats';
import * as JoiningTheQueue from '../systems/joining-the-queue';
import * as MakingAnOrder from '../systems/making-an-order';
import * as MoodCooldown from '../systems/mood-cooldowns';
import * as MovingToYourGoal from '../systems/moving-to-your-goal';
import * as NewPeopleArrive from '../systems/new-people-arrive';
import * as TakingOrders from '../systems/taking-orders';
import * as WaitingForAnOrder from '../systems/waiting-for-an-order';
import * as WaitingInTheQueue from '../systems/waiting-in-the-queue';

export default [
  GlobalStats,
  JoiningTheQueue,
  MakingAnOrder,
  MoodCooldown,
  MovingToYourGoal,
  NewPeopleArrive,
  TakingOrders,
  WaitingForAnOrder,
  WaitingInTheQueue,
];
