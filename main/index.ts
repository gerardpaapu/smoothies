import components from './components';
import systems from './systems';

function update() {
  for (const system of systems) {
    system.update();
  }

  for (const component of components) {
    component.update();
  }
}

function initialise() {
  for (const system of systems) {
    system.initialise();
  }
  for (const component of components) {
    component.update();
  }
}

initialise();
setInterval(update, 1000);
