// sketch.js - 
// Author: Ashley Knapp
// Date: 2-10-25
 
// Consts
const rotationScale = 0.005;

// Globals
let canvasContainer;
var centerHorz, centerVert;
let waterShader;

function preload() {
  waterShader = loadShader("shaders/water.vert", "shaders/water.frag");
  marioImg = loadImage('./assets/MPSS_Mario.webp');
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
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();


  // Set up shader
  noStroke();
  
  shader(waterShader);
  
  waterShader.setUniform("resolution", [canvasContainer.width, canvasContainer.height]);

  // water
  // waterShader.setUniform("baseColor", [0.2, 0.3, 1.0]);
  // waterShader.setUniform("peakColor", [0.5, 0.8, 1.0]);
  // waterShader.setUniform("cellSize", 6);
  // waterShader.setUniform("speedScalar", .35);
  // waterShader.setUniform("alph", 0.69);

  // pee mode
  waterShader.setUniform("baseColor", [0.8, 0.6, 0.4]);
  waterShader.setUniform("peakColor", [0.85, 0.75, 0.5]);
  waterShader.setUniform("alph", 0.69);
  waterShader.setUniform("speedScalar", .5);
  waterShader.setUniform("cellSize", 3);
  
  // dookie sewage brown
  // waterShader.setUniform("baseColor", [0.2, 0.1, 0.1]);
  // waterShader.setUniform("peakColor", [0.6, 0.4, 0.2]);
  // waterShader.setUniform("alph", 0.9);
  // waterShader.setUniform("speedScalar", .1);
  // waterShader.setUniform("cellSize", 1);
  

  // Scale and initiate images
  imageMode(CENTER);
  marioImg.resize(0.3 * marioImg.width, 0.3 * marioImg.height);

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  // background(255, 255, 200);
  background(200);

  // Update water texture
  waterShader.setUniform("time", millis()/100);

  resetShader();
  // circle(0, 0, 100);
  image(marioImg, 0, 0);

  shader(waterShader);
  // Draw rotating box
  rotateX(frameCount * rotationScale);
  rotateY(frameCount * rotationScale);
  // sphere(centerVert/1.5);
  box(centerVert/1.2);
}

// -------------------------------------------------
function mousePressed() {
  // Mouse click stuff here
}
