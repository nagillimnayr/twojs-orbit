import Two from 'two.js';
import { Vector } from 'two.js/src/vector';
import { Group } from 'two.js/src/group';
import Body from './modules/Body';

function main() {
  const options = {
    fullscreen: true,
    autostart: true,
  };
  const two = new Two(options);

  // Add two to the DOM
  two.appendTo(document.body);

  // instantiate central body
  const centralBody = new Body(1, 100, 'yellow');

  // instantiate orbiting body
  const orbitingBody = new Body(0, 10, '#0BDA51');
  orbitingBody.circle.position.add({ x: 200, y: 0 });

  // Solar System
  const solarSystem = new Group();

  // Add bodies to the scene-graph
  centralBody.add(orbitingBody);
  solarSystem.add(centralBody);
  two.add(solarSystem);

  // origin of coordinate system (0, 0)
  const origin = new Vector(two.width * 0.5, two.height * 0.5);
  solarSystem.position.add(origin);

  const angularMomentum = -Math.PI / 360;
  function update() {
    orbitingBody.rotation += angularMomentum;
  }

  two.bind('update', update);
}

window.addEventListener('load', main);
