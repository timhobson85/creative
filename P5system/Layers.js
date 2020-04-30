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