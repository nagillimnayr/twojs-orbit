import Two from 'two.js';
import { Vector } from 'two.js/src/vector';
import Body from './modules/Body';

function main() {
  const options = {
    fullscreen: true,
    autostart: true,
  };
  const two = new Two(options);
  two.appendTo(document.body);

  // origin of coordinate system (0, 0)
  const origin = new Vector(two.width * 0.5, two.height * 0.5);

  // instantiate central body
  const centralBody = new Body(1, 100, origin);

  // instantiate orbiting body and position to the right of the central body
  const orbitingBody = new Body(0, 10, Vector.add(origin, Vector.right.multiply(200)));

  // Add bodies to the scene
  two.add(centralBody);
  two.add(orbitingBody);
}

window.addEventListener('load', main);
