const state = {
  sides: SIDES,
  stepsOut: 8,
  thinStroke: 1,
  thickStroke: 3
};

const setState = (state) => {
  state.numShapes = state.sides;
  state.angle = 360 / state.numShapes;
  state.singleStep = (CRYSTAL_SIZE / 2) / state.stepsOut;
  state.layerColor = getRandomFromPalette();
  return state;
};

// class Layer {
//   constructor() {
//     this.sides = SIDES;
//     this.numShapes = this.sides;
//     this.angle = 360 / this.numShapes;
//     this.stepsOut = 8;
//     this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut;
//     this.thinStroke = 1;
//     this.thickStroke = 3;
//     this.layerColor = getRandomFromPalette();
//   };
// }; // end Layer

const circles = (state) => {
  state.shapeSize = (CRYSTAL_SIZE / 2 ) * 0.93;
  state.position = (CRYSTAL_SIZE / 2 ) - ( state.shapeSize / 2 );

  return ({
    name: 'circles',
    state,
    render: () => {
      noFill(0);
      stroke(state.layerColor);
      strokeWeight(1);
      push();
      // translate(width/2, height/2);
      for (let i = 0; i <= state.numShapes; i++) {
        ellipse(state.position, 0, state.shapeSize, state.shapeSize);
        rotate(state.angle);      
      };
      pop();
    }
  }); // end return
}; // end circles

const simpleLines = (state) => {
  state.numSteps = randomSelectTwo() ? state.stepsOut : int(state.stepsOut * 1.25);
  state.step = ( CRYSTAL_SIZE / 2 ) / state.numSteps;
  state.start = floor(random( 0, state.numSteps ));
  state.stop = floor(random(state.start, state.numSteps + 1));
  state.weight = randomSelectTwo() ? state.thinStroke : state.thinStroke;
  state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2;
  state.angle = 360 / state.numShapes;

  return ({
    name: 'Simple Lines',
    state,
    render: () => {
      noFill(0);
      stroke(state.layerColor);
      strokeWeight(state.weight);
      push();
        for (let i = 0; i < state.numShapes; i++) {
          line(state.start * state.step, 0, state.stop * state.step, 0);
          rotate( state.angle );
        }
      pop();
    } 
  })
} // end simpleLines

const outlineShape = (state) => {
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;
  state.hexagonTrue = randomSelectTwo();

  return({
    name: 'Outline Shape',
    state,
    render: () => {
      stroke(state.layerColor);
      noFill();
      strokeWeight(state.weight);
      push();
        if (state.hexagonTrue) {
          hexagon(0, 0, CRYSTAL_SIZE / 2);
        } else {
            ellipse( 0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE );
        }
      pop();
    } 
  })
}; // end outlineShape

const dottedLines = (state) => {
  state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2;
  state.angle = 360 / state.numShapes;
  state.shapeSize = 3;
  state.centerOffset = state.singleStep;

  return({
    name: 'Dotted Lines',
    state,
    render: () => {
      fill(state.layerColor);
      noStroke();
      push();
      // translate(width / 2, height / 2);
        for (let i = 0; i < state.numShapes; i++) {
          for (let x = state.centerOffset; x < CRYSTAL_SIZE / 2; x += state.singleStep) {
            rect(x, 0, state.shapeSize, state.shapeSize);
          };
          rotate(state.angle);
        };
      pop();
    }
  })
}; // end dottedLines

const centeredShape = (state) => {
    state.randomShape = random(1);
    state.shapeSize = floor(random(state.stepsOut /2, state.stepsOut)) * state.singleStep;
  return({
    name: 'Centered Shapes',
    state,
    render: () => {
      fill(state.layerColor);
      noStroke();
      push();
        if (state.randomShape < 0.1) {
          rect(0, 0, state.shapeSize*2, state.shapeSize*2);
        } else if (state.randomShape >= 0.1 && state.randomShape <= 0.6){
          ellipse(0,0,state.shapeSize*2, state.shapeSize*2);
        } else if (state.randomShape > 0.6 ) {
          rotate(state.angle /2);
          hexagon(0, 0, state.shapeSize)
        }
      pop();
    }
  })
}; // end centeredShape

