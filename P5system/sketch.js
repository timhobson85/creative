
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

  // go to a point on teh screen and draw a pixel , continue to do this until we run out of room
  const oneCrystal = new Crystal(width/2, height/2);
  oneCrystal.render();  
};
