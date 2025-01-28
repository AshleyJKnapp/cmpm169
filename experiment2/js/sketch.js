// sketch.js - Playing around with an L system
// Author: Ashley Knapp
// Date: 1-27-25

// Constants - User-servicable parts
const forwardSize = 10;
const dotSize = 5;
const sizeInc = 1;
const drawSize = 1;
// Would be const but I cant use PI or HALF_PI here
let leftSize = 3.14/2;
let rightSize = 3.14/2;

// Globals
let bale = []; // Bale is the word for a gathering of turtles
let baleGrammars = [];
let canvasContainer;
var centerHorz, centerVert;
let savedX = [];
let savedY = [];
let savedA = [];

// let sentence = "FCR.FCLLL.FCRRR"
// let sentence = "FCRFCLLL FCRFCLLL FCRFCLLL FCRFCLLL FCRFCLLL"
// let sentence = "FCR.FCLL.F.FCRR.FE"
let sentence = "F[CRF]L[CFL]"

const rule = {
  // "G": "[]",
  "F": "F[LF]F.C[RF]",
  // "]": "F[LF]FC.[RF]",
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

  // Set the rotation constants
  // leftSize = HALF_PI/2.5;
  // rightSize = HALF_PI/2.5;
  leftSize = HALF_PI/4;
  rightSize = HALF_PI/4;

  // -----------------------------
  background(220);    

  // make a turtle with some variations
  // let koopa = new Turtle(centerHorz, centerVert+200);
  // koopa.setSize(drawSize);
  // koopa.setColor(color(5,10,50));
  // bale.push(koopa);
  // baleGrammars.push(sentence);
  
  // for (let i = 0; i < sentence.length; i++) {
  //   let instruction = sentence.charAt(i);
  //   handleInstruction(instruction, koopa);
  // }

  // console.log(koopa.drawnObjs);
  // koopa.redraw();

  // // black line
  // koopa.setColor(color(0, 0, 0));
  // koopa.moveForward(50);

  // // purple dot
  // koopa.setColor(color(180, 90, 190));
  // koopa.drawDot(20);

  // // green line
  // koopa.turnRight(PI/2);
  // koopa.setColor(color(0, 150, 0));
  // koopa.setSize(10);
  // koopa.moveForward(50);

  fakePress();

}

function draw() {
  // var newClr = (second()*20) %360;
  background(160, 220, 235);

  // let testTurt = new Turtle(centerHorz, centerVert+300);
  // testTurt.setSize(drawSize);
  // testTurt.setColor(color(5,10,50));
  

  // // throw("Emergency Halt");
  // if (frameCount <= 1){
  //   for (let i = 0; i <= 3; i++) {
  //     var nextSentence = "";
  //     if (sentence.length > 100000) {
  //       // console.log("breaking");
  //       break;}
  //     for (let j = 0; j < sentence.length; j++) {
  //       let instruction = sentence.charAt(j);
        
  //       // if F push the rule, otherwise, push the current instruction
  //       nextSentence += rule[instruction] || instruction;
  //     }
  //     sentence = nextSentence;
  //   }
  //   console.log("SentenceLength: "+sentence.length);

  // }
  
  // Redraw everything previously drawn
  for (let i = 0; i < bale.length; i++) {
      let plant = bale[i];
      plant.turtle.redraw();
      plant.grow();
  }
  // console.log(sentence);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
  console.log("mouse pressed");
  let tempTurt = new Plant(mouseX, mouseY, sentence, rule, 1);
  bale.push(tempTurt);
  // tempTurt.drawPlant();
  // tempTurt.drawPlant();
}

function fakePress() {
  // let tempTurt = new Plant(centerHorz, centerVert+200, sentence, rule, 1);
  // bale.push(tempTurt);
}

