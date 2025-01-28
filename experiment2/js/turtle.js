// turtle.js - emulates a turtle for drawing
// Author: Ashley Knapp
// Date: 1-27-25

class Turtle {
  // constructor function
  constructor(startX, startY) {
    // create a Turtle object at x,y facing upwards
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.color = color(0, 0, 0);
    this.size = 5;
    this.drawnObjs = [];
  }

  // Set the turtle to a new position (does not draw when moving)
  moveTo(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
  
  // Draw a line from x,y forwards by this.angle
  // stores a DrawnLine object
  moveForward(distance) {
    let newX = this.x + distance * sin(this.angle);
    let newY = this.y - distance * cos(this.angle);

    stroke(this.color);
    line(this.x, this.y, newX, newY);
    let newLine = new DLine(this.x, this.y, newX, newY, this.color, this.size);
    this.drawnObjs.push(newLine);
		
		this.x = newX;
		this.y = newY;
  }

  // Subtracts from the angle
  turnLeft(degrees) {
    this.angle -= degrees;
  }

  // Adds to the angle
  turnRight(degrees) {
    this.angle += degrees;
  }

  // Draws a line at x,y of size
  // stores a DrawnCircle object
  drawDot(size) {
    stroke(this.color);
    strokeWeight(size);
    point(this.x, this.y);
    let newDot = new DCircle(this.x, this.y, this.color, size);
    this.drawnObjs.push(newDot);
    strokeWeight(this.size);
  }

  // Sets the color to a p5 color object
  setColor(colorObject) {
    this.color = colorObject;
    stroke(this.color);
  }

  // Returns the current color
  getColor() {
    return this.color;
  }

  // Adds to the current color (accepts negatives as well)
  adjustColor(r, g, b) {
    let newR = red(this.color) + r;
    let newG = green(this.color) + g;
    let newB = blue(this.color) + b;
    this.color = color(newR, newG, newB);
    stroke(this.color);
  }
  
  // Sets the size for drawing lines
  setSize(size) {
    this.size = size;
  }

  // Returns the current size
  getSize() {
    return this.size;
  }

  // Redraws all of the stored Drawn objects by calling drawObj() on them
  redraw() {
    for (let i = 0; i < this.drawnObjs.length; i++) {
      this.drawnObjs[i].drawObj();
    }
  }
}
