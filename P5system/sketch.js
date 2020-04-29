// project setup
// draw something simple
// translate()
// push() + pop()
// rotate() + anglemode()
// rectMode

const CRYSTAL_SIZE = 500;
const SIDES = 6;
let PALETTE = [];


function setup() {
  createCanvas(550, 550, SVG); // height, width, and export type
  PALETTE = [
    color(255, 52, 154), //pink
    color(4, 0, 152) //blue
  ]
  noLoop(); // only one render
  angleMode(DEGREES); // makes the correct rotate value
  rectMode(CENTER); // sets co-ordinates from centre, not from top left.
}

function draw() {
  testLines();
}

function testLines() {
  let numShapes = randomSelectTwo() ? SIDES : SIDES * 2;

  const strokeColor = getRandomFromPalette();

  
  noFill(0);
  push(); // push pop only applies this transform/rotate to what's inside. then goes back
    translate(width/2, height/2); // this moves the x,y 0,0 to the centre(or whereever you set it)
    stroke(PALETTE[0]); 
    ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
    stroke(strokeColor);
    const angle = 360 / numShapes;
    for (let i = 0; i < numShapes; i++) {
      line(0, 0, 0, CRYSTAL_SIZE/2);
      rotate( angle );
    }
  pop();
}

function randomSelectTwo() {
  const rando = random(1);
  let numShapes;
  if (rando > 0.5) {
    return true;  
  } else {
    return false;
  }
}

function getRandomFromPalette() {
  const rando2 = floor(random(0, PALETTE.length));
  return PALETTE[rando2]
}