// sketch.js - Playing around with an L system
// Author: Ashley Knapp
// Date: 1-27-25

// ----- Constants -----
const forwardSize = 10;
const dotSize = 5;
const sizeInc = 1;
const drawSize = 1.5;
// Plant Type consts in plant.js

// ----- Globals -----
var centerHorz, centerVert;
let canvasContainer;
// Drawing Vars
let bale = []; // Bale is the word for a gathering of turtles
let savedX = [];
let savedY = [];
let savedA = [];
let currentType = type1;
let turnSize;
// Delta Time Variables
let lastFrame;
let frameTime;
let dTime;
let shimpArr = [];

function preload(){
  // Preload Images
  shrimp1 = loadImage('./assets/shirmlp.png');
  shrimp2 = loadImage('./assets/shrimp-flat-color-png.webp');
  shrimp3 = loadImage('./assets/ugly ass shrimp.png');
}

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
  
  // resize canvas if the page is resized
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  // ------------------------

  // Set the rotation constants
  type1["angle"] = HALF_PI/4;
  type2["angle"] = HALF_PI/4;
  type3["angle"] = HALF_PI/4;

  // Set up delta time
  lastFrame = performance.now(); // returned in milliseconds
  frameTime = 0;

  // Scale and initiate images
  imageMode(CENTER);
  shrimp1.resize(0.2 * shrimp1.width, 0.2 * shrimp1.height);
  shrimp2.resize(0.2 * shrimp2.width, 0.2 * shrimp2.height);
  shrimp3.resize(0.15 * shrimp3.width, 0.15 * shrimp3.height);
  
  // Shrimp1
  let liveShrimp = new BouncingObj(shrimp1, centerHorz, centerVert, 50, canvasContainer.width()-50, 2);
  shimpArr.push(liveShrimp);

  // Shrimp2
  // shrimp1.resize(0.2 * shrimp1.width, 0.2 * shrimp1.height);
  let liveShrimp2 = new BouncingObj(shrimp2, centerHorz, centerVert-200, 50, canvasContainer.width()-50, 1.25);
  shimpArr.push(liveShrimp2);

  // Shrimp3
  let liveShrimp3 = new BouncingObj(shrimp3, centerHorz, centerVert+150, 50, canvasContainer.width()-50, .78);
  shimpArr.push(liveShrimp3);

  // Debugging function
  // autoPress();
}

function draw() {
  // Delta Time Calculation
  findDeltaTime();

  // Gradient from this sketch found on Google
  // https://editor.p5js.org/evebdn/sketches/O9G35ueZv
  c1 = color(0, 69, 191);
  c2 = color(63, 191, 191);
  
  for(let y = 0; y < height; y++) {
    n = map(y, 0, height, 0, 1);
    let newc = lerpColor(c2, c1, n);
    stroke(newc);
    line(0, y, width, y);
  }

  // Plain Background
  // background(160, 220, 235);

  // Draw "sand"
  fill(240, 200, 140);
  rect(0, canvasContainer.height()-(centerVert/3), canvasContainer.width(), canvasContainer.height());

  // Draw animated shrimp (animated with deltaTime)
  for (let i = 0; i < shimpArr.length; i++) {
    shimpArr[i].updateMovement(frameTime);
  }

  // Redraw everything previously drawn
  for (let i = 0; i < bale.length; i++) {
      let plant = bale[i];
      plant.turtle.redraw();
      plant.grow();
  }
}

// --------------------------------------------------------------
// ----- TIME -----
function findDeltaTime(){
  const now = performance.now();
  dTime = (now - lastFrame);
  lastFrame = now;
  
  return frameTime += dTime * 0.001; // Elapsed time in seconds
}

// ----- INPUTS -----
function keyPressed() {
  if (key === '1') {
    currentType = type1;
    turnSize = currentType.angle;
  }

  if (key === '2') {
    currentType = type2;
    turnSize = currentType.angle;
  }

  if (key === '3') {
    currentType = type3;
    turnSize = currentType.angle;
  }

  if (key === 'c') {
    clearPlants();
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
  turnSize = currentType.angle;
  let tempTurt = new Plant(mouseX, mouseY, currentType.sentence, currentType.rule, currentType.drawCycles, currentType.growCycles);
  bale.push(tempTurt);
}

// Draws a plant in the middle of the screen
// Used for debugging so you dont have to click every time.
function autoPress() {
  currentType = type3;
  turnSize = currentType.angle;
  let tempTurt = new Plant(centerHorz, centerVert+200, currentType.sentence, currentType.rule, currentType.drawCycles, currentType.growCycles);
  bale.push(tempTurt);
}

// Erase all of the drawn plants
function clearPlants() {
  bale = [];
}

// ----- HELPERS -----

function handleInstruction(cmd, turt){
  // Move Forward
  if (cmd === "F") {
    turt.moveForward(forwardSize);
  }

  // save position
  if (cmd === "[") {
    savedX.push(turt.x);
    savedY.push(turt.y);
    savedA.push(turt.angle);
  }

  // go back to saved position
  if (cmd === "]") {
    turt.x = savedX.pop();
    turt.y = savedY.pop();
    turt.angle = savedA.pop();
  }

  // Draw Dot
  if (cmd === ".") {
    turt.drawDot(dotSize);
  }
  
  // Turn Left
  if (cmd === "+") {
    turt.turnLeft(turnSize);
  }
  
  // Turn Right
  if (cmd === "-") {
    turt.turnRight(turnSize);
  }
  
  // Decrement Size
  if (cmd === "<") {
    turt.setSize(turt.getSize() - sizeInc);
  }

  // Increment Size
  if (cmd === ">") {
    turt.setSize(turt.getSize() + sizeInc);
  }
  
  // Change Color Towards Green
  if (cmd === "C") {
    turt.adjustColor(.1, .5, .2);
  }
}