const ringOfShapes = (state) => {
    state.steps = floor(random(1, state.stepsOut));
    state.center = state.steps * state.singleStep;
    state.randomShape = random(1);
    state.direction = randomSelectTwo(); // used for triangle only
    state.fillColor = randomSelectTwo() ? state.layerColor : color(0,1);
    state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;

    if (state.steps < state.stepsOut/2) {
      state.radius = floor(random(1, state.steps)) * state.singleStep;
    } else if (state.steps > state.stepsOut > 2) {
      state.radius = floor(random(1, state.stepsOut - state.step)) * state.singleStep;
    } else {
      state.radius = floor(random(1, (state.stepsOut / 2) +1)) * state.singleStep;
    }

  return({
    name: 'Ring of Shapes',
    state,
    render: () => {
      stroke(state.layerColor);
      fill(state.fillColor);
      strokeWeight(state.weight);
      push();
        for (let i = 0; i < state.numShapes; i++) {
          if (state.randomShape < 0.33) {
            ellipse(0,state.center,state.radius, state.radius);
          } else if (state.randomShape >= 0.33 && state.randomShape <= 0.66){
            rect(0, state.center, state.radius, state.radius);
          } else if (state.randomShape > 0.66 ) {
              myTriangle(state.center, state.radius, state.direction)
            }
            rotate(state.angle)
          }
        pop();
      }
    })
  }; // end RingOfShapes

const steppedHexagons = (state) => {
    state.numSteps = randomSelectTwo() ? state.stepsOut : state.stepsOut * 1.25;
    state.centerOffset = (CRYSTAL_SIZE /2 ) * 0.15;
    state.singleStep = ((CRYSTAL_SIZE /2) - state.centerOffset) / state.numSteps;
    state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;
  return({
    name: 'Stepped Hexagons',
    state,
    render: () => {
      stroke(state.layerColor);
      noFill();
      strokeWeight(state.weight);
      push();
      // translate(width/2, height/2);
        rotate(state.angle/2);
        for (let i = 0; i < state.numSteps; i++) {
          hexagon(0, 0, state.centerOffset + (i * state.singleStep));
        };
        pop();
      }
    })
  }; // end steppedHexagons

  // ******************************************************************
  

  // class Circles extends Layer {
    //   constructor(){
      //     super();
//     this.shapeSize = (CRYSTAL_SIZE / 2 ) * 0.93;
//     this.position = (CRYSTAL_SIZE / 2 ) - ( this.shapeSize / 2 );
//   }; // end constructor

//   render(){
//     noFill(0);
//     stroke(this.layerColor);
//     strokeWeight(1);
//     push();
//       // translate(width/2, height/2);
//       for (let i = 0; i <= this.numShapes; i++) {
//         ellipse( this.position, 0, this.shapeSize, this.shapeSize);
//         rotate(this.angle);      
//       };
//     pop();
//   }; // end render
// }; // end Circles

// class SimpleLines extends Layer {
//   constructor(){
//     super();
//     this.numSteps = randomSelectTwo() ? this.stepsOut : int(this.stepsOut * 1.25);
//     this.step = ( CRYSTAL_SIZE / 2 ) / this.numSteps;
//     this.start = floor(random( 0, this.numSteps ));
//     this.stop = floor(random(this.start, this.numSteps + 1));
//     this.weight = randomSelectTwo() ? this.thinStroke : this.thinStroke;
//     this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2;
//     this.angle = 360 / this.numShapes;
  
//   }; // end constructor

//   render(){
//     noFill(0);
//     stroke(this.layerColor);
//     strokeWeight(this.weight);
//     push(); // push pop only applies this transform/rotate to what's inside. then goes back
//       // translate(width/2, height/2); // this moves the x,y 0,0 to the centre(or whereever you set it)
//       for (let i = 0; i < this.numShapes; i++) {
//         line(this.start * this.step, 0, this.stop * this.step, 0);
//         rotate( this.angle );
//       }
//     pop();
//   }; // end render
// } // end SimpleLines

// class OutlineShape extends Layer {
//   constructor(){
//     super();
//     this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
//     this.hexagonTrue = randomSelectTwo();
//   }; // end constructor

