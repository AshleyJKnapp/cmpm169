// sketch.js - Vector animation in p5.js
// Author: Ashley Knapp
// Date: 1/20/2025

// Note that p5.js looks for a file called sketch.js

// Conststants
const defaultBPM = 100;

// Globals
let canvasW = 900;
let canvasH = 700;
let tapBPM = 100;
let tapIntervals = [];
let lastFrame;
let frameTime;
let dTime;
let canvasContainer;
var centerHorz, centerVert;

function preload(){
  personImg = loadImage('./person.png');
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  canvasW = canvasContainer.width(); // Adjusted for drawing logic
  canvasH = canvasContainer.height(); // Adjusted for drawing logic
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

  lastFrame = performance.now(); // returned in milliseconds
  frameTime = 0;
  imageMode(CENTER);
  personImg.resize(443, 602);
}

function draw() {
  background(25);
  
  // Delta Time Calculation
  findDeltaTime();
  
  // BPM Text
  fill(255, 255, 255);
  text("BPM: " + tapBPM, 15, 25)
  
  // Adjust BPM for animation
  let waveBPM = tapBPM;
  waveBPM = (waveBPM * 0.0255 * 2);
  // idk why it looks best with this number

  
  // Draw Visualizer
  let scalar = 0.3;
  drawWaveforms(-2, waveBPM, canvasH/2);
  
  image(personImg, (canvasW/2)-15, (canvasH/2)+100);
  
  drawCircleVisual(canvasH/2, scalar, waveBPM);
}


// (scale, vertOffset)
function drawCircleVisual(vertOffset, scalar, bpm){
  // Clipping Circle
  stroke(255, 130, 0);
  fill(0);
  
  let pulse = (25 * scalar) * cos(frameTime * bpm * 4) + (500 * scalar);
  
  circle(canvasW/2, vertOffset, pulse);
  
  // Clipping mask start
  push();
  
  beginClip();
  circle(canvasW/2, vertOffset, pulse);
  endClip();
  
  background(0);
  drawWaveforms(scalar, bpm, vertOffset);
  
  // Clipping mask end
  pop();
}

// ------ Helpers ------
// Key Press Handling
function keyPressed() {
  // if reset key is pressed
  if (key === 'r') {
    tapBPM = defaultBPM;
    tapIntervals = [];
  } else {
    // If more than 2 taps have been recorded
    if (tapIntervals.length > 1){
      tapIntervals.push(frameTime);
      
      // Reset counter if it has been longer than 2 seconds
      if (tapIntervals[tapIntervals.length-1] - tapIntervals[tapIntervals.length-2] > 2) {
        tapIntervals = [];
      } else {
        // Find the BPM
        tapBPM = findWeighted();
        console.log("tapped BPM: " + tapBPM);
      }
    } else {
      tapIntervals.push(frameTime);
    }
  }
}

// Calculates DeltaTime for time based animation
function findDeltaTime(){
  const now = performance.now();
  dTime = (now - lastFrame);
  lastFrame = now;
  
  return frameTime += dTime * 0.001; // Elapsed time in seconds
}

// Finds BPM with normal averages
function findBPM() {
  let sum = 0;
  for(let i = 1; i < tapIntervals.length; i++){
    sum += tapIntervals[i] - tapIntervals[i-1];
  }
  let avg = sum / tapIntervals.length;
  return floor(60 / avg);
}

// Find Weighted BPM (recent taps = more weight)
function findWeighted() {
  let sum = 0;
  let weights = 0;
  for(let i = 1; i < tapIntervals.length; i++){
    // Dynamically cap weights
    let capIndex = tapIntervals.length - Math.floor(tapIntervals.length / 10);
    let curWeight = (i < capIndex) ? i : capIndex;
    // let curWeight = i;
    weights += curWeight;
    sum += ((tapIntervals[i] - tapIntervals[i-1]) * curWeight);
  }
  let avg = sum / weights;
  return round(60 / avg);
}

// This function draws the group of waves with specified parameters
function drawWaveforms(scalar, bpm, vertOffset){
  
  
  // Adjustable variables
  // let scalar = 0.3;
  //let vertOffset = ;
  let w1HorzOffset = (-HALF_PI + (frameTime * 2) * scalar);
  let w2HorzOffset = (-(frameTime * bpm * 2) * scalar);
  let w1Amp = (75 * scalar) * (2 * cos(frameTime * bpm * 1));
  let w2Amp = (75 * scalar) * (1 * cos(frameTime * bpm * 1)) - (100 * scalar);
  let w1Freq = (0.0625 / (scalar));
  let w2Freq = (0.015625 / (scalar));
  
  
  // -- Wave 1 --
  // Line Settings
  strokeWeight(2);
  noFill();
  stroke(255, 50, 255); // Magenta
  
  let wave1 = new SinWave(vertOffset, w1HorzOffset, w1Amp, w1Freq);
  let wave1angles = wave1.calcLine(); // Calculate the wave and store its angles
  wave1.draw();
  
  // -- Wave 2 --
  // Line Settings
  stroke(100, 200, 255); // Blue
  
  let wave2 = new SinWave(vertOffset, w2HorzOffset, w2Amp, w2Freq);
  let wave2angles = wave2.calcLine(); // Calculate the wave and store its angles
  wave2.draw();
  
  // -- Wave 3 --
  // Line Settings
  stroke(100, 255, 100); // Green
  
  let w3Amp = (abs(w1Amp) < abs(w2Amp)) ? w1Amp : w2Amp; // Use the smaller amplitude
  let wave3pts = multiplyCoords(w3Amp, wave1angles, wave2angles); // Multiply stored angles and reapply amplitude
  
  let wave3 = new Wave(vertOffset);
  wave3.setPoints(wave3pts);
  wave3.draw(); // Draw the wave with applied amplitude

}

// This currently assumes the arrays are the same length
function multiplyCoords(amplitude, arrA, arrB) {
  let retArr = [];
  for (let i = 0; i < arrA.length; i++) {
      xPrime = i;
      // Product sum cos*sin identity
      let yPrime = sin(arrA[i]+arrB[i]) - sin(arrA[i]-arrB[i]);
      retArr.push([xPrime, amplitude*yPrime/2]);
  }
  return retArr;
}


// ------ Classes ------
class Wave {
  constructor(shiftVert) {
    this.shiftVert = shiftVert;
    this.points = [];
    this.angles = [];
  }
  
  // Sets points array with a given array
  setPoints(newPoints) {
    this.points = newPoints;
  }
  
  // Draws the points stored in points
  draw(){
    if (this.points.length < 1){
      console.log("No points calculated");
    } else {
      beginShape();
      
      for (let i = 0; i < this.points.length; i++) {
        let x = this.points[i][0];
        let y = this.points[i][1] + (this.shiftVert);
        vertex(x, y);
      }
      endShape();
    }
    
  }
}

class SinWave extends Wave{
  
  constructor(shiftVert, shiftHoriz, amplitude, freqy) {
    super(shiftVert); // Calls the constructor of the super-class
    // this.shiftVert = shiftVert;
    this.shiftHoriz = shiftHoriz;
    this.amplitude = amplitude;
    this.freqy = freqy;
  }
  
  // Calculate all the points that make up the line and store.
  calcLine() {
    for (let i = 0; i < canvasW; i++){
      let x = i;
      let angle = this.freqy * (x)-this.shiftHoriz;
      let y = this.amplitude * sin(this.freqy * (x)-this.shiftHoriz);
      let coords = [x,y]
      this.points.push(coords);
      this.angles.push(angle);
    }
    // return this.points;
    return this.angles;
  }
  
}