class Plant {
  constructor(startX, startY, sentence, rule, maxCycles) {
    this.sentence = sentence;
    // this.nextSentence;
    this.rule = rule;
    this.cycle = 0;
    this.maxCycle = maxCycles;

    this.turtle = new Turtle(startX, startY)
    this.turtle.setSize(drawSize);
    this.turtle.setColor(color(5,10,50));
    // console.log("POOP! "+this.turtle.angle);
    this.drawPlant();
    // this.drawPlant();
  }

  grow() {
    if (this.cycle < this.maxCycle) {
      this.cycle++
      for (let j = 0; j < this.sentence.length; j++) {
        let instruction = this.sentence.charAt(j);
        // console.log("instruction: "+instruction);
        handleInstruction(instruction, this.turtle);
      }
    }
  }

  drawPlant() {
    console.log("rawing)");

    console.log("POOP! "+this.turtle.sentence);

    // if (this.cycle < this.maxCycle){
    //   this.cycle++
    //   this.drawPlant();
    // }
    
    // let testTurt = new Turtle(centerHorz, centerVert+300);
    // testTurt.setSize(drawSize);
    // testTurt.setColor(color(5,10,50));
    // for (let i = 0; i < this.sentence.length; i++) {
    //   let instruction = this.sentence.charAt(i);
    //   // console.log("instruction: "+instruction);
    //   handleInstruction(instruction, this.turtle);
    // }

    // throw("Emergency Halt");
    // console.log(frameCount < 1000);
    // if (frameCount < 100){ // stop just in case?
      for (let i = 0; i <= 3; i++) {
        let nextSentence = "";
        // if (this.sentence.length > 100000) { // also stop just in case
        //   // console.log("breaking");
        //   break;}
        for (let j = 0; j < this.sentence.length; j++) {
          let instruction = this.sentence.charAt(j);
          
          // if F push the rule, otherwise, push the current instruction
          nextSentence += this.rule[instruction] || instruction;
        }
        this.sentence = nextSentence;
      }
      // console.log("SentenceLength: "+sentence.length);
      // }
    }


}

function handleInstruction(cmd, turt){
  // Move Forward
  if (cmd === "F") {
    turt.moveForward(forwardSize);
  }

  // Move Forward 2
  if (cmd === "G") {
    turt.moveForward(forwardSize);
  }
  
  // Spawn a new turtle
  if (cmd === "1") {
    let babyTurt = new Turtle(turt.x, turt.y);
    babyTurt.setColor(turt.getColor());
    babyTurt.setSize(turt.getSize());
    babyTurt.turnRight(rightSize);
    bale.push(babyTurt);
    // baleGrammars.push("E");
  }
  // new turt facing left
  if (cmd === "2") {
    let babyTurt = new Turtle(turt.x, turt.y);
    babyTurt.setColor(turt.getColor());
    babyTurt.setSize(turt.getSize());
    babyTurt.turnLeft(leftSize);
    bale.push(babyTurt);
    // baleGrammars.push("E");
  }

  // turn180and move forward
  if (cmd === "8") {
    turt.turnLeft(PI);
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
    // turt.x = savedX;
    // turt.y = savedY;
    // turt.angle = savedA;

    turt.x = savedX.pop();
    turt.y = savedY.pop();
    turt.angle = savedA.pop();

    // turt.x = centerHorz;
    // turt.y = centerVert+200;
    // turt.angle = 0;
  }

  // Draw Dot
  if (cmd === ".") {
    // console.log("DRWING DOT");
    turt.drawDot(dotSize);
  }
  
  // Turn Left
  if (cmd === "L") {
    turt.turnLeft(leftSize);
  }
  
  // Turn Right
  if (cmd === "R") {
    turt.turnRight(rightSize);
  }
  
  // Decrement Size
  if (cmd === "-") {
    turt.setSize(turt.getSize() - sizeInc);
  }

  // Decrement Size
  if (cmd === "+") {
    turt.setSize(turt.getSize() + sizeInc);
  }
  
  // Change Color
  if (cmd === "C") {
    turt.adjustColor(.1, .5, .2);
  }

  if (cmd == ";") {
    throw("Emergency Halt");
  }
}