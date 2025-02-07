// sketch.js - Recursive Visual and Sound Generation
// Author: Ashley Knapp
// Date: 2-3-25

// Globals
let canvasContainer;
var centerHorz, centerVert;
let tree;
// Delta Time Variable
let deTime;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  // Set up delta time
  deTime = new DeltaTime();
  // lastFrame = performance.now(); // returned in milliseconds
  // frameTime = 0;

  stroke(0, 130, 164);
  noFill();
  tree = new Tree(centerHorz, centerVert, 200, 9);
  // tree.drawTree();  // draws the next branch
  deTime.setStopWatch();
}

let freqArr = [0, 100, 250, 375, 300, 375, 400, 450, 375];
let typeArr = ["sine", "triangle", "triangle", "triangle", "triangle", "sine", "sine", "sine", "sine"];

let freqI = 0;
let oscArr = [];
let oscI = 0;
let mouseClicked = false;

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    // Delta Time Calculation
    deTime.updateProgramTime();


  if (!mouseClicked) {
    background(255);
    text('Click to begin!', centerHorz, centerVert);
  } else {

    stroke(0, 130, 164, 100);
    noFill();
    
    if (deTime.getStopWatch() > 1) {
      tree.continueTree();
      deTime.setStopWatch();
    }

  }
}

// -------------------------------------------------
function mousePressed() {
  if (!mouseClicked) {
    mouseClicked = true;
    background(255);
  }
}

class DeltaTime {
  constructor() {
    this.frameTime;
    this.dTime;
    this.lastFrame = performance.now(); // returned in milliseconds
    this.frameTime = 0;

    this.stopWatchStart = 0;
  }

  updateProgramTime() {
    const now = performance.now();
    this.dTime = (now - this.lastFrame);
    this.lastFrame = now;
    
    this.frameTime += this.dTime * 0.001; // set the elapsed time in seconds
  }

  getTime() {
    return this.frameTime;
  }

  // Stop Watch Functions
  setStopWatch() {
    this.stopWatchStart = this.frameTime;
  }

  getStopWatch() {
    return this.frameTime - this.stopWatchStart;
  }
}

class Tree {
  constructor(x, y, radius, level) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.level = level;
      this.currentLv = 0;
  }

  continueTree() {
    if (this.currentLv < this.level) {
      this.drawBranch(this.x, this.y, this.radius, this.currentLv);

      // SOUNDS
      let osc = new p5.Oscillator();
      osc.setType(typeArr[freqI]);
      osc.freq(freqArr[freqI]);
      osc.start();
      freqI++;
      append(oscArr, osc);

      // start turning off the oscillators after they are 4 iterations old
      if (4 < this.currentLv && oscI < oscArr.length) {
        oscArr[oscI].stop();
        oscI++;
      }

    } else if (oscI < oscArr.length) {
      oscArr[oscI].stop();
      oscI++;
    }

    this.currentLv++;
  }

  drawBranch(x, y, radius, lv) {
    strokeWeight(lv * 2);

    arc(x, y, radius * 2, radius * 2, -(Math.PI), 0);
    
    if (lv > 0) {
      // left branch
      this.drawBranch(x - radius, y + radius / 2, radius / 2, lv - 1);
      // right branch
      this.drawBranch(x + radius, y + radius / 2, radius / 2, lv - 1);
    }
  }
}
