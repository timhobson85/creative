// project setup
// draw something simple
// translate()
// push() + pop()
// rotate() + anglemode()
// rectMode

const CRYSTAL_SIZE = 500;
const SIDES = 6;
let PALETTE = []


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
  noFill(0);
  push(); // push pop only applies this transform/rotate to what's inside. then goes back
    translate(width/2, height/2); // this moves the x,y 0,0 to the centre(or whereever you set it)
    stroke(PALETTE[0])
    ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
    stroke(PALETTE[1])
    const angle = 360 / SIDES
    for (let i = 0; i < SIDES; i++) {
      line(0, 0, 0, CRYSTAL_SIZE/2)
      rotate( angle )
    }
  pop();
}