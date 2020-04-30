class Layer {
  constructor() {
    this.sides = SIDES;
    this.numShapes = this.sides;
    this.angle = 360 / this.numShapes;
    this.stepsOut = 8;
    this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut;
    this.thinStroke = 1;
    this.thickStroke = 3;
    this.layerColor = getRandomFromPalette();
  };
}; // end Layer

class Circles extends Layer {
  constructor(){
    super();
    this.shapeSize = (CRYSTAL_SIZE / 2 ) * 0.93;
    this.position = (CRYSTAL_SIZE / 2 ) - ( this.shapeSize / 2 );
  }; // end constructor

  render(){
    noFill(0);
    stroke(this.layerColor);
    strokeWeight(1);
    push();
      translate(width/2, height/2);
      for (let i = 0; i <= this.numShapes; i++) {
        ellipse( this.position, 0, this.shapeSize, this.shapeSize);
        rotate(this.angle);      
      };
    pop();
  }; // end render
}; // end Circles

class SimpleLines extends Layer {
  constructor(){
    super();
    this.numSteps = randomSelectTwo() ? this.stepsOut : int(this.stepsOut * 1.25);
    this.step = ( CRYSTAL_SIZE / 2 ) / this.numSteps;
    this.start = floor(random( 0, this.numSteps ));
    this.stop = floor(random(this.start, this.numSteps + 1));
    this.weight = randomSelectTwo() ? this.thinStroke : this.thinStroke;
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2;
    this.angle = 360 / this.numShapes;
  
  }; // end constructor

  render(){
    noFill(0);
    stroke(this.layerColor);
    strokeWeight(this.weight);
    push(); // push pop only applies this transform/rotate to what's inside. then goes back
      translate(width/2, height/2); // this moves the x,y 0,0 to the centre(or whereever you set it)
      for (let i = 0; i < this.numShapes; i++) {
        line(this.start * this.step, 0, this.stop * this.step, 0);
        rotate( this.angle );
      }
    pop();
  }; // end render
} // end SimpleLines

class OutlineShape extends Layer {
  constructor(){
    super();
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
    this.hexagonTrue = randomSelectTwo();
  }; // end constructor

  render(){
    stroke(this.layerColor);
    strokeWeight(this.weight);
    push();
      translate( width/2, height/2 );
      if (this.hexagonTrue) {
        hexagon(0, 0, CRYSTAL_SIZE / 2);
      } else {
        ellipse( 0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE );
      }
    pop();
  }; // end render
}; // end OutlineShape

class DottedLines extends Layer {
  constructor(){
    super();
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2;
    this.angle = 360 / this.numShapes;
    this.shapeSize = 3;
    this.centerOffset = this.singleStep;
  }; // end constructor

  render(){
    fill(this.layerColor);
    noStroke();
    push();
      translate(width / 2, height / 2);
      for (let i = 0; i < this.numShapes; i++) {
        for (let x = this.centerOffset; x < CRYSTAL_SIZE / 2; x += this.singleStep) {
          rect(x, 0, this.shapeSize, this.shapeSize);
        };
        rotate(this.angle);
      };
    pop();
  }; // end render
}; // end DottedLines

class CenteredShape extends Layer {
  constructor(){
    super();
    this.randomShape = random(1);
    this.shapeSize = floor(random(this.stepsOut /2, this.stepsOut)) * this.singleStep;
  }; // end constructor
  render(){
    fill(this.layerColor);
    noStroke();
    push();
      translate(width/2, height/2);
      if (this.randomShape < 0.1) {
        rect(0, 0, this.shapeSize*2, this.shapeSize*2);
      } else if (this.randomShape >= 0.1 && this.randomShape <= 0.6){
        ellipse(0,0,this.shapeSize*2, this.shapeSize*2);
      } else if (this.randomShape > 0.6 ) {
        rotate(this.angle /2);
        hexagon(0, 0, this.shapeSize)
      }
    pop();
  }; // ends render
}; // end CenteredShape

class RingOfShapes extends Layer {
  constructor(){
    super();
    this.steps = floor(random(1, this.stepsOut));
    this.center = this.steps * this.singleStep;
    this.randomShape = random(1);
    this.direction = randomSelectTwo(); // used for triangle only
    this.fillColor = randomSelectTwo() ? this.layerColor : color(0,1);
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;

    if (this.steps < this.stepsOut/2) {
      this.radius = floor(random(1, this.steps)) * this.singleStep;
    } else if (this.steps > this.stepsOut > 2) {
      this.radius = floor(random(1, this.stepsOut - this.step)) * this.singleStep;
    } else {
      this.radius = floor(random(1, (this.stepsOut / 2) +1)) * this.singleStep;
    }
  }; // end constructor
  render(){
    stroke(this.layerColor);
    fill(this.fillColor);
    strokeWeight(this.weight);
    push();
      translate(width/2, height/2);
      for (let i = 0; i < this.numShapes; i++) {
        if (this.randomShape < 0.33) {
          ellipse(0,this.center,this.radius, this.radius);
        } else if (this.randomShape >= 0.33 && this.randomShape <= 0.66){
          rect(0, this.center, this.radius, this.radius);
        } else if (this.randomShape > 0.66 ) {
          myTriangle(this.center, this.radius, this.direction)
        }
        rotate(this.angle)
      }
    pop();
  }; // ends render
}; // end RingOfShapes

class SteppedHexagon extends Layer {
  constructor(){
    super();
    this.numSteps = randomSelectTwo() ? this.stepsOut : this.stepsOut * 1.25;
    this.centerOffset = (CRYSTAL_SIZE /2 ) * 0.15;
    this.singleStep = ((CRYSTAL_SIZE /2) - this.centerOffset) / this.numSteps;
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
  }; // end constructor
  render(){
    stroke(this.layerColor);
    noFill();
    strokeWeight(this.weight);
    push();
      translate(width/2, height/2);
      rotate(this.angle/2);
      for (let i = 0; i < this.numSteps; i++) {
        hexagon(0, 0, this.centerOffset + (i * this.singleStep));
      };
    pop();
  }; // ends render
}; // end SteppedHexagon

// class CenteredShape extends Layer {
//   constructor(){
//     super();
//   }; // end constructor
//   render(){

//   }; // ends render
// }; // end CenteredShape