//   render(){
//     stroke(this.layerColor);
//     noFill();
//     strokeWeight(this.weight);
//     push();
//       // translate( width/2, height/2 );
//       if (this.hexagonTrue) {
//         hexagon(0, 0, CRYSTAL_SIZE / 2);
//       } else {
//         ellipse( 0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE );
//       }
//     pop();
//   }; // end render
// }; // end OutlineShape

// class DottedLines extends Layer {
//   constructor(){
//     super();
//     this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2;
//     this.angle = 360 / this.numShapes;
//     this.shapeSize = 3;
//     this.centerOffset = this.singleStep;
//   }; // end constructor

//   render(){
//     fill(this.layerColor);
//     noStroke();
//     push();
//       // translate(width / 2, height / 2);
//       for (let i = 0; i < this.numShapes; i++) {
//         for (let x = this.centerOffset; x < CRYSTAL_SIZE / 2; x += this.singleStep) {
//           rect(x, 0, this.shapeSize, this.shapeSize);
//         };
//         rotate(this.angle);
//       };
//     pop();
//   }; // end render
// }; // end DottedLines

// class CenteredShape extends Layer {
//   constructor(){
//     super();
//     this.randomShape = random(1);
//     this.shapeSize = floor(random(this.stepsOut /2, this.stepsOut)) * this.singleStep;
//   }; // end constructor
//   render(){
//     fill(this.layerColor);
//     noStroke();
//     push();
//       // translate(width/2, height/2);
//       if (this.randomShape < 0.1) {
//         rect(0, 0, this.shapeSize*2, this.shapeSize*2);
//       } else if (this.randomShape >= 0.1 && this.randomShape <= 0.6){
//         ellipse(0,0,this.shapeSize*2, this.shapeSize*2);
//       } else if (this.randomShape > 0.6 ) {
//         rotate(this.angle /2);
//         hexagon(0, 0, this.shapeSize)
//       }
//     pop();
//   }; // ends render
// }; // end CenteredShape

// class RingOfShapes extends Layer {
//   constructor(){
//     super();
//     this.steps = floor(random(1, this.stepsOut));
//     this.center = this.steps * this.singleStep;
//     this.randomShape = random(1);
//     this.direction = randomSelectTwo(); // used for triangle only
//     this.fillColor = randomSelectTwo() ? this.layerColor : color(0,1);
//     this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;

//     if (this.steps < this.stepsOut/2) {
//       this.radius = floor(random(1, this.steps)) * this.singleStep;
//     } else if (this.steps > this.stepsOut > 2) {
//       this.radius = floor(random(1, this.stepsOut - this.step)) * this.singleStep;
//     } else {
//       this.radius = floor(random(1, (this.stepsOut / 2) +1)) * this.singleStep;
//     }
//   }; // end constructor
//   render(){
//     stroke(this.layerColor);
//     fill(this.fillColor);
//     strokeWeight(this.weight);
//     push();
//       // translate(width/2, height/2);
//       for (let i = 0; i < this.numShapes; i++) {
//         if (this.randomShape < 0.33) {
//           ellipse(0,this.center,this.radius, this.radius);
//         } else if (this.randomShape >= 0.33 && this.randomShape <= 0.66){
//           rect(0, this.center, this.radius, this.radius);
//         } else if (this.randomShape > 0.66 ) {
//           myTriangle(this.center, this.radius, this.direction)
//         }
//         rotate(this.angle)
//       }
//     pop();
//   }; // ends render
// }; // end RingOfShapes

// class SteppedHexagons extends Layer {
//   constructor(){
//     super();
//     this.numSteps = randomSelectTwo() ? this.stepsOut : this.stepsOut * 1.25;
//     this.centerOffset = (CRYSTAL_SIZE /2 ) * 0.15;
//     this.singleStep = ((CRYSTAL_SIZE /2) - this.centerOffset) / this.numSteps;
//     this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
//   }; // end constructor
//   render(){
//     stroke(this.layerColor);
//     noFill();
//     strokeWeight(this.weight);
//     push();
//       // translate(width/2, height/2);
//       rotate(this.angle/2);
//       for (let i = 0; i < this.numSteps; i++) {
//         hexagon(0, 0, this.centerOffset + (i * this.singleStep));
//       };
//     pop();
//   }; // ends render
// }; // end SteppedHexagons