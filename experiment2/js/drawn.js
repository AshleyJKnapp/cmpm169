// drawn.js - stores data of drawable objects to allow them to be redrawn
// Author: Ashley Knapp
// Date: 1-27-25

class Drawn {
  constructor(colorNums, lineSize) {
    this.color = colorNums;
    this.size = lineSize;
  }
}

class DCircle extends Drawn {
  constructor(x, y, colorNums, lineSize) {
    super(colorNums, lineSize);
    this.x = x;
    this.y = y;
  }

  drawObj() {
    strokeWeight(this.size);
    stroke(this.color);

    point(this.x, this.y);
  }
}

class DLine extends Drawn {
  constructor(x1, y1, x2, y2, colorNums, lineSize) {
    super(colorNums, lineSize);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  drawObj() {
    strokeWeight(this.size);
    stroke(this.color);

    line(this.x1, this.y1, this.x2, this.y2);
  }
}
