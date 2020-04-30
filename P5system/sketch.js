
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
  const circles = new Circles();
  circles.render();
  
  const simpleLines = new SimpleLines();
  simpleLines.render();

  const outlineShape = new OutlineShape();
  outlineShape.render();
  // testLines();
  // outlineShape();
  // simpleLines();
  // circles();

  // let picker = random(1);
  // if (picker > 0.3) {
  //   outlineShape();
  // }
  
  // picker = random(1);
  // if (picker > 0.3) {
  //   simpleLines();
  // }
  
  // picker = random(1);
  // if (picker > 0.3) {
  //   circles();
  // }
}
