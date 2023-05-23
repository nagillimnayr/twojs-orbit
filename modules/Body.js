import { Group } from 'two.js/src/group';
import { Circle } from 'two.js/src/shapes/circle';
import { Vector } from 'two.js/src/vector';
import { GRAV_CONST, DIST_MULT, SOLAR_MASS } from './physics/constants';

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
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
  }

  /** Updates the velocity of the body based on it's acceleration
   *
   * @param {number} deltaTime The time in seconds of the time-step between updates.
   */
  updateVelocity(deltaTime) {
    this.velocity.add(this.acceleration.clone().multiplyScalar(deltaTime));
  }

  /** Calculates the instantaneous acceleration of the orbiting body
   *
   * @param {number} centralMass Mass of the central body.
   * @param {Vector} centralPos Position of the central body.
   */
  calculateAcceleration({ mass: centralMass, position: centralPos }) {
    const diffPos = centralPos.clone().sub(this.position);
    const distSquared = diffPos.clone().multiplyScalar(DIST_MULT).lengthSquared();
    const direction = diffPos.clone().normalize();

    const gravForce = (GRAV_CONST * centralMass * SOLAR_MASS) / distSquared;

    this.acceleration = direction.clone().multiplyScalar(gravForce);
  }
}
