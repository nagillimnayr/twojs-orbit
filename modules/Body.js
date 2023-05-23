import { Group } from 'two.js/src/group';
import { Circle } from 'two.js/src/shapes/circle';
import { Vector } from 'two.js/src/vector';
import {
  GRAV_CONST, DIST_MULT, SOLAR_MASS, DAY,
} from './physics/constants';

const timeScale = 10;

export default class Body extends Group {
  constructor(mass = 0, radius = 10, color = '#fff') {
    super();
    this.mass = mass;
    this.circle = new Circle(0, 0, radius);
    this.circle.fill = color;
    this.circle.stroke = 'black';
    this.add(this.circle);

    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
  }

  /** Updates the position of the body based on it's velocity
   *
   * @param {number} deltaTime The time in seconds of the time-step between updates.
   */
  updatePosition(deltaTime) {
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime * DAY * timeScale));
    // console.log('position: ', this.position);
  }

  /** Updates the velocity of the body based on it's acceleration
   *
   * @param {number} deltaTime The time in seconds of the time-step between updates.
   */
  updateVelocity(deltaTime) {
    this.velocity.add(this.acceleration.clone().multiplyScalar(deltaTime * DAY * timeScale));
    // console.log('velocity: ', this.velocity);
  }

  /** Calculates the instantaneous acceleration of the orbiting body
   *
   * @param {number} centralMass Mass of the central body.
   * @param {Vector} centralPos Position of the central body.
   */
  calculateAcceleration({ mass: centralMass, position: centralPos }) {
    const diffPos = centralPos.clone().sub(this.position);
    // console.log('diffPos:', diffPos);
    const distSquared = diffPos.clone().multiplyScalar(DIST_MULT).lengthSquared();
    // console.log('distSquared: ', distSquared);
    const direction = diffPos.clone().normalize();
    // console.log('direction: ', direction);

    const gravForce = (GRAV_CONST * centralMass * SOLAR_MASS) / distSquared;
    // console.log('gravForce: ', gravForce);

    this.acceleration = direction.clone().multiplyScalar(gravForce);
    this.acceleration.divideScalar(DIST_MULT);
  }
}
