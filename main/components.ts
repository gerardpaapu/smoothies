// import all the components
import GlobalStats from '../components/global-stats';
import Queue from '../components/queue';
import Serving from '../components/serving';
import MakingAnOrder from '../components/making-an-order';
import WaitingForAnOrder from '../components/waiting-for-an-order';
import PersonalDetails from '../components/personal-details';
import Position from '../components/position';

import Goal from '../components/goal';
import TakingOrders from '../components/taking-orders';
import Blender from '../components/blender';
import DeliveringAnOrder from '../components/delivering-an-order';
import IngredientsBucket from '../components/ingredients-bucket';
import JoiningTheQueue from '../components/joining-the-queue';

// do something with them...
export default [
  Blender,
  DeliveringAnOrder,
  GlobalStats,
  Goal,
  IngredientsBucket,
  JoiningTheQueue,
  MakingAnOrder,
  PersonalDetails,
  Position,
  Queue,
  Serving,
  TakingOrders,
  WaitingForAnOrder,
];
