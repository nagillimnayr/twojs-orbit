import Two from 'two.js';
import { Vector } from 'two.js/src/vector';
import { Group } from 'two.js/src/group';
import Body from './modules/Body';
import { DIST_MULT, KM_TO_M } from './modules/physics/constants';

function main() {
  const options = {
    fullscreen: true,
    autostart: false,
  };
  const two = new Two(options);

  // Add two to the DOM
  two.appendTo(document.body);

  // instantiate central body
  const centralBody = new Body(1, 50, 'yellow');

  // instantiate orbiting body
  const orbitingBody = new Body(0, 10, '#0BDA51');
  orbitingBody.position.add({ x: 149.5, y: 0 });
  orbitingBody.velocity.add({ x: 0, y: (30 * KM_TO_M) / DIST_MULT });

  // Solar System
  const solarSystem = new Group();

  // Add bodies to the scene-graph
  centralBody.add(orbitingBody);
  solarSystem.add(centralBody);
  two.add(solarSystem);

  // origin of coordinate system (0, 0)
  const origin = new Vector(two.width * 0.5, two.height * 0.5);
  solarSystem.position.add(origin);
  two.update();

  function update() {
    const deltaTime = two.timeDelta * 0.001;
    // console.log(deltaTime);
    for (let i = 1; i < centralBody.children.length; i += 1) {
      const body = centralBody.children[i];
      // console.log(body);
      body.calculateAcceleration(centralBody);
      body.updateVelocity(deltaTime);
      body.updatePosition(deltaTime);
    }
  }

  two.bind('update', update);
  two.play();
}

window.addEventListener('load', main);
