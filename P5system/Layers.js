class Layer {
  constructor() {
    this.sides = SIDES;
    this.numShapes = this.sides;
    this.angle = 360 / this.numShapes;
    this.stepsOut = 8;
    this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut;
    this.thinStroke = 1;
    this.thickStroke = 3;
    this.strokeColor = getRandomFromPalette();
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
    stroke(this.strokeColor);
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
    stroke(this.strokeColor);
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
    stroke(this.strokeColor);
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