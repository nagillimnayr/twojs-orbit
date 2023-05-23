import { Circle } from 'two.js/src/shapes/circle';

export default class Body extends Circle {
  constructor(mass = 0, radius = 10, { x, y } = { x: 0, y: 0 }, color = '#fff') {
    super(x, y, radius);
    this.mass = mass;
    this.fill = color;
    this.stroke = 'black';
  }
}
