// project setup
// draw something simple
// translate()
// push() + pop()
// rotate() + anglemode()
// rectMode

const CRYSTAL_SIZE = 500;
const SIDES = 6;


function setup() {
  createCanvas(500, 500, SVG); // height, width, and export type
  noLoop(); // only one render
  angleMode(DEGREES); // makes the correct rotate value
  rectMode(CENTER); // sets co-ordinates from centre, not from top left.
}

function draw() {
  background('teal');
  fill(0);
  push(); // push pop only applies this transform/rotate to what's inside. then goes back
    translate(width/2, height/2); // this moves the x,y 0,0 to the centre(or whereever you set it)
    rotate(45)
    rect(0, 0, 25, 25);
  pop();
  fill('red')
  rect(0, 0, 25, 25);
}