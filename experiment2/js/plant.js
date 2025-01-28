var type1 = {
  sentence: "F[C-F]L[CF+]",
  rule: {
    "F": "F[+.F]FC[-F]",
  },
  drawCycles: 3,
  growCycles: 1,
  angle: 0,
}

var type2 = {
  sentence: "VZFF<F",
  rule: {
    "V": "[+++W][---W]YV",
    "W": "+X[-W]Z",
    "X": "-W[+Z]Z",
    "Y": "YZ",
    "Z": "[-FFF][+FFFC]F",
  },
  drawCycles: 7,
  growCycles: 1,
  angle: 0,
}

var type3 = {
  sentence: "F",
  rule: {
    "F": "FCF[-F]C[+.X]",
    "X": "F+F[++<Z>]",
    "Z": "-FCY",
    "Y": "++CF",
  },
  drawCycles: 3,
  growCycles: 2,
  angle: 0,
}


class Plant {
  constructor(startX, startY, sentence, rule, drawCycles, maxCycles) {
    this.sentence = sentence;
    this.rule = rule;
    this.cycle = 0;
    this.maxCycle = maxCycles;
    this.drawCycle = drawCycles;

    this.turtle = new Turtle(startX, startY)
    this.turtle.setSize(drawSize);
    this.turtle.setColor(color(5,10,50));
    this.drawPlant();
  }

  grow() {
    if (this.cycle < this.maxCycle) {
      this.cycle++
      for (let j = 0; j < this.sentence.length; j++) {
        let instruction = this.sentence.charAt(j);
        handleInstruction(instruction, this.turtle);
      }
    }
  }

  drawPlant() {
      for (let i = 0; i <= this.drawCycle; i++) {
        let nextSentence = "";
        for (let j = 0; j < this.sentence.length; j++) {
          let instruction = this.sentence.charAt(j);
          
          // if F push the rule, otherwise, push the current instruction
          nextSentence += this.rule[instruction] || instruction;
        }
        this.sentence = nextSentence;
      }
      // console.log("Sentence = "+this.sentence);
    }
}
